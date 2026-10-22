"use client";

import React, { useMemo } from "react";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { CORE_ELECTRONICS_STAGES, LearningStage, RoadmapTopic } from "@/data/electronics-roadmap";

interface ContinueLearningProps {
  completedTopicIds: string[];
  onSelectStage: (stageId: string) => void;
}

export function ContinueLearning({
  completedTopicIds,
  onSelectStage,
}: ContinueLearningProps) {
  // Find first stage with an unfinished topic, and that topic
  const nextTarget = useMemo<{
    stage: LearningStage;
    topic: RoadmapTopic;
  } | null>(() => {
    for (const stage of CORE_ELECTRONICS_STAGES) {
      for (const topic of stage.topics) {
        if (!completedTopicIds.includes(topic.id)) {
          return { stage, topic };
        }
      }
    }
    return null;
  }, [completedTopicIds]);

  const hasNoProgress = completedTopicIds.length === 0;
  const isAllComplete = nextTarget === null;

  return (
    <section aria-label="Continue Learning" className="mb-8">
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center shrink-0 text-[#C084FC]">
              {isAllComplete ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : hasNoProgress ? (
                <Sparkles size={17} />
              ) : (
                <BookOpen size={17} />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A855F7] bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                  {isAllComplete
                    ? "Curriculum Complete"
                    : hasNoProgress
                    ? "Get Started"
                    : "Next Up"}
                </span>
                {!hasNoProgress && !isAllComplete && nextTarget && (
                  <span className="text-xs text-[#64748B]">
                    STAGE {nextTarget.stage.order} • {nextTarget.stage.title}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white">
                {isAllComplete
                  ? "All Core Electronics topics mastered!"
                  : hasNoProgress
                  ? "Begin with C Programming Fundamentals"
                  : nextTarget?.topic.title}
              </h3>

              <p className="text-xs text-[#94A3B8] mt-0.5">
                {isAllComplete
                  ? "Review your stages or explore revision topics anytime."
                  : hasNoProgress
                  ? "Start by building hands-on mastery in syntax, memory addressing, pointers, and compilation."
                  : `Topic ${nextTarget?.topic.serial} • ${nextTarget?.topic.difficulty || "Foundational"}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isAllComplete) {
                onSelectStage("c-programming");
              } else if (hasNoProgress) {
                onSelectStage("c-programming");
              } else if (nextTarget) {
                onSelectStage(nextTarget.stage.id);
              }
            }}
            className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          >
            <span>
              {isAllComplete
                ? "Review Stage 01"
                : hasNoProgress
                ? "Start C Programming"
                : "Continue Learning"}
            </span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
