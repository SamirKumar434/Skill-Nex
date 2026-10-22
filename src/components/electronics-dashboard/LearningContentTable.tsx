"use client";

import React from "react";
import { LearningStage } from "@/data/electronics-roadmap";
import { OverviewTopicTable } from "./OverviewTopicTable";
import { RoadmapTopicTable } from "./RoadmapTopicTable";

export { OverviewTopicTable } from "./OverviewTopicTable";
export { RoadmapTopicTable } from "./RoadmapTopicTable";

export interface LearningContentTableProps {
  stage: LearningStage;
  completedTopicIds?: string[];
  onToggleTopic?: (topicId: string) => void;
  onBackToStages: () => void;
  variant?: "overview" | "roadmap";
}

export function LearningContentTable({
  stage,
  completedTopicIds = [],
  onToggleTopic = () => {},
  onBackToStages,
  variant = "roadmap",
}: LearningContentTableProps) {
  if (variant === "overview") {
    return (
      <OverviewTopicTable
        stage={stage}
        completedTopicIds={completedTopicIds}
        onBackToOverview={onBackToStages}
      />
    );
  }

  return (
    <RoadmapTopicTable
      stage={stage}
      completedTopicIds={completedTopicIds}
      onToggleTopic={onToggleTopic}
      onBackToRoadmap={onBackToStages}
    />
  );
}
