"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Binary,
  Search,
  CheckCircle2,
  Clock,
  Circle,
  ArrowLeft,
  Cpu,
  ExternalLink,
} from "lucide-react";
import {
  PROBLEMS_DATA,
  PROBLEM_TOPICS,
  ProblemStatus,
  ProblemTopic,
  HDLBITS_INDEX_URL,
} from "@/data/problems-data";
import { useStudentProgress } from "@/components/progress/ProgressContext";
import { ProblemsTable } from "./ProblemsTable";

interface ProblemsSectionViewProps {
  onBackToOverview?: () => void;
}

export function ProblemsSectionView({ onBackToOverview }: ProblemsSectionViewProps) {
  const { problemStatusMap: statusMap, updateProblemStatus } = useStudentProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<"all" | ProblemTopic>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProblemStatus>("all");

  const handleUpdateStatus = useCallback((problemId: string, status: ProblemStatus) => {
    updateProblemStatus(problemId, status);
  }, [updateProblemStatus]);

  // Compute metrics from actual student status
  const totalProblems = PROBLEMS_DATA.length;

  const completedCount = useMemo(() => {
    return PROBLEMS_DATA.filter((p) => statusMap[p.id] === "completed").length;
  }, [statusMap]);

  const inProgressCount = useMemo(() => {
    return PROBLEMS_DATA.filter((p) => statusMap[p.id] === "in-progress").length;
  }, [statusMap]);

  const notStartedCount = useMemo(() => {
    return PROBLEMS_DATA.filter(
      (p) => !statusMap[p.id] || statusMap[p.id] === "not-started"
    ).length;
  }, [statusMap]);

  const completionPct =
    totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  // Filter problems based on topic, status, and search query
  const filteredProblems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return PROBLEMS_DATA.filter((item) => {
      // 1. Topic Filter
      if (selectedTopic !== "all" && item.topic !== selectedTopic) {
        return false;
      }

      // 2. Status Filter
      const itemStatus = statusMap[item.id] || "not-started";
      if (statusFilter !== "all" && itemStatus !== statusFilter) {
        return false;
      }

      // 3. Search Query
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.concept.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.hdlbitsKey.toLowerCase().includes(q) ||
        item.serial.includes(q)
      );
    });
  }, [searchQuery, selectedTopic, statusFilter, statusMap]);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                VERILOG & DIGITAL DESIGN
              </span>
              <span className="text-xs text-[#94A3B8]">HDLBits Hardware Practice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Cpu className="text-[#38BDF8]" size={28} />
              <span>Hardware & Verilog Problems</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
              Start solving hardware design problems using Verilog HDL, from basic logic gates to simple combinational circuits.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            <a
              href={HDLBITS_INDEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#38BDF8] hover:text-white bg-[#0284C7]/10 hover:bg-[#0284C7]/20 border border-[#38BDF8]/20 transition-colors"
              title="Browse official HDLBits problem sets index"
            >
              <span>HDLBits Index</span>
              <ExternalLink size={12} />
            </a>

            {onBackToOverview && (
              <button
                type="button"
                onClick={onBackToOverview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back to Overview</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Progress Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          {/* Overall Completion */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#94A3B8] font-medium">Overall Progress</span>
              <span className="font-mono font-bold text-white">{completionPct}%</span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-[#8B5CF6] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <div className="text-[11px] text-[#64748B] flex items-center justify-between">
              <span>{completedCount} of {totalProblems} solved</span>
              <span className="text-[#A855F7] font-semibold">{totalProblems} Verified HDL</span>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-400 font-medium">In Progress</span>
              <span className="font-mono font-bold text-white">{inProgressCount}</span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    totalProblems > 0 ? (inProgressCount / totalProblems) * 100 : 0
                  }%`,
                }}
              />
            </div>
            <div className="text-[11px] text-[#64748B]">
              {inProgressCount} circuits currently being designed
            </div>
          </div>

          {/* Verified Platform */}
          <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#38BDF8] font-medium">Platform & Tier</span>
              <span className="font-mono font-bold text-white">HDLBits (Easy)</span>
            </div>
            <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden mb-1.5">
              <div className="bg-[#38BDF8] h-1.5 rounded-full w-full" />
            </div>
            <div className="text-[11px] text-[#64748B]">
              4 Beginner Hardware Topics • 100% Verilog HDL
            </div>
          </div>
        </div>

        {/* 3. Topic Pills Filter */}
        <div className="mt-6 pt-5 border-t border-[#1C182B] space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedTopic("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopic === "all"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              All Topics ({totalProblems})
            </button>
            {PROBLEM_TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic;
              const countInTopic = PROBLEMS_DATA.filter((p) => p.topic === topic).length;
              const completedInTopic = PROBLEMS_DATA.filter(
                (p) => p.topic === topic && statusMap[p.id] === "completed"
              ).length;

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{topic}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-white/5 text-[#64748B]"
                    }`}
                  >
                    {completedInTopic}/{countInTopic}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Filter & Search Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                  statusFilter === "all"
                    ? "bg-[#231E35] text-white border border-[#8B5CF6]/40"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.02]"
                }`}
              >
                All Status
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("not-started")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  statusFilter === "not-started"
                    ? "bg-[#231E35] text-white border border-[#8B5CF6]/40"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.02]"
                }`}
              >
                <Circle size={11} className="text-[#64748B]" />
                <span>Not Started ({notStartedCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("in-progress")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  statusFilter === "in-progress"
                    ? "bg-[#231E35] text-white border border-amber-500/40"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.02]"
                }`}
              >
                <Clock size={11} className="text-amber-400" />
                <span>In Progress ({inProgressCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("completed")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  statusFilter === "completed"
                    ? "bg-[#231E35] text-white border border-emerald-500/40"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.02]"
                }`}
              >
                <CheckCircle2 size={11} className="text-emerald-400" />
                <span>Completed ({completedCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search Verilog circuits or gates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F0D1F] border border-[#231E35] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] pl-8.5 pr-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-[#8B5CF6]/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dedicated Hardware & Verilog Problems Table */}
      <ProblemsTable
        problems={filteredProblems}
        statusMap={statusMap}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* 5. Hardware & Verilog Learning Note */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-[#0284C7]/15 border border-[#38BDF8]/25 text-[#38BDF8] shrink-0">
          <Binary size={20} />
        </div>
        <div className="text-xs text-[#94A3B8] leading-relaxed">
          <span className="font-semibold text-white block mb-0.5">
            Verilog HDL Design Practice on HDLBits
          </span>
          Each exercise connects to an interactive Verilog simulator on HDLBits. Write synthesizable Verilog modules using continuous assignment (<code className="text-[#38BDF8] font-mono">assign</code>), bitwise gate operators (<code className="text-[#A855F7] font-mono">~</code>, <code className="text-[#A855F7] font-mono">&</code>, <code className="text-[#A855F7] font-mono">|</code>, <code className="text-[#A855F7] font-mono">^</code>), vector bus slicing (<code className="text-emerald-400 font-mono">[msb:lsb]</code>), and multiplexer logic (<code className="text-amber-400 font-mono">sel ? b : a</code>) to verify your circuit simulations.
        </div>
      </div>
    </div>
  );
}
