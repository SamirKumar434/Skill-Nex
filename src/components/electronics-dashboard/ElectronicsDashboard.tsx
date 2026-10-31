"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowLeft, AlertCircle, X } from "lucide-react";
import { DashboardSidebar, DashboardTab } from "./DashboardSidebar";
import { DashboardHeader, BreadcrumbItem } from "./DashboardHeader";
import { OverviewSubjectsView } from "./OverviewSubjectsView";
import { ProgressOverview } from "./ProgressOverview";
import { LearningStageGrid } from "./LearningStageGrid";
import { OverviewTopicTable } from "./OverviewTopicTable";
import { RoadmapTopicTable } from "./RoadmapTopicTable";
import { ContinueLearning } from "./ContinueLearning";
import { PlaceholderNotice, PlaceholderType } from "./PlaceholderNotice";
import { ProjectsSectionView } from "./ProjectsSectionView";
import { DsaSectionView } from "./DsaSectionView";
import { ProblemsSectionView } from "./ProblemsSectionView";
import { ProfileSectionView } from "./ProfileSectionView";
import {
  CORE_ELECTRONICS_STAGES,
  LearningStage,
  isStageAdminOnly,
} from "@/data/electronics-roadmap";
import { useStudentProgress } from "@/components/progress/ProgressContext";

interface ElectronicsDashboardProps {
  initialTab?: DashboardTab;
  stages?: LearningStage[];
  isAdmin?: boolean;
}

export function ElectronicsDashboard({
  initialTab = "overview",
  stages = CORE_ELECTRONICS_STAGES,
  isAdmin = false,
}: ElectronicsDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stageFromUrl = searchParams.get("stage");
  const tabFromUrl = searchParams.get("tab") as DashboardTab | null;

  // Determine starting tab: URL param > initialTab prop > fallback
  const startingTab = tabFromUrl || initialTab;

  const [activeTab, setActiveTab] = useState<DashboardTab>(startingTab);
  const [returnTab, setReturnTab] = useState<DashboardTab>(startingTab);
  const [activeStageId, setActiveStageId] = useState<string | null>(stageFromUrl || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { completedTopicIds, toggleTopic, error, clearError } = useStudentProgress();

  // Auto-dismiss progress update error after 5 seconds to prevent stale messages
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      clearError();
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, clearError]);

  // Sync state with URL if params change
  useEffect(() => {
    if (stageFromUrl) {
      setActiveStageId(stageFromUrl);
    } else {
      setActiveStageId(null);
    }

    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
      setReturnTab(tabFromUrl);
    }
  }, [stageFromUrl, tabFromUrl]);

  const handleToggleTopic = useCallback((topicId: string) => {
    toggleTopic(topicId);
  }, [toggleTopic]);

  // Update stage selection with URL sync and origin tab tracking
  const handleSelectStage = useCallback(
    (stageId: string | null) => {
      // Prevent selecting admin-only stage if caller is not an admin
      if (stageId && isStageAdminOnly(stageId) && !isAdmin) {
        return;
      }

      if (stageId) {
        setReturnTab(activeTab);
        setActiveStageId(stageId);
      } else {
        setActiveStageId(null);
        setActiveTab(returnTab);
      }

      const params = new URLSearchParams(searchParams.toString());
      if (stageId) {
        params.set("stage", stageId);
        params.set("tab", activeTab);
      } else {
        params.delete("stage");
        if (returnTab === "overview") {
          params.delete("tab");
        } else {
          params.set("tab", returnTab);
        }
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [activeTab, returnTab, pathname, router, searchParams, isAdmin]
  );

  // Update tab selection with URL sync
  const handleSelectTab = useCallback(
    (tab: DashboardTab) => {
      setActiveTab(tab);
      setReturnTab(tab);
      setActiveStageId(null);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("stage");
      if (tab === "overview") {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Set of all valid topic IDs currently in the curriculum
  const allValidTopicIds = useMemo(() => {
    return new Set(stages.flatMap((stage) => stage.topics.map((t) => t.id)));
  }, [stages]);

  // Filter completedTopicIds to only count existing, valid topics (prevents duplicate counting)
  const validCompletedTopicCount = useMemo(() => {
    return completedTopicIds.filter((id) => allValidTopicIds.has(id)).length;
  }, [completedTopicIds, allValidTopicIds]);

  // Total topics count across all active stages
  const totalTopicsCount = useMemo(() => {
    return stages.reduce((acc, stage) => acc + stage.topics.length, 0);
  }, [stages]);

  // Determine current active learning stage (first stage with unfinished topics)
  const currentStage = useMemo(() => {
    for (const stage of stages) {
      const isStageComplete =
        stage.topics.length > 0 &&
        stage.topics.every((t) => completedTopicIds.includes(t.id));
      if (!isStageComplete) {
        return stage;
      }
    }
    return stages[stages.length - 1] || stages[0];
  }, [completedTopicIds, stages]);

  // Overall roadmap progress percentage (starts at 0% for new student)
  const overallProgressPercentage = useMemo(() => {
    if (totalTopicsCount === 0) return 0;
    return Math.round((validCompletedTopicCount / totalTopicsCount) * 100);
  }, [validCompletedTopicCount, totalTopicsCount]);

  // Filter stages based on search query
  const filteredStages = useMemo(() => {
    if (!searchQuery.trim()) return stages;
    const q = searchQuery.toLowerCase();
    return stages.filter(
      (stage) =>
        stage.title.toLowerCase().includes(q) ||
        stage.target.toLowerCase().includes(q) ||
        stage.topics.some((topic) => topic.title.toLowerCase().includes(q))
    );
  }, [searchQuery, stages]);

  // Find currently opened stage for the table view
  const currentOpenStage = useMemo(() => {
    if (!activeStageId) return null;
    return stages.find((s) => s.id === activeStageId) || null;
  }, [activeStageId, stages]);

  // Build breadcrumb items based on current view
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      {
        label: "Overview",
        onClick: () => {
          handleSelectStage(null);
          handleSelectTab("overview");
        },
      },
    ];

    if (activeStageId && currentOpenStage) {
      if (returnTab === "roadmap") {
        items.push({
          label: "My Roadmap",
          onClick: () => handleSelectStage(null),
        });
      }
      items.push({
        label: currentOpenStage.title,
        active: true,
      });
    } else if (activeTab === "roadmap") {
      items.push({
        label: "My Roadmap",
        active: true,
      });
    } else if (activeTab !== "overview") {
      const tabNames: Record<DashboardTab, string> = {
        overview: "Overview",
        roadmap: "My Roadmap",
        problems: "Problems",
        revision: "Revision",
        resources: "Resources",
        projects: "Projects",
        dsa: "DSA",
        interview: "Interview Preparation",
        settings: "Settings",
        profile: "Profile",
        it: "IT & Software Development",
      };
      items.push({
        label: tabNames[activeTab] || activeTab,
        active: true,
      });
    }

    return items;
  }, [activeStageId, currentOpenStage, activeTab, returnTab, handleSelectStage, handleSelectTab]);

  return (
    <div className="min-h-screen bg-[#07060D] text-[#F8FAFC] flex selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* 1. Single Application Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* 2. Main Content Area occupying all remaining horizontal space */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Compact Top Bar */}
        <DashboardHeader
          breadcrumbs={breadcrumbItems}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {/* A. Detailed Stage View: OverviewTopicTable for Overview, RoadmapTopicTable for Roadmap */}
          {currentOpenStage && (!isStageAdminOnly(currentOpenStage.id) || isAdmin) ? (
            returnTab === "overview" ? (
              <OverviewTopicTable
                stage={currentOpenStage}
                completedTopicIds={completedTopicIds}
                onBackToOverview={() => handleSelectStage(null)}
              />
            ) : (
              <RoadmapTopicTable
                stage={currentOpenStage}
                completedTopicIds={completedTopicIds}
                onToggleTopic={handleToggleTopic}
                onBackToRoadmap={() => handleSelectStage(null)}
              />
            )
          ) : activeTab === "overview" ? (
            /* B. Overview: Subject Cards (4 for students/guests, 5 for admin) */
            <OverviewSubjectsView
              completedTopicIds={completedTopicIds}
              onSelectSubject={(stageId) => handleSelectStage(stageId)}
              onOpenRoadmap={() => handleSelectTab("roadmap")}
              isAdmin={isAdmin}
            />
          ) : activeTab === "roadmap" ? (
            /* C. My Roadmap: Full Core Electronics Roadmap (3 Summary Cards + Stage Cards + Continue Learning) */
            <>
              {/* Roadmap Header */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                      ECE Track
                    </span>
                    <span className="text-xs text-[#94A3B8]">Core Electronics Path</span>
                    {isAdmin && (
                      <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        Admin Preview: Verilog HDL Enabled
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Core Electronics Roadmap
                  </h1>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                    Master programming fundamentals, engineering tools, and circuit analysis across {stages.length} structured stages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectTab("overview")}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Back to Overview</span>
                </button>
              </div>

              {/* Progress Summary (3 cards) */}
              <ProgressOverview
                overallProgressPercentage={overallProgressPercentage}
                currentStageTitle={currentStage.title}
                currentStageOrder={currentStage.order}
                completedTopicsCount={validCompletedTopicCount}
                totalTopicsCount={totalTopicsCount}
              />

              {/* Learning Roadmap Grid (4 primary stages in 2-column grid) */}
              <LearningStageGrid
                stages={filteredStages}
                completedTopicIds={completedTopicIds}
                onSelectStage={handleSelectStage}
                searchQuery={searchQuery}
              />

              {/* Continue Learning Prompt */}
              <ContinueLearning
                completedTopicIds={completedTopicIds}
                onSelectStage={handleSelectStage}
              />
            </>
          ) : activeTab === "problems" ? (
            /* D. Hardware & Logic Problems Section */
            <ProblemsSectionView
              onBackToOverview={() => handleSelectTab("overview")}
            />
          ) : activeTab === "projects" ? (
            /* D. Projects Section under Career */
            <ProjectsSectionView
              onBackToOverview={() => handleSelectTab("overview")}
            />
          ) : activeTab === "dsa" ? (
            /* E. DSA Section under Career */
            <DsaSectionView
              onBackToOverview={() => handleSelectTab("overview")}
            />
          ) : activeTab === "profile" ? (
            /* F. Profile & LeetCode-Style Activity Heatmap */
            <ProfileSectionView
              onBackToOverview={() => handleSelectTab("overview")}
            />
          ) : (
            /* G. Placeholder Pages for upcoming features */
            <PlaceholderNotice
              type={activeTab as PlaceholderType}
              onBackToOverview={() => handleSelectTab("overview")}
            />
          )}
        </main>
      </div>

      {/* Non-intrusive progress failure toast notification */}
      {error && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md bg-[#130F23] border border-red-500/30 text-white rounded-xl p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <AlertCircle size={17} className="text-red-400 shrink-0" />
            <p className="text-xs sm:text-sm text-[#F1F5F9] leading-snug truncate sm:whitespace-normal">
              {error}
            </p>
          </div>
          <button
            type="button"
            onClick={clearError}
            aria-label="Dismiss error"
            className="p-1 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
