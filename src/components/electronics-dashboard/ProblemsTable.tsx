"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { ProblemItem, ProblemStatus, ProblemTopic } from "@/data/problems-data";

interface ProblemsTableProps {
  problems: ProblemItem[];
  statusMap: Record<string, ProblemStatus>;
  onUpdateStatus: (problemId: string, status: ProblemStatus) => void;
}

export function ProblemsTable({
  problems,
  statusMap,
  onUpdateStatus,
}: ProblemsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const getStatus = (id: string): ProblemStatus => {
    return statusMap[id] || "not-started";
  };

  const statusConfigs: Record<
    ProblemStatus,
    { label: string; badgeClass: string; icon: React.ElementType }
  > = {
    "not-started": {
      label: "Not Started",
      badgeClass:
        "bg-[#181329] text-[#94A3B8] border-[#29223D] hover:text-white hover:border-[#8B5CF6]/50",
      icon: Circle,
    },
    "in-progress": {
      label: "In Progress",
      badgeClass:
        "bg-amber-500/10 text-amber-400 border-amber-500/25 hover:bg-amber-500/20",
      icon: Clock,
    },
    completed: {
      label: "Completed",
      badgeClass:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20",
      icon: CheckCircle2,
    },
  };

  const getTopicBadge = (topic: ProblemTopic) => {
    switch (topic) {
      case "Basic Wires and Signals":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/25";
      case "Logic Gates":
        return "bg-purple-500/10 text-purple-400 border-purple-500/25";
      case "Vectors":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/25";
      case "Combinational Circuits":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      default:
        return "bg-white/5 text-[#94A3B8] border-white/10";
    }
  };

  return (
    <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl overflow-visible shadow-sm">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-[760px] text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#1C182B] bg-[#0E0C1C] text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              <th className="py-3 px-3 sm:px-4 w-16 text-center whitespace-nowrap">Serial</th>
              <th className="py-3 px-3 sm:px-4 min-w-[280px]">Problem Name</th>
              <th className="py-3 px-3 sm:px-4 w-44 text-center whitespace-nowrap">Topic</th>
              <th className="py-3 px-3 sm:px-4 w-28 text-center whitespace-nowrap">Difficulty</th>
              <th className="py-3 px-3 sm:px-4 w-36 text-center whitespace-nowrap">Problem Link</th>
              <th className="py-3 px-3 sm:px-4 w-36 text-center whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181427]">
            {problems.map((problem) => {
              const currentStatus = getStatus(problem.id);
              const isCompleted = currentStatus === "completed";
              const isInProgress = currentStatus === "in-progress";
              const currentConfig = statusConfigs[currentStatus];
              const StatusIcon = currentConfig.icon;
              const isDropdownOpen = openDropdownId === problem.id;

              return (
                <tr
                  key={problem.id}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    isCompleted
                      ? "bg-emerald-500/[0.02]"
                      : isInProgress
                      ? "bg-amber-500/[0.02]"
                      : ""
                  }`}
                >
                  {/* 1. Serial Number */}
                  <td className="py-3.5 px-3 sm:px-4 text-center font-mono text-xs text-[#8B5CF6] font-medium align-middle">
                    {problem.serial}
                  </td>

                  {/* 2. Problem Name */}
                  <td className="py-3.5 px-3 sm:px-4 align-middle">
                    <div className="flex items-start gap-2.5">
                      {/* Quick toggle check icon: not-started -> completed -> not-started */}
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            problem.id,
                            isCompleted ? "not-started" : "completed"
                          )
                        }
                        className="mt-0.5 text-[#64748B] hover:text-[#34D399] transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded"
                        title={isCompleted ? "Mark Not Started" : "Mark Completed"}
                        aria-label={`Toggle completion for ${problem.title}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={17} className="text-emerald-400" />
                        ) : isInProgress ? (
                          <Clock size={17} className="text-amber-400" />
                        ) : (
                          <Circle size={17} />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-semibold text-[13px] sm:text-sm transition-colors ${
                              isCompleted
                                ? "text-[#94A3B8] line-through decoration-[#64748B]"
                                : "text-white"
                            }`}
                          >
                            {problem.title}
                          </span>
                          <span className="text-[10px] text-[#64748B] font-mono bg-white/[0.04] px-1.5 py-0.2 rounded border border-white/5">
                            {problem.hdlbitsKey}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          <span className="text-[10px] font-medium text-[#A855F7] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded font-mono">
                            {problem.concept}
                          </span>
                          <span className="text-[11px] text-[#64748B] hidden md:inline truncate max-w-sm">
                            {problem.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Topic */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    <span
                      className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-md border ${getTopicBadge(
                        problem.topic
                      )}`}
                    >
                      {problem.topic}
                    </span>
                  </td>

                  {/* 4. Difficulty */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/25">
                      {problem.difficulty}
                    </span>
                  </td>

                  {/* 5. Problem Link */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
                      title={`Open ${problem.title} on HDLBits`}
                    >
                      <span>Solve HDL</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>

                  {/* 7. Status Control */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle relative">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownId(isDropdownOpen ? null : problem.id)
                        }
                        className={`inline-flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${currentConfig.badgeClass}`}
                        title="Change problem status"
                      >
                        <StatusIcon size={13} className="shrink-0" />
                        <span>{currentConfig.label}</span>
                        <ChevronDown size={12} className="opacity-70" />
                      </button>

                      {isDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div className="absolute right-0 mt-1 w-36 bg-[#0E0C1C] border border-[#231E35] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                            {(
                              [
                                "not-started",
                                "in-progress",
                                "completed",
                              ] as ProblemStatus[]
                            ).map((st) => {
                              const config = statusConfigs[st];
                              const ItemIcon = config.icon;
                              const isSelected = currentStatus === st;

                              return (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => {
                                    onUpdateStatus(problem.id, st);
                                    setOpenDropdownId(null);
                                  }}
                                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                                    isSelected
                                      ? "bg-[#8B5CF6]/15 text-white font-semibold"
                                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
                                  }`}
                                >
                                  <ItemIcon
                                    size={13}
                                    className={
                                      st === "completed"
                                        ? "text-emerald-400"
                                        : st === "in-progress"
                                        ? "text-amber-400"
                                        : "text-[#64748B]"
                                    }
                                  />
                                  <span>{config.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {problems.length === 0 && (
        <div className="py-12 text-center text-xs text-[#94A3B8]">
          No Verilog exercises found matching your filter or search.
        </div>
      )}
    </div>
  );
}
