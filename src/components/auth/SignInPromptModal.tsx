"use client";

import React from "react";
import Link from "next/link";
import { Lock, Sparkles, X, CheckCircle2 } from "lucide-react";

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function SignInPromptModal({
  isOpen,
  onClose,
  title = "Sign In to Save Progress",
  description = "SkillNex saves your roadmap completion, DSA practice, and problem statuses securely to your personal account so you can pick up where you left off from any device.",
}: SignInPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md bg-[#0D0B18] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          aria-label="Close sign in dialog"
        >
          <X size={18} />
        </button>

        {/* Icon & Heading */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] shadow-inner">
            <Lock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A855F7]">
              <Sparkles size={12} />
              <span>SkillNex Account</span>
            </div>
            <h2 id="signin-modal-title" className="text-lg font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5">
          {description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-2 mb-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>Persistent cloud tracking across laptop & mobile</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>Accurate placement readiness percentage metrics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>Completely free for students & graduates</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <Link
            href="/sign-in"
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
          >
            Sign In / Sign Up
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white bg-transparent hover:bg-white/5 border border-white/10 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
