"use client";

import React, { useMemo } from "react";
import {
  PlayCircle,
  ExternalLink,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { DsaQuestion } from "@/data/dsa-data";

interface DsaTopicTableProps {
  questions: DsaQuestion[];
  completedQuestionIds: string[];
  onToggleQuestion: (questionId: string) => void;
}

interface DifficultyGroupTableProps {
  questions: DsaQuestion[];
  completedQuestionIds: string[];
  onToggleQuestion: (questionId: string) => void;
}

function DifficultyGroupTable({
  questions,
  completedQuestionIds,
  onToggleQuestion,
}: DifficultyGroupTableProps) {
  return (
    <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#1C182B] bg-[#0E0C1C] text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              <th className="py-3 px-3 sm:px-4 w-16 text-center whitespace-nowrap">S. No.</th>
              <th className="py-3 px-3 sm:px-4 min-w-[260px]">Problem</th>
              <th className="py-3 px-3 sm:px-4 w-32 text-center whitespace-nowrap">Video Lecture</th>
              <th className="py-3 px-3 sm:px-4 w-36 text-center whitespace-nowrap">Practice / Reference</th>
              <th className="py-3 px-3 sm:px-4 w-28 text-center whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181427]">
            {questions.map((q) => {
              const isCompleted = completedQuestionIds.includes(q.id);

              return (
                <tr
                  key={q.id}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    isCompleted ? "bg-emerald-500/[0.02]" : ""
                  }`}
                >
                  {/* 1. S. No. */}
                  <td className="py-3.5 px-3 sm:px-4 text-center font-mono text-xs text-[#8B5CF6] font-medium align-middle">
                    {q.serial}
                  </td>

                  {/* 2. Problem */}
                  <td className="py-3.5 px-3 sm:px-4">
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => onToggleQuestion(q.id)}
                        className="mt-0.5 text-[#64748B] hover:text-[#34D399] transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded"
                        title={isCompleted ? "Mark incomplete" : "Mark complete"}
                        aria-label={
                          isCompleted
                            ? `Mark question ${q.title} incomplete`
                            : `Mark question ${q.title} complete`
                        }
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={17} className="text-emerald-400" />
                        ) : (
                          <Circle size={17} />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div
                          className={`font-medium transition-colors text-[13px] sm:text-sm ${
                            isCompleted
                              ? "text-[#94A3B8] line-through decoration-[#64748B]"
                              : "text-white"
                          }`}
                        >
                          {q.title}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          {/* Difficulty Badge */}
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              q.difficulty === "Easy"
                                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
                                : "text-amber-400 bg-amber-500/10 border-amber-500/25"
                            }`}
                          >
                            {q.difficulty}
                          </span>

                          {/* Pattern Tag */}
                          <span className="text-[10px] font-medium text-[#94A3B8] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded">
                            {q.pattern}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Video Lecture */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    {q.videoUrl ? (
                      <a
                        href={q.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#F87171] hover:text-white bg-[#EF4444]/10 hover:bg-[#EF4444] transition-colors"
                        title={q.videoTitle || "Watch Lecture"}
                      >
                        <PlayCircle size={13} />
                        <span>Lecture</span>
                      </a>
                    ) : (
                      <span className="text-xs text-[#64748B]">—</span>
                    )}
                  </td>

                  {/* 4. Practice / Reference */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    {q.practiceUrl ? (
                      <a
                        href={q.practiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-[#60A5FA] hover:text-white bg-[#3B82F6]/10 hover:bg-[#3B82F6] transition-colors"
                        title={`Solve on ${q.platform}`}
                      >
                        <span>{q.platform}</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-[#64748B]">—</span>
                    )}
                  </td>

                  {/* 5. Status Toggle */}
                  <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                    <button
                      type="button"
                      onClick={() => onToggleQuestion(q.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-[#181329] text-[#94A3B8] border-[#29223D] hover:text-white hover:border-[#8B5CF6]"
                      }`}
                    >
                      {isCompleted ? "Done" : "Mark Done"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DsaTopicTable({
  questions,
  completedQuestionIds,
  onToggleQuestion,
}: DsaTopicTableProps) {
  const easyQuestions = useMemo(
    () => questions.filter((q) => q.difficulty === "Easy"),
    [questions]
  );

  const mediumQuestions = useMemo(
    () => questions.filter((q) => q.difficulty === "Medium"),
    [questions]
  );

  if (questions.length === 0) {
    return (
      <div className="bg-[#0B0914] border border-[#1C182B] rounded-xl py-10 text-center text-xs text-[#94A3B8]">
        No questions found matching your filter.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Easy Questions Section */}
      {easyQuestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
              <span>Easy Questions</span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full font-mono">
                {easyQuestions.length}
              </span>
            </h3>
          </div>

          <DifficultyGroupTable
            questions={easyQuestions}
            completedQuestionIds={completedQuestionIds}
            onToggleQuestion={onToggleQuestion}
          />
        </div>
      )}

      {/* Medium Questions Section */}
      {mediumQuestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-500/20" />
              <span>Medium Questions</span>
              <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full font-mono">
                {mediumQuestions.length}
              </span>
            </h3>
          </div>

          <DifficultyGroupTable
            questions={mediumQuestions}
            completedQuestionIds={completedQuestionIds}
            onToggleQuestion={onToggleQuestion}
          />
        </div>
      )}
    </div>
  );
}
