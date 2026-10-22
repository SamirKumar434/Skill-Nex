"use client";

import React from "react";
import {
  RotateCcw,
  BookOpen,
  FolderGit2,
  Briefcase,
  Settings,
  User,
  ArrowLeft,
  Sparkles,
  Terminal,
} from "lucide-react";

export type PlaceholderType =
  | "revision"
  | "resources"
  | "projects"
  | "interview"
  | "settings"
  | "profile"
  | "it";

interface PlaceholderNoticeProps {
  type: PlaceholderType;
  onBackToOverview: () => void;
}

const CONFIG_MAP: Record<
  PlaceholderType,
  {
    icon: React.ElementType;
    title: string;
    description: string;
  }
> = {
  revision: {
    icon: RotateCcw,
    title: "Revision & Quick Recall",
    description:
      "Interactive flashcards, circuit formula summaries, and op-amp cheat sheets are being organized for fast revision.",
  },
  resources: {
    icon: BookOpen,
    title: "ECE Reference Resources",
    description:
      "Curated textbook references, SPICE simulation toolkits, and datasheets for transistors and microcontrollers will be available here.",
  },
  projects: {
    icon: FolderGit2,
    title: "Projects & GitHub Showcase",
    description:
      "Hands-on embedded systems, circuit simulation, and Git-tracked project guides to strengthen your engineering portfolio.",
  },
  interview: {
    icon: Briefcase,
    title: "Interview Preparation",
    description:
      "Hardware and embedded technical interview questions, timed problem sets, and core electronics viva drills.",
  },
  settings: {
    icon: Settings,
    title: "Workspace Settings",
    description:
      "Configure your learning preferences, tracking defaults, and notification settings.",
  },
  profile: {
    icon: User,
    title: "Student Profile",
    description:
      "View your enrollment details, completed certificates, and track progress across semesters.",
  },
  it: {
    icon: Terminal,
    title: "IT & Software Development Path",
    description:
      "The comprehensive curriculum for Software Engineering, DSA, System Design, and CS Fundamentals is currently under active development.",
  },
};

export function PlaceholderNotice({
  type,
  onBackToOverview,
}: PlaceholderNoticeProps) {
  const config = CONFIG_MAP[type] || CONFIG_MAP.revision;
  const Icon = config.icon;

  return (
    <div className="py-14 px-6 bg-[#0B0914] border border-[#1C182B] rounded-xl text-center max-w-xl mx-auto my-8">
      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto mb-4 text-[#A855F7]">
        <Icon size={22} />
      </div>

      <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#C084FC] bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-full mb-3 border border-[#8B5CF6]/20">
        <Sparkles size={11} />
        <span>Coming Soon</span>
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
        {config.title}
      </h2>

      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
        {config.description}
      </p>

      <button
        type="button"
        onClick={onBackToOverview}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
      >
        <ArrowLeft size={15} />
        <span>Back to Overview</span>
      </button>
    </div>
  );
}
