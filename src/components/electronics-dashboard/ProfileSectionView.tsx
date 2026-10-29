"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowLeft,
  User as UserIcon,
  Map,
  Code2,
  Binary,
  Flame,
  Zap,
  Calendar,
  AlertCircle,
  RefreshCw,
  LogIn,
  CheckCircle,
} from "lucide-react";
import { getUserProfileDataAction, type UserProfileResponse } from "@/actions/profile";
import { ActivityHeatmap } from "./ActivityHeatmap";

interface ProfileSectionViewProps {
  onBackToOverview: () => void;
}

function getInitials(name: string | null): string {
  if (!name) return "S";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "S";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ProfileSectionView({ onBackToOverview }: ProfileSectionViewProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);

  const loadProfile = useCallback(async () => {
    if (!isSignedIn) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getUserProfileDataAction();
      if (res.success && res.data) {
        setProfileData(res.data);
      } else {
        setError(res.error || "Failed to load profile data.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error connecting to server.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      loadProfile();
    }
  }, [isLoaded, loadProfile]);

  const formatMemberSince = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  // 1. Loading Skeleton State
  if (!isLoaded || isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-white/5 rounded-md" />
            <div className="h-4 w-64 bg-white/5 rounded-md" />
          </div>
          <div className="h-8 w-28 bg-white/5 rounded-lg" />
        </div>

        {/* User Card Skeleton */}
        <div className="h-32 bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-6" />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#0D0B18] border border-[#1C182B] rounded-2xl" />
          ))}
        </div>

        {/* Heatmap Skeleton */}
        <div className="h-64 bg-[#0D0B18] border border-[#1C182B] rounded-2xl" />
      </div>
    );
  }

  // 2. Guest / Unauthenticated State
  if (!isSignedIn) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToOverview}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </button>
        </div>

        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] mx-auto mb-4">
            <UserIcon size={26} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Student Profile & Activity Streaks
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
            Sign in to SkillNex to track your verified progress across Core Electronics roadmap topics, DSA questions, HDLBits hardware logic practice, and view your daily LeetCode-style activity streak heatmap.
          </p>

          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            <LogIn size={15} />
            <span>Sign In to View Profile</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Error State
  if (error || !profileData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToOverview}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Overview</span>
          </button>
        </div>

        <div className="bg-[#140F1E] border border-red-500/30 rounded-2xl p-6 text-center max-w-md mx-auto">
          <AlertCircle size={28} className="text-red-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white mb-1">
            Unable to load profile data
          </h3>
          <p className="text-xs text-[#94A3B8] mb-4">
            {error || "An unexpected error occurred while loading your profile."}
          </p>
          <button
            type="button"
            onClick={loadProfile}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-medium transition-colors"
          >
            <RefreshCw size={13} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const { user, stats, activity } = profileData;

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumb Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              Student Profile
            </span>
            <span className="text-xs text-[#94A3B8]">Verified Learning Portfolio</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Account & Activity Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Track your milestone completions, curriculum progress metrics, and daily learning consistency.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToOverview}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* 2. User Info Hero Card */}
      <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.36)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4 min-w-0">
          {/* Avatar with Glow */}
          <div className="relative shrink-0">
            {user.avatarUrl && !avatarError ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B5CF6]/40 shadow-[0_0_16px_rgba(139,92,246,0.25)]">
                {/* Standard HTML img element to avoid next/image hostname validation errors for Clerk CDN */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  alt={user.fullName || "Student Avatar"}
                  width={64}
                  height={64}
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-full bg-[#8B5CF6]/20 border-2 border-[#8B5CF6]/40 flex items-center justify-center text-xl font-bold text-[#A855F7] shadow-[0_0_16px_rgba(139,92,246,0.25)] select-none"
                aria-label={user.fullName || "Student Avatar"}
              >
                {getInitials(user.fullName)}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {user.fullName || "SkillNex Student"}
            </h2>
            <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C084FC] px-2 py-0.5 rounded-md bg-[#8B5CF6]/15 border border-[#8B5CF6]/30">
                <Zap size={11} />
                <span>{user.selectedTrack}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] text-[#64748B]">
                <Calendar size={11} />
                <span>Member since {formatMemberSince(user.createdAt)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Sync Status */}
        <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
          <CheckCircle size={13} />
          <span>Cloud Sync Active</span>
        </div>
      </div>

      {/* 3. Learning Statistics Grid (4 Key Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Roadmap Completion */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div>
            <div className="flex items-center justify-between text-[#94A3B8] mb-2">
              <span className="text-xs font-medium">Roadmap Topics</span>
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7]">
                <Map size={14} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats.completedTopicsCount}{" "}
              <span className="text-xs font-normal text-[#64748B]">
                / {stats.totalTopicsCount}
              </span>
            </div>
            <div className="text-xs text-[#A855F7] font-medium mt-0.5">
              {stats.roadmapPercentage}% complete
            </div>
          </div>

          <div className="w-full bg-[#1A162B] rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(stats.roadmapPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Card 2: DSA Practice */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div>
            <div className="flex items-center justify-between text-[#94A3B8] mb-2">
              <span className="text-xs font-medium">DSA Practice</span>
              <div className="w-7 h-7 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <Code2 size={14} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats.completedDsaCount}{" "}
              <span className="text-xs font-normal text-[#64748B]">
                / {stats.totalDsaCount}
              </span>
            </div>
            <div className="text-xs text-[#38BDF8] font-medium mt-0.5">
              Problems solved
            </div>
          </div>

          <div className="w-full bg-[#1A162B] rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#38BDF8] to-[#0284C7] h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  stats.totalDsaCount > 0
                    ? Math.round((stats.completedDsaCount / stats.totalDsaCount) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Card 3: HDLBits Problems */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div>
            <div className="flex items-center justify-between text-[#94A3B8] mb-2">
              <span className="text-xs font-medium">Hardware Logic</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Binary size={14} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats.completedHdlCount}{" "}
              <span className="text-xs font-normal text-[#64748B]">
                / {stats.totalHdlCount}
              </span>
            </div>
            <div className="text-xs text-emerald-400 font-medium mt-0.5">
              HDLBits problems verified
            </div>
          </div>

          <div className="w-full bg-[#1A162B] rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  stats.totalHdlCount > 0
                    ? Math.round((stats.completedHdlCount / stats.totalHdlCount) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Card 4: Daily Activity Streak */}
        <div className="bg-[#0D0B18] border border-[#1C182B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div>
            <div className="flex items-center justify-between text-[#94A3B8] mb-2">
              <span className="text-xs font-medium">Activity Streak</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame size={14} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats.currentStreak}{" "}
              <span className="text-xs font-normal text-[#64748B]">
                {stats.currentStreak === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="text-xs text-amber-400 font-medium mt-0.5">
              Longest: {stats.longestStreak} {stats.longestStreak === 1 ? "day" : "days"}
            </div>
          </div>

          <div className="text-[11px] text-[#64748B] mt-3 flex items-center justify-between">
            <span>Total Active Days</span>
            <span className="font-semibold text-white">{stats.totalActiveDays}</span>
          </div>
        </div>
      </div>

      {/* 4. LeetCode-Style Activity Heatmap */}
      <ActivityHeatmap activity={activity} />
    </div>
  );
}
