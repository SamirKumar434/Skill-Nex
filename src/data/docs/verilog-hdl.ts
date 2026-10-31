import { TopicDocumentation } from "./types";

export const VERILOG_HDL_DOCS: TopicDocumentation[] = [
  // 5.1
  {
    id: "verilog-intro-hdl",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.1",
    title: "Introduction to HDL",
    readTimeMinutes: 7,
    why: "Hardware Description Languages allow engineers to model, simulate, and synthesize digital circuits mathematically before fabricating silicon.",
    need: "Schematic capture for millions of transistors is impossible; HDL text descriptions provide automated synthesis, scalability, and automated testing.",
    whatYouWillLearn: [
      "What is a Hardware Description Language (HDL)",
      "Differences between software programming (C/Python) and HDL concurrency",
      "Simulation vs Synthesis concept",
      "Overview of the digital ASIC / FPGA design flow",
    ],
    prerequisites: "Basic digital logic gates (AND, OR, NOT) and truth tables.",
    conceptExplanation:
      "Unlike software languages where instructions execute sequentially on a CPU, HDLs describe physical hardware elements (wires, registers, multiplexers) that operate concurrently in real time. Verilog is an IEEE standard (IEEE 1364) HDL used extensively across ASIC and FPGA industries.",
    howItWorks: [
      { step: "Design Entry", detail: "Write synthesizable Verilog code describing circuit behavior or structure." },
      { step: "RTL Simulation", detail: "Apply test vectors in a testbench to verify functional correctness before synthesis." },
      { step: "Logic Synthesis", detail: "Synthesis tools (e.g. Design Compiler, Vivado) map RTL to technology gate libraries." },
      { step: "Place and Route", detail: "Physical design tools place standard cells and route metal interconnects on silicon or FPGA slices." },
    ],
    practicalExample: {
      title: "Simple Buffer in Verilog",
      description: "A continuous assignment driving an output wire with an input wire.",
      language: "verilog",
      codeOrSpec: `module buffer_gate (
    input  wire in_a,
    output wire out_y
);
    assign out_y = in_a;
endmodule`,
      explanation: "Whenever in_a changes, out_y is updated concurrently, modeling a physical electrical wire or buffer.",
    },
    commonMistakes: [
      {
        mistake: "Thinking Verilog executes sequentially line-by-line like C.",
        fix: "Remember that all continuous assignments (`assign`) and hardware blocks run concurrently in parallel.",
      },
    ],
    quickRevision: [
      "HDL models concurrent physical hardware, not sequential CPU instructions.",
      "Verilog code can be simulated (for testing) and synthesized (mapped to silicon gates).",
      "IEEE 1364 standardizes Verilog HDL across EDA simulation and synthesis tools.",
    ],
    checkUnderstanding: [
      {
        question: "What is the primary difference between C programming and Verilog HDL?",
        options: [
          "C is compiled, Verilog cannot be compiled",
          "Verilog models concurrent parallel hardware, whereas C executes sequentially on a processor",
          "Verilog only supports floating point arithmetic",
          "C cannot model variables",
        ],
        answer: "Verilog models concurrent parallel hardware, whereas C executes sequentially on a processor",
        explanation: "Hardware components in digital circuits run continuously in parallel, which HDLs reflect natively.",
      },
    ],
  },
  // 5.2
  {
    id: "verilog-abstraction-levels",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.2",
    title: "Levels of Abstraction in Verilog",
    readTimeMinutes: 8,
    why: "Understanding abstraction levels enables designers to write circuits at the right balance of readability, optimization, and synthesis efficiency.",
    need: "Different design phases require different representations: architectural exploration needs behavioral modeling, while timing closure requires gate-level netlists.",
    whatYouWillLearn: [
      "Switch-level modeling (MOS transistors)",
      "Gate-level modeling (primitives like and, or, xor)",
      "Dataflow modeling (continuous assignment with assign)",
      "Behavioral modeling (procedural blocks like always, initial)",
    ],
    prerequisites: "Introduction to HDL (5.1).",
    conceptExplanation:
      "Verilog supports four main levels of abstraction: 1) Switch level (modeling PMOS/NMOS transistors); 2) Gate level (connecting built-in logic gate primitives); 3) Dataflow level (specifying continuous boolean expressions via `assign`); 4) Behavioral / RTL level (describing algorithmic behavior using `always` blocks).",
    howItWorks: [
      { step: "Switch Level", detail: "Lowest abstraction using nmos, pmos, cmos primitives." },
      { step: "Gate Level", detail: "Structural interconnection of logic gates (and, or, not)." },
      { step: "Dataflow Level", detail: "Boolean data transfer using continuous `assign` statements." },
      { step: "Behavioral Level", detail: "High-level algorithmic description with procedural statements." },
    ],
    practicalExample: {
      title: "Comparing Dataflow vs Behavioral 2:1 MUX",
      description: "Dataflow using ternary operator vs behavioral using if-else.",
      language: "verilog",
      codeOrSpec: `// Dataflow Style:
assign mux_out = sel ? in1 : in0;

// Behavioral Style:
always @(*) begin
    if (sel)
        mux_out_reg = in1;
    else
        mux_out_reg = in0;
end`,
      explanation: "Both synthesize to the exact same multiplexer hardware gate, but express the logic at different abstraction levels.",
    },
    commonMistakes: [
      {
        mistake: "Assuming behavioral modeling creates inferior or slower silicon hardware.",
        fix: "Modern logic synthesis tools optimize behavioral RTL into highly efficient gate netlists.",
      },
    ],
    quickRevision: [
      "Gate-level connects primitives directly.",
      "Dataflow uses continuous `assign` statements for concurrent data movement.",
      "Behavioral level uses procedural `always` blocks for algorithms and state machines.",
    ],
    checkUnderstanding: [
      {
        question: "Which abstraction level in Verilog uses `always` blocks and procedural statements?",
        options: ["Switch level", "Gate level", "Behavioral / RTL level", "Transistor level"],
        answer: "Behavioral / RTL level",
        explanation: "Behavioral modeling specifies circuit behavior using procedural blocks such as `always` and `initial`.",
      },
    ],
  },
  // 5.3
  {
    id: "verilog-modules-instantiation",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.3",
    title: "Modules and Instantiation",
    readTimeMinutes: 8,
    why: "Modules are the fundamental building blocks of Verilog hardware design, enabling hierarchical composition and clean code reuse.",
    need: "Complex digital chips (like CPUs or GPUs) consist of thousands of hierarchical sub-blocks connected together.",
    whatYouWillLearn: [
      "Module definition syntax (`module` ... `endmodule`)",
      "Port declarations (input, output, inout)",
      "Positional vs Named port instantiation",
      "Hierarchical design structures",
    ],
    prerequisites: "Levels of Abstraction (5.2).",
    conceptExplanation:
      "A module encapsulates circuit inputs, outputs, and internal logic. Modules are instantiated inside higher-level modules, creating a hierarchy from leaf sub-circuits up to the top-level chip padframe.",
    howItWorks: [
      { step: "Declare Module", detail: "Define module name and port list with directions and bus widths." },
      { step: "Internal Logic", detail: "Declare internal wires and registers, write synthesizable logic." },
      { step: "Instantiation", detail: "Instantiate child modules in top-level using `.port_name(signal_name)`." },
      { step: "End Module", detail: "Close module boundary with `endmodule` keyword." },
    ],
    practicalExample: {
      title: "Named Port Instantiation of a Full Adder",
      description: "Instantiating two half adders and an OR gate to build a full adder.",
      language: "verilog",
      codeOrSpec: `module full_adder (
    input  wire a, b, cin,
    output wire sum, cout
);
    wire s1, c1, c2;

    // Named instantiation: .port_name(net_name)
    half_adder HA1 (.a(a), .b(b), .sum(s1), .cout(c1));
    half_adder HA2 (.a(s1), .b(cin), .sum(sum), .cout(c2));

    assign cout = c1 | c2;
endmodule`,
      explanation: "Named port connection (`.port(signal)`) prevents wiring bugs if port orders change in the sub-module.",
    },
    commonMistakes: [
      {
        mistake: "Using positional instantiation in production RTL.",
        fix: "Always prefer named port connection (`.port_name(signal)`), which is safe against port reordering.",
      },
    ],
    quickRevision: [
      "`module` and `endmodule` delineate the hardware block boundary.",
      "Ports define interface signals: `input`, `output`, and bidirectional `inout`.",
      "Named port connection `.port(net)` is the industry best practice.",
    ],
    checkUnderstanding: [
      {
        question: "Why is named port instantiation preferred over positional instantiation?",
        options: [
          "It compiles faster",
          "It avoids bugs caused by port reordering and improves readability",
          "It uses fewer hardware gates",
          "Positional instantiation is forbidden by IEEE standard",
        ],
        answer: "It avoids bugs caused by port reordering and improves readability",
        explanation: "Named instantiation explicitly binds signal names to port names regardless of port declaration order.",
      },
    ],
  },
  // 5.4
  {
    id: "verilog-simulation-synthesis",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.4",
    title: "Simulation, Synthesis and Design Methodology",
    readTimeMinutes: 7,
    why: "Distinguishing synthesizable RTL constructs from simulation-only constructs prevents synthesis failures and RTL-simulation mismatches.",
    need: "Not all Verilog syntax can be physically constructed in silicon hardware; simulation constructs like delays (`#10`) are strictly non-synthesizable.",
    whatYouWillLearn: [
      "Synthesizable vs Non-synthesizable Verilog constructs",
      "RTL simulation and testbench generation",
      "Logic synthesis and technology library mapping",
      "Timing verification and static timing analysis (STA)",
    ],
    prerequisites: "Modules and Instantiation (5.3).",
    conceptExplanation:
      "Simulation tests how the circuit functions logically over time. Synthesis compiles the behavioral and dataflow description into physical silicon gates (NAND, DFF, MUX). Constructs like `#10`, `initial`, and `$display` are simulation-only.",
    howItWorks: [
      { step: "RTL Verification", detail: "Simulate design using Icarus Verilog, ModelSim, or VCS." },
      { step: "Logic Synthesis", detail: "Translate synthesizable RTL into standard cells using Yosys or Design Compiler." },
      { step: "Gate-Level Sim", detail: "Simulate the synthesized netlist with annotated gate delays." },
      { step: "Hardware Timing", detail: "Run STA to ensure setup and hold times meet clock frequency constraints." },
    ],
    practicalExample: {
      title: "Synthesizable vs Simulation-Only Constructs",
      description: "Comparing real hardware logic with testbench stimulus code.",
      language: "verilog",
      codeOrSpec: `// Synthesizable RTL (hardware logic):
always @(posedge clk or posedge rst) begin
    if (rst)
        q <= 1'b0;
    else
        q <= d;
end

// Simulation Only (Testbench stimulus):
initial begin
    #10 clk = 1'b1;
    #10 clk = 1'b0;
    $display("Test complete");
end`,
      explanation: "Delays `#` and `initial` blocks cannot be turned into transistors and are only used in testbenches.",
    },
    commonMistakes: [
      {
        mistake: "Using `#delay` inside a synthesizable hardware module expecting silicon propagation delays.",
        fix: "Delays (`#`) are ignored by synthesis tools; silicon delays depend strictly on physical transistor physics and routing.",
      },
    ],
    quickRevision: [
      "Synthesizable RTL can be converted into physical standard-cell gates.",
      "Delays (`#5`), `initial` blocks, and system tasks (`$finish`) are for testbenches only.",
      "Synthesis converts RTL into a technology-mapped netlist.",
    ],
    checkUnderstanding: [
      {
        question: "What happens when a logic synthesis tool encounters a `#10` time delay in RTL?",
        options: [
          "It inserts 10 clock cycle delay buffers",
          "It ignores the delay or flags a synthesis warning/error",
          "It slows down the silicon clock frequency by 10ns",
          "It increases transistor oxide thickness",
        ],
        answer: "It ignores the delay or flags a synthesis warning/error",
        explanation: "Time delays (`#`) have no physical hardware equivalent and are ignored or rejected by synthesis compilers.",
      },
    ],
  },
  // 5.5
  {
    id: "verilog-data-types",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.5",
    title: "Data Types in Verilog",
    readTimeMinutes: 7,
    why: "Verilog data types represent real physical wires and storage elements with multi-valued logic states.",
    need: "Digital hardware requires modeling 0, 1, high impedance (floating buses), and unknown/uninitialized states.",
    whatYouWillLearn: [
      "The 4 logic values: 0, 1, x (unknown), z (high impedance)",
      "Net group (`wire`, `tri`, `wand`, `wor`)",
      "Variable / Register group (`reg`, `integer`, `time`, `real`)",
      "Difference between physical storage and procedural assignment",
    ],
    prerequisites: "Modules and Instantiation (5.3).",
    conceptExplanation:
      "All Verilog signals operate on four-valued logic: 0 (logic low / ground), 1 (logic high / Vdd), x (unknown state, contention, or uninitialized flip-flop), and z (high-impedance, disconnected or tri-stated wire).",
    howItWorks: [
      { step: "Logic 0", detail: "Represents ground / 0V electrical potential." },
      { step: "Logic 1", detail: "Represents supply voltage / logic high." },
      { step: "Logic X", detail: "Unknown or undefined value, such as simultaneous 0 and 1 driver contention." },
      { step: "Logic Z", detail: "High impedance, open circuit, or un-driven tri-state bus." },
    ],
    practicalExample: {
      title: "Tri-State Buffer Driving Z",
      description: "Driving high impedance when enable is low.",
      language: "verilog",
      codeOrSpec: `module tristate_buffer (
    input  wire data_in,
    input  wire enable,
    output wire data_out
);
    assign data_out = enable ? data_in : 1'bz;
endmodule`,
      explanation: "When enable is 0, the output wire floats at high impedance `1'bz`, allowing other drivers to control the bus.",
    },
    commonMistakes: [
      {
        mistake: "Treating 'x' as 'don't care' in RTL expressions.",
        fix: "'x' indicates an unknown or simulation contention; use '?' in casex statements for don't cares.",
      },
    ],
    quickRevision: [
      "Verilog logic values: 0 (low), 1 (high), x (unknown), z (high impedance / floating).",
      "Net types represent continuous physical connections.",
      "Variables hold values between procedural assignments.",
    ],
    checkUnderstanding: [
      {
        question: "What logic value does a tri-state buffer drive when its output is disabled?",
        options: ["0", "1", "z", "x"],
        answer: "z",
        explanation: "Disabling a tri-state buffer places its output line into high-impedance (floating) state `z`.",
      },
    ],
  },
  // 5.6
  {
    id: "verilog-net-data-types",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.6",
    title: "Net Data Types",
    readTimeMinutes: 7,
    why: "Nets model physical electrical wires that connect components together and propagate signal values continuously.",
    need: "Outputs of logic gates and continuous assignment statements need a conductive net medium to transmit values.",
    whatYouWillLearn: [
      "The `wire` data type and default net rules",
      "Wired logic: `wand` (wired-AND) and `wor` (wired-OR)",
      "Tri-state nets: `tri`, `tri0`, `tri1`",
      "Rules for driving net data types",
    ],
    prerequisites: "Data Types in Verilog (5.5).",
    conceptExplanation:
      "A net does not store a value; it must be continuously driven by a driver (such as a logic gate output or continuous `assign` statement). If all drivers are turned off, a standard `wire` evaluates to `z` (high impedance).",
    howItWorks: [
      { step: "Declaration", detail: "`wire [7:0] bus_data;` creates an 8-bit wide physical wire bundle." },
      { step: "Driver Connection", detail: "Connected to a gate output or `assign` left-hand side." },
      { step: "Continuous Propagation", detail: "Changes on inputs propagate instantly or with modeled delay to the net." },
      { step: "Default Net Type", detail: "Undeclared 1-bit connections default to wire in standard Verilog." },
    ],
    practicalExample: {
      title: "Multiple Wires in a Logic Circuit",
      description: "Internal wires connecting gate outputs.",
      language: "verilog",
      codeOrSpec: `module logic_circuit (
    input  wire a, b, c,
    output wire out_y
);
    wire w_and; // internal net

    assign w_and = a & b;
    assign out_y = w_and | c;
endmodule`,
      explanation: "The internal net `w_and` propagates the AND result into the OR gate continuously without storing memory.",
    },
    commonMistakes: [
      {
        mistake: "Attempting to assign to a `wire` inside an `always` procedural block.",
        fix: "Outputs assigned inside an `always` block must be declared as `reg` (or `logic` in SystemVerilog).",
      },
    ],
    quickRevision: [
      "`wire` is the most common net type, modeling physical connection without memory storage.",
      "Nets must be continuously driven by gates or `assign` statements.",
      "Un-driven nets evaluate to `z` in simulation.",
    ],
    checkUnderstanding: [
      {
        question: "Can a `wire` data type be the target (left-hand side) of a procedural assignment inside an `always` block?",
        options: [
          "Yes, always",
          "No, procedural assignments require variable/register data types like `reg`",
          "Only in clocked always blocks",
          "Only if declared as a vector",
        ],
        answer: "No, procedural assignments require variable/register data types like `reg`",
        explanation: "In Verilog-2001, only `reg`, `integer`, or variable types can be assigned inside procedural `always` blocks.",
      },
    ],
  },
  // 5.7
  {
    id: "verilog-register-data-types",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.7",
    title: "Register Data Types",
    readTimeMinutes: 7,
    why: "Register data types hold signal values across procedural simulation time steps and model flip-flops, latches, or combinational variables.",
    need: "Sequential circuits require memory to remember state between clock edges.",
    whatYouWillLearn: [
      "The `reg` data type and meaning",
      "Why `reg` does NOT always synthesize to a physical hardware flip-flop",
      "Signed `integer`, simulation `time`, and `real` data types",
      "Default initialization value of `reg` (which is `x`)",
    ],
    prerequisites: "Net Data Types (5.6).",
    conceptExplanation:
      "A `reg` is a software simulation container that holds its assigned value until another assignment updates it. Depending on the `always` block sensitivity list, synthesis translates a `reg` into a D flip-flop (clocked), a latch, or simple combinational wires.",
    howItWorks: [
      { step: "Clocked always block", detail: "`always @(posedge clk)` synthesizes `reg` to physical D flip-flops." },
      { step: "Combinational always block", detail: "`always @(*)` synthesizes `reg` to combinational multiplexers or gates." },
      { step: "Default State", detail: "In simulation, unassigned `reg` variables start at `1'bx`." },
      { step: "Integer type", detail: "`integer count;` provides a 32-bit signed integer useful for loop counters." },
    ],
    practicalExample: {
      title: "Clocked D Flip-Flop with reg",
      description: "Using reg to synthesize physical hardware memory.",
      language: "verilog",
      codeOrSpec: `module d_flip_flop (
    input  wire clk, rst,
    input  wire d,
    output reg  q
);
    always @(posedge clk or posedge rst) begin
        if (rst)
            q <= 1'b0;
        else
            q <= d;
    end
endmodule`,
      explanation: "Because `q` is assigned on the rising clock edge (`posedge clk`), synthesis infers a physical D flip-flop register.",
    },
    commonMistakes: [
      {
        mistake: "Assuming every `reg` keyword will synthesize into a hardware flip-flop register.",
        fix: "A `reg` in an `always @(*)` combinational block synthesizes into pure wires / multiplexer gates without flip-flops.",
      },
    ],
    quickRevision: [
      "`reg` holds its value across simulation steps until overwritten.",
      "`reg` in `always @(posedge clk)` synthesizes to hardware D flip-flops.",
      "`reg` in `always @(*)` synthesizes to pure combinational logic.",
    ],
    checkUnderstanding: [
      {
        question: "Does declaring a signal as `reg` guarantee that the synthesis tool will create a hardware flip-flop?",
        options: [
          "Yes, `reg` always means hardware flip-flop",
          "No, it only means it is assigned inside a procedural block; combinational blocks synthesize to gates without registers",
          "Only if the bit width is greater than 1",
          "Only in ASIC synthesis, not FPGA",
        ],
        answer: "No, it only means it is assigned inside a procedural block; combinational blocks synthesize to gates without registers",
        explanation: "`reg` is a Verilog language classification for procedural targets; whether it becomes a flip-flop depends on the sensitivity list.",
      },
    ],
  },
  // 5.8
  {
    id: "verilog-vectors-arrays-memories",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.8",
    title: "Vectors, Arrays, Memories, Parameters and Strings",
    readTimeMinutes: 8,
    why: "Digital designs process multi-bit buses, memories (RAM/ROM), and parameterized modular bitwidths.",
    need: "ALUs and processors need 8-bit, 32-bit, or 64-bit data buses, register files, and parameterized reusable modules.",
    whatYouWillLearn: [
      "Vector bit widths and endianness (`[msb:lsb]`)",
      "Bit-select and part-select slicing (`data[7:4]`)",
      "Multi-dimensional memories: `reg [7:0] ram [0:255]`",
      "Module `parameter` and `localparam` declaration",
    ],
    prerequisites: "Register Data Types (5.7).",
    conceptExplanation:
      "Vectors represent multi-bit buses declared with `[MSB:LSB]`. Parameters define constants that configure bit-widths or depths at instantiation time. Memories are arrays of vector registers.",
    howItWorks: [
      { step: "Vector declaration", detail: "`wire [31:0] data_bus;` declares a 32-bit wide bus numbered 31 down to 0." },
      { step: "Part select", detail: "`data_bus[15:8]` extracts the second byte." },
      { step: "Memory array", detail: "`reg [7:0] mem [0:1023];` creates a 1KB RAM (1024 words of 8 bits each)." },
      { step: "Parameterization", detail: "`parameter WIDTH = 8;` allows callers to override width upon instantiation." },
    ],
    practicalExample: {
      title: "Parameterized N-Bit Register",
      description: "Reusable register with configurable width.",
      language: "verilog",
      codeOrSpec: `module param_reg #(
    parameter WIDTH = 8
)(
    input  wire             clk, rst,
    input  wire [WIDTH-1:0] d,
    output reg  [WIDTH-1:0] q
);
    always @(posedge clk or posedge rst) begin
        if (rst)
            q <= {WIDTH{1'b0}};
        else
            q <= d;
    end
endmodule`,
      explanation: "Can be instantiated as an 8-bit, 16-bit, or 64-bit register cleanly by passing `#( .WIDTH(32) )`.",
    },
    commonMistakes: [
      {
        mistake: "Confusing memory array indexing `mem[addr]` with vector bit slicing `bus[bit]`.",
        fix: "`reg [7:0] mem [0:255]` -> first index accesses the 8-bit word; second brackets slice the bit.",
      },
    ],
    quickRevision: [
      "Vectors declare multi-bit buses using `[MSB:LSB]`.",
      "Arrays of vectors model RAMs, ROMs, and register files.",
      "`parameter` allows modular configuration of bus widths and constants at instantiation.",
    ],
    checkUnderstanding: [
      {
        question: "How do you declare a 256-entry RAM where each word is 16 bits wide?",
        options: [
          "reg [15:0] ram [0:255];",
          "wire [255:0] ram [15:0];",
          "reg [255:16] ram;",
          "memory ram [256][16];",
        ],
        answer: "reg [15:0] ram [0:255];",
        explanation: "`[15:0]` specifies the 16-bit word width, and `[0:255]` specifies the 256 array locations.",
      },
    ],
  },
  // 5.9
  {
    id: "verilog-operators",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.9",
    title: "Operators in Verilog",
    readTimeMinutes: 8,
    why: "Operators form the core expressions in dataflow and behavioral descriptions for arithmetic, logic, and bit manipulation.",
    need: "Digital arithmetic units, ALUs, decoders, and comparators rely on synthesizable operators.",
    whatYouWillLearn: [
      "Bitwise operators (`&`, `|`, `^`, `~`) vs Logical operators (`&&`, `||`, `!`)",
      "Arithmetic operators (`+`, `-`, `*`) and overflow considerations",
      "Reduction operators (`&A`, `|A`, `^A`)",
      "Concatenation (`{a, b}`) and replication (`{4{a}}`) operators",
    ],
    prerequisites: "Vectors and Arrays (5.8).",
    conceptExplanation:
      "Verilog provides operators mapped directly to hardware primitives: bitwise operators produce arrays of gates, reduction operators compress vector bits into a single bit, and concatenation joins buses together.",
    howItWorks: [
      { step: "Bitwise", detail: "`a & b` performs bit-by-bit AND producing an n-bit vector." },
      { step: "Logical", detail: "`a && b` evaluates operands as booleans producing a 1-bit true/false result." },
      { step: "Reduction", detail: "`^data` computes the parity of the vector by XOR-ing all its bits." },
      { step: "Concatenation", detail: "`{a, b}` combines buses into a wider bus." },
    ],
    practicalExample: {
      title: "Parity Generator & Sign Extension",
      description: "Using reduction XOR and concatenation replication.",
      language: "verilog",
      codeOrSpec: `// Even parity generator:
wire parity = ^data_byte; // reduction XOR across all 8 bits

// Sign extension from 8-bit to 16-bit:
wire [15:0] extended = { {8{data_byte[7]}}, data_byte };`,
      explanation: "Reduction `^data_byte` generates single-bit parity, and replication `{8{data_byte[7]}}` sign-extends two's complement numbers.",
    },
    commonMistakes: [
      {
        mistake: "Confusing bitwise `&` with logical `&&` in multi-bit vector operations.",
        fix: "`4'b0101 & 4'b0010` is `4'b0000`, whereas `4'b0101 && 4'b0010` evaluates to boolean `1'b1`.",
      },
    ],
    quickRevision: [
      "Bitwise (`&`, `|`, `^`) acts on individual corresponding bits.",
      "Logical (`&&`, `||`, `!`) evaluates overall condition as 1 or 0.",
      "Concatenation `{A, B}` merges vectors; replication `{N{A}}` duplicates patterns.",
    ],
    checkUnderstanding: [
      {
        question: "If `data = 4'b1011`, what is the result of the reduction operator `&data`?",
        options: ["1'b0", "1'b1", "4'b1011", "4'b0000"],
        answer: "1'b0",
        explanation: "`&data` computes `1 & 0 & 1 & 1`, which evaluates to `1'b0` because of the 0 bit.",
      },
    ],
  },
  // 5.10
  {
    id: "verilog-practice-set",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.10",
    title: "Verilog Practice Set",
    readTimeMinutes: 9,
    why: "Hands-on problem solving cements module structure, vector indexing, and synthesizable operator syntax.",
    need: "Hardware design interviews assess speed and precision in implementing combinational and sequential modules.",
    whatYouWillLearn: [
      "Implementing 2-to-4 active-low decoders",
      "Building 4-to-1 multiplexers with ternary operators",
      "Creating 4-bit ripple-carry and carry-lookahead adders",
      "Bit-reversal and byte-swapping with concatenation",
    ],
    prerequisites: "Operators in Verilog (5.9).",
    conceptExplanation:
      "A set of targeted exercises practicing vector slicing, multiplexing, binary arithmetic, and hierarchical composition commonly asked in entry-level ASIC/FPGA technical screenings.",
    howItWorks: [
      { step: "Problem Specification", detail: "Read module inputs, outputs, and truth table requirements." },
      { step: "RTL Implementation", detail: "Write synthesizable continuous assignments or procedural blocks." },
      { step: "Corner-Case Verification", detail: "Check zero, max-value, overflow, and polarity edge cases." },
      { step: "Optimization", detail: "Minimize gate count and critical path delay." },
    ],
    practicalExample: {
      title: "4-to-1 Multiplexer Implementation",
      description: "Compact 4:1 MUX using nested ternary operators.",
      language: "verilog",
      codeOrSpec: `module mux4to1 (
    input  wire [3:0] in,
    input  wire [1:0] sel,
    output wire       out
);
    assign out = (sel == 2'b00) ? in[0] :
                 (sel == 2'b01) ? in[1] :
                 (sel == 2'b10) ? in[2] : in[3];
endmodule`,
      explanation: "Directly synthesizes to standard multiplexer logic without inferred latches.",
    },
    commonMistakes: [
      {
        mistake: "Leaving select paths unhandled leading to unintended latch inference.",
        fix: "Always ensure default conditions exist for all selector permutations.",
      },
    ],
    quickRevision: [
      "Use ternary operator `? :` for compact combinational multiplexing.",
      "Check bus bit ordering `[msb:lsb]` consistently across assignments.",
      "Practice solving circuits on HDLBits.",
    ],
    checkUnderstanding: [
      {
        question: "How many select lines are required for an 8-to-1 multiplexer?",
        options: ["2", "3", "4", "8"],
        answer: "3",
        explanation: "Since 2^3 = 8, 3 binary select lines are required to address 8 inputs.",
      },
    ],
  },
  // 5.11
  {
    id: "verilog-gate-level-modeling",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.11",
    title: "Gate-Level Modeling",
    readTimeMinutes: 7,
    why: "Gate-level modeling allows direct structural description of logic circuits using built-in primitives and propagation delays.",
    need: "Post-synthesis netlists and custom ASIC standard cells are represented and verified in gate-level Verilog.",
    whatYouWillLearn: [
      "Built-in primitives: `and`, `nand`, `or`, `nor`, `xor`, `xnor`, `buf`, `not`",
      "Primitive instantiation syntax: `gate_type inst_name (output, input1, input2, ...)`",
      "Modeling rise, fall, and turn-off propagation delays (`#(rise, fall)`)",
      "Gate-level netlist verification",
    ],
    prerequisites: "Modules and Instantiation (5.3).",
    conceptExplanation:
      "Verilog includes built-in gate primitives that do not require module definitions. Gate outputs always appear as the first port in the argument list, followed by inputs.",
    howItWorks: [
      { step: "Primitive Syntax", detail: "`and a1 (out, in1, in2);`" },
      { step: "Multi-input Gates", detail: "`or o1 (out, in1, in2, in3, in4);`" },
      { step: "Propagation Delay", detail: "`and #3 a1 (out, in1, in2);` models 3 simulation time units of delay." },
      { step: "Netlist representation", detail: "Synthesis outputs pure structural gate-level netlists." },
    ],
    practicalExample: {
      title: "2-Input XOR Gate Built from NAND Primitives",
      description: "Pure gate-level structural design.",
      language: "verilog",
      codeOrSpec: `module xor_gate (
    input  wire a, b,
    output wire y
);
    wire w1, w2, w3;

    nand g1 (w1, a, b);
    nand g2 (w2, a, w1);
    nand g3 (w3, b, w1);
    nand g4 (y,  w2, w3);
endmodule`,
      explanation: "Uses four 2-input NAND primitives to construct an XOR function.",
    },
    commonMistakes: [
      {
        mistake: "Placing gate inputs first before the gate output in primitive instantiations.",
        fix: "In Verilog primitives, the OUTPUT is always port 0 (first argument): `and a1 (out, in1, in2)`.",
      },
    ],
    quickRevision: [
      "Built-in primitives (`and`, `or`, `xor`, `not`) do not need module declarations.",
      "The first argument in a gate primitive is always the output.",
      "Gate delays `#delay` simulate propagation latency in non-synthesizable simulations.",
    ],
    checkUnderstanding: [
      {
        question: "In the built-in primitive statement `xor x1 (p, q, r);`, which signal is the output?",
        options: ["p", "q", "r", "x1"],
        answer: "p",
        explanation: "In all Verilog gate primitives, the first port in the argument list is the gate output.",
      },
    ],
  },
  // 5.12
  {
    id: "verilog-dataflow-modeling",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.12",
    title: "Dataflow Modeling",
    readTimeMinutes: 8,
    why: "Dataflow modeling uses continuous assignment to express how digital information flows and transforms without specifying gate-level netlists.",
    need: "Writing Boolean equations with continuous `assign` statements is clearer, faster, and highly synthesizable for combinational circuits.",
    whatYouWillLearn: [
      "The `assign` keyword and continuous assignment semantics",
      "Explicit vs Implicit continuous assignment",
      "Inertial delays in continuous assignments",
      "Synthesizing combinational logic with dataflow style",
    ],
    prerequisites: "Operators in Verilog (5.9).",
    conceptExplanation:
      "Continuous assignment (`assign net = expression;`) models combinational circuits. Whenever any operand on the right-hand side changes value, the expression re-evaluates immediately and drives the target net continuously.",
    howItWorks: [
      { step: "Sensitivity", detail: "Continuous assignments are automatically sensitive to all RHS signal transitions." },
      { step: "Concurrency", detail: "All `assign` statements execute simultaneously in parallel." },
      { step: "Net Target", detail: "The target on the left-hand side must be a net type (e.g. `wire`)." },
      { step: "Synthesis", detail: "Compiles directly into combinational logic gates." },
    ],
    practicalExample: {
      title: "1-Bit Comparator in Dataflow Style",
      description: "Evaluating equal, greater than, and less than relationships.",
      language: "verilog",
      codeOrSpec: `module comparator_1bit (
    input  wire a, b,
    output wire eq, gt, lt
);
    assign eq = (a == b);
    assign gt = (a > b);
    assign lt = (a < b);
endmodule`,
      explanation: "Three continuous assignments evaluate concurrently whenever `a` or `b` toggles.",
    },
    commonMistakes: [
      {
        mistake: "Placing multiple continuous assignments driving the same wire without a wired resolution function.",
        fix: "A single wire driven by conflicting continuous assignments creates `x` (contention).",
      },
    ],
    quickRevision: [
      "`assign` statements model combinational hardware concurrently.",
      "The left-hand side must be a net (such as `wire`).",
      "Evaluation triggers automatically on any input change.",
    ],
    checkUnderstanding: [
      {
        question: "When does a continuous `assign` statement execute during simulation?",
        options: [
          "Only at clock posedge",
          "Continuously whenever any operand on the right-hand side changes value",
          "Once at simulation startup",
          "Sequentially from top to bottom of the file",
        ],
        answer: "Continuously whenever any operand on the right-hand side changes value",
        explanation: "Continuous assignments are event-driven and re-evaluate whenever any RHS input transitions.",
      },
    ],
  },
  // 5.13
  {
    id: "verilog-behavioral-modeling",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.13",
    title: "Behavioral Modeling",
    readTimeMinutes: 9,
    why: "Behavioral modeling allows describing complex algorithms, state machines, and sequential storage using procedural `always` blocks.",
    need: "State machines, processors, and multi-mode counters are difficult to write purely with Boolean equations; procedural blocks simplify control logic.",
    whatYouWillLearn: [
      "Procedural blocks: `always` and `initial`",
      "Sensitivity lists: edge-triggered (`posedge`, `negedge`) vs level-sensitive (`@*`)",
      "Blocking (`=`) vs Non-blocking (`<=`) assignments",
      "Avoiding unintended latches in combinational `always` blocks",
    ],
    prerequisites: "Dataflow Modeling (5.12).",
    conceptExplanation:
      "Behavioral modeling specifies the behavior of a circuit using algorithmic constructs like `if-else`, `case`, and loops inside an `always` block. Outputs assigned procedurally must be declared as `reg`.",
    howItWorks: [
      { step: "Sequential Logic", detail: "Use `always @(posedge clk)` with non-blocking `<=`, creating flip-flops." },
      { step: "Combinational Logic", detail: "Use `always @(*)` with blocking `=`, creating combinational gates." },
      { step: "Golden Rule 1", detail: "Never mix blocking and non-blocking assignments in the same `always` block." },
      { step: "Golden Rule 2", detail: "Assign all outputs under all branch conditions in combinational blocks to avoid latches." },
    ],
    practicalExample: {
      title: "4-Bit Synchronous Counter with Reset",
      description: "Clean sequential behavioral modeling.",
      language: "verilog",
      codeOrSpec: `module counter_4bit (
    input  wire       clk, rst, en,
    output reg  [3:0] count
);
    always @(posedge clk or posedge rst) begin
        if (rst)
            count <= 4'b0000;
        else if (en)
            count <= count + 1'b1;
    end
endmodule`,
      explanation: "Uses non-blocking assignment (`<=`) triggered on the rising edge of clock for race-free sequential hardware.",
    },
    commonMistakes: [
      {
        mistake: "Using blocking assignments (`=`) in edge-triggered sequential blocks.",
        fix: "Always use non-blocking (`<=`) for sequential logic to avoid simulation race conditions between flip-flops.",
      },
    ],
    quickRevision: [
      "Always use non-blocking (`<=`) for sequential logic (`posedge clk`).",
      "Always use blocking (`=`) for combinational logic (`always @*`).",
      "Provide complete `if-else` or `default` case to avoid unintended latches.",
    ],
    checkUnderstanding: [
      {
        question: "Which assignment type should be used when modeling sequential edge-triggered flip-flops?",
        options: [
          "Non-blocking (`<=`)",
          "Blocking (`=`)",
          "Continuous (`assign`)",
          "Force (`force`)",
        ],
        answer: "Non-blocking (`<=`)",
        explanation: "Non-blocking assignments schedule updates concurrently at the end of the simulation time step, eliminating race conditions between flip-flops.",
      },
    ],
  },
  // 5.14
  {
    id: "verilog-compiler-directives-tasks",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.14",
    title: "Compiler Directives and System Tasks",
    readTimeMinutes: 8,
    why: "Compiler directives configure simulation timescales and conditional compilation; system tasks handle debugging and wave dumping.",
    need: "Simulating hardware requires defining time units (nanoseconds, picoseconds) and printing verification messages to the console.",
    whatYouWillLearn: [
      "Timescale directive: `` `timescale 1ns / 1ps `` (unit / precision)",
      "Conditional compilation: `` `ifdef ``, `` `else ``, `` `endif ``",
      "Macro definitions: `` `define ``",
      "Simulation system tasks: `$display`, `$monitor`, `$time`, `$finish`, `$dumpfile`, `$dumpvars`",
    ],
    prerequisites: "Behavioral Modeling (5.13).",
    conceptExplanation:
      "Compiler directives start with a backtick (`` ` ``) and instruct the compiler before elaboration. System tasks start with a dollar sign (`$`) and are built-in simulator routines for printing data and controlling runs.",
    howItWorks: [
      { step: "Timescale", detail: "`` `timescale 1ns/10ps `` sets time unit to 1ns and rounding precision to 10ps." },
      { step: "Macros", detail: "`` `define CLK_PERIOD 10 `` replaces text occurrences during pre-processing." },
      { step: "Waveform Dump", detail: "`$dumpfile(\"waves.vcd\"); $dumpvars(0, tb_top);` dumps signals for GTKWave." },
      { step: "Termination", detail: "`$finish;` terminates the simulation run cleanly." },
    ],
    practicalExample: {
      title: "Standard Testbench Setup",
      description: "Using directives and system tasks in testbench initialization.",
      language: "verilog",
      codeOrSpec: `\`timescale 1ns / 1ps

module tb_example;
    reg clk;

    initial begin
        $dumpfile("waveform.vcd");
        $dumpvars(0, tb_example);
        $monitor("At time %0t ns, clk = %b", $time, clk);

        clk = 0;
        #50 $finish;
    end

    always #5 clk = ~clk;
endmodule`,
      explanation: "Sets timescale, dumps VCD waveforms for viewing, prints signal changes via `$monitor`, and finishes at 50ns.",
    },
    commonMistakes: [
      {
        mistake: "Using regular single quote `'` instead of backtick `` ` `` for compiler directives like `` `timescale ``.",
        fix: "Always use the backtick key (top-left of US keyboards beside number 1) for directives.",
      },
    ],
    quickRevision: [
      "`` `timescale unit / precision `` dictates simulation delay scaling.",
      "`$display` prints formatted text once; `$monitor` prints whenever listed signals toggle.",
      "`$dumpfile` and `$dumpvars` record waveform traces for GTKWave or ModelSim.",
    ],
    checkUnderstanding: [
      {
        question: "In `` `timescale 10ns / 100ps ``, what does `10ns` signify?",
        options: [
          "The precision of delay rounding",
          "The unit base for integer time delays like `#1` (which means 10ns)",
          "The maximum simulation run time",
          "The clock period",
        ],
        answer: "The unit base for integer time delays like `#1` (which means 10ns)",
        explanation: "The first parameter defines the reference time unit for `#` delays; `#1` represents 10ns in this configuration.",
      },
    ],
  },
  // 5.15
  {
    id: "verilog-tasks-functions",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.15",
    title: "Tasks and Functions",
    readTimeMinutes: 8,
    why: "Tasks and functions prevent code duplication by packaging reusable procedural routines across RTL and testbenches.",
    need: "Repeated mathematical operations or stimulus driving sequences become messy without subroutines.",
    whatYouWillLearn: [
      "Key differences between `task` and `function`",
      "Functions: zero simulation time, single return value, purely combinational",
      "Tasks: can consume simulation time (`#delay`), multiple inputs/outputs, cannot return value directly",
      "Automatic (re-entrant) tasks and functions",
    ],
    prerequisites: "Compiler Directives and System Tasks (5.14).",
    conceptExplanation:
      "A `function` must execute in zero simulation time, cannot contain delays (`#`, `@`), and returns exactly one value through its function name. A `task` can contain delays, can have zero or multiple `input`/`output`/`inout` arguments, and is commonly used for testbench stimulus generation.",
    howItWorks: [
      { step: "Function Definition", detail: "`function [7:0] byte_swap (input [7:0] in); ... endfunction`" },
      { step: "Function Usage", detail: "Called directly inside expressions: `assign swapped = byte_swap(data);`" },
      { step: "Task Definition", detail: "`task send_packet (input [7:0] byte_data); ... endtask`" },
      { step: "Task Invocation", detail: "Invoked as a procedural statement: `send_packet(8'hA5);`" },
    ],
    practicalExample: {
      title: "Synthesizable Parity Function vs Testbench Delay Task",
      description: "Comparing function and task syntax.",
      language: "verilog",
      codeOrSpec: `// Synthesizable combinational function:
function calc_parity (input [7:0] byte_in);
    calc_parity = ^byte_in;
endfunction

// Testbench stimulus task with time delay:
task apply_reset;
    begin
        rst = 1'b1;
        #20 rst = 1'b0;
    end
endtask`,
      explanation: "The function executes in zero simulation time and returns a single value. The task consumes 20ns of time.",
    },
    commonMistakes: [
      {
        mistake: "Placing a time delay `#10` inside a Verilog `function`.",
        fix: "Functions can never consume simulation time; use a `task` if timing or clock synchronization is required.",
      },
    ],
    quickRevision: [
      "Functions: 0 simulation time, single return value, can be used in expressions.",
      "Tasks: can consume time (`#`, `@`), can have multiple inputs/outputs, called as statements.",
      "`function` is synthesizable for combinational operations.",
    ],
    checkUnderstanding: [
      {
        question: "Can a Verilog `function` contain time delay statements like `#10` or `@(posedge clk)`?",
        options: [
          "Yes, if declared as automatic",
          "No, functions must execute in zero simulation time",
          "Only in SystemVerilog",
          "Only inside tasks",
        ],
        answer: "No, functions must execute in zero simulation time",
        explanation: "By definition in the Verilog standard, functions cannot consume simulation time or contain timing control constructs.",
      },
    ],
  },
  // 5.16
  {
    id: "verilog-testbench-writing",
    stageId: "verilog-hdl",
    stageTitle: "Verilog HDL",
    serial: "5.16",
    title: "Testbench Writing",
    readTimeMinutes: 9,
    why: "Testbenches instantiate the Device Under Test (DUT), generate clock and stimulus waveforms, and automatically verify functional correctness.",
    need: "Hardware cannot be physically debugged with print statements on silicon; automated testbench simulation is the only safe way to verify RTL before tape-out.",
    whatYouWillLearn: [
      "Testbench architecture (no external ports)",
      "Generating periodic clocks with `always #HALF_PERIOD clk = ~clk;`",
      "Applying reset and stimulus vectors in `initial` blocks",
      "Automated self-checking assertions and `$finish`",
    ],
    prerequisites: "Tasks and Functions (5.15).",
    conceptExplanation:
      "A testbench is a top-level simulation wrapper module that has no inputs or outputs (`module tb; ... endmodule`). It instantiates the DUT, drives its inputs using `reg` variables, and monitors its outputs using `wire` nets.",
    howItWorks: [
      { step: "Top-level wrapper", detail: "Declare testbench module with empty port list: `module tb_dut;`" },
      { step: "Signal declaration", detail: "Declare DUT inputs as `reg` (driven by TB) and DUT outputs as `wire`." },
      { step: "Instantiate DUT", detail: "Connect TB signals to DUT ports using named instantiation." },
      { step: "Clock Generator", detail: "Create continuous free-running clock in an `always` or `initial` block." },
      { step: "Stimulus & Check", detail: "Apply sequential test vectors in `initial begin ... end`." },
    ],
    practicalExample: {
      title: "Complete Self-Checking Testbench for a 2:1 Multiplexer",
      description: "End-to-end simulation testbench.",
      language: "verilog",
      codeOrSpec: `\`timescale 1ns / 1ps

module tb_mux2to1;
    reg  a, b, sel;
    wire y;

    // Instantiate Device Under Test
    mux2to1 dut (
        .a(a), .b(b), .sel(sel),
        .y(y)
    );

    initial begin
        $dumpfile("mux_sim.vcd");
        $dumpvars(0, tb_mux2to1);

        // Test case 1: sel = 0 -> y should be a
        a = 1'b1; b = 1'b0; sel = 1'b0; #10;
        if (y !== 1'b1) $display("FAIL: Expected 1, got %b", y);

        // Test case 2: sel = 1 -> y should be b
        sel = 1'b1; #10;
        if (y !== 1'b0) $display("FAIL: Expected 0, got %b", y);

        $display("ALL TESTS PASSED");
        $finish;
    end
endmodule`,
      explanation: "Drives stimulus vectors into the DUT, verifies the expected output, and reports test status before terminating.",
    },
    commonMistakes: [
      {
        mistake: "Declaring DUT outputs as `reg` in the testbench.",
        fix: "DUT outputs must be declared as `wire` in the testbench because they are driven by the instantiated module.",
      },
    ],
    quickRevision: [
      "Testbench modules have no external I/O ports.",
      "DUT inputs are driven by testbench `reg` variables.",
      "DUT outputs are observed on testbench `wire` nets.",
      "Always generate clock using `always #HALF_PERIOD clk = ~clk;` with an initial `clk = 0`.",
    ],
    checkUnderstanding: [
      {
        question: "Why does a top-level testbench module have no ports in its declaration (`module tb;`)?",
        options: [
          "Because it is the simulation root and connects to no physical package pins",
          "Because Verilog does not allow ports in simulation",
          "To save gate count during synthesis",
          "Because ports must be declared as global variables",
        ],
        answer: "Because it is the simulation root and connects to no physical package pins",
        explanation: "A testbench is a closed simulation environment containing both the stimulus generator and the device under test.",
      },
    ],
  },
];

