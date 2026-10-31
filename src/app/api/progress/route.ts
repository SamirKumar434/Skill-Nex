import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getVerifiedUser } from "@/lib/auth";
import { getStudentProgress } from "@/lib/progress";
import { getVerifiedUserRole } from "@/lib/auth/require-admin";

/**
 * GET /api/progress
 *
 * Returns the current authenticated student's full progress.
 * If unauthenticated, returns 401 Unauthorized.
 * Verilog HDL topic progress is filtered out if caller is not an admin.
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Active session required to view student progress" },
        { status: 401 }
      );
    }

    const dbUser = await getVerifiedUser();
    if (!dbUser) {
      return NextResponse.json(
        { error: "User record not found" },
        { status: 404 }
      );
    }

    const { isAdmin } = await getVerifiedUserRole();
    const progress = await getStudentProgress(dbUser.id, isAdmin);
    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    console.error("[SkillNex API] /api/progress error:", message);
    return NextResponse.json(
      { error: "Failed to retrieve student progress" },
      { status: 500 }
    );
  }
}
