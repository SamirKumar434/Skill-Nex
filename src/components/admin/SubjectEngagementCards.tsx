"use client";

import React from "react";
import {
  Terminal,
  GitBranch,
  AudioWaveform,
  Cpu,
  Code2,
  Layers,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { SubjectAnalyticsSummary } from "@/lib/admin/dashboard";

interface SubjectEngagementCardsProps {
  subjects: SubjectAnalyticsSummary[];
  selectedSubject: string;
  onSelectSubject: (subjectId: string) => void;
}

export function SubjectEngagementCards({
  subjects,
  selectedSubject,
  onSelectSubject,
}: SubjectEngagementCardsProps) {
  const getSubjectIcon = (id: string) => {
    switch (id) {
      case "c-programming":
        return Terminal;
      case "git-github":
        return GitBranch;
      case "analog-electronics":
        return AudioWaveform;
      case "digital-electronics":
        return Cpu;
      case "dsa":
        return Code2;
      case "verilog-hdl":
        return Layers;
      default:
        return Code2;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Subject-Wise Curriculum Engagement</span>
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Click any subject to filter the topic-level analytics table below.
          </p>
        </div>
        {selectedSubject !== "all" && (
          <button
            type="button"
            onClick={() => onSelectSubject("all")}
            className="text-xs font-semibold text-[#A855F7] hover:text-[#C084FC] transition-colors self-start sm:self-auto"
          >
            Clear Subject Filter (Show All)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {subjects.map((subj) => {
          const Icon = getSubjectIcon(subj.id);
          const isSelected = selectedSubject === subj.id;

          return (
            <div
              key={subj.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectSubject(isSelected ? "all" : subj.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSubject(isSelected ? "all" : subj.id);
                }
              }}
              className={`text-left rounded-2xl p-4 transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? "bg-[#18132B] border-2 border-[#8B5CF6] shadow-[0_0_24px_rgba(139,92,246,0.3)]"
                  : "bg-[#0D0B18] border border-[#1C182B] hover:border-[#382E56] hover:bg-[#120F22] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      subj.isAdminRestricted
                        ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                        : isSelected
                        ? "bg-[#8B5CF6] text-white"
                        : "bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A855F7] group-hover:bg-[#8B5CF6]/25"
                    }`}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-[#DDD6FE] transition-colors">
                        {subj.title}
                      </h4>
                      {subj.isAdminRestricted && (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1 py-0.2 rounded shrink-0">
                          Admin Preview
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {subj.totalTopics} {subj.id === "dsa" ? "questions" : "topics"}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-white">
                    {subj.avgCompletionRate}%
                  </div>
                  <div className="text-[10px] text-[#64748B]">avg completion</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3.5 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    subj.isAdminRestricted
                      ? "bg-gradient-to-r from-amber-500 to-amber-300"
                      : subj.id === "dsa"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                      : "bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]"
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, subj.avgCompletionRate))}%` }}
                />
              </div>

              {/* Metrics footer */}
              <div className="mt-3 pt-2.5 border-t border-[#1C182B] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-[#64748B]" />
                  <span>
                    Active:{" "}
                    <strong className="text-white font-medium">
                      {subj.studentsActiveCount} / {subj.eligibleCount}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>
                    Completions:{" "}
                    <strong className="text-white font-medium">
                      {subj.totalCompletions}
                    </strong>
                  </span>
                </div>

                <div className="text-[10px] text-[#64748B] group-hover:text-[#C084FC] flex items-center gap-0.5">
                  <span>{isSelected ? "Filtering" : "Filter"}</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

