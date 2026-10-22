// ─── Preparation Paths ────────────────────────────────────────────────────────
export const preparationPaths = [
  {
    id: "core-electronics",
    title: "Core Electronics",
    description:
      "Build your technical foundation for electronics and embedded engineering roles.",
    icon: "cpu",
    topics: [
      "Electronic Devices",
      "Analog & Digital Electronics",
      "Signals & Systems",
      "Communication Systems",
      "Microcontrollers & Embedded Systems",
    ],
    ctaLabel: "Explore Core Roadmap",
    href: "/dashboard/electronics",
    accentColor: "#1D4ED8",
  },
  {
    id: "software-it",
    title: "Software & IT",
    description:
      "Prepare for software engineering roles with structured learning and coding practice.",
    icon: "code-2",
    topics: [
      "Programming",
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
    ctaLabel: "Explore Software Roadmap",
    href: "/dashboard/it",
    accentColor: "#5B9DFF",
  },
] as const;

// ─── Problems (without roadmap) ────────────────────────────────────────────────
export const problemPoints = [
  "Too many scattered resources",
  "Unclear topic priorities",
  "No consistent revision plan",
  "Difficult to track progress",
];

// ─── Solutions (with SkillNex) ────────────────────────────────────────────────
export const solutionPoints = [
  "A structured learning sequence",
  "Clear next steps",
  "Practice and revision built in",
  "Progress visible in one place",
];

// ─── How It Works Steps ────────────────────────────────────────────────────────
export const howItWorksSteps = [
  {
    step: "01",
    icon: "target",
    label: "Choose Your Goal",
    description: "Select Core Electronics or Software & IT.",
  },
  {
    step: "02",
    icon: "map",
    label: "Get Your Roadmap",
    description: "Follow an organized sequence of topics.",
  },
  {
    step: "03",
    icon: "book-open",
    label: "Learn & Practice",
    description: "Study concepts, solve questions, and revise.",
  },
  {
    step: "04",
    icon: "trending-up",
    label: "Track Your Progress",
    description: "Understand what is complete and what comes next.",
  },
] as const;

// ─── Roadmap Stages ────────────────────────────────────────────────────────────
export type StageStatus = "completed" | "active" | "upcoming" | "locked";

export interface RoadmapStage {
  num: string;
  title: string;
  description: string;
  status: StageStatus;
  topics?: string[];
  tasks?: { label: string; done: boolean }[];
}

export const softwareRoadmapStages: RoadmapStage[] = [
  {
    num: "01",
    title: "Fundamentals",
    description: "Basic Programming & Logic Gate Basics",
    status: "completed",
    topics: ["Variables & Loops", "Functions", "Logic Gates"],
  },
  {
    num: "02",
    title: "Core Topics",
    description: "Data Structures & Circuit Design Foundations",
    status: "active",
    tasks: [
      { label: "Linear DSA", done: true },
      { label: "Microcontrollers", done: false },
    ],
    topics: ["Arrays", "Linked Lists", "Trees", "Sorting"],
  },
  {
    num: "03",
    title: "Practice & Revision",
    description: "Technical Subject Revision & Coding Patterns",
    status: "upcoming",
    topics: ["LeetCode Patterns", "Subject MCQs", "Timed Tests"],
  },
  {
    num: "04",
    title: "Interview Preparation",
    description: "Mock Interviews & Aptitude Prep",
    status: "locked",
    topics: ["HR Questions", "Aptitude", "Mock Interviews"],
  },
];

// ─── Interview Preparation Cards ──────────────────────────────────────────────
export const interviewPrepCards = [
  {
    icon: "book-marked",
    title: "Core Concept Revision",
    description:
      "Systematically revise every key topic with notes and quick MCQ drills.",
    tags: ["Theory", "MCQs", "Flash Cards"],
    color: "#2563EB",
  },
  {
    icon: "terminal",
    title: "Coding Assessments",
    description:
      "Solve topic-tagged problems with a built-in illustrative code editor.",
    tags: ["DSA", "Problem Solving", "Timed"],
    color: "#5B9DFF",
  },
  {
    icon: "mic",
    title: "Mock Interviews",
    description:
      "Simulate real placement interviews with structured question banks.",
    tags: ["HR Round", "Technical", "Panel"],
    color: "#35C98A",
  },
  {
    icon: "building-2",
    title: "Company-Focused Prep",
    description:
      "Targeted preparation tracks modeled on top recruiting companies.",
    tags: ["TCS", "Infosys", "Wipro", "VLSI Firms"],
    color: "#1D4ED8",
  },
] as const;

// ─── Features ─────────────────────────────────────────────────────────────────
export const features = [
  {
    id: "roadmaps",
    title: "Personalized Roadmaps",
    description: "Know what to study next.",
    icon: "map-pin",
  },
  {
    id: "practice",
    title: "Topic-wise Practice",
    description: "Turn concepts into problem-solving skills.",
    icon: "code-2",
  },
  {
    id: "progress",
    title: "Progress Tracking",
    description: "See your progress and identify what needs attention.",
    icon: "bar-chart-2",
  },
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: "Is SkillNex suitable for ECE students?",
    a: "Yes! SkillNex is specifically built for ECE students, offering both Core Electronics and Software & IT preparation tracks tailored to your placement needs.",
  },
  {
    q: "Can I prepare for both core electronics and software roles?",
    a: "Yes, SkillNex offers dedicated, equal preparation paths for both, allowing you to bridge the gap or switch as needed.",
  },
  {
    q: "How does the preparation roadmap work?",
    a: "The roadmap breaks your preparation into sequential stages — from fundamentals to interview prep — unlocking the next stage as you complete the current one.",
  },
  {
    q: "Can I track my learning progress?",
    a: "Absolutely. SkillNex provides a visual progress tracker so you always know how many tasks you've completed and what's coming up next.",
  },
  {
    q: "Is SkillNex suitable for beginners?",
    a: "Yes! SkillNex starts from the fundamentals and progressively builds up your knowledge, making it perfect for beginners who want to strengthen their base.",
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Explore", href: "#features" },
  { label: "Preparation Paths", href: "#paths" },
  { label: "How It Works", href: "#how-it-works" },
] as const;

// ─── Dashboard Sidebar ────────────────────────────────────────────────────────
export const dashboardNavItems = [
  { icon: "layout-dashboard", label: "Overview", active: false },
  { icon: "map", label: "My Roadmap", active: true },
  { icon: "code-2", label: "Practice", active: false },
  { icon: "mic", label: "Mock Interviews", active: false },
] as const;
