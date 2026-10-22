"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { LearningStage } from "@/data/electronics-roadmap";

interface OverviewTopicTableProps {
  stage: LearningStage;
  completedTopicIds?: string[];
  onBackToOverview: () => void;
}

export function OverviewTopicTable({
  stage,
  completedTopicIds = [],
  onBackToOverview,
}: OverviewTopicTableProps) {
  const [topicSearch, setTopicSearch] = useState("");

  const filteredTopics = stage.topics.filter(
    (t) =>
      t.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
      t.serial.includes(topicSearch)
  );

  const completedCount = stage.topics.filter((t) =>
    completedTopicIds.includes(t.id)
  ).length;

  const totalCount = stage.topics.length;
  const progressPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back button & Stage header */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-5 sm:p-6">
        <button
          type="button"
          onClick={onBackToOverview}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B5CF6] hover:text-[#C084FC] transition-colors mb-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Overview</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                STAGE {stage.order}
              </span>
              <span className="text-xs text-[#94A3B8]">Core Electronics Documentation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {stage.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
              {stage.target} — select any topic to read its step-by-step engineering documentation.
            </p>
          </div>

          {/* Progress summary for this stage */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-3.5 min-w-[200px] shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#94A3B8] font-medium">Stage Progress</span>
              <span className="font-mono font-bold text-white">{progressPct}%</span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-[#8B5CF6] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="text-[11px] text-[#64748B]">
              {completedCount} of {totalCount} topics mastered
            </div>
          </div>
        </div>

        {/* Filter search within stage */}
        <div className="mt-5 pt-4 border-t border-[#1C182B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
            />
            <input
              type="text"
              placeholder={`Filter ${stage.title} topics...`}
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              className="w-full bg-[#0F0D1F] border border-[#231E35] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] pl-8.5 pr-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-[#8B5CF6]/40"
            />
          </div>
          <span className="text-xs text-[#64748B] self-center">
            Showing {filteredTopics.length} of {totalCount} topics
          </span>
        </div>
      </div>

      {/* Git & GitHub One-Shot Disclaimer Banner & Recommended Tutorial */}
      {stage.id === "git-github" && (
        <div className="space-y-4">
          <div className="bg-[#0F0D1F] border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/15 via-[#0F0D1F] to-[#0F0D1F] rounded-xl p-3.5 sm:p-4 flex items-start gap-3 shadow-sm">
            <span className="text-base sm:text-lg select-none shrink-0" aria-hidden="true">
              📌
            </span>
            <div className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
              <span className="font-bold text-white">Note: </span>
              We have included a beginner-friendly one-shot video covering Git and GitHub. You can watch it to understand the basics and follow the roadmap below for step-by-step practice.
            </div>
          </div>

          <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Recommended One-Shot Tutorial
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
                  New to Git and GitHub? Start with this beginner-friendly one-shot tutorial to understand the basics. Then follow the roadmap below to practise the commands and upload your projects to GitHub.
                </p>
              </div>

              <a
                href="https://www.youtube.com/watch?v=Ez8F0nW6S-w"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all shadow-md hover:shadow-[#8B5CF6]/25 shrink-0 self-start sm:self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              >
                <span>▶ Watch the Git & GitHub Tutorial</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Simplified Overview Topics Table (Serial Number & Topic only) */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1C182B] bg-[#0E0C1C] text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                <th className="py-3 px-4 w-16 text-center">#</th>
                <th className="py-3 px-5">Topic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181427]">
              {filteredTopics.map((topic) => {
                const isCompleted = completedTopicIds.includes(topic.id);

                return (
                  <tr
                    key={topic.id}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      isCompleted ? "bg-purple-500/[0.02]" : ""
                    }`}
                  >
                    {/* 1. Serial Number */}
                    <td className="py-4 px-4 text-center font-mono text-xs font-semibold text-[#8B5CF6] align-top pt-4.5">
                      {topic.serial}
                    </td>

                    {/* 2. Topic Column */}
                    <td className="py-4 px-5">
                      <div className="flex flex-col items-start gap-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/dashboard/electronics/docs/${topic.id}`}
                            className="font-medium text-white hover:text-[#C084FC] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded text-[13px] sm:text-sm"
                          >
                            {topic.title}
                          </Link>
                          {topic.difficulty && (
                            <span className="text-[10px] font-medium text-[#94A3B8] bg-[#181428] border border-[#26203D] px-2 py-0.5 rounded-full">
                              {topic.difficulty}
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Click to read documentation link */}
                        <Link
                          href={`/dashboard/electronics/docs/${topic.id}`}
                          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#8B5CF6] hover:text-[#C084FC] transition-colors group font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded py-0.5"
                        >
                          <BookOpen size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span>Click to read documentation</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTopics.length === 0 && (
          <div className="py-12 text-center text-xs text-[#94A3B8]">
            No topics found matching your filter.
          </div>
        )}
      </div>
    </div>
  );
}
