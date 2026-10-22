import { TopicDocumentation } from "./types";

export const DIGITAL_ELECTRONICS_DOCS: TopicDocumentation[] = [
  {
    id: "digital-number-systems",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.1",
    title: "Number Systems and Base Conversions (Binary, Octal, Hex, Decimal)",
    readTimeMinutes: 9,
    why: "Modern digital systems, microcontrollers, and computers operate exclusively in discrete electrical states (high and low voltages representing 1 and 0). Engineers must master conversions between Decimal (base 10), Binary (base 2), Octal (base 8), and Hexadecimal (base 16) to debug memory addresses, inspect register contents, and write firmware.",
    need: "A single memory address or byte pattern like 1111101011000101 is impossible for human engineers to read at a glance without error. Hexadecimal groups 4 binary bits into a single character (0xFAC5), making bus dumps, register maps, and network packets readable. Understanding positional notation and conversion algorithms is the essential first step of digital electronics.",
    whatYouWillLearn: [
      "Radix/Base concepts: Decimal (10), Binary (2), Octal (8), and Hexadecimal (16)",
      "Positional number notation and polynomial weight expansion",
      "Converting Binary to Decimal and Decimal to Binary (repeated division)",
      "Direct group conversions: Binary to Hexadecimal (nibbles) and Binary to Octal",
      "Fractional base conversions and powers of 2 reference",
    ],
    prerequisites: "Basic arithmetic and high-school algebra. No prior electronics knowledge required.",
    conceptExplanation:
      "A number in any base $r$ is represented by a weighted sum of powers of the radix $r$:\n\n$$N = \\sum_{i=-m}^{n-1} d_i \\cdot r^i$$\n\n- **Decimal (Base 10)**: Uses digits 0 through 9.\n- **Binary (Base 2)**: Uses digits 0 and 1. Weights are powers of 2 ($1, 2, 4, 8, 16, 32, 64, 128, \\dots$).\n- **Octal (Base 8)**: Uses digits 0 through 7. Each octal digit corresponds to exactly 3 binary bits ($2^3 = 8$).\n- **Hexadecimal (Base 16)**: Uses digits 0-9 and letters A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Each hex digit corresponds to exactly 4 binary bits ($2^4 = 16$), known as a 'nibble'.",
    howItWorks: [
      {
        step: "Decimal to Binary (Successive Division)",
        detail: "Divide integer by 2 repeatedly, recording the remainder (0 or 1) at each step. Read remainders from bottom (MSB) to top (LSB).",
      },
      {
        step: "Binary to Hexadecimal Grouping",
        detail: "Starting from the binary point, group bits into nibbles (4 bits). Replace each nibble with its matching hex character (e.g. 1101 -> D).",
      },
      {
        step: "Hexadecimal to Binary Expansion",
        detail: "Replace every individual hexadecimal digit with its 4-bit binary equivalent (e.g. 0xA5 -> 1010 0101).",
      },
    ],
    practicalExample: {
      title: "Converting Decimal 218 to Binary and Hexadecimal",
      description: "Step-by-step conversion of decimal 218 into binary and hex.",
      codeOrSpec: `Step 1: Decimal to Binary (Repeated Division by 2)
218 / 2 = 109  remainder 0 (LSB)
109 / 2 = 54   remainder 1
54 / 2  = 27   remainder 0
27 / 2  = 13   remainder 1
13 / 2  = 6    remainder 1
6 / 2   = 3    remainder 0
3 / 2   = 1    remainder 1
1 / 2   = 0    remainder 1 (MSB)

Reading remainders from MSB to LSB:
Binary = 1101 1010_2

Step 2: Binary to Hexadecimal (Group in 4-bit nibbles)
Nibble 1: 1101_2 = (8 + 4 + 0 + 1) = 13 = 'D'
Nibble 2: 1010_2 = (8 + 0 + 2 + 0) = 10 = 'A'
Hexadecimal = 0xDA`,
      language: "text",
      output: "Decimal 218 = Binary 11011010 = Hexadecimal 0xDA",
      explanation:
        "Notice how grouping into 4-bit nibbles allows instant conversion between binary and hex without going back through decimal.",
    },
    commonMistakes: [
      {
        mistake: "Grouping bits from left to right instead of starting from the binary point.",
        fix: "For whole integers, always group in sets of 4 bits starting from the least significant bit (rightmost) moving left. Pad with leading zeroes if needed.",
      },
      {
        mistake: "Confusing letters in Hex: writing 10 as '0' instead of 'A'.",
        fix: "In base 16, values 10 through 15 are single symbols: A=10, B=11, C=12, D=13, E=14, F=15.",
      },
    ],
    quickRevision: [
      "Binary = Base 2; Octal = Base 8 (3 bits per digit); Hex = Base 16 (4 bits per digit).",
      "Each byte consists of 8 bits, represented cleanly by 2 hexadecimal digits (0x00 to 0xFF).",
      "Repeated division converts decimal to any other base; repeated multiplication converts fractions.",
      "Hexadecimal letters: A=10, B=11, C=12, D=13, E=14, F=15.",
    ],
    checkUnderstanding: [
      {
        question: "What is the binary representation of hexadecimal digit `0xC`?",
        options: ["1010", "1100", "1110", "1011"],
        answer: "1100",
        explanation: "'C' corresponds to decimal 12, which in binary is 8 + 4 = 1100.",
      },
      {
        question: "How many binary bits are represented by a single Octal digit?",
        options: ["2 bits", "3 bits", "4 bits", "8 bits"],
        answer: "3 bits",
        explanation: "Because 2^3 = 8, each octal digit represents exactly 3 binary bits (000 through 111).",
      },
    ],
    prevTopicId: "analog-regulators-supplies",
    prevTopicTitle: "Voltage Regulators & Power Supply Design",
    nextTopicId: "digital-number-boolean",
    nextTopicTitle: "Binary Arithmetic and Signed Numbers (1's & 2's Complement)",
  },
  {
    id: "digital-number-boolean",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.2",
    title: "Binary Arithmetic and Signed Numbers (1's & 2's Complement)",
    readTimeMinutes: 10,
    why: "Processors cannot write a physical '-' sign onto a copper wire. To perform subtraction, represent negative numbers, and detect mathematical overflow, digital hardware relies on 2's complement arithmetic.",
    need: "Sign-magnitude systems suffer from dual zeros (+0 and -0) and require separate hardware circuits for addition and subtraction. 2's complement arithmetic solves both issues: it allows subtraction to be performed using standard addition hardware with no ambiguous negative zero.",
    whatYouWillLearn: [
      "Binary addition and subtraction rules with carry and borrow",
      "Sign-magnitude vs 1's complement vs 2's complement representation",
      "Calculating 2's complement: inverting bits and adding 1",
      "Dynamic range of signed n-bit numbers: $-2^{n-1}$ to $+2^{n-1} - 1$",
      "Detecting arithmetic overflow in signed additions",
    ],
    prerequisites: "Binary and hexadecimal number systems (Topic 4.1).",
    conceptExplanation:
      "To represent signed numbers in an $n$-bit register:\n1. **Positive Numbers**: Written in standard binary with the Most Significant Bit (MSB, the sign bit) as `0`.\n2. **Negative Numbers**: Represented using 2's complement:\n   - Step 1: Write positive binary value.\n   - Step 2 (1's Complement): Invert all bits ($0 \\to 1, 1 \\to 0$).\n   - Step 3 (2's Complement): Add 1 to the least significant bit (LSB).\n\n**Subtraction via Addition**: Computing $A - B$ in hardware is performed by adding $A + (\\text{2's complement of } B)$. The end carry-out is discarded.\n\n**Signed Overflow**: Occurs when adding two numbers of the same sign produces a sum with the opposite sign. In hardware, overflow is detected when carry into the MSB differs from carry out of the MSB: $V = C_{in} \\oplus C_{out}$.",
    howItWorks: [
      {
        step: "Invert All Bits",
        detail: "To negate binary +5 (0000 0101), invert all 8 bits to get 1's complement: 1111 1010.",
      },
      {
        step: "Add One (+1)",
        detail: "Add 1 to 1111 1010 to obtain 2's complement: 1111 1011 (which represents -5).",
      },
      {
        step: "Execute Subtraction",
        detail: "Add operand A and the 2's complement of B using a standard adder circuit.",
      },
      {
        step: "Discard Final Carry",
        detail: "In 2's complement modular arithmetic, the 9th carry bit is discarded.",
      },
    ],
    practicalExample: {
      title: "Subtracting 5 from 9 using 8-bit 2's Complement",
      description: "Demonstrating how 9 - 5 is computed in hardware as 9 + (-5).",
      codeOrSpec: `Operand A (+9) = 0000 1001
Operand B (+5) = 0000 0101

Step 1: Compute 2's complement of +5 (-5)
+5 in binary:     0000 0101
1's complement:   1111 1010
Add 1:           +0000 0001
-5 in binary:     1111 1011 (0xFB)

Step 2: Add (+9) + (-5)
    0000 1001   (+9)
  + 1111 1011   (-5)
  -----------
  1 0000 0100

Step 3: Discard carry-out (1)
Result = 0000 0100 (+4 in decimal)`,
      language: "text",
      output: "Result is 0000 0100 (+4 decimal). Subtraction completed using addition.",
      explanation:
        "The carry-out of 1 from the MSB is discarded in modular 2's complement arithmetic, leaving exactly +4.",
    },
    commonMistakes: [
      {
        mistake: "Confusing carry-out with signed arithmetic overflow.",
        fix: "Carry-out indicates overflow only in unsigned arithmetic. In signed arithmetic, overflow occurs if two positive numbers yield a negative result, or two negatives yield a positive.",
      },
      {
        mistake: "Forgetting to add 1 when computing 2's complement.",
        fix: "Inverting bits only produces 1's complement. You must add 1 to obtain 2's complement.",
      },
    ],
    quickRevision: [
      "2's Complement = 1's Complement + 1.",
      "Range of $n$-bit signed integer: $-2^{n-1}$ to $+2^{n-1} - 1$. For 8 bits: $-128$ to $+127$.",
      "0xFF in an 8-bit signed register represents $-1$; 0x80 represents $-128$.",
      "Subtraction $A - B$ is computed as $A + (\\sim B + 1)$.",
    ],
    checkUnderstanding: [
      {
        question: "What is the 8-bit 2's complement representation of decimal number -1?",
        options: ["1000 0001", "1111 1110", "1111 1111", "0111 1111"],
        answer: "1111 1111",
        explanation: "+1 is 0000 0001. Inverting bits gives 1111 1110. Adding 1 yields 1111 1111 (0xFF).",
      },
      {
        question: "What is the maximum positive decimal value that can be stored in a signed 8-bit register?",
        options: ["255", "128", "127", "63"],
        answer: "127",
        explanation: "The formula is 2^(n-1) - 1. For n = 8: 2^7 - 1 = 128 - 1 = 127.",
      },
    ],
    prevTopicId: "digital-number-systems",
    prevTopicTitle: "Number Systems and Base Conversions (Binary, Octal, Hex, Decimal)",
    nextTopicId: "digital-logic-gates-kmaps",
    nextTopicTitle: "Basic Logic Gates & Universal Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)",
  },
  {
    id: "digital-logic-gates-kmaps",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.3",
    title: "Basic Logic Gates & Universal Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)",
    readTimeMinutes: 10,
    why: "Logic gates are the physical atoms of digital computing. Every processor, GPU, memory controller, and digital sensor is built by interconnecting elementary logic gates fabricated from silicon transistors.",
    need: "Before designing adders, multiplexers, or state machines, an engineer must understand the behavior, truth tables, and electrical properties of basic gates (AND, OR, NOT), universal gates (NAND, NOR), and comparison gates (XOR, XNOR).",
    whatYouWillLearn: [
      "Basic gates: AND, OR, NOT (Inverter) logic and truth tables",
      "Universal gates: why NAND and NOR can synthesize any logic circuit alone",
      "Exclusive gates: XOR (parity, addition) and XNOR (equality comparison)",
      "Constructing basic gates purely using NAND and NOR gates",
      "Digital waveform timing diagrams and propagation delay ($t_{pd}$)",
    ],
    prerequisites: "Binary numbers and complementary arithmetic (Topics 4.1 and 4.2).",
    conceptExplanation:
      "A logic gate is an electronic circuit with one or more binary inputs and a single binary output:\n\n- **AND Gate ($Y = A \\cdot B$)**: Output is 1 only when all inputs are 1.\n- **OR Gate ($Y = A + B$)**: Output is 1 when at least one input is 1.\n- **NOT Gate ($Y = \\overline{A}$)**: Inverts input ($1 \\to 0, 0 \\to 1$).\n- **NAND Gate ($Y = \\overline{A \\cdot B}$)**: Inverted AND. Output is 0 only when all inputs are 1.\n- **NOR Gate ($Y = \\overline{A + B}$)**: Inverted OR. Output is 1 only when all inputs are 0.\n- **XOR Gate ($Y = A \\oplus B = A\\overline{B} + \\overline{A}B$)**: Output is 1 when inputs are different (odd parity detector).\n- **XNOR Gate ($Y = \\overline{A \\oplus B} = AB + \\overline{A}\\overline{B}$)**: Output is 1 when inputs are equal.\n\n**Universal Gates**: NAND and NOR are called *universal gates* because any Boolean function can be implemented using only NAND gates or only NOR gates.",
    howItWorks: [
      {
        step: "NOT from NAND",
        detail: "Tie both inputs together: NAND(A, A) = NOT(A).",
      },
      {
        step: "AND from NAND",
        detail: "Pass output of a NAND gate through a NAND-inverter: NOT(NAND(A, B)) = AND(A, B).",
      },
      {
        step: "OR from NAND",
        detail: "Invert inputs first using NAND-inverters, then feed into a NAND gate: NAND(NOT A, NOT B) = OR(A, B) via De Morgan's Law.",
      },
    ],
    practicalExample: {
      title: "Truth Tables and Universal Gate Synthesis",
      description: "Comparing basic gate truth tables and building an OR gate using 3 NAND gates.",
      codeOrSpec: `Logic Gate Truth Table:
A | B | AND | OR | NAND | NOR | XOR | XNOR
0 | 0 |  0  | 0  |  1   |  1  |  0  |  1
0 | 1 |  0  | 1  |  1   |  0  |  1  |  0
1 | 0 |  0  | 1  |  1   |  0  |  1  |  0
1 | 1 |  1  | 1  |  0   |  0  |  0  |  1

Constructing OR from 3 NAND gates:
Gate 1: Invert A -> A' = NAND(A, A)
Gate 2: Invert B -> B' = NAND(B, B)
Gate 3: Output Y = NAND(A', B') = (A' · B')' = A'' + B'' = A + B (OR gate!)`,
      language: "text",
      output: "OR function synthesized using only NAND gates with exact matching truth table.",
      explanation:
        "Because NAND gates are cheaper and faster in CMOS silicon fabrication, entire chips are often synthesized purely using NAND gates.",
    },
    commonMistakes: [
      {
        mistake: "Assuming XOR output is 1 when all inputs are 1 in a 3-input XOR.",
        fix: "An XOR gate is an odd-parity detector. For inputs (1, 1, 1), there are 3 ones (odd), so output is 1. For (1, 1, 0), output is 0.",
      },
      {
        mistake: "Leaving unused CMOS gate inputs floating.",
        fix: "Floating CMOS inputs pick up static noise, causing erratic oscillation and excessive power draw. Tie unused AND/NAND inputs to VDD and OR/NOR inputs to GND.",
      },
    ],
    quickRevision: [
      "AND = both high; OR = any high; NOT = inverter.",
      "NAND and NOR are universal gates that can implement any Boolean function.",
      "XOR is 1 when inputs differ; XNOR is 1 when inputs are identical.",
      "CMOS fabrication naturally produces inverting gates (NAND, NOR) faster than non-inverting gates.",
    ],
    checkUnderstanding: [
      {
        question: "Why are NAND and NOR gates called 'universal gates'?",
        options: [
          "Because they operate at universal voltage levels",
          "Because any Boolean logic expression can be implemented using exclusively NAND or exclusively NOR gates",
          "Because they have infinite input pins",
          "Because they do not dissipate power",
        ],
        answer: "Because any Boolean logic expression can be implemented using exclusively NAND or exclusively NOR gates",
        explanation: "Any logic function (AND, OR, NOT, XOR, memory) can be synthesized entirely from NAND gates alone or NOR gates alone.",
      },
      {
        question: "What is the output of an XOR gate when both inputs A and B are 1?",
        options: ["1", "0", "Floating", "High-Impedance"],
        answer: "0",
        explanation: "XOR outputs 1 only when inputs are different. When both inputs are 1, output is 0.",
      },
    ],
    prevTopicId: "digital-number-boolean",
    prevTopicTitle: "Binary Arithmetic and Signed Numbers (1's & 2's Complement)",
    nextTopicId: "digital-boolean-algebra",
    nextTopicTitle: "Boolean Algebra Laws and De Morgan's Theorems",
  },
  {
    id: "digital-boolean-algebra",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.4",
    title: "Boolean Algebra Laws and De Morgan's Theorems",
    readTimeMinutes: 9,
    why: "Directly converting a truth table or word specification into hardware often produces dozens of unnecessary gates. Boolean algebra and De Morgan's theorems provide the mathematical rules to algebraically simplify expressions, drastically saving silicon area, power dissipation, and propagation delay.",
    need: "Without Boolean laws, circuit designers would build circuits that are larger, slower, and consume far more battery power than necessary. Mastering De Morgan's laws allows transforming costly AND-OR circuits into uniform, fast NAND-NAND networks.",
    whatYouWillLearn: [
      "Fundamental Boolean postulates and laws (Identity, Null, Idempotence, Complement)",
      "Commutative, Associative, and Distributive properties",
      "Absorption Law and Consensus Theorem",
      "De Morgan's First and Second Laws and bubble logic duality",
      "Canonical forms: Sum-of-Products (SOP) and Product-of-Sums (POS)",
    ],
    prerequisites: "Basic logic gates and truth tables (Topic 4.3).",
    conceptExplanation:
      "Boolean variables take values $\\in \\{0, 1\\}$. The core operations are AND ($\\cdot$), OR ($+$), and NOT ($\\overline{A}$).\n\n### Fundamental Laws\n- **Identity**: $A + 0 = A$, $A \\cdot 1 = A$\n- **Null / Annihilator**: $A + 1 = 1$, $A \\cdot 0 = 0$\n- **Idempotence**: $A + A = A$, $A \\cdot A = A$\n- **Complement**: $A + \\overline{A} = 1$, $A \\cdot \\overline{A} = 0$\n- **Involution (Double Negation)**: $\\overline{\\overline{A}} = A$\n- **Distributive**: $A \\cdot (B + C) = AB + AC$, and uniquely in Boolean algebra: $A + BC = (A + B)(A + C)$\n- **Absorption**: $A + AB = A$, $A(A + B) = A$\n\n### De Morgan's Laws\n1. **First Law**: $\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$ (NAND equals OR with active-low inputs).\n2. **Second Law**: $\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$ (NOR equals AND with active-low inputs).\n*Rule of thumb*: 'Break the line, change the sign.'",
    howItWorks: [
      {
        step: "Canonical Formulation",
        detail: "Read truth table rows where output is 1 to form Sum of Products (SOP) minterms.",
      },
      {
        step: "Factoring & Distribution",
        detail: "Factor out common terms using $AB + A\\overline{B} = A(B + \\overline{B}) = A(1) = A$.",
      },
      {
        step: "Applying De Morgan",
        detail: "Invert expressions and switch operators to convert between AND-OR and all-NAND implementations.",
      },
    ],
    practicalExample: {
      title: "Simplifying a Boolean Expression using Boolean Laws",
      description: "Reducing a 3-variable expression step-by-step.",
      codeOrSpec: `Problem: Simplify F = A'B'C + A'BC + AB'C + ABC

Step 1: Factor out A'C from first two terms and AC from last two terms:
F = A'C(B' + B) + AC(B' + B)

Step 2: Apply Complement Law (B' + B = 1):
F = A'C(1) + AC(1)
F = A'C + AC

Step 3: Factor out C:
F = C(A' + A)

Step 4: Apply Complement Law (A' + A = 1):
F = C(1) = C`,
      language: "text",
      output: "F is reduced from 4 minterms (16 inputs) to just a single input wire C!",
      explanation:
        "The entire complex 4-term circuit simplifies to a direct connection to wire C, eliminating all logic gates completely.",
    },
    commonMistakes: [
      {
        mistake: "Misapplying De Morgan's Law: writing ~(A + B) as ~A + ~B.",
        fix: "When you break the negation bar, you MUST change OR (+) to AND (*): ~(A + B) = ~A · ~B.",
      },
      {
        mistake: "Forgetting the second distributive law: A + BC = (A + B)(A + C).",
        fix: "Unlike standard algebra, in Boolean algebra OR distributes over AND as well as AND over OR.",
      },
    ],
    quickRevision: [
      "De Morgan 1: $\\overline{AB} = \\overline{A} + \\overline{B}$.",
      "De Morgan 2: $\\overline{A+B} = \\overline{A} \\cdot \\overline{B}$.",
      "Absorption: $A + AB = A$.",
      "Canonical SOP expresses a function as a sum of minterms (rows where output is 1).",
    ],
    checkUnderstanding: [
      {
        question: "According to De Morgan's Laws, what is the simplified equivalent of `~(A * B * C)`?",
        options: ["`~A * ~B * ~C`", "`~A + ~B + ~C`", "`A + B + C`", "`~(A + B + C)`"],
        answer: "`~A + ~B + ~C`",
        explanation: "Breaking the overbar changes the product (AND) operations into sum (OR) operations with each term negated.",
      },
      {
        question: "What is the result of Boolean expression `A + A * B`?",
        options: ["B", "A", "A + B", "1"],
        answer: "A",
        explanation: "By the Absorption Law: A + AB = A(1 + B) = A(1) = A.",
      },
    ],
    prevTopicId: "digital-logic-gates-kmaps",
    prevTopicTitle: "Basic Logic Gates & Universal Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)",
    nextTopicId: "digital-karnaugh-maps",
    nextTopicTitle: "Karnaugh Maps (K-Maps) and Logic Simplification (SOP & POS)",
  },
  {
    id: "digital-karnaugh-maps",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.5",
    title: "Karnaugh Maps (K-Maps) and Logic Simplification (SOP & POS)",
    readTimeMinutes: 11,
    why: "Simplifying Boolean expressions purely using algebraic identities becomes difficult and error-prone as the number of variables increases to 3, 4, or 5. Karnaugh Maps (K-Maps) provide a visual, systematic, graphical method to find the absolute minimal Sum-of-Products (SOP) or Product-of-Sums (POS) circuit.",
    need: "In a 4-variable truth table with 16 rows, spotting which terms can be factored is hard. A K-Map arranges minterms in a 2D grid ordered by Gray code, where physically adjacent cells differ by only one variable bit. Grouping adjacent cells of 1s automatically cancels redundant variables, guaranteeing the smallest possible gate count.",
    whatYouWillLearn: [
      "K-Map construction: 2, 3, and 4-variable grid layouts",
      "Gray code column/row ordering (00, 01, 11, 10) and toroidal wrapping",
      "Grouping rules: powers of 2 (singlets, pairs, quads, octets)",
      "Prime implicants and essential prime implicants",
      "Using 'Don't Care' conditions ($X$) to maximize group sizes",
    ],
    prerequisites: "Boolean algebra laws and truth tables (Topics 4.3 and 4.4).",
    conceptExplanation:
      "A Karnaugh Map is a visual representation of a truth table arranged in a matrix of $2^n$ cells:\n\n- **Gray Code Order**: Rows and columns are labeled with Gray code (`00`, `01`, `11`, `10`) rather than standard binary, so adjacent cells differ by exactly 1 bit.\n- **Toroidal Adjacency**: The top edge wraps around to touch the bottom edge, and the left edge wraps around to touch the right edge.\n- **Grouping Rules**:\n  1. Groups must contain $2^k$ cells (1, 2, 4, 8, or 16 cells).\n  2. Groups must be rectangular.\n  3. Groups should be as large as possible.\n  4. Every cell containing a `1` must be covered by at least one group.\n  5. Groups may overlap to create larger sizes.\n- **Don't Cares ($X$)**: Conditions where output doesn't matter (e.g. invalid BCD codes 10-15). Can be treated as 1 if it enlarges a group, or 0 if not needed.",
    howItWorks: [
      {
        step: "Plot 1s on Grid",
        detail: "Transfer every row of the truth table with output 1 into its corresponding Gray-coded cell in the K-Map.",
      },
      {
        step: "Form Maximal Rectangles",
        detail: "Group adjacent 1s into powers of two (octets of 8, quads of 4, pairs of 2), utilizing edge wrapping.",
      },
      {
        step: "Read Eliminated Variables",
        detail: "Variables that change state (both 0 and 1) across the group cancel out; only variables that remain constant form the product term.",
      },
    ],
    practicalExample: {
      title: "Simplifying a 4-Variable K-Map with Don't Cares",
      description: "Finding minimal SOP for F(A,B,C,D) = Σm(0, 2, 8, 10) + d(5, 7, 13, 15).",
      codeOrSpec: `4-Variable K-Map Grid (AB rows, CD columns):
CD ->  00   01   11   10
AB |--------------------
00 |   1    0    0    1   <- m0, m2
01 |   0    X    X    0   <- d5, d7
11 |   0    X    X    0   <- d13, d15
10 |   1    0    0    1   <- m8, m10

Grouping:
The four corners m0, m2, m8, m10 form a valid Quad of 4 cells!
- Across rows (00 and 10): A changes (0 to 1), B remains 0 -> B'
- Across columns (00 and 10): C changes (0 to 1), D remains 0 -> D'

Minimal Term for Corner Quad = B'D'

The Don't Care terms (d5, d7, d13, d15) are left as 0 since they do not help cover any 1s.

Final Minimal SOP:
F = B'D'`,
      language: "text",
      output: "F is simplified from 4 minterms down to a single 2-input AND term: B'D'.",
      explanation:
        "Using corner wrapping, 4 corner cells cancel out variables A and C, leaving only B'D'.",
    },
    commonMistakes: [
      {
        mistake: "Labeling K-map axes in standard binary: 00, 01, 10, 11.",
        fix: "Axes must follow Gray code: 00, 01, 11, 10. Switching columns 2 and 3 violates adjacency rules.",
      },
      {
        mistake: "Making diagonal groups or groups of 3 or 6 cells.",
        fix: "Groups can only be rectangular blocks of sizes 1, 2, 4, 8, or 16 (powers of 2).",
      },
    ],
    quickRevision: [
      "K-Map cells are arranged in Gray code (00, 01, 11, 10) so adjacent cells differ by only 1 bit.",
      "Grouping sizes must strictly be powers of two (1, 2, 4, 8, 16).",
      "K-map edges wrap around: top wraps to bottom; left wraps to right (corner quad).",
      "Don't cares ($X$) can be treated as 1 to enlarge groups or ignored as 0.",
    ],
    checkUnderstanding: [
      {
        question: "Why are the column labels of a Karnaugh Map ordered as `00, 01, 11, 10` instead of `00, 01, 10, 11`?",
        options: [
          "To save space",
          "Because Gray code ensures that physically adjacent cells differ by only one variable bit",
          "It is an arbitrary convention with no mathematical meaning",
          "To allow inverted inputs",
        ],
        answer: "Because Gray code ensures that physically adjacent cells differ by only one variable bit",
        explanation: "Gray code guarantees single-bit Hamming distance between adjacent cells, enabling terms of the form (x + x') to cancel out.",
      },
      {
        question: "How many variables are eliminated when grouping 4 adjacent cells (a quad) in a 4-variable K-map?",
        options: ["1 variable", "2 variables", "3 variables", "4 variables"],
        answer: "2 variables",
        explanation: "Each doubling of group size eliminates 1 variable. A pair (2) eliminates 1; a quad (4) eliminates 2 variables.",
      },
    ],
    prevTopicId: "digital-boolean-algebra",
    prevTopicTitle: "Boolean Algebra Laws and De Morgan's Theorems",
    nextTopicId: "digital-arithmetic-circuits",
    nextTopicTitle: "Combinational Arithmetic: Half & Full Adders and Subtractors",
  },
  {
    id: "digital-arithmetic-circuits",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.6",
    title: "Combinational Arithmetic: Half & Full Adders and Subtractors",
    readTimeMinutes: 11,
    why: "Addition is the foundational mathematical operation of all microprocessors and Arithmetic Logic Units (ALUs). Subtraction, multiplication, array indexing, and memory address calculation are all executed using hardware adders.",
    need: "Single-bit half adders cannot accept carries from preceding stages. Chaining 32 or 64 full adders together introduces cumulative carry propagation delay. Mastering adders, subtractors, and fast carry lookahead architectures is central to digital VLSI design.",
    whatYouWillLearn: [
      "Half Adder (Sum via XOR, Carry via AND)",
      "Full Adder implementation using two Half Adders and an OR gate",
      "Half and Full Subtractors (Difference and Borrow logic)",
      "Multi-bit Ripple Carry Adders (RCA) and critical path delay bottlenecks",
      "Carry Lookahead Adders (CLA): Generate ($G_i$) and Propagate ($P_i$) parallel logic",
    ],
    prerequisites: "Binary addition rules, XOR gates, and logic simplification (Topics 4.2, 4.3, and 4.5).",
    conceptExplanation:
      "Digital arithmetic circuits perform fundamental calculations:\n\n### 1. Half Adder (HA)\nAdds two 1-bit inputs $A$ and $B$:\n- $\\text{Sum } S = A \\oplus B$\n- $\\text{Carry } C = A \\cdot B$\n- *Limitation*: Cannot accept a carry-in from a lower bit stage.\n\n### 2. Full Adder (FA)\nAdds three 1-bit inputs: $A$, $B$, and Carry-in $C_{in}$:\n- $\\text{Sum } S = A \\oplus B \\oplus C_{in}$\n- $\\text{Carry-out } C_{out} = AB + C_{in}(A \\oplus B)$\n- Can be built using 2 Half Adders and 1 OR gate.\n\n### 3. Ripple Carry Adder (RCA)\nCascades $n$ Full Adders in series. $C_{out}$ of stage $i$ connects to $C_{in}$ of stage $i+1$. The carry ripples through all $n$ stages, giving total delay $t_{delay} = n \\cdot t_{carry}$.\n\n### 4. Carry Lookahead Adder (CLA)\nEliminates the carry ripple delay by computing all carries in parallel:\n- **Generate**: $G_i = A_i \\cdot B_i$ (produces carry regardless of $C_i$).\n- **Propagate**: $P_i = A_i \\oplus B_i$ (passes incoming carry $C_i$ through to $C_{i+1}$).",
    howItWorks: [
      {
        step: "Bitwise Generate & Propagate",
        detail: "All bit pairs evaluate P_i = A_i XOR B_i and G_i = A_i AND B_i in parallel on the first gate level.",
      },
      {
        step: "Lookahead Carry Computation",
        detail: "A 2-level AND-OR tree computes carries: C1 = G0 + P0*C0, C2 = G1 + P1*G0 + P1*P0*C0.",
      },
      {
        step: "Parallel Summing",
        detail: "Each sum bit S_i = P_i XOR C_i is computed immediately once carries are ready.",
      },
    ],
    practicalExample: {
      title: "1-Bit Full Adder Gate Realization",
      description: "Truth table and gate equations for 1-bit Full Adder.",
      codeOrSpec: `Full Adder Truth Table:
A | B | Cin | Sum (S) | Cout
0 | 0 |  0  |    0    |  0
0 | 0 |  1  |    1    |  0
0 | 1 |  0  |    1    |  0
0 | 1 |  1  |    0    |  1
1 | 0 |  0  |    1    |  0
1 | 0 |  1  |    0    |  1
1 | 1 |  0  |    0    |  1
1 | 1 |  1  |    1    |  1

Equations:
S = A ⊕ B ⊕ Cin
Cout = (A · B) + (Cin · (A ⊕ B))

Implementation with 2 Half Adders:
HA1: S1 = A ⊕ B,      C1 = A · B
HA2: S  = S1 ⊕ Cin,   C2 = S1 · Cin
Final Cout = C1 + C2`,
      language: "text",
      output: "Full Adder realized with exactly 2 XOR, 2 AND, and 1 OR gate.",
      explanation:
        "The first half adder computes partial sum and carry; the second half adder adds Cin, and the OR gate merges both possible carry conditions.",
    },
    commonMistakes: [
      {
        mistake: "Using an OR gate instead of XOR for the Sum expression.",
        fix: "Sum is strictly an odd-parity function: S = A ⊕ B ⊕ Cin. An OR gate produces incorrect output when multiple inputs are 1.",
      },
      {
        mistake: "Ignoring carry ripple delay in high-speed designs.",
        fix: "In a 64-bit adder, a ripple carry delay can exceed the clock cycle. High-speed processors use Carry Lookahead or Carry Select architectures.",
      },
    ],
    quickRevision: [
      "Half Adder: Sum = $A \\oplus B$, Carry = $A \\cdot B$.",
      "Full Adder: Sum = $A \\oplus B \\oplus C_{in}$, Carry = $AB + C_{in}(A \\oplus B)$.",
      "A Full Adder can be constructed from 2 Half Adders and 1 OR gate.",
      "Carry Lookahead Adders compute carries in parallel using Generate ($G_i$) and Propagate ($P_i$) terms.",
    ],
    checkUnderstanding: [
      {
        question: "How many Half Adders and OR gates are required to construct a 1-bit Full Adder?",
        options: [
          "1 Half Adder and 2 OR gates",
          "2 Half Adders and 1 OR gate",
          "3 Half Adders and 0 OR gates",
          "2 Half Adders and 2 OR gates",
        ],
        answer: "2 Half Adders and 1 OR gate",
        explanation: "The first HA adds A and B; the second HA adds the intermediate sum to Cin; the OR gate combines the two carry outputs.",
      },
      {
        question: "What is the primary operational advantage of a Carry Lookahead Adder over a Ripple Carry Adder?",
        options: [
          "It uses fewer total transistors",
          "It computes all carry bits in parallel, drastically reducing propagation delay for wide bit-widths",
          "It works with analog signals",
          "It does not require a power supply",
        ],
        answer: "It computes all carry bits in parallel, drastically reducing propagation delay for wide bit-widths",
        explanation: "By computing carries in parallel using generate and propagate logic, CLA avoids waiting for carries to ripple sequentially.",
      },
    ],
    prevTopicId: "digital-karnaugh-maps",
    prevTopicTitle: "Karnaugh Maps (K-Maps) and Logic Simplification (SOP & POS)",
    nextTopicId: "digital-combinational-circuits",
    nextTopicTitle: "Multiplexers (MUX) and De-multiplexers (DEMUX)",
  },
  {
    id: "digital-combinational-circuits",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.7",
    title: "Multiplexers (MUX) and De-multiplexers (DEMUX)",
    readTimeMinutes: 11,
    why: "In computing systems, multiple functional units share limited communication paths. Multiplexers (MUX) and De-multiplexers (DEMUX) act as digital routing switches that steer multiple data channels onto shared data buses.",
    need: "Routing 16 different sensor channels directly to a microcontroller CPU would require 16 separate bus lines. A Multiplexer selects one of $2^n$ inputs and connects it to a single output line based on $n$ select lines. Furthermore, a MUX can act as a universal function generator to implement arbitrary Boolean logic.",
    whatYouWillLearn: [
      "Multiplexer architecture: 2:1, 4:1, 8:1, and 16:1 MUX",
      "Using select lines ($S_0, S_1, \\dots$) to steer data inputs",
      "Implementing arbitrary Boolean logic functions using a multiplexer",
      "De-multiplexer (DEMUX) architecture and one-to-many data routing",
      "Cascading smaller multiplexers to build larger routing networks",
    ],
    prerequisites: "Logic gates, truth tables, and Boolean equations (Topics 4.3 and 4.4).",
    conceptExplanation:
      "### 1. Multiplexer (Data Selector)\nA Multiplexer has $2^n$ data inputs, $n$ select lines, and 1 output ($Y$).\nFor a 4:1 MUX ($n=2$ select lines $S_1, S_0$):\n\n$$Y = \\overline{S_1}\\overline{S_0}I_0 + \\overline{S_1}S_0 I_1 + S_1\\overline{S_0}I_2 + S_1 S_0 I_3$$\n\n**Universal Function Generator**: A $2^n:1$ MUX can implement *any* Boolean function of $n+1$ variables without any external logic gates by connecting $n$ variables to the select lines and tying data inputs to $0, 1, V_{in},$ or $\\overline{V_{in}}$.\n\n### 2. De-multiplexer (DEMUX)\nA De-multiplexer performs the exact inverse operation of a MUX: it has 1 data input, $n$ select lines, and $2^n$ output lines. It steers the single input to whichever output line is designated by the select lines.",
    howItWorks: [
      {
        step: "Select Decoding",
        detail: "The binary code applied to select lines activates exactly one internal AND gate.",
      },
      {
        step: "Data Steering",
        detail: "Only the data input connected to the activated AND gate propagates through to the final OR gate.",
      },
      {
        step: "Demultiplexing",
        detail: "In a DEMUX, the input signal is directed to one specific output line while all other outputs remain inactive.",
      },
    ],
    practicalExample: {
      title: "Implementing F(A, B, C) = Σm(1, 3, 5, 6) using a 4:1 MUX",
      description: "Step-by-step implementation of a 3-variable function using a 4:1 MUX.",
      codeOrSpec: `Variables: A, B, C
Let Select Lines be: S1 = A, S0 = B
Remaining variable: C

Truth Table Analysis:
A | B | C | Minterm | F | Select (S1 S0) | Input Assignment
0 | 0 | 0 | m0      | 0 | 0 0            | F = C (when C=1, F=1)
0 | 0 | 1 | m1      | 1 |                | -> I0 = C
-------------------------------------------------------------
0 | 1 | 0 | m2      | 0 | 0 1            | F = C (when C=1, F=1)
0 | 1 | 1 | m3      | 1 |                | -> I1 = C
-------------------------------------------------------------
1 | 0 | 0 | m4      | 0 | 1 0            | F = C (when C=1, F=1)
1 | 0 | 1 | m5      | 1 |                | -> I2 = C
-------------------------------------------------------------
1 | 1 | 0 | m6      | 1 | 1 1            | F = C' (when C=0, F=1)
1 | 1 | 1 | m7      | 0 |                | -> I3 = C' (Inverted C)

Wiring:
Connect A to S1, B to S0.
Connect C directly to I0, I1, I2.
Connect NOT(C) to I3.`,
      language: "text",
      output: "F(A,B,C) is synthesized using 1 4:1 MUX and 1 inverter.",
      explanation:
        "Using multiplexers as universal logic modules allows synthesizing arbitrary logic in FPGAs using Look-Up Tables (LUTs).",
    },
    commonMistakes: [
      {
        mistake: "Confusing MUX select line count with input count.",
        fix: "For $N$ data inputs, you need $n = \\log_2 N$ select lines. An 8:1 MUX requires 3 select lines, not 8.",
      },
      {
        mistake: "Leaving Enable pins unconnected.",
        fix: "Many standard MUX chips feature an active-low Enable (\\overline{EN}). If left floating or held HIGH, the output remains disabled at 0.",
      },
    ],
    quickRevision: [
      "A MUX has $2^n$ inputs, $n$ select lines, and 1 output ('many-to-one').",
      "A DEMUX has 1 input, $n$ select lines, and $2^n$ outputs ('one-to-many').",
      "A $2^n:1$ MUX can implement any $(n+1)$-variable Boolean function.",
      "FPGA logic slices use multiplexer-based Look-Up Tables (LUTs) to synthesize hardware.",
    ],
    checkUnderstanding: [
      {
        question: "How many select lines are required for an 8-to-1 Multiplexer?",
        options: ["2 select lines", "3 select lines", "4 select lines", "8 select lines"],
        answer: "3 select lines",
        explanation: "Because 2^3 = 8, exactly 3 select lines (S2, S1, S0) are required to address 8 data inputs.",
      },
      {
        question: "What is the relationship between a Multiplexer and a De-multiplexer?",
        options: [
          "They are identical components with different names",
          "A MUX routes many inputs to one output; a DEMUX routes one input to many outputs",
          "A MUX is analog; a DEMUX is digital",
          "A DEMUX contains internal clock flip-flops",
        ],
        answer: "A MUX routes many inputs to one output; a DEMUX routes one input to many outputs",
        explanation: "MUX is a data selector (many-to-one); DEMUX is a data distributor (one-to-many).",
      },
    ],
    prevTopicId: "digital-arithmetic-circuits",
    prevTopicTitle: "Combinational Arithmetic: Half & Full Adders and Subtractors",
    nextTopicId: "digital-decoders-encoders",
    nextTopicTitle: "Decoders, Encoders and Priority Encoders",
  },
  {
    id: "digital-decoders-encoders",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.8",
    title: "Decoders, Encoders and Priority Encoders",
    readTimeMinutes: 10,
    why: "Processors use binary numbers to control external hardware: activating a specific RAM chip, driving 7-segment displays, or servicing hardware interrupts. Decoders and Encoders translate between compact binary codes and individual active hardware lines.",
    need: "When a CPU issues an address to read memory, a Decoder asserts exactly one chip-select line among thousands of chips. Conversely, when multiple peripherals request attention simultaneously, a Priority Encoder resolves conflicts by selecting the highest-priority request.",
    whatYouWillLearn: [
      "Decoder principles: 2-to-4 line and 3-to-8 line decoders (e.g., 74HC138)",
      "Active-low outputs and chip enable inputs for memory expansion",
      "BCD-to-7-Segment display decoders (driving numeric displays)",
      "Binary encoders (e.g., 8-to-3 line encoder)",
      "Priority Encoders: resolving simultaneous active inputs and valid flags",
    ],
    prerequisites: "Multiplexers and basic logic gates (Topics 4.3 and 4.7).",
    conceptExplanation:
      "### 1. Decoders\nA decoder converts an $n$-bit binary code into $2^n$ unique output lines:\n- A **3-to-8 decoder** takes 3 inputs ($A, B, C$) and activates exactly one of 8 outputs ($Y_0$ to $Y_7$).\n- Decoders commonly feature active-low enable inputs ($\\overline{E}$), allowing multiple decoders to be cascaded into larger address decoders (e.g., two 3-to-8 decoders combined into a 4-to-16 decoder).\n- **BCD to 7-Segment Decoder**: Converts a 4-bit binary digit (0-9) into 7 segment drive signals ($a, b, c, d, e, f, g$) to light up an LED numeric display.\n\n### 2. Encoders & Priority Encoders\n- **Standard Encoder**: Performs the reverse of a decoder, converting $2^n$ input lines into an $n$-bit code. If more than one input is active simultaneously, it produces invalid garbage output.\n- **Priority Encoder (e.g., 74HC148)**: Resolves multi-input conflicts by outputting the binary code corresponding strictly to the **highest-priority active input**. It also outputs a Valid ($V$) flag indicating whether any input is asserted.",
    howItWorks: [
      {
        step: "Address Decoding",
        detail: "When CPU address bus bits A15-A13 are 011, a 3-to-8 decoder asserts only output line Y3, enabling chip 3.",
      },
      {
        step: "Priority Evaluation",
        detail: "In an 8-to-3 priority encoder, if lines 2, 5, and 7 are all high, the encoder outputs binary 111 (7), servicing the highest priority first.",
      },
      {
        step: "Display Driving",
        detail: "BCD 0011 (3) activates segments a, b, c, d, and g on a 7-segment display.",
      },
    ],
    practicalExample: {
      title: "4-to-2 Priority Encoder Operation",
      description: "Truth table and priority resolution for 4 request lines (D3 highest priority).",
      codeOrSpec: `Priority Order: D3 (highest) > D2 > D1 > D0 (lowest)

Inputs (D3 D2 D1 D0) | Outputs (Y1 Y0) | Valid Flag (V)
0  0  0  0            |  X  X           | 0 (No request)
0  0  0  1            |  0  0           | 1 (Servicing D0)
0  0  1  X            |  0  1           | 1 (Servicing D1)
0  1  X  X            |  1  0           | 1 (Servicing D2)
1  X  X  X            |  1  1           | 1 (Servicing D3)

Note: 'X' indicates Don't Care (lower priority inputs are completely ignored).

Logic Equations:
Y1 = D3 + D2
Y0 = D3 + (D1 · ~D2)
V  = D3 + D2 + D1 + D0`,
      language: "text",
      output: "Whenever D3 is high, Y1 Y0 is always 11 regardless of D2, D1, D0.",
      explanation:
        "The priority encoder guarantees deterministic interrupt arbitration in operating systems and CPU hardware.",
    },
    commonMistakes: [
      {
        mistake: "Using a standard encoder when simultaneous inputs are possible.",
        fix: "Standard encoders fail if multiple inputs go high. Always use a Priority Encoder when inputs cannot be guaranteed to be mutually exclusive.",
      },
      {
        mistake: "Connecting active-low decoder outputs directly to active-high chip inputs.",
        fix: "Many standard decoders (like 74HC138) have active-low outputs (selected line goes to 0). Verify whether target peripherals require active-high or active-low enables.",
      },
    ],
    quickRevision: [
      "Decoders convert $n$ binary bits into $2^n$ unique output lines.",
      "Encoders compress $2^n$ lines into an $n$-bit binary code.",
      "Priority encoders arbitrate simultaneous inputs, outputting the highest active code.",
      "BCD-to-7-segment decoders drive standard numeric LED displays.",
    ],
    checkUnderstanding: [
      {
        question: "How many input and output lines does a 3-to-8 line decoder have?",
        options: ["3 inputs, 8 outputs", "8 inputs, 3 outputs", "3 inputs, 3 outputs", "8 inputs, 8 outputs"],
        answer: "3 inputs, 8 outputs",
        explanation: "A 3-to-8 decoder takes 3 select inputs and decodes them into one of 2^3 = 8 individual output lines.",
      },
      {
        question: "In an 8-to-3 priority encoder where input 7 has highest priority, what is output if inputs 2, 4, and 6 are high?",
        options: ["Binary 010 (2)", "Binary 100 (4)", "Binary 110 (6)", "Binary 111 (7)"],
        answer: "Binary 110 (6)",
        explanation: "Input 6 is the highest asserted input, so the priority encoder outputs 6 (binary 110).",
      },
    ],
    prevTopicId: "digital-combinational-circuits",
    prevTopicTitle: "Multiplexers (MUX) and De-multiplexers (DEMUX)",
    nextTopicId: "digital-latches-flipflops",
    nextTopicTitle: "Latches and Flip-Flops (SR, D, JK, T Flip-Flops)",
  },
  {
    id: "digital-latches-flipflops",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.9",
    title: "Latches and Flip-Flops (SR, D, JK, T Flip-Flops)",
    readTimeMinutes: 12,
    why: "Combinational logic circuits cannot remember anything: once inputs are removed, the output disappears. Sequential circuits introduce memory and feedback, allowing digital systems to store state, maintain CPU registers, and execute multi-step algorithms.",
    need: "If logic responded continuously to changing inputs at all times, signals would race uncontrollably. Latches are level-sensitive and transparent while enabled. Edge-triggered Flip-Flops solve this by sampling input data strictly on the instantaneous rising or falling edge of a clock, providing rock-solid synchronization.",
    whatYouWillLearn: [
      "Level-triggered Latches vs Edge-triggered Flip-Flops",
      "SR Latch invalid state ($S=1, R=1$) and resolution via JK Flip-Flop",
      "D Flip-Flop (Data storage) and T Flip-Flop (Toggle / Frequency divider)",
      "Clock edge triggering (rising edge vs falling edge)",
      "Timing constraints: Setup time ($t_{su}$), Hold time ($t_h$), and Metastability",
    ],
    prerequisites: "Logic gates, truth tables, and propagation delay (Topic 4.3).",
    conceptExplanation:
      "A bistable multivibrator is a circuit with two stable states (0 and 1) maintained through internal feedback:\n\n### 1. Latches vs Flip-Flops\n- **Latch**: **Level-sensitive**. As long as Enable = 1, output $Q$ continuously follows input $D$ (transparent).\n- **Flip-Flop**: **Edge-sensitive**. Changes state strictly on the active transition of the clock (e.g. rising edge from 0 to 1). Stable between clock edges.\n\n### 2. Core Flip-Flop Types\n1. **SR Flip-Flop**: Set ($S=1, R=0 \\implies Q=1$), Reset ($S=0, R=1 \\implies Q=0$), Hold ($S=0, R=0 \\implies Q_{next} = Q$). $S=1, R=1$ is invalid.\n2. **D Flip-Flop (Data)**: Eliminates invalid states by making $R = \\overline{S}$. $Q_{next} = D$. The universal building block for CPU registers.\n3. **JK Flip-Flop**: Resolves SR invalid state: when $J=1, K=1$, output toggles ($Q_{next} = \\overline{Q}$).\n4. **T Flip-Flop (Toggle)**: Toggles state on every clock pulse when $T=1$. Divides input clock frequency by exactly 2!\n\n### 3. Critical Timing Parameters\n- **Setup Time ($t_{su}$)**: Minimum duration input data must remain stable *before* the clock edge.\n- **Hold Time ($t_h$)**: Minimum duration input data must remain stable *after* the clock edge.\n- **Metastability**: Occurs when $t_{su}$ or $t_h$ is violated, causing the flip-flop to oscillate between 0 and 1 unpredictably.",
    howItWorks: [
      {
        step: "Bistable Feedback",
        detail: "Cross-coupling two NOR or NAND gates creates two stable operating points: state 0 (Q=0, Q'=1) or state 1 (Q=1, Q'=0).",
      },
      {
        step: "Edge Sampling",
        detail: "On the instant of the positive clock edge, input D is latched into internal memory and presented at Q.",
      },
      {
        step: "Frequency Division",
        detail: "Tying ~Q back to D on a D flip-flop toggles Q on every clock edge, halving the input frequency.",
      },
    ],
    practicalExample: {
      title: "Frequency Divider and Switch Debouncer",
      description: "Using D flip-flop as a divide-by-2 clock divider, and SR latch as a switch debouncer.",
      codeOrSpec: `Divide-by-2 Frequency Divider:
Connect D flip-flop inverted output (~Q) to data input (D).
Clock Input: 100 MHz square wave.

Timing Diagram:
Clock:  _   _   _   _   _   _
      _| |_| |_| |_| |_| |_| |_
Q Out: ____        ____        
      |    |______|    |______
      <- T_out = 2 * T_clk ->

Output Frequency = 100 MHz / 2 = 50 MHz.
Duty cycle is perfectly 50%.`,
      language: "text",
      output: "F_out = 50 MHz from a 100 MHz input clock.",
      explanation:
        "Toggling output on every rising edge cleanly divides the frequency by 2, forming the basis for binary counters.",
    },
    commonMistakes: [
      {
        mistake: "Asserting Set and Reset simultaneously on an SR latch ($S=1, R=1$).",
        fix: "In a NOR SR latch, S=1 and R=1 forces both Q and ~Q to 0. When released together, the latch enters a metastable race condition. Use a D or JK flip-flop instead.",
      },
      {
        mistake: "Violating Setup and Hold times when sampling asynchronous external signals (like pushbuttons).",
        fix: "Always pass external asynchronous inputs through a 2-stage D flip-flop synchronizer chain to eliminate metastability.",
      },
    ],
    quickRevision: [
      "Latches are level-sensitive; Flip-Flops are edge-sensitive.",
      "D Flip-Flop: $Q_{next} = D$. The primary building block of registers and memory.",
      "JK Flip-Flop: $J=1, K=1$ toggles output cleanly.",
      "T Flip-Flop: toggles when $T=1$; divides clock frequency by 2.",
      "Setup ($t_{su}$) and Hold ($t_h$) times must be satisfied to prevent metastability.",
    ],
    checkUnderstanding: [
      {
        question: "What happens in a JK flip-flop when both J and K inputs are held HIGH (1) during an active clock edge?",
        options: ["Output resets to 0", "Output sets to 1", "Output toggles to its opposite state", "Output enters an invalid, forbidden state"],
        answer: "Output toggles to its opposite state",
        explanation: "When J=1 and K=1, the characteristic equation yields Q_next = ~Q, toggling the output cleanly.",
      },
      {
        question: "If a 40 MHz clock signal is fed into a T flip-flop with T tied to 1, what is the output frequency at Q?",
        options: ["80 MHz", "40 MHz", "20 MHz", "10 MHz"],
        answer: "20 MHz",
        explanation: "A toggling flip-flop divides the input clock frequency by 2: 40 MHz / 2 = 20 MHz.",
      },
    ],
    prevTopicId: "digital-decoders-encoders",
    prevTopicTitle: "Decoders, Encoders and Priority Encoders",
    nextTopicId: "digital-shift-registers",
    nextTopicTitle: "Registers and Shift Registers (SISO, SIPO, PISO, PIPO)",
  },
  {
    id: "digital-shift-registers",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.10",
    title: "Registers and Shift Registers (SISO, SIPO, PISO, PIPO)",
    readTimeMinutes: 11,
    why: "Single flip-flops only hold one bit. In practical computing, data is processed in multi-bit bytes and words. Shift registers allow converting data between parallel buses and serial communication wires (SPI, UART, USB).",
    need: "A processor working internally with 8-bit parallel bytes must transmit data over a single Wi-Fi antenna or USB wire. A Parallel-In Serial-Out (PISO) shift register serializes the word for transmission. At the receiving end, a Serial-In Parallel-Out (SIPO) register reconstructs the parallel byte.",
    whatYouWillLearn: [
      "Register fundamentals: multi-bit data storage using parallel D flip-flops",
      "Four shift register modes: SISO, SIPO, PISO, and PIPO",
      "Universal Shift Registers (e.g., 74HC194) and bidirectional shifting",
      "Ring counters and Johnson (Twisted-Ring) counters",
      "Serial communication interfacing (SPI and UART data serialization)",
    ],
    prerequisites: "Flip-flops and clock edge triggering (Topic 4.9).",
    conceptExplanation:
      "A register is an array of flip-flops sharing a common clock. An $n$-bit shift register cascades $n$ flip-flops so output $Q_k$ connects to input $D_{k+1}$. On each clock edge, bits shift by one position.\n\n### The Four Primary Modes\n1. **SISO (Serial-In, Serial-Out)**: Accepts data bit-by-bit over 1 wire and outputs bit-by-bit. Acts as a digital delay line.\n2. **SIPO (Serial-In, Parallel-Out)**: Receives a stream of bits serially over 1 wire and presents all $n$ bits simultaneously on parallel output pins (used in serial communications receivers like SPI).\n3. **PISO (Parallel-In, Serial-Out)**: Loads all $n$ bits simultaneously from a parallel bus and shifts them out bit-by-bit over 1 wire (UART/SPI transmitters).\n4. **PIPO (Parallel-In, Parallel-Out)**: Standard internal CPU register (e.g. Accumulator, General Purpose Register) that loads and reads all bits in parallel in a single clock cycle.\n\n### Specialized Shift Counters\n- **Ring Counter**: An $n$-bit shift register with output $Q_{n-1}$ fed back to input $D_0$. Circulates a single 1, providing $n$ unique states.\n- **Johnson Counter**: Feeds the inverted output $\\overline{Q_{n-1}}$ back into $D_0$. Provides $2n$ decoded states using only $n$ flip-flops.",
    howItWorks: [
      {
        step: "Parallel Load",
        detail: "When Load signal is asserted, multi-bit data is clocked into all flip-flops simultaneously in 1 cycle.",
      },
      {
        step: "Serial Shift",
        detail: "When Shift is active, each clock pulse shifts bits one step to the right: Q0 -> Q1 -> Q2 -> Q3.",
      },
      {
        step: "Parallel Output",
        detail: "In SIPO, after n clock cycles, all n outputs are sampled simultaneously by the host CPU.",
      },
    ],
    practicalExample: {
      title: "4-bit Serial-In Parallel-Out (SIPO) Shift Operation",
      description: "Loading binary pattern '1101' serially into a 4-bit SIPO shift register.",
      codeOrSpec: `Initial state: Q3 Q2 Q1 Q0 = 0000
Input stream (arriving LSB first): 1, 0, 1, 1

Clock 1: Shift in '1' -> Q3 Q2 Q1 Q0 = 1000
Clock 2: Shift in '0' -> Q3 Q2 Q1 Q0 = 0100
Clock 3: Shift in '1' -> Q3 Q2 Q1 Q0 = 1010
Clock 4: Shift in '1' -> Q3 Q2 Q1 Q0 = 1101

After 4 clock cycles:
All 4 bits (1101) are simultaneously available on parallel output pins!`,
      language: "text",
      output: "Serial bitstream 1-0-1-1 converted into parallel nibble 1101 in exactly 4 clock cycles.",
      explanation:
        "This is the exact operating principle of the 74HC595 shift register commonly used to expand microcontroller GPIO outputs.",
    },
    commonMistakes: [
      {
        mistake: "Reading SIPO outputs before all $n$ bits have been shifted in.",
        fix: "A SIPO register requires exactly $n$ clock cycles to load an $n$-bit word. Reading early yields incomplete, shifted data.",
      },
      {
        mistake: "Forgetting to initialize a Ring counter with a single '1'.",
        fix: "If a ring counter starts in state 0000, shifting zeroes simply keeps it at 0000 forever. Use a Reset/Preset network to initialize state to 0001.",
      },
    ],
    quickRevision: [
      "Shift registers convert between serial and parallel representations.",
      "SISO: 1 wire in, 1 wire out (delay line).",
      "SIPO: Serial in, parallel out (SPI/UART receiver).",
      "PISO: Parallel in, serial out (SPI/UART transmitter).",
      "PIPO: Parallel in, parallel out (CPU registers, 1-cycle operation).",
      "Johnson counter provides $2n$ states using $n$ flip-flops.",
    ],
    checkUnderstanding: [
      {
        question: "How many clock cycles are required to serially load an 8-bit byte into an 8-bit SIPO shift register?",
        options: ["1 clock cycle", "4 clock cycles", "8 clock cycles", "16 clock cycles"],
        answer: "8 clock cycles",
        explanation: "In serial loading, exactly 1 bit is shifted in per clock cycle, requiring 8 clock cycles for 8 bits.",
      },
      {
        question: "How many unique decoded states does a 4-bit Johnson (Twisted Ring) counter produce?",
        options: ["4 states", "8 states", "16 states", "2 states"],
        answer: "8 states",
        explanation: "An n-bit Johnson counter produces 2n states. For n = 4: 2 * 4 = 8 unique states.",
      },
    ],
    prevTopicId: "digital-latches-flipflops",
    prevTopicTitle: "Latches and Flip-Flops (SR, D, JK, T Flip-Flops)",
    nextTopicId: "digital-counters-registers",
    nextTopicTitle: "Synchronous and Asynchronous Counters (Mod-N, Up/Down Counters)",
  },
  {
    id: "digital-counters-registers",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.11",
    title: "Synchronous and Asynchronous Counters (Mod-N, Up/Down Counters)",
    readTimeMinutes: 12,
    why: "Counters govern timing in digital electronics: dividing high-frequency quartz crystal oscillations down to 1-second ticks for digital clocks, generating PWM signals for motor control, and driving program counters (PC) in microprocessors.",
    need: "Asynchronous (Ripple) counters are simple to wire but suffer from cumulative propagation delay, causing false glitch spikes when decoding counts. Synchronous counters clock all flip-flops together, enabling ultra-fast, glitch-free counting.",
    whatYouWillLearn: [
      "Asynchronous (Ripple) counters and the cumulative delay bottleneck",
      "Synchronous binary counters: common clocking and carry enable logic",
      "Modulo-N (MOD-N) counters: designing counters that reset after N states",
      "Up/Down reversible counters (e.g., 74HC191)",
      "Decoding glitches and avoiding asynchronous reset hazards",
    ],
    prerequisites: "Flip-flops, T flip-flop toggle behavior, and shift registers (Topics 4.9 and 4.10).",
    conceptExplanation:
      "A counter cycles through a predetermined sequence of binary states upon receiving clock pulses.\n\n### 1. Modulus (MOD-N)\nThe number of unique states a counter visits before repeating. An $n$-flip-flop counter has a maximum modulus of $2^n$ (e.g. 4 flip-flops count MOD-16: 0 through 15).\n\n### 2. Asynchronous (Ripple) Counters\n- The external clock connects ONLY to Flip-Flop 0.\n- Output $Q$ of Flip-Flop 0 clocks Flip-Flop 1, and so on.\n- **Bottleneck**: Cumulative propagation delay ($n \\cdot t_{pd}$). High-order bits change much later than low-order bits, creating brief false intermediate states ('glitches').\n\n### 3. Synchronous Counters\n- Master clock connects directly to the clock input of **every flip-flop** simultaneously.\n- All state transitions occur at the exact same instant.\n- Logic AND gates enable toggling only when all lower-order bits are 1.\n- Glitch-free and capable of operating at hundreds of megahertz.\n\n### 4. MOD-N Design\nTo design a counter with modulus $N < 2^n$ (e.g. a MOD-10 decade counter 0-9), decode binary state $N$ (1010 for 10) with a NAND gate and assert the asynchronous clear line to reset back to 0000.",
    howItWorks: [
      {
        step: "Synchronous Enable",
        detail: "FF0 toggles every clock. FF1 toggles when Q0=1. FF2 toggles when Q0=1 AND Q1=1. FF3 toggles when Q0=Q1=Q2=1.",
      },
      {
        step: "Count Increment",
        detail: "On each active clock edge, the binary value increments by 1 cleanly across all outputs.",
      },
      {
        step: "Modulo Reset",
        detail: "When count reaches N (e.g. 10), feedback logic resets all flip-flops to 0, creating a MOD-N cycle.",
      },
    ],
    practicalExample: {
      title: "Design of a MOD-10 BCD Decade Counter (0 to 9)",
      description: "Counter counts from 0000 (0) through 1001 (9) and resets to 0000 on count 10.",
      codeOrSpec: `State Sequence: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 0 (repeat)
Required Flip-Flops: 2^n >= 10 -> n = 4 flip-flops (Q3, Q2, Q1, Q0)

Synchronous Logic Equations:
- FF0: Toggles on every clock: T0 = 1
- FF1: Toggles when Q0=1 (except at state 9 where it stays 0): T1 = Q0 · ~Q3
- FF2: Toggles when Q0=1 and Q1=1: T2 = Q0 · Q1
- FF3: Toggles when (Q0·Q1·Q2) or at state 9: T3 = (Q0 · Q1 · Q2) + (Q0 · Q3)

State Table:
Clock | Q3 Q2 Q1 Q0 | Decimal
0     |  0  0  0  0 | 0
1     |  0  0  0  1 | 1
...   |  ...        | ...
8     |  1  0  0  0 | 8
9     |  1  0  0  1 | 9
10    |  0  0  0  0 | 0 (Synchronous Rollover)`,
      language: "text",
      output: "BCD sequence 0-9 generated synchronously with zero ripple delay.",
      explanation:
        "Synchronous rollover ensures that digital clocks driven by 60-second or 10-decimal counters switch cleanly without intermediate decode spikes.",
    },
    commonMistakes: [
      {
        mistake: "Using ripple counters in high-speed address decoders.",
        fix: "Ripple counters produce decoding glitches during transitions like 0111 -> 1000 where intermediate states like 0110 flash briefly, causing false chip-select triggers.",
      },
      {
        mistake: "Calculating modulus incorrectly: forgetting that an $n$-bit counter has maximum modulus $2^n$.",
        fix: "To count up to $N$, choose $n$ such that $2^n \\ge N$. For MOD-12, $2^3 = 8 < 12$, so 4 flip-flops ($2^4 = 16$) are needed.",
      },
    ],
    quickRevision: [
      "Modulus = total number of unique states in the counting cycle.",
      "Asynchronous (Ripple) counters: flip-flops clock from prior stages; simple but prone to cumulative delay.",
      "Synchronous counters: all flip-flops share the same clock; glitch-free and ultra-fast.",
      "A MOD-N counter divides the input clock frequency by exactly N.",
    ],
    checkUnderstanding: [
      {
        question: "How many flip-flops are required to design a MOD-12 counter?",
        options: ["3 flip-flops", "4 flip-flops", "6 flip-flops", "12 flip-flops"],
        answer: "4 flip-flops",
        explanation: "Formula: 2^n >= Modulus. For 3 flip-flops, 2^3 = 8 (insufficient for 12). For 4 flip-flops, 2^4 = 16 >= 12, so 4 flip-flops are required.",
      },
      {
        question: "What is the primary advantage of a Synchronous Counter over an Asynchronous (Ripple) Counter?",
        options: [
          "It uses fewer logic gates",
          "All flip-flops are clocked simultaneously, eliminating cumulative ripple delay and glitch spikes",
          "It requires no power supply",
          "It can only count downwards",
        ],
        answer: "All flip-flops are clocked simultaneously, eliminating cumulative ripple delay and glitch spikes",
        explanation: "A common clock synchronizes all output transitions to the exact same instant, eliminating ripple delay.",
      },
    ],
    prevTopicId: "digital-shift-registers",
    prevTopicTitle: "Registers and Shift Registers (SISO, SIPO, PISO, PIPO)",
    nextTopicId: "digital-fsm-state-machines",
    nextTopicTitle: "Finite State Machines (FSM): Mealy & Moore Models",
  },
  {
    id: "digital-fsm-state-machines",
    stageId: "digital-electronics",
    stageTitle: "Digital Electronics",
    serial: "4.12",
    title: "Finite State Machines (FSM): Mealy & Moore Models",
    readTimeMinutes: 14,
    why: "How does a traffic light controller sequence lights based on pedestrian buttons? How does a vending machine remember coin totals before dispensing drinks? How does a CPU control unit execute instruction cycles (Fetch -> Decode -> Execute -> Writeback)? All of these systems are designed as Finite State Machines (FSMs).",
    need: "Designing sequential control logic ad-hoc with random gates and flip-flops produces unmaintainable, buggy hardware with deadlocks and glitches. FSM design provides a systematic 6-step engineering methodology: Specification -> State Diagram -> State Table -> State Encoding -> Next-State K-Maps -> Synthesized Circuit.",
    whatYouWillLearn: [
      "Mealy vs Moore state machine models and output timing differences",
      "Constructing State Transition Diagrams and State Tables",
      "State encoding strategies: Binary, Gray code, and One-Hot encoding",
      "Sequence detector design (overlapping vs non-overlapping bit patterns)",
      "Hardware synthesis using D flip-flops and combinational next-state logic",
    ],
    prerequisites: "K-Maps (4.5), D Flip-Flops (4.9), and registers (4.10).",
    conceptExplanation:
      "A Finite State Machine is a computational model consisting of a finite number of **states**, **inputs**, **outputs**, and **transitions** between states triggered by clock edges.\n\n### 1. Moore vs Mealy Models\n- **Moore Machine**: Outputs depend **ONLY on the current state**.\n  - Synchronous to clock; clean and completely immune to asynchronous input glitches.\n  - Often requires more states ($N+1$).\n- **Mealy Machine**: Outputs depend on **BOTH current state AND current inputs**.\n  - Outputs can respond immediately within the clock cycle.\n  - Typically requires fewer states ($N$), but asynchronous input noise can produce output glitches.\n\n### 2. State Encoding Techniques\nTo represent $S$ states using binary flip-flops ($2^n \\ge S$):\n1. **Binary Encoding**: Uses minimum flip-flops ($n = \\lceil \\log_2 S \\rceil$). Saves flip-flops, but next-state logic requires wider gates.\n2. **Gray Code**: Adjacent states differ by 1 bit, minimizing switching power and glitches.\n3. **One-Hot Encoding**: Allocates **one dedicated flip-flop per state** (e.g. 4 states = 4 flip-flops: `0001`, `0010`, `0100`, `1000`). Very popular in FPGAs because next-state decoding requires virtually zero logic gates, enabling maximum clock speed.",
    howItWorks: [
      {
        step: "State Memory",
        detail: "Current state is preserved across clock cycles in a register bank of D flip-flops.",
      },
      {
        step: "Next-State Logic",
        detail: "Combinational logic evaluates current state bits and external inputs to compute the next state vector.",
      },
      {
        step: "State Transition",
        detail: "On each active clock edge, next-state bits are latched into flip-flops, advancing the state machine.",
      },
      {
        step: "Output Generation",
        detail: "Outputs are decoded from state flip-flops (Moore) or state flip-flops combined with inputs (Mealy).",
      },
    ],
    practicalExample: {
      title: "Design of a 101 Sequence Detector (Mealy Model, Overlapping)",
      description: "Detects the binary sequence '101' arriving serially on input X. Output Z pulses HIGH when 101 is found.",
      codeOrSpec: `States Defined:
- S0 (Idle / Reset): No matching bits. (Binary code: 00)
- S1 (Got '1'): Last bit received was 1. (Binary code: 01)
- S2 (Got '10'): Last two bits received were 10. (Binary code: 10)

State Transition & Output Table:
Present State | Next State (X=0) / Z | Next State (X=1) / Z
S0 (00)       | S0 (00) / 0          | S1 (01) / 0
S1 (01)       | S2 (10) / 0          | S1 (01) / 0
S2 (10)       | S0 (00) / 0          | S1 (01) / 1 <-- 101 Detected!

Synthesized Equations (using D Flip-Flops Q1, Q0):
D1 = Q0 · ~X
D0 = X
Output Z = Q1 · X

Bitstream Simulation:
Input X:    0  1  0  1  0  1  1
State:     S0 S1 S2 S1 S2 S1 S1
Output Z:   0  0  0  1  0  1  0  (Two overlapping '101' sequences detected!)`,
      language: "text",
      output: "Output Z pulses HIGH on clock cycles 4 and 6, recognizing overlapping '101' sequences.",
      explanation:
        "By transitioning back to S1 instead of S0 after detecting 101, the trailing '1' of the first sequence serves as the leading '1' of the next sequence.",
    },
    commonMistakes: [
      {
        mistake: "Failing to handle unused binary states in state assignment.",
        fix: "If an FSM has 5 states, it requires 3 flip-flops (8 possible states). Unused states (5, 6, 7) must be explicitly mapped to reset to prevent electrostatic noise from locking the machine in a deadlock.",
      },
      {
        mistake: "Assuming Mealy machine outputs are always glitch-free.",
        fix: "In a Mealy machine, output Z depends directly on input X. Any glitch on X immediately glitches Z. Use a Moore machine or register the output if glitch immunity is needed.",
      },
    ],
    quickRevision: [
      "Moore FSM: Output depends ONLY on current state (glitch-free, synchronous).",
      "Mealy FSM: Output depends on current state AND inputs (responds faster, often 1 fewer state).",
      "One-Hot encoding uses 1 flip-flop per state, ideal for high-speed FPGAs.",
      "Overlapping detectors allow the end of one match to start the next match.",
      "Always design safe fallback transitions for unused binary state codes.",
    ],
    checkUnderstanding: [
      {
        question: "How does a Moore state machine differ fundamentally from a Mealy state machine?",
        options: [
          "A Moore machine produces analog voltage outputs",
          "A Moore machine output depends strictly on the current state, whereas a Mealy output depends on both current state and current inputs",
          "A Moore machine has no clock input",
          "A Mealy machine cannot detect sequences",
        ],
        answer: "A Moore machine output depends strictly on the current state, whereas a Mealy output depends on both current state and current inputs",
        explanation: "Moore outputs depend exclusively on the state flip-flop contents, making them synchronous and glitch-free.",
      },
      {
        question: "How many flip-flops are required to implement a 6-state FSM using One-Hot encoding?",
        options: ["3 flip-flops", "6 flip-flops", "8 flip-flops", "12 flip-flops"],
        answer: "6 flip-flops",
        explanation: "One-Hot encoding dedicates exactly one flip-flop to each individual state: 6 states require 6 flip-flops.",
      },
    ],
    prevTopicId: "digital-counters-registers",
    prevTopicTitle: "Synchronous and Asynchronous Counters (Mod-N, Up/Down Counters)",
  },
];
