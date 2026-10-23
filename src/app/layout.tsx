import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { AuthSync } from "@/components/auth/AuthSync";
import { ProgressProvider } from "@/components/progress/ProgressContext";
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
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#8B5CF6",
          colorBackground: "#0D0B18",
          colorInput: "#161326",
          colorInputForeground: "#FFFFFF",
          colorForeground: "#FFFFFF",
          colorNeutral: "#FFFFFF",
          colorMutedForeground: "#94A3B8",
        },
        elements: {
          card: "bg-[#0D0B18] border border-white/10 shadow-2xl",
          formButtonPrimary:
            "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]",
          socialButtonsBlockButton:
            "bg-[#161326] hover:bg-[#201C38] border border-white/10 text-white transition-all",
          socialButtonsBlockButtonText: "text-white font-medium",
          userButtonPopoverCard: "bg-[#0D0B18] border border-white/10 shadow-2xl",
          userButtonPopoverActionButton:
            "text-white hover:text-white hover:bg-white/10 transition-colors",
          userButtonPopoverActionButtonText: "text-white font-medium",
          userButtonPopoverActionButtonIcon: "text-gray-300",
          userPreviewMainIdentifier: "text-white font-semibold",
          userPreviewSecondaryIdentifier: "text-gray-400",
          footerActionLink: "text-[#A855F7] hover:text-[#C084FC]",
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
        <body className="antialiased">
          <AuthSync />
          <ProgressProvider>{children}</ProgressProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

