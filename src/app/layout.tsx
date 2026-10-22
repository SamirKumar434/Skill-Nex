import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "SkillNex — Your Placement Journey, Organized",
  description:
    "SkillNex gives you a personalized roadmap to placement readiness. Prepare for core electronics or software roles with a structured path from fundamentals to interviews.",
  keywords: ["placement preparation", "engineering students", "ECE", "software jobs", "interview prep", "roadmap"],
  openGraph: {
    title: "SkillNex — Your Placement Journey, Organized",
    description:
      "Stop wondering what to study next. SkillNex gives you a structured path from fundamentals to interviews.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
