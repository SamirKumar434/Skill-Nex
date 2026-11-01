"use client";

import React from "react";
import { BookOpen, CheckCircle2, TrendingUp, AlertTriangle, Users } from "lucide-react";
import type { ContentAnalyticsOverview } from "@/lib/admin/dashboard";

interface AnalyticsOverviewCardsProps {
  overview: ContentAnalyticsOverview;
}

export function AnalyticsOverviewCards({ overview }: AnalyticsOverviewCardsProps) {
  const {
    totalCurriculumItems,
    totalStudentCohortItems,
    totalCompletionRecords,
    avgTopicCompletionRate,
    zeroCompletionTopicsCount,
    eligibleStudentsCount,
  } = overview;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Curriculum Topics Available */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Curriculum Topics
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7]">
            <BookOpen size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {totalStudentCohortItems}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span>101 Core + 56 DSA (+16 Verilog Preview: {totalCurriculumItems})</span>
          </div>
        </div>
      </div>

      {/* 2. Total Student-Topic Completion Records */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Total Completions
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {totalCompletionRecords}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Verified
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
            <Users size={12} className="text-[#64748B]" />
            <span>Across {eligibleStudentsCount} non-admin students</span>
          </div>
        </div>
      </div>

      {/* 3. Average Topic Completion Percentage */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Avg Topic Completion
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <TrendingUp size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {avgTopicCompletionRate}%
          </div>
          <div className="mt-2 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#8B5CF6] to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, avgTopicCompletionRate))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Topics with Zero Completions */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Zero Completions
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {zeroCompletionTopicsCount}
            </span>
            <span className="text-xs text-[#64748B]">
              of {totalStudentCohortItems} topics
            </span>
          </div>
          <div className="mt-1 text-xs text-[#64748B]">
            Topics untouched across student cohort
          </div>
        </div>
      </div>
    </div>
  );
}

