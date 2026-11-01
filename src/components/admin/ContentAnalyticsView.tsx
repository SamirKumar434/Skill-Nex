"use client";

import React, { useState } from "react";
import type { AdminContentAnalyticsData } from "@/lib/admin/dashboard";
import { AnalyticsOverviewCards } from "./AnalyticsOverviewCards";
import { SubjectEngagementCards } from "./SubjectEngagementCards";
import { TopicsAttentionCards } from "./TopicsAttentionCards";
import { TopicAnalyticsTable } from "./TopicAnalyticsTable";

interface ContentAnalyticsViewProps {
  data: AdminContentAnalyticsData;
}

export function ContentAnalyticsView({ data }: ContentAnalyticsViewProps) {
  const {
    overview,
    subjects,
    topics,
    leastCompletedTopics,
    mostCompletedTopics,
    eligibleStudentsCount,
    hasSufficientSample,
  } = data;

  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [highlightedTopicId, setHighlightedTopicId] = useState<string | null>(null);

  const handleSelectTopicFromAttention = (topicId: string) => {
    setHighlightedTopicId(topicId);
    const targetTopic = topics.find((t) => t.id === topicId);
    if (targetTopic) {
      setSelectedSubject(targetTopic.subjectId);
    }
  };

  return (
    <div className="space-y-7">
      {/* 1. Header / Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Curriculum Content Analytics
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Real-time topic engagement, completion rates, and learning drop-offs across Core Electronics and DSA.
          </p>
        </div>
      </div>

      {/* 2. Top Overview Metric Cards */}
      <AnalyticsOverviewCards overview={overview} />

      {/* 3. Subject-Wise Engagement Comparison Cards */}
      <SubjectEngagementCards
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />

      {/* 4. Attention Areas (Least Completed vs Most Completed) */}
      <TopicsAttentionCards
        leastCompleted={leastCompletedTopics}
        mostCompleted={mostCompletedTopics}
        eligibleStudentsCount={eligibleStudentsCount}
        hasSufficientSample={hasSufficientSample}
        onSelectTopic={handleSelectTopicFromAttention}
      />

      {/* 5. Comprehensive Topic-Wise Analytics Table */}
      <TopicAnalyticsTable
        topics={topics}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        searchedTopicId={highlightedTopicId}
      />
    </div>
  );
}

