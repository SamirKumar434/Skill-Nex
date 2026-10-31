import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth/require-admin";
import { getAdminStudentDetails } from "@/lib/admin/dashboard";
import { StudentDetailView } from "@/components/admin/StudentDetailView";

export const dynamic = "force-dynamic";

interface AdminStudentDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function AdminStudentDetailPage({
  params,
}: AdminStudentDetailPageProps) {
  const { userId } = await params;

  if (!userId) {
    notFound();
  }

  // Route protection
  await requireAdminPage(`/admin/students/${userId}`);

  // Fetch full student progress, curriculum breakdown, and activity heatmap
  const studentData = await getAdminStudentDetails(userId);

  if (!studentData) {
    notFound();
  }

  return <StudentDetailView data={studentData} />;
}

