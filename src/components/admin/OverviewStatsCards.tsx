"use client";

import React from "react";
import { Users, Activity, UserX, GraduationCap } from "lucide-react";
import type { AdminOverviewStats } from "@/lib/admin/dashboard";

interface OverviewStatsCardsProps {
  stats: AdminOverviewStats;
}

export function OverviewStatsCards({ stats }: OverviewStatsCardsProps) {
  const { totalStudents, activeStudents7d, inactiveStudents7d, avgRoadmapPercentage } = stats;

  const activePercent =
    totalStudents > 0 ? Math.round((activeStudents7d / totalStudents) * 100) : 0;
  const inactivePercent =
    totalStudents > 0 ? Math.round((inactiveStudents7d / totalStudents) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Registered Students */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Registered Students
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7]">
            <Users size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {totalStudents}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span>Excludes admin accounts</span>
          </div>
        </div>
      </div>

      {/* 2. Active Students in Last 7 Days */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Active (Last 7 Days)
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {activeStudents7d}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {activePercent}% of total
            </span>
          </div>
          <div className="mt-1 text-xs text-[#64748B]">
            Qualifying topics & DSA logged
          </div>
        </div>
      </div>

      {/* 3. Inactive Students in Last 7 Days */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Inactive (7+ Days)
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <UserX size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {inactiveStudents7d}
            </span>
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {inactivePercent}% of total
            </span>
          </div>
          <div className="mt-1 text-xs text-[#64748B]">
            No activity records in last week
          </div>
        </div>
      </div>

      {/* 4. Average Roadmap Completion % */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] relative overflow-hidden group hover:border-[#2C2440] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Avg Roadmap Progress
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <GraduationCap size={18} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {avgRoadmapPercentage}%
          </div>
          <div className="mt-2 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#8B5CF6] to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, avgRoadmapPercentage))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

