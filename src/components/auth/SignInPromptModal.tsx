"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Lock, Sparkles, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { SignIn, SignUp, useAuth } from "@clerk/nextjs";

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  initialMode?: "prompt" | "signIn" | "signUp";
}

export function SignInPromptModal({
  isOpen,
  onClose,
  title = "Sign In to Save Progress",
  description = "SkillNex saves your roadmap completion, DSA practice, and problem statuses securely to your personal account so you can pick up where you left off from any device.",
  initialMode = "prompt",
}: SignInPromptModalProps) {
  const { isSignedIn } = useAuth();
  const [authView, setAuthView] = useState<"prompt" | "auth">(
    initialMode === "prompt" ? "prompt" : "auth"
  );
  const [authMode, setAuthMode] = useState<"signIn" | "signUp">(
    initialMode === "signUp" ? "signUp" : "signIn"
  );

  // Sync state when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setAuthView(initialMode === "prompt" ? "prompt" : "auth");
      setAuthMode(initialMode === "signUp" ? "signUp" : "signIn");
    }
  }, [isOpen, initialMode]);

  // Close popup automatically once user signs in successfully
  useEffect(() => {
    if (isSignedIn && isOpen) {
      onClose();
    }
  }, [isSignedIn, isOpen, onClose]);

  // Handle ESC key press to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Intercept Clerk internal sign-in / sign-up switch links so they stay within popup
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("a");
    if (target) {
      const href = target.getAttribute("href") || "";
      if (href.includes("sign-up") || href.includes("signup")) {
        e.preventDefault();
        e.stopPropagation();
        setAuthMode("signUp");
      } else if (href.includes("sign-in") || href.includes("signin")) {
        e.preventDefault();
        e.stopPropagation();
        setAuthMode("signIn");
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          authView === "auth" ? "max-w-[440px]" : "max-w-md"
        } max-h-[92vh] overflow-y-auto scrollbar-hide bg-[#0D0B18] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-[0_0_50px_rgba(139,92,246,0.2)] transition-all`}
        onClick={(e) => {
          e.stopPropagation();
          handleContainerClick(e);
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] cursor-pointer"
          aria-label="Close sign in dialog"
        >
          <X size={18} />
        </button>

        {authView === "prompt" ? (
          /* ========================================= */
          /* View 1: Prompt & Benefits Overview        */
          /* ========================================= */
          <div>
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
              <button
                type="button"
                onClick={() => setAuthView("auth")}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] cursor-pointer"
              >
                Sign In / Sign Up
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-gray-400 hover:text-white bg-transparent hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* ========================================= */
          /* View 2: In-Popup Clerk Authentication     */
          /* ========================================= */
          <div>
            {/* Top Navigation Row: Back Button & Branding */}
            <div className="flex items-center justify-between mb-4 pr-8">
              <button
                type="button"
                onClick={() => setAuthView("prompt")}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                aria-label="Back to prompt overview"
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A855F7] font-mono text-xs font-bold">
                  {"<>"}
                </div>
                <span className="text-sm font-bold text-white tracking-tight">
                  Skill<span className="text-[#A855F7]">Nex</span>
                </span>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 bg-[#161326] rounded-xl border border-white/10 mb-4">
              <button
                type="button"
                onClick={() => setAuthMode("signIn")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  authMode === "signIn"
                    ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signUp")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  authMode === "signUp"
                    ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Embedded Clerk Component */}
            <div className="w-full flex justify-center">
              {authMode === "signIn" ? (
                <SignIn
                  routing="hash"
                  signUpUrl="#sign-up"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      cardBox: "w-full shadow-none border-0",
                      card: "w-full bg-transparent border-0 shadow-none p-0",
                      headerTitle: "text-white text-base sm:text-lg font-bold text-center",
                      headerSubtitle: "text-[#94A3B8] text-xs text-center",
                      formButtonPrimary:
                        "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]",
                      socialButtonsBlockButton:
                        "bg-[#161326] hover:bg-[#201C38] border border-white/10 text-white transition-all",
                      socialButtonsBlockButtonText: "text-white font-medium text-xs",
                      dividerLine: "bg-white/10",
                      dividerText: "text-gray-400 text-xs",
                      formFieldLabel: "text-gray-300 text-xs",
                      formFieldInput:
                        "bg-[#161326] border-white/10 text-white focus:border-[#8B5CF6] text-xs sm:text-sm",
                      footerActionLink: "text-[#A855F7] hover:text-[#C084FC] text-xs",
                      footer: "bg-transparent border-t border-white/5",
                    },
                  }}
                />
              ) : (
                <SignUp
                  routing="hash"
                  signInUrl="#sign-in"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      cardBox: "w-full shadow-none border-0",
                      card: "w-full bg-transparent border-0 shadow-none p-0",
                      headerTitle: "text-white text-base sm:text-lg font-bold text-center",
                      headerSubtitle: "text-[#94A3B8] text-xs text-center",
                      formButtonPrimary:
                        "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]",
                      socialButtonsBlockButton:
                        "bg-[#161326] hover:bg-[#201C38] border border-white/10 text-white transition-all",
                      socialButtonsBlockButtonText: "text-white font-medium text-xs",
                      dividerLine: "bg-white/10",
                      dividerText: "text-gray-400 text-xs",
                      formFieldLabel: "text-gray-300 text-xs",
                      formFieldInput:
                        "bg-[#161326] border-white/10 text-white focus:border-[#8B5CF6] text-xs sm:text-sm",
                      footerActionLink: "text-[#A855F7] hover:text-[#C084FC] text-xs",
                      footer: "bg-transparent border-t border-white/5",
                    },
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
