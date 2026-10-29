"use client";

import React, { useState } from "react";
import { Flame, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import type { UserActivitySummary, CalendarDay } from "@/lib/activity";

interface ActivityHeatmapProps {
  activity: UserActivitySummary;
}

export function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<CalendarDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const {
    weeks,
    monthLabels,
    currentStreak,
    longestStreak,
    totalActiveDays,
    totalActivitiesInPeriod,
  } = activity;

  const handleMouseEnter = (day: CalendarDay, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay(day);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setTooltipPos(null);
  };

  const formatTooltipDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(Date.UTC(year, month - 1, day));
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
      {/* 1. Header & Summary Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1A162B]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Activity
            </h2>
            <span className="text-[11px] font-semibold text-[#8B5CF6] px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              Past 12 Months
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Daily consistency heatmap of qualifying roadmap topics, DSA questions, and HDL problem completions.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
            <CheckCircle2 size={13} className="text-[#A855F7]" />
            <span className="text-[#94A3B8]">Total:</span>
            <span className="font-semibold text-white">{totalActivitiesInPeriod}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
            <Calendar size={13} className="text-[#38BDF8]" />
            <span className="text-[#94A3B8]">Active Days:</span>
            <span className="font-semibold text-white">{totalActiveDays}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs">
            <Flame size={13} className="text-[#C084FC]" />
            <span className="text-[#DDD6FE]">Current:</span>
            <span className="font-bold text-[#E9D5FF]">{currentStreak} {currentStreak === 1 ? "day" : "days"}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
            <Trophy size={13} className="text-amber-400" />
            <span className="text-amber-200/80">Longest:</span>
            <span className="font-bold text-amber-300">{longestStreak} {longestStreak === 1 ? "day" : "days"}</span>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Calendar Grid */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#25203D] scrollbar-track-transparent">
        <div className="min-w-[760px] flex">
          {/* Weekday indicators (Mon, Wed, Fri) */}
          <div className="flex flex-col justify-between py-[1px] pr-2.5 text-[10px] font-medium text-[#64748B] select-none h-[112px]">
            <span className="leading-none pt-4">Mon</span>
            <span className="leading-none">Wed</span>
            <span className="leading-none pb-4">Fri</span>
          </div>

          {/* 53 Columns of 7 Days */}
          <div className="flex-1">
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={`week-${wIdx}`} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const isFuture = day.isFuture;
                    let cellBg = "bg-[#141224] border border-[#221C38]";

                    if (!isFuture) {
                      if (day.level === 1) {
                        cellBg = "bg-[#581C87] border border-[#7E22CE]/70";
                      } else if (day.level === 2) {
                        cellBg = "bg-[#7C3AED] border border-[#9333EA]";
                      } else if (day.level === 3) {
                        cellBg = "bg-[#A855F7] border border-[#C084FC] shadow-[0_0_6px_rgba(168,85,247,0.4)]";
                      }
                    }

                    const todayRing = day.isToday
                      ? "ring-1.5 ring-white/80 ring-offset-1 ring-offset-[#0D0B18]"
                      : "";

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => !isFuture && handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                        onFocus={(e) => !isFuture && handleMouseEnter(day, e as unknown as React.MouseEvent<HTMLDivElement>)}
                        onBlur={handleMouseLeave}
                        tabIndex={isFuture ? -1 : 0}
                        role="gridcell"
                        aria-label={`${day.count} activities on ${day.date}`}
                        className={`w-3.5 h-3.5 rounded-[2px] transition-transform duration-100 ${cellBg} ${todayRing} ${
                          isFuture ? "opacity-30 cursor-default" : "hover:scale-125 hover:z-10 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Month Labels along the bottom */}
            <div className="relative h-5 mt-2 text-[10px] font-medium text-[#64748B] select-none">
              {monthLabels.map((m, idx) => {
                // Each week column is 14px (w-3.5) + 3px gap = 17px
                const leftPos = m.weekIndex * 17;
                return (
                  <span
                    key={`${m.name}-${idx}`}
                    className="absolute top-0 truncate"
                    style={{ left: `${leftPos}px` }}
                  >
                    {m.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Heatmap Legend (Less -> More) */}
      <div className="mt-4 pt-3 border-t border-[#1A162B] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#64748B] gap-2">
        <span className="text-[11px]">
          Timezone: <span className="font-mono text-[#94A3B8]">UTC</span> (Day resets at 00:00 UTC)
        </span>

        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-[2px] bg-[#141224] border border-[#221C38]" title="0 activities" />
            <span className="w-3 h-3 rounded-[2px] bg-[#581C87] border border-[#7E22CE]/70" title="1 activity" />
            <span className="w-3 h-3 rounded-[2px] bg-[#7C3AED] border border-[#9333EA]" title="2-3 activities" />
            <span className="w-3 h-3 rounded-[2px] bg-[#A855F7] border border-[#C084FC]" title="4+ activities" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* 4. Floating Hover Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-lg bg-[#19152B] border border-[#342D4F] text-white text-[11px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="text-white font-semibold leading-tight">
            {hoveredDay.count === 0 ? "No activity" : `${hoveredDay.count} ${hoveredDay.count === 1 ? "activity" : "activities"}`}
          </div>
          <div className="text-[#94A3B8] text-[10px] mt-0.5">
            {formatTooltipDate(hoveredDay.date)}
          </div>
        </div>
      )}
    </div>
  );
}
