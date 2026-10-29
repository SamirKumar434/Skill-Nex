"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getVerifiedUser, getOrCreateCurrentUser } from "@/lib/auth";
import { getStudentProgress } from "@/lib/progress";
import { getUserActivitySummary, type UserActivitySummary } from "@/lib/activity";
import { CORE_ELECTRONICS_STAGES } from "@/data/electronics-roadmap";
import { DSA_CATEGORIES } from "@/data/dsa-data";
import { PROBLEMS_DATA } from "@/data/problems-data";

export interface ProfileUserData {
  fullName: string | null;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  selectedTrack: string;
}

export interface ProfileLearningStats {
  completedTopicsCount: number;
  totalTopicsCount: number;
  roadmapPercentage: number;
  completedDsaCount: number;
  totalDsaCount: number;
  completedHdlCount: number;
  totalHdlCount: number;
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
}

export interface UserProfileResponse {
  user: ProfileUserData;
  stats: ProfileLearningStats;
  activity: UserActivitySummary;
}

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pre-computed curriculum sets for fast validation
const ALL_TOPIC_IDS = new Set(
  CORE_ELECTRONICS_STAGES.flatMap((stage) => stage.topics.map((t) => t.id))
);
const ALL_DSA_IDS = new Set(
  DSA_CATEGORIES.flatMap((cat) => cat.questions.map((q) => q.id))
);
const ALL_PROBLEM_IDS = new Set(PROBLEMS_DATA.map((p) => p.id));

const TOTAL_TOPICS_COUNT = ALL_TOPIC_IDS.size;
const TOTAL_DSA_COUNT = ALL_DSA_IDS.size;
const TOTAL_HDL_COUNT = ALL_PROBLEM_IDS.size;

/**
 * Server Action: Fetches authenticated user profile, real learning statistics,
 * and 52-week activity heatmap data.
 *
 * Security:
 * Strictly resolves user identity from verified Clerk session on server.
 * Never trusts client-supplied user IDs.
 */
export async function getUserProfileDataAction(): Promise<ActionResult<UserProfileResponse>> {
  try {
    let clerkUserId: string | null = null;
    try {
      const session = await auth();
      clerkUserId = session?.userId ?? null;
    } catch {
      return { success: false, error: "Unauthorized: Active login session required." };
    }

    if (!clerkUserId) {
      return { success: false, error: "Unauthorized: Active login session required." };
    }

    // Retrieve or synchronize verified PostgreSQL user record
    let dbUser = await getVerifiedUser();
    if (!dbUser) {
      dbUser = await getOrCreateCurrentUser();
    }

    if (!dbUser) {
      return { success: false, error: "User record could not be loaded." };
    }

    // Fetch progress and activity in parallel
    const [progress, activitySummary, clerkUser] = await Promise.all([
      getStudentProgress(dbUser.id),
      getUserActivitySummary(dbUser.id),
      currentUser().catch(() => null),
    ]);

    // Calculate verified statistics
    const validCompletedTopics = progress.completedTopicIds.filter((id) =>
      ALL_TOPIC_IDS.has(id)
    );
    const validCompletedDsa = progress.completedDsaQuestionIds.filter((id) =>
      ALL_DSA_IDS.has(id)
    );
    const completedHdlCount = Object.entries(progress.problemStatusMap).filter(
      ([pId, status]) => ALL_PROBLEM_IDS.has(pId) && status === "completed"
    ).length;

    const completedTopicsCount = validCompletedTopics.length;
    const completedDsaCount = validCompletedDsa.length;
    const roadmapPercentage =
      TOTAL_TOPICS_COUNT > 0
        ? Math.round((completedTopicsCount / TOTAL_TOPICS_COUNT) * 100)
        : 0;

    // Resolve profile details with Clerk fallback for latest avatar/name
    const fullName =
      dbUser.fullName ||
      (clerkUser
        ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
          clerkUser.username ||
          null
        : null);

    // Clerk is the single source of truth for avatar URL; never read from database
    const avatarUrl = clerkUser?.imageUrl || null;
    const email = dbUser.email || clerkUser?.emailAddresses?.[0]?.emailAddress || "";

    const trackLabel =
      dbUser.selectedTrack === "core-electronics"
        ? "Core Electronics Track"
        : dbUser.selectedTrack || "Core Electronics Track";

    return {
      success: true,
      data: {
        user: {
          fullName,
          email,
          avatarUrl,
          createdAt: dbUser.createdAt.toISOString(),
          selectedTrack: trackLabel,
        },
        stats: {
          completedTopicsCount,
          totalTopicsCount: TOTAL_TOPICS_COUNT,
          roadmapPercentage,
          completedDsaCount,
          totalDsaCount: TOTAL_DSA_COUNT,
          completedHdlCount,
          totalHdlCount: TOTAL_HDL_COUNT,
          currentStreak: activitySummary.currentStreak,
          longestStreak: activitySummary.longestStreak,
          totalActiveDays: activitySummary.totalActiveDays,
        },
        activity: activitySummary,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SkillNex Actions] getUserProfileDataAction error:", message);
    return { success: false, error: "Failed to load profile data. Please try again." };
  }
}
