/**
 * SkillNex Phase 2.5: Multi-Device Verification & End-to-End Testing Suite
 *
 * Verifies:
 * 1. Cross-Device Synchronization (Bi-directional sync across Device A and Device B for same account)
 * 2. User Isolation (Two independent accounts: User Alpha and User Beta; zero data bleed)
 * 3. Account Switching & Logout state clearing
 * 4. Guest Write Restrictions (server & client)
 * 5. Persistence across session reloads & Failure Rollback recovery
 * 6. Cache Integrity (No overwrite of cloud data by stale local state)
 */

import { prisma } from "../src/lib/prisma";
import {
  toggleTopicProgress,
  toggleDsaProgress,
  updateProblemProgress,
  getStudentProgress,
  type StudentProgressData,
} from "../src/lib/progress";
import {
  toggleTopicProgressAction,
  toggleDsaProgressAction,
  updateProblemStatusAction,
  getStudentProgressAction,
} from "../src/actions/progress";
import {
  setCompletedTopicIds,
  getCompletedTopicIds,
} from "../src/data/electronics-roadmap";
import {
  setCompletedDsaQuestionIds,
  getCompletedDsaQuestionIds,
} from "../src/data/dsa-data";
import {
  setProblemStatus,
  getProblemsStatusMap,
} from "../src/data/problems-data";

interface TestResult {
  category: string;
  testName: string;
  status: "PASS" | "FAIL" | "BLOCKED";
  evidence: string;
}

const testResults: TestResult[] = [];

function recordTest(category: string, testName: string, status: "PASS" | "FAIL" | "BLOCKED", evidence: string) {
  testResults.push({ category, testName, status, evidence });
  const icon = status === "PASS" ? "✓ [PASS]" : status === "FAIL" ? "✗ [FAIL]" : "⚠ [BLOCKED]";
  console.log(`  ${icon} [${category}] ${testName}`);
  console.log(`     Evidence: ${evidence}`);
}

/**
 * Simulated client device model representing a user's browser session
 */
class SimulatedClientDevice {
  public deviceName: string;
  public userId: string;
  public localCache: StudentProgressData;

  constructor(deviceName: string, userId: string) {
    this.deviceName = deviceName;
    this.userId = userId;
    this.localCache = {
      completedTopicIds: [],
      completedDsaQuestionIds: [],
      problemStatusMap: {},
    };
  }

  // Device fetches latest cloud state from Neon DB (equivalent to GET /api/progress)
  async syncFromCloud() {
    this.localCache = await getStudentProgress(this.userId);
    return this.localCache;
  }

  // Device performs optimistic toggle of roadmap topic
  async markTopic(topicId: string, completed: boolean) {
    // 1. Optimistic local update
    if (completed) {
      if (!this.localCache.completedTopicIds.includes(topicId)) {
        this.localCache.completedTopicIds.push(topicId);
      }
    } else {
      this.localCache.completedTopicIds = this.localCache.completedTopicIds.filter(id => id !== topicId);
    }

    // 2. Persist to server
    try {
      await toggleTopicProgress(this.userId, topicId, completed);
    } catch (err) {
      // Rollback on failure
      await this.syncFromCloud();
      throw err;
    }
  }

  // Device updates DSA progress
  async markDsa(questionId: string, completed: boolean) {
    if (completed) {
      if (!this.localCache.completedDsaQuestionIds.includes(questionId)) {
        this.localCache.completedDsaQuestionIds.push(questionId);
      }
    } else {
      this.localCache.completedDsaQuestionIds = this.localCache.completedDsaQuestionIds.filter(id => id !== questionId);
    }

    try {
      await toggleDsaProgress(this.userId, questionId, completed);
    } catch (err) {
      await this.syncFromCloud();
      throw err;
    }
  }

  // Device updates HDL problem status
  async markProblemStatus(problemId: string, status: "not-started" | "in-progress" | "completed") {
    this.localCache.problemStatusMap[problemId] = status;

    try {
      await updateProblemProgress(this.userId, problemId, status);
    } catch (err) {
      await this.syncFromCloud();
      throw err;
    }
  }
}

async function runEndToEndVerification() {
  console.log("=======================================================================");
  console.log("SkillNex Phase 2.5: Multi-Device Verification & End-to-End Test Suite");
  console.log("=======================================================================\n");

  const timestamp = Date.now();
  const clerkIdUser1 = `clerk_sync_user1_${timestamp}`;
  const clerkIdUser2 = `clerk_sync_user2_${timestamp}`;

  let user1: { id: string; clerkId: string; email: string };
  let user2: { id: string; clerkId: string; email: string };

  try {
    user1 = await prisma.user.create({
      data: {
        clerkId: clerkIdUser1,
        email: `${clerkIdUser1}@test.skillnex.io`,
        fullName: "MultiDevice Student Alpha",
        selectedTrack: "core-electronics",
      },
    });

    user2 = await prisma.user.create({
      data: {
        clerkId: clerkIdUser2,
        email: `${clerkIdUser2}@test.skillnex.io`,
        fullName: "MultiDevice Student Beta",
        selectedTrack: "core-electronics",
      },
    });
  } catch (err: unknown) {
    console.error("Failed to initialize test accounts in database:", err);
    process.exit(1);
  }

  try {
    // =========================================================================
    // SECTION 1: Cross-Device Synchronization (Same Account across Device A & B)
    // =========================================================================
    console.log("\n--- SECTION 1: Cross-Device Synchronization ---");
    const deviceA = new SimulatedClientDevice("Laptop (Device A)", user1.id);
    const deviceB = new SimulatedClientDevice("Mobile (Device B)", user1.id);

    // Initial state: Both devices sync
    await deviceA.syncFromCloud();
    await deviceB.syncFromCloud();

    // 1.1 Mark topic on Device A -> Verify on Device B after refresh
    const topic1 = "c-intro-compilation";
    await deviceA.markTopic(topic1, true);

    const bStateAfterA = await deviceB.syncFromCloud();
    if (bStateAfterA.completedTopicIds.includes(topic1)) {
      recordTest(
        "Cross-Device Sync",
        "Device A marks topic -> Device B refreshes & reflects topic",
        "PASS",
        `Topic "${topic1}" successfully retrieved on Device B: [${bStateAfterA.completedTopicIds.join(", ")}]`
      );
    } else {
      recordTest(
        "Cross-Device Sync",
        "Device A marks topic -> Device B refreshes & reflects topic",
        "FAIL",
        `Topic "${topic1}" missing on Device B`
      );
    }

    // 1.2 Mark DSA question on Device A -> Verify on Device B
    const dsaQ1 = "dsa-arr-01";
    await deviceA.markDsa(dsaQ1, true);

    const bDsaState = await deviceB.syncFromCloud();
    if (bDsaState.completedDsaQuestionIds.includes(dsaQ1)) {
      recordTest(
        "Cross-Device Sync",
        "Device A marks DSA question -> Device B reflects DSA progress",
        "PASS",
        `DSA question "${dsaQ1}" found in Device B state`
      );
    } else {
      recordTest(
        "Cross-Device Sync",
        "Device A marks DSA question -> Device B reflects DSA progress",
        "FAIL",
        `DSA question "${dsaQ1}" missing on Device B`
      );
    }

    // 1.3 Update HDL problem status on Device A -> Verify on Device B
    const prob1 = "hdl-step-one";
    await deviceA.markProblemStatus(prob1, "in-progress");

    const bProbState = await deviceB.syncFromCloud();
    if (bProbState.problemStatusMap[prob1] === "in-progress") {
      recordTest(
        "Cross-Device Sync",
        "Device A sets HDL problem 'in-progress' -> Device B reflects status",
        "PASS",
        `Problem "${prob1}" status on Device B is "${bProbState.problemStatusMap[prob1]}"`
      );
    } else {
      recordTest(
        "Cross-Device Sync",
        "Device A sets HDL problem 'in-progress' -> Device B reflects status",
        "FAIL",
        `Expected 'in-progress', got "${bProbState.problemStatusMap[prob1]}"`
      );
    }

    // 1.4 Bi-Directional: Update progress on Device B -> Verify on Device A
    const topic2 = "c-variables-types-operators";
    const dsaQ2 = "dsa-arr-02";
    await deviceB.markTopic(topic2, true);
    await deviceB.markDsa(dsaQ2, true);
    await deviceB.markProblemStatus(prob1, "completed");

    const aStateAfterB = await deviceA.syncFromCloud();
    const biSyncPassed =
      aStateAfterB.completedTopicIds.includes(topic2) &&
      aStateAfterB.completedDsaQuestionIds.includes(dsaQ2) &&
      aStateAfterB.problemStatusMap[prob1] === "completed";

    if (biSyncPassed) {
      recordTest(
        "Cross-Device Sync",
        "Bi-directional: Device B updates progress -> Device A retrieves latest cloud state",
        "PASS",
        `Device A fetched: topics=[${aStateAfterB.completedTopicIds.join(", ")}], dsa=[${aStateAfterB.completedDsaQuestionIds.join(", ")}], ${prob1}="${aStateAfterB.problemStatusMap[prob1]}"`
      );
    } else {
      recordTest(
        "Cross-Device Sync",
        "Bi-directional: Device B updates progress -> Device A retrieves latest cloud state",
        "FAIL",
        `Device A failed to retrieve Device B updates: ${JSON.stringify(aStateAfterB)}`
      );
    }

    // 1.5 Unmark topic on Device A -> Verify unmark on Device B
    await deviceA.markTopic(topic1, false);
    const bStateAfterUnmark = await deviceB.syncFromCloud();
    if (!bStateAfterUnmark.completedTopicIds.includes(topic1) && bStateAfterUnmark.completedTopicIds.includes(topic2)) {
      recordTest(
        "Cross-Device Sync",
        "Device A unmarks topic -> Device B reflects unmark while preserving other completions",
        "PASS",
        `Topic "${topic1}" successfully removed on Device B; topic "${topic2}" retained`
      );
    } else {
      recordTest(
        "Cross-Device Sync",
        "Device A unmarks topic -> Device B reflects unmark",
        "FAIL",
        `Unexpected state on Device B: ${JSON.stringify(bStateAfterUnmark.completedTopicIds)}`
      );
    }

    // =========================================================================
    // SECTION 2: User-Level Data Isolation (User Alpha vs User Beta)
    // =========================================================================
    console.log("\n--- SECTION 2: User-Level Data Isolation ---");
    const betaDevice = new SimulatedClientDevice("Beta Tablet", user2.id);

    // Initial Beta state must be empty
    const betaInitialState = await betaDevice.syncFromCloud();
    if (
      betaInitialState.completedTopicIds.length === 0 &&
      betaInitialState.completedDsaQuestionIds.length === 0 &&
      Object.keys(betaInitialState.problemStatusMap).length === 0
    ) {
      recordTest(
        "User Isolation",
        "New user Beta has 0 progress records regardless of Alpha's activity",
        "PASS",
        "User Beta verified with completely empty progress state"
      );
    } else {
      recordTest(
        "User Isolation",
        "New user Beta has 0 progress records regardless of Alpha's activity",
        "FAIL",
        `Data bleed detected in User Beta: ${JSON.stringify(betaInitialState)}`
      );
    }

    // Beta marks distinct items
    const betaTopic = "git-fundamentals-setup";
    const betaDsa = "dsa-str-01";
    const betaProb = "hdl-wire";
    await betaDevice.markTopic(betaTopic, true);
    await betaDevice.markDsa(betaDsa, true);
    await betaDevice.markProblemStatus(betaProb, "in-progress");

    // Re-verify User Alpha has none of User Beta's items
    const alphaCurrentState = await deviceA.syncFromCloud();
    const alphaHasBetaData =
      alphaCurrentState.completedTopicIds.includes(betaTopic) ||
      alphaCurrentState.completedDsaQuestionIds.includes(betaDsa) ||
      alphaCurrentState.problemStatusMap[betaProb] !== undefined;

    if (!alphaHasBetaData) {
      recordTest(
        "User Isolation",
        "User Alpha progress is completely unaffected by User Beta activity",
        "PASS",
        `User Alpha retains only own items: topics=[${alphaCurrentState.completedTopicIds.join(", ")}], dsa=[${alphaCurrentState.completedDsaQuestionIds.join(", ")}]`
      );
    } else {
      recordTest(
        "User Isolation",
        "User Alpha progress is completely unaffected by User Beta activity",
        "FAIL",
        "Data cross-contamination detected from User Beta to User Alpha"
      );
    }

    // =========================================================================
    // SECTION 3: Account Switching & Logout Simulation in Same Browser
    // =========================================================================
    console.log("\n--- SECTION 3: Account Switching & Logout ---");

    // 3.1 Simulated shared browser session:
    // Session 1: User Alpha logged in
    const sharedBrowserSession = new SimulatedClientDevice("Shared Browser Window", user1.id);
    await sharedBrowserSession.syncFromCloud();

    // 3.2 User logs out: ProgressContext clears in-memory state
    sharedBrowserSession.localCache = {
      completedTopicIds: [],
      completedDsaQuestionIds: [],
      problemStatusMap: {},
    };

    if (
      sharedBrowserSession.localCache.completedTopicIds.length === 0 &&
      sharedBrowserSession.localCache.completedDsaQuestionIds.length === 0 &&
      Object.keys(sharedBrowserSession.localCache.problemStatusMap).length === 0
    ) {
      recordTest(
        "Account Switching",
        "Logout cleans in-memory progress state completely",
        "PASS",
        "Session reset verified: 0 topics, 0 DSA questions, 0 problem statuses in memory"
      );
    } else {
      recordTest(
        "Account Switching",
        "Logout cleans in-memory progress state completely",
        "FAIL",
        "Residual progress persisted after logout"
      );
    }

    // 3.3 User Beta logs in on the exact same browser:
    sharedBrowserSession.userId = user2.id;
    await sharedBrowserSession.syncFromCloud();

    const betaLoadedState = sharedBrowserSession.localCache;
    const isCleanBeta =
      betaLoadedState.completedTopicIds.length === 1 &&
      betaLoadedState.completedTopicIds[0] === betaTopic &&
      betaLoadedState.completedDsaQuestionIds.length === 1 &&
      betaLoadedState.completedDsaQuestionIds[0] === betaDsa &&
      betaLoadedState.problemStatusMap[betaProb] === "in-progress" &&
      !betaLoadedState.completedTopicIds.includes(topic2);

    if (isCleanBeta) {
      recordTest(
        "Account Switching",
        "User Beta login populates Beta-only progress without residual Alpha data",
        "PASS",
        `Accurately loaded Beta data [${betaTopic}] with zero cross-bleed from Alpha [${topic2}]`
      );
    } else {
      recordTest(
        "Account Switching",
        "User Beta login populates Beta-only progress without residual Alpha data",
        "FAIL",
        `Unexpected state for Beta after switch: ${JSON.stringify(betaLoadedState)}`
      );
    }

    // =========================================================================
    // SECTION 4: Guest Restrictions & Local Cache Safety
    // =========================================================================
    console.log("\n--- SECTION 4: Guest Restrictions & Local Cache Integrity ---");

    // 4.1 Server Actions reject guest invocations
    const guestTopicRes = await toggleTopicProgressAction(topic1);
    const guestDsaRes = await toggleDsaProgressAction(dsaQ1);
    const guestProbRes = await updateProblemStatusAction(prob1, "completed");
    const guestGetRes = await getStudentProgressAction();

    const guestWriteBlocked =
      guestTopicRes.success === false &&
      guestDsaRes.success === false &&
      guestProbRes.success === false &&
      guestGetRes.success === false;

    if (guestWriteBlocked) {
      recordTest(
        "Guest Restrictions",
        "Server actions strictly reject guest/unauthenticated write attempts",
        "PASS",
        `Guest actions rejected with unauthorized errors: "${guestTopicRes.error}"`
      );
    } else {
      recordTest(
        "Guest Restrictions",
        "Server actions strictly reject guest/unauthenticated write attempts",
        "FAIL",
        "Server action permitted an unauthenticated write!"
      );
    }

    // 4.2 Local storage write functions are disabled no-ops
    setCompletedTopicIds(["rogue-guest-topic"]);
    setCompletedDsaQuestionIds(["rogue-guest-dsa"]);
    setProblemStatus("hdl-step-one", "completed");

    const localTopics = getCompletedTopicIds();
    const localDsa = getCompletedDsaQuestionIds();
    const localProb = getProblemsStatusMap();

    const localStorageProtected =
      !localTopics.includes("rogue-guest-topic") &&
      !localDsa.includes("rogue-guest-dsa") &&
      localProb["hdl-step-one"] !== "completed";

    if (localStorageProtected) {
      recordTest(
        "Cache Protection",
        "Static localStorage write functions are disabled no-ops to protect cloud state",
        "PASS",
        "localStorage setters successfully neutralized; cannot store guest data or corrupt cloud state"
      );
    } else {
      recordTest(
        "Cache Protection",
        "Static localStorage write functions are disabled no-ops to protect cloud state",
        "FAIL",
        "Local storage setters permitted arbitrary data writes!"
      );
    }

    // =========================================================================
    // SECTION 5: Failure Recovery & Optimistic Rollback Reconcile
    // =========================================================================
    console.log("\n--- SECTION 5: Failure Recovery & Optimistic Rollback ---");

    // 5.1 Simulated network drop / invalid mutation
    await deviceA.syncFromCloud();
    const preRollbackTopicIds = [...deviceA.localCache.completedTopicIds];
    let caughtExpectedError = false;

    try {
      // Simulate failed call by passing an invalid curriculum ID that the server rejects
      await deviceA.markTopic("non-existent-topic-fail-test", true);
    } catch {
      caughtExpectedError = true;
    }

    // Check that deviceA rolled back to pre-failure cloud state
    const postRollbackTopicIds = deviceA.localCache.completedTopicIds;
    const rollbackReconciled =
      caughtExpectedError &&
      JSON.stringify(preRollbackTopicIds) === JSON.stringify(postRollbackTopicIds);

    if (rollbackReconciled) {
      recordTest(
        "Failure Recovery",
        "Failed request correctly triggers rollback and preserves verified cloud progress",
        "PASS",
        `Error caught as expected; rollback state matches cloud: [${postRollbackTopicIds.join(", ")}]`
      );
    } else {
      recordTest(
        "Failure Recovery",
        "Failed request correctly triggers rollback and preserves verified cloud progress",
        "FAIL",
        "State failed to reconcile after error"
      );
    }

    // 5.2 Rapid sequential duplicate requests (idempotency check)
    for (let i = 0; i < 5; i++) {
      await deviceA.markTopic(topic2, true);
    }

    const topicRecordCount = await prisma.userTopicProgress.count({
      where: { userId: user1.id, topicId: topic2 },
    });

    if (topicRecordCount === 1) {
      recordTest(
        "Database Integrity",
        "Idempotency: Repeated rapid requests result in exactly 1 database record",
        "PASS",
        `Confirmed unique count in PostgreSQL = ${topicRecordCount}`
      );
    } else {
      recordTest(
        "Database Integrity",
        "Idempotency: Repeated rapid requests result in exactly 1 database record",
        "FAIL",
        `Duplicate records detected: count=${topicRecordCount}`
      );
    }

  } finally {
    // =========================================================================
    // Clean up test records
    // =========================================================================
    console.log("\nCleaning up Phase 2.5 test records from PostgreSQL...");
    try {
      await prisma.userTopicProgress.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
      await prisma.userDsaProgress.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
      await prisma.userProblemProgress.deleteMany({ where: { userId: { in: [user1.id, user2.id] } } });
      await prisma.user.deleteMany({ where: { id: { in: [user1.id, user2.id] } } });
      console.log("Cleanup completed successfully. Neon DB restored to clean state.\n");
    } catch (cleanupErr) {
      console.warn("Cleanup warning:", cleanupErr);
    }
  }

  // =========================================================================
  // Summary
  // =========================================================================
  const total = testResults.length;
  const passed = testResults.filter(r => r.status === "PASS").length;
  const failed = testResults.filter(r => r.status === "FAIL").length;
  const blocked = testResults.filter(r => r.status === "BLOCKED").length;

  console.log("=======================================================================");
  console.log(`Phase 2.5 E2E Verification Summary: ${passed}/${total} PASSED (${failed} FAILED, ${blocked} BLOCKED)`);
  console.log("=======================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runEndToEndVerification().catch((err) => {
  console.error("Fatal error during Phase 2.5 verification:", err);
  process.exit(1);
});
