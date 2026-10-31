import React, { Suspense } from "react";
import { redirect, notFound } from "next/navigation";
import { getVerifiedUserRole } from "@/lib/auth/require-admin";
import { getRoadmapStages, isStageAdminOnly } from "@/data/electronics-roadmap";
import { ElectronicsDashboard } from "@/components/electronics-dashboard/ElectronicsDashboard";

interface PageProps {
  searchParams: Promise<{ stage?: string; tab?: string }>;
}

export default async function CoreElectronicsDashboardPage({ searchParams }: PageProps) {
  const { stage } = await searchParams;
  const { role, isAdmin } = await getVerifiedUserRole();

  // Protect admin-only stages against direct URL access
  if (stage && isStageAdminOnly(stage)) {
    if (role === "guest") {
      redirect(`/sign-in?redirect_url=${encodeURIComponent("/dashboard/electronics?stage=" + stage)}`);
    }
    if (!isAdmin) {
      notFound();
    }
  }

  const stages = getRoadmapStages(isAdmin);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07060D]" />}>
      <ElectronicsDashboard initialTab="roadmap" stages={stages} isAdmin={isAdmin} />
    </Suspense>
  );
}
