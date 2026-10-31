import React, { Suspense } from "react";
import { getVerifiedUserRole } from "@/lib/auth/require-admin";
import { getRoadmapStages } from "@/data/electronics-roadmap";
import { ElectronicsDashboard } from "@/components/electronics-dashboard/ElectronicsDashboard";

export default async function DsaDashboardPage() {
  const { isAdmin } = await getVerifiedUserRole();
  const stages = getRoadmapStages(isAdmin);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07060D]" />}>
      <ElectronicsDashboard initialTab="dsa" stages={stages} isAdmin={isAdmin} />
    </Suspense>
  );
}
