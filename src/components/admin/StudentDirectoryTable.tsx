"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpDown,
  ChevronRight,
  X,
  Calendar,
} from "lucide-react";
import type { StudentProgressSummary } from "@/lib/admin/dashboard";

interface StudentDirectoryTableProps {
  initialStudents: StudentProgressSummary[];
}

type SortField =
  | "recentActivity"
  | "roadmapDesc"
  | "roadmapAsc"
  | "dsaDesc"
  | "name"
  | "createdAt";

export function StudentDirectoryTable({ initialStudents }: StudentDirectoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("recentActivity");

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...initialStudents];

    // Search filter
    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (s) =>
          s.fullName?.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "recentActivity": {
          if (!a.lastActiveDate && !b.lastActiveDate) return b.createdAt.localeCompare(a.createdAt);
          if (!a.lastActiveDate) return 1;
          if (!b.lastActiveDate) return -1;
          return b.lastActiveDate.localeCompare(a.lastActiveDate);
        }
        case "roadmapDesc":
          return b.roadmapPercentage - a.roadmapPercentage;
        case "roadmapAsc":
          return a.roadmapPercentage - b.roadmapPercentage;
        case "dsaDesc":
          return b.dsaPercentage - a.dsaPercentage;
        case "name":
          return (a.fullName || a.email).localeCompare(b.fullName || b.email);
        case "createdAt":
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });

    return result;
  }, [initialStudents, searchTerm, sortBy]);

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

  const formatLastActive = (dateStr: string | null) => {
    if (!dateStr) {
      return <span className="text-[#64748B] italic">Never active</span>;
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
    <div className="space-y-4">
      {/* Controls Bar: Search & Sort */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name or email..."
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

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ArrowUpDown size={15} className="text-[#8B5CF6] shrink-0" />
          <span className="text-xs text-[#94A3B8] whitespace-nowrap">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            className="bg-[#141224] border border-[#221C38] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
          >
            <option value="recentActivity">Recent Activity</option>
            <option value="roadmapDesc">Roadmap Progress (High → Low)</option>
            <option value="roadmapAsc">Roadmap Progress (Low → High)</option>
            <option value="dsaDesc">DSA Progress (High → Low)</option>
            <option value="createdAt">Newest Registered</option>
            <option value="name">Student Name (A → Z)</option>
          </select>
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between px-1 text-xs text-[#64748B]">
        <span>
          Showing <span className="font-semibold text-white">{filteredAndSortedStudents.length}</span> of{" "}
          <span className="font-semibold text-white">{initialStudents.length}</span> registered students
        </span>
        {searchTerm && (
          <span className="text-amber-400/90 text-[11px]">
            Filtered by &ldquo;{searchTerm}&rdquo;
          </span>
        )}
      </div>

      {/* Student List Table */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
        {filteredAndSortedStudents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#64748B] mx-auto mb-3">
              <Search size={22} />
            </div>
            <h3 className="text-sm font-semibold text-white">No matching students found</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              No registered students match &ldquo;{searchTerm}&rdquo;. Try searching for another name or email.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1C182B] bg-[#0A0914]/60 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3 px-4 sm:px-6">Student</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Roadmap Progress</th>
                  <th className="py-3 px-4">DSA Progress</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C182B]">
                {filteredAndSortedStudents.map((student) => {
                  const displayName = student.fullName || student.email.split("@")[0];
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="flex items-center gap-3"
                        >
                          {student.avatarUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={student.avatarUrl}
                              alt={displayName}
                              className="w-9 h-9 rounded-full object-cover border border-[#2B2340] shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/30 border border-[#8B5CF6]/30 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {getInitials(student.fullName, student.email)}
                            </div>
                          )}
                          <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                            <div className="font-semibold text-white truncate group-hover:text-[#C084FC] transition-colors">
                              {displayName}
                            </div>
                            <div className="text-[11px] text-[#64748B] truncate">
                              {student.email}
                            </div>
                          </div>
                        </Link>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#94A3B8]">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#64748B]" />
                          <span>{formatDate(student.createdAt)}</span>
                        </div>
                      </td>

                      {/* Overall Roadmap Completion */}
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

                      {/* Last Active Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {formatLastActive(student.lastActiveDate)}
                      </td>

                      {/* Action Link */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#8B5CF6] text-[#DDD6FE] hover:text-white border border-white/[0.08] hover:border-[#8B5CF6] transition-all"
                        >
                          <span>Inspect</span>
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
    </div>
  );
}
