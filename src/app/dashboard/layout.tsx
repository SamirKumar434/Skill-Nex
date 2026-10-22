import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Electronics Dashboard — SkillNex",
  description: "Master C Programming, Git & GitHub, Analog Electronics, and Digital Electronics for ECE placements.",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
