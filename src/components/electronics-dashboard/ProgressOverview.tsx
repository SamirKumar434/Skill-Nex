"use client";

import React from "react";
import { TrendingUp, Target, CheckCircle2 } from "lucide-react";

interface ProgressOverviewProps {
  overallProgressPercentage: number;
  currentStageTitle: string;
  currentStageOrder?: string;
  completedTopicsCount: number;
  totalTopicsCount: number;
}

export function ProgressOverview({
  overallProgressPercentage = 0,
  currentStageTitle = "C Programming",
  currentStageOrder = "01",
  completedTopicsCount = 0,
  totalTopicsCount = 28,
}: ProgressOverviewProps) {
  const topicsRemaining = Math.max(0, totalTopicsCount - completedTopicsCount);

  return (
    <section aria-label="Progress Summary" className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Overall Progress */}
        <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Overall Progress</span>
            <TrendingUp size={15} className="text-[#8B5CF6]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {overallProgressPercentage}%
            </div>
            <div className="w-full bg-[#181328] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="bg-[#8B5CF6] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${overallProgressPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2.5">
            {completedTopicsCount} of {totalTopicsCount} topics completed
          </p>
        </div>

        {/* Card 2: Current Stage */}
        <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Current Stage</span>
            <Target size={15} className="text-[#60A5FA]" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {currentStageTitle}
            </div>
            <div className="text-xs text-[#8B5CF6] font-medium mt-1">
              Stage {currentStageOrder} of 04
            </div>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2.5">
            {overallProgressPercentage === 100
              ? "All stages complete!"
              : "Active learning focus"}
          </p>
        </div>

        {/* Card 3: Topics Completed */}
        <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Topics Completed</span>
            <CheckCircle2 size={15} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {completedTopicsCount}{" "}
              <span className="text-sm font-normal text-[#64748B]">/ {totalTopicsCount}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2.5">
            {topicsRemaining === 0 ? "All topics completed" : `${topicsRemaining} topics remaining`}
          </p>
        </div>
      </div>
    </section>
  );
}
