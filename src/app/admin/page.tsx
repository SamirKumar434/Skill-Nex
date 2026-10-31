import { requireAdminPage } from "@/lib/auth/require-admin";
import { getAdminOverviewStats } from "@/lib/admin/dashboard";
import { OverviewStatsCards } from "@/components/admin/OverviewStatsCards";
import { StudentProgressTable } from "@/components/admin/StudentProgressTable";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await requireAdminPage("/admin");

  const stats = await getAdminOverviewStats();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Monitoring Overview
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Real-time PostgreSQL student analytics, completion metrics, and active streaks.
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <OverviewStatsCards stats={stats} />

      {/* Student Progress Summary Table */}
      <StudentProgressTable students={stats.recentStudents} />
    </div>
  );
}

