"use client";

import { useState } from "react";
import { Check, Map, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapNode {
  id: string;
  title: string;
  badge: string;
  tags: string[];
  status: "completed" | "active" | "locked";
  countText: string;
  description: string;
  keyLabel?: string;
  keyTopics?: string[];
}

const roadmapNodes: RoadmapNode[] = [
  {
    id: "01-foundations",
    title: "01. PROGRAMMING FOUNDATIONS",
    badge: "START HERE",
    tags: ["#C_PROGRAMMING", "#C++_BASICS", "#PROBLEM_SOLVING"],
    status: "completed",
    countText: "24 questions",
    description:
      "Build your programming foundation with variables, loops, functions, arrays, pointers, memory concepts, and basic problem-solving.",
  },
  {
    id: "02-dsa",
    title: "02. DSA & PROBLEM-SOLVING",
    badge: "IN PROGRESS",
    tags: ["#ARRAYS", "#HASHING", "#LINKED_LISTS", "#STACKS_QUEUES"],
    status: "active",
    countText: "38 questions",
    description:
      "Develop the problem-solving skills needed for software placements through structured DSA topics, recognizable patterns, and consistent coding practice.",
    keyLabel: "Key Patterns:",
    keyTopics: [
      "Two Pointers",
      "Sliding Window",
      "Fast & Slow Pointers",
      "Binary Search",
      "Stack & Queue Patterns",
    ],
  },
  {
    id: "03-core-electronics",
    title: "03. CORE ELECTRONICS",
    badge: "CORE FUNDAMENTALS",
    tags: ["#DIGITAL_ELECTRONICS", "#ANALOG_CIRCUITS", "#ELECTRONIC_DEVICES"],
    status: "locked",
    countText: "45 topics",
    description:
      "Strengthen your ECE fundamentals with digital logic, semiconductor devices, analog circuits, Boolean algebra, and essential circuit analysis for core electronics interviews.",
    keyLabel: "Key Topics:",
    keyTopics: [
      "Logic Gates",
      "Flip-Flops",
      "Diodes & Transistors",
      "Op-Amps",
      "Number Systems",
    ],
  },
  {
    id: "04-communication-embedded",
    title: "04. COMMUNICATION & EMBEDDED SYSTEMS",
    badge: "TECHNICAL SPECIALIZATION",
    tags: ["#SIGNALS_SYSTEMS", "#COMMUNICATION_SYSTEMS", "#MICROCONTROLLERS"],
    status: "locked",
    countText: "32 topics",
    description:
      "Explore the concepts behind modern electronics, wireless communication, and embedded devices while building a foundation for specialized ECE roles.",
    keyLabel: "Key Topics:",
    keyTopics: [
      "Signals & Systems",
      "Analog & Digital Communication",
      "Microprocessors",
      "Microcontrollers",
      "Embedded C",
    ],
  },
  {
    id: "05-projects-placement",
    title: "05. PROJECTS, GITHUB & PLACEMENT PREPARATION",
    badge: "BUILD YOUR PROFILE",
    tags: ["#GIT_GITHUB", "#TECHNICAL_PROJECTS", "#APTITUDE", "#MOCK_INTERVIEWS"],
    status: "locked",
    countText: "16 milestones",
    description:
      "Turn your knowledge into proof of skills. Build practical projects, learn Git and GitHub, strengthen aptitude, revise technical fundamentals, and prepare for software or core electronics interviews.",
    keyLabel: "Key Milestones:",
    keyTopics: [
      "Git & GitHub",
      "ECE Mini Project",
      "Coding Project",
      "Resume & Portfolio",
      "Aptitude Practice",
      "Technical Mock Interviews",
    ],
  },
];

export function LearningRoadmapSection() {
  const [selectedId, setSelectedId] = useState<string>("02-dsa");

  return (
    <section id="roadmap" className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-28">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#8B5CF6]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1020px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching Image 1 */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC] tracking-tight uppercase">
            LEARNING{" "}
            <span className="text-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,0.45)]">
              ROADMAP
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#94A3B8] uppercase">
            MASTER PATTERNS THROUGH DELIBERATE PRACTICE
          </p>
        </div>

        {/* Stacked Vertical Timeline */}
        <div className="relative space-y-4">
          {roadmapNodes.map((node, index) => {
            const isCompleted = node.status === "completed";
            const isActive = node.status === "active";
            const isSelected = selectedId === node.id;

            return (
              <div key={node.id} className="relative">
                {/* Vertical connecting line between cards */}
                {index < roadmapNodes.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-9 sm:left-10 top-16 bottom-[-16px] w-[2px] z-0 transition-colors duration-300",
                      isCompleted ? "bg-[#10B981]/50" : isActive ? "bg-[#8B5CF6]/60" : "bg-[#1E1B2E]"
                    )}
                  />
                )}

                {/* Card Item */}
                <div
                  onClick={() => setSelectedId(node.id)}
                  className={cn(
                    "relative z-10 cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 flex items-center justify-between gap-4",
                    isActive
                      ? "bg-[#0E0C18] border-2 border-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.35)] scale-[1.01]"
                      : isSelected
                      ? "bg-[#0E0C18] border border-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                      : "bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/40 hover:bg-[#0D0B16]"
                  )}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Status Icon Box */}
                    <div
                      className={cn(
                        "w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                        isCompleted
                          ? "bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981]"
                          : isActive
                          ? "bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.7)]"
                          : "bg-[#151222] border border-[#231E33] text-[#64748B]"
                      )}
                    >
                      {isCompleted ? (
                        <Check size={20} className="stroke-[3]" />
                      ) : isActive ? (
                        <Map size={20} className="stroke-[2.2]" />
                      ) : (
                        <Lock size={18} />
                      )}
                    </div>

                    {/* Node Text & Tags */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={cn(
                            "text-sm sm:text-base font-extrabold tracking-wide uppercase",
                            isActive ? "text-white" : isCompleted ? "text-[#F8FAFC]" : "text-[#CBD5E1]"
                          )}
                        >
                          {node.title}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border",
                            isActive
                              ? "bg-[#8B5CF6]/20 text-[#C084FC] border-[#8B5CF6]/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                              : isCompleted
                              ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                              : "bg-[#1E1B2E] text-[#94A3B8] border-[#2D2744]"
                          )}
                        >
                          {node.badge}
                        </span>
                      </div>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {node.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "text-[11px] sm:text-xs font-mono font-medium",
                              isActive
                                ? "text-[#A855F7]"
                                : isCompleted
                                ? "text-[#10B981]/80"
                                : "text-[#64748B]"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side arrow and questions/milestones count */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs text-[#94A3B8] font-mono">
                      {node.countText}
                    </span>
                    <ChevronRight
                      size={20}
                      className={cn(
                        "transition-transform",
                        isActive ? "text-[#A855F7] translate-x-1" : "text-[#475569]"
                      )}
                    />
                  </div>
                </div>

                {/* Expanded Details Drawer if Selected */}
                {isSelected && (
                  <div className="mt-2 ml-14 sm:ml-16 mr-2 bg-[#0C0A15] border border-[#8B5CF6]/30 rounded-xl p-4 sm:p-5 text-sm text-[#94A3B8] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
                      {node.description}
                    </p>
                    {node.keyTopics && node.keyTopics.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-semibold text-[#C084FC] uppercase tracking-wider">
                          {node.keyLabel || "Key Topics:"}
                        </span>
                        {node.keyTopics.map((topic) => (
                          <span
                            key={topic}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-[#181428] text-[#E2E8F0] border border-[#2D2744]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

