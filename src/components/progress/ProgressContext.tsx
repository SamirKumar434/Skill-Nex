"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAuth } from "@clerk/nextjs";
import type { ProblemStatus } from "@/data/problems-data";
import {
  toggleTopicProgressAction,
  toggleDsaProgressAction,
  updateProblemStatusAction,
} from "@/actions/progress";
import { SignInPromptModal } from "@/components/auth/SignInPromptModal";

interface ProgressContextValue {
  completedTopicIds: string[];
  completedDsaQuestionIds: string[];
  problemStatusMap: Record<string, ProblemStatus>;
  isLoading: boolean;
  error: string | null;
  toggleTopic: (topicId: string) => Promise<boolean>;
  toggleDsaQuestion: (questionId: string) => Promise<boolean>;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => Promise<boolean>;
  openSignInPrompt: () => void;
  closeSignInPrompt: () => void;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [completedDsaQuestionIds, setCompletedDsaQuestionIds] = useState<string[]>([]);
  const [problemStatusMap, setProblemStatusMap] = useState<Record<string, ProblemStatus>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

  const activeUserIdRef = useRef<string | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const fetchProgress = useCallback(async () => {
    if (!isSignedIn || !userId || isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/progress", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setCompletedTopicIds([]);
          setCompletedDsaQuestionIds([]);
          setProblemStatusMap({});
          return;
        }
        throw new Error(`Failed to load progress (status ${res.status})`);
      }

      const json = await res.json();
      if (json.success && json.data) {
        setCompletedTopicIds(json.data.completedTopicIds || []);
        setCompletedDsaQuestionIds(json.data.completedDsaQuestionIds || []);
        setProblemStatusMap(json.data.problemStatusMap || {});
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error loading progress";
      console.warn("[ProgressContext] fetchProgress error:", msg);
      setError(msg);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [isSignedIn, userId]);

  // Load cloud progress once when authenticated session is loaded
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && userId) {
      if (activeUserIdRef.current !== userId) {
        activeUserIdRef.current = userId;
        fetchProgress();
      }
    } else {
      if (activeUserIdRef.current !== null) {
        activeUserIdRef.current = null;
        setCompletedTopicIds([]);
        setCompletedDsaQuestionIds([]);
        setProblemStatusMap({});
      }
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, userId, fetchProgress]);

  const openSignInPrompt = useCallback(() => {
    setIsSignInModalOpen(true);
  }, []);

  const closeSignInPrompt = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);

  const toggleTopic = useCallback(
    async (topicId: string): Promise<boolean> => {
      if (!isSignedIn) {
        openSignInPrompt();
        return false;
      }

      // Optimistic update
      const wasCompleted = completedTopicIds.includes(topicId);
      const nextList = wasCompleted
        ? completedTopicIds.filter((id) => id !== topicId)
        : [...completedTopicIds, topicId];

      setCompletedTopicIds(nextList);

      try {
        const res = await toggleTopicProgressAction(topicId);
        if (!res.success) {
          // Rollback on failure
          setCompletedTopicIds(completedTopicIds);
          setError(res.error || "Failed to update topic status");
          return false;
        }
        return true;
      } catch {
        // Rollback on network exception
        setCompletedTopicIds(completedTopicIds);
        setError("Network error updating topic status");
        return false;
      }
    },
    [isSignedIn, completedTopicIds, openSignInPrompt]
  );

  const toggleDsaQuestion = useCallback(
    async (questionId: string): Promise<boolean> => {
      if (!isSignedIn) {
        openSignInPrompt();
        return false;
      }

      // Optimistic update
      const wasCompleted = completedDsaQuestionIds.includes(questionId);
      const nextList = wasCompleted
        ? completedDsaQuestionIds.filter((id) => id !== questionId)
        : [...completedDsaQuestionIds, questionId];

      setCompletedDsaQuestionIds(nextList);

      try {
        const res = await toggleDsaProgressAction(questionId);
        if (!res.success) {
          // Rollback on failure
          setCompletedDsaQuestionIds(completedDsaQuestionIds);
          setError(res.error || "Failed to update question status");
          return false;
        }
        return true;
      } catch {
        // Rollback on network exception
        setCompletedDsaQuestionIds(completedDsaQuestionIds);
        setError("Network error updating question status");
        return false;
      }
    },
    [isSignedIn, completedDsaQuestionIds, openSignInPrompt]
  );

  const updateProblemStatus = useCallback(
    async (problemId: string, status: ProblemStatus): Promise<boolean> => {
      if (!isSignedIn) {
        openSignInPrompt();
        return false;
      }

      // Optimistic update
      const prevStatus = problemStatusMap[problemId] || "not-started";
      setProblemStatusMap((prev) => ({ ...prev, [problemId]: status }));

      try {
        const res = await updateProblemStatusAction(problemId, status);
        if (!res.success) {
          // Rollback on failure
          setProblemStatusMap((prev) => ({ ...prev, [problemId]: prevStatus }));
          setError(res.error || "Failed to update problem status");
          return false;
        }
        return true;
      } catch {
        // Rollback on network exception
        setProblemStatusMap((prev) => ({ ...prev, [problemId]: prevStatus }));
        setError("Network error updating problem status");
        return false;
      }
    },
    [isSignedIn, problemStatusMap, openSignInPrompt]
  );

  return (
    <ProgressContext.Provider
      value={{
        completedTopicIds,
        completedDsaQuestionIds,
        problemStatusMap,
        isLoading,
        error,
        toggleTopic,
        toggleDsaQuestion,
        updateProblemStatus,
        openSignInPrompt,
        closeSignInPrompt,
        refreshProgress: fetchProgress,
      }}
    >
      {children}
      <SignInPromptModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInPrompt}
      />
    </ProgressContext.Provider>
  );
}

export function useStudentProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useStudentProgress must be used within a ProgressProvider");
  }
  return context;
}
