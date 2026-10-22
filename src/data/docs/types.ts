export interface HowItWorksStep {
  step: string;
  detail: string;
}

export interface PracticalExample {
  title: string;
  description: string;
  codeOrSpec?: string;
  language?: string;
  output?: string;
  explanation: string;
}

export interface CommonMistake {
  mistake: string;
  fix: string;
}

export interface QuizQuestion {
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface TopicDocumentation {
  id: string;
  stageId: string;
  stageTitle: string;
  serial: string;
  title: string;
  readTimeMinutes: number;
  why: string;
  need: string;
  whatYouWillLearn: string[];
  prerequisites: string;
  conceptExplanation: string;
  howItWorks: HowItWorksStep[];
  practicalExample: PracticalExample;
  commonMistakes: CommonMistake[];
  quickRevision: string[];
  checkUnderstanding: QuizQuestion[];
  nextTopicId?: string;
  nextTopicTitle?: string;
  prevTopicId?: string;
  prevTopicTitle?: string;
}
