import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, ArrowLeft, ArrowRight, Clock, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "IT & Software Development Path — SkillNex",
  description: "IT & Software Development placement preparation roadmap coming soon.",
};

export default function ITPathPlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#07060D] text-[#F8FAFC] flex flex-col justify-between selection:bg-[#60A5FA]/30 selection:text-white">
      {/* Top Navbar */}
      <header className="h-18 px-6 sm:px-12 flex items-center justify-between border-b border-[#1A1629] bg-[#090814]/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-white group"
        >
          <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A855F7] font-mono text-sm font-bold group-hover:scale-105 transition-transform">
            {"⚡"}
          </span>
          <span>
            Skill<span className="text-[#A855F7]">Nex</span>
          </span>
        </Link>

        <Link
          href="/choose-path"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Change Path</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center mx-auto mb-6 text-[#60A5FA]">
          <Terminal size={32} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#93C5FD] bg-[#3B82F6]/10 border border-[#3B82F6]/25 mb-4">
          <Clock size={13} />
          <span>In Development</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          IT & Software Development Path
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8 max-w-lg mx-auto">
          The software engineering placement curriculum (including DSA, Full-Stack, and System Design) is currently being developed.
        </p>

        {/* Live Electronics Option Banner */}
        <div className="bg-[#0B0916] border border-[#8B5CF6]/30 rounded-2xl p-6 text-left mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center shrink-0 text-[#A855F7]">
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Ready to Learn Now
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Core Electronics Roadmap is Active!
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                Explore C Programming, Git & GitHub, Analog Electronics, and Digital Electronics immediately.
              </p>
              <Link
                href="/dashboard/electronics"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                <span>Go to Core Electronics Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <Link
            href="/choose-path"
            className="text-xs sm:text-sm text-[#94A3B8] hover:text-white transition-colors"
          >
            &larr; Return to Choose Your Path
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#64748B] border-t border-[#151222]">
        SkillNex &copy; {new Date().getFullYear()} — Engineering Placement Roadmaps
      </footer>
    </div>
  );
}
