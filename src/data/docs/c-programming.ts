import { TopicDocumentation } from "./types";

export const C_PROGRAMMING_DOCS: TopicDocumentation[] = [
  {
    id: "c-intro-compilation",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.1",
    title: "Introduction to C & Program Structure",
    readTimeMinutes: 7,
    why: "C is the foundational language of systems engineering, operating system kernels, and embedded hardware. Understanding how a C program is structured and translated by GCC provides the essential mental model needed for writing robust, performant software.",
    need: "Computers only execute raw binary instructions (1s and 0s). Writing software directly in machine code or assembly is tedious and error-prone. C gives developers readable structured syntax with direct memory control. Knowing the anatomy of `main()`, header inclusion, and compilation stages lets you write, build, and debug programs systematically.",
    whatYouWillLearn: [
      "The structure of a C program: `#include`, `main()`, statements, and return codes",
      "The 4 compilation stages: Preprocessing, Compilation, Assembly, and Linking",
      "How to compile and execute a C program using GCC in the terminal",
      "Standard conventions for program entry points and comments",
    ],
    prerequisites: "No prior programming experience required. Basic familiarity with terminal commands is helpful.",
    conceptExplanation:
      "Every C program begins execution in a special function named `main()`. A typical minimal C program includes the standard input/output header `<stdio.h>` to access printing functions, runs sequential statements inside `main()`, and returns `0` to signal successful execution to the operating system.\n\nThe GCC toolchain translates this source code in four distinct stages:\n1. **Preprocessing (`.c` → `.i`)**: Expands header files (`#include`) and macros (`#define`), stripping comments.\n2. **Compilation (`.i` → `.s`)**: Converts preprocessed C code into target assembly language instructions.\n3. **Assembly (`.s` → `.o`)**: Translates assembly instructions into machine-code object files.\n4. **Linking (`.o` → executable)**: Combines object files with standard C runtime libraries to produce the final executable binary.",
    howItWorks: [
      {
        step: "Header Inclusion (`#include <stdio.h>`)",
        detail: "Tells the preprocessor to paste declarations for standard functions like `printf()` before compilation begins.",
      },
      {
        step: "Program Entry (`int main(void)`)",
        detail: "The OS kernel or runtime bootstrap calls `main()` as the formal program entry point.",
      },
      {
        step: "Sequential Execution",
        detail: "Statements execute line by line in order, each terminated strictly by a semicolon (`;`).",
      },
      {
        step: "Exit Status (`return 0;`)",
        detail: "Returns exit code 0 to indicate clean completion without errors.",
      },
    ],
    practicalExample: {
      title: "Hello World and GCC Build Command",
      description: "A standard first program demonstrating program structure and how to build it with GCC.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    // Print welcoming message to standard console
    printf("Skill Nex: C Programming Roadmap Online!\\n");
    return 0;
}`,
      language: "c",
      output: "Skill Nex: C Programming Roadmap Online!",
      explanation:
        "Compile with: `gcc main.c -o app`\nRun on Windows: `.\\app.exe` (or `./app` on Linux/macOS).\nGCC compiles source file `main.c` and links it into an executable named `app`.",
    },
    commonMistakes: [
      {
        mistake: "Forgetting the semicolon `;` at the end of a statement.",
        fix: "Every individual statement in C must terminate with a semicolon. The compiler will flag an error on the following line.",
      },
      {
        mistake: "Declaring `void main()` instead of `int main(void)`.",
        fix: "The ISO C standard requires `main()` to return `int`. Using `int main(void)` guarantees standard compliance and clean exit signaling.",
      },
    ],
    quickRevision: [
      "`main()` is the universal entry point for every C application.",
      "Preprocessor directives begin with `#` and execute before compilation.",
      "The 4 compilation phases are Preprocessing, Compilation, Assembly, and Linking.",
      "`return 0;` from `main()` signals successful termination to the host OS.",
    ],
    checkUnderstanding: [
      {
        question: "What does `return 0;` inside the `main()` function communicate to the operating system?",
        options: [
          "The program failed to execute",
          "The program finished successfully with no errors",
          "The program is waiting for user input",
          "The program should loop infinitely",
        ],
        answer: "The program finished successfully with no errors",
        explanation: "By convention, returning 0 from `main` indicates successful, error-free program termination.",
      },
      {
        question: "Which GCC compilation stage handles `#include <stdio.h>` and `#define` directives?",
        options: ["Compilation", "Linking", "Preprocessing", "Assembly"],
        answer: "Preprocessing",
        explanation: "The preprocessor scans all lines beginning with `#` and handles text expansion before syntax parsing.",
      },
    ],
    nextTopicId: "c-variables-types-operators",
    nextTopicTitle: "Variables, Data Types and Standard I/O (printf, scanf)",
  },
  {
    id: "c-variables-types-operators",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.2",
    title: "Variables, Data Types and Standard I/O (printf, scanf)",
    readTimeMinutes: 8,
    why: "Programs compute and manipulate data. To store numbers, characters, and sensor values, C provides strongly-typed variables. Mastering data types and standard I/O enables you to collect input from users and display formatted results.",
    need: "Without variables, programs cannot remember values across calculations. Without formatted input and output (`printf` and `scanf`), interactive computing is impossible. Selecting proper data types also ensures memory efficiency and prevents integer overflow bugs.",
    whatYouWillLearn: [
      "Primitive data types: `int`, `float`, `double`, `char`",
      "Format specifiers: `%d`, `%f`, `%lf`, `%c`, `%s`",
      "Variable declaration, initialization, and naming rules",
      "Formatted printing with `printf` and reading user input with `scanf`",
    ],
    prerequisites: "Understanding basic C program structure (Topic 1.1).",
    conceptExplanation:
      "A variable is a named location in memory reserved to hold a value of a specific data type:\n- `int`: Stores whole integers (typically 4 bytes, e.g., `-50`, `0`, `1024`).\n- `float`: Single-precision floating-point numbers (4 bytes, e.g., `3.14f`).\n- `double`: Double-precision floating-point numbers (8 bytes, e.g., `3.1415926535`).\n- `char`: Single ASCII character enclosed in single quotes (1 byte, e.g., `'A'`).\n\nStandard I/O functions in `<stdio.h>` rely on format specifiers:\n- `printf(\"Age: %d\", age)` prints the integer.\n- `scanf(\"%d\", &age)` reads an integer from user input into the address of `age` using the address-of operator `&`.",
    howItWorks: [
      {
        step: "Variable Allocation",
        detail: "`int score = 95;` reserves 4 bytes in RAM and stores value 95.",
      },
      {
        step: "Reading Input",
        detail: "`scanf(\"%d\", &score);` reads keyboard input and writes it directly to the memory address `&score`.",
      },
      {
        step: "Formatted Output",
        detail: "`printf(\"Score: %d\\n\", score);` replaces `%d` with the current value of `score`.",
      },
    ],
    practicalExample: {
      title: "Reading and Calculating Student Marks",
      description: "Demonstrating variable declaration, input with scanf, and formatted output with printf.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    int rollNumber = 101;
    float marks = 87.5f;
    char grade = 'A';

    printf("Student Roll: %d\\n", rollNumber);
    printf("Marks Scored: %.1f\\n", marks);
    printf("Grade: %c\\n", grade);

    return 0;
}`,
      language: "c",
      output: "Student Roll: 101\nMarks Scored: 87.5\nGrade: A",
      explanation:
        "`%.1f` formats floating-point values to exactly 1 decimal place. Single quotes are mandatory for single `char` literals.",
    },
    commonMistakes: [
      {
        mistake: "Forgetting the address-of `&` operator in `scanf(\"%d\", num)`.",
        fix: "`scanf` requires the pointer/address of the variable so it knows where to write: `scanf(\"%d\", &num)`.",
      },
      {
        mistake: "Using double quotes for single characters: `char c = \"A\";`.",
        fix: "Single characters use single quotes: `char c = 'A';`. Double quotes denote null-terminated string literals.",
      },
    ],
    quickRevision: [
      "`int` (4 bytes, `%d`), `float` (4 bytes, `%f`), `double` (8 bytes, `%lf`), `char` (1 byte, `%c`).",
      "Always supply `&` before variable names in `scanf` for non-string primitives.",
      "Variables must be declared with their type before being used.",
    ],
    checkUnderstanding: [
      {
        question: "Which format specifier is used with `printf` to display a single character?",
        options: ["%s", "%c", "%d", "%f"],
        answer: "%c",
        explanation: "`%c` outputs a single ASCII character, whereas `%s` outputs a string.",
      },
      {
        question: "Why must you pass `&variable` instead of `variable` into `scanf()`?",
        options: [
          "Because scanf needs the memory address to modify the variable's value",
          "Because scanf is a macro",
          "To convert numbers to characters",
          "To prevent compiler warnings",
        ],
        answer: "Because scanf needs the memory address to modify the variable's value",
        explanation: "C passes parameters by value; to let `scanf` store user input into your variable, it must know its memory location via `&`.",
      },
    ],
    prevTopicId: "c-intro-compilation",
    prevTopicTitle: "Introduction to C & Program Structure",
    nextTopicId: "c-operators-expressions",
    nextTopicTitle: "Operators and Expressions (Arithmetic, Relational, Logical, Bitwise)",
  },
  {
    id: "c-operators-expressions",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.3",
    title: "Operators and Expressions (Arithmetic, Relational, Logical, Bitwise)",
    readTimeMinutes: 8,
    why: "Operators are the building blocks of mathematical calculations, decision conditions, and hardware bit manipulations in C. Understanding operator types and precedence rules prevents insidious calculation and evaluation bugs.",
    need: "Writing algorithms requires arithmetic (`+`, `-`, `*`, `/`, `%`), comparisons (`==`, `!=`, `<`, `>`), and logical combinations (`&&`, `||`, `!`). Additionally, systems engineers must use bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) to manipulate individual bits in hardware control registers.",
    whatYouWillLearn: [
      "Arithmetic operators and integer division vs floating-point division",
      "Relational operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)",
      "Logical operators and short-circuit evaluation (`&&`, `||`, `!`)",
      "Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) for masking and flag manipulation",
      "Operator precedence and associativity rules",
    ],
    prerequisites: "Variables and data types (Topic 1.2).",
    conceptExplanation:
      "Expressions in C combine operands with operators:\n\n- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulus yields remainder of integer division: `7 % 3 = 1`). Note that integer division `7 / 2` yields `3`, truncating the fractional part.\n- **Relational**: Evaluates to `1` (true) or `0` (false), e.g., `5 > 2` evaluates to `1`.\n- **Logical**: `&&` (AND), `||` (OR), `!` (NOT). In C, `&&` and `||` exhibit short-circuit evaluation: if the left operand determines the outcome, the right operand is not evaluated.\n- **Bitwise**: Operates directly on binary bits:\n  - `&` (Bitwise AND): sets bit if both bits are 1 (used for masking).\n  - `|` (Bitwise OR): sets bit if either bit is 1 (used for setting flags).\n  - `^` (Bitwise XOR): toggles bits.\n  - `~` (Bitwise NOT): inverts all bits.\n  - `<<` and `>>`: shift bits left and right.",
    howItWorks: [
      {
        step: "Bitwise Masking (`PORT & 0x0F`)",
        detail: "Clears the top 4 bits while preserving the bottom 4 bits using bitwise AND.",
      },
      {
        step: "Bit Setting (`PORT |= (1 << 3)`)",
        detail: "Sets bit 3 high without changing any other bit in the register.",
      },
      {
        step: "Short-Circuit Logical Evaluation",
        detail: "In `(x != 0 && (100 / x) > 2)`, if `x == 0`, evaluation stops immediately, safely preventing division by zero.",
      },
    ],
    practicalExample: {
      title: "Arithmetic, Logical, and Bitwise Demonstration",
      description: "Comparing integer division, modulus, and setting/checking register bits.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    int a = 14, b = 4;
    printf("Integer division: %d / %d = %d\\n", a, b, a / b);
    printf("Modulus remainder: %d %% %d = %d\\n", a, b, a % b);

    // Bitwise flag setting
    unsigned char flags = 0x01; // 0000 0001
    flags |= (1 << 2);          // Set bit 2 -> 0000 0101 (0x05)
    printf("Flags after setting bit 2: 0x%02X\\n", flags);

    // Check if bit 2 is set
    int isBit2Set = (flags & (1 << 2)) != 0;
    printf("Is Bit 2 Set? %s\\n", isBit2Set ? "YES" : "NO");

    return 0;
}`,
      language: "c",
      output: "Integer division: 14 / 4 = 3\nModulus remainder: 14 % 4 = 2\nFlags after setting bit 2: 0x05\nIs Bit 2 Set? YES",
      explanation:
        "Integer division truncates `14 / 4` to `3`. The bitwise operation `(1 << 2)` produces mask `00000100`, which cleanly sets bit 2.",
    },
    commonMistakes: [
      {
        mistake: "Confusing bitwise AND `&` with logical AND `&&`.",
        fix: "`&` computes bit-by-bit AND (`5 & 2` is `0`). `&&` evaluates boolean truth (`5 && 2` is true / `1`).",
      },
      {
        mistake: "Expecting `5 / 2` to yield `2.5` with integer variables.",
        fix: "In C, integer divided by integer yields an integer. Cast at least one operand to float: `(float)5 / 2` to get `2.5`.",
      },
    ],
    quickRevision: [
      "`%` only works with integer types, not floating point.",
      "`&&` and `||` short-circuit; right-hand expressions may not run.",
      "Use `x |= (1 << n)` to set bit `n`, and `x &= ~(1 << n)` to clear bit `n`.",
      "Arithmetic operators have higher precedence than relational and logical operators.",
    ],
    checkUnderstanding: [
      {
        question: "What is the result of the expression `17 % 5` in C?",
        options: ["3.4", "3", "2", "0"],
        answer: "2",
        explanation: "17 divided by 5 is 3 with a remainder of 2. Modulus returns the integer remainder.",
      },
      {
        question: "What bitmask expression sets bit 3 of variable `status` without altering any other bits?",
        options: ["`status &= (1 << 3)`", "`status |= (1 << 3)`", "`status ^= (1 << 3)`", "`status = 3`"],
        answer: "`status |= (1 << 3)`",
        explanation: "Bitwise OR `|=` with `(1 << 3)` sets bit 3 to 1 while leaving all other bits unaffected.",
      },
    ],
    prevTopicId: "c-variables-types-operators",
    prevTopicTitle: "Variables, Data Types and Standard I/O (printf, scanf)",
    nextTopicId: "c-control-flow",
    nextTopicTitle: "Conditional Statements (if, if-else, nested if, switch-case)",
  },
  {
    id: "c-control-flow",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.4",
    title: "Conditional Statements (if, if-else, nested if, switch-case)",
    readTimeMinutes: 8,
    why: "Real-world systems must make decisions: an oven turns off heaters when temperature reaches 200°C, and an ATM dispenses cash only if balance is sufficient. Conditional branching gives your code the ability to evaluate conditions and choose appropriate execution paths.",
    need: "Without conditionals, programs could only execute every line in a rigid, single sequential sequence. `if`, `else if`, `else`, and `switch-case` allow handling varying input states, error validation, and multi-way branch dispatching.",
    whatYouWillLearn: [
      "`if`, `else if`, and `else` decision trees",
      "Nested conditionals and combining logical conditions",
      "`switch-case` syntax, jump tables, and fall-through mechanics",
      "The role and necessity of `break` in `switch` statements",
      "The ternary conditional operator (`condition ? val1 : val2`)",
    ],
    prerequisites: "Relational and logical operators (Topic 1.3).",
    conceptExplanation:
      "Control flow statements evaluate expressions to determine which code block executes:\n- **`if` Statement**: Evaluates a boolean expression. In C, any non-zero value is treated as true, and zero is treated as false.\n- **`else if` / `else`**: Provides alternative branches when prior conditions fail.\n- **`switch(expr)`**: Compares an integer or character expression against discrete `case` values. It is clearer and often compiled into an efficient assembly jump table for multi-branch logic.\n- **`break`**: Exits the switch block immediately. Without `break`, execution falls through into subsequent cases unconditionally.",
    howItWorks: [
      {
        step: "Condition Evaluation",
        detail: "The CPU tests the expression condition; if non-zero, it executes the enclosed block.",
      },
      {
        step: "Branch Skipping",
        detail: "Once a true `if` or `else if` branch executes, the remaining branches in the ladder are skipped.",
      },
      {
        step: "Switch Jump Table",
        detail: "The CPU jumps directly to the matching case label based on the integer expression value.",
      },
    ],
    practicalExample: {
      title: "Menu Selection with switch-case",
      description: "Handling user choice in an embedded CLI menu using switch-case.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    int choice = 2;

    switch (choice) {
        case 1:
            printf("Action: Read Sensor Data\\n");
            break;
        case 2:
            printf("Action: Calibrate System\\n");
            break;
        case 3:
            printf("Action: Power Down\\n");
            break;
        default:
            printf("Error: Invalid choice\\n");
            break;
    }

    return 0;
}`,
      language: "c",
      output: "Action: Calibrate System",
      explanation:
        "The switch evaluates `choice == 2`, jumping directly to `case 2:`. The `break;` prevents executing subsequent cases.",
    },
    commonMistakes: [
      {
        mistake: "Using assignment `=` instead of comparison `==` inside an `if`: `if (x = 5)`.",
        fix: "`x = 5` assigns 5 to `x` and evaluates to 5 (true). Always use `==` for comparison: `if (x == 5)`.",
      },
      {
        mistake: "Omitting `break` in a `switch-case` causing unintentional fall-through.",
        fix: "Always conclude each case with `break;` unless you deliberately intend for fall-through behavior.",
      },
    ],
    quickRevision: [
      "Any non-zero integer is true in C; exactly zero is false.",
      "Use `if-else` for range and complex boolean checks; use `switch` for discrete integer/char values.",
      "Always include a `default` case in switch statements to handle unexpected inputs.",
      "Ternary operator syntax: `result = (score >= 50) ? 'P' : 'F';`.",
    ],
    checkUnderstanding: [
      {
        question: "What is the output of `int x = 0; if (x = 10) printf(\"YES\"); else printf(\"NO\");`?",
        options: ["NO", "YES", "Compilation Error", "0"],
        answer: "YES",
        explanation: "`x = 10` is an assignment that sets `x` to 10 and evaluates to 10. Since 10 is non-zero, it is treated as true.",
      },
      {
        question: "What happens if you omit the `break;` statement in a `case` of a `switch` block?",
        options: [
          "A compiler syntax error is generated",
          "Execution immediately exits the switch",
          "Execution falls through and runs code in subsequent cases until a break or block end",
          "The program crashes",
        ],
        answer: "Execution falls through and runs code in subsequent cases until a break or block end",
        explanation: "C switch statements fall through by default unless explicitly stopped with a `break` statement.",
      },
    ],
    prevTopicId: "c-operators-expressions",
    prevTopicTitle: "Operators and Expressions (Arithmetic, Relational, Logical, Bitwise)",
    nextTopicId: "c-loops-iteration",
    nextTopicTitle: "Loops and Iteration (for, while, do-while, break & continue)",
  },
  {
    id: "c-loops-iteration",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.5",
    title: "Loops and Iteration (for, while, do-while, break & continue)",
    readTimeMinutes: 8,
    why: "Computing is fundamentally about automating repetitive tasks: processing thousands of sensor readings, waiting for hardware events, or traversing arrays. Loops enable you to execute a code block repeatedly until a termination condition is met.",
    need: "Writing code without loops would require duplicate copy-pasted statements for every repetition. Understanding loop boundaries, infinite loops, `break`, and `continue` prevents infinite freezes and off-by-one errors.",
    whatYouWillLearn: [
      "The `for` loop syntax: initialization, condition, and increment",
      "The `while` loop for condition-driven iteration",
      "The `do-while` loop for guaranteed at-least-once execution",
      "`break` to exit loops early, and `continue` to skip to the next iteration",
      "Nested loops for multi-dimensional operations and tables",
    ],
    prerequisites: "Conditionals and relational expressions (Topic 1.4).",
    conceptExplanation:
      "C provides three primary loop constructs:\n- **`for(init; condition; update)`**: Best suited when the number of iterations is known in advance (e.g., iterating through an array of 10 items).\n- **`while(condition)`**: Evaluates the condition before each iteration. If false initially, the body never runs.\n- **`do { ... } while(condition);`**: Evaluates the condition after each iteration, guaranteeing the body executes at least once (ideal for input menus).\n\nLoop control statements:\n- `break;`: Terminates the innermost loop immediately.\n- `continue;`: Skips the remainder of the current iteration and jumps directly to the loop update/condition step.",
    howItWorks: [
      {
        step: "Initialization",
        detail: "Sets the loop counter variable before entering the loop (e.g., `int i = 0`).",
      },
      {
        step: "Condition Test",
        detail: "If true, loop body executes; if false, loop terminates and program continues after the loop.",
      },
      {
        step: "Body & Update",
        detail: "After loop body statements run, the update step (`i++`) executes, and the condition is re-tested.",
      },
    ],
    practicalExample: {
      title: "Summing Even Numbers with Loop Control",
      description: "Using for loop with continue to sum only even numbers, and break when reaching a target.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) {
            continue; // Skip odd numbers
        }
        sum += i;
        printf("Added %d, running sum = %d\\n", i, sum);
        if (sum >= 20) {
            printf("Target sum reached! Breaking early.\\n");
            break;
        }
    }

    printf("Final Sum: %d\\n", sum);
    return 0;
}`,
      language: "c",
      output: "Added 2, running sum = 2\nAdded 4, running sum = 6\nAdded 6, running sum = 12\nAdded 8, running sum = 20\nTarget sum reached! Breaking early.\nFinal Sum: 20",
      explanation:
        "`continue` skips odd iterations without adding them. When `sum` hits 20, `break` terminates the loop before `i = 10` is evaluated.",
    },
    commonMistakes: [
      {
        mistake: "Placing a semicolon immediately after the loop header: `for (int i=0; i<10; i++); { ... }`.",
        fix: "The semicolon creates an empty loop body that spins 10 times doing nothing, followed by running the block once.",
      },
      {
        mistake: "Infinite loop caused by forgetting to update the loop counter variable inside a `while` loop.",
        fix: "Ensure variables tested in the loop condition are modified inside the loop body.",
      },
    ],
    quickRevision: [
      "Use `for` when iteration count is known; use `while` when looping depends on an external condition.",
      "`do-while` loops always execute at least once and end with a semicolon (`;`).",
      "`break` exits the loop entirely; `continue` skips only the current iteration.",
    ],
    checkUnderstanding: [
      {
        question: "How many times will a `do-while` loop execute its body if the condition is false from the start?",
        options: ["0 times", "Exactly 1 time", "Infinitely", "2 times"],
        answer: "Exactly 1 time",
        explanation: "`do-while` checks its condition at the bottom, guaranteeing at least one execution.",
      },
      {
        question: "What does the `continue` statement do inside a `for` loop?",
        options: [
          "Exits the program immediately",
          "Skips the rest of the current iteration and jumps directly to the update expression",
          "Restarts the loop from the beginning",
          "Resets the loop counter to 0",
        ],
        answer: "Skips the rest of the current iteration and jumps directly to the update expression",
        explanation: "`continue` bypasses remaining statements in the current iteration and advances the loop counter.",
      },
    ],
    prevTopicId: "c-control-flow",
    prevTopicTitle: "Conditional Statements (if, if-else, nested if, switch-case)",
    nextTopicId: "c-functions-scope",
    nextTopicTitle: "Functions, Parameter Passing & Scope of Variables",
  },
  {
    id: "c-functions-scope",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.6",
    title: "Functions, Parameter Passing & Scope of Variables",
    readTimeMinutes: 8,
    why: "Monolithic programs with hundreds of lines in `main()` are difficult to read, test, and maintain. Functions break programs into modular, reusable blocks, while scope rules keep variables localized and protect against unexpected side effects.",
    need: "Functions allow writing logic once and invoking it from anywhere. Understanding function prototypes, return types, pass-by-value semantics, and local vs static storage duration is essential for organized software architecture.",
    whatYouWillLearn: [
      "Function declaration (prototype) vs function definition",
      "Parameters, return types, and the `void` keyword",
      "Pass-by-value mechanics in C function calls",
      "Variable scope: local variables, global variables, and `static` local variables",
      "Stack frame allocation during function invocation",
    ],
    prerequisites: "Control flow and loops (Topics 1.4 and 1.5).",
    conceptExplanation:
      "A function is a named sequence of statements designed to perform a specific task:\n\n- **Declaration (Prototype)**: `int calculateTotal(int price, int tax);` informs the compiler of function signature before its call.\n- **Definition**: Contains the executable body statements and `return` value.\n- **Pass by Value**: In C, arguments are passed by value. The function receives duplicate copies of the values; altering a parameter inside the function has zero effect on the caller's variable.\n- **Scope & Lifetime**:\n  - *Local variables*: Exist on the CPU call stack only while the function is executing; destroyed upon return.\n  - *Global variables*: Declared outside functions; accessible throughout the file.\n  - *Static local variables*: Preserve their value across successive function calls while remaining scoped locally.",
    howItWorks: [
      {
        step: "Stack Frame Push",
        detail: "When a function is called, return address, arguments, and local variables are pushed onto the call stack.",
      },
      {
        step: "Execution",
        detail: "CPU runs function instructions using values stored in the current stack frame.",
      },
      {
        step: "Return & Stack Pop",
        detail: "On `return`, return value is passed back, stack frame is popped, and execution resumes in caller.",
      },
    ],
    practicalExample: {
      title: "Modular Temperature Conversion & Call Counter",
      description: "Using helper function to convert Celsius to Fahrenheit, with static variable counting calls.",
      codeOrSpec: `#include <stdio.h>

// Function prototype
float celsiusToFahrenheit(float celsius);

int main(void) {
    printf("25 C = %.1f F\\n", celsiusToFahrenheit(25.0f));
    printf("0 C  = %.1f F\\n", celsiusToFahrenheit(0.0f));
    printf("100 C= %.1f F\\n", celsiusToFahrenheit(100.0f));
    return 0;
}

// Function definition
float celsiusToFahrenheit(float celsius) {
    static int callCount = 0; // Retains value across calls
    callCount++;
    printf("[Call #%d] Converting %.1f C... ", callCount, celsius);
    return (celsius * 9.0f / 5.0f) + 32.0f;
}`,
      language: "c",
      output: "[Call #1] Converting 25.0 C... 25 C = 77.0 F\n[Call #2] Converting 0.0 C... 0 C  = 32.0 F\n[Call #3] Converting 100.0 C... 100 C= 212.0 F",
      explanation:
        "`callCount` is declared `static`, so it persists across calls rather than re-initializing to 0 on every call.",
    },
    commonMistakes: [
      {
        mistake: "Calling a function before its declaration or prototype is visible.",
        fix: "Declare the function prototype at the top of the file before `main()` so the compiler can verify argument types.",
      },
      {
        mistake: "Expecting changes made to an integer parameter inside a function to modify the caller's variable.",
        fix: "C passes by value. To modify caller variables, pass memory addresses using pointers (covered in Topic 1.11).",
      },
    ],
    quickRevision: [
      "Function prototypes inform the compiler of return types and parameter types.",
      "Arguments are passed by value in C.",
      "`static` local variables retain their values across function invocations.",
      "A function returning `void` does not return any value to the caller.",
    ],
    checkUnderstanding: [
      {
        question: "What happens to a normal local variable when its containing function returns?",
        options: [
          "It is automatically preserved in heap memory",
          "Its stack memory is released and can be reused by other functions",
          "It is promoted to a global variable",
          "It causes a compiler warning",
        ],
        answer: "Its stack memory is released and can be reused by other functions",
        explanation: "Automatic local variables exist only for the duration of the function's stack frame.",
      },
      {
        question: "What is the key characteristic of a `static` local variable inside a function?",
        options: [
          "It can be modified by any other function in the file",
          "It retains its value between successive calls to that function while remaining locally scoped",
          "It is read-only and cannot be changed",
          "It forces the function to execute in parallel",
        ],
        answer: "It retains its value between successive calls to that function while remaining locally scoped",
        explanation: "`static` allocates the variable in data memory rather than the stack, preserving state between calls.",
      },
    ],
    prevTopicId: "c-loops-iteration",
    prevTopicTitle: "Loops and Iteration (for, while, do-while, break & continue)",
    nextTopicId: "c-recursion-basics",
    nextTopicTitle: "Recursion and Recursive Problem Solving",
  },
  {
    id: "c-recursion-basics",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.7",
    title: "Recursion and Recursive Problem Solving",
    readTimeMinutes: 8,
    why: "Recursion is a fundamental problem-solving technique where a problem is solved by breaking it down into smaller instances of the same problem. It provides elegant solutions for divide-and-conquer algorithms, tree traversals, and mathematical sequences.",
    need: "Many computational tasks (like computing factorials, binary search, and traversing hierarchical structures) have naturally recursive mathematical definitions. Mastering the base case and recursive step develops strong computational reasoning.",
    whatYouWillLearn: [
      "The anatomy of a recursive function: Base Case and Recursive Step",
      "How the call stack tracks recursive function calls",
      "Tracing recursion: Factorial and Fibonacci calculations",
      "Stack overflow risks and preventing infinite recursion",
      "Comparing recursive solutions vs iterative loops",
    ],
    prerequisites: "Functions and stack frames (Topic 1.6).",
    conceptExplanation:
      "A recursive function is simply a function that calls itself to solve a smaller subproblem.\n\nEvery correct recursive function MUST have two parts:\n1. **Base Case**: A stopping condition where the answer is known directly without any further recursive calls (e.g., `0! = 1`).\n2. **Recursive Step**: The function calls itself with a strictly smaller or simpler input (e.g., `n! = n * (n - 1)!`).\n\nDuring execution, each recursive call pushes a new stack frame onto the memory stack. Once the base case is reached, values return back up the call stack ('unwinding the stack'). If a recursive function lacks a valid base case, it calls itself indefinitely until stack memory is exhausted, crashing with a Stack Overflow.",
    howItWorks: [
      {
        step: "Winding Phase",
        detail: "The function calls itself with `n - 1`, pushing stack frames until the base case condition evaluates to true.",
      },
      {
        step: "Base Case Hit",
        detail: "When `n <= 1`, recursion stops and returns a constant value directly without making further calls.",
      },
      {
        step: "Unwinding Phase",
        detail: "Return values cascade back down the call stack, performing multiplications until `main()` receives the result.",
      },
    ],
    practicalExample: {
      title: "Factorial and Fibonacci via Recursion",
      description: "Demonstrating recursive factorial calculation with step-by-step call logging.",
      codeOrSpec: `#include <stdio.h>

long long factorial(int n) {
    // 1. Base case
    if (n <= 1) {
        return 1;
    }
    // 2. Recursive step
    return n * factorial(n - 1);
}

int main(void) {
    int num = 5;
    printf("Factorial of %d is: %lld\\n", num, factorial(num));
    return 0;
}`,
      language: "c",
      output: "Factorial of 5 is: 120",
      explanation:
        "Execution trace: `factorial(5)` calls `factorial(4)` -> `factorial(3)` -> `factorial(2)` -> `factorial(1) = 1`. Then unwinds: `2 * 1 = 2`, `3 * 2 = 6`, `4 * 6 = 24`, `5 * 24 = 120`.",
    },
    commonMistakes: [
      {
        mistake: "Missing or incorrect base case causing infinite recursion and stack overflow crash.",
        fix: "Always write and verify the base case before writing the recursive step.",
      },
      {
        mistake: "Using deep recursion on memory-constrained systems or microcontrollers.",
        fix: "Each recursive call consumes stack memory. For deep iterations (e.g., N = 100,000), prefer iterative `for` loops.",
      },
    ],
    quickRevision: [
      "Every recursive function requires a base case and a recursive progression step.",
      "Recursion consumes stack memory proportional to the maximum recursion depth.",
      "Unwinding occurs after the base case is reached.",
      "Iterative loops are generally more memory-efficient than naive recursive calls in C.",
    ],
    checkUnderstanding: [
      {
        question: "What happens if a recursive function does not include a base case?",
        options: [
          "The program completes instantly with output 0",
          "The compiler rejects the code with a syntax error",
          "The function calls itself indefinitely until stack memory is exhausted (Stack Overflow)",
          "The loop converts to an iterative for loop",
        ],
        answer: "The function calls itself indefinitely until stack memory is exhausted (Stack Overflow)",
        explanation: "Without a termination condition, new stack frames are created continuously until memory is depleted.",
      },
      {
        question: "In computing `factorial(4)`, how many total stack frames are pushed for the `factorial` function?",
        options: ["1", "4", "5", "8"],
        answer: "4",
        explanation: "Calls are made for n = 4, n = 3, n = 2, and n = 1 (the base case), resulting in 4 stack frames.",
      },
    ],
    prevTopicId: "c-functions-scope",
    prevTopicTitle: "Functions, Parameter Passing & Scope of Variables",
    nextTopicId: "c-arrays-basics",
    nextTopicTitle: "1D and 2D Arrays (Declaration, Traversal & Matrices)",
  },
  {
    id: "c-arrays-basics",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.8",
    title: "1D and 2D Arrays (Declaration, Traversal & Matrices)",
    readTimeMinutes: 8,
    why: "Real-world data rarely comes as isolated single numbers. Sensor telemetry, audio samples, image pixels, and spreadsheet tables exist as collections of numbers. Arrays provide contiguous blocks of memory where multiple values of the same type are indexed efficiently.",
    need: "Creating 100 separate variables (`sensor1`, `sensor2`, ... `sensor100`) is unmanageable. Arrays enable organizing thousands of items under a single variable name, traversed effortlessly with loops using integer indices.",
    whatYouWillLearn: [
      "1D array declaration, initialization, and contiguous memory layout",
      "0-indexed array access and out-of-bounds safety",
      "Traversing, searching, and calculating statistics (sum, average, min, max)",
      "2D arrays: matrices, rows, and columns",
      "Passing arrays into functions",
    ],
    prerequisites: "Loops and functions (Topics 1.5 and 1.6).",
    conceptExplanation:
      "An array is a fixed-size, contiguous sequence of elements sharing the same data type:\n\n- **Declaration**: `int readings[5] = {12, 24, 36, 48, 60};` allocates `5 * sizeof(int) = 20` consecutive bytes in memory.\n- **0-Based Indexing**: In C, array indices start at `0` and end at `size - 1`. `readings[0]` is 12, and `readings[4]` is 60.\n- **Out-of-Bounds**: C does NOT perform runtime boundary checking! Accessing `readings[5]` reads or writes to adjacent memory, causing undefined behavior or crashes.\n- **2D Arrays**: Declared as `int matrix[rows][cols]`. Stored in row-major order, where each row sits sequentially in memory.",
    howItWorks: [
      {
        step: "Contiguous Memory Layout",
        detail: "Element `arr[i]` is stored at memory address: `BaseAddress + (i * sizeof(type))`.",
      },
      {
        step: "Linear Traversal",
        detail: "A standard `for (int i = 0; i < N; i++)` loop visits each element in sequence.",
      },
      {
        step: "Matrix Indexing",
        detail: "A 2D array `matrix[r][c]` accesses row `r` and column `c` using nested loops.",
      },
    ],
    practicalExample: {
      title: "Array Analysis and 2D Matrix Summation",
      description: "Calculating maximum value in a 1D array and traversing a 2x3 matrix.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    // 1D Array Analysis
    int scores[5] = {78, 92, 65, 88, 95};
    int max = scores[0];

    for (int i = 1; i < 5; i++) {
        if (scores[i] > max) {
            max = scores[i];
        }
    }
    printf("Highest Score: %d\\n", max);

    // 2D Array (2 rows, 3 columns)
    int grid[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("2D Grid Elements:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", grid[r][c]);
        }
        printf("\\n");
    }

    return 0;
}`,
      language: "c",
      output: "Highest Score: 95\n2D Grid Elements:\n1 2 3 \n4 5 6",
      explanation:
        "The 1D loop compares each element to find the maximum. The nested loops cleanly traverse rows and columns of the 2D grid.",
    },
    commonMistakes: [
      {
        mistake: "Off-by-one error: iterating `for (int i = 0; i <= size; i++)`.",
        fix: "For an array of size `N`, valid indices are `0` through `N - 1`. Always iterate with `< size`.",
      },
      {
        mistake: "Attempting to assign one array directly to another: `arr2 = arr1;`.",
        fix: "Arrays cannot be copied using the assignment operator. You must copy elements individually in a loop or use `memcpy()`.",
      },
    ],
    quickRevision: [
      "Arrays in C are 0-indexed and stored contiguously in memory.",
      "C does not check array boundaries at runtime; guard indices carefully.",
      "2D arrays are stored in row-major order.",
      "When passing an array to a function, pass its length as a separate argument.",
    ],
    checkUnderstanding: [
      {
        question: "For an array declared as `int data[10];`, what is the index of the final valid element?",
        options: ["10", "9", "11", "0"],
        answer: "9",
        explanation: "Because C uses 0-based indexing, a 10-element array has valid indices from 0 to 9.",
      },
      {
        question: "How many total bytes of memory does `float samples[20];` occupy on a system where float is 4 bytes?",
        options: ["20 bytes", "40 bytes", "80 bytes", "160 bytes"],
        answer: "80 bytes",
        explanation: "Total memory = 20 elements * 4 bytes per float = 80 contiguous bytes.",
      },
    ],
    prevTopicId: "c-recursion-basics",
    prevTopicTitle: "Recursion and Recursive Problem Solving",
    nextTopicId: "c-strings-manipulation",
    nextTopicTitle: "Strings and Character Arrays (string.h Library Functions)",
  },
  {
    id: "c-strings-manipulation",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.9",
    title: "Strings and Character Arrays (string.h Library Functions)",
    readTimeMinutes: 8,
    why: "Software constantly handles text: user names, serial communication commands, error messages, and configuration strings. In C, strings are not a dedicated primitive object; they are character arrays terminated by a null character (`\\0`).",
    need: "Unlike higher-level languages that manage string memory automatically, C requires you to understand the null terminator, memory sizing, and standard library manipulation functions (`strlen`, `strcpy`, `strcat`, `strcmp`) to prevent severe buffer overflow security vulnerabilities.",
    whatYouWillLearn: [
      "The nature of C strings and the null terminator (`'\\0'`)",
      "Reading strings safely with `fgets()` instead of dangerous `gets()` or `scanf(\"%s\")`",
      "Standard string functions from `<string.h>`: `strlen`, `strcpy`, `strcat`, `strcmp`",
      "String comparisons and lexical ordering",
      "Preventing buffer overflows and allocating proper string storage",
    ],
    prerequisites: "1D arrays and character types (Topics 1.2 and 1.8).",
    conceptExplanation:
      "In C, a string is an array of characters ending with the special byte value zero: the null terminator (`'\\0'`).\n\n- `char name[6] = \"Skill\";` holds 5 visible letters plus `'\\0'` at index 5. The array must be sized to at least `length + 1`.\n- **String Length vs Array Size**: `strlen(\"Skill\")` returns `5` (counts characters before `'\\0'`), while `sizeof(name)` returns `6` (total bytes allocated).\n- **Core `<string.h>` Functions**:\n  - `strlen(s)`: Returns count of characters excluding the null terminator.\n  - `strcpy(dest, src)`: Copies `src` string into `dest` buffer.\n  - `strcat(dest, src)`: Appends `src` string onto the end of `dest`.\n  - `strcmp(s1, s2)`: Returns `0` if strings are identical, `< 0` if `s1 < s2`, or `> 0` if `s1 > s2`.",
    howItWorks: [
      {
        step: "Null-Byte Sentinel",
        detail: "Functions like `printf(\"%s\", str)` iterate through memory until they encounter the first `\\0` byte.",
      },
      {
        step: "Safe Input (`fgets`)",
        detail: "`fgets(buffer, sizeof(buffer), stdin)` reads a line safely, never exceeding the buffer capacity.",
      },
      {
        step: "Comparison",
        detail: "`strcmp` compares ASCII values character by character until finding a mismatch or reaching the null terminator.",
      },
    ],
    practicalExample: {
      title: "Safe String Operations and Comparison",
      description: "Using strlen, strcpy, strcat, and strcmp safely.",
      codeOrSpec: `#include <stdio.h>
#include <string.h>

int main(void) {
    char greeting[32] = "Hello";
    char target[] = "World";

    // Append target to greeting
    strcat(greeting, ", ");
    strcat(greeting, target);
    strcat(greeting, "!");

    printf("Result: %s\\n", greeting);
    printf("Length: %zu characters\\n", strlen(greeting));

    // String comparison
    if (strcmp(target, "World") == 0) {
        printf("Match found: target is 'World'\\n");
    }

    return 0;
}`,
      language: "c",
      output: "Result: Hello, World!\nLength: 13 characters\nMatch found: target is 'World'",
      explanation:
        "`greeting` was allocated 32 bytes, providing ample room for concatenated characters and the final `\\0`.",
    },
    commonMistakes: [
      {
        mistake: "Forgetting to allocate space for the null terminator: `char word[5] = \"hello\";`.",
        fix: "\"hello\" has 5 letters and requires 6 bytes to include `'\\0'`. Always size buffers to `length + 1`.",
      },
      {
        mistake: "Using `==` to compare strings: `if (str1 == str2)`.",
        fix: "`==` compares memory addresses, not string contents! Always use `strcmp(str1, str2) == 0` to compare text.",
      },
    ],
    quickRevision: [
      "Every valid C string must end with the null terminator `\\0`.",
      "`strlen()` counts characters up to (excluding) `\\0`.",
      "Use `strcmp(s1, s2) == 0` for content comparison, not `==`.",
      "Always use `fgets()` instead of `gets()` to prevent buffer overflow vulnerabilities.",
    ],
    checkUnderstanding: [
      {
        question: "What does `strcmp(\"Apple\", \"Apple\")` return?",
        options: ["1", "-1", "0", "true"],
        answer: "0",
        explanation: "`strcmp` returns exactly 0 when both strings are identical character-by-character.",
      },
      {
        question: "How many bytes are required in memory to store the string literal `\"Embedded\"`?",
        options: ["8 bytes", "9 bytes", "10 bytes", "7 bytes"],
        answer: "9 bytes",
        explanation: "`\"Embedded\"` contains 8 alphabetic characters plus 1 byte for the trailing `\\0` null terminator.",
      },
    ],
    prevTopicId: "c-arrays-basics",
    prevTopicTitle: "1D and 2D Arrays (Declaration, Traversal & Matrices)",
    nextTopicId: "c-pointers-memory",
    nextTopicTitle: "Pointers and Memory Addressing (&, *, Dereferencing)",
  },
  {
    id: "c-pointers-memory",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.10",
    title: "Pointers and Memory Addressing (&, *, Dereferencing)",
    readTimeMinutes: 9,
    why: "Pointers are the most powerful feature of C. They provide direct access to computer memory, enabling high performance, efficient data structures, and hardware register manipulation.",
    need: "High-level languages hide physical memory addresses from you. In systems programming, embedded firmware, and operating systems, you must know exactly where bytes live in RAM to interface with hardware, share data without copying, and build dynamic data structures.",
    whatYouWillLearn: [
      "What a memory address is and how RAM is organized in bytes",
      "The address-of operator (`&`) and pointer declaration syntax (`int *ptr`)",
      "The dereference operator (`*`) to read and write memory values",
      "NULL pointers and defensive pointer checking",
      "Pointer sizing across 32-bit and 64-bit architectures",
    ],
    prerequisites: "Variables and data types (Topic 1.2).",
    conceptExplanation:
      "A pointer is simply a variable whose value is the memory address of another variable.\n\n- `&x`: Evaluates to the hexadecimal memory address where `x` is stored in RAM.\n- `int *ptr = &x;`: Declares a pointer variable named `ptr` that stores the address of integer `x`.\n- `*ptr`: Dereferences the pointer. It reads or writes the actual value stored at the address contained in `ptr`.\n\nFor example, if variable `temp` holds 42 at address `0x7FFF00`, then `ptr` contains `0x7FFF00`. Writing `*ptr = 99;` changes the value of `temp` to 99 directly in memory.",
    howItWorks: [
      {
        step: "Address Lookup (`&`)",
        detail: "The compiler assigns every variable a memory location; `&var` retrieves that physical address.",
      },
      {
        step: "Pointer Storage",
        detail: "The pointer variable stores that address (occupying 4 bytes on 32-bit systems or 8 bytes on 64-bit systems).",
      },
      {
        step: "Dereferencing (`*`)",
        detail: "The CPU looks up the address stored in the pointer and accesses the underlying data bytes in RAM.",
      },
    ],
    practicalExample: {
      title: "Pointer Inspection and Value Modification",
      description: "Examining memory addresses and modifying a variable through a pointer.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    int sensorValue = 100;
    int *pSensor = &sensorValue; // pSensor stores address of sensorValue

    printf("sensorValue Value:   %d\\n", sensorValue);
    printf("sensorValue Address: %p\\n", (void*)&sensorValue);
    printf("pSensor Stored Addr: %p\\n", (void*)pSensor);
    printf("Value via *pSensor:  %d\\n", *pSensor);

    // Modify sensorValue through pointer
    *pSensor = 250;
    printf("After *pSensor = 250 -> sensorValue: %d\\n", sensorValue);

    return 0;
}`,
      language: "c",
      output: "sensorValue Value:   100\nsensorValue Address: 0x7ffd9a00\npSensor Stored Addr: 0x7ffd9a00\nValue via *pSensor:  100\nAfter *pSensor = 250 -> sensorValue: 250",
      explanation:
        "Assigning through `*pSensor = 250` directly altered `sensorValue` because `pSensor` holds its memory address.",
    },
    commonMistakes: [
      {
        mistake: "Dereferencing uninitialized (wild) pointers: `int *p; *p = 10;`.",
        fix: "An uninitialized pointer contains random garbage address. Writing to it causes Segmentation Faults. Always initialize to `NULL` or a valid address.",
      },
      {
        mistake: "Confusing pointer declaration `int *p;` with dereferencing `*p = 5;`.",
        fix: "In a declaration, `*` indicates the variable is a pointer. In an expression, `*` accesses the value at that address.",
      },
    ],
    quickRevision: [
      "`&` returns the memory address of a variable.",
      "`*` dereferences a pointer to read or write the value at the stored address.",
      "Always initialize pointers: `int *ptr = NULL;`.",
      "Check pointers for `NULL` before dereferencing to prevent fatal crashes.",
    ],
    checkUnderstanding: [
      {
        question: "If variable `count` is located at address `0x2000`, what does `&count` evaluate to?",
        options: ["The value inside count", "0x2000", "0", "A syntax error"],
        answer: "0x2000",
        explanation: "The `&` operator retrieves the memory address where the variable resides.",
      },
      {
        question: "What does the expression `*ptr = 50;` do?",
        options: [
          "Changes the memory address stored inside ptr to 50",
          "Stores the value 50 into the memory location pointed to by ptr",
          "Multiplies ptr by 50",
          "Compares ptr with 50",
        ],
        answer: "Stores the value 50 into the memory location pointed to by ptr",
        explanation: "Dereferencing with `*ptr` accesses the target memory location and writes 50 into it.",
      },
    ],
    prevTopicId: "c-strings-manipulation",
    prevTopicTitle: "Strings and Character Arrays (string.h Library Functions)",
    nextTopicId: "c-pointers-advanced",
    nextTopicTitle: "Pointers with Arrays and Functions (Call by Reference)",
  },
  {
    id: "c-pointers-advanced",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.11",
    title: "Pointers with Arrays and Functions (Call by Reference)",
    readTimeMinutes: 9,
    why: "In C, arrays and pointers share an intimate relationship, and functions can only modify their callers' variables when passed pointers (call-by-reference). Mastering pointer arithmetic and pointer-based parameter passing unlocks true systems-level programming.",
    need: "Without call-by-reference, functions cannot return multiple values (e.g., getting min and max in one call, or returning coordinates). Furthermore, passing large arrays by pointer avoids copying thousands of bytes onto the stack.",
    whatYouWillLearn: [
      "Pointer arithmetic: how adding 1 advances by `sizeof(type)` bytes",
      "Array decaying: how an array name acts as a pointer to its first element",
      "Subscript equivalence: `arr[i]` is identical to `*(arr + i)`",
      "Call-by-reference: passing pointers to let functions modify caller variables",
      "Passing arrays into functions using pointer notation",
    ],
    prerequisites: "Pointers basics and arrays (Topics 1.8 and 1.10).",
    conceptExplanation:
      "Two key concepts define advanced pointer mechanics in C:\n\n1. **Pointer Arithmetic**: When you add an integer `k` to a pointer, the compiler multiplies `k` by `sizeof(*ptr)` bytes. If an `int` pointer holds address `1000`, `ptr + 1` evaluates to `1004` (not 1001) because an `int` occupies 4 bytes.\n2. **Array-Pointer Duality**: In most expressions, an array's name decays into a pointer to its first element: `arr == &arr[0]`. Consequently, `arr[i]` is evaluated as `*(arr + i)`.\n3. **Call-by-Reference**: Passing `&x` and receiving `int *x` enables a function to dereference the pointer and mutate the caller's variable in place.",
    howItWorks: [
      {
        step: "Pass Address",
        detail: "Caller passes address of variable to function: `swap(&a, &b);`.",
      },
      {
        step: "Receive Pointer",
        detail: "Function receives addresses into pointers: `void swap(int *x, int *y)`.",
      },
      {
        step: "Dereference & Update",
        detail: "`*x = *y;` modifies the caller's original memory directly.",
      },
    ],
    practicalExample: {
      title: "Call-by-Reference Swap and Array Traversal",
      description: "Implementing swap function and traversing array using pointer arithmetic.",
      codeOrSpec: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    printf("Before swap: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x = %d, y = %d\\n", x, y);

    // Pointer arithmetic over array
    int numbers[3] = {100, 200, 300};
    int *ptr = numbers; // Points to numbers[0]

    for (int i = 0; i < 3; i++) {
        printf("Index %d: value = %d via *(ptr + %d)\\n", i, *(ptr + i), i);
    }

    return 0;
}`,
      language: "c",
      output: "Before swap: x = 10, y = 20\nAfter swap:  x = 20, y = 10\nIndex 0: value = 100 via *(ptr + 0)\nIndex 1: value = 200 via *(ptr + 1)\nIndex 2: value = 300 via *(ptr + 2)",
      explanation:
        "`swap(&x, &y)` successfully swapped variables in `main` because pointers gave direct access to `x` and `y` memory addresses.",
    },
    commonMistakes: [
      {
        mistake: "Passing variable values instead of addresses to functions expecting pointers: `swap(x, y)`.",
        fix: "You must pass addresses using the address-of operator: `swap(&x, &y)`.",
      },
      {
        mistake: "Assuming `ptr + 1` increments address by 1 byte.",
        fix: "`ptr + 1` increments address by `1 * sizeof(*ptr)`. For a 4-byte `int`, it increments by 4 bytes.",
      },
    ],
    quickRevision: [
      "`arr[i]` and `*(arr + i)` are completely identical in C.",
      "An array name decays into a pointer to its first element in expressions.",
      "Pointer arithmetic automatically scales by the size of the referenced data type.",
      "Call-by-reference in C is implemented by passing pointers.",
    ],
    checkUnderstanding: [
      {
        question: "If `ptr` points to address `0x5000` of type `double` (8 bytes), what address does `ptr + 2` point to?",
        options: ["0x5002", "0x5008", "0x5010 (0x5000 + 16 bytes)", "0x5016"],
        answer: "0x5010 (0x5000 + 16 bytes)",
        explanation: "Adding 2 advances the pointer by `2 * sizeof(double) = 2 * 8 = 16` (0x10 in hex) bytes -> 0x5010.",
      },
      {
        question: "Which syntax correctly passes the address of `int num` into a function `void update(int *val)`?",
        options: ["`update(num);`", "`update(&num);`", "`update(*num);`", "`update(int num);`"],
        answer: "`update(&num);`",
        explanation: "`&num` extracts the memory address of `num`, matching the `int *val` pointer parameter.",
      },
    ],
    prevTopicId: "c-pointers-memory",
    prevTopicTitle: "Pointers and Memory Addressing (&, *, Dereferencing)",
    nextTopicId: "c-dynamic-memory",
    nextTopicTitle: "Dynamic Memory Allocation (malloc, calloc, realloc, free)",
  },
  {
    id: "c-dynamic-memory",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.12",
    title: "Dynamic Memory Allocation (malloc, calloc, realloc, free)",
    readTimeMinutes: 8,
    why: "Fixed-size static arrays either waste memory if sized too large or cause buffer overflows if sized too small. Dynamic memory allocation on the Heap allows allocating exactly the memory you need at runtime and reclaiming it when finished.",
    need: "When reading an unknown number of user records or sensor logs from disk or network, the buffer size cannot be hardcoded at compile time. Functions from `<stdlib.h>` (`malloc`, `calloc`, `realloc`, `free`) give you complete control over runtime memory.",
    whatYouWillLearn: [
      "Stack memory vs Heap memory architecture",
      "Allocating memory using `malloc()` and zero-initialized `calloc()`",
      "Resizing memory buffers dynamically with `realloc()`",
      "Releasing memory with `free()` and preventing memory leaks",
      "Handling allocation failure (`NULL` check) and avoiding dangling pointers",
    ],
    prerequisites: "Pointers and memory addressing (Topics 1.10 and 1.11).",
    conceptExplanation:
      "Program memory is split into distinct regions:\n- **Stack**: Fast, automatic memory managed by the CPU for local variables. Discarded automatically when functions return.\n- **Heap**: A large reservoir of memory managed explicitly by the programmer using runtime library functions:\n  - `malloc(size)`: Allocates `size` uninitialized bytes. Returns `void*` or `NULL` on failure.\n  - `calloc(num, size)`: Allocates memory for `num` elements of `size` bytes each, initializing all bytes to zero.\n  - `realloc(ptr, new_size)`: Expands or shrinks an existing heap block, relocating data if necessary.\n  - `free(ptr)`: Releases the allocated block back to the operating system heap.",
    howItWorks: [
      {
        step: "Heap Allocation",
        detail: "Program requests N bytes: `int *arr = malloc(10 * sizeof(int));`.",
      },
      {
        step: "NULL Verification",
        detail: "Always verify `arr != NULL` before writing to ensure RAM was available.",
      },
      {
        step: "Deallocation & Cleanup",
        detail: "`free(arr); arr = NULL;` returns the memory and invalidates the pointer.",
      },
    ],
    practicalExample: {
      title: "Allocating and Resizing a Dynamic Array",
      description: "Using malloc, verifying allocation, resizing with realloc, and freeing cleanly.",
      codeOrSpec: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int initialCount = 3;
    int *numbers = (int *)malloc(initialCount * sizeof(int));

    if (numbers == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < initialCount; i++) {
        numbers[i] = (i + 1) * 10;
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    // Free memory when done
    free(numbers);
    numbers = NULL; // Prevent dangling pointer
    printf("Memory successfully freed.\\n");

    return 0;
}`,
      language: "c",
      output: "numbers[0] = 10\nnumbers[1] = 20\nnumbers[2] = 30\nMemory successfully freed.",
      explanation:
        "Setting `numbers = NULL` after `free()` guarantees that any accidental future access fails predictably rather than causing silent corruption.",
    },
    commonMistakes: [
      {
        mistake: "Memory Leak: allocating heap memory repeatedly without calling `free()`.",
        fix: "Every call to `malloc`/`calloc` must be paired with an eventual `free()` when the data is no longer needed.",
      },
      {
        mistake: "Double Free: calling `free(ptr)` twice on the same memory block.",
        fix: "Double free corrupts heap metadata and causes immediate crashes. Set `ptr = NULL` immediately after freeing.",
      },
    ],
    quickRevision: [
      "`malloc` leaves memory uninitialized; `calloc` zeroes all allocated bytes.",
      "Always check if the returned pointer is `NULL` before using it.",
      "Every successful heap allocation must eventually be freed with `free()`.",
      "Assign pointer to `NULL` after freeing to prevent dangling pointer bugs.",
    ],
    checkUnderstanding: [
      {
        question: "What does `malloc()` return when the system has insufficient free RAM to fulfill the request?",
        options: ["0xFFFFFFFF", "NULL", "A pointer to address 0x0001", "It terminates the program automatically"],
        answer: "NULL",
        explanation: "`malloc` returns `NULL` when an allocation fails, which is why safe programs always check for `NULL`.",
      },
      {
        question: "What is a 'memory leak' in C?",
        options: [
          "Memory corrupted by electromagnetic interference",
          "Heap memory allocated by the program that is never freed, wasting available RAM",
          "Reading past the end of an array",
          "A syntax error in malloc",
        ],
        answer: "Heap memory allocated by the program that is never freed, wasting available RAM",
        explanation: "Failing to call `free()` causes heap memory to remain allocated even after the program stops using it.",
      },
    ],
    prevTopicId: "c-pointers-advanced",
    prevTopicTitle: "Pointers with Arrays and Functions (Call by Reference)",
    nextTopicId: "c-structures-unions-bitfields",
    nextTopicTitle: "Structures, Typedef and Unions",
  },
  {
    id: "c-structures-unions-bitfields",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.13",
    title: "Structures, Typedef and Unions",
    readTimeMinutes: 8,
    why: "Real-world entities are composed of heterogeneous data: a student record has an ID (`int`), a name (`char[]`), and a GPA (`float`). Structures enable grouping disparate variables into a unified custom record type.",
    need: "Passing 5 separate related variables to every function leads to messy, fragile code. Structures (`struct`), clean type aliases (`typedef`), and memory-sharing unions (`union`) provide the foundational building blocks for complex data models.",
    whatYouWillLearn: [
      "Defining composite data structures using `struct`",
      "Creating readable type aliases with `typedef`",
      "Accessing struct members: dot operator (`.`) vs arrow operator (`->`) for pointers",
      "Passing structures to functions by value vs by reference (pointer)",
      "How `union` shares memory across members to save space",
    ],
    prerequisites: "Pointers and data types (Topics 1.2 and 1.10).",
    conceptExplanation:
      "- **Structure (`struct`)**: A custom compound data type that packages variables of different types together. Each member occupies its own distinct address offset in memory.\n- **`typedef`**: Creates a convenient alias for types, allowing you to write `Student s1;` instead of `struct Student s1;`.\n- **Member Access Operators**:\n  - Dot operator (`.`): Used when accessing a member on a structure instance directly: `s1.id = 101;`.\n  - Arrow operator (`->`): Used when accessing a member through a pointer to a structure: `ptr->id = 101;` (shorthand for `(*ptr).id`).\n- **Union (`union`)**: Stores multiple members at the exact same physical memory address. Its total size equals only the size of its largest member.",
    howItWorks: [
      {
        step: "Type Definition",
        detail: "Define the structure layout and create a clean alias using `typedef struct { ... } TypeName;`.",
      },
      {
        step: "Memory Allocation",
        detail: "The compiler allocates contiguous memory holding all struct members sequentially.",
      },
      {
        step: "Pointer Access (`->`)",
        detail: "The arrow operator dereferences the struct pointer and offsets directly to the target member.",
      },
    ],
    practicalExample: {
      title: "Student Record Management with struct and typedef",
      description: "Defining a Student structure, initializing records, and updating GPA via pointer.",
      codeOrSpec: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    float gpa;
} Student;

void updateGpa(Student *s, float newGpa) {
    s->gpa = newGpa; // Arrow operator updates member via pointer
}

int main(void) {
    Student s1;
    s1.id = 101;
    strcpy(s1.name, "Alex");
    s1.gpa = 3.65f;

    printf("Student: %s (ID: %d), GPA: %.2f\\n", s1.name, s1.id, s1.gpa);
    updateGpa(&s1, 3.90f);
    printf("After Update -> GPA: %.2f\\n", s1.gpa);

    return 0;
}`,
      language: "c",
      output: "Student: Alex (ID: 101), GPA: 3.65\nAfter Update -> GPA: 3.90",
      explanation:
        "`updateGpa(&s1, ...)` passed a pointer to `s1`, allowing `s->gpa = newGpa` to update the original record in place.",
    },
    commonMistakes: [
      {
        mistake: "Using `.` instead of `->` when accessing struct members through a pointer.",
        fix: "If `ptr` is a pointer to a struct, use `ptr->member`. `ptr.member` is a compiler syntax error.",
      },
      {
        mistake: "Confusing memory allocation in `struct` vs `union`.",
        fix: "A `struct` allocates separate space for all members. A `union` shares one memory block equal to its largest member.",
      },
    ],
    quickRevision: [
      "`struct` bundles heterogeneous variables into a single record.",
      "`typedef` creates convenient shorthand aliases for complex types.",
      "Use `.` for direct struct instances; use `->` when accessing through a struct pointer.",
      "Passing large structs by pointer (`const StructType *ptr`) saves stack copying overhead.",
    ],
    checkUnderstanding: [
      {
        question: "When must you use the arrow operator `->` instead of the dot operator `.`?",
        options: [
          "When accessing members through a pointer to a structure",
          "When the struct contains floating-point members",
          "When the struct was allocated with typedef",
          "When accessing string members",
        ],
        answer: "When accessing members through a pointer to a structure",
        explanation: "The `->` operator dereferences the struct pointer and selects the member.",
      },
      {
        question: "If a `union` contains an `int` (4 bytes), a `char` (1 byte), and a `double` (8 bytes), how much memory does it occupy?",
        options: ["13 bytes (4 + 1 + 8)", "8 bytes", "4 bytes", "1 byte"],
        answer: "8 bytes",
        explanation: "Unions share overlapping memory; the union size equals that of its largest member (`double`, 8 bytes).",
      },
    ],
    prevTopicId: "c-dynamic-memory",
    prevTopicTitle: "Dynamic Memory Allocation (malloc, calloc, realloc, free)",
    nextTopicId: "c-preprocessor-file-io",
    nextTopicTitle: "File Handling and File I/O Operations (fopen, fread, fwrite, fclose)",
  },
  {
    id: "c-preprocessor-file-io",
    stageId: "c-programming",
    stageTitle: "C Programming",
    serial: "1.14",
    title: "File Handling and File I/O Operations (fopen, fread, fwrite, fclose)",
    readTimeMinutes: 8,
    why: "Programs running in RAM lose all data when terminated or when power is turned off. File handling provides persistence, allowing software to save records, configuration files, and telemetry logs to permanent disk storage.",
    need: "Without file I/O, software cannot persist student grades, process log files, or export reports to CSV. Mastering file opening modes, error validation, formatted I/O (`fprintf`, `fscanf`), and stream closing prevents data loss and file corruption.",
    whatYouWillLearn: [
      "The `FILE*` stream pointer and file open modes: read (`\"r\"`), write (`\"w\"`), append (`\"a\"`)",
      "Checking for file opening errors (`fp == NULL`)",
      "Formatted text file operations: `fprintf()` and `fscanf()`",
      "Reading text lines with `fgets()` and handling End-Of-File (`EOF`)",
      "Flushing buffers and safely closing file handles with `fclose()`",
    ],
    prerequisites: "Structures, strings, and pointers (Topics 1.9, 1.10, and 1.13).",
    conceptExplanation:
      "C interacts with files on storage through a stream controlled by a pointer to a `FILE` structure (`FILE *`):\n\n- **Opening (`fopen`)**: `FILE *fp = fopen(\"data.txt\", \"w\");` opens or creates a file.\n  - `\"r\"`: Read mode. File must exist; otherwise `fopen` returns `NULL`.\n  - `\"w\"`: Write mode. Creates a new file or completely overwrites an existing file.\n  - `\"a\"`: Append mode. Writes new data to the end of the file without erasing existing content.\n- **Writing & Reading**:\n  - `fprintf(fp, \"...\", ...)`: Writes formatted text directly into the file stream.\n  - `fscanf(fp, \"...\", &...)`: Reads formatted data from the file stream.\n- **Closing (`fclose`)**: `fclose(fp);` flushes memory write buffers and releases the operating system file handle.",
    howItWorks: [
      {
        step: "Stream Open (`fopen`)",
        detail: "Requests the operating system to open a file descriptor and returns a `FILE*` handle.",
      },
      {
        step: "NULL Check",
        detail: "If the file does not exist or disk permissions are denied, `fopen` returns `NULL`.",
      },
      {
        step: "Read/Write Operations",
        detail: "Data transfers between memory and the file stream buffer using `fprintf` or `fgets`.",
      },
      {
        step: "Stream Close (`fclose`)",
        detail: "Flushes all buffered data to disk and closes the OS file descriptor.",
      },
    ],
    practicalExample: {
      title: "Saving and Reading Student Records to a File",
      description: "Writing records to a text file and verifying successful write and close.",
      codeOrSpec: `#include <stdio.h>

int main(void) {
    // 1. Open file for writing
    FILE *file = fopen("grades.txt", "w");
    if (file == NULL) {
        printf("Error: Could not open file for writing!\\n");
        return 1;
    }

    // 2. Write structured records
    fprintf(file, "Roll,Name,Grade\\n");
    fprintf(file, "%d,%s,%.1f\\n", 101, "Alex", 92.5);
    fprintf(file, "%d,%s,%.1f\\n", 102, "Sara", 88.0);

    // 3. Always close the file
    fclose(file);
    printf("Student grades successfully written to grades.txt\\n");

    return 0;
}`,
      language: "c",
      output: "Student grades successfully written to grades.txt",
      explanation:
        "`grades.txt` now contains CSV text on disk that persists after the program exits. Always verify `file != NULL` and call `fclose()`.",
    },
    commonMistakes: [
      {
        mistake: "Forgetting to check if `fopen()` returned `NULL` before writing or reading.",
        fix: "If a file cannot be opened (e.g. read non-existent file), `fopen` returns `NULL`. Using a `NULL` pointer causes an immediate crash.",
      },
      {
        mistake: "Forgetting to call `fclose(fp)` after file operations.",
        fix: "Data written with `fprintf` is often buffered in RAM. Calling `fclose` ensures data is committed to disk and frees the file handle.",
      },
    ],
    quickRevision: [
      "`fopen()` opens a file stream; returns `NULL` on failure.",
      "Modes: `\"r\"` (read), `\"w\"` (overwrite), `\"a\"` (append).",
      "`fprintf()` and `fscanf()` handle formatted file stream I/O.",
      "Always call `fclose()` to prevent file resource leaks and ensure data integrity.",
    ],
    checkUnderstanding: [
      {
        question: "Which file mode opens an existing file and writes new data at the end without erasing current content?",
        options: ["\"r\"", "\"w\"", "\"a\"", "\"r+\""],
        answer: "\"a\"",
        explanation: "Append mode (`\"a\"`) preserves existing content and writes all new records at the end of the file.",
      },
      {
        question: "Why is calling `fclose()` critical after writing to a file?",
        options: [
          "It compiles the file into binary",
          "It flushes cached buffers to disk and frees operating system resources",
          "It encrypts the file",
          "It deletes the file from disk",
        ],
        answer: "It flushes cached buffers to disk and frees operating system resources",
        explanation: "Without `fclose`, buffered writes may remain in RAM and be lost when the application closes.",
      },
    ],
    prevTopicId: "c-structures-unions-bitfields",
    prevTopicTitle: "Structures, Typedef and Unions",
    nextTopicId: "git-fundamentals-setup",
    nextTopicTitle: "Introduction to Git and GitHub",
  },
];
