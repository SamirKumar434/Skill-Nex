import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

export type UserRole = "admin" | "student";

export interface AuthenticatedUserRole {
  userId: string | null;
  role: UserRole | "guest";
  isAdmin: boolean;
}

export interface VerifiedAdminUser {
  userId: string;
  email: string;
  role: "admin";
}

/**
 * SkillNex Admin Authorization Utility
 *
 * Server-side authorization check using Clerk's verified session and trusted publicMetadata.
 * Never trusts any client-supplied headers, parameters, or client-side state.
 *
 * Supported roles:
 * - "admin" (explicitly configured in Clerk publicMetadata.role)
 * - "student" (default authenticated state when no admin role is assigned)
 * - "guest" (unauthenticated caller)
 */

/**
 * Retrieves the current caller's verified role directly from Clerk.
 * Safe to call in Server Components, Route Handlers, and Server Actions.
 */
export async function getVerifiedUserRole(): Promise<AuthenticatedUserRole> {
  try {
    const session = await auth();
    const userId = session?.userId ?? null;

    if (!userId) {
      return { userId: null, role: "guest", isAdmin: false };
    }

    // Fast-path: Check session claims if JWT template is configured in Clerk
    const sessionClaims = session?.sessionClaims as
      | {
          metadata?: { role?: string };
          publicMetadata?: { role?: string };
        }
      | undefined;

    const claimRole = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
    if (claimRole === "admin") {
      return { userId, role: "admin", isAdmin: true };
    }

    // Authority check: Fetch trusted user record directly from Clerk Backend API
    const user = await currentUser();
    if (!user) {
      return { userId, role: "guest", isAdmin: false };
    }

    const publicRole = (user.publicMetadata as { role?: string } | undefined)?.role;
    if (publicRole === "admin") {
      return { userId, role: "admin", isAdmin: true };
    }

    return { userId, role: "student", isAdmin: false };
  } catch (error: unknown) {
    if ((error as { digest?: string })?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("[require-admin] Error verifying caller role with Clerk:", error);
    return { userId: null, role: "guest", isAdmin: false };
  }
}

/**
 * Fast boolean check if the current user is an admin.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const { isAdmin } = await getVerifiedUserRole();
  return isAdmin;
}

/**
 * Server-side authorization guard for Server Actions and API Routes.
 * Rejects unauthenticated callers with UNAUTHORIZED.
 * Rejects authenticated students with FORBIDDEN.
 * Returns verified admin identity if caller is an admin.
 */
export async function requireAdmin(): Promise<VerifiedAdminUser> {
  const session = await auth();
  const userId = session?.userId ?? null;

  if (!userId) {
    throw new Error("UNAUTHORIZED: Active sign-in session required.");
  }

  // Fast-path: Check session claims
  const sessionClaims = session?.sessionClaims as
    | {
        email?: string;
        metadata?: { role?: string };
        publicMetadata?: { role?: string };
      }
    | undefined;

  const claimRole = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;
  if (claimRole === "admin") {
    return {
      userId,
      email: sessionClaims?.email ?? `${userId}@skillnex.local`,
      role: "admin",
    };
  }

  // Authoritative check via Clerk remote API
  const user = await currentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED: User session could not be verified.");
  }

  const role = (user.publicMetadata as { role?: string } | undefined)?.role;
  if (role !== "admin") {
    throw new Error("FORBIDDEN: Admin privileges required.");
  }

  const email =
    user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    `${userId}@skillnex.local`;

  return {
    userId,
    email,
    role: "admin",
  };
}

/**
 * Route protection guard for Server Component Pages.
 * - Redirects unauthenticated guests to /sign-in.
 * - Returns 404 (notFound()) for authenticated students.
 * - Returns VerifiedAdminUser for authorized admins.
 */
export async function requireAdminPage(returnUrl?: string): Promise<VerifiedAdminUser> {
  const session = await auth();
  const userId = session?.userId ?? null;

  if (!userId) {
    const targetUrl = returnUrl ? `/sign-in?redirect_url=${encodeURIComponent(returnUrl)}` : "/sign-in";
    redirect(targetUrl);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const role = (user.publicMetadata as { role?: string } | undefined)?.role;
  if (role !== "admin") {
    notFound();
  }

  const email =
    user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    `${userId}@skillnex.local`;

  return {
    userId,
    email,
    role: "admin",
  };
}
