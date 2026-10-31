"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const pathname = usePathname();

  const getPageInfo = () => {
    if (pathname === "/admin") {
      return { title: "Overview", subtitle: "Real-time student progress and engagement metrics" };
    }
    if (pathname === "/admin/students") {
      return { title: "Students Directory", subtitle: "Inspect and monitor registered student accounts" };
    }
    if (pathname.startsWith("/admin/students/")) {
      return { title: "Student Details", subtitle: "Curriculum mastery breakdown and activity heatmap" };
    }
    return { title: "Admin Console", subtitle: "SkillNex ECE monitoring" };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="h-16 border-b border-[#1C182B] bg-[#0A0914]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 lg:hidden focus:outline-none"
          aria-label="Open navigation sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-[#94A3B8]">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Verified Admin Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin Access Verified</span>
        </div>

        {/* Quick Link to Student App */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-white px-2.5 py-1.5 rounded-lg border border-[#1C182B] hover:border-white/10 bg-[#0D0B18] transition-colors"
        >
          <span>Student App</span>
          <ArrowUpRight size={13} className="text-[#8B5CF6]" />
        </Link>
      </div>
    </header>
  );
}
