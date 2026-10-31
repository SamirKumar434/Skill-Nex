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
  const isClickable = !stage.isComingSoon;

  // Status computation matching requirements
  let statusText = "Upcoming";
  let statusClasses = "bg-white/[0.04] text-[#94A3B8] border-white/[0.08]";

  if (stage.isComingSoon) {
    statusText = "Coming Soon";
    statusClasses = "bg-amber-500/15 text-amber-400 border-amber-500/30 font-semibold";
  } else if (isCompleted) {
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

  const actionText = stage.isComingSoon
    ? "Coming Soon"
    : isCompleted
    ? "Review Stage"
    : inProgress
    ? "Continue Stage"
    : stage.defaultStatus === "current" || stage.id === "c-programming"
    ? "Start Stage"
    : "View Stage";

  const handleClick = () => {
    if (!isClickable) {
      // Normal user experience: clicking the Coming Soon card does absolutely nothing
      return;
    }
    onSelectStage(stage.id);
  };

  return (
    <div
      role={isClickable ? "button" : "region"}
      tabIndex={isClickable ? 0 : -1}
      aria-label={stage.title}
      aria-disabled={stage.isComingSoon ? true : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group bg-[#0B0914] ${
        isClickable
          ? "hover:bg-[#0E0C1B] border-[#1C182B] hover:border-[#8B5CF6]/50 cursor-pointer"
          : "border-[#1C182B] cursor-default select-none"
      } border rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]`}
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
          <div
            className={`w-10 h-10 rounded-lg bg-[#141024] border border-[#231E35] flex items-center justify-center shrink-0 ${
              isClickable ? "text-[#A855F7] group-hover:text-white" : "text-[#A855F7]"
            } transition-colors`}
          >
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <h3
              className={`text-base sm:text-lg font-bold text-white ${
                isClickable ? "group-hover:text-[#E9D5FF]" : ""
              } transition-colors leading-snug`}
            >
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
            {stage.isComingSoon ? (
              <>16 topics</>
            ) : completedTopicsCount > 0 ? (
              <>
                {completedTopicsCount} of {totalTopicsCount} topics
              </>
            ) : (
              <>{totalTopicsCount} topics</>
            )}
          </span>
          {completedTopicsCount > 0 && !stage.isComingSoon && (
            <span className="font-mono font-medium text-white">{progressPercentage}%</span>
          )}
        </div>

        {completedTopicsCount > 0 && !stage.isComingSoon && (
          <div className="w-full bg-[#181328] rounded-full h-1 mb-3.5 overflow-hidden">
            <div
              className="bg-[#8B5CF6] h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}

        <div
          className={`flex items-center justify-between text-xs font-semibold ${
            isClickable
              ? "text-[#C084FC] group-hover:text-white transition-colors"
              : "text-[#64748B]"
          } pt-1`}
        >
          <span>{actionText}</span>
          {isClickable && (
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}
