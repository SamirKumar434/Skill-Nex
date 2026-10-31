"use server";

import { requireAdmin } from "@/lib/auth/require-admin";
import {
  getAdminOverviewStats,
  getAdminStudentsList,
  getAdminStudentDetails,
  type AdminOverviewStats,
  type StudentListQueryOptions,
  type StudentProgressSummary,
  type AdminStudentDetailData,
} from "@/lib/admin/dashboard";

export interface AdminActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server Action: Fetches real overview statistics and student summary table for admins.
 * Verifies admin privileges server-side.
 */
export async function getAdminOverviewAction(): Promise<AdminActionResult<AdminOverviewStats>> {
  try {
    await requireAdmin();
    const stats = await getAdminOverviewStats();
    return { success: true, data: stats };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SkillNex Admin Action] getAdminOverviewAction error:", message);
    return { success: false, error: message || "Failed to load admin overview metrics." };
  }
}

/**
 * Server Action: Fetches filtered and sorted student directory for admins.
 * Verifies admin privileges server-side.
 */
export async function getAdminStudentsListAction(
  options: StudentListQueryOptions = {}
): Promise<AdminActionResult<{ students: StudentProgressSummary[]; totalCount: number }>> {
  try {
    await requireAdmin();
    const result = await getAdminStudentsList(options);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SkillNex Admin Action] getAdminStudentsListAction error:", message);
    return { success: false, error: message || "Failed to load student directory." };
  }
}

/**
 * Server Action: Fetches detailed learning progress and activity heatmap for an individual student.
 * Verifies admin privileges server-side.
 */
export async function getAdminStudentDetailAction(
  userId: string
): Promise<AdminActionResult<AdminStudentDetailData>> {
  try {
    await requireAdmin();
    const data = await getAdminStudentDetails(userId);
    if (!data) {
      return { success: false, error: "Student not found or access restricted." };
    }
    return { success: true, data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SkillNex Admin Action] getAdminStudentDetailAction error:", message);
    return { success: false, error: message || "Failed to load student details." };
  }
}

