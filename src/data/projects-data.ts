export type ProjectCategory = "coding" | "verilog";
export type ProjectDifficulty = "Easy" | "Intermediate" | "Medium";

export interface DevelopmentMilestone {
  step: string;
  title: string;
  objective: string;
  tasks: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  difficulty: ProjectDifficulty;
  shortDescription: string;
  overview: string;
  whyBuild: string;
  prerequisites: string[];
  learningObjectives: string[];
  featuresAndRequirements: string[];
  suggestedTechStack: {
    core: string[];
    tools: string[];
    optionalHardware?: string[];
  };
  developmentMilestones: DevelopmentMilestone[];
  expectedDeliverables: string[];
  testingChecklist: string[];
  optionalStretchGoals: string[];
  skills: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  // ─── CODING PROJECTS ────────────────────────────────────────────────────────
  {
    id: "c-student-grade-calculator",
    title: "Student Grade Calculator",
    category: "coding",
    categoryLabel: "C Programming",
    difficulty: "Easy",
    shortDescription:
      "Build a console-based C program to input multi-subject marks, compute total and percentage, and assign academic letter grades using conditional logic.",
    overview:
      "The Student Grade Calculator is an essential introductory C programming project designed to build fluency in foundational programming constructs. Students develop an interactive command-line application that prompts for subject marks, validates user input boundaries (0 to 100), calculates aggregate totals and percentage scores with precision floating-point arithmetic, and assigns letter grades (A+, A, B, C, D, F) using structured if-else decision ladders.",
    whyBuild:
      "Writing reliable C programs requires mastering fundamental syntax: type modifiers, standard input/output formatting with scanf and printf, arithmetic operators, and branching control flow. This project provides practical hands-on reinforcement of these core C concepts while teaching defensive input validation and formatted terminal reporting.",
    prerequisites: [
      "Basic understanding of C syntax and structure of a `main()` function",
      "Knowledge of fundamental data types (`int`, `float`, `char`) and format specifiers (`%d`, `%f`, `%c`)",
      "Familiarity with arithmetic operators (`+`, `-`, `*`, `/`, `%`) and conditional operators (`>`, `<`, `==`, `&&`)",
      "Experience using a C compiler (GCC/Clang) via command line or IDE",
    ],
    skills: [
      "C Language",
      "Variables & Data Types",
      "Input / Output (scanf/printf)",
      "Arithmetic Operators",
      "Conditional Logic (if-else)",
      "Boundary Validation",
    ],
    learningObjectives: [
      "Declare and initialize scalar variables with appropriate types (`int` for counts, `float` for percentages)",
      "Accept, parse, and validate terminal inputs using `scanf` and format specifiers",
      "Perform mixed-type arithmetic and prevent integer truncation using explicit type casting (`(float)total / max`)",
      "Structure multi-branch conditional ladders (`if-else if-else`) to classify percentages into academic letter grades",
      "Format clean, aligned tabular report cards in the terminal using `printf` field width specifiers",
    ],
    featuresAndRequirements: [
      "Interactive Subject Input: Prompts the user to enter marks for multiple academic subjects (e.g., Mathematics, Physics, C Programming, Digital Electronics, and English)",
      "Input Boundary Validation: Rejects invalid scores below 0 or above 100, prompting re-entry until a valid mark is provided",
      "Aggregate Computation: Computes Total Marks, Maximum Possible Marks, and Percentage to 2 decimal places",
      "Grading Scale: Assigns grades based on percentage (>=90%: A+, 80-89%: A, 70-79%: B, 60-69%: C, 50-59%: D, <50%: F)",
      "Subject Pass/Fail Check: Identifies if any individual subject score is below the minimum passing threshold (e.g. 40 marks)",
      "Formatted Report Card: Prints an organized console receipt displaying subject names, marks, total, percentage, GPA equivalent, and final pass/fail status",
    ],
    suggestedTechStack: {
      core: ["C Language (C99 / C11 Standard)", "Standard C Library (stdio.h, stdlib.h)"],
      tools: ["GCC / Clang compiler (`gcc -Wall -Wextra`)", "VS Code / Command Line Terminal", "GDB Debugger"],
    },
    developmentMilestones: [
      {
        step: "Milestone 1",
        title: "Variable Setup & Input Gathering",
        objective: "Declare required variables, configure standard I/O streams, and collect student marks.",
        tasks: [
          "Declare integer variables for marks across 5 subjects, a total accumulator, and a float for percentage",
          "Prompt the user with clean terminal messages using `printf`",
          "Read values using `scanf` and store them in respective memory addresses using the address-of operator `&`",
        ],
      },
      {
        step: "Milestone 2",
        title: "Input Validation Loop",
        objective: "Implement defensive loops that reject out-of-range marks and prevent bogus calculations.",
        tasks: [
          "Wrap each mark input in a `while` or `do-while` validation loop",
          "Check the condition `marks < 0 || marks > 100` and display a clear error message on invalid input",
          "Ensure the program only advances to the next subject once valid marks are provided",
        ],
      },
      {
        step: "Milestone 3",
        title: "Computation & Grade Assignment Logic",
        objective: "Calculate totals, compute percentage with type casting, and assign letter grades.",
        tasks: [
          "Compute `total = m1 + m2 + m3 + m4 + m5` and maximum possible marks (e.g. 500)",
          "Calculate `percentage = ((float)total / max_marks) * 100.0f` avoiding integer truncation",
          "Construct the `if-else if-else` chain to determine letter grade (A+, A, B, C, D, F) and pass/fail flag",
        ],
      },
      {
        step: "Milestone 4",
        title: "Formatted Terminal Output & Report Card",
        objective: "Format a clean, bordered console report card summarizing performance.",
        tasks: [
          "Use format specifiers with width modifiers (e.g. `%-20s %3d`) to format a clean table",
          "Display subject-wise marks, aggregate total, percentage rounded to 2 decimal places (`%.2f%%`), and final grade",
          "Print an overall result banner: 'CONGRATULATIONS: PASSED' or 'ACADEMIC WARNING: FAILED'",
        ],
      },
    ],
    expectedDeliverables: [
      "`grade_calculator.c`: Well-commented, compilable C source code following clean coding conventions",
      "Compilation instructions documenting flags (`gcc -Wall -Wextra -O2 grade_calculator.c -o grade_calc`)",
      "Sample terminal output transcripts demonstrating valid inputs, error handling, and generated report cards",
    ],
    testingChecklist: [
      "Verify entering marks 85, 90, 78, 88, 92 correctly produces Total = 433/500 and Percentage = 86.60% (Grade A)",
      "Verify entering a negative value (e.g. -5) or value > 100 (e.g. 105) triggers a validation error message",
      "Verify floating-point percentage calculation does not suffer from integer division truncation (e.g. 350 / 500 = 70.00%)",
      "Verify entering a failing mark (e.g. 35 in one subject) flags the student as failed even if aggregate percentage is above 50%",
      "Verify boundary scores (exactly 90, 80, 70, 60, 50, 40) fall into the correct grade bracket",
    ],
    optionalStretchGoals: [
      "Allow the user to specify a dynamic number of subjects (using a fixed-size array and loop) instead of hardcoding 5",
      "Compute cumulative GPA on a 10.0 scale and display class rank / honors distinction",
      "Export the generated report card to a text file (`report_card.txt`) using basic `fopen` and `fprintf`",
    ],
  },
  {
    id: "c-student-record-management",
    title: "Student Record Management System",
    category: "coding",
    categoryLabel: "C Programming",
    difficulty: "Medium",
    shortDescription:
      "Develop a persistent student database in C using custom structures, arrays, pointers, functions, and binary file I/O for full CRUD operations.",
    overview:
      "The Student Record Management System is the benchmark intermediate C project that bridges basic programming with production software architecture. Students architect a menu-driven management console to add, display, search, update, and delete student records. The system models student entities using `struct`, optimizes data passing via pointers, organizes program logic into modular functions, and serializes records to disk storage using binary file streams (`fopen`, `fread`, `fwrite`, `fclose`).",
    whyBuild:
      "Mastering C structures, pointer indirection, and file persistence is the single most tested skill set in embedded systems and systems programming interviews. This project demonstrates you can model real-world data, manage memory safely, and build robust software that persists data across application sessions.",
    prerequisites: [
      "Proficiency with C functions, arrays, and parameter passing by value vs reference",
      "Understanding custom composite types (`struct` and `typedef`)",
      "Understanding pointers and the arrow operator (`ptr->member`)",
      "Familiarity with standard C file I/O (`fopen`, `fread`, `fwrite`, `fseek`, `fclose`)",
    ],
    skills: [
      "C Language",
      "Structures (struct)",
      "Arrays & Pointers",
      "Functions & Modularity",
      "File Handling (Binary I/O)",
      "CRUD Operations",
    ],
    learningObjectives: [
      "Design a normalized data model using `typedef struct` encapsulating roll numbers, names, departments, and GPAs",
      "Write modular, single-responsibility functions for each CRUD operation",
      "Pass structures to functions using pointers (`Student *s`) to eliminate unnecessary memory copying",
      "Implement persistent binary file storage with `fwrite` and `fread` to retain records across restarts",
      "Implement search and in-place record updates by matching unique identifiers (Roll Numbers)",
    ],
    featuresAndRequirements: [
      "Student Entity Model: `struct Student` containing `int roll_no`, `char name[50]`, `char dept[20]`, `int semester`, and `float cgpa`",
      "Interactive Console Menu: Loop-driven menu with numbered options: 1. Add Record, 2. View All, 3. Search, 4. Update, 5. Delete, 6. Exit",
      "Add Student Record: Appends a new record to the file with duplicate roll number validation",
      "View All Records: Formats and displays all stored student records in an aligned terminal table",
      "Search Record: Quickly locate and display student details by unique Roll Number or partial Name search",
      "Update Record: Modify a student's department, semester, or CGPA while preserving their unique roll number",
      "Delete Record: Safely remove a record from the file using temporary file rewriting technique",
      "Permanent Persistence: Records are stored in a binary file (`students.dat`) and remain intact after closing the program",
    ],
    suggestedTechStack: {
      core: ["C Language (C99 / C11 Standard)", "Standard C Library (stdio.h, stdlib.h, string.h)"],
      tools: ["GCC Compiler (`gcc -Wall -Wextra`)", "Make / Makefile", "GDB Debugger", "Valgrind (memory leak detection)"],
    },
    developmentMilestones: [
      {
        step: "Milestone 1",
        title: "Data Structuring & Menu Shell",
        objective: "Define the student structure and build the interactive menu loop with switch-case dispatch.",
        tasks: [
          "Define `typedef struct { int roll_no; char name[50]; char dept[20]; int semester; float cgpa; } Student;`",
          "Build interactive `while(1)` menu loop displaying options (Add, View, Search, Update, Delete, Exit)",
          "Implement clean input buffer flushing using `getchar()` to prevent newline skipping issues",
        ],
      },
      {
        step: "Milestone 2",
        title: "Record Insertion & Binary File Writing",
        objective: "Implement the Add Record function with duplicate roll number prevention and file appending.",
        tasks: [
          "Prompt for student details and validate inputs (positive roll number, CGPA between 0.0 and 10.0)",
          "Scan the file to ensure the roll number does not already exist",
          "Open `students.dat` in `\"ab\"` (append binary) mode and write the structure using `fwrite(&student, sizeof(Student), 1, fp)`",
        ],
      },
      {
        step: "Milestone 3",
        title: "Record Retrieval & Search Operations",
        objective: "Implement functions to display all records and search for specific students by roll number.",
        tasks: [
          "Open file in `\"rb\"` mode and loop with `while(fread(&student, sizeof(Student), 1, fp) == 1)`",
          "Format all records in a structured tabular view with column headers and dividers",
          "Implement `searchRecord(int roll)` that stops reading and prints details when a matching roll number is found",
        ],
      },
      {
        step: "Milestone 4",
        title: "Record Modification & Safe Deletion",
        objective: "Enable updating existing records and deleting records using temporary file rewriting.",
        tasks: [
          "Implement `updateRecord()`: locate record via `fseek` or temp file rewrite and update modified fields",
          "Implement `deleteRecord()`: read all records from `students.dat`, write non-matching records to `temp.dat`, remove original, and rename temp",
          "Verify file handles are always closed with `fclose(fp)` to prevent file descriptor leaks",
        ],
      },
    ],
    expectedDeliverables: [
      "`student_management.c`: Clean, modular C source code containing all CRUD functions and comments",
      "`students.dat`: Sample binary data file generated during testing containing multiple records",
      "Documentation detailing program architecture, function specifications, and verification runs",
    ],
    testingChecklist: [
      "Verify adding multiple student records writes them to `students.dat` without file corruption",
      "Verify restarting the program and selecting 'View All Records' displays all previously stored students",
      "Verify searching for an existing roll number prints the exact student details; searching a non-existent roll number prints 'Record Not Found'",
      "Verify updating a student's CGPA updates the record correctly without altering other students' records",
      "Verify deleting a student removes the record from `students.dat` and reduces the total record count by 1",
      "Verify attempting to add a record with an existing roll number is rejected with a duplicate error message",
    ],
    optionalStretchGoals: [
      "Implement sorting: sort all records by Roll Number or CGPA descending before displaying",
      "Add CSV Export function (`exportToCSV()`) so student data can be opened in Microsoft Excel or Google Sheets",
      "Implement dynamic memory allocation (`malloc`/`free`) to load records into a linked list for fast in-memory queries",
    ],
  },

  // ─── VERILOG HDL PROJECTS ───────────────────────────────────────────────────
  {
    id: "verilog-logic-gate-simulator",
    title: "Basic Logic Gate Simulator",
    category: "verilog",
    categoryLabel: "Verilog HDL Project",
    difficulty: "Easy",
    shortDescription:
      "Design, model, and verify fundamental combinational logic gates (AND, OR, NOT, NAND, NOR, XOR) in Verilog HDL with automated testbench verification.",
    overview:
      "The Basic Logic Gate Simulator is the quintessential entry point into hardware description languages. In hardware engineering, digital circuits are designed in code and simulated before physical fabrication. In this project, students implement fundamental gates using continuous assignment and structural modeling, write self-checking testbenches that cycle through all input permutations, and verify waveform timing using open-source simulators.",
    whyBuild:
      "Core digital VLSI, ASIC, and FPGA interviews always start by probing candidates on Verilog syntax, truth table verification, propagation delays, and the difference between sequential and combinational logic. Completing this project guarantees mastery over basic module structure and simulation pipelines.",
    prerequisites: [
      "Understanding Boolean algebra and basic truth tables (AND, OR, NOT, XOR)",
      "Basic understanding of digital voltage levels ('0' = GND, '1' = VDD)",
      "A computer capable of running a free simulator (Icarus Verilog + GTKWave, ModelSim, or online EDA Playground)",
    ],
    skills: [
      "Verilog HDL",
      "Combinational Logic",
      "Truth Tables",
      "Testbench Creation",
      "Waveform Analysis",
      "Simulation Verification",
    ],
    learningObjectives: [
      "Write modular Verilog hardware code using `module`, `input`, `output`, and `endmodule`",
      "Implement combinational logic using continuous `assign` statements and bitwise operators (`&`, `|`, `~`, `^`, `~&`, `~|`)",
      "Write a testbench module utilizing `reg`, `wire`, `initial` blocks, and `#delay` units",
      "Generate Value Change Dump (`.vcd`) waveform traces and inspect them in GTKWave",
      "Implement self-checking assertions using `$display` and `$monitor` system tasks",
    ],
    featuresAndRequirements: [
      "Multi-Gate Functional Module: Implements 2-input AND, OR, NAND, NOR, XOR, XNOR, and 1-input NOT gates",
      "Configurable Bus Width: Use Verilog parameters to support scalable N-bit wide vector inputs",
      "Exhaustive Testbench: Applies all binary combinations (00, 01, 10, 11) with clean 10ns timing delays",
      "Automated Assertion Check: Outputs 'TEST PASSED' or logs exact mismatched outputs to console using `$display`",
      "Simulator Compatibility: Runs cleanly on standard open-source tools (Icarus Verilog, Verilator, or EDA Playground)",
      "Optional Hardware Target: Can be mapped to switches and LEDs on any educational FPGA board (Basys 3, DE10, etc.)",
    ],
    suggestedTechStack: {
      core: ["Verilog HDL (IEEE 1364-2001 or 2005 standard)"],
      tools: [
        "Icarus Verilog (`iverilog`) — open-source simulation compiler",
        "GTKWave — open-source waveform visualization viewer",
        "EDA Playground (www.edaplayground.com) — zero-install browser simulation alternative",
      ],
      optionalHardware: [
        "Any basic FPGA development board (e.g., Digilent Basys 3, Altera DE10-Lite, Xilinx Spartan-7)",
        "Vivado WebPACK or Intel Quartus Prime Lite for physical synthesis (strictly optional)",
      ],
    },
    developmentMilestones: [
      {
        step: "Milestone 1",
        title: "Module Interface & Gate Modeling",
        objective: "Declare input/output ports and write continuous assignment equations for all 7 logic gates.",
        tasks: [
          "Create `logic_gates.v` defining inputs `a`, `b` and outputs `y_and`, `y_or`, `y_not`, `y_nand`, `y_nor`, `y_xor`",
          "Implement behavioral expressions using bitwise operators",
          "Ensure no latch inference (strictly pure combinational assignments)",
        ],
      },
      {
        step: "Milestone 2",
        title: "Testbench Stimulus Generator",
        objective: "Write a comprehensive testbench applying all 4 input combinations with timing delays.",
        tasks: [
          "Create `logic_gates_tb.v` declaring `reg` registers for driving inputs and `wire` nets for observing outputs",
          "Instantiate Device Under Test (DUT) using named port mapping",
          "Write an `initial` block with `#10` delays between stimulus changes",
        ],
      },
      {
        step: "Milestone 3",
        title: "Waveform Dump & Simulation Execution",
        objective: "Compile with Icarus Verilog, generate .vcd dump file, and verify signals in GTKWave.",
        tasks: [
          "Add `$dumpfile(\"dump.vcd\");` and `$dumpvars(0, logic_gates_tb);` to testbench",
          "Compile with `iverilog -o sim.out logic_gates.v logic_gates_tb.v` and execute `vvp sim.out`",
          "Open `dump.vcd` in GTKWave and visually confirm transition curves against truth tables",
        ],
      },
      {
        step: "Milestone 4",
        title: "Automated Self-Checking Assertions",
        objective: "Eliminate manual waveform inspection by programming automated console verification checks.",
        tasks: [
          "Add conditional `if` checks after each delay comparing actual output against expected Boolean value",
          "Format console output using `$display(\"Time=%0t: a=%b b=%b | AND=%b (Expected=%b)\", $time, a, b, y_and, a&b)`",
          "Print a final summary banner confirming all test cases passed successfully",
        ],
      },
    ],
    expectedDeliverables: [
      "`logic_gates.v`: Synthesizable Verilog module implementing all standard gates",
      "`logic_gates_tb.v`: Complete self-checking testbench with VCD waveform generation",
      "Waveform screen capture or log file demonstrating all 4 input states verified without errors",
      "Brief engineering report summarizing truth table results and simulator commands used",
    ],
    testingChecklist: [
      "Verify input (0, 0) yields AND=0, OR=0, NAND=1, NOR=1, XOR=0",
      "Verify input (0, 1) yields AND=0, OR=1, NAND=1, NOR=0, XOR=1",
      "Verify input (1, 0) yields AND=0, OR=1, NAND=1, NOR=0, XOR=1",
      "Verify input (1, 1) yields AND=1, OR=1, NAND=0, NOR=0, XOR=0",
      "Confirm `$finish` cleanly terminates the simulation without hanging in infinite loops",
    ],
    optionalStretchGoals: [
      "Parameterize the module so the bus width `WIDTH` can be set to 4-bit, 8-bit, or 16-bit at instantiation",
      "Synthesize the design onto physical FPGA slide switches and LEDs using a basic `.xdc` / `.qsf` constraints file",
      "Implement a 2-to-1 Multiplexer module built exclusively using your basic logic gate submodules",
    ],
  },
  {
    id: "verilog-traffic-light-controller",
    title: "Traffic Light Controller",
    category: "verilog",
    categoryLabel: "Verilog HDL Project",
    difficulty: "Medium",
    shortDescription:
      "Design and implement a realistic 4-way intersection traffic light controller using a Finite State Machine (FSM), digital timer counters, and reset synchronization in Verilog HDL.",
    overview:
      "The Traffic Light Controller is the classic industry benchmark project for learning Finite State Machines (FSMs) in digital hardware design. Students model a multi-way intersection controller that cycles through Green, Yellow, and Red phases for North-South and East-West corridors. The system incorporates synchronous clock dividers, parameter-encoded state registers, pedestrian crossing sensor inputs, and state transition safety guards.",
    whyBuild:
      "FSM design (Mealy vs Moore machines, state encoding, synchronous reset) is the single most frequently asked technical topic in semiconductor hardware interviews (Intel, Qualcomm, Texas Instruments, AMD, NVIDIA). Building this project proves you can design rock-solid, glitch-free sequential state machines.",
    prerequisites: [
      "Basic Verilog syntax and combinational logic (Completed Basic Logic Gate project)",
      "Understanding clock edges, flip-flops, and the difference between blocking (`=`) and non-blocking (`<=`) assignments",
      "Familiarity with state diagrams and state tables",
    ],
    skills: [
      "Finite State Machines (FSM)",
      "State Diagrams",
      "Clock & Reset",
      "Counters & Timers",
      "Non-Blocking Assignments",
      "Testbench Verification",
    ],
    learningObjectives: [
      "Architect a robust 3-always-block Moore Finite State Machine (Next State logic, State Register, Output logic)",
      "Model synchronous and asynchronous reset mechanisms safely",
      "Implement parameterized digital counters to hold specific states for fixed duration clock cycles",
      "Safely encode states using parameters or localparams (`localparam [2:0] S_NS_GREEN = 3'b000; ...`)",
      "Prevent catastrophic intersection failure states (e.g. guaranteeing both highways never turn green simultaneously)",
    ],
    featuresAndRequirements: [
      "State Sequencing: North-South Green -> North-South Yellow -> All Red Safety -> East-West Green -> East-West Yellow -> All Red Safety",
      "Configurable Timing Delays: Green light = 10 clock cycles, Yellow light = 3 clock cycles, All-Red = 1 clock cycle",
      "Active-Low Synchronous Reset: Clears counters and forces controller safely into the All-Red state",
      "Sensor Input: Optional vehicle sensor on East-West road that skips East-West green if no waiting cars are present",
      "Fail-Safe Output Interlock: Strict hardware assertion guaranteeing that North-South and East-West can never both show Green/Yellow concurrently",
      "Comprehensive Testbench: Simulates multiple complete traffic cycles under normal and reset conditions",
    ],
    suggestedTechStack: {
      core: ["Verilog HDL (IEEE 1364-2001)"],
      tools: [
        "Icarus Verilog (`iverilog`) and GTKWave for simulation",
        "EDA Playground for online simulation",
      ],
      optionalHardware: [
        "Any FPGA development board (e.g., Basys 3, DE10-Lite) utilizing 6 onboard LEDs (Red, Yellow, Green for each road)",
        "Pushbutton switches for clock pulse or reset and vehicle sensor input",
      ],
    },
    developmentMilestones: [
      {
        step: "Milestone 1",
        title: "State Diagram & State Encoding",
        objective: "Formalize the 6 intersection states and draw the complete Mealy/Moore transition diagram.",
        tasks: [
          "Document state list: `NS_GREEN`, `NS_YELLOW`, `SAFETY_1`, `EW_GREEN`, `EW_YELLOW`, `SAFETY_2`",
          "Choose binary or one-hot state encoding using `localparam`",
          "Define timing table for each state duration in clock pulses",
        ],
      },
      {
        step: "Milestone 2",
        title: "Three-Always-Block FSM Architecture",
        objective: "Implement the synthesizable Verilog module using standard sequential/combinational design patterns.",
        tasks: [
          "Write Always Block 1 (Sequential): updates `current_state <= next_state` on `posedge clk` or reset",
          "Write Always Block 2 (Combinational Next-State): evaluates counter completion to select `next_state`",
          "Write Always Block 3 (Output Decode): sets 6 output light bits (`ns_r`, `ns_y`, `ns_g`, `ew_r`, `ew_y`, `ew_g`)",
        ],
      },
      {
        step: "Milestone 3",
        title: "Counter & Timer Integration",
        objective: "Embed an internal timer register to count clock cycles in the active state before triggering transition.",
        tasks: [
          "Add 4-bit `count` register that increments on each clock tick",
          "Clear `count` to zero on every state transition",
          "Verify state only transitions when `count == DURATION - 1`",
        ],
      },
      {
        step: "Milestone 4",
        title: "Testbench Verification & Waveform Validation",
        objective: "Simulate through at least 3 full traffic cycles and test asynchronous reset injection.",
        tasks: [
          "Generate continuous 50MHz clock generator (`always #10 clk = ~clk;`) in testbench",
          "Assert reset for first 25ns, release reset, and let simulation run for 500ns",
          "Verify in GTKWave that lights transition in strict sequence without overlapping green lights",
        ],
      },
    ],
    expectedDeliverables: [
      "`traffic_light_controller.v`: Synthesizable Verilog FSM with timer counters and fail-safe outputs",
      "`traffic_light_controller_tb.v`: Comprehensive testbench generating clock, reset, and sensor stimulus",
      "GTKWave waveform dump showing light transitions and timer resets",
      "State transition diagram included in project documentation",
    ],
    testingChecklist: [
      "Verify applying reset immediately forces controller into safe default state",
      "Verify North-South Green holds for exactly the configured duration before Yellow activates",
      "Verify North-South Yellow transitions to Red before East-West turns Green",
      "Verify under no condition do both roads display Green or Yellow at the same timestamp",
      "Verify vehicle sensor properly extends or skips the East-West cycle when modeled",
    ],
    optionalStretchGoals: [
      "Add an emergency vehicle sensor input that immediately forces all signals red and grants immediate priority green",
      "Implement a Clock Divider module that steps down an onboard 100MHz FPGA oscillator down to human-observable 1Hz clock",
      "Map outputs to a dual 7-segment display showing the countdown timer in seconds for the remaining green light phase",
    ],
  },
  {
    id: "verilog-uart-transceiver",
    title: "UART Transmitter and Receiver",
    category: "verilog",
    categoryLabel: "Verilog HDL Project",
    difficulty: "Medium",
    shortDescription:
      "Design and verify a full-duplex Universal Asynchronous Receiver-Transmitter (UART) core featuring baud rate generation, shift registers, start/stop bit framing, and FSM synchronization.",
    overview:
      "UART is the ubiquitous serial communication protocol used in microcontrollers, GPS modules, Bluetooth chips, and FPGA debugging bridges. Because UART is asynchronous, there is no shared clock transmitted over the wire. In this capstone hardware project, students design a complete UART subsystem: a precise Baud Rate Generator, an 8-bit Transmitter (TX) module with start/stop framing, and an oversampling Receiver (RX) module that reliably samples incoming bits in the center of the bit window.",
    whyBuild:
      "UART design is one of the most respected portfolio milestones for aspiring FPGA, VLSI, and Embedded hardware engineers. It showcases mastery across timing synchronization, metastable clock domain crossings, state machines, and shift registers—the core topics tested in hardware development interviews.",
    prerequisites: [
      "Solid Verilog FSM design skills (Completed Traffic Light Controller project)",
      "Understanding clock frequency division, serial data transmission, and shift registers",
      "Familiarity with baud rates (e.g. 9600, 115200 bps) and 8N1 serial protocol formatting",
    ],
    skills: [
      "Serial Communication",
      "Baud Rate Timing",
      "FSM Design",
      "Shift Registers",
      "Oversampling Techniques",
      "Full-Duplex Testbenches",
    ],
    learningObjectives: [
      "Calculate precise baud rate divider values: $\\text{Divider} = \\frac{f_{\\text{clk}}}{\\text{Baud Rate}}$",
      "Design a Transmitter FSM: Idle (`1`), Start Bit (`0`), 8 Data Bits (LSB first), Stop Bit (`1`)",
      "Design an 8x or 16x oversampling Receiver FSM that synchronizes to the falling edge of the Start bit",
      "Implement parallel-to-serial shift register (TX) and serial-to-parallel shift register (RX)",
      "Construct a loopback testbench where the TX output line drives the RX input line directly",
    ],
    featuresAndRequirements: [
      "Standard 8N1 Protocol: 1 Start bit (low), 8 Data bits, No parity, 1 Stop bit (high)",
      "Configurable Baud Rates: Parameterized baud generator supporting 9600, 19200, 38400, and 115200 bps",
      "TX Module: `tx_start` pulse triggers transmission; `tx_busy` flag signals ongoing serial shift",
      "RX Module: Accurately samples data in the middle of bit periods (at counter tick 7 of a 16x oversampler)",
      "Error Detection: Detects Framing Error if Stop Bit is not logic 1 at expected arrival time",
      "RX Data Ready: Pulses `rx_done` for 1 clock cycle when 8-bit parallel byte is ready in `rx_data`",
    ],
    suggestedTechStack: {
      core: ["Verilog HDL (IEEE 1364-2001)"],
      tools: [
        "Icarus Verilog (`iverilog`)",
        "GTKWave",
        "EDA Playground for browser testing",
      ],
      optionalHardware: [
        "Any FPGA development board (e.g. Digilent Basys 3 with FTDI USB-to-UART bridge)",
        "Serial terminal application on PC (PuTTY, Tera Term, minicom) communicating over real USB cable (strictly optional)",
      ],
    },
    developmentMilestones: [
      {
        step: "Milestone 1",
        title: "Baud Rate Generator Module",
        objective: "Design a parameter-based tick generator that pulses at standard baud rate intervals.",
        tasks: [
          "Create `baud_rate_gen.v` calculating divider counter based on input clock (e.g. 50MHz / 9600)",
          "Generate both 1x baud tick (for transmitter) and 16x oversampling tick (for receiver)",
          "Verify tick accuracy in simulation",
        ],
      },
      {
        step: "Milestone 2",
        title: "UART Transmitter (TX) FSM & Shift Register",
        objective: "Construct the parallel-in serial-out transmitter state machine.",
        tasks: [
          "Model TX states: `IDLE`, `START`, `DATA`, `STOP`",
          "On `tx_start`, load parallel `tx_data[7:0]` into shift register and drive `tx_line <= 0`",
          "Shift bits out LSB first on each baud tick, followed by Stop bit (`1`) and return to `IDLE`",
        ],
      },
      {
        step: "Milestone 3",
        title: "UART Receiver (RX) with Center-Sampling",
        objective: "Build the serial-in parallel-out receiver that detects falling edge and samples center of bit cells.",
        tasks: [
          "Double-flop `rx` input to prevent metastability",
          "Detect falling edge indicating potential Start bit; verify it remains low at mid-bit",
          "Sample incoming serial bits at mid-bit intervals and shift into 8-bit output register",
          "Assert `rx_done` flag and check valid stop bit",
        ],
      },
      {
        step: "Milestone 4",
        title: "Top-Level Loopback Testbench Verification",
        objective: "Connect TX output directly to RX input in a loopback testbench to verify end-to-end data transmission.",
        tasks: [
          "Create `uart_top.v` combining Baud Gen, TX, and RX modules",
          "Write `uart_tb.v` transmitting characters 'A' (0x41), 'Z' (0x5A), and random bytes",
          "Verify `rx_data` matches `tx_data` exactly and check timing in GTKWave",
        ],
      },
    ],
    expectedDeliverables: [
      "`baud_rate_gen.v`, `uart_tx.v`, `uart_rx.v`, and `uart_top.v` Verilog modules",
      "`uart_tb.v`: Self-checking testbench sending arbitrary byte arrays and asserting correctness",
      "Simulation waveform trace verifying 100% data integrity across transmitted bytes",
      "Architecture diagram detailing the TX and RX state machines and oversampling algorithm",
    ],
    testingChecklist: [
      "Verify TX line stays high (idle) when no transmission is requested",
      "Verify transmission begins with exactly 1 low Start bit and ends with at least 1 high Stop bit",
      "Verify transmitted bits match input byte LSB-first (bit 0 through bit 7)",
      "Verify Receiver correctly ignores noise spikes that do not hold low for half a bit period",
      "Verify full-duplex loopback simulation transmits and receives bytes without bit corruption",
    ],
    optionalStretchGoals: [
      "Add parity generation and parity error checking (Even and Odd parity modes)",
      "Add hardware FIFO buffers (16-byte or 64-byte queue) to TX and RX paths to prevent buffer overrun",
      "Deploy onto FPGA board and transmit 'Hello, World!' to your PC's PuTTY/terminal over USB cable",
    ],
  },
];
