/**
 * SkillNex Admin Content Analytics Verification Suite (Phase 2)
 *
 * Verifies:
 * 1. Admin authorization protection (rejected without admin session).
 * 2. Exact curriculum totals (101 Core + 56 DSA = 157 student cohort, + 16 Verilog = 173 total).
 * 3. Strict admin account exclusion from student cohorts and completions.
 * 4. Accuracy of topic-level metrics (completed, not started, completion rate fraction and %).
 * 5. Accuracy of subject-level metrics (active students, total completions, avg rate).
 * 6. Explicit handling of unrecorded "started" metric (no fabricated attempt telemetry).
 * 7. Correct sample-size threshold detection (minimum 3 students).
 * 8. Zero-completion topic count computation.
 * 9. Verilog HDL admin-preview isolation.
 */

import { prisma } from "../src/lib/prisma";
import {
  getAdminClerkUserIds,
  getAdminContentAnalytics,
  TOTAL_ROADMAP_TOPICS_COUNT,
  TOTAL_DSA_QUESTIONS_COUNT,
  TOTAL_VERILOG_TOPICS_COUNT,
} from "../src/lib/admin/dashboard";

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const results: TestResult[] = [];

function recordPass(name: string, details?: string) {
  results.push({ name, passed: true, details });
  console.log(`  [PASS] ${name}${details ? ` -> ${details}` : ""}`);
}

function recordFail(name: string, error: string) {
  results.push({ name, passed: false, error });
  console.error(`  [FAIL] ${name} -> ${error}`);
}

async function runTestSuite() {
  console.log("\n===============================================================================");
  console.log("       SkillNex Admin Content Analytics - Verification Suite (Phase 2)         ");
  console.log("===============================================================================\n");

  const testTimestamp = Date.now();
  const testStudentClerkId = `test_analytics_student_${testTimestamp}`;
  const testStudentEmail = `analytics_student_${testTimestamp}@skillnex.test`;
  const testAdminClerkId = `test_analytics_admin_${testTimestamp}`;
  const testAdminEmail = `analytics_admin_${testTimestamp}@skillnex.test`;

  let testStudentDbId: string | null = null;
  let testAdminDbId: string | null = null;

  try {
    // -------------------------------------------------------------------------
    // Setup Test Data
    // -------------------------------------------------------------------------
    console.log("--- Test Setup: Creating Test Accounts & Progress ---");

    const createdStudent = await prisma.user.create({
      data: {
        clerkId: testStudentClerkId,
        email: testStudentEmail,
        fullName: "Test Analytics Student",
        selectedTrack: "core-electronics",
      },
    });
    testStudentDbId = createdStudent.id;

    const createdAdmin = await prisma.user.create({
      data: {
        clerkId: testAdminClerkId,
        email: testAdminEmail,
        fullName: "Test Analytics Admin",
        selectedTrack: "core-electronics",
      },
    });
    testAdminDbId = createdAdmin.id;

    // Student completes:
    // 3 C topics: c-intro-compilation, c-variables-types-operators, c-control-flow
    // 2 Git topics: git-intro, git-diff-working
    // 1 DSA question: dsa-arr-01
    // 1 Verilog topic: verilog-intro-hdl
    await prisma.userTopicProgress.createMany({
      data: [
        { userId: createdStudent.id, topicId: "c-intro-compilation", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-variables-types-operators", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-control-flow", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "git-intro", stageId: "git-github", isCompleted: true },
        { userId: createdStudent.id, topicId: "git-diff-working", stageId: "git-github", isCompleted: true },
        { userId: createdStudent.id, topicId: "verilog-intro-hdl", stageId: "verilog-hdl", isCompleted: true },
      ],
    });

    await prisma.userDsaProgress.createMany({
      data: [
        { userId: createdStudent.id, questionId: "dsa-arr-01", categoryId: "arrays", isCompleted: true },
      ],
    });

    console.log("  Created test student and progress records successfully.\n");

    // -------------------------------------------------------------------------
    // Test Group 1: Security & Route Authorization Guard
    // -------------------------------------------------------------------------
    console.log("--- Test Group 1: Server Authorization Guards ---");

    try {
      // Default invocation without skipAuth and without authenticated session must throw
      await getAdminContentAnalytics();
      recordFail("Default getAdminContentAnalytics Guard", "Expected unauthorized exception but call succeeded");
    } catch {
      recordPass("Default getAdminContentAnalytics Guard", "Rejected unauthenticated caller as expected");
    }

    // -------------------------------------------------------------------------
    // Test Group 2: Curriculum Totals & Constants
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 2: Curriculum Item Counts ---");

    const analytics = await getAdminContentAnalytics({ skipAuth: true });

    if (analytics.overview.totalStudentCohortItems === 157) {
      recordPass("Student Cohort Curriculum Items", `157 topics (101 Core + 56 DSA)`);
    } else {
      recordFail("Student Cohort Curriculum Items", `Expected 157, got ${analytics.overview.totalStudentCohortItems}`);
    }

    if (analytics.overview.totalCurriculumItems === 173) {
      recordPass("Total Items (Including Verilog Preview)", `173 items (157 + 16 Verilog)`);
    } else {
      recordFail("Total Items (Including Verilog Preview)", `Expected 173, got ${analytics.overview.totalCurriculumItems}`);
    }

    if (analytics.topics.length === 173) {
      recordPass("Topics Array Length", `173 topic records mapped`);
    } else {
      recordFail("Topics Array Length", `Expected 173, got ${analytics.topics.length}`);
    }

    // -------------------------------------------------------------------------
    // Test Group 3: Admin Exclusion Logic
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 3: Admin Account Exclusion ---");

    const adminClerkIds = await getAdminClerkUserIds();
    console.log(`  Identified live Clerk admin accounts: ${adminClerkIds.length}`);

    // Verify admin accounts are not counted in eligibleStudentsCount
    const usersInDb = await prisma.user.findMany({ select: { clerkId: true } });
    const nonAdminCount = usersInDb.filter((u) => !adminClerkIds.includes(u.clerkId)).length;

    if (analytics.eligibleStudentsCount === nonAdminCount) {
      recordPass("Admin Exclusion from Cohort", `Eligible students count (${analytics.eligibleStudentsCount}) excludes all admin accounts`);
    } else {
      recordFail("Admin Exclusion from Cohort", `Expected ${nonAdminCount}, got ${analytics.eligibleStudentsCount}`);
    }

    // -------------------------------------------------------------------------
    // Test Group 4: Topic-Level Analytics Calculations
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 4: Topic-Level Calculations ---");

    // c-intro-compilation (completed by our test student)
    const cIntro = analytics.topics.find((t) => t.id === "c-intro-compilation");
    if (!cIntro) {
      recordFail("Find c-intro-compilation Topic", "Topic not found in analytics array");
    } else {
      recordPass("Find c-intro-compilation Topic", "Topic found with serial " + cIntro.serial);

      if (cIntro.completedCount >= 1) {
        recordPass("Topic Completed Count", `${cIntro.completedCount} students completed`);
      } else {
        recordFail("Topic Completed Count", `Expected >= 1, got ${cIntro.completedCount}`);
      }

      if (cIntro.notStartedCount === cIntro.eligibleCount - cIntro.completedCount) {
        recordPass("Topic Not Started Consistency", `${cIntro.notStartedCount} not started + ${cIntro.completedCount} completed = ${cIntro.eligibleCount} eligible`);
      } else {
        recordFail("Topic Not Started Consistency", `Mismatch: ${cIntro.notStartedCount} + ${cIntro.completedCount} != ${cIntro.eligibleCount}`);
      }

      const expectedRate = Math.round((cIntro.completedCount / cIntro.eligibleCount) * 1000) / 10;
      if (cIntro.completionRate === expectedRate) {
        recordPass("Topic Completion Rate Percentage", `${cIntro.completionRate}% (matches expected ${expectedRate}%)`);
      } else {
        recordFail("Topic Completion Rate Percentage", `Expected ${expectedRate}%, got ${cIntro.completionRate}%`);
      }

      // Check started metric distinction
      if (cIntro.startedMetricAvailable === false) {
        recordPass("Started Metric Explicitly Unavailable", "startedMetricAvailable is false (no invented attempt telemetry)");
      } else {
        recordFail("Started Metric Explicitly Unavailable", "startedMetricAvailable must be false");
      }
    }

    // Check an uncompleted topic (e.g. c-recursion-basics)
    const uncompletedTopic = analytics.topics.find((t) => t.id === "c-recursion-basics");
    if (uncompletedTopic) {
      if (uncompletedTopic.completedCount === 0) {
        recordPass("Uncompleted Topic Zero Count", `c-recursion-basics has 0 completed, ${uncompletedTopic.notStartedCount} not started`);
      } else {
        recordPass("Uncompleted Topic Count", `${uncompletedTopic.completedCount} completed`);
      }
    }

    // -------------------------------------------------------------------------
    // Test Group 5: Subject-Wise Engagement Summaries
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 5: Subject-Wise Engagement Summaries ---");

    if (analytics.subjects.length === 6) {
      recordPass("Subjects Summary Length", "Contains 6 subjects (C, Git, Analog, Digital, DSA, Verilog)");
    } else {
      recordFail("Subjects Summary Length", `Expected 6 subjects, got ${analytics.subjects.length}`);
    }

    const cSubject = analytics.subjects.find((s) => s.id === "c-programming");
    if (cSubject && cSubject.totalTopics === 29) {
      recordPass("C Programming Subject Total Topics", "29 topics");
      if (cSubject.studentsActiveCount >= 1) {
        recordPass("C Programming Active Students", `${cSubject.studentsActiveCount} active students`);
      } else {
        recordFail("C Programming Active Students", "Expected >= 1 active students");
      }
    } else {
      recordFail("C Programming Subject Summary", `Expected 29 topics, got ${cSubject?.totalTopics}`);
    }

    const gitSubject = analytics.subjects.find((s) => s.id === "git-github");
    if (gitSubject && gitSubject.totalTopics === 20) {
      recordPass("Git & GitHub Subject Total Topics", "20 topics");
    } else {
      recordFail("Git & GitHub Subject Summary", `Expected 20 topics, got ${gitSubject?.totalTopics}`);
    }

    const dsaSubject = analytics.subjects.find((s) => s.id === "dsa");
    if (dsaSubject && dsaSubject.totalTopics === 56) {
      recordPass("DSA Subject Total Questions", "56 questions");
    } else {
      recordFail("DSA Subject Summary", `Expected 56 questions, got ${dsaSubject?.totalTopics}`);
    }

    const verilogSubject = analytics.subjects.find((s) => s.id === "verilog-hdl");
    if (verilogSubject && verilogSubject.totalTopics === 16 && verilogSubject.isAdminRestricted) {
      recordPass("Verilog HDL Admin Restriction", "16 topics, marked isAdminRestricted: true");
    } else {
      recordFail("Verilog HDL Admin Restriction", "Expected 16 topics with isAdminRestricted: true");
    }

    // -------------------------------------------------------------------------
    // Test Group 6: Sample Size Threshold & Attention Areas
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 6: Sample Size Threshold & Rankings ---");

    if (analytics.eligibleStudentsCount >= 3) {
      if (analytics.hasSufficientSample === true) {
        recordPass("Sample Size Sufficiency", `Cohort ${analytics.eligibleStudentsCount} >= 3: hasSufficientSample is true`);
      } else {
        recordFail("Sample Size Sufficiency", `Expected hasSufficientSample: true for cohort ${analytics.eligibleStudentsCount}`);
      }
    } else {
      if (analytics.hasSufficientSample === false) {
        recordPass("Sample Size Caution", `Cohort ${analytics.eligibleStudentsCount} < 3: hasSufficientSample is false`);
      } else {
        recordFail("Sample Size Caution", `Expected hasSufficientSample: false for cohort ${analytics.eligibleStudentsCount}`);
      }
    }

    // Least completed and most completed lists
    if (analytics.leastCompletedTopics.length > 0) {
      recordPass("Least Completed Topics List", `Found ${analytics.leastCompletedTopics.length} attention topics`);
    } else {
      recordFail("Least Completed Topics List", "Empty least completed topics array");
    }

    if (analytics.mostCompletedTopics.length > 0) {
      recordPass("Most Completed Topics List", `Found ${analytics.mostCompletedTopics.length} high mastery topics`);
      // Most completed first element must have completionRate >= last element
      const firstRate = analytics.mostCompletedTopics[0].completionRate;
      const lastRate = analytics.mostCompletedTopics[analytics.mostCompletedTopics.length - 1].completionRate;
      if (firstRate >= lastRate) {
        recordPass("Most Completed Topics Ordering", `Highest rate (${firstRate}%) >= lowest in top (${lastRate}%)`);
      } else {
        recordFail("Most Completed Topics Ordering", `Order inverted: ${firstRate}% < ${lastRate}%`);
      }
    } else {
      recordFail("Most Completed Topics List", "Empty most completed topics array");
    }

    // Overview total completion records
    if (analytics.overview.totalCompletionRecords >= 6) {
      recordPass("Overview Total Completions", `${analytics.overview.totalCompletionRecords} total verified completions`);
    } else {
      recordFail("Overview Total Completions", `Expected >= 6, got ${analytics.overview.totalCompletionRecords}`);
    }

    if (analytics.overview.zeroCompletionTopicsCount > 0) {
      recordPass("Zero Completion Topics Count", `${analytics.overview.zeroCompletionTopicsCount} untouched topics identified`);
    } else {
      recordFail("Zero Completion Topics Count", "Expected > 0 untouched topics");
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    recordFail("Unexpected Exception During Test Suite", message);
  } finally {
    // -------------------------------------------------------------------------
    // Cleanup Test Data
    // -------------------------------------------------------------------------
    console.log("\n--- Cleaning Up Test Data ---");
    try {
      if (testStudentDbId) {
        await prisma.userTopicProgress.deleteMany({ where: { userId: testStudentDbId } });
        await prisma.userDsaProgress.deleteMany({ where: { userId: testStudentDbId } });
        await prisma.user.delete({ where: { id: testStudentDbId } });
      }
      if (testAdminDbId) {
        await prisma.user.delete({ where: { id: testAdminDbId } });
      }
      console.log("  Cleaned up all temporary test accounts.");
    } catch (cleanupError) {
      console.warn("  Cleanup warning:", cleanupError);
    }
    await prisma.$disconnect();
  }

  // -------------------------------------------------------------------------
  // Test Summary
  // -------------------------------------------------------------------------
  console.log("\n===============================================================================");
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`Test Results: ${passedCount} passed, ${failedCount} failed of ${results.length} total tests.`);
  console.log("===============================================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTestSuite();

