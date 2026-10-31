"use client";

import React, { useMemo } from "react";
import {
  Terminal,
  GitBranch,
  AudioWaveform,
  Cpu,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  CORE_ELECTRONICS_STAGES,
  VERILOG_HDL_STAGE,
  LearningStage,
  RoadmapTopic,
} from "@/data/electronics-roadmap";

interface OverviewSubjectsViewProps {
  completedTopicIds: string[];
  onSelectSubject: (stageId: string) => void;
  onOpenRoadmap: () => void;
  isAdmin?: boolean;
}

interface SubjectCardDef {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  icon: React.ElementType;
  isComingSoon?: boolean;
}

const SUBJECT_CATALOG: SubjectCardDef[] = [
  {
    id: "c-programming",
    title: "C Programming",
    description: "Learn programming fundamentals and problem-solving.",
    category: "Programming",
    level: "Beginner",
    icon: Terminal,
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    description: "Learn version control and collaborate on projects.",
    category: "Developer Tools",
    level: "Beginner",
    icon: GitBranch,
  },
  {
    id: "analog-electronics",
    title: "Analog Electronics",
    description: "Understand electronic components, circuits and amplifiers.",
    category: "Electronics",
    level: "Beginner",
    icon: AudioWaveform,
  },
  {
    id: "digital-electronics",
    title: "Digital Electronics",
    description: "Learn logic gates, Boolean algebra and sequential circuits.",
    category: "Electronics",
    level: "Beginner",
    icon: Cpu,
  },
];

const VERILOG_SUBJECT_CARD: SubjectCardDef = {
  id: "verilog-hdl",
  title: "Verilog HDL",
  description: "Hardware description, synthesis methodology, modeling paradigms and testbench verification.",
  category: "Hardware / VLSI",
  level: "Beginner–Intermediate",
  icon: Cpu,
};

export function OverviewSubjectsView({
  completedTopicIds,
  onSelectSubject,
  onOpenRoadmap,
  isAdmin = false,
}: OverviewSubjectsViewProps) {
  const activeCatalog = useMemo(() => {
    return [
      ...SUBJECT_CATALOG,
      {
        ...VERILOG_SUBJECT_CARD,
        isComingSoon: !isAdmin,
      },
    ];
  }, [isAdmin]);

  const activeStages = useMemo(() => {
    return isAdmin ? [...CORE_ELECTRONICS_STAGES, VERILOG_HDL_STAGE] : CORE_ELECTRONICS_STAGES;
  }, [isAdmin]);

  // Find first stage with an unfinished topic for Continue Learning
  const nextTarget = useMemo<{
    stage: LearningStage;
    topic: RoadmapTopic;
  } | null>(() => {
    for (const stage of activeStages) {
      for (const topic of stage.topics) {
        if (!completedTopicIds.includes(topic.id)) {
          return { stage, topic };
        }
      }
    }
    return null;
  }, [completedTopicIds, activeStages]);

  const hasProgress = completedTopicIds.length > 0;

  return (
    <div className="space-y-8">
      {/* 1. Compact Welcome Section */}
      <section aria-label="Welcome Section" className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
          Welcome to SkillNex!
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
          Build your engineering skills, one subject at a time.
        </p>
      </section>

      {/* 2. Subject Catalog Section */}
      <section aria-label="Subject Catalog" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Explore Subjects
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30">
              {activeCatalog.length} subjects available
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenRoadmap}
            className="text-xs font-semibold text-[#A855F7] hover:text-[#C084FC] transition-colors inline-flex items-center gap-1"
          >
            <span>View Structured Roadmap</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 3. Compact 2-Column Catalog Grid (Desktop) / 1-Column (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {activeCatalog.map((subject) => {
            const Icon = subject.icon;
            const isClickable = !subject.isComingSoon;

            return (
              <div
                key={subject.id}
                role={isClickable ? "button" : "region"}
                tabIndex={isClickable ? 0 : -1}
                aria-label={subject.title}
                aria-disabled={subject.isComingSoon ? true : undefined}
                onClick={() => {
                  if (!isClickable) return;
                  onSelectSubject(subject.id);
                }}
                onKeyDown={(e) => {
                  if (!isClickable) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSubject(subject.id);
                  }
                }}
                className={`group bg-[#0B0914] ${
                  isClickable
                    ? "hover:bg-[#0E0C1C] border-[#1C182B] hover:border-[#8B5CF6]/50 cursor-pointer"
                    : "border-[#1C182B] cursor-default select-none"
                } border rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]`}
              >
                <div>
                  {/* Top Bar: Subject Icon & Category / Level tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-[#141024] border border-[#231E35] flex items-center justify-center ${
                        isClickable ? "text-[#A855F7] group-hover:scale-105 group-hover:text-white" : "text-[#A855F7]"
                      } transition-all`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#94A3B8]">
                      <span className="bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                        {subject.category}
                      </span>
                      {subject.isComingSoon ? (
                        <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded text-[#64748B]">
                          {subject.level}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Title & Short Description */}
                  <h3
                    className={`text-base sm:text-lg font-bold text-white ${
                      isClickable ? "group-hover:text-[#E9D5FF]" : ""
                    } transition-colors leading-snug`}
                  >
                    {subject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                </div>

                {/* Bottom Action: Explore Subject or Coming Soon */}
                {isClickable ? (
                  <div className="mt-5 pt-3.5 border-t border-[#181427] flex items-center justify-between text-xs font-semibold text-[#C084FC] group-hover:text-white transition-colors">
                    <span>Explore Subject</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1 text-[#8B5CF6] group-hover:text-white"
                    />
                  </div>
                ) : (
                  <div className="mt-5 pt-3.5 border-t border-[#181427] flex items-center justify-between text-xs font-medium text-[#64748B]">
                    <span>Coming Soon</span>
                    <span className="text-[11px] font-mono text-[#475569]">Preview only</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Compact Continue Learning Section */}
      <section aria-label="Continue Learning" className="pt-2">
        <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5">
          {hasProgress && nextTarget ? (
            /* Progress exists: show current active unfinished topic */
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                    <BookOpen size={11} />
                    In Progress
                  </span>
                  <span className="text-xs text-[#64748B] truncate">
                    {nextTarget.stage.title} • Topic {nextTarget.topic.serial}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {nextTarget.topic.title}
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Pick up right where you left off.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectSubject(nextTarget.stage.id)}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              >
                <span>Resume Learning</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            /* No progress: clean empty state with button to open My Roadmap */
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                  <Sparkles size={11} />
                  Ready to Start
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Your learning journey starts here.
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Follow the structured roadmap to master engineering fundamentals step by step.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenRoadmap}
                className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              >
                <span>Open My Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
