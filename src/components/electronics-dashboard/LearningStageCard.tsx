"use client";

import React from "react";
import {
  Terminal,
  GitBranch,
  AudioWaveform,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LearningStage } from "@/data/electronics-roadmap";

const ICON_MAP = {
  Terminal,
  GitBranch,
  AudioWaveform,
  Cpu,
};

interface LearningStageCardProps {
  stage: LearningStage;
  completedTopicsCount: number;
  totalTopicsCount: number;
  onSelectStage: (stageId: string) => void;
}

export function LearningStageCard({
  stage,
  completedTopicsCount,
  totalTopicsCount,
  onSelectStage,
}: LearningStageCardProps) {
  const Icon = ICON_MAP[stage.iconName] || Cpu;

  const isCompleted = totalTopicsCount > 0 && completedTopicsCount === totalTopicsCount;
  const inProgress = completedTopicsCount > 0 && !isCompleted;

  // Status computation matching requirements
  let statusText = "Upcoming";
  let statusClasses = "bg-white/[0.04] text-[#94A3B8] border-white/[0.08]";

  if (isCompleted) {
    statusText = "Completed";
    statusClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (inProgress) {
    statusText = "In Progress";
    statusClasses = "bg-[#8B5CF6]/15 text-[#C084FC] border-[#8B5CF6]/30";
  } else if (stage.defaultStatus === "current" || stage.id === "c-programming") {
    statusText = "Current";
    statusClasses = "bg-[#8B5CF6]/15 text-[#C084FC] border-[#8B5CF6]/30";
  }

  const progressPercentage =
    totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  const actionText = isCompleted
    ? "Review Stage"
    : inProgress
    ? "Continue Stage"
    : stage.defaultStatus === "current" || stage.id === "c-programming"
    ? "Start Stage"
    : "View Stage";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelectStage(stage.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectStage(stage.id);
        }
      }}
      className="group bg-[#0B0914] hover:bg-[#0E0C1B] border border-[#1C182B] hover:border-[#8B5CF6]/50 rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
    >
      {/* Top Header: Stage Number & Status Badge */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-[#8B5CF6] tracking-wider">
            STAGE {stage.order}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${statusClasses}`}
          >
            {isCompleted && <CheckCircle2 size={11} className="text-emerald-400" />}
            {statusText}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#141024] border border-[#231E35] flex items-center justify-center shrink-0 text-[#A855F7] group-hover:text-white transition-colors">
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E9D5FF] transition-colors leading-snug">
              {stage.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
              {stage.target}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Progress and Action */}
      <div className="mt-5 pt-4 border-t border-[#181427]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[#64748B]">
            {completedTopicsCount > 0 ? (
              <>
                {completedTopicsCount} of {totalTopicsCount} topics
              </>
            ) : (
              <>{totalTopicsCount} topics</>
            )}
          </span>
          {completedTopicsCount > 0 && (
            <span className="font-mono font-medium text-white">{progressPercentage}%</span>
          )}
        </div>

        {completedTopicsCount > 0 && (
          <div className="w-full bg-[#181328] rounded-full h-1 mb-3.5 overflow-hidden">
            <div
              className="bg-[#8B5CF6] h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between text-xs font-semibold text-[#C084FC] group-hover:text-white transition-colors pt-1">
          <span>{actionText}</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
}
