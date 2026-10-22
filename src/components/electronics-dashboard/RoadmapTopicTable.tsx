"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  PlayCircle,
  ExternalLink,
  CheckCircle2,
  Circle,
  Search,
} from "lucide-react";
import { LearningStage } from "@/data/electronics-roadmap";

interface RoadmapTopicTableProps {
  stage: LearningStage;
  completedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  onBackToRoadmap: () => void;
}

export function RoadmapTopicTable({
  stage,
  completedTopicIds,
  onToggleTopic,
  onBackToRoadmap,
}: RoadmapTopicTableProps) {
  const [topicSearch, setTopicSearch] = useState("");

  const filteredTopics = stage.topics.filter(
    (t) =>
      t.title.toLowerCase().includes(topicSearch.toLowerCase()) ||
      t.serial.includes(topicSearch) ||
      t.videoUrls?.some(
        (v) =>
          v.label.toLowerCase().includes(topicSearch.toLowerCase()) ||
          v.title.toLowerCase().includes(topicSearch.toLowerCase())
      )
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
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B5CF6] hover:text-[#C084FC] transition-colors mb-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Roadmap</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                STAGE {stage.order}
              </span>
              <span className="text-xs text-[#94A3B8]">Core Electronics Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {stage.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
              {stage.target} — follow the structured curriculum below.
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

      {/* Original 5-Column Topics Table */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1C182B] bg-[#0E0C1C] text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                <th className="py-3 px-3 sm:px-4 w-14 sm:w-20 text-center">Serial Number</th>
                <th className="py-3 px-3 sm:px-4 min-w-[260px]">Topic / Question</th>
                <th className="py-3 px-3 sm:px-4 w-32 sm:w-36 text-center">Video Lecture</th>
                <th className="py-3 px-3 sm:px-4 w-36 text-center">Practice / Reference</th>
                <th className="py-3 px-3 sm:px-4 w-28 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181427]">
              {filteredTopics.map((topic) => {
                const isCompleted = completedTopicIds.includes(topic.id);

                return (
                  <tr
                    key={topic.id}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      isCompleted ? "bg-emerald-500/[0.02]" : ""
                    }`}
                  >
                    {/* 1. # Serial */}
                    <td className="py-3.5 px-3 sm:px-4 text-center font-mono text-xs text-[#8B5CF6] font-medium">
                      {topic.serial}
                    </td>

                    {/* 2. Topic / Question */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => onToggleTopic(topic.id)}
                          className="mt-0.5 text-[#64748B] hover:text-[#34D399] transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
                          title={isCompleted ? "Mark incomplete" : "Mark complete"}
                          aria-label={
                            isCompleted
                              ? `Mark ${topic.title} incomplete`
                              : `Mark ${topic.title} complete`
                          }
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={17} className="text-emerald-400" />
                          ) : (
                            <Circle size={17} />
                          )}
                        </button>
                        <div className="min-w-0">
                          <div
                            className={`font-medium transition-colors ${
                              isCompleted
                                ? "text-[#94A3B8] line-through decoration-[#64748B]"
                                : "text-white"
                            }`}
                          >
                            {topic.title}
                          </div>
                          {topic.difficulty && (
                            <span className="inline-block mt-1 text-[10px] font-semibold text-[#64748B] bg-white/5 px-1.5 py-0.5 rounded">
                              {topic.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 3. Video Lecture */}
                    <td className="py-3.5 px-3 sm:px-4 text-center">
                      {topic.videoUrls && topic.videoUrls.length > 0 ? (
                        <div className="flex flex-col gap-1.5 items-center justify-center">
                          {topic.videoUrls.map((v, i) => (
                            <a
                              key={i}
                              href={v.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-[#F87171] hover:text-white bg-[#EF4444]/10 hover:bg-[#EF4444] transition-colors whitespace-nowrap"
                              title={v.title}
                            >
                              <PlayCircle size={13} className="shrink-0" />
                              <span>{v.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : topic.videoUrl ? (
                        <a
                          href={topic.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-[#F87171] hover:text-white bg-[#EF4444]/10 hover:bg-[#EF4444] transition-colors"
                        >
                          <PlayCircle size={13} />
                          <span>Watch Lecture</span>
                        </a>
                      ) : (
                        <span className="text-xs text-[#64748B]">—</span>
                      )}
                    </td>

                    {/* 4. Practice / Reference */}
                    <td className="py-3.5 px-3 sm:px-4 text-center">
                      {topic.refUrl ? (
                        <a
                          href={topic.refUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#60A5FA] hover:text-white bg-[#3B82F6]/10 hover:bg-[#3B82F6] transition-colors"
                        >
                          <ExternalLink size={12} />
                          <span>Reference</span>
                        </a>
                      ) : (
                        <span className="text-xs text-[#64748B]">—</span>
                      )}
                    </td>

                    {/* 5. Status Toggle Button */}
                    <td className="py-3.5 px-3 sm:px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleTopic(topic.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                          isCompleted
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-[#181329] text-[#94A3B8] border-[#29223D] hover:text-white hover:border-[#8B5CF6]"
                        }`}
                      >
                        {isCompleted ? "Done" : "Mark Done"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTopics.length === 0 && (
          <div className="py-10 text-center text-xs text-[#94A3B8]">
            No topics found matching your filter.
          </div>
        )}
      </div>
    </div>
  );
}
