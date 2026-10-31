"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, User } from "lucide-react";
import type { StudentProgressSummary } from "@/lib/admin/dashboard";

interface StudentProgressTableProps {
  students: StudentProgressSummary[];
}

export function StudentProgressTable({ students }: StudentProgressTableProps) {
  const formatLastActive = (dateStr: string | null) => {
    if (!dateStr) {
      return <span className="text-[#64748B] italic">Never</span>;
    }
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    const now = new Date();
    const diffDays = Math.round(
      (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let relativeLabel = "";
    if (diffDays === 0) relativeLabel = "Today";
    else if (diffDays === 1) relativeLabel = "Yesterday";
    else if (diffDays < 7) relativeLabel = `${diffDays}d ago`;
    else {
      relativeLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
    }

    return (
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            diffDays <= 7 ? "bg-emerald-400" : "bg-[#64748B]"
          }`}
        />
        <span className="text-xs text-[#E2E8F0]">{relativeLabel}</span>
      </div>
    );
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

  return (
    <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-[#1C182B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Student Progress Summary</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A855F7]">
              {students.length} {students.length === 1 ? "student" : "students"}
            </span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Verified learning progress and active consistency across Core Electronics and DSA.
          </p>
        </div>

        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A855F7] hover:text-[#C084FC] transition-colors self-start sm:self-auto"
        >
          <span>View All Directory</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Table / Empty State */}
      {students.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#64748B] mx-auto mb-3">
            <User size={22} />
          </div>
          <h3 className="text-sm font-semibold text-white">No registered students found</h3>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            When students register and begin completing topics or problems, their progress records will display here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1C182B] bg-[#0A0914]/60 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 px-4 sm:px-6">Student</th>
                <th className="py-3 px-4">Roadmap Progress</th>
                <th className="py-3 px-4">DSA Progress</th>
                <th className="py-3 px-4">Verilog HDL</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C182B]">
              {students.map((student) => {
                const displayName = student.fullName || student.email.split("@")[0];
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Student Identity */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {student.avatarUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={student.avatarUrl}
                            alt={displayName}
                            className="w-8 h-8 rounded-full object-cover border border-[#2B2340] shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/30 border border-[#8B5CF6]/30 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {getInitials(student.fullName, student.email)}
                          </div>
                        )}
                        <div className="min-w-0 max-w-[180px] sm:max-w-xs">
                          <div className="font-semibold text-white truncate group-hover:text-[#C084FC] transition-colors">
                            {displayName}
                          </div>
                          <div className="text-[11px] text-[#64748B] truncate">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Roadmap Completion */}
                    <td className="py-3.5 px-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-white">
                            {student.roadmapPercentage}%
                          </span>
                          <span className="text-[#64748B]">
                            {student.completedRoadmapTopics}/{student.totalRoadmapTopics}
                          </span>
                        </div>
                        <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] h-full rounded-full"
                            style={{ width: `${student.roadmapPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* DSA Completion */}
                    <td className="py-3.5 px-4">
                      <div className="w-28">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-white">
                            {student.dsaPercentage}%
                          </span>
                          <span className="text-[#64748B]">
                            {student.completedDsaQuestions}/{student.totalDsaQuestions}
                          </span>
                        </div>
                        <div className="w-full bg-[#181428] rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                            style={{ width: `${student.dsaPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Verilog HDL Completion */}
                    <td className="py-3.5 px-4">
                      {student.verilogCount > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {student.verilogCount} / {student.totalVerilogTopics} ({student.verilogPercentage}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#64748B]">—</span>
                      )}
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {formatLastActive(student.lastActiveDate)}
                    </td>

                    {/* Action Link */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/students/${student.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#8B5CF6] text-[#DDD6FE] hover:text-white border border-white/[0.08] hover:border-[#8B5CF6] transition-all"
                      >
                        <span>Details</span>
                        <ChevronRight size={13} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
