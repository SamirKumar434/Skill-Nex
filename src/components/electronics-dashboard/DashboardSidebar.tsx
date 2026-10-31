"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  Binary,
  FolderGit2,
  Code2,
  Settings,
  User,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
} from "lucide-react";

export type DashboardTab =
  | "overview"
  | "roadmap"
  | "problems"
  | "revision"
  | "resources"
  | "projects"
  | "dsa"
  | "interview"
  | "settings"
  | "profile"
  | "it";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isAdmin?: boolean;
}

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ElementType;
  isPlaceholder?: boolean;
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  isAdmin = false,
}: DashboardSidebarProps) {
  const learnItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "roadmap", label: "My Roadmap", icon: Map },
    { id: "problems", label: "Problems", icon: Binary },
  ];

  const careerItems: NavItem[] = [
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "dsa", label: "DSA", icon: Code2 },
  ];

  const bottomItems: NavItem[] = [
    { id: "settings", label: "Settings", icon: Settings, isPlaceholder: true },
    { id: "profile", label: "Profile", icon: User, isPlaceholder: false },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="space-y-1">
      {!isCollapsed && (
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
          {title}
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            onClick={() => {
              onSelectTab(item.id);
              onCloseMobile();
            }}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
            } rounded-lg text-xs sm:text-sm font-medium transition-all ${
              isActive
                ? "bg-[#8B5CF6] text-white"
                : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                size={17}
                className={`shrink-0 ${isActive ? "text-white" : "text-[#94A3B8]"}`}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </div>

            {!isCollapsed && item.isPlaceholder && !isActive && (
              <span className="text-[10px] font-semibold text-[#64748B] bg-white/[0.04] px-1.5 py-0.5 rounded shrink-0">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Single Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#0A0914] border-r border-[#1C182B] flex flex-col transition-all duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          isCollapsed ? "lg:w-18" : "lg:w-64"
        } w-64`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#1C182B] shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0 group"
            onClick={onCloseMobile}
          >
            <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] shrink-0 group-hover:scale-105 transition-transform">
              <Zap size={16} />
            </span>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-white leading-tight tracking-tight">
                  Skill <span className="text-[#A855F7]">Nex</span>
                </div>
                <div className="text-[10px] font-medium text-[#64748B] truncate leading-none mt-0.5">
                  ECE Learning Workspace
                </div>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto overflow-x-hidden">
          {renderNavGroup("LEARN", learnItems)}
          {renderNavGroup("CAREER", careerItems)}
          {renderNavGroup("ACCOUNT", bottomItems)}

          {isAdmin && (
            <div className="space-y-1 pt-2 border-t border-[#1C182B]">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-amber-400" />
                  <span>ADMINISTRATOR</span>
                </div>
              )}
              <Link
                href="/admin"
                title="Open Admin Monitoring Console"
                onClick={onCloseMobile}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                } rounded-lg text-xs sm:text-sm font-medium transition-all text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShieldCheck size={17} className="shrink-0 text-amber-400" />
                  {!isCollapsed && <span className="truncate font-semibold">Admin Console</span>}
                </div>
                {!isCollapsed && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded shrink-0">
                    Portal
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Back Link */}
        <div className="p-3 border-t border-[#1C182B] shrink-0">
          <Link
            href="/"
            className={`flex items-center ${
              isCollapsed ? "justify-center p-2" : "gap-2 px-3 py-2"
            } text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg transition-colors`}
            title="Back to SkillNex Home"
            onClick={onCloseMobile}
          >
            <ArrowLeft size={15} className="shrink-0" />
            {!isCollapsed && <span className="truncate">Back to Home</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
