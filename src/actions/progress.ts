"use server";

import { auth } from "@clerk/nextjs/server";
import { getOrCreateCurrentUser } from "@/lib/auth";
import {
  getStudentProgress,
  toggleTopicProgress,
  toggleDsaProgress,
  updateProblemProgress,
  type StudentProgressData,
} from "@/lib/progress";
import type { ProblemStatus as UiProblemStatus } from "@/data/problems-data";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Helper to authenticate and get the verified PostgreSQL user.
 * Rejects unauthorized callers without trusting client-supplied user IDs.
 */
async function getVerifiedDbUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const dbUser = await getOrCreateCurrentUser();
  if (!dbUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return dbUser;
}

/**
 * Server Action: Fetches all progress data for the currently authenticated student
 */
export async function getStudentProgressAction(): Promise<ActionResult<StudentProgressData>> {
  try {
    const dbUser = await getVerifiedDbUser();
    const progress = await getStudentProgress(dbUser.id);
    return { success: true, data: progress };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load progress";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Active login session required." };
    }
    return { success: false, error: "Could not load student progress. Please try again." };
  }
}

/**
 * Server Action: Toggles a roadmap topic completion status
 */
export async function toggleTopicProgressAction(
  topicId: string
): Promise<ActionResult<{ topicId: string; isCompleted: boolean }>> {
  try {
    if (!topicId || typeof topicId !== "string") {
      return { success: false, error: "Invalid topic ID provided." };
    }

    const dbUser = await getVerifiedDbUser();
    const result = await toggleTopicProgress(dbUser.id, topicId);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle topic";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid topic ID")) {
      return { success: false, error: message };
    }
    return { success: false, error: "Unable to update topic progress. Please try again." };
  }
}

/**
 * Server Action: Toggles a DSA question completion status
 */
export async function toggleDsaProgressAction(
  questionId: string
): Promise<ActionResult<{ questionId: string; isCompleted: boolean }>> {
  try {
    if (!questionId || typeof questionId !== "string") {
      return { success: false, error: "Invalid question ID provided." };
    }

    const dbUser = await getVerifiedDbUser();
    const result = await toggleDsaProgress(dbUser.id, questionId);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle question";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid DSA question ID")) {
      return { success: false, error: message };
    }
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
    if (!problemId || typeof problemId !== "string") {
      return { success: false, error: "Invalid problem ID provided." };
    }

    const dbUser = await getVerifiedDbUser();
    const result = await updateProblemProgress(dbUser.id, problemId, status);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update problem status";
    if (message === "UNAUTHORIZED") {
      return { success: false, error: "Unauthorized: Please sign in to save your progress." };
    }
    if (message.startsWith("Invalid")) {
      return { success: false, error: message };
    }
    return { success: false, error: "Unable to update problem status. Please try again." };
  }
}
