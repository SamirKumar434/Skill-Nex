"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  Filter,
  X,
  Layers,
  HelpCircle,
} from "lucide-react";
import type { TopicAnalyticsItem } from "@/lib/admin/dashboard";

interface TopicAnalyticsTableProps {
  topics: TopicAnalyticsItem[];
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  searchedTopicId?: string | null;
}

type SortField =
  | "curriculum"
  | "completionDesc"
  | "completionAsc"
  | "completedStudentsDesc"
  | "completedStudentsAsc"
  | "name";

export function TopicAnalyticsTable({
  topics,
  selectedSubject,
  onSelectSubject,
  searchedTopicId,
}: TopicAnalyticsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortField>("curriculum");

  // Filter and sort items
  const filteredAndSortedTopics = useMemo(() => {
    let result = [...topics];

    // 1. Subject Filter
    if (selectedSubject !== "all") {
      result = result.filter((t) => t.subjectId === selectedSubject);
    }

    // 2. Difficulty Filter
    if (difficultyFilter !== "all") {
      result = result.filter((t) => {
        if (!t.difficulty) return false;
        const diff = t.difficulty.toLowerCase();
        if (difficultyFilter === "beginner") return diff.includes("beginner") || diff === "easy";
        if (difficultyFilter === "intermediate") return diff.includes("intermediate") || diff === "medium";
        if (difficultyFilter === "advanced") return diff.includes("advanced") || diff === "hard";
        return true;
      });
    }

    // 3. Search Filter (title or serial)
    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.serial.toLowerCase().includes(query) ||
          t.subjectTitle.toLowerCase().includes(query)
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "completionDesc":
          if (b.completionRate !== a.completionRate) return b.completionRate - a.completionRate;
          return b.completedCount - a.completedCount;
        case "completionAsc":
          if (a.completionRate !== b.completionRate) return a.completionRate - b.completionRate;
          return a.completedCount - b.completedCount;
        case "completedStudentsDesc":
          if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
          return b.completionRate - a.completionRate;
        case "completedStudentsAsc":
          if (a.completedCount !== b.completedCount) return a.completedCount - b.completedCount;
          return a.completionRate - b.completionRate;
        case "name":
          return a.title.localeCompare(b.title);
        case "curriculum":
        default:
          return 0; // Natural curriculum order from data source
      }
    });

    return result;
  }, [topics, selectedSubject, difficultyFilter, searchTerm, sortBy]);

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    const diff = difficulty.toLowerCase();
    if (diff.includes("beginner") || diff === "easy") {
      return (
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          {difficulty}
        </span>
      );
    }
    if (diff.includes("intermediate") || diff === "medium") {
      return (
        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
          {difficulty}
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
        {difficulty}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topic title, serial (e.g. 1.2, DSA-4)..."
            className="w-full bg-[#141224] border border-[#221C38] rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right: Filters & Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subject Filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-[#8B5CF6] shrink-0" />
            <select
              value={selectedSubject}
              onChange={(e) => onSelectSubject(e.target.value)}
              className="bg-[#141224] border border-[#221C38] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="all">All Subjects (173 items)</option>
              <option value="c-programming">C Programming (29)</option>
              <option value="git-github">Git & GitHub (20)</option>
              <option value="analog-electronics">Analog Electronics (22)</option>
              <option value="digital-electronics">Digital Electronics (30)</option>
              <option value="dsa">DSA Practice (56)</option>
              <option value="verilog-hdl">Verilog HDL Preview (16)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-[#141224] border border-[#221C38] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner / Easy</option>
              <option value="intermediate">Intermediate / Medium</option>
              <option value="advanced">Advanced / Hard</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={14} className="text-[#8B5CF6] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="bg-[#141224] border border-[#221C38] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="curriculum">Curriculum Order</option>
              <option value="completionDesc">Completion Rate (High → Low)</option>
              <option value="completionAsc">Completion Rate (Low → High)</option>
              <option value="completedStudentsDesc">Most Completed Students</option>
              <option value="completedStudentsAsc">Least Completed Students</option>
              <option value="name">Topic Name (A → Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Count Bar */}
      <div className="flex items-center justify-between px-1 text-xs text-[#64748B]">
        <span>
          Showing <span className="font-semibold text-white">{filteredAndSortedTopics.length}</span> of{" "}
          <span className="font-semibold text-white">{topics.length}</span> curriculum concepts
        </span>
        <div className="flex items-center gap-2">
          {selectedSubject !== "all" && (
            <span className="text-[11px] text-[#A855F7] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full border border-[#8B5CF6]/20">
              Subject Filter Active
            </span>
          )}
          {searchTerm && (
            <span className="text-[11px] text-amber-400">
              Search &ldquo;{searchTerm}&rdquo;
            </span>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        {filteredAndSortedTopics.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#64748B] mx-auto mb-3">
              <Layers size={22} />
            </div>
            <h3 className="text-sm font-semibold text-white">No topics match filters</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              Try resetting the subject filter, difficulty, or search keyword.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1C182B] bg-[#0A0914]/80 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3 px-4 sm:px-6">Topic / Concept</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span>Started</span>
                      <span
                        title="Database schema records completion events only; attempt tracking is not recorded."
                        className="cursor-help text-[#64748B] hover:text-[#94A3B8]"
                      >
                        <HelpCircle size={12} />
                      </span>
                    </div>
                  </th>
                  <th className="py-3 px-4">Completed</th>
                  <th className="py-3 px-4">Not Started</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C182B]">
                {filteredAndSortedTopics.map((topic) => {
                  const isHighlighted = searchedTopicId === topic.id;
                  const notStartedRate =
                    topic.eligibleCount > 0
                      ? Math.round((topic.notStartedCount / topic.eligibleCount) * 1000) / 10
                      : 0;

                  return (
                    <tr
                      key={topic.id}
                      className={`hover:bg-white/[0.02] transition-colors group ${
                        isHighlighted ? "bg-[#8B5CF6]/10" : ""
                      }`}
                    >
                      {/* Topic Title & Serial */}
                      <td className="py-3 px-4 sm:px-6">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold text-[#8B5CF6] px-1.5 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 shrink-0">
                            {topic.serial}
                          </span>
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <div className="font-semibold text-white truncate group-hover:text-[#DDD6FE] transition-colors">
                              {topic.title}
                            </div>
                            {topic.isAdminRestricted && (
                              <span className="inline-block text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1 py-0.2 rounded mt-0.5">
                                Admin Preview Only
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-3 px-4 whitespace-nowrap text-[#94A3B8]">
                        {topic.subjectTitle}
                      </td>

                      {/* Difficulty */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getDifficultyBadge(topic.difficulty)}
                      </td>

                      {/* Started (Clearly labeled as not recorded in schema) */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className="text-[11px] text-[#64748B] italic cursor-help"
                          title="Start attempts are not tracked in the schema (only completion & not-started are recorded)."
                        >
                          N/A*
                        </span>
                      </td>

                      {/* Completed */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-white">
                            {topic.completedCount} / {topic.eligibleCount}
                          </span>
                          <span className="text-[11px] text-emerald-400">
                            ({topic.completionRate}%)
                          </span>
                        </div>
                      </td>

                      {/* Not Started */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[#94A3B8]">
                            {topic.notStartedCount} / {topic.eligibleCount}
                          </span>
                          <span className="text-[11px] text-[#64748B]">
                            ({notStartedRate}%)
                          </span>
                        </div>
                      </td>

                      {/* Completion Rate with Progress Bar */}
                      <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="inline-flex flex-col items-end w-28">
                          <span className="font-bold text-white text-xs mb-1">
                            {topic.completionRate}%
                          </span>
                          <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                topic.completionRate >= 50
                                  ? "bg-gradient-to-r from-[#8B5CF6] to-emerald-400"
                                  : topic.completionRate > 0
                                  ? "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]"
                                  : "bg-zinc-800"
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, topic.completionRate))}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer note regarding Started metric */}
        <div className="p-3 bg-[#0A0914]/60 border-t border-[#1C182B] text-[11px] text-[#64748B] flex items-center justify-between">
          <span>
            * <strong>Note:</strong> Attempt/start telemetry is not stored in the database schema; learning progress strictly records verified completions and not-started status.
          </span>
          <span className="hidden sm:inline">SkillNex Content Analytics</span>
        </div>
      </div>
    </div>
  );
}

