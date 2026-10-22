import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PathSelectionCard, PathOption } from "@/components/choose-path/PathSelectionCard";

export const metadata: Metadata = {
  title: "Choose Your Path — SkillNex",
  description: "Select your engineering career path to begin your placement preparation roadmap.",
};

const PATH_OPTIONS: PathOption[] = [
  {
    id: "it-software",
    title: "IT & Software Development",
    subtitle: "Software Engineering Path",
    description:
      "Build programming skills, master problem-solving, and prepare for software engineering opportunities.",
    topics: ["Programming", "DSA", "System Design", "Web Tech", "Core CS"],
    ctaText: "Explore IT Path",
    href: "/dashboard/it",
    iconName: "Terminal",
    status: "coming-soon",
    accentColor: "#60A5FA",
  },
  {
    id: "core-electronics",
    title: "Core Electronics",
    subtitle: "Hardware & ECE Path",
    description:
      "Strengthen your electronics fundamentals, understand circuits, and build the technical foundation for core ECE opportunities.",
    topics: ["C Programming", "Git & GitHub", "Analog Electronics", "Digital Electronics"],
    ctaText: "Explore Core Electronics",
    href: "/dashboard/electronics",
    iconName: "Cpu",
    status: "live",
    accentColor: "#8B5CF6",
  },
];

export default function ChoosePathPage() {
  return (
    <div className="min-h-screen bg-[#07060D] text-[#F8FAFC] flex flex-col selection:bg-[#8B5CF6]/30 selection:text-white">
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
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 flex flex-col justify-center">
        {/* Headline Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#C084FC] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
            <Sparkles size={13} />
            <span>Structured Placement Roadmaps</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Choose Your Path
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Choose the learning path that matches your career goals. Build your skills one step at a time.
          </p>
        </div>

        {/* Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PATH_OPTIONS.map((path) => (
            <PathSelectionCard key={path.id} path={path} />
          ))}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-6 text-center text-xs text-[#64748B] border-t border-[#151222]">
        SkillNex &copy; {new Date().getFullYear()} — Engineering Placement Roadmaps
      </footer>
    </div>
  );
}
