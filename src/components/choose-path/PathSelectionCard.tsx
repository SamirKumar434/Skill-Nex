"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Cpu, ArrowRight, Clock } from "lucide-react";

export interface PathOption {
  id: "it-software" | "core-electronics";
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  ctaText: string;
  href: string;
  iconName: "Terminal" | "Cpu";
  status: "live" | "coming-soon";
  accentColor: string;
}

interface PathSelectionCardProps {
  path: PathOption;
}

export function PathSelectionCard({ path }: PathSelectionCardProps) {
  const Icon = path.iconName === "Terminal" ? Terminal : Cpu;
  const isLive = path.status === "live";

  return (
    <div
      className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 border ${
        isLive
          ? "bg-[#0B0916] border-[#8B5CF6]/40 hover:border-[#8B5CF6] shadow-[0_4px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_45px_rgba(139,92,246,0.25)]"
          : "bg-[#090812] border-[#1D192C] hover:border-[#2E2845] opacity-90 hover:opacity-100"
      } group`}
    >
      {/* Top Badge & Icon */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 border"
            style={{
              backgroundColor: `${path.accentColor}18`,
              borderColor: `${path.accentColor}40`,
            }}
          >
            <Icon size={28} style={{ color: path.accentColor }} />
          </div>

          {/* Status Badge */}
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Dashboard
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#94A3B8] bg-white/5 border border-white/10">
              <Clock size={12} className="text-[#64748B]" />
              In Development
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A855F7]">
            {path.subtitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 group-hover:text-[#F3E8FF] transition-colors">
            {path.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
          {path.description}
        </p>

        {/* Key Highlights / Topics */}
        <div className="space-y-2 mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Key Focus Areas
          </div>
          <div className="flex flex-wrap gap-2">
            {path.topics.map((topic) => (
              <span
                key={topic}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#141024] text-[#D8B4FE] border border-[#261E3F]"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-[#1C172C]">
        <Link
          href={path.href}
          className={`w-full py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            isLive
              ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] group-hover:scale-[1.01]"
              : "bg-[#141124] hover:bg-[#1E1933] text-[#94A3B8] hover:text-white border border-[#2B2342]"
          }`}
        >
          <span>{path.ctaText}</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
