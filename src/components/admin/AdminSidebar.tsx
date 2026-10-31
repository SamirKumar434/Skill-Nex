"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AdminSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ isOpenMobile, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: pathname === "/admin",
    },
    {
      label: "Students",
      href: "/admin/students",
      icon: Users,
      isActive: pathname.startsWith("/admin/students"),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#0A0914] border-r border-[#1C182B] flex flex-col transition-all duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-auto lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } w-64`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#1C182B] shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 min-w-0 group"
            onClick={onCloseMobile}
          >
            <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] shrink-0 group-hover:scale-105 transition-transform">
              <Zap size={16} />
            </span>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-white leading-tight tracking-tight">
                    Skill <span className="text-[#A855F7]">Nex</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                </div>
                <div className="text-[10px] font-medium text-[#64748B] truncate leading-none mt-0.5">
                  Student Monitoring Console
                </div>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 lg:hidden"
            aria-label="Close admin navigation"
          >
            <X size={18} />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#8B5CF6]" />
              <span>Monitoring</span>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={item.label}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5"
                } rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  item.isActive
                    ? "bg-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  size={18}
                  className={`shrink-0 ${item.isActive ? "text-white" : "text-[#94A3B8]"}`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Bottom Return to Student App Link */}
        <div className="p-3 border-t border-[#1C182B] shrink-0 space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center ${
              isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2.5"
            } text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5 transition-colors`}
            title="Return to regular student dashboard"
            onClick={onCloseMobile}
          >
            <ArrowLeft size={16} className="shrink-0 text-[#A855F7]" />
            {!isCollapsed && (
              <div className="truncate text-left">
                <div className="text-xs text-white font-medium">Exit Admin Portal</div>
                <div className="text-[10px] text-[#64748B]">Return to Dashboard</div>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}

