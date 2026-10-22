import { TopicDocumentation } from "./types";
import { C_PROGRAMMING_DOCS } from "./c-programming";
import { GIT_GITHUB_DOCS } from "./git-github";
import { ANALOG_ELECTRONICS_DOCS } from "./analog-electronics";
import { DIGITAL_ELECTRONICS_DOCS } from "./digital-electronics";

export * from "./types";

export const ALL_TOPIC_DOCS: TopicDocumentation[] = [
  ...C_PROGRAMMING_DOCS,
  ...GIT_GITHUB_DOCS,
  ...ANALOG_ELECTRONICS_DOCS,
  ...DIGITAL_ELECTRONICS_DOCS,
];

// Map by topic ID for O(1) lookup
const TOPIC_DOCS_MAP = new Map<string, TopicDocumentation>(
  ALL_TOPIC_DOCS.map((doc) => [doc.id, doc])
);

// Aliases mapping new granular subtopics to their module documentation
const TOPIC_DOC_ALIASES: Record<string, string> = {
  // C Programming Subtopics
  "c-variables-types-additional": "c-variables-types-operators",
  "c-loops-break-continue": "c-loops-iteration",
  "c-loops-do-while": "c-loops-iteration",
  "c-functions-declaration": "c-functions-scope",
  "c-functions-definition": "c-functions-scope",
  "c-functions-call-by-value-reference": "c-functions-scope",
  "c-arrays-declaration": "c-arrays-basics",
  "c-arrays-accessing-elements": "c-arrays-basics",
  "c-arrays-initialization": "c-arrays-basics",
  "c-arrays-sizeof": "c-arrays-basics",
  "c-arrays-2d-matrices": "c-arrays-basics",
  "c-strings-literals": "c-strings-manipulation",
  "c-strings-vs-characters": "c-strings-manipulation",
  "c-strings-declaration-initialization": "c-strings-manipulation",
  "c-unions-basics": "c-structures-unions-bitfields",
  "c-structures-typedef": "c-structures-unions-bitfields",

  // Digital Electronics Subtopics
  "digital-demorgans-theorems": "digital-boolean-algebra",
  "digital-sop-pos": "digital-karnaugh-maps",
  "digital-half-full-subtractors": "digital-arithmetic-circuits",
  "digital-demultiplexers-demux": "digital-combinational-circuits",
  "digital-decoders": "digital-decoders-encoders",
  "digital-priority-encoders": "digital-decoders-encoders",
  "digital-sr-latch": "digital-latches-flipflops",
  "digital-sr-flipflop": "digital-latches-flipflops",
  "digital-sr-flipflop-truthtable": "digital-latches-flipflops",
  "digital-d-flipflop": "digital-latches-flipflops",
  "digital-d-flipflop-truthtable": "digital-latches-flipflops",
  "digital-jk-flipflop": "digital-latches-flipflops",
  "digital-jk-flipflop-truthtable": "digital-latches-flipflops",
  "digital-jk-race-around": "digital-latches-flipflops",
  "digital-jk-masterslave": "digital-latches-flipflops",
  "digital-t-flipflop": "digital-latches-flipflops",
  "digital-t-flipflop-truthtable": "digital-latches-flipflops",
  "digital-shift-registers-modes": "digital-shift-registers",
  // Analog Electronics Subtopics
  "analog-diode-characteristics": "analog-diodes-rectifiers",
  "analog-bjt-configurations": "analog-bjt-structure",
  "analog-jfet-fundamentals": "analog-mosfet-circuits",
  "analog-opamp-summing": "analog-opamp-applications",
  "analog-opamp-integrator": "analog-opamp-applications",
  "analog-opamp-differentiator": "analog-opamp-applications",
  "analog-opamp-subtractor": "analog-opamp-applications",
  "analog-oscillator-fundamentals": "analog-filters-oscillators",
};

export function getAllTopicDocs(): TopicDocumentation[] {
  return ALL_TOPIC_DOCS;
}

export function getTopicDoc(id: string): TopicDocumentation | undefined {
  const directDoc = TOPIC_DOCS_MAP.get(id);
  if (directDoc) return directDoc;
  const aliasId = TOPIC_DOC_ALIASES[id];
  return aliasId ? TOPIC_DOCS_MAP.get(aliasId) : undefined;
}

export function getAllTopicSlugs(): string[] {
  const allSlugs = new Set([
    ...ALL_TOPIC_DOCS.map((doc) => doc.id),
    ...Object.keys(TOPIC_DOC_ALIASES),
  ]);
  return Array.from(allSlugs);
}

export function getAdjacentTopics(currentId: string): {
  prev?: TopicDocumentation;
  next?: TopicDocumentation;
} {
  const index = ALL_TOPIC_DOCS.findIndex((doc) => doc.id === currentId);
  if (index === -1) {
    return {};
  }

  return {
    prev: index > 0 ? ALL_TOPIC_DOCS[index - 1] : undefined,
    next: index < ALL_TOPIC_DOCS.length - 1 ? ALL_TOPIC_DOCS[index + 1] : undefined,
  };
}
