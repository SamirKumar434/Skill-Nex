import { NextResponse } from "next/server";
import { getOrCreateCurrentUser } from "@/lib/auth";

/**
 * GET /api/auth/sync
 * POST /api/auth/sync
 *
 * Verifies current Clerk session server-side and synchronizes the PostgreSQL user profile.
 * Rejects unauthenticated callers with 401 Unauthorized.
 */
export async function GET() {
  try {
    const user = await getOrCreateCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        selectedTrack: user.selectedTrack,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("API /api/auth/sync error:", error);
    return NextResponse.json(
      { error: "Internal server error during profile synchronization" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
