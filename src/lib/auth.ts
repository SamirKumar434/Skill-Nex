import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { User as DbUser } from "@prisma/client";

/**
 * SkillNex Authentication & Profile Synchronization Helper
 *
 * Verifies the caller's session server-side using Clerk's `auth()`.
 * Synchronizes the user's Clerk profile to PostgreSQL (User model) idempotently.
 * Never stores credentials or passwords; Clerk handles authentication.
 */

/**
 * Retrieves the verified Clerk userId from the active session.
 * Does not trust any client-supplied parameters.
 * Returns null if the request is unauthenticated.
 */
export async function getAuthUserId(): Promise<string | null> {
  try {
    const { userId } = await auth();
    return userId ?? null;
  } catch {
    return null;
  }
}

/**
 * Retrieves or creates/synchronizes the current authenticated user's PostgreSQL record.
 * Returns null if the user is not authenticated.
 * Safe to call repeatedly on any request (idempotent upsert).
 */
export async function getOrCreateCurrentUser(): Promise<DbUser | null> {
  let userId: string | null = null;
  try {
    const session = await auth();
    userId = session?.userId ?? null;
  } catch {
    return null;
  }

  if (!userId) {
    return null;
  }

  // Fetch full profile metadata from Clerk server API
  let clerkUser = null;
  try {
    clerkUser = await currentUser();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[SkillNex Auth] Could not fetch Clerk user profile details:", message);
  }

  // Extract email safely, with a fallback if user has no primary email registered
  const hasVerifiedEmail = Boolean(
    clerkUser?.emailAddresses && clerkUser.emailAddresses.length > 0
  );
  const primaryEmail =
    clerkUser?.emailAddresses?.find((e) => e.id === clerkUser?.primaryEmailAddressId)?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    `${userId}@users.skillnex.local`;

  // Extract full name
  const fullName = clerkUser
    ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
      clerkUser.username ||
      null
    : null;

  const avatarUrl = clerkUser?.imageUrl || null;

  try {
    // Idempotent upsert keyed by unique Clerk user ID
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        ...(hasVerifiedEmail ? { email: primaryEmail } : {}),
        ...(fullName ? { fullName } : {}),
        ...(avatarUrl ? { avatarUrl } : {}),
      },
      create: {
        clerkId: userId,
        email: primaryEmail,
        fullName,
        avatarUrl,
        selectedTrack: "core-electronics",
      },
    });

    console.log(`[SkillNex Auth] User synchronized in PostgreSQL successfully: ${userId}`);
    return dbUser;
  } catch (error: unknown) {
    const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
    // Handle edge case where email already exists in DB under a different/previous clerkId
    if (prismaError?.code === "P2002" && prismaError?.meta?.target?.includes("email")) {
      console.warn(`[SkillNex Auth] Email already exists in DB; updating clerkId for user: ${primaryEmail}`);
      const updatedUser = await prisma.user.update({
        where: { email: primaryEmail },
        data: {
          clerkId: userId,
          ...(fullName ? { fullName } : {}),
          ...(avatarUrl ? { avatarUrl } : {}),
        },
      });
      return updatedUser;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.error("[SkillNex Auth] Database upsert error:", message);
    throw error;
  }
}

/**
 * Fast-path user verification for high-frequency operations (e.g. progress tracking).
 * Verifies the Clerk session token server-side via `auth()`, looks up the user record
 * directly in PostgreSQL by indexed `clerkId`, and only falls back to Clerk's
 * remote profile API if the user record does not exist in PostgreSQL yet.
 */
export async function getVerifiedUser(): Promise<DbUser | null> {
  let userId: string | null = null;
  try {
    const session = await auth();
    userId = session?.userId ?? null;
  } catch {
    return null;
  }

  if (!userId) {
    return null;
  }

  // Fast-path: query indexed DB record without remote Clerk API round-trip
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  // First-time sync fallback
  return getOrCreateCurrentUser();
}

/**
 * Requires that the request is authenticated.
 * Returns the verified PostgreSQL user or throws an Error.
 */
export async function requireAuthUser(): Promise<DbUser> {
  const user = await getVerifiedUser();
  if (!user) {
    throw new Error("Unauthorized: You must be signed in to perform this operation.");
  }
  return user;
}
