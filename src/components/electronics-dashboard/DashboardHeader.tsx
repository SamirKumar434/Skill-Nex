"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronRight, Compass, LogOut, PanelLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface DashboardHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileMenu: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
}

export function DashboardHeader({
  breadcrumbs,
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
}: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-[#1C182B] bg-[#07060E]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger, Sidebar toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-1.5 -ml-1 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5 lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <button
          type="button"
          onClick={onToggleSidebarCollapse}
          className="hidden lg:flex p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={18} />
        </button>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium min-w-0">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label + idx}>
                {idx > 0 && (
                  <ChevronRight size={13} className="text-[#475569] shrink-0" />
                )}
                {crumb.onClick && !isLast ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="text-[#94A3B8] hover:text-white transition-colors truncate max-w-[120px] sm:max-w-none"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    className={`truncate max-w-[140px] sm:max-w-none ${
                      isLast ? "text-white font-semibold" : "text-[#94A3B8]"
                    }`}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right: Search Input & Profile Avatar Dropdown */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search Field */}
        <div className="relative w-32 sm:w-64 md:w-72">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search topics or stages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#0D0B18] border border-[#221D33] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] pl-8.5 pr-7 py-1.5 rounded-lg transition-all outline-none focus:ring-1 focus:ring-[#8B5CF6]/40"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white p-0.5"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Student Avatar Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-[#181329] border border-[#2B2342] hover:border-[#8B5CF6] text-xs font-semibold text-[#C084FC] flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
            aria-expanded={isProfileOpen}
            aria-label="Student profile menu"
          >
            EC
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#0E0C1C] border border-[#231E35] rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-[#1C182B]">
                <div className="font-semibold text-white">ECE Student</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Core Electronics Track</div>
              </div>

              <div className="py-1">
                <Link
                  href="/choose-path"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Compass size={14} className="text-[#8B5CF6]" />
                  <span>Switch Learning Path</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <LogOut size={14} className="text-[#64748B]" />
                  <span>Exit to SkillNex Home</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
