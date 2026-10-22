"use client";

import React from "react";
import { LearningStage } from "@/data/electronics-roadmap";
import { LearningStageCard } from "./LearningStageCard";
import { SearchX } from "lucide-react";

interface LearningStageGridProps {
  stages: LearningStage[];
  completedTopicIds: string[];
  onSelectStage: (stageId: string) => void;
  searchQuery: string;
}

export function LearningStageGrid({
  stages,
  completedTopicIds,
  onSelectStage,
  searchQuery,
}: LearningStageGridProps) {
  if (stages.length === 0) {
    return (
      <section aria-label="Learning Roadmap" className="mb-8">
        <div className="text-center py-12 px-4 bg-[#0B0914] border border-[#1C182B] rounded-xl">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-[#64748B]">
            <SearchX size={20} />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No learning stages found</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
            No stages match &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;C Programming&rdquo;, &ldquo;Git&rdquo;, or &ldquo;Circuits&rdquo;.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Learning Roadmap" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Your Learning Roadmap
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Master core electronics sequentially across 4 structured stages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {stages.map((stage) => {
          const completedInStage = stage.topics.filter((t) =>
            completedTopicIds.includes(t.id)
          ).length;

          return (
            <LearningStageCard
              key={stage.id}
              stage={stage}
              completedTopicsCount={completedInStage}
              totalTopicsCount={stage.topics.length}
              onSelectStage={onSelectStage}
            />
          );
        })}
      </div>
    </section>
  );
}
