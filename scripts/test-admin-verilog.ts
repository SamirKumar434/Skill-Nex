/**
 * SkillNex Admin Role & Verilog HDL Restricted Section Verification Suite
 *
 * Verifies:
 * 1. An authenticated admin can see the Verilog HDL section (getRoadmapStages(true)).
 * 2. An authenticated student cannot see the section (getRoadmapStages(false)).
 * 3. A guest cannot see the section (getRoadmapStages(false)).
 * 4. A student cannot access or write Verilog progress (authorization check rejects).
 * 5. An admin can save and read Verilog progress.
 * 6. Non-admin getStudentProgress filters out any Verilog topic IDs.
 * 7. Existing roadmap subjects (C, Git, Analog, Digital) and progress remain unaffected.
 * 8. User isolation and account boundaries remain intact.
 * 9. All 16 required Verilog topics are present with correct stages and no invented video URLs.
 */

import { prisma } from "../src/lib/prisma";
import {
  CORE_ELECTRONICS_STAGES,
  VERILOG_HDL_STAGE,
  getRoadmapStages,
  isStageAdminOnly,
  isTopicAdminOnly,
} from "../src/data/electronics-roadmap";
import {
  toggleTopicProgress,
  getStudentProgress,
  toggleDsaProgress,
  updateProblemProgress,
} from "../src/lib/progress";
import { getTopicDoc } from "../src/data/docs";

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
  console.log("==================================================================");
  console.log("SkillNex: Admin Role System & Verilog HDL Verification Suite");
  console.log("==================================================================\n");

  // -------------------------------------------------------------
  // Test Case 1 & 2 & 3: Curriculum Visibility Isolation
  // -------------------------------------------------------------
  console.log("--- 1. Curriculum Visibility Isolation ---");

  const studentStages = getRoadmapStages(false);
  const adminStages = getRoadmapStages(true);

  const studentVerilog = studentStages.find((s) => s.id === "verilog-hdl");
  const adminVerilog = adminStages.find((s) => s.id === "verilog-hdl");

  if (
    studentStages.length === 5 &&
    studentVerilog &&
    studentVerilog.isComingSoon === true &&
    studentVerilog.topics.length === 0
  ) {
    recordPass(
      "Normal student/guest Verilog card",
      "Card is present in roadmap with isComingSoon: true and topics: [] (no restricted content sent)."
    );
  } else {
    recordFail(
      "Normal student/guest Verilog card",
      `Expected card with isComingSoon=true and 0 topics, got ${JSON.stringify(studentVerilog)}`
    );
  }

  if (
    adminStages.length === 5 &&
    adminVerilog &&
    !adminVerilog.isComingSoon &&
    adminVerilog.topics.length === 16
  ) {
    recordPass(
      "Admin Verilog card",
      "Card is present without Coming Soon badge and includes all 16 full curriculum topics."
    );
  } else {
    recordFail(
      "Admin Verilog card",
      `Expected full admin card without Coming Soon, got isComingSoon=${adminVerilog?.isComingSoon}, topics=${adminVerilog?.topics.length}`
    );
  }

  // Check stage protection helper
  if (isStageAdminOnly("verilog-hdl") && !isStageAdminOnly("c-programming") && !isStageAdminOnly("digital-electronics")) {
    recordPass("isStageAdminOnly helper", "Correctly identifies verilog-hdl as admin-only and standard stages as public.");
  } else {
    recordFail("isStageAdminOnly helper", "isStageAdminOnly returned unexpected values.");
  }

  // -------------------------------------------------------------
  // Test Case: Verilog Curriculum Completeness & Rules
  // -------------------------------------------------------------
  console.log("\n--- 2. Verilog HDL Curriculum Completeness ---");

  const expectedTopics = [
    "verilog-intro-hdl",
    "verilog-abstraction-levels",
    "verilog-modules-instantiation",
    "verilog-simulation-synthesis",
    "verilog-data-types",
    "verilog-net-data-types",
    "verilog-register-data-types",
    "verilog-vectors-arrays-memories",
    "verilog-operators",
    "verilog-practice-set",
    "verilog-gate-level-modeling",
    "verilog-dataflow-modeling",
    "verilog-behavioral-modeling",
    "verilog-compiler-directives-tasks",
    "verilog-tasks-functions",
    "verilog-testbench-writing",
  ];

  if (VERILOG_HDL_STAGE.topics.length === 16) {
    recordPass("Verilog topic count", "Contains exactly 16 structured beginner-to-intermediate topics.");
  } else {
    recordFail("Verilog topic count", `Expected 16 topics, found ${VERILOG_HDL_STAGE.topics.length}`);
  }

  const allTopicsPresent = expectedTopics.every((id) =>
    VERILOG_HDL_STAGE.topics.some((t) => t.id === id)
  );
  if (allTopicsPresent) {
    recordPass("All required topics present", "All 16 topics from VLSI Point curriculum are verified present.");
  } else {
    recordFail("All required topics present", "Some required Verilog topics are missing.");
  }

  // Ensure no invented video URLs
  const hasInventedVideoUrls = VERILOG_HDL_STAGE.topics.some(
    (t) => Boolean(t.videoUrl) || (t.videoUrls && t.videoUrls.length > 0)
  );
  if (!hasInventedVideoUrls) {
    recordPass("No invented video URLs", "Video lecture fields are properly omitted/empty per instructions.");
  } else {
    recordFail("No invented video URLs", "Found video URLs on Verilog topics contrary to guidelines.");
  }

  // Ensure all 16 topics are classified as admin-only
  const allMarkedAdminOnly = expectedTopics.every((id) => isTopicAdminOnly(id));
  if (allMarkedAdminOnly && !isTopicAdminOnly("c-intro-compilation")) {
    recordPass("Topic admin-only classification", "All 16 Verilog topics marked admin-only; standard topics are not.");
  } else {
    recordFail("Topic admin-only classification", "isTopicAdminOnly classification mismatch.");
  }

  // -------------------------------------------------------------
  // Test Case: Database & Progress Security
  // -------------------------------------------------------------
  console.log("\n--- 3. Database-backed Progress Authorization & Isolation ---");

  const testClerkStudent = `test_student_${Date.now()}`;
  const testClerkAdmin = `test_admin_${Date.now()}`;

  let studentUser: { id: string; clerkId: string };
  let adminUser: { id: string; clerkId: string };

  try {
    studentUser = await prisma.user.create({
      data: {
        clerkId: testClerkStudent,
        email: `${testClerkStudent}@test.skillnex.local`,
        fullName: "Test Student",
        selectedTrack: "core-electronics",
      },
    });

    adminUser = await prisma.user.create({
      data: {
        clerkId: testClerkAdmin,
        email: `${testClerkAdmin}@test.skillnex.local`,
        fullName: "Test Administrator",
        selectedTrack: "core-electronics",
      },
    });
  } catch (err: unknown) {
    console.error("Failed to seed test users in Neon DB:", err);
    process.exit(1);
  }

  try {
    // 3a. Student attempts to mark Verilog topic (without admin role) -> must throw
    let studentBlocked = false;
    try {
      await toggleTopicProgress(studentUser.id, "verilog-intro-hdl", true, false);
    } catch (err: unknown) {
      studentBlocked = true;
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("restricted to administrators")) {
        recordPass("Student write rejection", "Student blocked with 'restricted to administrators' error.");
      } else {
        recordFail("Student write rejection", `Unexpected error message: ${msg}`);
      }
    }
    if (!studentBlocked) {
      recordFail("Student write rejection", "Expected toggleTopicProgress to reject non-admin student, but it succeeded!");
    }

    // 3b. Admin marks Verilog topic -> must succeed
    const adminResult = await toggleTopicProgress(adminUser.id, "verilog-intro-hdl", true, true);
    if (adminResult.isCompleted && adminResult.topicId === "verilog-intro-hdl") {
      recordPass("Admin write authorization", "Admin successfully marked 'verilog-intro-hdl' as completed.");
    } else {
      recordFail("Admin write authorization", `Expected isCompleted=true, got ${adminResult.isCompleted}`);
    }

    // 3c. Admin reads progress -> includes Verilog topic
    const adminProgress = await getStudentProgress(adminUser.id, true);
    if (adminProgress.completedTopicIds.includes("verilog-intro-hdl")) {
      recordPass("Admin progress retrieval", "Admin progress includes 'verilog-intro-hdl'.");
    } else {
      recordFail("Admin progress retrieval", "Admin progress missing completed Verilog topic.");
    }

    // 3d. Non-admin read progress -> strips Verilog topic even if present in DB
    // To test this rigorously, let's insert a Verilog topic progress directly for student, then verify getStudentProgress(student.id, false) hides it!
    await prisma.userTopicProgress.upsert({
      where: {
        userId_topicId: {
          userId: studentUser.id,
          topicId: "verilog-modules-instantiation",
        },
      },
      create: {
        userId: studentUser.id,
        topicId: "verilog-modules-instantiation",
        stageId: "verilog-hdl",
        isCompleted: true,
      },
      update: {
        isCompleted: true,
      },
    });

    const studentProgress = await getStudentProgress(studentUser.id, false);
    if (!studentProgress.completedTopicIds.includes("verilog-modules-instantiation")) {
      recordPass("Student read filtering", "Student cannot read Verilog topic progress; successfully filtered out.");
    } else {
      recordFail("Student read filtering", "Verilog topic progress leaked to student read response!");
    }

    // 3e. Standard roadmap progress unaffected for student
    const studentStandardProgress = await toggleTopicProgress(studentUser.id, "c-intro-compilation", true, false);
    if (studentStandardProgress.isCompleted) {
      recordPass("Existing subjects unaffected", "Student can freely mark standard C Programming topics.");
    } else {
      recordFail("Existing subjects unaffected", "Student could not mark C Programming topic.");
    }

    const updatedStudentProgress = await getStudentProgress(studentUser.id, false);
    if (
      updatedStudentProgress.completedTopicIds.includes("c-intro-compilation") &&
      !updatedStudentProgress.completedTopicIds.includes("verilog-modules-instantiation")
    ) {
      recordPass("Student progress integrity", "Student sees C topic, but still cannot see Verilog topic.");
    } else {
      recordFail("Student progress integrity", "Unexpected student progress contents.");
    }

    // 3f. Existing DSA and Problem progress unaffected
    const dsaRes = await toggleDsaProgress(studentUser.id, "dsa-arr-01", true);
    if (dsaRes.isCompleted) {
      recordPass("DSA progress unaffected", "Student can mark DSA question.");
    } else {
      recordFail("DSA progress unaffected", "DSA question update failed.");
    }

    const probRes = await updateProblemProgress(studentUser.id, "hdl-step-one", "completed");
    if (probRes.status === "completed") {
      recordPass("Problems progress unaffected", "Student can update HDL problem status.");
    } else {
      recordFail("Problems progress unaffected", "Problem status update failed.");
    }

    // -------------------------------------------------------------
    // Test Case: Verilog Topic Documentation
    // -------------------------------------------------------------
    console.log("\n--- 4. Verilog Documentation Registry ---");
    const doc = getTopicDoc("verilog-intro-hdl");
    if (doc && doc.stageId === "verilog-hdl" && doc.serial === "5.1") {
      recordPass("Verilog documentation entry", `Topic doc for ${doc.serial} ${doc.title} is registered.`);
    } else {
      recordFail("Verilog documentation entry", "Could not retrieve documentation for 'verilog-intro-hdl'.");
    }

  } finally {
    // Clean up test data
    console.log("\nCleaning up test user records...");
    await prisma.userTopicProgress.deleteMany({ where: { userId: { in: [studentUser.id, adminUser.id] } } });
    await prisma.userDsaProgress.deleteMany({ where: { userId: { in: [studentUser.id, adminUser.id] } } });
    await prisma.userProblemProgress.deleteMany({ where: { userId: { in: [studentUser.id, adminUser.id] } } });
    await prisma.userActivity.deleteMany({ where: { userId: { in: [studentUser.id, adminUser.id] } } });
    await prisma.user.deleteMany({ where: { id: { in: [studentUser.id, adminUser.id] } } });
    console.log("Cleanup complete.\n");
  }

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log("==================================================================");
  console.log(`Test Results: ${passed} PASSED, ${failed} FAILED (Total: ${results.length})`);
  console.log("==================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

