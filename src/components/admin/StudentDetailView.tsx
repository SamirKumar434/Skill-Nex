"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Activity,
  Code2,
  Terminal,
  GitBranch,
  AudioWaveform,
  Cpu,
  Layers,
  Clock,
} from "lucide-react";
import type { AdminStudentDetailData } from "@/lib/admin/dashboard";
import { ActivityHeatmap } from "@/components/electronics-dashboard/ActivityHeatmap";

interface StudentDetailViewProps {
  data: AdminStudentDetailData;
}

type TabType = "all-subjects" | "c-programming" | "git-github" | "analog-electronics" | "digital-electronics" | "dsa" | "verilog-hdl";
type StatusFilter = "all" | "completed" | "incomplete";

export function StudentDetailView({ data }: StudentDetailViewProps) {
  const { user, metrics, subjects, dsaProgress, verilogProgress, activity } = data;

  const [activeSubjectTab, setActiveSubjectTab] = useState<TabType>("all-subjects");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatTimestamp = (isoString: string | null | undefined) => {
    if (!isoString) return null;
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

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
      case "verilog-hdl":
        return Layers;
      default:
        return Code2;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Back Navigation */}
      <div>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft size={15} />
          <span>Back to Students Directory</span>
        </Link>
      </div>

      {/* 2. Student Profile Summary Card */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            {user.avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.avatarUrl}
                alt={user.fullName || user.email}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#8B5CF6]/40 shadow-[0_0_20px_rgba(139,92,246,0.25)] shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/30 border-2 border-[#8B5CF6]/40 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shrink-0">
                {getInitials(user.fullName, user.email)}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                  {user.fullName || user.email.split("@")[0]}
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Student Account
                </span>
              </div>

              <div className="text-xs sm:text-sm text-[#94A3B8] truncate mt-0.5">
                {user.email}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#8B5CF6]" />
                  <span>Registered: {formatDate(user.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="truncate">
                  Track: <span className="text-[#DDD6FE] font-medium">{user.selectedTrack}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t md:border-t-0 md:border-l border-[#1C182B] pt-4 md:pt-0 md:pl-6 shrink-0">
            <div className="bg-[#141224] border border-[#221C38] rounded-xl p-3 text-center">
              <div className="text-lg sm:text-xl font-extrabold text-white">
                {metrics.roadmapPercentage}%
              </div>
              <div className="text-[10px] font-semibold uppercase text-[#64748B] mt-0.5">
                Roadmap
              </div>
            </div>

            <div className="bg-[#141224] border border-[#221C38] rounded-xl p-3 text-center">
              <div className="text-lg sm:text-xl font-extrabold text-white">
                {metrics.dsaPercentage}%
              </div>
              <div className="text-[10px] font-semibold uppercase text-[#64748B] mt-0.5">
                DSA
              </div>
            </div>

            <div className="bg-[#141224] border border-[#221C38] rounded-xl p-3 text-center">
              <div className="text-lg sm:text-xl font-extrabold text-white">
                {activity.totalActiveDays}
              </div>
              <div className="text-[10px] font-semibold uppercase text-[#64748B] mt-0.5">
                Active Days
              </div>
            </div>

            <div className="bg-[#141224] border border-[#221C38] rounded-xl p-3 text-center">
              <div className="text-lg sm:text-xl font-extrabold text-amber-300">
                {activity.currentStreak}d
              </div>
              <div className="text-[10px] font-semibold uppercase text-[#64748B] mt-0.5">
                Streak
              </div>
            </div>
          </div>
        </div>

        {/* Technical IDs for Admin Troubleshooting */}
        <div className="mt-5 pt-3 border-t border-[#1C182B] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>Database User ID:</span>
            <code className="text-[#DDD6FE] font-mono bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">
              {user.id}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span>Clerk Auth ID:</span>
            <code className="text-[#DDD6FE] font-mono bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">
              {user.clerkId}
            </code>
          </div>
        </div>
      </div>

      {/* 3. 12-Month Activity Heatmap (Genuine Records) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Activity size={16} className="text-[#8B5CF6]" />
            <span>Learning Activity Heatmap (Last 12 Months)</span>
          </h3>
          {metrics.lastActiveDate && (
            <span className="text-xs text-[#94A3B8]">
              Last active: <span className="text-white font-medium">{metrics.lastActiveDate}</span>
            </span>
          )}
        </div>

        {activity.totalActivitiesInPeriod === 0 ? (
          <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#64748B] mx-auto mb-2.5">
              <Clock size={20} />
            </div>
            <div className="text-sm font-semibold text-white">No activity logged yet</div>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              This student has not yet marked any roadmap topics or DSA problems as complete.
              Activity dates and streaks populate automatically from persisted records.
            </p>
          </div>
        ) : (
          <ActivityHeatmap activity={activity} />
        )}
      </div>

      {/* 4. Subject-Wise Progress Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 px-1">
          <Layers size={16} className="text-[#8B5CF6]" />
          <span>Curriculum Subject Mastery</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subj) => {
            const Icon = getSubjectIcon(subj.id);
            return (
              <div
                key={subj.id}
                className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{subj.title}</div>
                      <div className="text-[10px] text-[#64748B]">
                        {subj.completedCount} of {subj.totalCount} completed
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white">
                    {subj.percentage}%
                  </span>
                </div>

                <div className="mt-3 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] h-full rounded-full"
                    style={{ width: `${subj.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* DSA Card */}
          <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Code2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">DSA (C & Hardware)</div>
                  <div className="text-[10px] text-[#64748B]">
                    {dsaProgress.totalCompleted} of {dsaProgress.totalQuestions} questions
                  </div>
                </div>
              </div>
              <span className="text-sm font-extrabold text-white">
                {dsaProgress.percentage}%
              </span>
            </div>

            <div className="mt-3 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                style={{ width: `${dsaProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* Verilog HDL Card */}
          <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Layers size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Verilog HDL</span>
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1 py-0.2 rounded">
                      Preview
                    </span>
                  </div>
                  <div className="text-[10px] text-[#64748B]">
                    {verilogProgress.completedCount} of {verilogProgress.totalCount} completed
                  </div>
                </div>
              </div>
              <span className="text-sm font-extrabold text-white">
                {verilogProgress.percentage}%
              </span>
            </div>

            <div className="mt-3 w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                style={{ width: `${verilogProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Detailed Topic and Question Inspection */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1C182B]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Topic & Question Inspection
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Inspect verified completed topics, completion timestamps, and remaining concepts.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#141224] border border-[#221C38] p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-[#8B5CF6] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("completed")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "completed"
                  ? "bg-emerald-600 text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("incomplete")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "incomplete"
                  ? "bg-zinc-700 text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Incomplete
            </button>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#25203D]">
          <button
            type="button"
            onClick={() => setActiveSubjectTab("all-subjects")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeSubjectTab === "all-subjects"
                ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white"
                : "bg-white/[0.03] border border-white/[0.06] text-[#94A3B8] hover:text-white"
            }`}
          >
            All Roadmap ({metrics.completedRoadmapTopics}/{metrics.totalRoadmapTopics})
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSubjectTab(s.id as TabType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSubjectTab === s.id
                  ? "bg-[#8B5CF6]/20 border border-[#8B5CF6] text-white"
                  : "bg-white/[0.03] border border-white/[0.06] text-[#94A3B8] hover:text-white"
              }`}
            >
              {s.title} ({s.completedCount}/{s.totalCount})
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveSubjectTab("dsa")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeSubjectTab === "dsa"
                ? "bg-blue-500/20 border border-blue-500 text-white"
                : "bg-white/[0.03] border border-white/[0.06] text-[#94A3B8] hover:text-white"
            }`}
          >
            DSA ({dsaProgress.totalCompleted}/{dsaProgress.totalQuestions})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubjectTab("verilog-hdl")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeSubjectTab === "verilog-hdl"
                ? "bg-amber-500/20 border border-amber-500 text-white"
                : "bg-white/[0.03] border border-white/[0.06] text-[#94A3B8] hover:text-white"
            }`}
          >
            Verilog HDL ({verilogProgress.completedCount}/{verilogProgress.totalCount})
          </button>
        </div>

        {/* Topics Table List */}
        <div className="overflow-x-auto rounded-xl border border-[#1C182B] bg-[#0A0914]/50">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1C182B] bg-[#0E0C1C] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="py-2.5 px-4 w-16">Serial</th>
                <th className="py-2.5 px-4">Topic / Question</th>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-4">Difficulty</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C182B]">
              {/* Build list of displayed items */}
              {(() => {
                let items: {
                  serial: string;
                  title: string;
                  subject: string;
                  difficulty?: string;
                  isCompleted: boolean;
                  completedAt?: string | null;
                  key: string;
                }[] = [];

                if (activeSubjectTab === "all-subjects") {
                  for (const s of subjects) {
                    for (const t of s.topics) {
                      items.push({
                        serial: t.serial,
                        title: t.title,
                        subject: s.title,
                        difficulty: t.difficulty,
                        isCompleted: t.isCompleted,
                        completedAt: t.completedAt,
                        key: `${s.id}-${t.id}`,
                      });
                    }
                  }
                } else if (activeSubjectTab === "dsa") {
                  let qIndex = 1;
                  for (const cat of dsaProgress.categories) {
                    for (const q of cat.questions) {
                      items.push({
                        serial: `DSA-${qIndex++}`,
                        title: q.title,
                        subject: `DSA: ${cat.title}`,
                        difficulty: q.difficulty,
                        isCompleted: q.isCompleted,
                        completedAt: q.completedAt,
                        key: q.id,
                      });
                    }
                  }
                } else if (activeSubjectTab === "verilog-hdl") {
                  for (const t of verilogProgress.topics) {
                    items.push({
                      serial: t.serial,
                      title: t.title,
                      subject: "Verilog HDL",
                      difficulty: t.difficulty,
                      isCompleted: t.isCompleted,
                      completedAt: t.completedAt,
                      key: t.id,
                    });
                  }
                } else {
                  const s = subjects.find((x) => x.id === activeSubjectTab);
                  if (s) {
                    for (const t of s.topics) {
                      items.push({
                        serial: t.serial,
                        title: t.title,
                        subject: s.title,
                        difficulty: t.difficulty,
                        isCompleted: t.isCompleted,
                        completedAt: t.completedAt,
                        key: t.id,
                      });
                    }
                  }
                }

                if (statusFilter === "completed") {
                  items = items.filter((i) => i.isCompleted);
                } else if (statusFilter === "incomplete") {
                  items = items.filter((i) => !i.isCompleted);
                }

                if (items.length === 0) {
                  return (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#64748B]">
                        No topics match the selected filters.
                      </td>
                    </tr>
                  );
                }

                return items.map((item) => (
                  <tr key={item.key} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-4 font-mono text-[11px] text-[#8B5CF6]">
                      {item.serial}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-white max-w-sm">
                      {item.title}
                    </td>
                    <td className="py-2.5 px-4 text-[#94A3B8]">
                      {item.subject}
                    </td>
                    <td className="py-2.5 px-4">
                      {item.difficulty && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-[#94A3B8] border border-white/[0.06]">
                          {item.difficulty}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {item.isCompleted ? (
                        <div className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                          <CheckCircle2 size={14} />
                          <span>Completed</span>
                          {item.completedAt && (
                            <span className="text-[10px] text-[#64748B] font-normal hidden sm:inline">
                              ({formatTimestamp(item.completedAt)})
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-[#64748B] text-xs">
                          <Circle size={13} />
                          <span>Incomplete</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
