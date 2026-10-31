import type { Metadata } from "next";
import { requireAdminPage } from "@/lib/auth/require-admin";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Monitoring Console — SkillNex",
  description: "SkillNex ECE student monitoring, learning analytics, and activity tracking.",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative server-side admin check:
  // - Redirects unauthenticated guests to /sign-in
  // - Returns 404 (notFound()) for non-admin students
  await requireAdminPage("/admin");

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}

