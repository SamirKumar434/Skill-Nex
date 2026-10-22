"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
} from "lucide-react";
import { TopicDocumentation } from "@/data/docs/types";
import {
  getCompletedTopicIds,
  toggleTopicCompletion,
} from "@/data/electronics-roadmap";

interface TopicDocumentationViewProps {
  doc: TopicDocumentation;
  prevDoc?: { id: string; title: string; serial: string };
  nextDoc?: { id: string; title: string; serial: string };
}

export function TopicDocumentationView({
  doc,
  prevDoc,
  nextDoc,
}: TopicDocumentationViewProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const completed = getCompletedTopicIds();
    setIsCompleted(completed.includes(doc.id));
  }, [doc.id]);

  const handleToggleCompletion = () => {
    const updated = toggleTopicCompletion(doc.id);
    setIsCompleted(updated.includes(doc.id));
  };

  const handleCopyCode = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="min-h-screen bg-[#07060D] text-[#F8FAFC]">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-30 bg-[#0B0914]/90 backdrop-blur-md border-b border-[#1C182B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] truncate">
            <Link
              href="/dashboard/electronics?tab=overview"
              className="hover:text-white transition-colors shrink-0"
            >
              SkillNex
            </Link>
            <span className="text-[#475569]">/</span>
            <Link
              href="/dashboard/electronics?tab=roadmap"
              className="hover:text-white transition-colors shrink-0"
            >
              Roadmap
            </Link>
            <span className="text-[#475569]">/</span>
            <Link
              href={`/dashboard/electronics?tab=roadmap&stage=${doc.stageId}`}
              className="text-[#8B5CF6] hover:text-[#C084FC] transition-colors truncate"
            >
              {doc.stageTitle}
            </Link>
            <span className="text-[#475569] hidden sm:inline">/</span>
            <span className="text-[#CBD5E1] truncate hidden sm:inline font-mono">
              {doc.serial}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleCompletion}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isCompleted
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-[#181329] text-[#94A3B8] border-[#29223D] hover:text-white hover:border-[#8B5CF6]"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span className="hidden sm:inline">Completed</span>
                </>
              ) : (
                <>
                  <Circle size={14} />
                  <span className="hidden sm:inline">Mark Mastered</span>
                </>
              )}
            </button>

            <Link
              href={`/dashboard/electronics?tab=roadmap&stage=${doc.stageId}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#CBD5E1] bg-[#161224] hover:bg-[#1F1934] border border-[#26203D] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Topics</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Documentation Reader Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Article Header */}
        <div className="mb-10 pb-8 border-b border-[#1C182B]">
          <div className="flex items-center gap-2.5 flex-wrap mb-3">
            <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2.5 py-1 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              TOPIC {doc.serial}
            </span>
            <span className="text-xs font-medium text-[#94A3B8] bg-[#141024] px-2.5 py-1 rounded border border-[#211B38]">
              {doc.stageTitle}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#64748B] ml-auto">
              <Clock size={13} />
              <span>{doc.readTimeMinutes} min read</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {doc.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Essential educational documentation prepared for second-year electronics &amp; computer engineering students.
          </p>
        </div>

        {/* SECTION 1: WHY ARE WE STUDYING THIS? (MANDATORY REQUIREMENT) */}
        <section id="why" className="mb-10 scroll-mt-20">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#8B5CF6]/15 via-[#130E26] to-[#0D0B1A] border border-[#8B5CF6]/30 p-6 sm:p-7 shadow-lg shadow-[#8B5CF6]/5">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#C084FC] mb-3">
              <Sparkles size={16} className="text-[#A855F7]" />
              <span>1. Why Are We Studying This Topic?</span>
            </div>
            <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed font-normal">
              {doc.why}
            </p>
          </div>
        </section>

        {/* SECTION 2: WHAT IS THE NEED FOR IT? */}
        <section id="need" className="mb-10 scroll-mt-20">
          <div className="rounded-2xl bg-[#0F0D1E] border border-[#282142] p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#38BDF8] mb-3">
              <Lightbulb size={16} className="text-[#38BDF8]" />
              <span>2. What Is the Need for It? (Problem Solved)</span>
            </div>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              {doc.need}
            </p>
          </div>
        </section>

        {/* SECTION 3: WHAT YOU WILL LEARN & PREREQUISITES */}
        <section id="learning-goals" className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 rounded-xl bg-[#0B0914] border border-[#1C182B] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              <BookOpen size={14} className="text-[#8B5CF6]" />
              <span>3. What Will You Learn?</span>
            </div>
            <ul className="space-y-2">
              {doc.whatYouWillLearn.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#CBD5E1]">
                  <span className="text-[#8B5CF6] font-bold mt-0.5">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#0B0914] border border-[#1C182B] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
              <Layers size={14} className="text-[#38BDF8]" />
              <span>Prerequisites</span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {doc.prerequisites}
            </p>
          </div>
        </section>

        {/* SECTION 4: UNDERSTAND THE CONCEPT */}
        <section id="concept" className="mb-12 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-5 rounded bg-[#8B5CF6]" />
            <span>4. Understand the Concept</span>
          </h2>
          <div className="rounded-2xl bg-[#0B0914] border border-[#1C182B] p-6 sm:p-8 space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            {doc.conceptExplanation.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-base sm:text-lg font-bold text-white pt-3 border-t border-[#1C182B]/60 first:border-0 first:pt-0">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("- ") || para.startsWith("1. ")) {
                return (
                  <div key={i} className="pl-4 border-l-2 border-[#8B5CF6]/40 space-y-1.5 my-2">
                    {para.split("\n").map((line, li) => (
                      <p key={li} className="text-xs sm:text-sm text-[#CBD5E1]">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              if (para.startsWith("|")) {
                // Render table markdown
                const rows = para.trim().split("\n");
                const headers = rows[0].split("|").filter(Boolean).map(h => h.trim());
                const dataRows = rows.slice(2).map(r => r.split("|").filter(Boolean).map(c => c.trim()));

                return (
                  <div key={i} className="overflow-x-auto my-4 rounded-lg border border-[#211B38]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#120F24] text-[#94A3B8] border-b border-[#211B38]">
                        <tr>
                          {headers.map((h, hi) => (
                            <th key={hi} className="py-2.5 px-3 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A162F]">
                        {dataRows.map((dr, ri) => (
                          <tr key={ri} className="hover:bg-white/[0.02]">
                            {dr.map((c, ci) => (
                              <td key={ci} className="py-2 px-3 text-[#CBD5E1]">{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return (
                <p key={i}>
                  {para}
                </p>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: HOW DOES IT WORK? */}
        <section id="how-it-works" className="mb-12 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-5 rounded bg-[#38BDF8]" />
            <span>5. How Does It Work? (Step-by-Step Breakdown)</span>
          </h2>
          <div className="grid grid-cols-1 gap-3.5">
            {doc.howItWorks.map((hw, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0B0914] border border-[#1C182B] p-5 flex items-start gap-4 hover:border-[#2D264A] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-[#C084FC]">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {hw.step}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {hw.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: PRACTICAL EXAMPLE */}
        <section id="example" className="mb-12 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-5 rounded bg-emerald-400" />
            <span>6. Practical Example &amp; Implementation</span>
          </h2>
          <div className="rounded-2xl bg-[#0B0914] border border-[#1C182B] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#1C182B] bg-[#0E0C1C]">
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                {doc.practicalExample.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {doc.practicalExample.description}
              </p>
            </div>

            {/* Code / Spec block */}
            {doc.practicalExample.codeOrSpec && (
              <div className="relative bg-[#06040A] p-4 sm:p-5 border-b border-[#1C182B]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-[#64748B] uppercase">
                    {doc.practicalExample.language || "code"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(doc.practicalExample.codeOrSpec)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hover:text-white bg-[#141024] border border-[#211B38] px-2 py-1 rounded transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto text-xs sm:text-[13px] font-mono text-[#E2E8F0] leading-relaxed whitespace-pre font-normal">
                  <code>{doc.practicalExample.codeOrSpec}</code>
                </pre>
              </div>
            )}

            {/* Expected Output */}
            {doc.practicalExample.output && (
              <div className="p-4 sm:p-5 bg-[#0A0D14] border-b border-[#1C182B]">
                <div className="text-[11px] font-mono uppercase text-[#38BDF8] font-bold mb-1.5">
                  Expected Output / Circuit Verification
                </div>
                <pre className="text-xs font-mono text-[#38BDF8] bg-black/40 p-3 rounded-lg border border-[#38BDF8]/20 whitespace-pre-wrap">
                  {doc.practicalExample.output}
                </pre>
              </div>
            )}

            {/* Step-by-Step Explanation */}
            <div className="p-5 sm:p-6 bg-[#0B0914]">
              <div className="text-xs font-bold uppercase text-[#94A3B8] mb-2">
                Detailed Analysis
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {doc.practicalExample.explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: COMMON MISTAKES & MISCONCEPTIONS */}
        <section id="mistakes" className="mb-12 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-5 rounded bg-amber-400" />
            <span>7. Common Mistakes &amp; Gotchas</span>
          </h2>
          <div className="space-y-3">
            {doc.commonMistakes.map((cm, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0F0A0E] border border-amber-500/20 p-5 space-y-2.5"
              >
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-300 font-medium">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{cm.mistake}</span>
                </div>
                <div className="pl-6 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-l-2 border-emerald-500/30 ml-2">
                  <span className="text-emerald-400 font-semibold">Solution: </span>
                  {cm.fix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: QUICK REVISION */}
        <section id="revision" className="mb-12 scroll-mt-20">
          <div className="rounded-2xl bg-gradient-to-br from-[#120D24] to-[#0A0814] border border-[#26203D] p-6 sm:p-7">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#8B5CF6]" />
              <span>8. Quick Revision (Key Takeaways)</span>
            </h2>
            <ul className="space-y-2.5">
              {doc.quickRevision.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                  <span className="text-[#8B5CF6] font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 9: CHECK YOUR UNDERSTANDING (QUIZ) */}
        <section id="quiz" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-5 rounded bg-purple-500" />
              <span>9. Check Your Understanding</span>
            </h2>
            <span className="text-xs text-[#64748B]">Self-assessment quiz</span>
          </div>

          <div className="space-y-4">
            {doc.checkUnderstanding.map((q, idx) => {
              const isRevealed = !!revealedAnswers[idx];

              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0B0914] border border-[#1C182B] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-bold text-[#8B5CF6] px-2 py-0.5 rounded bg-[#8B5CF6]/10 shrink-0">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options if multiple choice */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 pl-8">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className="text-xs text-[#CBD5E1] bg-[#120F22] border border-[#211B38] px-3 py-2 rounded-lg"
                        >
                          <span className="font-mono font-bold text-[#8B5CF6] mr-2">
                            {String.fromCharCode(65 + oi)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reveal answer button */}
                  <div className="mt-4 pt-3 border-t border-[#1C182B] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleAnswer(idx)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C084FC] transition-colors"
                    >
                      <span>{isRevealed ? "Hide Answer" : "Reveal Answer & Explanation"}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isRevealed ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="mt-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300 space-y-1 animate-in fade-in duration-200">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span>Correct Answer: {q.answer}</span>
                      </div>
                      <p className="text-[#CBD5E1] text-xs pt-1">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 10: WHAT SHOULD YOU LEARN NEXT? & CURRICULUM FOOTER */}
        <footer className="mt-14 pt-8 border-t border-[#1C182B] space-y-6">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span>10. Curriculum Progression</span>
            <span>SkillNex Core Electronics Track</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Topic */}
            {prevDoc ? (
              <Link
                href={`/dashboard/electronics/docs/${prevDoc.id}`}
                className="group rounded-xl bg-[#0B0914] border border-[#1C182B] hover:border-[#8B5CF6]/50 p-4 transition-all flex flex-col justify-between text-left"
              >
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#64748B] group-hover:text-[#8B5CF6] transition-colors mb-2">
                  <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                  <span>Previous Topic</span>
                </div>
                <div className="font-mono text-xs text-[#8B5CF6] font-semibold mb-1">
                  {prevDoc.serial}
                </div>
                <div className="text-sm font-medium text-white group-hover:text-[#C084FC] transition-colors line-clamp-2">
                  {prevDoc.title}
                </div>
              </Link>
            ) : (
              <div className="rounded-xl bg-[#0B0914]/40 border border-[#161224] p-4 text-xs text-[#64748B] flex items-center">
                <span>Start of Curriculum</span>
              </div>
            )}

            {/* Next Topic */}
            {nextDoc ? (
              <Link
                href={`/dashboard/electronics/docs/${nextDoc.id}`}
                className="group rounded-xl bg-[#0B0914] border border-[#1C182B] hover:border-[#8B5CF6]/50 p-4 transition-all flex flex-col justify-between text-right"
              >
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-[#64748B] group-hover:text-[#8B5CF6] transition-colors mb-2">
                  <span>Next Topic</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-mono text-xs text-[#8B5CF6] font-semibold mb-1">
                  {nextDoc.serial}
                </div>
                <div className="text-sm font-medium text-white group-hover:text-[#C084FC] transition-colors line-clamp-2">
                  {nextDoc.title}
                </div>
              </Link>
            ) : (
              <div className="rounded-xl bg-[#0B0914]/40 border border-[#161224] p-4 text-xs text-[#64748B] flex items-center justify-end">
                <span>Curriculum Complete!</span>
              </div>
            )}
          </div>

          <div className="text-center pt-6">
            <Link
              href={`/dashboard/electronics?tab=roadmap&stage=${doc.stageId}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B5CF6] hover:text-[#C084FC] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Return to {doc.stageTitle} Table</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
