import { prisma } from "@/lib/prisma";

/**
 * SkillNex Activity Tracking & Streak Calculation Service
 *
 * Persists daily learning activity in Neon PostgreSQL (UserActivity model).
 * Computes LeetCode-style activity streaks, total active days, and 52-week heatmap grid.
 *
 * Timezone Convention:
 * Calendar dates are strictly standardized on UTC formatted as "YYYY-MM-DD"
 * (ISO 8601 UTC date string, e.g. new Date().toISOString().split("T")[0]).
 * This prevents timezone boundary drift, DST shifting, and duplicate date collisions.
 */

export interface CalendarDay {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3;
  isFuture: boolean;
  isToday: boolean;
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export interface MonthLabel {
  name: string; // "Jan", "Feb", etc.
  weekIndex: number;
}

export interface UserActivitySummary {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  totalActivitiesInPeriod: number;
  weeks: CalendarDay[][];
  monthLabels: MonthLabel[];
}

/**
 * Normalizes a Date into UTC "YYYY-MM-DD"
 */
export function toUtcDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/**
 * Calculates day difference (B - A) in whole calendar days
 */
export function getDaysDifference(dateStrA: string, dateStrB: string): number {
  const [yA, mA, dA] = dateStrA.split("-").map(Number);
  const [yB, mB, dB] = dateStrB.split("-").map(Number);
  const utcA = Date.UTC(yA, mA - 1, dA);
  const utcB = Date.UTC(yB, mB - 1, dB);
  return Math.round((utcB - utcA) / (1000 * 60 * 60 * 24));
}

/**
 * Offsets a "YYYY-MM-DD" string by a number of days
 */
export function offsetDateString(dateStr: string, offsetDays: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

/**
 * Records a qualifying learning activity for the authenticated user.
 * Increments the activityCount for the current calendar day (UTC) idempotently.
 */
export async function recordDailyActivity(
  dbUserId: string,
  dateStr?: string
): Promise<void> {
  if (!dbUserId) return;

  const activityDate = dateStr || toUtcDateString();

  try {
    await prisma.userActivity.upsert({
      where: {
        userId_activityDate: {
          userId: dbUserId,
          activityDate,
        },
      },
      create: {
        userId: dbUserId,
        activityDate,
        activityCount: 1,
      },
      update: {
        activityCount: {
          increment: 1,
        },
      },
    });
  } catch (error: unknown) {
    // Non-fatal logging to ensure core progress operation never fails if activity recording errors
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[SkillNex Activity] Failed to record activity for user ${dbUserId}:`, message);
  }
}

/**
 * Computes streaks from a list of unique active dates ("YYYY-MM-DD")
 */
export function calculateStreaks(
  activeDates: string[],
  referenceDateStr?: string
): { currentStreak: number; longestStreak: number; totalActiveDays: number } {
  const uniqueDates = Array.from(new Set(activeDates.filter(Boolean))).sort();
  const totalActiveDays = uniqueDates.length;

  if (totalActiveDays === 0) {
    return { currentStreak: 0, longestStreak: 0, totalActiveDays: 0 };
  }

  const dateSet = new Set(uniqueDates);
  const todayStr = referenceDateStr || toUtcDateString();
  const yesterdayStr = offsetDateString(todayStr, -1);

  // 1. Current streak calculation
  let currentStreak = 0;
  let checkDate: string | null = null;

  if (dateSet.has(todayStr)) {
    checkDate = todayStr;
  } else if (dateSet.has(yesterdayStr)) {
    // Active yesterday, streak remains alive through yesterday
    checkDate = yesterdayStr;
  }

  if (checkDate) {
    while (dateSet.has(checkDate)) {
      currentStreak += 1;
      checkDate = offsetDateString(checkDate, -1);
    }
  }

  // 2. Longest streak calculation across all historical active dates
  let longestStreak = 0;
  let runningStreak = 0;
  let prevDateStr: string | null = null;

  for (const dateStr of uniqueDates) {
    if (!prevDateStr) {
      runningStreak = 1;
    } else {
      const diff = getDaysDifference(prevDateStr, dateStr);
      if (diff === 1) {
        runningStreak += 1;
      } else if (diff > 1) {
        runningStreak = 1;
      }
      // diff === 0 handled by Set deduplication
    }
    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
    prevDateStr = dateStr;
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays,
  };
}

/**
 * Maps activity count to deterministic intensity level:
 * 0 = inactive
 * 1 = low
 * 2 = medium (2-3)
 * 3 = high (4+)
 */
export function getIntensityLevel(count: number): 0 | 1 | 2 | 3 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  return 3;
}

/**
 * Generates a 52-week LeetCode-style activity calendar grid
 * aligned by weekday columns (Sunday - Saturday)
 */
export function generateActivityHeatmap(
  activities: { activityDate: string; activityCount: number }[],
  referenceDateStr?: string
): { weeks: CalendarDay[][]; monthLabels: MonthLabel[]; totalActivitiesInPeriod: number } {
  const countMap = new Map<string, number>();
  for (const act of activities) {
    countMap.set(act.activityDate, act.activityCount);
  }

  const todayStr = referenceDateStr || toUtcDateString();
  const [tYear, tMonth, tDay] = todayStr.split("-").map(Number);
  const todayUtc = new Date(Date.UTC(tYear, tMonth - 1, tDay));

  // End calendar at the Saturday of current week (or today if Saturday)
  const todayDayOfWeek = todayUtc.getUTCDay(); // 0 (Sun) to 6 (Sat)
  const daysUntilSaturday = 6 - todayDayOfWeek;
  const endDate = new Date(todayUtc);
  endDate.setUTCDate(endDate.getUTCDate() + daysUntilSaturday);

  // We want 52 full weeks (52 * 7 = 364 days). Total 53 columns to guarantee complete past 365 days.
  const totalWeeks = 53;
  const totalDays = totalWeeks * 7;
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - (totalDays - 1));

  const weeks: CalendarDay[][] = [];
  const monthLabels: MonthLabel[] = [];
  let lastLabeledMonth = -1;
  let totalActivitiesInPeriod = 0;

  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const currentDate = new Date(startDate);

  for (let w = 0; w < totalWeeks; w++) {
    const weekDays: CalendarDay[] = [];
    let weekMonth = -1;

    for (let d = 0; d < 7; d++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = countMap.get(dateStr) || 0;
      const isToday = dateStr === todayStr;
      const isFuture = getDaysDifference(todayStr, dateStr) > 0;

      if (!isFuture) {
        totalActivitiesInPeriod += count;
      }

      // Check if this week transitions to a new month (check on the first day of the week or 1st of month)
      const currentMonth = currentDate.getUTCMonth();
      if (currentDate.getUTCDate() <= 7 && weekMonth === -1) {
        weekMonth = currentMonth;
      }

      weekDays.push({
        date: dateStr,
        count: isFuture ? 0 : count,
        level: isFuture ? 0 : getIntensityLevel(count),
        isFuture,
        isToday,
        dayOfWeek: d,
      });

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    if (weekMonth !== -1 && weekMonth !== lastLabeledMonth) {
      monthLabels.push({
        name: shortMonths[weekMonth],
        weekIndex: w,
      });
      lastLabeledMonth = weekMonth;
    }

    weeks.push(weekDays);
  }

  return {
    weeks,
    monthLabels,
    totalActivitiesInPeriod,
  };
}

/**
 * Fetches user activity from DB and calculates full summary
 */
export async function getUserActivitySummary(
  dbUserId: string,
  referenceDateStr?: string
): Promise<UserActivitySummary> {
  const records = await prisma.userActivity.findMany({
    where: { userId: dbUserId },
    select: { activityDate: true, activityCount: true },
    orderBy: { activityDate: "asc" },
  });

  const activeDates = records
    .filter((r) => r.activityCount > 0)
    .map((r) => r.activityDate);

  const streakStats = calculateStreaks(activeDates, referenceDateStr);
  const heatmap = generateActivityHeatmap(records, referenceDateStr);

  return {
    currentStreak: streakStats.currentStreak,
    longestStreak: streakStats.longestStreak,
    totalActiveDays: streakStats.totalActiveDays,
    totalActivitiesInPeriod: heatmap.totalActivitiesInPeriod,
    weeks: heatmap.weeks,
    monthLabels: heatmap.monthLabels,
  };
}
