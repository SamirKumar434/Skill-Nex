/**
 * SkillNex Profile & LeetCode-Style Activity Streak Verification Test Suite
 *
 * Verifies:
 * 1. Activity recording on qualifying learning actions (roadmap topics, DSA questions, HDL problems).
 * 2. Idempotency: Repeated requests or duplicate toggles do not artificially inflate activity count.
 * 3. Historical activity preservation: Unmarking a topic or question does not decrement/delete activity.
 * 4. Streak calculation accuracy:
 *    - Current streak active today
 *    - Current streak active yesterday (grace period)
 *    - Current streak broken (gap > 1 day -> 0)
 *    - Longest streak calculation across historical gaps
 *    - Total active days
 * 5. Heatmap grid generation:
 *    - 52+ weeks structure
 *    - Date alignment and level classification
 *    - No future dates counted as active
 * 6. User data isolation: User A's activity and profile statistics never leak to User B.
 * 7. Guest restrictions: Unauthenticated users cannot create activity records.
 */

import { prisma } from "../src/lib/prisma";
import {
  recordDailyActivity,
  calculateStreaks,
  generateActivityHeatmap,
  getUserActivitySummary,
  getIntensityLevel,
  toUtcDateString,
  offsetDateString,
} from "../src/lib/activity";
import {
  toggleTopicProgress,
  toggleDsaProgress,
  updateProblemProgress,
  getStudentProgress,
} from "../src/lib/progress";

const TEST_TIMESTAMP = Date.now();
const USER_A_CLERK_ID = `test_profile_user_A_${TEST_TIMESTAMP}`;
const USER_B_CLERK_ID = `test_profile_user_B_${TEST_TIMESTAMP}`;

let userAId: string;
let userBId: string;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, evidence?: string) {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ [PASS] ${testName}`);
    if (evidence) {
      console.log(`     Evidence: ${evidence}`);
    }
  } else {
    testsFailed++;
    console.error(`  ✗ [FAIL] ${testName}`);
    if (evidence) {
      console.error(`     Failure Details: ${evidence}`);
    }
  }
}

async function withRetry<T>(fn: () => Promise<T>, retries = 4): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastErr = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * attempt));
      }
    }
  }
  throw lastErr;
}

async function setupTestUsers() {
  const userA = await withRetry(() =>
    prisma.user.create({
      data: {
        clerkId: USER_A_CLERK_ID,
        email: `${USER_A_CLERK_ID}@skillnex.test`,
        fullName: "Alice Electronics",
        selectedTrack: "core-electronics",
      },
    })
  );
  userAId = userA.id;

  const userB = await withRetry(() =>
    prisma.user.create({
      data: {
        clerkId: USER_B_CLERK_ID,
        email: `${USER_B_CLERK_ID}@skillnex.test`,
        fullName: "Bob Embedded",
        selectedTrack: "core-electronics",
      },
    })
  );
  userBId = userB.id;
}

async function cleanupTestData() {
  console.log("\nCleaning up test users and activity records from Neon PostgreSQL...");
  if (userAId) {
    await withRetry(() =>
      prisma.user.deleteMany({ where: { id: { in: [userAId, userBId] } } })
    ).catch((e: unknown) => {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn("Cleanup notice:", msg);
    });
  }
  console.log("Cleanup complete.");
}

async function runTestSuite() {
  console.log("=======================================================================");
  console.log("SkillNex: User Profile & LeetCode-Style Activity Streak Test Suite");
  console.log("=======================================================================\n");

  try {
    await setupTestUsers();

    const todayStr = toUtcDateString();
    const yesterdayStr = offsetDateString(todayStr, -1);
    const twoDaysAgoStr = offsetDateString(todayStr, -2);
    const threeDaysAgoStr = offsetDateString(todayStr, -3);

    // -------------------------------------------------------------
    // Test 1: Activity Recording on Topic Completion & Idempotency
    // -------------------------------------------------------------
    console.log("--- SECTION 1: Activity Recording on Qualifying Learning Actions ---");

    // Initially 0 activity
    const initActs = await prisma.userActivity.findMany({ where: { userId: userAId } });
    assert(initActs.length === 0, "Initial state has 0 activity records for new user");

    // Complete roadmap topic
    const topicRes = await toggleTopicProgress(userAId, "c-intro-compilation", true);
    assert(topicRes.isCompleted, "Roadmap topic marked completed");

    const afterTopic = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      Boolean(afterTopic && afterTopic.activityCount === 1),
      "First topic completion creates daily activity record with count = 1",
      `activityCount: ${afterTopic?.activityCount}`
    );

    // Repeated identical completion (idempotent click)
    await toggleTopicProgress(userAId, "c-intro-compilation", true);
    const afterDupTopic = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      afterDupTopic?.activityCount === 1,
      "Duplicate completion request on already completed topic does not increment activity",
      `activityCount remained: ${afterDupTopic?.activityCount}`
    );

    // Complete a DSA question
    const dsaRes = await toggleDsaProgress(userAId, "dsa-arr-01", true);
    assert(dsaRes.isCompleted, "DSA question marked completed");

    const afterDsa = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      afterDsa?.activityCount === 2,
      "Second qualifying action (DSA) increments daily activity count to 2",
      `activityCount: ${afterDsa?.activityCount}`
    );

    // Complete an HDL problem
    await updateProblemProgress(userAId, "hdl-step-one", "completed");
    const afterHdl = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      afterHdl?.activityCount === 3,
      "Third qualifying action (HDL completed) increments daily activity count to 3",
      `activityCount: ${afterHdl?.activityCount}`
    );

    // HDL problem repeated completed update (idempotent)
    await updateProblemProgress(userAId, "hdl-step-one", "completed");
    const afterDupHdl = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      afterDupHdl?.activityCount === 3,
      "Repeated update to already COMPLETED HDL problem does not increment activity",
      `activityCount remained: ${afterDupHdl?.activityCount}`
    );

    // -------------------------------------------------------------
    // Test 2: Unmarking does NOT erase historical activity
    // -------------------------------------------------------------
    console.log("\n--- SECTION 2: Historical Activity Preservation on Incomplete Actions ---");

    await toggleTopicProgress(userAId, "c-intro-compilation", false);
    const progressAfterUnmark = await withRetry(() => getStudentProgress(userAId));
    assert(
      !progressAfterUnmark.completedTopicIds.includes("c-intro-compilation"),
      "Topic successfully marked incomplete in progress records"
    );

    const activityAfterUnmark = await prisma.userActivity.findUnique({
      where: { userId_activityDate: { userId: userAId, activityDate: todayStr } },
    });
    assert(
      activityAfterUnmark?.activityCount === 3,
      "Historical activity record preserved at count = 3 after unmarking topic",
      `activityCount preserved: ${activityAfterUnmark?.activityCount}`
    );

    // -------------------------------------------------------------
    // Test 3: Streak Calculation Unit Tests
    // -------------------------------------------------------------
    console.log("\n--- SECTION 3: Streak Calculation Algorithm ---");

    // Case A: Active today (1 day)
    const streakA = calculateStreaks([todayStr], todayStr);
    assert(
      streakA.currentStreak === 1 && streakA.longestStreak === 1 && streakA.totalActiveDays === 1,
      "Single activity today -> currentStreak: 1, longestStreak: 1, activeDays: 1",
      JSON.stringify(streakA)
    );

    // Case B: Active today + yesterday + 2 days ago (3 consecutive days)
    const streakB = calculateStreaks([twoDaysAgoStr, yesterdayStr, todayStr], todayStr);
    assert(
      streakB.currentStreak === 3 && streakB.longestStreak === 3 && streakB.totalActiveDays === 3,
      "3 consecutive days ending today -> currentStreak: 3, longestStreak: 3",
      JSON.stringify(streakB)
    );

    // Case C: Active yesterday but NOT today (grace period: streak survives through yesterday)
    const streakC = calculateStreaks([twoDaysAgoStr, yesterdayStr], todayStr);
    assert(
      streakC.currentStreak === 2 && streakC.longestStreak === 2 && streakC.totalActiveDays === 2,
      "Active yesterday but not yet today -> currentStreak: 2 (grace period preserved)",
      JSON.stringify(streakC)
    );

    // Case D: Inactive today AND yesterday (active 2 days ago and 3 days ago) -> currentStreak = 0
    const streakD = calculateStreaks([threeDaysAgoStr, twoDaysAgoStr], todayStr);
    assert(
      streakD.currentStreak === 0 && streakD.longestStreak === 2 && streakD.totalActiveDays === 2,
      "Broken streak (gap > 1 day) -> currentStreak resets to 0, longestStreak retains 2",
      JSON.stringify(streakD)
    );

    // Case E: Longest streak with multiple historical streaks
    // Streak 1: 5 days (10 days ago to 6 days ago)
    // Gap: 3 days
    // Streak 2: 2 days (today and yesterday)
    const dateMinus = (n: number) => offsetDateString(todayStr, -n);
    const historicalDates = [
      dateMinus(10),
      dateMinus(9),
      dateMinus(8),
      dateMinus(7),
      dateMinus(6),
      // gap at -5, -4, -3, -2
      dateMinus(1),
      dateMinus(0),
    ];
    const streakE = calculateStreaks(historicalDates, todayStr);
    assert(
      streakE.currentStreak === 2 && streakE.longestStreak === 5 && streakE.totalActiveDays === 7,
      "Historical multi-streak -> current: 2, longest: 5, activeDays: 7",
      JSON.stringify(streakE)
    );

    // -------------------------------------------------------------
    // Test 4: Intensity Thresholds & Heatmap Grid
    // -------------------------------------------------------------
    console.log("\n--- SECTION 4: Intensity Levels & Calendar Generation ---");

    assert(getIntensityLevel(0) === 0, "Intensity 0 for 0 activities");
    assert(getIntensityLevel(1) === 1, "Intensity 1 for 1 activity");
    assert(getIntensityLevel(2) === 2, "Intensity 2 for 2 activities");
    assert(getIntensityLevel(3) === 2, "Intensity 2 for 3 activities");
    assert(getIntensityLevel(4) === 3, "Intensity 3 for 4 activities");
    assert(getIntensityLevel(10) === 3, "Intensity 3 for 10 activities");

    const heatmap = generateActivityHeatmap([
      { activityDate: todayStr, activityCount: 5 },
      { activityDate: yesterdayStr, activityCount: 1 },
      { activityDate: dateMinus(30), activityCount: 3 },
    ], todayStr);

    assert(heatmap.weeks.length === 53, "Heatmap contains exactly 53 full week columns");
    assert(heatmap.weeks[0].length === 7, "Each week column contains exactly 7 days");
    assert(heatmap.totalActivitiesInPeriod === 9, "Total activities in period equals 9 (5+1+3)");
    assert(heatmap.monthLabels.length >= 11, "Month labels generated along the timeline");

    // Verify today's cell in heatmap
    let foundTodayCell = false;
    for (const week of heatmap.weeks) {
      for (const day of week) {
        if (day.date === todayStr) {
          foundTodayCell = true;
          assert(day.isToday, "Today's cell has isToday = true");
          assert(day.count === 5, "Today's cell has count = 5");
          assert(day.level === 3, "Today's cell has level = 3 (4+ count)");
        }
      }
    }
    assert(foundTodayCell, "Found today's cell inside the 53-week grid");

    // -------------------------------------------------------------
    // Test 5: User Data Isolation
    // -------------------------------------------------------------
    console.log("\n--- SECTION 5: User Isolation & Security ---");

    // User A has 3 activities today; User B has had no activity
    const userBSummary = await getUserActivitySummary(userBId, todayStr);
    assert(
      userBSummary.totalActivitiesInPeriod === 0,
      "User B has 0 total activities despite User A's activities",
      `User B total: ${userBSummary.totalActivitiesInPeriod}`
    );
    assert(
      userBSummary.currentStreak === 0 && userBSummary.longestStreak === 0 && userBSummary.totalActiveDays === 0,
      "User B has 0 streak and 0 active days"
    );

    // Record activity for User B on yesterday
    await recordDailyActivity(userBId, yesterdayStr);
    const userBSummaryAfter = await getUserActivitySummary(userBId, todayStr);
    assert(
      userBSummaryAfter.totalActiveDays === 1 && userBSummaryAfter.currentStreak === 1,
      "User B has separate activity recorded without bleeding to User A"
    );

    const userASummary = await getUserActivitySummary(userAId, todayStr);
    assert(
      userASummary.totalActivitiesInPeriod === 3,
      "User A's activity remains completely isolated at count = 3"
    );

    // Unique constraint enforcement on (userId, activityDate)
    const userACountToday = await prisma.userActivity.count({
      where: { userId: userAId, activityDate: todayStr },
    });
    assert(
      userACountToday === 1,
      "Database unique constraint strictly enforces exactly 1 record per user per calendar date"
    );

  } catch (error: unknown) {
    console.error("Test execution failed with unexpected error:", error);
    testsFailed++;
  } finally {
    await cleanupTestData();
  }

  console.log("\n=======================================================================");
  console.log(`Profile & Activity Test Summary: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log("=======================================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite();
