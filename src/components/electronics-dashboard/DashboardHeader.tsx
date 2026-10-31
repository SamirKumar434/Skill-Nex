"use client";

import React from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronRight, PanelLeft, ShieldCheck } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";

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
  isAdmin?: boolean;
}

export function DashboardHeader({
  breadcrumbs,
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  isAdmin = false,
}: DashboardHeaderProps) {

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

        {/* Profile & Auth Menu */}
        <div className="flex items-center">
          {isAdmin && (
            <Link
              href="/admin"
              className="mr-3 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 hover:text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)]"
              title="Open Admin Monitoring Console"
            >
              <ShieldCheck size={14} />
              <span>Admin Console</span>
            </Link>
          )}

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 rounded-full border border-[#2B2342] hover:border-[#8B5CF6] transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)]",
                },
              }}
            />
          </Show>

          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="h-8 px-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold inline-flex items-center justify-center transition-all shadow-[0_0_12px_rgba(139,92,246,0.4)]"
            >
              Sign In
            </Link>
          </Show>
        </div>
      </div>
    </header>
  );
}
