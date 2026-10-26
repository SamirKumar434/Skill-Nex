import { prisma } from "@/lib/prisma";
import { ProblemStatus as DbProblemStatus } from "@prisma/client";
import type { ProblemStatus as UiProblemStatus } from "@/data/problems-data";
import { CORE_ELECTRONICS_STAGES } from "@/data/electronics-roadmap";
import { DSA_CATEGORIES } from "@/data/dsa-data";
import { PROBLEMS_DATA } from "@/data/problems-data";

/**
 * Progress Status Mappings between UI (lowercase hyphenated) and Database (uppercase enum)
 */
export function toDbProblemStatus(status: UiProblemStatus): DbProblemStatus {
  switch (status) {
    case "in-progress":
      return DbProblemStatus.IN_PROGRESS;
    case "completed":
      return DbProblemStatus.COMPLETED;
    case "not-started":
    default:
      return DbProblemStatus.NOT_STARTED;
  }
}

export function toUiProblemStatus(status: DbProblemStatus): UiProblemStatus {
  switch (status) {
    case DbProblemStatus.IN_PROGRESS:
      return "in-progress";
    case DbProblemStatus.COMPLETED:
      return "completed";
    case DbProblemStatus.NOT_STARTED:
    default:
      return "not-started";
  }
}

/**
 * In-memory index of curriculum items for fast validation
 */
const TOPIC_INDEX = new Map<string, { stageId: string }>();
for (const stage of CORE_ELECTRONICS_STAGES) {
  for (const topic of stage.topics) {
    TOPIC_INDEX.set(topic.id, { stageId: topic.stageId || stage.id });
  }
}

const DSA_QUESTION_INDEX = new Map<string, { categoryId: string }>();
for (const cat of DSA_CATEGORIES) {
  for (const q of cat.questions) {
    DSA_QUESTION_INDEX.set(q.id, { categoryId: cat.id });
  }
}

const PROBLEM_ID_SET = new Set<string>(PROBLEMS_DATA.map((p) => p.id));

export interface StudentProgressData {
  completedTopicIds: string[];
  completedDsaQuestionIds: string[];
  problemStatusMap: Record<string, UiProblemStatus>;
}

/**
 * Fetches all progress for an authenticated user from PostgreSQL
 */
export async function getStudentProgress(dbUserId: string): Promise<StudentProgressData> {
  const [topicRecords, dsaRecords, problemRecords] = await Promise.all([
    prisma.userTopicProgress.findMany({
      where: { userId: dbUserId, isCompleted: true },
      select: { topicId: true },
    }),
    prisma.userDsaProgress.findMany({
      where: { userId: dbUserId, isCompleted: true },
      select: { questionId: true },
    }),
    prisma.userProblemProgress.findMany({
      where: { userId: dbUserId },
      select: { problemId: true, status: true },
    }),
  ]);

  const problemStatusMap: Record<string, UiProblemStatus> = {};
  for (const rec of problemRecords) {
    problemStatusMap[rec.problemId] = toUiProblemStatus(rec.status);
  }

  return {
    completedTopicIds: topicRecords.map((t) => t.topicId),
    completedDsaQuestionIds: dsaRecords.map((d) => d.questionId),
    problemStatusMap,
  };
}

/**
 * Updates a roadmap topic completion status for the authenticated user.
 * Supports toggle behavior (default) or deterministic marking (via forceCompleted).
 */
export async function toggleTopicProgress(
  dbUserId: string,
  topicId: string,
  forceCompleted?: boolean
): Promise<{ topicId: string; isCompleted: boolean }> {
  const cleanTopicId = typeof topicId === "string" ? topicId.trim() : "";
  if (!cleanTopicId || cleanTopicId.length > 128) {
    throw new Error(`Invalid topic ID: "${topicId}"`);
  }

  const topicMeta = TOPIC_INDEX.get(cleanTopicId);
  if (!topicMeta) {
    throw new Error(`Invalid topic ID: "${cleanTopicId}"`);
  }

  const existing = await prisma.userTopicProgress.findUnique({
    where: {
      userId_topicId: {
        userId: dbUserId,
        topicId: cleanTopicId,
      },
    },
  });

  const nextCompleted =
    typeof forceCompleted === "boolean"
      ? forceCompleted
      : existing
      ? !existing.isCompleted
      : true;

  await prisma.userTopicProgress.upsert({
    where: {
      userId_topicId: {
        userId: dbUserId,
        topicId: cleanTopicId,
      },
    },
    create: {
      userId: dbUserId,
      topicId: cleanTopicId,
      stageId: topicMeta.stageId,
      isCompleted: nextCompleted,
      completedAt: nextCompleted ? new Date() : new Date(0),
    },
    update: {
      isCompleted: nextCompleted,
      completedAt: nextCompleted ? new Date() : undefined,
    },
  });

  return { topicId: cleanTopicId, isCompleted: nextCompleted };
}

/**
 * Updates a DSA question completion status for the authenticated user.
 * Supports toggle behavior (default) or deterministic marking (via forceCompleted).
 */
export async function toggleDsaProgress(
  dbUserId: string,
  questionId: string,
  forceCompleted?: boolean
): Promise<{ questionId: string; isCompleted: boolean }> {
  const cleanQuestionId = typeof questionId === "string" ? questionId.trim() : "";
  if (!cleanQuestionId || cleanQuestionId.length > 128) {
    throw new Error(`Invalid DSA question ID: "${questionId}"`);
  }

  const questionMeta = DSA_QUESTION_INDEX.get(cleanQuestionId);
  if (!questionMeta) {
    throw new Error(`Invalid DSA question ID: "${cleanQuestionId}"`);
  }

  const existing = await prisma.userDsaProgress.findUnique({
    where: {
      userId_questionId: {
        userId: dbUserId,
        questionId: cleanQuestionId,
      },
    },
  });

  const nextCompleted =
    typeof forceCompleted === "boolean"
      ? forceCompleted
      : existing
      ? !existing.isCompleted
      : true;

  await prisma.userDsaProgress.upsert({
    where: {
      userId_questionId: {
        userId: dbUserId,
        questionId: cleanQuestionId,
      },
    },
    create: {
      userId: dbUserId,
      questionId: cleanQuestionId,
      categoryId: questionMeta.categoryId,
      isCompleted: nextCompleted,
      completedAt: nextCompleted ? new Date() : new Date(0),
    },
    update: {
      isCompleted: nextCompleted,
      completedAt: nextCompleted ? new Date() : undefined,
    },
  });

  return { questionId: cleanQuestionId, isCompleted: nextCompleted };
}

/**
 * Updates an HDLBits problem status for the authenticated user
 */
export async function updateProblemProgress(
  dbUserId: string,
  problemId: string,
  status: UiProblemStatus
): Promise<{ problemId: string; status: UiProblemStatus }> {
  const cleanProblemId = typeof problemId === "string" ? problemId.trim() : "";
  if (!cleanProblemId || cleanProblemId.length > 128 || !PROBLEM_ID_SET.has(cleanProblemId)) {
    throw new Error(`Invalid HDLBits problem ID: "${problemId}"`);
  }

  const allowedStatuses: UiProblemStatus[] = ["not-started", "in-progress", "completed"];
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Invalid problem status: "${status}"`);
  }

  const dbStatus = toDbProblemStatus(status);

  await prisma.userProblemProgress.upsert({
    where: {
      userId_problemId: {
        userId: dbUserId,
        problemId: cleanProblemId,
      },
    },
    create: {
      userId: dbUserId,
      problemId: cleanProblemId,
      status: dbStatus,
    },
    update: {
      status: dbStatus,
    },
  });

  return { problemId: cleanProblemId, status };
}

