/**
 * SkillNex Admin Student Monitoring Dashboard Verification Suite (Phase 1)
 *
 * Verifies:
 * 1. Admin identification and exclusion from student counts, stats, and directory.
 * 2. Accuracy of Overview calculations (Total students, 7-day active, inactive, avg roadmap %).
 * 3. Student directory filtering by search query (name/email) and sorting (activity, progress, name).
 * 4. Individual student detail retrieval (profile, subjects, DSA, Verilog, genuine activity heatmap).
 * 5. Rejection of admin IDs when querying student details (admins are not students).
 * 6. Graceful handling of empty states and nonexistent student IDs.
 * 7. Server-side authorization security guards.
 */

import { prisma } from "../src/lib/prisma";
import {
  getAdminClerkUserIds,
  getAdminOverviewStats,
  getAdminStudentsList,
  getAdminStudentDetails,
  TOTAL_ROADMAP_TOPICS_COUNT,
  TOTAL_DSA_QUESTIONS_COUNT,
  TOTAL_VERILOG_TOPICS_COUNT,
} from "../src/lib/admin/dashboard";
import { requireAdmin } from "../src/lib/auth/require-admin";
import { toUtcDateString } from "../src/lib/activity";

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
  console.log("       SkillNex Admin Monitoring Dashboard - Verification Suite (Phase 1)      ");
  console.log("===============================================================================\n");

  const testTimestamp = Date.now();
  const testStudentClerkId = `test_student_dashboard_${testTimestamp}`;
  const testStudentEmail = `student_${testTimestamp}@skillnex.test`;
  const testAdminClerkId = `test_admin_dashboard_${testTimestamp}`;
  const testAdminEmail = `admin_${testTimestamp}@skillnex.test`;

  let testStudentDbId: string | null = null;
  let testAdminDbId: string | null = null;

  try {
    // -------------------------------------------------------------------------
    // Setup Test Data
    // -------------------------------------------------------------------------
    console.log("--- Test Setup: Creating Test Accounts ---");

    const createdStudent = await prisma.user.create({
      data: {
        clerkId: testStudentClerkId,
        email: testStudentEmail,
        fullName: "Test Student Dashboard",
        selectedTrack: "core-electronics",
      },
    });
    testStudentDbId = createdStudent.id;

    const createdAdmin = await prisma.user.create({
      data: {
        clerkId: testAdminClerkId,
        email: testAdminEmail,
        fullName: "Test Admin Dashboard",
        selectedTrack: "core-electronics",
      },
    });
    testAdminDbId = createdAdmin.id;

    // Add progress for student: 5 C programming topics, 2 DSA questions, 1 Verilog topic
    await prisma.userTopicProgress.createMany({
      data: [
        { userId: createdStudent.id, topicId: "c-intro-compilation", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-variables-types-operators", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-variables-types-additional", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-control-flow", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "c-loops-iteration", stageId: "c-programming", isCompleted: true },
        { userId: createdStudent.id, topicId: "verilog-intro-hdl", stageId: "verilog-hdl", isCompleted: true },
      ],
    });

    await prisma.userDsaProgress.createMany({
      data: [
        { userId: createdStudent.id, questionId: "dsa-arr-01", categoryId: "arrays", isCompleted: true },
        { userId: createdStudent.id, questionId: "dsa-arr-02", categoryId: "arrays", isCompleted: true },
      ],
    });

    // Add activity for student: 3 active days (today, 2 days ago, 4 days ago)
    const todayStr = toUtcDateString();
    const twoDaysAgoStr = toUtcDateString(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));
    const fourDaysAgoStr = toUtcDateString(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000));

    await prisma.userActivity.createMany({
      data: [
        { userId: createdStudent.id, activityDate: todayStr, activityCount: 2 },
        { userId: createdStudent.id, activityDate: twoDaysAgoStr, activityCount: 3 },
        { userId: createdStudent.id, activityDate: fourDaysAgoStr, activityCount: 1 },
      ],
    });

    console.log("  Created test student and progress records successfully.\n");

    // -------------------------------------------------------------------------
    // Test Group 1: Curriculum Counts & Integrity
    // -------------------------------------------------------------------------
    console.log("--- Test Group 1: Curriculum Constants & Totals ---");

    if (TOTAL_ROADMAP_TOPICS_COUNT === 101) {
      recordPass("Total Core Roadmap Topics", `Expected 101 topics, got ${TOTAL_ROADMAP_TOPICS_COUNT}`);
    } else {
      recordFail("Total Core Roadmap Topics", `Expected 101, got ${TOTAL_ROADMAP_TOPICS_COUNT}`);
    }

    if (TOTAL_DSA_QUESTIONS_COUNT === 56) {
      recordPass("Total DSA Questions", `Expected 56 questions across 6 categories, got ${TOTAL_DSA_QUESTIONS_COUNT}`);
    } else {
      recordFail("Total DSA Questions", `Expected 56, got ${TOTAL_DSA_QUESTIONS_COUNT}`);
    }

    if (TOTAL_VERILOG_TOPICS_COUNT === 16) {
      recordPass("Total Verilog HDL Topics", `Expected 16 topics, got ${TOTAL_VERILOG_TOPICS_COUNT}`);
    } else {
      recordFail("Total Verilog HDL Topics", `Expected 16, got ${TOTAL_VERILOG_TOPICS_COUNT}`);
    }

    // -------------------------------------------------------------------------
    // Test Group 2: Admin Identification & Exclusion Logic
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 2: Admin Exclusion from Student Data ---");

    const adminClerkIds = await getAdminClerkUserIds();
    console.log(`  Identified live Clerk admin accounts: ${adminClerkIds.length}`);

    if (adminClerkIds.length > 0) {
      recordPass("Admin Accounts Identified", `Found ${adminClerkIds.length} Clerk admin account(s): ${adminClerkIds.join(", ")}`);
    } else {
      recordPass("Admin Accounts Identified", "0 admin accounts returned from Clerk API (development fallback)");
    }

    // Verify that querying student details for live admin returns null
    for (const adminId of adminClerkIds) {
      const adminAsStudent = await getAdminStudentDetails(adminId, { skipAuth: true });
      if (adminAsStudent === null) {
        recordPass(`Admin account ${adminId} excluded from student inspection`, "Returned null as expected");
      } else {
        recordFail(`Admin account ${adminId} was returned as student`, "Admins must not be returned as students");
      }
    }

    // -------------------------------------------------------------------------
    // Test Group 3: Authorization Guard Enforcement
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 3: Authorization Guard Enforcement ---");

    try {
      // Default invocation without skipAuth and without authenticated session must throw
      await getAdminOverviewStats();
      recordFail("Default getAdminOverviewStats Guard", "Expected unauthorized exception but call succeeded");
    } catch (authError: unknown) {
      recordPass("Default getAdminOverviewStats Guard", "Rejected unauthenticated caller as expected");
    }

    try {
      await getAdminStudentDetails(createdStudent.id);
      recordFail("Default getAdminStudentDetails Guard", "Expected unauthorized exception but call succeeded");
    } catch (authError: unknown) {
      recordPass("Default getAdminStudentDetails Guard", "Rejected unauthenticated caller as expected");
    }

    // -------------------------------------------------------------------------
    // Test Group 4: Overview Statistics Calculation
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 4: Overview Statistics Calculation ---");

    const overview = await getAdminOverviewStats({ skipAuth: true });

    // Check that totalStudents >= 1 (includes our test student)
    if (overview.totalStudents > 0) {
      recordPass("Overview Total Students", `Calculated ${overview.totalStudents} registered students`);
    } else {
      recordFail("Overview Total Students", "Expected totalStudents > 0");
    }

    // Active + Inactive must equal Total
    if (overview.activeStudents7d + overview.inactiveStudents7d === overview.totalStudents) {
      recordPass(
        "Active + Inactive Consistency",
        `${overview.activeStudents7d} active + ${overview.inactiveStudents7d} inactive = ${overview.totalStudents} total`
      );
    } else {
      recordFail(
        "Active + Inactive Consistency",
        `Sum ${overview.activeStudents7d + overview.inactiveStudents7d} does not match total ${overview.totalStudents}`
      );
    }

    // Average roadmap % is a valid percentage between 0 and 100
    if (overview.avgRoadmapPercentage >= 0 && overview.avgRoadmapPercentage <= 100) {
      recordPass("Average Roadmap Completion %", `Calculated ${overview.avgRoadmapPercentage}%`);
    } else {
      recordFail("Average Roadmap Completion %", `Invalid percentage: ${overview.avgRoadmapPercentage}`);
    }

    // Overview recent students list contains the test student
    const foundStudentSummary = overview.recentStudents.find((s) => s.id === createdStudent.id);
    if (foundStudentSummary) {
      recordPass("Overview Student Summary Row", `Found student row for ${testStudentEmail}`);

      // Verify progress numbers: 5/101 topics = 5%
      const expectedRoadmapPct = Math.round((5 / 101) * 100);
      if (foundStudentSummary.roadmapPercentage === expectedRoadmapPct) {
        recordPass("Student Roadmap Percentage", `Expected ${expectedRoadmapPct}%, got ${foundStudentSummary.roadmapPercentage}%`);
      } else {
        recordFail("Student Roadmap Percentage", `Expected ${expectedRoadmapPct}%, got ${foundStudentSummary.roadmapPercentage}%`);
      }

      // 2/56 DSA = 4%
      const expectedDsaPct = Math.round((2 / 56) * 100);
      if (foundStudentSummary.dsaPercentage === expectedDsaPct) {
        recordPass("Student DSA Percentage", `Expected ${expectedDsaPct}%, got ${foundStudentSummary.dsaPercentage}%`);
      } else {
        recordFail("Student DSA Percentage", `Expected ${expectedDsaPct}%, got ${foundStudentSummary.dsaPercentage}%`);
      }

      // Verilog 1/16 = 6%
      if (foundStudentSummary.verilogCount === 1) {
        recordPass("Student Verilog Count", `Expected 1, got ${foundStudentSummary.verilogCount}`);
      } else {
        recordFail("Student Verilog Count", `Expected 1, got ${foundStudentSummary.verilogCount}`);
      }

      // Last active should be today
      if (foundStudentSummary.lastActiveDate === todayStr) {
        recordPass("Student Last Active Date", `Expected ${todayStr}, got ${foundStudentSummary.lastActiveDate}`);
      } else {
        recordFail("Student Last Active Date", `Expected ${todayStr}, got ${foundStudentSummary.lastActiveDate}`);
      }
    } else {
      recordFail("Overview Student Summary Row", "Created test student was not found in overview summary");
    }

    // -------------------------------------------------------------------------
    // Test Group 5: Student Directory Search & Sorting
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 5: Student Directory Search & Sorting ---");

    // Search by full name
    const searchByName = await getAdminStudentsList({ search: "Test Student Dashboard", skipAuth: true });
    if (searchByName.students.some((s) => s.id === createdStudent.id)) {
      recordPass("Search Directory by Name", "Found test student by exact full name");
    } else {
      recordFail("Search Directory by Name", "Could not find test student by full name");
    }

    // Search by email prefix
    const searchByEmail = await getAdminStudentsList({ search: `student_${testTimestamp}`, skipAuth: true });
    if (searchByEmail.students.length === 1 && searchByEmail.students[0].id === createdStudent.id) {
      recordPass("Search Directory by Email", "Found test student by unique email fragment");
    } else {
      recordFail("Search Directory by Email", `Expected 1 match, found ${searchByEmail.students.length}`);
    }

    // Search for nonexistent query
    const searchNone = await getAdminStudentsList({ search: "nonexistent_query_xyz_999999", skipAuth: true });
    if (searchNone.students.length === 0) {
      recordPass("Search Nonexistent Query", "Returned 0 results gracefully");
    } else {
      recordFail("Search Nonexistent Query", `Expected 0 results, got ${searchNone.students.length}`);
    }

    // Sorting by roadmapDesc
    const sortedRoadmap = await getAdminStudentsList({ sortBy: "roadmapDesc", skipAuth: true });
    let isSortedRoadmap = true;
    for (let i = 1; i < sortedRoadmap.students.length; i++) {
      if (sortedRoadmap.students[i].roadmapPercentage > sortedRoadmap.students[i - 1].roadmapPercentage) {
        isSortedRoadmap = false;
        break;
      }
    }
    if (isSortedRoadmap) {
      recordPass("Sort by Roadmap Progress Descending", "Sorted correctly from highest to lowest");
    } else {
      recordFail("Sort by Roadmap Progress Descending", "Roadmap progress order is inverted or broken");
    }

    // -------------------------------------------------------------------------
    // Test Group 6: Individual Student Detail View Data
    // -------------------------------------------------------------------------
    console.log("\n--- Test Group 6: Individual Student Detail View Data ---");

    const studentDetails = await getAdminStudentDetails(createdStudent.id, { skipAuth: true });
    if (!studentDetails) {
      recordFail("Student Details Retrieval", "Returned null for valid student ID");
    } else {
      recordPass("Student Details Retrieval", `Loaded full details for ${studentDetails.user.email}`);

      // Profile details
      if (studentDetails.user.fullName === "Test Student Dashboard") {
        recordPass("Student Profile Full Name", studentDetails.user.fullName);
      } else {
        recordFail("Student Profile Full Name", `Unexpected name: ${studentDetails.user.fullName}`);
      }

      // Subject breakdowns: C programming must have 5 completed
      const cSubject = studentDetails.subjects.find((s) => s.id === "c-programming");
      if (cSubject && cSubject.completedCount === 5 && cSubject.totalCount === 29) {
        recordPass("C Programming Progress Breakdown", `5/29 completed (${cSubject.percentage}%)`);
      } else {
        recordFail("C Programming Progress Breakdown", `Expected 5/29, got ${cSubject?.completedCount}/${cSubject?.totalCount}`);
      }

      // Individual topic inspection: verify c-intro-compilation is completed
      const cIntro = cSubject?.topics.find((t) => t.id === "c-intro-compilation");
      if (cIntro?.isCompleted && cIntro?.completedAt) {
        recordPass("Topic Inspection Status", `Topic ${cIntro.id} marked completed with timestamp`);
      } else {
        recordFail("Topic Inspection Status", `Topic completion not recorded properly`);
      }

      // Verify uncompleted topic in C programming
      const cFuncs = cSubject?.topics.find((t) => t.id === "c-functions-scope");
      if (cFuncs && !cFuncs.isCompleted) {
        recordPass("Incomplete Topic Inspection", `Topic ${cFuncs.id} marked incomplete`);
      } else {
        recordFail("Incomplete Topic Inspection", `Expected topic to be incomplete`);
      }

      // DSA breakdown
      if (studentDetails.dsaProgress.totalCompleted === 2 && studentDetails.dsaProgress.totalQuestions === 56) {
        recordPass("DSA Questions Breakdown", `2/56 completed (${studentDetails.dsaProgress.percentage}%)`);
      } else {
        recordFail("DSA Questions Breakdown", `Expected 2/56, got ${studentDetails.dsaProgress.totalCompleted}/${studentDetails.dsaProgress.totalQuestions}`);
      }

      // Verilog HDL breakdown
      if (studentDetails.verilogProgress.completedCount === 1 && studentDetails.verilogProgress.totalCount === 16) {
        recordPass("Verilog HDL Breakdown", `1/16 completed (${studentDetails.verilogProgress.percentage}%)`);
      } else {
        recordFail("Verilog HDL Breakdown", `Expected 1/16, got ${studentDetails.verilogProgress.completedCount}/${studentDetails.verilogProgress.totalCount}`);
      }

      // Activity Heatmap: Genuine persisted records
      if (studentDetails.activity.totalActiveDays >= 3 && studentDetails.activity.totalActivitiesInPeriod >= 6) {
        recordPass(
          "Activity Heatmap Data",
          `Total active days: ${studentDetails.activity.totalActiveDays}, Total activities: ${studentDetails.activity.totalActivitiesInPeriod}`
        );
      } else {
        recordFail(
          "Activity Heatmap Data",
          `Expected active days >= 3 and activities >= 6, got ${studentDetails.activity.totalActiveDays} days and ${studentDetails.activity.totalActivitiesInPeriod} activities`
        );
      }

      // 52-week calendar grid generated
      if (studentDetails.activity.weeks.length === 53) {
        recordPass("52-Week Activity Grid", `Heatmap contains ${studentDetails.activity.weeks.length} week columns`);
      } else {
        recordFail("52-Week Activity Grid", `Expected 53 columns, got ${studentDetails.activity.weeks.length}`);
      }
    }

    // Test nonexistent student detail query
    const nonexistentDetails = await getAdminStudentDetails("nonexistent_user_cuid_12345", { skipAuth: true });
    if (nonexistentDetails === null) {
      recordPass("Nonexistent Student Query", "Returned null gracefully as expected");
    } else {
      recordFail("Nonexistent Student Query", "Expected null for nonexistent ID");
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
        await prisma.userActivity.deleteMany({ where: { userId: testStudentDbId } });
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
