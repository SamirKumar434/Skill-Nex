"use client";

import React, { useState, useMemo } from "react";
import {
  FolderGit2,
  Cpu,
  Code2,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  CheckSquare,
  Wrench,
  Milestone,
  ArrowLeft,
  Search,
  Check,
} from "lucide-react";
import { PROJECTS_DATA, ProjectItem, ProjectCategory } from "@/data/projects-data";

export const STORAGE_COMPLETED_PROJECTS_KEY = "skillnex_completed_projects";

interface ProjectsSectionViewProps {
  onBackToOverview?: () => void;
}

export function ProjectsSectionView({ onBackToOverview }: ProjectsSectionViewProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<
    "overview" | "milestones" | "requirements" | "testing" | "tech"
  >("overview");

  // Track completed projects in localStorage
  const [completedProjectIds, setCompletedProjectIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_COMPLETED_PROJECTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggleProjectCompletion = (
    projectId: string,
    e?: React.MouseEvent | React.ChangeEvent
  ) => {
    if (e && "stopPropagation" in e) {
      e.stopPropagation();
    }
    setCompletedProjectIds((prev) => {
      const next = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      try {
        localStorage.setItem(STORAGE_COMPLETED_PROJECTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Track checked milestone tasks in localStorage
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("skillnex_project_completed_tasks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => {
      const next = prev.includes(taskKey)
        ? prev.filter((k) => k !== taskKey)
        : [...prev, taskKey];
      try {
        localStorage.setItem("skillnex_project_completed_tasks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const codingCount = PROJECTS_DATA.filter((p) => p.category === "coding").length;
  const verilogCount = PROJECTS_DATA.filter((p) => p.category === "verilog").length;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                CAREER TRACK
              </span>
              <span className="text-xs text-[#94A3B8]">Engineering Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <FolderGit2 className="text-[#A855F7]" size={28} />
              <span>Project Showcase & Guides</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
              Step-by-step engineering projects designed to prove your competency in software and digital hardware.
              Build end-to-end applications and verified Verilog HDL modules.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            {/* Completion Counter Badge */}
            <div className="flex items-center gap-2 bg-[#120F24] border border-[#231E38] px-3 py-1.5 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-white font-bold">{completedProjectIds.length}</span>
                <span className="text-[#94A3B8]">/{PROJECTS_DATA.length} Completed</span>
              </div>
            </div>

            {onBackToOverview && (
              <button
                type="button"
                onClick={onBackToOverview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back to Overview</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Category Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-[#1C182B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              All Projects ({PROJECTS_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("coding")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5 ${
                activeCategory === "coding"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <Code2 size={13} />
              <span>C Programming Projects ({codingCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("verilog")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5 ${
                activeCategory === "verilog"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white/[0.04] text-[#94A3B8] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <Cpu size={13} />
              <span>Verilog HDL Projects ({verilogCount})</span>
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search projects or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0D1F] border border-[#231E35] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] pl-8.5 pr-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-[#8B5CF6]/40"
            />
          </div>
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          const isVerilog = project.category === "verilog";
          const CategoryIcon = isVerilog ? Cpu : Code2;
          const isProjectDone = completedProjectIds.includes(project.id);

          // Compute milestone completion
          const totalMilestoneTasks = project.developmentMilestones.reduce(
            (acc, m) => acc + m.tasks.length,
            0
          );
          const completedMilestoneTasks = project.developmentMilestones.reduce(
            (acc, m, mIdx) => {
              return (
                acc +
                m.tasks.filter((_, tIdx) =>
                  completedTasks.includes(`${project.id}-${mIdx}-${tIdx}`)
                ).length
              );
            },
            0
          );
          const progressPct =
            totalMilestoneTasks > 0
              ? Math.round((completedMilestoneTasks / totalMilestoneTasks) * 100)
              : 0;

          return (
            <div
              key={project.id}
              className={`bg-[#0B0914] border ${
                isProjectDone
                  ? "border-emerald-500/40 hover:border-emerald-500/60 shadow-sm shadow-emerald-500/5"
                  : "border-[#1C182B] hover:border-[#8B5CF6]/50"
              } rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group`}
            >
              <div>
                {/* Header: Category, Difficulty & Completion Checkbox */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#A855F7] bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/20">
                      <CategoryIcon size={12} />
                      <span>{project.categoryLabel}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        project.difficulty === "Easy"
                          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
                          : "text-amber-400 bg-amber-500/10 border-amber-500/25"
                      }`}
                    >
                      {project.difficulty.toUpperCase()}
                    </span>
                  </div>

                  {/* Project Completed Checkbox */}
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border cursor-pointer select-none transition-all ${
                      isProjectDone
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                        : "bg-white/[0.03] border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-[#8B5CF6]/40"
                    }`}
                    title={
                      isProjectDone
                        ? "Project completed! Click to mark incomplete"
                        : "Click to mark project as completed"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={isProjectDone}
                      onChange={(e) => toggleProjectCompletion(project.id, e)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                        isProjectDone
                          ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/50"
                          : "border border-[#64748B] hover:border-[#8B5CF6]"
                      }`}
                    >
                      {isProjectDone && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide">
                      {isProjectDone ? "Completed" : "Complete"}
                    </span>
                  </label>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#E9D5FF] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium text-[#94A3B8] bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Progress and CTA */}
              <div className="mt-5 pt-4 border-t border-[#181427] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-[#181428] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        isProjectDone ? "bg-emerald-500" : "bg-[#8B5CF6]"
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#64748B] font-mono">
                    {completedMilestoneTasks}/{totalMilestoneTasks} tasks
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveDetailTab("overview");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
                >
                  <span>View Project Guide</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-[#0B0914] border border-[#1C182B] rounded-xl">
          <FolderGit2 className="mx-auto text-[#64748B] mb-2" size={32} />
          <h3 className="text-sm font-semibold text-white">No projects found</h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            Try adjusting your search query or reset the category filter.
          </p>
        </div>
      )}

      {/* 4. Full Project Detail Modal / View */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0B0914] border border-[#231E35] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#1C182B] flex items-start justify-between gap-4 bg-[#0E0C1C] shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-[#A855F7] bg-[#8B5CF6]/15 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/30">
                    {selectedProject.categoryLabel}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      selectedProject.difficulty === "Easy"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
                        : "text-amber-400 bg-amber-500/10 border-amber-500/25"
                    }`}
                  >
                    {selectedProject.difficulty}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 line-clamp-1">
                  {selectedProject.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Modal Project Completion Checkbox */}
                <label
                  onClick={(e) => e.stopPropagation()}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer select-none transition-all ${
                    completedProjectIds.includes(selectedProject.id)
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-white/[0.04] border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-[#8B5CF6]/40"
                  }`}
                  title={
                    completedProjectIds.includes(selectedProject.id)
                      ? "Project completed! Click to mark incomplete"
                      : "Click to mark project as completed"
                  }
                >
                  <input
                    type="checkbox"
                    checked={completedProjectIds.includes(selectedProject.id)}
                    onChange={(e) => toggleProjectCompletion(selectedProject.id, e)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                      completedProjectIds.includes(selectedProject.id)
                        ? "bg-emerald-500 text-black shadow-sm shadow-emerald-500/50"
                        : "border border-[#64748B]"
                    }`}
                  >
                    {completedProjectIds.includes(selectedProject.id) && (
                      <Check size={12} strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-xs font-semibold">
                    {completedProjectIds.includes(selectedProject.id) ? "Completed" : "Complete"}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.08] transition-colors"
                  aria-label="Close project guide"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 sm:px-6 border-b border-[#1C182B] bg-[#090812] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              <button
                type="button"
                onClick={() => setActiveDetailTab("overview")}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeDetailTab === "overview"
                    ? "border-[#8B5CF6] text-white"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Overview & Why
              </button>
              <button
                type="button"
                onClick={() => setActiveDetailTab("milestones")}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeDetailTab === "milestones"
                    ? "border-[#8B5CF6] text-white"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Milestones & Steps ({selectedProject.developmentMilestones.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveDetailTab("requirements")}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeDetailTab === "requirements"
                    ? "border-[#8B5CF6] text-white"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Features & Requirements
              </button>
              <button
                type="button"
                onClick={() => setActiveDetailTab("tech")}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeDetailTab === "tech"
                    ? "border-[#8B5CF6] text-white"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Tech Stack & Tools
              </button>
              <button
                type="button"
                onClick={() => setActiveDetailTab("testing")}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeDetailTab === "testing"
                    ? "border-[#8B5CF6] text-white"
                    : "border-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                Testing Checklist
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#F8FAFC]">
              {activeDetailTab === "overview" && (
                <div className="space-y-6">
                  {/* Detailed Overview */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A855F7] mb-2">
                      Project Overview
                    </h4>
                    <p className="text-[#CBD5E1] leading-relaxed">
                      {selectedProject.overview}
                    </p>
                  </div>

                  {/* Why Students Should Build It */}
                  <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4 sm:p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} />
                      <span>Why Build This Project?</span>
                    </h4>
                    <p className="text-[#CBD5E1] leading-relaxed">
                      {selectedProject.whyBuild}
                    </p>
                  </div>

                  {/* Prerequisites & Objectives Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0A0914] border border-[#1C182B] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-white mb-2.5">
                        Prerequisites
                      </h4>
                      <ul className="space-y-2 text-xs text-[#94A3B8]">
                        {selectedProject.prerequisites.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#8B5CF6] mt-0.5">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#0A0914] border border-[#1C182B] rounded-xl p-4">
                      <h4 className="text-xs font-bold text-white mb-2.5">
                        What You Will Learn
                      </h4>
                      <ul className="space-y-2 text-xs text-[#94A3B8]">
                        {selectedProject.learningObjectives.map((o, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expected Deliverables */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A855F7] mb-2">
                      Expected Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.expectedDeliverables.map((deliv, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#CBD5E1] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]"
                        >
                          <BookOpen size={14} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeDetailTab === "milestones" && (
                <div className="space-y-5">
                  <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-3.5 text-xs text-[#94A3B8]">
                    Follow these step-by-step milestones to implement the project. Check off tasks as you finish them to track your build progress.
                  </div>

                  {selectedProject.developmentMilestones.map((milestone, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#0A0914] border border-[#1C182B] rounded-xl p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                          {milestone.step}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {milestone.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#94A3B8] mb-3">
                        {milestone.objective}
                      </p>

                      <div className="space-y-2 border-t border-[#1C182B] pt-3">
                        {milestone.tasks.map((task, tIdx) => {
                          const taskKey = `${selectedProject.id}-${mIdx}-${tIdx}`;
                          const isDone = completedTasks.includes(taskKey);

                          return (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={() => toggleTask(taskKey)}
                              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                                isDone
                                  ? "bg-emerald-500/[0.05] border-emerald-500/25 text-[#94A3B8]"
                                  : "bg-white/[0.02] border-white/[0.06] text-white hover:border-[#8B5CF6]/40"
                              }`}
                            >
                              <span className="mt-0.5 shrink-0 text-[#8B5CF6]">
                                {isDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-400" />
                                ) : (
                                  <Circle size={16} />
                                )}
                              </span>
                              <span className={`text-xs ${isDone ? "line-through text-[#64748B]" : ""}`}>
                                {task}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDetailTab === "requirements" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A855F7] mb-3">
                      Functional Features & Specifications
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedProject.featuresAndRequirements.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                        >
                          <CheckSquare size={15} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#CBD5E1] leading-relaxed">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedProject.optionalStretchGoals.length > 0 && (
                    <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4 sm:p-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                        <Sparkles size={14} />
                        <span>Optional Stretch Goals & Enhancements</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#CBD5E1]">
                        {selectedProject.optionalStretchGoals.map((goal, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">★</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeDetailTab === "tech" && (
                <div className="space-y-6">
                  {/* Suggested Core Stack */}
                  <div className="bg-[#0A0914] border border-[#1C182B] rounded-xl p-4 sm:p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                      <Wrench size={14} className="text-[#8B5CF6]" />
                      <span>Core Technologies</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.suggestedTechStack.core.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs font-medium text-white bg-[#8B5CF6]/15 border border-[#8B5CF6]/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification Tools (Simulator based) */}
                  <div className="bg-[#0A0914] border border-[#1C182B] rounded-xl p-4 sm:p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                      Development & Verification Tools
                    </h4>
                    <ul className="space-y-2 text-xs text-[#CBD5E1]">
                      {selectedProject.suggestedTechStack.tools.map((tool, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#8B5CF6]">•</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hardware Target (Strictly optional, no fabricated boards) */}
                  {selectedProject.suggestedTechStack.optionalHardware && (
                    <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Optional
                        </span>
                        <h4 className="text-xs font-bold text-white">
                          Physical Hardware Synthesis (Optional)
                        </h4>
                      </div>
                      <p className="text-xs text-[#94A3B8] mb-3">
                        Simulator-based verification with Icarus Verilog or EDA Playground is the complete default requirement for this project. Physical deployment onto FPGA hardware is strictly an optional bonus:
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                        {selectedProject.suggestedTechStack.optionalHardware.map((hw, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400">•</span>
                            <span>{hw}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeDetailTab === "testing" && (
                <div className="space-y-4">
                  <div className="bg-[#0F0D1F] border border-[#231E35] rounded-xl p-3.5 text-xs text-[#94A3B8]">
                    Verify that your implementation satisfies every item below before considering the project ready for your portfolio.
                  </div>

                  <div className="space-y-2.5">
                    {selectedProject.testingChecklist.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-[#CBD5E1] leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#1C182B] bg-[#0E0C1C] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#64748B]">
                SkillNex Guided Engineering Projects
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleProjectCompletion(selectedProject.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                    completedProjectIds.includes(selectedProject.id)
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                      : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-transparent"
                  }`}
                >
                  <Check size={13} strokeWidth={2.5} />
                  <span>
                    {completedProjectIds.includes(selectedProject.id)
                      ? "Project Completed (Undo)"
                      : "Mark as Completed"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
