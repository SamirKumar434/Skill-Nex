import { NextResponse } from "next/server";
import { getUserProfileDataAction } from "@/actions/profile";

export const dynamic = "force-dynamic";

/**
 * GET /api/profile
 * Returns authenticated user profile, progress statistics, and 52-week activity calendar.
 */
export async function GET() {
  try {
    const result = await getUserProfileDataAction();
    if (!result.success) {
      const isUnauth = result.error?.includes("Unauthorized");
      return NextResponse.json(result, { status: isUnauth ? 401 : 500 });
    }
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load profile";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
