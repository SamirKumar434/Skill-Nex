import { requireAdminPage } from "@/lib/auth/require-admin";
import { getAdminStudentsList } from "@/lib/admin/dashboard";
import { StudentDirectoryTable } from "@/components/admin/StudentDirectoryTable";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  await requireAdminPage("/admin/students");

  const { students } = await getAdminStudentsList();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Registered Students Directory
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Search, filter, and inspect detailed curriculum completion and engagement for all student accounts.
          </p>
        </div>
      </div>

      {/* Directory Table with Search & Sort */}
      <StudentDirectoryTable initialStudents={students} />
    </div>
  );
}

