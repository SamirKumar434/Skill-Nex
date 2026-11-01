"use client";

import React from "react";
import { AlertCircle, TrendingDown, TrendingUp, Info } from "lucide-react";
import type { TopicAnalyticsItem } from "@/lib/admin/dashboard";

interface TopicsAttentionCardsProps {
  leastCompleted: TopicAnalyticsItem[];
  mostCompleted: TopicAnalyticsItem[];
  eligibleStudentsCount: number;
  hasSufficientSample: boolean;
  onSelectTopic?: (topicId: string) => void;
}

export function TopicsAttentionCards({
  leastCompleted,
  mostCompleted,
  eligibleStudentsCount,
  hasSufficientSample,
  onSelectTopic,
}: TopicsAttentionCardsProps) {
  return (
    <div className="space-y-3">
      {/* Sample Size Warning if fewer than 3 students */}
      {!hasSufficientSample && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 shadow-[0_4px_16px_rgba(245,158,11,0.1)]">
          <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-amber-300">
              Sample-Size Caution: Low Cohort Size ({eligibleStudentsCount} / 3 students)
            </div>
            <p className="text-amber-200/80 mt-0.5 leading-relaxed">
              Curriculum drop-off rankings require a minimum threshold of 3 registered students to produce statistically meaningful patterns. Rankings shown below represent preliminary completions only.
            </p>
          </div>
        </div>
      )}

      {/* Disclaimers & Insights Header */}
      <div className="bg-[#141224] border border-[#221C38] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#94A3B8]">
        <Info size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Interpretation Notice:</strong> Low recorded completion indicates where students have currently paused or have not yet marked a concept as complete. It does not necessarily indicate that the material is conceptually flawed or inherently difficult.
        </div>
      </div>

      {/* Two-Column Grid: Least Completed vs Most Completed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Least Completed Topics (Needs Attention / Lowest Engagement) */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1C182B]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <TrendingDown size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Least Completed Topics
                  </h4>
                  <div className="text-[11px] text-[#64748B]">
                    Potential drop-off points & unreached concepts
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                Attention Areas
              </span>
            </div>

            <div className="divide-y divide-[#181428] mt-2">
              {leastCompleted.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#64748B]">
                  No topic progress recorded yet.
                </div>
              ) : (
                leastCompleted.map((topic, idx) => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic?.(topic.id)}
                    className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-white/[0.02] px-1 rounded transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[11px] font-mono text-[#64748B] w-5 shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate group-hover:text-[#DDD6FE] transition-colors">
                          {topic.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate">
                          {topic.subjectTitle} • Serial {topic.serial}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-semibold text-rose-300">
                        {topic.completionRate}%
                      </div>
                      <div className="text-[10px] text-[#64748B]">
                        {topic.completedCount} / {topic.eligibleCount} students
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 2. Most Completed Topics (Highest Engagement) */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1C182B]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Most Completed Topics
                  </h4>
                  <div className="text-[11px] text-[#64748B]">
                    Highest engagement & baseline completion concepts
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                High Mastery
              </span>
            </div>

            <div className="divide-y divide-[#181428] mt-2">
              {mostCompleted.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#64748B]">
                  No topic progress recorded yet.
                </div>
              ) : (
                mostCompleted.map((topic, idx) => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic?.(topic.id)}
                    className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-white/[0.02] px-1 rounded transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[11px] font-mono text-[#64748B] w-5 shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate group-hover:text-[#DDD6FE] transition-colors">
                          {topic.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate">
                          {topic.subjectTitle} • Serial {topic.serial}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-semibold text-emerald-400">
                        {topic.completionRate}%
                      </div>
                      <div className="text-[10px] text-[#64748B]">
                        {topic.completedCount} / {topic.eligibleCount} students
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

