"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Code2,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import {
  DSA_CATEGORIES,
  DsaCategory,
  getCompletedDsaQuestionIds,
  toggleDsaQuestionCompletion,
} from "@/data/dsa-data";
import { DsaTopicTable } from "./DsaTopicTable";

interface DsaSectionViewProps {
  onBackToOverview?: () => void;
}

export function DsaSectionView({ onBackToOverview }: DsaSectionViewProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    arrays: true,
    hashing: true,
    "binary-search": true,
    "string-basics": true,
    recursion: true,
    "linked-lists": true,
  });

  // Load persisted question completions on mount
  useEffect(() => {
    setCompletedIds(getCompletedDsaQuestionIds());
  }, []);

  const handleToggleQuestion = useCallback((questionId: string) => {
    const updated = toggleDsaQuestionCompletion(questionId);
    setCompletedIds(updated);
  }, []);

  // Compute metrics
  const allQuestions = useMemo(() => {
    return DSA_CATEGORIES.flatMap((c) => c.questions);
  }, []);

  const totalQuestions = allQuestions.length;
  const totalCompleted = useMemo(() => {
    return allQuestions.filter((q) => completedIds.includes(q.id)).length;
  }, [allQuestions, completedIds]);

  const easyQuestions = useMemo(() => {
    return allQuestions.filter((q) => q.difficulty === "Easy");
  }, [allQuestions]);

  const easyCompleted = useMemo(() => {
    return easyQuestions.filter((q) => completedIds.includes(q.id)).length;
  }, [easyQuestions, completedIds]);

  const mediumQuestions = useMemo(() => {
    return allQuestions.filter((q) => q.difficulty === "Medium");
  }, [allQuestions]);

  const mediumCompleted = useMemo(() => {
    return mediumQuestions.filter((q) => completedIds.includes(q.id)).length;
  }, [mediumQuestions, completedIds]);

  const overallProgressPct =
    totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  // Toggle category expansion
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Filter categories and questions
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return DSA_CATEGORIES.map((cat) => {
      // If a specific category tab is selected, only show that category
      if (selectedCategoryId !== "all" && cat.id !== selectedCategoryId) {
        return null;
      }

      const matchingQuestions = cat.questions.filter((item) => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.pattern.toLowerCase().includes(q) ||
          item.serial.includes(q)
        );
      });

      return {
        ...cat,
        questions: matchingQuestions,
      };
    }).filter(Boolean) as DsaCategory[];
  }, [searchQuery, selectedCategoryId]);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                CAREER TRACK
              </span>
              <span className="text-xs text-[#94A3B8]">Interview Readiness</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Code2 className="text-[#A855F7]" size={28} />
              <span>DSA & Problem Solving</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
              Master essential data structures and algorithmic patterns across 6 core topics.
              Solve verified LeetCode and GeeksforGeeks problems from Easy to Medium.
            </p>
          </div>

          {onBackToOverview && (
            <button
              type="button"
              onClick={onBackToOverview}
              className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors shrink-0"
            >
              <ArrowLeft size={13} />
              <span>Back to Overview</span>
            </button>
          )}
        </div>

        {/* 2. Progress Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          {/* Total Progress */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#94A3B8] font-medium">Overall Progress</span>
              <span className="font-mono font-bold text-white">{overallProgressPct}%</span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-[#8B5CF6] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${overallProgressPct}%` }}
              />
            </div>
            <div className="text-[11px] text-[#64748B] flex items-center justify-between">
              <span>{totalCompleted} of {totalQuestions} solved</span>
              <span className="text-[#A855F7] font-semibold">6 Topics</span>
            </div>
          </div>

          {/* Easy Questions */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-emerald-400 font-medium">Easy Problems</span>
              <span className="font-mono font-bold text-white">
                {easyQuestions.length > 0
                  ? Math.round((easyCompleted / easyQuestions.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    easyQuestions.length > 0
                      ? (easyCompleted / easyQuestions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="text-[11px] text-[#64748B]">
              {easyCompleted} of {easyQuestions.length} completed
            </div>
          </div>

          {/* Medium Questions */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-400 font-medium">Medium Problems</span>
              <span className="font-mono font-bold text-white">
                {mediumQuestions.length > 0
                  ? Math.round((mediumCompleted / mediumQuestions.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    mediumQuestions.length > 0
                      ? (mediumCompleted / mediumQuestions.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="text-[11px] text-[#64748B]">
              {mediumCompleted} of {mediumQuestions.length} completed
            </div>
          </div>
        </div>

        {/* 3. Filter Search & Category Navigation Pills */}
        <div className="mt-6 pt-5 border-t border-[#1C182B] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Topic Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategoryId("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategoryId === "all"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              All Topics (6)
            </button>
            {DSA_CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const catCompleted = cat.questions.filter((q) =>
                completedIds.includes(q.id)
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-[#64748B]"
                    }`}
                  >
                    {catCompleted}/{cat.questions.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search problems or patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0D1F] border border-[#231E35] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] pl-8.5 pr-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-[#8B5CF6]/40"
            />
          </div>
        </div>
      </div>

      {/* 4. Topic Sections & Tables */}
      <div className="space-y-6">
        {filteredCategories.map((cat) => {
          const isExpanded = expandedCategories[cat.id] ?? true;
          const completedInCat = cat.questions.filter((q) =>
            completedIds.includes(q.id)
          ).length;
          const catTotal = cat.questions.length;
          const catPct =
            catTotal > 0 ? Math.round((completedInCat / catTotal) * 100) : 0;

          return (
            <div
              key={cat.id}
              className="bg-[#0B0914] border border-[#1C182B] rounded-xl overflow-hidden"
            >
              {/* Category Header Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleCategoryExpand(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCategoryExpand(cat.id);
                  }
                }}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.01] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] font-mono text-xs font-bold shrink-0">
                    {cat.order}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {cat.title}
                      </h2>
                      {catPct === 100 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle2 size={11} />
                          <span>Mastered</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  {/* Category Progress Stats */}
                  <div className="text-right">
                    <div className="text-xs font-semibold text-white">
                      {completedInCat} / {catTotal} Solved
                    </div>
                    <div className="w-24 bg-[#181428] rounded-full h-1.5 overflow-hidden mt-1">
                      <div
                        className="bg-[#8B5CF6] h-1.5 rounded-full transition-all"
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Expand / Collapse Icon */}
                  <span className="p-1 rounded-lg text-[#94A3B8] hover:text-white bg-white/[0.04]">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
              </div>

              {/* 5-Column Question Table */}
              {isExpanded && (
                <div className="border-t border-[#1C182B] p-3 sm:p-4 bg-[#080710]">
                  <DsaTopicTable
                    questions={cat.questions}
                    completedQuestionIds={completedIds}
                    onToggleQuestion={handleToggleQuestion}
                  />
                </div>
              )}
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="p-12 text-center bg-[#0B0914] border border-[#1C182B] rounded-xl">
            <Layers className="mx-auto text-[#64748B] mb-2" size={32} />
            <h3 className="text-sm font-semibold text-white">No questions found</h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Try adjusting your search query or reset the topic filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
