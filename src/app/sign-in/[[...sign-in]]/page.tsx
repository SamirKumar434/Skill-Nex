import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — SkillNex",
  description: "Sign in to your SkillNex account to continue your engineering placement preparation.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-[#F8FAFC] flex flex-col justify-between selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* Top Header */}
      <header className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-[#1A1629] bg-[#090814]/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-white group"
        >
          <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A855F7] font-mono text-sm font-bold group-hover:scale-105 transition-transform">
            {"<>"}
          </span>
          <span>
            Skill<span className="text-[#A855F7]">Nex</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#64748B] border-t border-[#151222]">
        SkillNex &copy; {new Date().getFullYear()} — Engineering Placement Roadmaps
      </footer>
    </div>
  );
}
