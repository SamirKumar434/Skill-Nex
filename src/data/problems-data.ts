export type ProblemStatus = "not-started" | "in-progress" | "completed";

export type ProblemTopic =
  | "Basic Wires and Signals"
  | "Logic Gates"
  | "Vectors"
  | "Combinational Circuits";

export interface ProblemItem {
  id: string; // Stable identifier
  serial: string;
  title: string;
  topic: ProblemTopic;
  hdlbitsKey: string;
  difficulty: "Easy";
  platform: "HDLBits";
  url: string;
  concept: string;
  description: string;
}

export const HDLBITS_INDEX_URL = "https://hdlbits.01xz.net/wiki/Problem_sets";

export const PROBLEM_TOPICS: ProblemTopic[] = [
  "Basic Wires and Signals",
  "Logic Gates",
  "Vectors",
  "Combinational Circuits",
];

export const PROBLEMS_DATA: ProblemItem[] = [
  // 1. Basic Wires and Signals
  {
    id: "hdl-step-one",
    serial: "01",
    title: "Constant One Output",
    topic: "Basic Wires and Signals",
    hdlbitsKey: "Step_one",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Step_one",
    concept: "Continuous Assignment (1'b1)",
    description: "Write a Verilog module with an output wire driving a constant logic 1.",
  },
  {
    id: "hdl-wire",
    serial: "02",
    title: "A Single Wire",
    topic: "Basic Wires and Signals",
    hdlbitsKey: "Wire",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Wire",
    concept: "assign out = in;",
    description: "Implement continuous assignment connecting input wire in to output wire out.",
  },
  {
    id: "hdl-wire4",
    serial: "03",
    title: "Four Independent Wires",
    topic: "Basic Wires and Signals",
    hdlbitsKey: "Wire4",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Wire4",
    concept: "Multi-Wire Routing",
    description: "Route three independent inputs (a, b, c) to four output wires (w, x, y, z).",
  },

  // 2. Logic Gates
  {
    id: "hdl-notgate",
    serial: "04",
    title: "Inverter (NOT Gate)",
    topic: "Logic Gates",
    hdlbitsKey: "Notgate",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Notgate",
    concept: "Bitwise NOT (~)",
    description: "Implement a single-bit NOT gate inverter using the bitwise NOT operator.",
  },
  {
    id: "hdl-andgate",
    serial: "05",
    title: "2-Input AND Gate",
    topic: "Logic Gates",
    hdlbitsKey: "Andgate",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Andgate",
    concept: "Bitwise AND (&)",
    description: "Implement a 2-input AND gate driving out high only when both inputs are high.",
  },
  {
    id: "hdl-norgate",
    serial: "06",
    title: "NOR Gate",
    topic: "Logic Gates",
    hdlbitsKey: "Norgate",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Norgate",
    concept: "Bitwise NOR (~|)",
    description: "Implement a 2-input NOR gate driving logic low when either input is high.",
  },
  {
    id: "hdl-xnorgate",
    serial: "07",
    title: "XNOR Gate",
    topic: "Logic Gates",
    hdlbitsKey: "Xnorgate",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Xnorgate",
    concept: "Bitwise XNOR (~^)",
    description: "Design an exclusive-NOR gate driving logic high when both inputs match.",
  },

  // 3. Vectors
  {
    id: "hdl-vector0",
    serial: "08",
    title: "Vectors (Bit Slicing)",
    topic: "Vectors",
    hdlbitsKey: "Vector0",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Vector0",
    concept: "Vector Bus Slicing [2:0]",
    description: "Declare 3-bit vector buses and extract individual bits [2], [1], [0] into distinct outputs.",
  },
  {
    id: "hdl-vector1",
    serial: "09",
    title: "Constant Vector Output",
    topic: "Vectors",
    hdlbitsKey: "Vector1",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Vector1",
    concept: "16-Bit Byte Part-Select",
    description: "Split a 16-bit input vector [15:0] into upper byte [15:8] and lower byte [7:0].",
  },

  // 4. Combinational Circuits
  {
    id: "hdl-mux2to1",
    serial: "10",
    title: "2-to-1 Multiplexer",
    topic: "Combinational Circuits",
    hdlbitsKey: "Mux2to1",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Mux2to1",
    concept: "Conditional Mux (sel ? b : a)",
    description: "Create a 1-bit wide 2-to-1 multiplexer routing a when sel = 0 and b when sel = 1.",
  },
  {
    id: "hdl-hadd",
    serial: "11",
    title: "Half Adder",
    topic: "Combinational Circuits",
    hdlbitsKey: "Hadd",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Hadd",
    concept: "XOR Sum & AND Carry",
    description: "Design a 1-bit half adder producing sum = a ^ b and carry-out cout = a & b.",
  },
  {
    id: "hdl-fadd",
    serial: "12",
    title: "Full Adder",
    topic: "Combinational Circuits",
    hdlbitsKey: "Fadd",
    difficulty: "Easy",
    platform: "HDLBits",
    url: "https://hdlbits.01xz.net/wiki/Fadd",
    concept: "Carry-In & Ripple Logic",
    description: "Design a 1-bit full adder calculating sum and carry-out from inputs a, b, and cin.",
  },
];

export const STORAGE_PROBLEMS_STATUS_KEY = "skillnex_hdlbits_problems_status_map";

export function getProblemsStatusMap(): Record<string, ProblemStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_PROBLEMS_STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setProblemStatus(
  problemId: string,
  status: ProblemStatus
): Record<string, ProblemStatus> {
  const current = getProblemsStatusMap();
  const updated = { ...current, [problemId]: status };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_PROBLEMS_STATUS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return updated;
}
