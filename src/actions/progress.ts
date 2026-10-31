"use server";

import { auth } from "@clerk/nextjs/server";
import { getVerifiedUser } from "@/lib/auth";
import { getVerifiedUserRole, requireAdmin } from "@/lib/auth/require-admin";
import {
  getStudentProgress,
  toggleTopicProgress,
  toggleDsaProgress,
  updateProblemProgress,
  type StudentProgressData,
} from "@/lib/progress";
import {
  VERILOG_HDL_STAGE,
  isTopicAdminOnly,
  type LearningStage,
} from "@/data/electronics-roadmap";
import type { ProblemStatus as UiProblemStatus } from "@/data/problems-data";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const VALID_PROBLEM_STATUSES: readonly string[] = ["not-started", "in-progress", "completed"];
const MAX_IDENTIFIER_LENGTH = 128;

/**
 * Helper to authenticate and get the verified PostgreSQL user.
 * Rejects unauthorized callers without trusting client-supplied user IDs.
 * Utilizes fast-path indexed DB lookup to eliminate redundant Clerk API round-trips.
 */
async function getVerifiedDbUser() {
  let userId: string | null = null;
  try {
    const session = await auth();
    userId = session?.userId ?? null;
  } catch {
    throw new Error("UNAUTHORIZED");
  }

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const dbUser = await getVerifiedUser();
  if (!dbUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return dbUser;
}

/**
 * Server Action: Fetches all progress data for the currently authenticated student.
 * If user is not an admin, Verilog HDL progress records are hidden from the payload.
 */
export async function getStudentProgressAction(): Promise<ActionResult<StudentProgressData>> {
  try {
    const dbUser = await getVerifiedDbUser();
    const { isAdmin } = await getVerifiedUserRole();
    const progress = await getStudentProgress(dbUser.id, isAdmin);
    return { success: true, data: progress };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load progress";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Active login session required." };
    }
    console.error("[SkillNex Actions] getStudentProgressAction error:", message);
    return { success: false, error: "Could not load student progress. Please try again." };
  }
}

/**
 * Server Action: Updates a roadmap topic completion status.
 * Strictly verifies admin role if the topic is admin-only (Verilog HDL).
 */
export async function toggleTopicProgressAction(
  topicId: string,
  forceCompleted?: boolean
): Promise<ActionResult<{ topicId: string; isCompleted: boolean }>> {
  try {
    if (
      !topicId ||
      typeof topicId !== "string" ||
      !topicId.trim() ||
      topicId.length > MAX_IDENTIFIER_LENGTH
    ) {
      return { success: false, error: "Invalid topic ID provided." };
    }

    const cleanTopicId = topicId.trim();
    const dbUser = await getVerifiedDbUser();

    // Enforce admin privileges if topic is admin-only
    let isAdmin = false;
    if (isTopicAdminOnly(cleanTopicId)) {
      try {
        await requireAdmin();
        isAdmin = true;
      } catch {
        return {
          success: false,
          error: "Unauthorized: Admin privileges required to update Verilog HDL progress.",
        };
      }
    }

    const result = await toggleTopicProgress(dbUser.id, cleanTopicId, forceCompleted, isAdmin);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update topic progress";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid topic ID") || message.startsWith("Unauthorized")) {
      return { success: false, error: message };
    }
    console.error("[SkillNex Actions] toggleTopicProgressAction error:", message);
    return { success: false, error: "Unable to update topic progress. Please try again." };
  }
}

/**
 * Server Action: Fetches the admin-only Verilog HDL curriculum.
 * Students and guests calling this are rejected with an authorization error.
 */
export async function getVerilogCurriculumAction(): Promise<ActionResult<LearningStage>> {
  try {
    await requireAdmin();
    return { success: true, data: VERILOG_HDL_STAGE };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Updates a DSA question completion status
 */
export async function toggleDsaProgressAction(
  questionId: string,
  forceCompleted?: boolean
): Promise<ActionResult<{ questionId: string; isCompleted: boolean }>> {
  try {
    if (
      !questionId ||
      typeof questionId !== "string" ||
      !questionId.trim() ||
      questionId.length > MAX_IDENTIFIER_LENGTH
    ) {
      return { success: false, error: "Invalid question ID provided." };
    }

    const cleanQuestionId = questionId.trim();
    const dbUser = await getVerifiedDbUser();
    const result = await toggleDsaProgress(dbUser.id, cleanQuestionId, forceCompleted);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update question progress";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid DSA question ID")) {
      return { success: false, error: message };
    }
    console.error("[SkillNex Actions] toggleDsaProgressAction error:", message);
    return { success: false, error: "Unable to update question progress. Please try again." };
  }
}

/**
 * Server Action: Updates an HDLBits problem status
 */
export async function updateProblemStatusAction(
  problemId: string,
  status: UiProblemStatus
): Promise<ActionResult<{ problemId: string; status: UiProblemStatus }>> {
  try {
    if (
      !problemId ||
      typeof problemId !== "string" ||
      !problemId.trim() ||
      problemId.length > MAX_IDENTIFIER_LENGTH
    ) {
      return { success: false, error: "Invalid problem ID provided." };
    }

    if (
      !status ||
      typeof status !== "string" ||
      !VALID_PROBLEM_STATUSES.includes(status)
    ) {
      return { success: false, error: "Invalid problem status provided." };
    }

    const cleanProblemId = problemId.trim();
    const dbUser = await getVerifiedDbUser();
    const result = await updateProblemProgress(dbUser.id, cleanProblemId, status);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update problem status";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid")) {
      return { success: false, error: message };
    }
    console.error("[SkillNex Actions] updateProblemStatusAction error:", message);
    return { success: false, error: "Unable to update problem status. Please try again." };
  }
}

