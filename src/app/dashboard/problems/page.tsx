"use client";

import React, { Suspense } from "react";
import { ElectronicsDashboard } from "@/components/electronics-dashboard/ElectronicsDashboard";

export default function ProblemsDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07060D]" />}>
      <ElectronicsDashboard initialTab="problems" />
    </Suspense>
  );
}
