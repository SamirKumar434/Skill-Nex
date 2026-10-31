import { NextResponse } from "next/server";
import { getVerifiedUserRole } from "@/lib/auth/require-admin";
import { VERILOG_HDL_STAGE } from "@/data/electronics-roadmap";

/**
 * GET /api/admin/verilog
 *
 * Admin-only API endpoint to fetch Verilog HDL curriculum data.
 * Rejects unauthenticated callers with 401.
 * Rejects non-admin students with 403.
 * Returns curriculum payload only to verified admins.
 */
export async function GET() {
  const { role, isAdmin } = await getVerifiedUserRole();

  if (role === "guest") {
    return NextResponse.json(
      { error: "Unauthorized: Active session required." },
      { status: 401 }
    );
  }

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Forbidden: Admin privileges required." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    data: VERILOG_HDL_STAGE,
  });
}

