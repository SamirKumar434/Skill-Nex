import { requireAdminPage } from "@/lib/auth/require-admin";
import { getAdminContentAnalytics } from "@/lib/admin/dashboard";
import { ContentAnalyticsView } from "@/components/admin/ContentAnalyticsView";

export const dynamic = "force-dynamic";

export default async function AdminContentAnalyticsPage() {
  // Authoritative server-side admin guard:
  // - Unauthenticated guests redirect to /sign-in
  // - Authenticated students receive 404 (notFound())
  await requireAdminPage("/admin/analytics");

  const analyticsData = await getAdminContentAnalytics();

  return <ContentAnalyticsView data={analyticsData} />;
}

