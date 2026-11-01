import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { CORE_ELECTRONICS_STAGES, VERILOG_HDL_STAGE } from "@/data/electronics-roadmap";
import { DSA_CATEGORIES } from "@/data/dsa-data";
import { getUserActivitySummary, toUtcDateString, type UserActivitySummary } from "@/lib/activity";

// Exact curriculum counts for verified progress calculations
export const TOTAL_ROADMAP_TOPICS_COUNT = CORE_ELECTRONICS_STAGES.flatMap((s) => s.topics).length; // 101
export const TOTAL_DSA_QUESTIONS_COUNT = DSA_CATEGORIES.flatMap((c) => c.questions).length; // 38
export const TOTAL_VERILOG_TOPICS_COUNT = VERILOG_HDL_STAGE.topics.length; // 16

const VALID_CORE_TOPIC_IDS = new Set(
  CORE_ELECTRONICS_STAGES.flatMap((s) => s.topics.map((t) => t.id))
);
const VALID_DSA_QUESTION_IDS = new Set(
  DSA_CATEGORIES.flatMap((c) => c.questions.map((q) => q.id))
);
const VALID_VERILOG_TOPIC_IDS = new Set(VERILOG_HDL_STAGE.topics.map((t) => t.id));

export interface StudentProgressSummary {
  id: string; // Database User.id
  clerkId: string;
  fullName: string | null;
  email: string;
  avatarUrl: string | null;
  createdAt: string; // ISO string
  roadmapPercentage: number;
  completedRoadmapTopics: number;
  totalRoadmapTopics: number;
  dsaPercentage: number;
  completedDsaQuestions: number;
  totalDsaQuestions: number;
  verilogCount: number;
  totalVerilogTopics: number;
  verilogPercentage: number;
  lastActiveDate: string | null;
  hasActiveRecent: boolean;
}

export interface AdminOverviewStats {
  totalStudents: number;
  activeStudents7d: number;
  inactiveStudents7d: number;
  avgRoadmapPercentage: number;
  recentStudents: StudentProgressSummary[];
}

export interface AdminTopicStatus {
  id: string;
  serial: string;
  title: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface AdminSubjectProgressDetail {
  id: string;
  title: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  topics: AdminTopicStatus[];
}

export interface AdminDsaCategoryProgress {
  id: string;
  title: string;
  completedCount: number;
  totalCount: number;
  questions: {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    isCompleted: boolean;
    completedAt?: string | null;
  }[];
}

export interface AdminStudentDetailData {
  user: {
    id: string;
    clerkId: string;
    fullName: string | null;
    email: string;
    avatarUrl: string | null;
    selectedTrack: string;
    createdAt: string;
  };
  metrics: {
    roadmapPercentage: number;
    completedRoadmapTopics: number;
    totalRoadmapTopics: number;
    dsaPercentage: number;
    completedDsaQuestions: number;
    totalDsaQuestions: number;
    verilogCount: number;
    totalVerilogTopics: number;
    verilogPercentage: number;
    lastActiveDate: string | null;
  };
  subjects: AdminSubjectProgressDetail[];
  dsaProgress: {
    totalCompleted: number;
    totalQuestions: number;
    percentage: number;
    categories: AdminDsaCategoryProgress[];
  };
  verilogProgress: AdminSubjectProgressDetail;
  activity: UserActivitySummary;
}

/**
 * Retrieves the set of Clerk user IDs for users with the "admin" role.
 * Wrapped in error handling so it safely falls back if Clerk API is offline.
 */
export async function getAdminClerkUserIds(): Promise<string[]> {
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList({ limit: 500 });
    const users = response?.data ?? [];
    return users
      .filter((u) => {
        const role = (u.publicMetadata as { role?: string } | undefined)?.role;
        return role === "admin";
      })
      .map((u) => u.id);
  } catch (error) {
    console.error("[SkillNex Admin] Error fetching admin Clerk IDs:", error);
    return [];
  }
}

/**
 * Helper to fetch a map of Clerk user profile images and names.
 */
async function getClerkUserProfilesMap(): Promise<Map<string, { avatarUrl?: string; name?: string }>> {
  const profileMap = new Map<string, { avatarUrl?: string; name?: string }>();
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList({ limit: 500 });
    const users = response?.data ?? [];
    for (const u of users) {
      const name = [u.firstName, u.lastName].filter(Boolean).join(" ").trim() || u.username || undefined;
      profileMap.set(u.id, {
        avatarUrl: u.imageUrl || undefined,
        name,
      });
    }
  } catch (error) {
    console.warn("[SkillNex Admin] Could not bulk fetch Clerk profiles, using database fallbacks:", error);
  }
  return profileMap;
}

/**
 * Computes overview statistics and recent student progress for the admin dashboard.
 * Requires verified Clerk admin authorization.
 */
export async function getAdminOverviewStats(options?: {
  skipAuth?: boolean;
}): Promise<AdminOverviewStats> {
  if (!options?.skipAuth) {
    await requireAdmin();
  }

  const adminClerkIds = await getAdminClerkUserIds();
  const clerkProfiles = await getClerkUserProfilesMap();

  // 7-day UTC threshold: today plus previous 6 days
  const sevenDaysAgoStr = toUtcDateString(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000));

  // 1. Total registered student count (excluding admins)
  const totalStudents = await prisma.user.count({
    where: {
      clerkId: { notIn: adminClerkIds },
    },
  });

  // 2. Active students in last 7 days (distinct users with activity in last 7 days)
  const activeUserActivities = await prisma.userActivity.findMany({
    where: {
      activityDate: { gte: sevenDaysAgoStr },
      activityCount: { gt: 0 },
      user: { clerkId: { notIn: adminClerkIds } },
    },
    select: { userId: true },
    distinct: ["userId"],
  });
  const activeStudents7d = activeUserActivities.length;
  const inactiveStudents7d = Math.max(0, totalStudents - activeStudents7d);

  // 3. Fetch students with progress records
  const rawStudents = await prisma.user.findMany({
    where: {
      clerkId: { notIn: adminClerkIds },
    },
    include: {
      topicProgress: {
        where: { isCompleted: true },
        select: { topicId: true, stageId: true, completedAt: true },
      },
      dsaProgress: {
        where: { isCompleted: true },
        select: { questionId: true },
      },
      activities: {
        where: { activityCount: { gt: 0 } },
        orderBy: { activityDate: "desc" },
        take: 1,
        select: { activityDate: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  let sumOfRoadmapPercentages = 0;

  const studentSummaries: StudentProgressSummary[] = rawStudents.map((s) => {
    const validCompletedTopics = s.topicProgress.filter((tp) => VALID_CORE_TOPIC_IDS.has(tp.topicId));
    const completedRoadmapTopics = validCompletedTopics.length;
    const roadmapPercentage =
      TOTAL_ROADMAP_TOPICS_COUNT > 0
        ? Math.round((completedRoadmapTopics / TOTAL_ROADMAP_TOPICS_COUNT) * 100)
        : 0;
    sumOfRoadmapPercentages += roadmapPercentage;

    const validCompletedDsa = s.dsaProgress.filter((dp) => VALID_DSA_QUESTION_IDS.has(dp.questionId));
    const completedDsaQuestions = validCompletedDsa.length;
    const dsaPercentage =
      TOTAL_DSA_QUESTIONS_COUNT > 0
        ? Math.round((completedDsaQuestions / TOTAL_DSA_QUESTIONS_COUNT) * 100)
        : 0;

    const verilogCompleted = s.topicProgress.filter((tp) => VALID_VERILOG_TOPIC_IDS.has(tp.topicId));
    const verilogCount = verilogCompleted.length;
    const verilogPercentage =
      TOTAL_VERILOG_TOPICS_COUNT > 0
        ? Math.round((verilogCount / TOTAL_VERILOG_TOPICS_COUNT) * 100)
        : 0;

    const lastActiveDate = s.activities[0]?.activityDate ?? null;
    const hasActiveRecent = lastActiveDate ? lastActiveDate >= sevenDaysAgoStr : false;

    const clerkProfile = clerkProfiles.get(s.clerkId);
    const fullName = s.fullName || clerkProfile?.name || null;
    const avatarUrl = clerkProfile?.avatarUrl || s.avatarUrl || null;

    return {
      id: s.id,
      clerkId: s.clerkId,
      fullName,
      email: s.email,
      avatarUrl,
      createdAt: s.createdAt.toISOString(),
      roadmapPercentage,
      completedRoadmapTopics,
      totalRoadmapTopics: TOTAL_ROADMAP_TOPICS_COUNT,
      dsaPercentage,
      completedDsaQuestions,
      totalDsaQuestions: TOTAL_DSA_QUESTIONS_COUNT,
      verilogCount,
      totalVerilogTopics: TOTAL_VERILOG_TOPICS_COUNT,
      verilogPercentage,
      lastActiveDate,
      hasActiveRecent,
    };
  });

  const avgRoadmapPercentage =
    totalStudents > 0 ? Math.round(sumOfRoadmapPercentages / totalStudents) : 0;

  return {
    totalStudents,
    activeStudents7d,
    inactiveStudents7d,
    avgRoadmapPercentage,
    recentStudents: studentSummaries,
  };
}

export interface StudentListQueryOptions {
  search?: string;
  sortBy?: "recentActivity" | "roadmapDesc" | "roadmapAsc" | "dsaDesc" | "name" | "createdAt";
  skipAuth?: boolean;
}

/**
 * Retrieves the full student directory with search filtering and sorting.
 * Requires verified Clerk admin authorization.
 */
export async function getAdminStudentsList(
  options: StudentListQueryOptions = {}
): Promise<{ students: StudentProgressSummary[]; totalCount: number }> {
  if (!options.skipAuth) {
    await requireAdmin();
  }

  const overview = await getAdminOverviewStats({ skipAuth: options.skipAuth });
  let students = [...overview.recentStudents];

  // 1. Search filtering (case-insensitive by name or email)
  const searchQuery = options.search?.trim().toLowerCase();
  if (searchQuery) {
    students = students.filter((s) => {
      const nameMatch = s.fullName?.toLowerCase().includes(searchQuery);
      const emailMatch = s.email.toLowerCase().includes(searchQuery);
      return Boolean(nameMatch || emailMatch);
    });
  }

  // 2. Sorting
  const sortBy = options.sortBy || "recentActivity";
  students.sort((a, b) => {
    switch (sortBy) {
      case "recentActivity": {
        if (!a.lastActiveDate && !b.lastActiveDate) return b.createdAt.localeCompare(a.createdAt);
        if (!a.lastActiveDate) return 1;
        if (!b.lastActiveDate) return -1;
        return b.lastActiveDate.localeCompare(a.lastActiveDate);
      }
      case "roadmapDesc":
        return b.roadmapPercentage - a.roadmapPercentage;
      case "roadmapAsc":
        return a.roadmapPercentage - b.roadmapPercentage;
      case "dsaDesc":
        return b.dsaPercentage - a.dsaPercentage;
      case "name":
        return (a.fullName || a.email).localeCompare(b.fullName || b.email);
      case "createdAt":
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });

  return {
    students,
    totalCount: students.length,
  };
}

/**
 * Retrieves full details, subject-wise progress breakdown, topic statuses,
 * and genuine activity heatmap for an individual student.
 * Requires verified Clerk admin authorization.
 */
export async function getAdminStudentDetails(
  userId: string,
  options?: { skipAuth?: boolean }
): Promise<AdminStudentDetailData | null> {
  if (!options?.skipAuth) {
    await requireAdmin();
  }

  if (!userId) return null;

  const adminClerkIds = await getAdminClerkUserIds();

  // Find user by either DB cuid id or Clerk external id
  const student = await prisma.user.findFirst({
    where: {
      OR: [{ id: userId }, { clerkId: userId }],
    },
    include: {
      topicProgress: true,
      dsaProgress: true,
      activities: {
        where: { activityCount: { gt: 0 } },
        orderBy: { activityDate: "desc" },
        take: 1,
        select: { activityDate: true },
      },
    },
  });

  if (!student) {
    return null;
  }

  // Admin accounts are excluded from student monitoring views
  if (adminClerkIds.includes(student.clerkId)) {
    return null;
  }

  // Fetch Clerk profile for authoritative avatar
  let clerkAvatar: string | null = null;
  let clerkName: string | null = null;
  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(student.clerkId);
    if (clerkUser) {
      clerkAvatar = clerkUser.imageUrl || null;
      clerkName =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
        clerkUser.username ||
        null;
    }
  } catch {
    // Non-fatal fallback to database record
  }

  // Fetch genuine 52-week activity summary from PostgreSQL
  const activitySummary = await getUserActivitySummary(student.id);

  // Map completed topic IDs with their completion dates
  const completedTopicMap = new Map<string, string>();
  for (const tp of student.topicProgress) {
    if (tp.isCompleted) {
      completedTopicMap.set(tp.topicId, tp.completedAt.toISOString());
    }
  }

  // Map completed DSA questions
  const completedDsaMap = new Map<string, string>();
  for (const dp of student.dsaProgress) {
    if (dp.isCompleted) {
      completedDsaMap.set(dp.questionId, dp.completedAt.toISOString());
    }
  }

  // 1. Build subject-wise breakdowns for Core Electronics
  const subjects: AdminSubjectProgressDetail[] = CORE_ELECTRONICS_STAGES.map((stage) => {
    const topics: AdminTopicStatus[] = stage.topics.map((topic) => {
      const isCompleted = completedTopicMap.has(topic.id);
      return {
        id: topic.id,
        serial: topic.serial,
        title: topic.title,
        difficulty: topic.difficulty,
        isCompleted,
        completedAt: completedTopicMap.get(topic.id) ?? null,
      };
    });

    const completedCount = topics.filter((t) => t.isCompleted).length;
    const totalCount = topics.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      id: stage.id,
      title: stage.title,
      completedCount,
      totalCount,
      percentage,
      topics,
    };
  });

  // Overall roadmap metrics
  const completedRoadmapTopics = subjects.reduce((sum, s) => sum + s.completedCount, 0);
  const roadmapPercentage =
    TOTAL_ROADMAP_TOPICS_COUNT > 0
      ? Math.round((completedRoadmapTopics / TOTAL_ROADMAP_TOPICS_COUNT) * 100)
      : 0;

  // 2. Build DSA breakdown across categories
  const dsaCategories: AdminDsaCategoryProgress[] = DSA_CATEGORIES.map((cat) => {
    const questions = cat.questions.map((q) => {
      const isCompleted = completedDsaMap.has(q.id);
      return {
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        isCompleted,
        completedAt: completedDsaMap.get(q.id) ?? null,
      };
    });

    const completedCount = questions.filter((q) => q.isCompleted).length;
    return {
      id: cat.id,
      title: cat.title,
      completedCount,
      totalCount: questions.length,
      questions,
    };
  });

  const completedDsaQuestions = dsaCategories.reduce((sum, c) => sum + c.completedCount, 0);
  const dsaPercentage =
    TOTAL_DSA_QUESTIONS_COUNT > 0
      ? Math.round((completedDsaQuestions / TOTAL_DSA_QUESTIONS_COUNT) * 100)
      : 0;

  // 3. Verilog HDL subject progress
  const verilogTopics: AdminTopicStatus[] = VERILOG_HDL_STAGE.topics.map((topic) => {
    const isCompleted = completedTopicMap.has(topic.id);
    return {
      id: topic.id,
      serial: topic.serial,
      title: topic.title,
      difficulty: topic.difficulty,
      isCompleted,
      completedAt: completedTopicMap.get(topic.id) ?? null,
    };
  });

  const verilogCompletedCount = verilogTopics.filter((t) => t.isCompleted).length;
  const verilogPercentage =
    TOTAL_VERILOG_TOPICS_COUNT > 0
      ? Math.round((verilogCompletedCount / TOTAL_VERILOG_TOPICS_COUNT) * 100)
      : 0;

  const verilogProgress: AdminSubjectProgressDetail = {
    id: VERILOG_HDL_STAGE.id,
    title: VERILOG_HDL_STAGE.title,
    completedCount: verilogCompletedCount,
    totalCount: verilogTopics.length,
    percentage: verilogPercentage,
    topics: verilogTopics,
  };

  const lastActiveDate = student.activities[0]?.activityDate ?? null;

  return {
    user: {
      id: student.id,
      clerkId: student.clerkId,
      fullName: clerkName || student.fullName,
      email: student.email,
      avatarUrl: clerkAvatar || student.avatarUrl,
      selectedTrack: student.selectedTrack,
      createdAt: student.createdAt.toISOString(),
    },
    metrics: {
      roadmapPercentage,
      completedRoadmapTopics,
      totalRoadmapTopics: TOTAL_ROADMAP_TOPICS_COUNT,
      dsaPercentage,
      completedDsaQuestions,
      totalDsaQuestions: TOTAL_DSA_QUESTIONS_COUNT,
      verilogCount: verilogCompletedCount,
      totalVerilogTopics: TOTAL_VERILOG_TOPICS_COUNT,
      verilogPercentage,
      lastActiveDate,
    },
    subjects,
    dsaProgress: {
      totalCompleted: completedDsaQuestions,
      totalQuestions: TOTAL_DSA_QUESTIONS_COUNT,
      percentage: dsaPercentage,
      categories: dsaCategories,
    },
    verilogProgress,
    activity: activitySummary,
  };
}

// ---------------------------------------------------------------------------
// Phase 2: Content Analytics Interfaces & Service Functions
// ---------------------------------------------------------------------------

export interface TopicAnalyticsItem {
  id: string;
  serial: string;
  title: string;
  subjectId: string;
  subjectTitle: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Easy" | "Medium" | "Hard" | "General";
  type: "roadmap" | "dsa" | "verilog";
  completedCount: number;
  eligibleCount: number;
  notStartedCount: number;
  completionRate: number; // percentage (0 - 100), e.g. 33.3
  startedMetricAvailable: false; // explicitly indicates started/attempt tracking not recorded in schema
  isAdminRestricted?: boolean;
}

export interface SubjectAnalyticsSummary {
  id: string;
  title: string;
  totalTopics: number;
  studentsActiveCount: number; // distinct students with at least 1 completed topic in subject
  totalCompletions: number; // sum of completed progress records
  avgCompletionRate: number; // average topic completion % across topics
  eligibleCount: number;
  isAdminRestricted?: boolean;
}

export interface ContentAnalyticsOverview {
  totalCurriculumItems: number; // 173 (157 student cohort + 16 Verilog preview)
  totalStudentCohortItems: number; // 157 (101 Core + 56 DSA)
  totalCompletionRecords: number; // sum of all verified completions across student cohort
  avgTopicCompletionRate: number; // average % across all student-cohort topics
  zeroCompletionTopicsCount: number; // topics with 0 completions in student cohort
  eligibleStudentsCount: number; // total non-admin students in cohort
  hasSufficientSample: boolean; // eligibleStudentsCount >= 3
}

export interface AdminContentAnalyticsData {
  overview: ContentAnalyticsOverview;
  subjects: SubjectAnalyticsSummary[];
  topics: TopicAnalyticsItem[];
  leastCompletedTopics: TopicAnalyticsItem[];
  mostCompletedTopics: TopicAnalyticsItem[];
  eligibleStudentsCount: number;
  hasSufficientSample: boolean;
}

/**
 * Computes deep content engagement analytics across roadmap topics and DSA questions.
 * Excludes admin accounts and uses real persisted PostgreSQL records.
 * Requires verified Clerk admin authorization.
 */
export async function getAdminContentAnalytics(options?: {
  skipAuth?: boolean;
}): Promise<AdminContentAnalyticsData> {
  if (!options?.skipAuth) {
    await requireAdmin();
  }

  // 1. Resolve admin Clerk IDs to strictly exclude admin accounts
  const adminClerkIds = await getAdminClerkUserIds();

  // 2. Query all registered non-admin students with their track
  const eligibleStudents = await prisma.user.findMany({
    where: {
      clerkId: { notIn: adminClerkIds },
    },
    select: {
      id: true,
      selectedTrack: true,
    },
  });

  const eligibleStudentIds = new Set(eligibleStudents.map((s) => s.id));
  const eligibleStudentsCount = eligibleStudents.length;

  // Cohort eligible for Core Electronics track
  const coreEligibleIds = new Set(
    eligibleStudents
      .filter((s) => s.selectedTrack === "core-electronics" || !s.selectedTrack)
      .map((s) => s.id)
  );
  const coreEligibleCount = coreEligibleIds.size;

  // 3. Batch fetch all completed topic progress for eligible students (single query)
  const topicProgressRecords = eligibleStudentIds.size > 0
    ? await prisma.userTopicProgress.findMany({
        where: {
          userId: { in: Array.from(eligibleStudentIds) },
          isCompleted: true,
        },
        select: {
          topicId: true,
          stageId: true,
          userId: true,
        },
      })
    : [];

  // 4. Batch fetch all completed DSA question progress for eligible students (single query)
  const dsaProgressRecords = eligibleStudentIds.size > 0
    ? await prisma.userDsaProgress.findMany({
        where: {
          userId: { in: Array.from(eligibleStudentIds) },
          isCompleted: true,
        },
        select: {
          questionId: true,
          categoryId: true,
          userId: true,
        },
      })
    : [];

  // Group completions by topic/question ID (using Set to guarantee uniqueness)
  const topicUsersMap = new Map<string, Set<string>>();
  for (const r of topicProgressRecords) {
    let set = topicUsersMap.get(r.topicId);
    if (!set) {
      set = new Set();
      topicUsersMap.set(r.topicId, set);
    }
    set.add(r.userId);
  }

  const dsaUsersMap = new Map<string, Set<string>>();
  for (const r of dsaProgressRecords) {
    let set = dsaUsersMap.get(r.questionId);
    if (!set) {
      set = new Set();
      dsaUsersMap.set(r.questionId, set);
    }
    set.add(r.userId);
  }

  // 5. Build detailed topic analytics array
  const allTopicItems: TopicAnalyticsItem[] = [];

  // A. Core Electronics Topics (101 topics)
  for (const stage of CORE_ELECTRONICS_STAGES) {
    for (const topic of stage.topics) {
      const allCompletedUsers = topicUsersMap.get(topic.id) || new Set();
      const validCompletedUsers = new Set(
        Array.from(allCompletedUsers).filter((uId) => coreEligibleIds.has(uId))
      );
      const completedCount = validCompletedUsers.size;
      const eligibleCount = coreEligibleCount;
      const notStartedCount = Math.max(0, eligibleCount - completedCount);
      const completionRate =
        eligibleCount > 0 ? Math.round((completedCount / eligibleCount) * 1000) / 10 : 0;

      allTopicItems.push({
        id: topic.id,
        serial: topic.serial,
        title: topic.title,
        subjectId: stage.id,
        subjectTitle: stage.title,
        difficulty: topic.difficulty || "Beginner",
        type: "roadmap",
        completedCount,
        eligibleCount,
        notStartedCount,
        completionRate,
        startedMetricAvailable: false,
        isAdminRestricted: false,
      });
    }
  }

  // B. DSA Questions (56 questions)
  let dsaIndex = 1;
  for (const cat of DSA_CATEGORIES) {
    for (const q of cat.questions) {
      const allCompletedUsers = dsaUsersMap.get(q.id) || new Set();
      const validCompletedUsers = new Set(
        Array.from(allCompletedUsers).filter((uId) => eligibleStudentIds.has(uId))
      );
      const completedCount = validCompletedUsers.size;
      const eligibleCount = eligibleStudentsCount;
      const notStartedCount = Math.max(0, eligibleCount - completedCount);
      const completionRate =
        eligibleCount > 0 ? Math.round((completedCount / eligibleCount) * 1000) / 10 : 0;

      allTopicItems.push({
        id: q.id,
        serial: `DSA-${dsaIndex++}`,
        title: q.title,
        subjectId: "dsa",
        subjectTitle: `DSA (${cat.title})`,
        difficulty: q.difficulty,
        type: "dsa",
        completedCount,
        eligibleCount,
        notStartedCount,
        completionRate,
        startedMetricAvailable: false,
        isAdminRestricted: false,
      });
    }
  }

  // C. Verilog HDL Topics (16 topics, admin restricted preview)
  for (const topic of VERILOG_HDL_STAGE.topics) {
    const allCompletedUsers = topicUsersMap.get(topic.id) || new Set();
    const validCompletedUsers = new Set(
      Array.from(allCompletedUsers).filter((uId) => coreEligibleIds.has(uId))
    );
    const completedCount = validCompletedUsers.size;
    const eligibleCount = coreEligibleCount;
    const notStartedCount = Math.max(0, eligibleCount - completedCount);
    const completionRate =
      eligibleCount > 0 ? Math.round((completedCount / eligibleCount) * 1000) / 10 : 0;

    allTopicItems.push({
      id: topic.id,
      serial: topic.serial,
      title: topic.title,
      subjectId: VERILOG_HDL_STAGE.id,
      subjectTitle: VERILOG_HDL_STAGE.title,
      difficulty: topic.difficulty || "Intermediate",
      type: "verilog",
      completedCount,
      eligibleCount,
      notStartedCount,
      completionRate,
      startedMetricAvailable: false,
      isAdminRestricted: true,
    });
  }

  // 6. Build Subject-Wise Analytics Summaries
  const subjects: SubjectAnalyticsSummary[] = [];

  // Core Electronics Stages
  for (const stage of CORE_ELECTRONICS_STAGES) {
    const stageTopics = allTopicItems.filter((t) => t.subjectId === stage.id);
    const activeUsersInStage = new Set<string>();

    for (const t of stageTopics) {
      const users = topicUsersMap.get(t.id);
      if (users) {
        for (const u of users) {
          if (coreEligibleIds.has(u)) activeUsersInStage.add(u);
        }
      }
    }

    const totalCompletions = stageTopics.reduce((sum, t) => sum + t.completedCount, 0);
    const avgCompletionRate =
      stageTopics.length > 0
        ? Math.round(
            (stageTopics.reduce((sum, t) => sum + t.completionRate, 0) / stageTopics.length) * 10
          ) / 10
        : 0;

    subjects.push({
      id: stage.id,
      title: stage.title,
      totalTopics: stageTopics.length,
      studentsActiveCount: activeUsersInStage.size,
      totalCompletions,
      avgCompletionRate,
      eligibleCount: coreEligibleCount,
      isAdminRestricted: false,
    });
  }

  // DSA Subject Summary
  const dsaTopics = allTopicItems.filter((t) => t.type === "dsa");
  const activeUsersInDsa = new Set<string>();
  for (const t of dsaTopics) {
    const users = dsaUsersMap.get(t.id);
    if (users) {
      for (const u of users) {
        if (eligibleStudentIds.has(u)) activeUsersInDsa.add(u);
      }
    }
  }
  const totalDsaCompletions = dsaTopics.reduce((sum, t) => sum + t.completedCount, 0);
  const avgDsaCompletionRate =
    dsaTopics.length > 0
      ? Math.round(
          (dsaTopics.reduce((sum, t) => sum + t.completionRate, 0) / dsaTopics.length) * 10
        ) / 10
      : 0;

  subjects.push({
    id: "dsa",
    title: "DSA (C & Hardware)",
    totalTopics: dsaTopics.length,
    studentsActiveCount: activeUsersInDsa.size,
    totalCompletions: totalDsaCompletions,
    avgCompletionRate: avgDsaCompletionRate,
    eligibleCount: eligibleStudentsCount,
    isAdminRestricted: false,
  });

  // Verilog HDL Subject Summary (Admin Restricted Preview)
  const verilogTopics = allTopicItems.filter((t) => t.type === "verilog");
  const activeUsersInVerilog = new Set<string>();
  for (const t of verilogTopics) {
    const users = topicUsersMap.get(t.id);
    if (users) {
      for (const u of users) {
        if (coreEligibleIds.has(u)) activeUsersInVerilog.add(u);
      }
    }
  }
  const totalVerilogCompletions = verilogTopics.reduce((sum, t) => sum + t.completedCount, 0);
  const avgVerilogCompletionRate =
    verilogTopics.length > 0
      ? Math.round(
          (verilogTopics.reduce((sum, t) => sum + t.completionRate, 0) / verilogTopics.length) * 10
        ) / 10
      : 0;

  subjects.push({
    id: VERILOG_HDL_STAGE.id,
    title: VERILOG_HDL_STAGE.title,
    totalTopics: verilogTopics.length,
    studentsActiveCount: activeUsersInVerilog.size,
    totalCompletions: totalVerilogCompletions,
    avgCompletionRate: avgVerilogCompletionRate,
    eligibleCount: coreEligibleCount,
    isAdminRestricted: true,
  });

  // 7. Calculate Student Cohort Overview Metrics (Roadmap + DSA, excluding Verilog from public cohort)
  const studentCohortTopics = allTopicItems.filter((t) => !t.isAdminRestricted);
  const totalStudentCohortItems = studentCohortTopics.length; // 101 Core + 56 DSA = 157
  const totalCurriculumItems = allTopicItems.length; // 173

  const totalCompletionRecords = studentCohortTopics.reduce(
    (sum, t) => sum + t.completedCount,
    0
  );
  const zeroCompletionTopicsCount = studentCohortTopics.filter(
    (t) => t.completedCount === 0
  ).length;

  const avgTopicCompletionRate =
    totalStudentCohortItems > 0
      ? Math.round(
          (studentCohortTopics.reduce((sum, t) => sum + t.completionRate, 0) /
            totalStudentCohortItems) *
            10
        ) / 10
      : 0;

  const hasSufficientSample = eligibleStudentsCount >= 3;

  // 8. Identify Least & Most Completed Topics (among student cohort items)
  // Stable sort: primary completionRate asc, secondary completedCount asc
  const leastCompletedTopics = [...studentCohortTopics]
    .sort((a, b) => {
      if (a.completionRate !== b.completionRate) return a.completionRate - b.completionRate;
      return a.completedCount - b.completedCount;
    })
    .slice(0, 6);

  // Stable sort: primary completionRate desc, secondary completedCount desc
  const mostCompletedTopics = [...studentCohortTopics]
    .sort((a, b) => {
      if (b.completionRate !== a.completionRate) return b.completionRate - a.completionRate;
      return b.completedCount - a.completedCount;
    })
    .slice(0, 6);

  return {
    overview: {
      totalCurriculumItems,
      totalStudentCohortItems,
      totalCompletionRecords,
      avgTopicCompletionRate,
      zeroCompletionTopicsCount,
      eligibleStudentsCount,
      hasSufficientSample,
    },
    subjects,
    topics: allTopicItems,
    leastCompletedTopics,
    mostCompletedTopics,
    eligibleStudentsCount,
    hasSufficientSample,
  };
}
