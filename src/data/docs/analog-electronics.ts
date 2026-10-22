import { TopicDocumentation } from "./types";

export const ANALOG_ELECTRONICS_DOCS: TopicDocumentation[] = [
  {
    id: "analog-ohms-law",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.1",
    title: "Voltage, Current, Resistance and Ohm's Law",
    readTimeMinutes: 7,
    why: "Voltage, current, and resistance are the fundamental building blocks of all electrical and electronic circuits. Without understanding how potential difference pushes charge through resistive materials, circuit analysis and hardware design are impossible.",
    need: "Incorrectly calculating resistor ratings causes components to overheat, catch fire, or fail to supply enough current to ICs and microcontrollers.",
    whatYouWillLearn: [
      "Electric potential difference (Voltage, V), electric charge flow (Current, I), and opposition to current (Resistance, R)",
      "Ohm's Law relationship: V = I * R",
      "Power dissipation formulas: P = V * I = I^2 * R = V^2 / R",
      "Resistor power ratings (1/4W, 1/2W, 1W) and thermal safety margins",
      "Conductance and resistivity fundamentals",
    ],
    prerequisites: "Basic high school physics of electrical charge.",
    conceptExplanation:
      "**Voltage (V)** is the electrical pressure or work required per unit charge to move between two points. Measured in Volts (V).\n\n**Current (I)** is the rate of flow of electric charge through a conductor (1 Ampere = 1 Coulomb per second).\n\n**Resistance (R)** is the physical property of a material opposing charge movement. Measured in Ohms (Ω).\n\n**Ohm's Law** states that for an ohmic conductor at constant temperature, current is directly proportional to voltage and inversely proportional to resistance: $I = \\frac{V}{R}$.",
    howItWorks: [
      {
        step: "Potential Difference",
        detail: "A power source (like a battery) creates an electric field between two terminals.",
      },
      {
        step: "Drift Velocity",
        detail: "Free electrons collide with atomic lattices in resistors, converting electrical energy into heat.",
      },
      {
        step: "Current Equilibrium",
        detail: "Current stabilizes to exactly $I = V / R$.",
      },
    ],
    practicalExample: {
      title: "Current-Limiting Resistor for an LED",
      description: "Calculating the resistance and power rating for a 3.3V supply powering a 2V/20mA LED.",
      codeOrSpec: `// Specifications:
// Supply Voltage: V_cc = 3.3 V
// LED Forward Voltage: V_f = 2.0 V
// Desired Forward Current: I_f = 20 mA = 0.02 A

Voltage across resistor:
  V_R = V_cc - V_f = 3.3 - 2.0 = 1.3 V

Resistor value (Ohm's Law):
  R = V_R / I_f = 1.3 / 0.02 = 65 Ohms (Choose standard 68 Ohm)

Power dissipated in resistor:
  P_R = V_R * I_f = 1.3 * 0.02 = 0.026 W (26 mW)
  (A standard 1/4W (250mW) resistor easily handles this with 10x safety margin)`,
      language: "text",
      output: "R = 68 Ohms, 1/4 Watt rating",
      explanation:
        "The resistor safely limits current to 19.1mA, protecting the LED from burning out.",
    },
    commonMistakes: [
      {
        mistake: "Ignoring resistor power rating and using a 1/8W resistor in a high-current circuit.",
        fix: "Always check $P = I^2 \\cdot R$. If calculated power exceeds 50% of the rating, use a higher wattage resistor.",
      },
    ],
    quickRevision: [
      "$V = I \\cdot R$; $I = V / R$; $R = V / I$.",
      "Power: $P = V \\cdot I = I^2 \\cdot R = V^2 / R$.",
      "Always include safety margin when choosing wattage.",
    ],
    checkUnderstanding: [
      {
        question: "If a 12V voltage source is connected across a 240-Ohm resistor, what current flows through the circuit?",
        options: ["2 A", "50 mA (0.05 A)", "2880 mA", "20 mA"],
        answer: "50 mA (0.05 A)",
        explanation: "$I = V / R = 12 / 240 = 0.05\\text{ A} = 50\\text{ mA}$.",
      },
    ],
    prevTopicId: "git-complete-beginner-workflow",
    prevTopicTitle: "A Complete Beginner Workflow: Create, Commit, and Push a Project to GitHub",
    nextTopicId: "analog-kcl-kvl",
    nextTopicTitle: "Basic Circuit Analysis and Kirchhoff's Laws",
  },
  {
    id: "analog-kcl-kvl",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.2",
    title: "Basic Circuit Analysis and Kirchhoff's Laws",
    readTimeMinutes: 8,
    why: "Complex electronic circuits contain multiple interconnected loops and branches. Kirchhoff's Current Law (KCL) and Voltage Law (KVL) provide the systematic algebraic foundation to solve for voltages and currents anywhere in any circuit.",
    need: "Attempting to design multi-node sensor interfaces or power rails without KCL and KVL leads to incorrect branch currents, unexpected loading effects, and voltage drops.",
    whatYouWillLearn: [
      "Kirchhoff's Current Law (KCL): Conservation of charge at circuit nodes",
      "Kirchhoff's Voltage Law (KVL): Conservation of energy around closed loops",
      "Voltage divider and current divider rules",
      "Nodal Analysis and Mesh Analysis methodologies",
      "Thevenin and Norton equivalent circuit modeling",
    ],
    prerequisites: "Ohm's Law and basic circuit components (Topic 3.1).",
    conceptExplanation:
      "**Kirchhoff's Current Law (KCL)** states that the algebraic sum of currents entering any electrical node is zero: $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$. Charge cannot accumulate at a point.\n\n**Kirchhoff's Voltage Law (KVL)** states that the directed sum of electrical potential differences around any closed circuit loop is zero: $\\sum V = 0$. Energy is conserved.\n\n**Voltage Divider Rule**: For resistors in series, $V_x = V_{\\text{total}} \\cdot \\frac{R_x}{R_{\\text{total}}}$.",
    howItWorks: [
      {
        step: "Node Identification",
        detail: "Identify all essential junctions where 3 or more branches meet.",
      },
      {
        step: "Formulate Equations",
        detail: "Apply KCL at independent nodes and KVL around independent planar loops.",
      },
      {
        step: "Solve System",
        detail: "Solve the linear equations to find all node voltages and branch currents.",
      },
    ],
    practicalExample: {
      title: "Voltage Divider for Microcontroller ADC Input",
      description: "Scaling a 12V automotive battery voltage down to a safe 3.3V ADC range.",
      codeOrSpec: `// Target:
// Input Voltage: V_in = 12.0 V (max 15.0V surge)
// ADC max safe input: V_out <= 3.3 V

Voltage Divider Formula:
  V_out = V_in * [R2 / (R1 + R2)]

Choose R2 = 10 kOhms:
  3.3 = 15.0 * [10k / (R1 + 10k)]
  R1 + 10k = 150k / 3.3 = 45.45 kOhms
  R1 = 35.45 kOhms -> Use standard 36 kOhms

Verification with 12V normal battery:
  V_out = 12 * (10 / (36 + 10)) = 12 * (10 / 46) = 2.61 V (well within 3.3V range)`,
      language: "text",
      output: "R1 = 36 kOhms, R2 = 10 kOhms",
      explanation:
        "The divider safely attenuates the high input voltage without exceeding the microcontroller's ADC pin limits.",
    },
    commonMistakes: [
      {
        mistake: "Ignoring the input impedance of the measuring circuit or ADC.",
        fix: "If the ADC input impedance is not much higher than R2, it will load the divider and cause inaccurate readings. Keep divider resistors in the 10k-100k range.",
      },
    ],
    quickRevision: [
      "KCL: sum of currents entering a node equals sum leaving.",
      "KVL: sum of voltages around any closed loop is zero.",
      "Voltage divider: $V_x = V_{\\text{in}} \\cdot \\frac{R_x}{R_{\\text{total}}}$.",
    ],
    checkUnderstanding: [
      {
        question: "According to Kirchhoff's Current Law, if 5A and 3A enter a node and 2A leaves on one branch, what current leaves on the remaining branch?",
        options: ["10 A", "6 A", "4 A", "1 A"],
        answer: "6 A",
        explanation: "Entering = $5 + 3 = 8\\text{ A}$. Leaving = $2 + I_x = 8\\text{ A} \\implies I_x = 6\\text{ A}$.",
      },
    ],
    prevTopicId: "analog-ohms-law",
    prevTopicTitle: "Voltage, Current, Resistance and Ohm's Law",
    nextTopicId: "analog-diodes-rectifiers",
    nextTopicTitle: "PN Junction Diode and Characteristics",
  },
  {
    id: "analog-diodes-rectifiers",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.3",
    title: "PN Junction Diode and Characteristics",
    readTimeMinutes: 8,
    why: "Diodes are the one-way valves of electronics. Understanding P-N junction physics, depletion regions, and non-linear V-I conduction curves is the prerequisite for all semiconductor devices including transistors and ICs.",
    need: "Connecting power sources with reversed polarity will instantly destroy sensitive chips without reverse polarity protection diodes.",
    whatYouWillLearn: [
      "Intrinsic vs Extrinsic semiconductors (P-type with holes, N-type with electrons)",
      "Depletion region formation and built-in barrier potential (0.7V Si, 0.3V Ge)",
      "Forward bias vs Reverse bias characteristics and Shockley diode equation",
      "Reverse breakdown and reverse recovery time",
      "Diode approximations (Ideal, Constant Voltage Drop, Piecewise Linear)",
    ],
    prerequisites: "Ohm's Law and potential difference (Topics 3.1 and 3.2).",
    conceptExplanation:
      "When P-type silicon is fused with N-type silicon, mobile carriers diffuse across the boundary and recombine, leaving exposed positive donor and negative acceptor ions. This establishes a **depletion region** and internal electric field.\n\n- In **Forward Bias** (Anode positive, Cathode negative), the applied voltage overcomes the 0.7V barrier, causing exponential current flow.\n- In **Reverse Bias**, the depletion layer widens, blocking current except for a microscopic nanoampere saturation leakage.",
    howItWorks: [
      {
        step: "Equilibrium",
        detail: "Diffusion of carriers balances drift due to internal barrier potential (0.7V).",
      },
      {
        step: "Forward Conduction",
        detail: "When $V_D > 0.7\\text{V}$, the barrier is neutralized and large current flows.",
      },
      {
        step: "Reverse Blocking",
        detail: "Only minor leakage flows until Peak Inverse Voltage (PIV) is exceeded.",
      },
    ],
    practicalExample: {
      title: "Reverse Polarity Protection Diode",
      description: "Placing a Schottky or Silicon diode in series with a DC power input jack.",
      codeOrSpec: `// Circuit:
// Battery (+) ---> [Anode - Diode - Cathode] ---> V_in_system
// Battery (-) ----------------------------------> GND

Normal Polarity:
  V_in_system = V_battery - V_forward_drop (e.g. 5V - 0.3V = 4.7V)
  Diode is forward biased; system powers up.

Reverse Polarity (Battery connected backwards):
  Diode is reverse biased; current is blocked (< 1 uA).
  System is protected from negative rail destruction.`,
      language: "text",
      output: "Zero current in reverse bias; system is completely safe.",
      explanation:
        "The diode acts as a self-acting electrical check valve.",
    },
    commonMistakes: [
      {
        mistake: "Forgetting the 0.7V forward diode drop when calculating voltages.",
        fix: "Silicon diodes always drop ~0.7V under forward conduction. For low-drop requirements, use Schottky diodes (~0.3V drop).",
      },
    ],
    quickRevision: [
      "P-N diode conducts current primarily in one direction.",
      "Barrier voltage: Silicon = 0.7V, Germanium = 0.3V, Schottky = 0.2-0.3V.",
      "Anode = positive side; Cathode = negative (marked with band).",
    ],
    checkUnderstanding: [
      {
        question: "What is the typical forward conduction barrier potential for a Silicon P-N junction diode?",
        options: ["0.3 V", "0.7 V", "1.5 V", "5.0 V"],
        answer: "0.7 V",
        explanation: "Silicon P-N diodes require approximately 0.7V of forward bias before significant conduction begins.",
      },
    ],
    prevTopicId: "analog-kcl-kvl",
    prevTopicTitle: "Basic Circuit Analysis and Kirchhoff's Laws",
    nextTopicId: "analog-rectifiers-filters",
    nextTopicTitle: "Rectifiers and Filters",
  },
  {
    id: "analog-rectifiers-filters",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.4",
    title: "Rectifiers and Filters",
    readTimeMinutes: 8,
    why: "Mains electricity is alternating current (AC), while silicon microchips require smooth direct current (DC). Rectifier and filter circuits perform this fundamental conversion in every AC adapter, power supply, and charger.",
    need: "Pulsating raw rectified DC causes excessive ripple voltage that resets digital processors and produces 100Hz audio hum in speakers.",
    whatYouWillLearn: [
      "Half-Wave Rectifier circuit, efficiency (40.6%), and Peak Inverse Voltage (PIV)",
      "Full-Wave Center-Tapped Rectifier (81.2% efficiency)",
      "Full-Wave Bridge Rectifier (4 diodes) and its advantages",
      "Smoothing capacitor filters and ripple voltage formula ($V_r = \\frac{I}{2fC}$)",
      "LC and Pi-filters for high-suppression applications",
    ],
    prerequisites: "PN junction diodes and AC waveforms (Topic 3.3).",
    conceptExplanation:
      "A **rectifier** uses diodes to convert bidirectional AC into pulsating unidirectional DC.\n\n- **Half-Wave**: Conduction only during positive half-cycle. High ripple.\n- **Full-Wave Bridge**: Inverts the negative half-cycle using 4 diodes, yielding ripple frequency at $2f$ (100Hz or 120Hz).\n- **Capacitor Filter**: A large capacitor charges during voltage peaks and discharges slowly into the load during troughs, smoothing pulsating voltage into continuous DC.",
    howItWorks: [
      {
        step: "Alternating Input",
        detail: "AC oscillates between $+V_m$ and $-V_m$.",
      },
      {
        step: "Diode Steering",
        detail: "Diodes D1/D2 conduct on positive cycle; D3/D4 conduct on negative cycle.",
      },
      {
        step: "Filtering",
        detail: "Capacitor C reservoirs charge to $V_{\\text{peak}} - 1.4\\text{V}$ and smooths ripples.",
      },
    ],
    practicalExample: {
      title: "Designing a 12V DC Power Supply Filter",
      description: "Calculating the filter capacitance for a 1A load with under 1V ripple at 50Hz mains.",
      codeOrSpec: `// Specifications:
// Load Current: I_load = 1.0 A
// Mains Frequency: f = 50 Hz -> Bridge ripple frequency = 2 * 50 = 100 Hz
// Maximum allowable ripple: V_ripple = 1.0 V

Ripple Voltage Formula:
  V_ripple = I_load / (2 * f * C)

Solving for C:
  C = I_load / (2 * f * V_ripple)
  C = 1.0 / (2 * 50 * 1.0) = 1.0 / 100 = 0.010 F = 10,000 uF

Standard component selection:
  Use 10,000 uF electrolytic capacitor with 25V or 35V rating.`,
      language: "text",
      output: "C = 10,000 uF / 35V capacitor",
      explanation:
        "A 10,000uF capacitor guarantees ripple stays under 1.0V when supplying a continuous 1A load.",
    },
    commonMistakes: [
      {
        mistake: "Selecting a capacitor with a voltage rating lower than the AC peak voltage.",
        fix: "Remember AC RMS voltage peak is $V_{\\text{rms}} \\cdot \\sqrt{2}$. Always select capacitor voltage ratings at least 30-50% higher than peak DC.",
      },
    ],
    quickRevision: [
      "Bridge rectifier uses 4 diodes and gives 81.2% theoretical max efficiency.",
      "Ripple frequency for bridge rectifier = $2 \\times$ mains frequency.",
      "Ripple voltage: $V_r = \\frac{I_{\\text{load}}}{2fC}$.",
    ],
    checkUnderstanding: [
      {
        question: "For a full-wave bridge rectifier powered by 50Hz AC mains, what is the frequency of the output voltage ripple?",
        options: ["25 Hz", "50 Hz", "100 Hz", "200 Hz"],
        answer: "100 Hz",
        explanation: "A full-wave rectifier inverts both half-cycles, doubling the ripple frequency to $2 \\times 50\\text{ Hz} = 100\\text{ Hz}$.",
      },
    ],
    prevTopicId: "analog-diodes-rectifiers",
    prevTopicTitle: "PN Junction Diode and Characteristics",
    nextTopicId: "analog-zener-regulation",
    nextTopicTitle: "Zener Diode and Voltage Regulation",
  },
  {
    id: "analog-zener-regulation",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.5",
    title: "Zener Diode and Voltage Regulation",
    readTimeMinutes: 7,
    why: "Filtered rectifier output voltages fluctuate with load changes and AC line surges. Zener diodes provide an inexpensive, rock-solid constant reference voltage using controlled reverse avalanche and Zener breakdown.",
    need: "Circuits without voltage regulation experience supply droop when current increases, causing microcontrollers to malfunction or reset randomly.",
    whatYouWillLearn: [
      "Zener breakdown vs Avalanche breakdown physics",
      "Reverse V-I characteristics and Zener voltage rating ($V_Z$)",
      "Simple shunt Zener voltage regulator design",
      "Calculating minimum and maximum series resistance ($R_S$)",
      "Line regulation vs Load regulation metrics",
    ],
    prerequisites: "Diodes and rectifier circuits (Topics 3.3 and 3.4).",
    conceptExplanation:
      "A **Zener Diode** is heavily doped to have a sharp, non-destructive reverse breakdown at a specified voltage ($V_Z$). When connected in reverse bias across a load with a series resistor $R_S$, the diode maintains a constant voltage $V_Z$ across its terminals regardless of moderate fluctuations in input voltage or load current.",
    howItWorks: [
      {
        step: "Series Resistor Drops Excess",
        detail: "$R_S$ absorbs the difference between unregulated $V_{\\text{in}}$ and stable $V_Z$.",
      },
      {
        step: "Dynamic Current Shunting",
        detail: "When load current drops, the Zener conducts more current to keep voltage fixed.",
      },
    ],
    practicalExample: {
      title: "5.1V Zener Shunt Regulator Design",
      description: "Regulating an unregulated 9V-12V DC input down to 5.1V for an analog sensor.",
      codeOrSpec: `// Parameters:
// V_in = 9V to 12V (nominally 10V)
// V_Z = 5.1 V (1N4733A, P_z_max = 1W)
// I_load = 10 mA to 30 mA
// Minimum Zener knee current: I_z_min = 5 mA

Calculate maximum R_s for worst case (lowest V_in, highest I_load):
  V_in_min = 9.0 V
  I_total_max = I_load_max + I_z_min = 30mA + 5mA = 35 mA
  R_s_max = (V_in_min - V_Z) / I_total_max = (9.0 - 5.1) / 0.035 = 111.4 Ohms
  Choose standard R_s = 100 Ohms

Check max power dissipated in Zener at high V_in and no load:
  V_in_max = 12 V
  I_z_max = (12.0 - 5.1) / 100 = 69 mA
  P_z = V_Z * I_z_max = 5.1 * 0.069 = 0.352 W (well within 1W rating)`,
      language: "text",
      output: "R_s = 100 Ohms, 1/2 Watt rating; Zener = 1N4733A (5.1V, 1W)",
      explanation:
        "The output voltage stays pinned at 5.1V across all load variations.",
    },
    commonMistakes: [
      {
        mistake: "Connecting a Zener diode in reverse bias without any series resistor $R_S$.",
        fix: "Without a current-limiting resistor, the Zener diode will draw unlimited current and burn out instantly.",
      },
    ],
    quickRevision: [
      "Zener diodes operate in reverse breakdown to regulate voltage.",
      "$V_{\\text{out}} = V_Z$ as long as $I_Z > I_{Z\\text{,min}}$.",
      "Always include series resistor $R_S$ to limit Zener current.",
    ],
    checkUnderstanding: [
      {
        question: "In what operational mode does a Zener diode function when used as a voltage regulator?",
        options: ["Forward active mode", "Reverse breakdown mode", "Saturation mode", "Cutoff mode"],
        answer: "Reverse breakdown mode",
        explanation: "Zener diodes are specifically designed and doped to maintain a constant voltage when reverse-biased into breakdown.",
      },
    ],
    prevTopicId: "analog-rectifiers-filters",
    prevTopicTitle: "Rectifiers and Filters",
    nextTopicId: "analog-bjt-structure",
    nextTopicTitle: "BJT Structure, Operation and Configurations",
  },
  {
    id: "analog-bjt-structure",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.6",
    title: "BJT Structure, Operation and Configurations",
    readTimeMinutes: 8,
    why: "The Bipolar Junction Transistor (BJT) is the cornerstone of modern amplification and switching. Understanding its 3-layer structure and 3 circuit configurations is essential for building audio amplifiers, sensor drivers, and analog interfaces.",
    need: "Attempting to design amplifiers without understanding base current injection and common-emitter current gain ($\\beta$) leads to severe signal distortion or completely saturated outputs.",
    whatYouWillLearn: [
      "NPN vs PNP construction and minority carrier injection",
      "The three terminals: Emitter (heavily doped), Base (ultra-thin), Collector (large area)",
      "Operational modes: Active, Saturation, Cutoff, and Reverse Active",
      "Three configurations: Common Emitter (CE), Common Collector (CC/Emitter Follower), Common Base (CB)",
      "Current relationships: $I_E = I_B + I_C$ and $I_C = \\beta \\cdot I_B$",
    ],
    prerequisites: "PN junction diodes (Topic 3.3).",
    conceptExplanation:
      "A BJT consists of two back-to-back PN junctions sharing an ultra-thin middle layer (Base).\n\n- In an **NPN transistor** in **Active Mode**:\n  - Base-Emitter junction is Forward Biased ($V_{BE} \\approx 0.7\\text{V}$).\n  - Base-Collector junction is Reverse Biased ($V_{CB} > 0$).\n  - Electrons injected from the emitter diffuse across the thin base and are swept into the collector by the electric field, giving $I_C = \\beta \\cdot I_B$.\n- **Configurations**:\n  - **Common Emitter (CE)**: High voltage gain, high current gain (inverting).\n  - **Common Collector (CC)**: Unity voltage gain, high input impedance, current buffer.\n  - **Common Base (CB)**: High frequency response, low input impedance.",
    howItWorks: [
      {
        step: "Base-Emitter Injection",
        detail: "Forward bias pushes large electron flow into the thin base.",
      },
      {
        step: "Base Transit",
        detail: "Only ~1% of electrons recombine in the base; ~99% reach the collector junction.",
      },
      {
        step: "Collector Collection",
        detail: "Strong reverse-bias field pulls carriers into the collector terminal.",
      },
    ],
    practicalExample: {
      title: "BJT as a High-Current Switch",
      description: "Driving a 12V / 100mA relay coil using an NPN transistor (2N2222) controlled by a 3.3V GPIO.",
      codeOrSpec: `// Circuit:
// GPIO (3.3V) ---> [ R_B ] ---> Base (2N2222)
// Emitter ---> GND
// Collector ---> Relay Coil (100mA @ 12V) ---> +12V
// Flyback diode across relay coil

Required Collector Current:
  I_C = 100 mA

Ensure saturation (use forced beta = 10 for safe saturation):
  I_B = I_C / 10 = 100mA / 10 = 10 mA

Calculate Base Resistor R_B:
  V_GPIO = 3.3 V, V_BE = 0.7 V
  R_B = (3.3 - 0.7) / 10mA = 2.6V / 0.01A = 260 Ohms (Choose standard 270 Ohm)`,
      language: "text",
      output: "R_B = 270 Ohms, Transistor is driven into deep saturation.",
      explanation:
        "The small 10mA GPIO base current safely turns on the 100mA 12V relay with $V_{CE} < 0.2\\text{V}$.",
    },
    commonMistakes: [
      {
        mistake: "Assuming $\\beta$ (hFE) is a fixed constant across temperature and manufacturing batches.",
        fix: "$\\beta$ varies widely (e.g. 100 to 300) between parts and drops at high temperatures. Always design biasing independent of $\\beta$.",
      },
    ],
    quickRevision: [
      "BJT is a current-controlled device: $I_C = \\beta \\cdot I_B$.",
      "Active mode: BE junction forward biased, BC junction reverse biased.",
      "CE configuration provides both voltage and current amplification.",
    ],
    checkUnderstanding: [
      {
        question: "For an NPN transistor in forward active mode, what are the bias conditions for the Base-Emitter and Base-Collector junctions?",
        options: [
          "BE reverse, BC reverse",
          "BE forward, BC forward",
          "BE forward, BC reverse",
          "BE reverse, BC forward",
        ],
        answer: "BE forward, BC reverse",
        explanation: "Active mode requires the Base-Emitter junction to be forward-biased (to inject carriers) and Base-Collector reverse-biased (to sweep them into the collector).",
      },
    ],
    prevTopicId: "analog-zener-regulation",
    prevTopicTitle: "Zener Diode and Voltage Regulation",
    nextTopicId: "analog-bjt-biasing",
    nextTopicTitle: "BJT Biasing and Operating Point",
  },
  {
    id: "analog-bjt-biasing",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.7",
    title: "BJT Biasing and Operating Point",
    readTimeMinutes: 8,
    why: "To amplify AC signals without distortion, a transistor must be biased at a stable DC Operating Point (Q-Point) midway between cutoff and saturation. Voltage Divider Biasing ensures the amplifier remains immune to temperature swings and beta variations.",
    need: "Fixed-base bias circuits drift with temperature; on a hot afternoon, the Q-point drifts into saturation, causing the top or bottom of the audio waveform to be severely clipped.",
    whatYouWillLearn: [
      "The DC Load Line and Operating Point (Q-Point: $V_{CEQ}, I_{CQ}$)",
      "Thermal runaway and why emitter degeneration resistors ($R_E$) provide negative feedback",
      "Voltage Divider Bias (Universal Bias) analysis and design equations",
      "Stability Factor ($S$) and designing for beta independence ($R_{TH} \\ll \\beta R_E$)",
      "Bypass capacitors ($C_E$) for AC gain restoration",
    ],
    prerequisites: "BJT fundamentals and Thevenin theorem (Topics 3.2 and 3.6).",
    conceptExplanation:
      "**Biasing** sets the steady-state DC voltages and currents in the transistor before any AC signal is applied.\n\nIn **Voltage Divider Biasing**, two resistors $R_1$ and $R_2$ create a stiff reference voltage at the base:\n$$V_B = V_{CC} \\cdot \\frac{R_2}{R_1 + R_2}$$\nThe emitter voltage is $V_E = V_B - 0.7\\text{V}$. The emitter current is fixed by $I_E = V_E / R_E$.\nBecause $I_C \\approx I_E$, the collector current is completely determined by resistors, making it independent of transistor $\\beta$!",
    howItWorks: [
      {
        step: "DC Voltage Setting",
        detail: "Base divider fixes $V_B$ firmly.",
      },
      {
        step: "Emitter Negative Feedback",
        detail: "If temperature rises and $I_C$ tries to increase, $V_E$ rises, reducing $V_{BE}$ and countering the rise.",
      },
    ],
    practicalExample: {
      title: "Designing a Voltage Divider Bias Circuit",
      description: "Biasing a 2N2222 transistor at $V_{CC} = 12\\text{V}, I_{CQ} = 2\\text{mA}, V_{CEQ} = 6\\text{V}$.",
      codeOrSpec: `// Design Rules of Thumb:
// Allocate 10% of V_cc to V_E: V_E = 1.2 V
// V_C = V_E + V_CEQ = 1.2 + 6.0 = 7.2 V
// V_B = V_E + 0.7V = 1.2 + 0.7 = 1.9 V

Calculate Resistors:
  R_E = V_E / I_E = 1.2V / 2mA = 600 Ohms (Choose standard 620 Ohm)
  R_C = (V_CC - V_C) / I_C = (12 - 7.2) / 2mA = 4.8V / 2mA = 2.4 kOhms

Base Divider (Bleeder current I_bleed approx 10 * I_B = 10 * (2mA / 100) = 0.2 mA):
  R2 = V_B / I_bleed = 1.9V / 0.2mA = 9.5 kOhms (Choose 10 kOhm)
  R1 = (V_CC - V_B) / I_bleed = (12 - 1.9) / 0.2mA = 50.5 kOhms (Choose 51 kOhm)`,
      language: "text",
      output: "R1 = 51k, R2 = 10k, RC = 2.4k, RE = 620 Ohms",
      explanation:
        "The Q-point is centered at $V_{CE} = 6V$ and $I_C = 2mA$, allowing maximum symmetrical AC voltage swing.",
    },
    commonMistakes: [
      {
        mistake: "Placing the Q-point too close to $V_{CC}$ (cutoff) or $0V$ (saturation).",
        fix: "Center $V_{CEQ}$ at approximately $V_{CC} / 2$ to allow maximum symmetrical output swing without clipping.",
      },
    ],
    quickRevision: [
      "Q-point ($V_{CEQ}, I_{CQ}$) must be centered on the DC load line.",
      "Voltage divider bias with emitter resistor $R_E$ provides excellent thermal stability.",
      "Design condition for beta independence: $R_2 \\le 0.1 \\cdot \\beta R_E$.",
    ],
    checkUnderstanding: [
      {
        question: "Why is the emitter resistor $R_E$ included in voltage divider BJT biasing circuits?",
        options: [
          "To increase the voltage gain to infinity",
          "To provide negative feedback that stabilizes the Q-point against temperature and beta variations",
          "To convert NPN to PNP",
          "To act as a high-frequency inductor",
        ],
        answer: "To provide negative feedback that stabilizes the Q-point against temperature and beta variations",
        explanation: "As temperature increases, $I_C$ increases, which raises $V_E = I_E R_E$. This decreases $V_{BE} = V_B - V_E$, reducing conduction and stabilizing the circuit.",
      },
    ],
    prevTopicId: "analog-bjt-structure",
    prevTopicTitle: "BJT Structure, Operation and Configurations",
    nextTopicId: "analog-bjt-amplifiers",
    nextTopicTitle: "Small-Signal BJT Amplifiers",
  },
  {
    id: "analog-bjt-amplifiers",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.8",
    title: "Small-Signal BJT Amplifiers",
    readTimeMinutes: 8,
    why: "Sensors, microphones, and antennas output signals in microvolts or millivolts. Small-signal BJT amplifiers boost these tiny signals to volt-levels required for analog-to-digital converters and processing.",
    need: "Treating transistors only as DC switches prevents engineers from understanding dynamic AC gain, input impedance matching, and frequency bandwidth.",
    whatYouWillLearn: [
      "AC small-signal modeling ($r_e$ model and hybrid-pi model)",
      "Intrinsic emitter resistance: $r_e = \\frac{26\\text{ mV}}{I_E}$ at room temperature",
      "Common Emitter (CE) AC voltage gain ($A_v = -\\frac{R_C \\parallel R_L}{r_e}$)",
      "Input impedance ($Z_{\\text{in}}$) and output impedance ($Z_{\\text{out}}$)",
      "Coupling and bypass capacitor selection for low-frequency cutoff",
    ],
    prerequisites: "BJT biasing and operating points (Topic 3.7).",
    conceptExplanation:
      "For small AC variations around the Q-point, the non-linear transistor behavior can be linearized into a **small-signal model**.\n\n- The internal dynamic emitter resistance is $r_e = \\frac{V_T}{I_{EQ}} = \\frac{26\\text{ mV}}{I_E}$.\n- In a Common-Emitter amplifier with an emitter bypass capacitor ($C_E$), AC voltage gain is simply:\n  $$A_v = -\\frac{R_C \\parallel R_L}{r_e}$$\n- The negative sign signifies a $180^\\circ$ phase inversion between input and output.",
    howItWorks: [
      {
        step: "DC Isolation",
        detail: "Input and output coupling capacitors pass AC signals while blocking DC bias voltages.",
      },
      {
        step: "AC Amplification",
        detail: "Small base voltage changes modulate collector current: $i_c = g_m \\cdot v_{be}$.",
      },
      {
        step: "Phase Inversion",
        detail: "As input rises, $I_C$ rises, pulling $V_C$ downwards (180-degree phase shift).",
      },
    ],
    practicalExample: {
      title: "Audio Preamplifier Voltage Gain Calculation",
      description: "Calculating the voltage gain for an amplifier with $I_C = 2\\text{mA}, R_C = 2.4\\text{k}\\Omega, R_L = 10\\text{k}\\Omega$.",
      codeOrSpec: `// Dynamic emitter resistance at 2mA:
  r_e = 26 mV / I_E = 26 mV / 2 mA = 13 Ohms

Effective AC collector load:
  r_c = R_C || R_L = (2.4k * 10k) / (2.4k + 10k) = 24k / 12.4 = 1.935 kOhms (1935 Ohms)

Small-signal Voltage Gain:
  A_v = - (r_c / r_e) = - (1935 / 13) = - 148.8

Input signal: 10 mV peak-to-peak audio sine wave
Output signal: 10mV * 148.8 = 1.49 V peak-to-peak (inverted)`,
      language: "text",
      output: "A_v = -149 (voltage amplified by ~150x with 180 deg phase shift)",
      explanation:
        "The preamplifier boosts weak microphone signals into high-level audio signals.",
    },
    commonMistakes: [
      {
        mistake: "Driving the amplifier with too large an input signal, causing harsh clipping distortion.",
        fix: "Small-signal models are valid only when $v_{be} < 10\\text{ mV}$. For larger signals, add an unbypassed emitter resistor $R_{E1}$ for gain swamping.",
      },
    ],
    quickRevision: [
      "$r_e = 26\\text{ mV} / I_E$ at 25°C.",
      "CE amplifier has high inverting voltage gain ($A_v \\approx -R_C / r_e$).",
      "Emitter follower (CC) has unity gain ($A_v \\approx 1$) and high input impedance.",
    ],
    checkUnderstanding: [
      {
        question: "What is the phase relationship between the input and output voltages of a Common Emitter (CE) BJT amplifier?",
        options: ["0 degrees (In phase)", "90 degrees out of phase", "180 degrees out of phase", "270 degrees out of phase"],
        answer: "180 degrees out of phase",
        explanation: "As base voltage increases, collector current increases, which pulls the collector voltage downward, creating a 180-degree phase inversion.",
      },
    ],
    prevTopicId: "analog-bjt-biasing",
    prevTopicTitle: "BJT Biasing and Operating Point",
    nextTopicId: "analog-mosfet-circuits",
    nextTopicTitle: "JFET and MOSFET Fundamentals",
  },
  {
    id: "analog-mosfet-circuits",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.9",
    title: "JFET and MOSFET Fundamentals",
    readTimeMinutes: 8,
    why: "Unlike current-controlled BJTs, Field Effect Transistors (FETs) are voltage-controlled devices with near-infinite input impedance. MOSFETs form the foundation of all modern CMOS digital logic, VLSI chips, and high-efficiency power converters.",
    need: "Driving high-current motors or solenoids directly with BJTs requires large continuous base currents that overheat microcontrollers. MOSFETs switch huge currents with almost zero steady-state gate power.",
    whatYouWillLearn: [
      "Junction Field Effect Transistors (JFET) and pinch-off voltage ($V_P$)",
      "MOSFET types: Enhancement-mode vs Depletion-mode (N-channel and P-channel)",
      "Threshold voltage ($V_{th}$) and gate oxide insulation ($SiO_2$)",
      "Output characteristics: Cutoff, Triode (Ohmic/Linear), and Saturation (Pinch-off)",
      "Transconductance ($g_m$) and square-law drain current equation: $I_D = \\frac{1}{2} k_n' \\frac{W}{L} (V_{GS} - V_{th})^2$",
    ],
    prerequisites: "Semiconductor physics and BJT operation (Topics 3.3 and 3.6).",
    conceptExplanation:
      "A **MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor)** controls current flow between **Drain** and **Source** using an electric field generated across an insulated **Gate**.\n\n- Because the gate is electrically isolated by a thin silicon dioxide glass layer, **DC Gate Current is virtually zero ($I_G \\approx 0$)**.\n- In an **Enhancement N-MOSFET**, applying $V_{GS} > V_{th}$ creates an inversion layer of electrons, opening a conductive channel between Drain and Source.",
    howItWorks: [
      {
        step: "Inversion Layer Creation",
        detail: "Positive gate voltage attracts electrons under the oxide to form the channel.",
      },
      {
        step: "Ohmic Conduction",
        detail: "At low $V_{DS}$, channel behaves like a variable resistor ($R_{DS(\\text{on})}$).",
      },
      {
        step: "Pinch-off / Saturation",
        detail: "When $V_{DS} \\ge V_{GS} - V_{th}$, channel pinches off, and $I_D$ saturates at a constant level.",
      },
    ],
    practicalExample: {
      title: "Logic-Level N-MOSFET Power Switch",
      description: "Driving a 12V / 5A DC motor using a logic-level N-channel MOSFET (IRL540N) from a 3.3V microcontroller pin.",
      codeOrSpec: `// Circuit:
// MCU GPIO ---> [ 100 Ohm Gate Resistor ] ---> Gate (IRL540N)
// Gate ---> [ 100k Pulldown Resistor ] ---> GND
// Source ---> GND
// Drain ---> Motor (-) Terminal; Motor (+) Terminal ---> +12V

Gate Pulldown Resistor:
  Ensures MOSFET remains off during MCU bootup/reset when GPIO is high-impedance.

Gate Series Resistor (100 Ohms):
  Damps ringing caused by gate capacitance (C_iss) and protects GPIO from surge currents.

R_DS(on) = 0.044 Ohms at V_GS = 3.3V
Power dissipated in MOSFET at 5A load:
  P = I_D^2 * R_DS(on) = (5)^2 * 0.044 = 25 * 0.044 = 1.1 W
  (Barely requires a heatsink!)`,
      language: "text",
      output: "P_loss = 1.1 W for 60W motor control; MCU draws 0mA steady-state gate current.",
      explanation:
        "The MOSFET provides high-efficiency power control without loading the microcontroller GPIO.",
    },
    commonMistakes: [
      {
        mistake: "Using standard MOSFETs (like IRF540) with 3.3V or 5V microcontrollers.",
        fix: "Standard MOSFETs require $V_{GS} = 10\\text{V}$ to turn fully on! With 3.3V they will operate in linear mode, overheat, and fail. Always use **Logic-Level** MOSFETs (e.g. IRLZ44N, AO3400).",
      },
    ],
    quickRevision: [
      "MOSFETs are voltage-controlled devices with near-infinite DC input impedance.",
      "Enhancement mode is normally OFF; turns ON when $V_{GS} > V_{th}$.",
      "Always check $R_{DS(\\text{on})}$ at the actual operating gate drive voltage.",
    ],
    checkUnderstanding: [
      {
        question: "Why does a MOSFET draw virtually zero DC current from its control gate?",
        options: [
          "Because the gate is connected directly to ground",
          "Because the gate terminal is physically insulated from the channel by a silicon dioxide dielectric layer",
          "Because it uses AC electricity only",
          "Because of high thermal resistance",
        ],
        answer: "Because the gate terminal is physically insulated from the channel by a silicon dioxide dielectric layer",
        explanation: "The gate oxide layer ($SiO_2$) acts as an insulator (capacitor), preventing any DC current from flowing into the gate.",
      },
    ],
    prevTopicId: "analog-bjt-amplifiers",
    prevTopicTitle: "Small-Signal BJT Amplifiers",
    nextTopicId: "analog-fet-amplifiers",
    nextTopicTitle: "FET Amplifiers",
  },
  {
    id: "analog-fet-amplifiers",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.10",
    title: "FET Amplifiers",
    readTimeMinutes: 7,
    why: "High-impedance signal sources (like piezoelectric sensors, high-end condenser microphones, and pH probes) would be completely loaded down and ruined by BJT amplifiers. FET amplifiers preserve signal fidelity by providing gigohms of input impedance.",
    need: "Connecting a high-impedance pH probe to a low-impedance BJT drops the signal to near zero due to loading error.",
    whatYouWillLearn: [
      "Common Source (CS) amplifier with resistive and current-source active loads",
      "Common Drain (Source Follower) buffer amplifier",
      "AC voltage gain formula: $A_v = -g_m (R_D \\parallel r_o \\parallel R_L)$",
      "Input impedance ($Z_{\\text{in}} \\approx R_G$)",
      "High-frequency Miller effect and gate-drain parasitic capacitance ($C_{gd}$)",
    ],
    prerequisites: "MOSFET fundamentals and AC small-signal concepts (Topics 3.8 and 3.9).",
    conceptExplanation:
      "In a **Common Source (CS)** amplifier:\n- Input is applied to the **Gate**; output is taken from the **Drain**.\n- Transconductance $g_m = \\frac{\\partial I_D}{\\partial V_{GS}}$ converts input voltage into drain current.\n- Voltage gain is $A_v = -g_m R_D$.\n- In a **Source Follower (CD)**, voltage gain is $\\approx 1$, but input impedance is exceptionally high ($> 10^9\\,\\Omega$), making it an ideal analog buffer.",
    howItWorks: [
      {
        step: "Gate Voltage Modulation",
        detail: "Input AC signal $v_{gs}$ modulates the conductivity of the inversion channel.",
      },
      {
        step: "Current-to-Voltage Conversion",
        detail: "The varying drain current $i_d = g_m v_{gs}$ flows through drain resistor $R_D$, producing output voltage.",
      },
    ],
    practicalExample: {
      title: "JFET Buffer for Piezoelectric Sensor",
      description: "Using a 2N5457 JFET in common-drain configuration as a high-impedance guitar/piezo buffer.",
      codeOrSpec: `// Specifications:
// Sensor Impedance: Z_source = 1 MOhm
// Transistor: 2N5457 JFET (g_m = 2.5 mS)
// Source Resistor: R_S = 2.2 kOhms
// Gate Resistor: R_G = 10 MOhms

Input Impedance:
  Z_in = R_G = 10 MOhms (Minimal loading on 1 MOhm sensor!)

Source Follower Voltage Gain:
  A_v = (g_m * R_S) / (1 + g_m * R_S)
  A_v = (2.5m * 2.2k) / (1 + 2.5m * 2.2k) = 5.5 / (1 + 5.5) = 5.5 / 6.5 = 0.85

Output Impedance:
  Z_out approx = 1 / g_m = 1 / 0.0025 = 400 Ohms`,
      language: "text",
      output: "Z_in = 10 MOhms, Z_out = 400 Ohms, Buffer converts fragile sensor signal to rugged low-Z signal.",
      explanation:
        "The buffer prevents signal loss while driving long cables without high-frequency attenuation.",
    },
    commonMistakes: [
      {
        mistake: "Expecting FET amplifiers to deliver as high a voltage gain as BJTs with the same DC current.",
        fix: "BJT transconductance ($g_m = I_C / V_T \\approx 40 I_C$) is much higher than FET transconductance. BJTs provide higher raw gain; FETs provide higher input impedance.",
      },
    ],
    quickRevision: [
      "CS amplifier provides inverting voltage gain ($A_v = -g_m R_D$).",
      "Source Follower provides buffer action ($A_v \\approx 1$) with ultra-high input impedance.",
      "Input impedance is dominated by gate bias resistor $R_G$.",
    ],
    checkUnderstanding: [
      {
        question: "What is the primary advantage of a FET amplifier over a BJT amplifier?",
        options: [
          "It uses higher voltage",
          "It has vastly higher input impedance, preventing loading of sensitive signal sources",
          "It always has 100x higher voltage gain",
          "It does not require DC power",
        ],
        answer: "It has vastly higher input impedance, preventing loading of sensitive signal sources",
        explanation: "Because of the insulated gate, FETs draw almost zero input current, offering gigohms of input impedance.",
      },
    ],
    prevTopicId: "analog-mosfet-circuits",
    prevTopicTitle: "JFET and MOSFET Fundamentals",
    nextTopicId: "analog-opamp-fundamentals",
    nextTopicTitle: "Operational Amplifier Fundamentals",
  },
  {
    id: "analog-opamp-fundamentals",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.11",
    title: "Operational Amplifier Fundamentals",
    readTimeMinutes: 8,
    why: "The Operational Amplifier (Op-Amp) is the universal analog computation and signal processing block. By applying negative feedback around an op-amp, circuit designers can build precise amplifiers, filters, and mathematical computers whose performance depends only on external passive resistors.",
    need: "Connecting an op-amp in open-loop without feedback causes immediate output saturation against the supply rails due to its massive open-loop gain ($A_{OL} > 100,000$).",
    whatYouWillLearn: [
      "The Golden Rules of Ideal Op-Amps: Infinite input impedance ($I_+ = I_- = 0$) and virtual short ($V_+ = V_-$)",
      "Open-loop differential gain ($A_{OL}$) and Gain-Bandwidth Product (GBWP)",
      "Common Mode Rejection Ratio (CMRR) and Slew Rate ($SR = \\frac{dV}{dt}$)",
      "Input offset voltage ($V_{OS}$) and input bias currents ($I_B$)",
      "Single-supply vs Dual-supply and Rail-to-Rail operational limits",
    ],
    prerequisites: "BJT and FET differential pair basics (Topics 3.8-3.10).",
    conceptExplanation:
      "An **Operational Amplifier** is a high-gain DC-coupled differential amplifier with two inputs (Inverting `–` and Non-Inverting `+`) and one single-ended output.\n\n### The Two Golden Rules (Negative Feedback):\n1. **$I_+ = I_- = 0$**: No current flows into either input terminal (infinite input impedance).\n2. **$V_+ = V_-$**: Negative feedback forces the differential input voltage to zero (Virtual Short / Virtual Ground).",
    howItWorks: [
      {
        step: "Differential Sensing",
        detail: "Op-amp senses tiny voltage difference: $V_{\\text{out}} = A_{OL} (V_+ - V_-)$.",
      },
      {
        step: "Negative Feedback Loop",
        detail: "Output drives the inverting input until $V_-$ matches $V_+$, establishing equilibrium.",
      },
    ],
    practicalExample: {
      title: "Verifying Slew Rate Limitations",
      description: "Checking whether a standard LM358 op-amp ($SR = 0.5\\text{V}/\\mu\\text{s}$) can reproduce a 20kHz 5V peak audio sine wave.",
      codeOrSpec: `// Formula for maximum undistorted sine wave frequency (Full Power Bandwidth):
// f_max = SR / (2 * pi * V_peak)

Given:
  SR = 0.5 V/us = 0.5 * 10^6 V/s
  V_peak = 5.0 V

Calculate f_max:
  f_max = (0.5 * 10^6) / (2 * 3.14159 * 5.0)
  f_max = 500,000 / 31.4159 = 15,915 Hz approx 15.9 kHz

Conclusion:
  At 20 kHz, a 5V peak sine wave will exceed the slew rate!
  The output will distort into a triangle wave.
  Solution: Select a faster op-amp like TL072 (SR = 13 V/us).`,
      language: "text",
      output: "f_max = 15.9 kHz. LM358 slews at 20kHz; upgrade to high-speed audio op-amp.",
      explanation:
        "Slew rate defines the maximum rate of change of output voltage and prevents high-frequency full-scale distortion.",
    },
    commonMistakes: [
      {
        mistake: "Assuming real op-amps can swing their output all the way to $V_{CC}$ and $GND$ on standard chips.",
        fix: "Standard op-amps like LM741 or LM358 clip 1.5V before the power rails! Always specify **Rail-to-Rail Output (RRO)** op-amps for 3.3V or 5V single-supply circuits.",
      },
    ],
    quickRevision: [
      "Golden Rule 1: No current enters inputs ($I_+ = I_- = 0$).",
      "Golden Rule 2: Negative feedback drives $V_+ = V_-$ (Virtual Short).",
      "Slew rate ($SR$) limits maximum high-frequency full-scale output change.",
    ],
    checkUnderstanding: [
      {
        question: "When an op-amp is operating linearly with negative feedback, what is the voltage difference between its non-inverting and inverting inputs?",
        options: ["Equal to V_cc", "Approximately zero volts (Virtual Short)", "Infinity", "0.7 V"],
        answer: "Approximately zero volts (Virtual Short)",
        explanation: "Because open-loop gain is enormous, negative feedback forces $V_+ - V_-$ to approximately zero.",
      },
    ],
    prevTopicId: "analog-fet-amplifiers",
    prevTopicTitle: "FET Amplifiers",
    nextTopicId: "analog-opamp-circuits",
    nextTopicTitle: "Inverting and Non-Inverting Op-Amp Circuits",
  },
  {
    id: "analog-opamp-circuits",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.12",
    title: "Inverting and Non-Inverting Op-Amp Circuits",
    readTimeMinutes: 8,
    why: "Inverting and non-inverting amplifiers are the two fundamental circuit configurations from which nearly all analog signal conditioning systems are built. They allow designers to set precise amplification factors using simple resistor ratios.",
    need: "If an engineer needs high input impedance so as not to load a sensor, choosing an inverting amplifier (whose input impedance equals $R_1$) will degrade the sensor reading.",
    whatYouWillLearn: [
      "Inverting Amplifier derivation and gain formula: $A_v = -\\frac{R_f}{R_1}$",
      "The concept of Virtual Ground at the inverting terminal",
      "Non-Inverting Amplifier derivation and gain formula: $A_v = 1 + \\frac{R_f}{R_1}$",
      "Unity-Gain Buffer (Voltage Follower) with $A_v = 1$ and infinite input impedance",
      "Trade-offs between inverting and non-inverting configurations",
    ],
    prerequisites: "Op-Amp Golden Rules and KCL (Topics 3.2 and 3.11).",
    conceptExplanation:
      "### Inverting Amplifier:\n- Non-inverting terminal (`+`) is connected to ground ($0\\text{V}$).\n- By the Virtual Ground rule, inverting terminal (`–`) is held at $0\\text{V}$.\n- Applying KCL at the inverting node:\n  $$\\frac{V_{\\text{in}} - 0}{R_1} + \\frac{V_{\\text{out}} - 0}{R_f} = 0 \\implies A_v = \\frac{V_{\\text{out}}}{V_{\\text{in}}} = -\\frac{R_f}{R_1}$$\n\n### Non-Inverting Amplifier:\n- Input is applied directly to the non-inverting terminal (`+`), giving near-infinite input impedance.\n- Negative feedback divider sets $V_- = V_{\\text{out}} \\cdot \\frac{R_1}{R_1 + R_f}$.\n- Since $V_- = V_+ = V_{\\text{in}}$:\n  $$A_v = 1 + \\frac{R_f}{R_1}$$",
    howItWorks: [
      {
        step: "Inverting Feedback",
        detail: "Current through $R_1$ must equal current through $R_f$ because zero current enters the op-amp.",
      },
      {
        step: "Non-Inverting Voltage Follower",
        detail: "Shorting $R_f = 0$ yields $A_v = 1$, creating the classic impedance-matching buffer.",
      },
    ],
    practicalExample: {
      title: "Designing a Non-Inverting 10x Strain Gauge Amplifier",
      description: "Amplifying a 0-100mV sensor signal to 0-1.0V for microcontroller ADC sampling.",
      codeOrSpec: `// Target Gain:
  A_v = 1 + (R_f / R_1) = 10

Resistor Ratio:
  R_f / R_1 = 9
  Choose R_1 = 10 kOhms
  R_f = 9 * 10 kOhms = 90 kOhms (or 91k standard 1% resistor)

Verification:
  Actual Gain = 1 + (91k / 10k) = 1 + 9.1 = 10.1
  Input: 100 mV -> Output: 1.01 V
  Input Impedance: > 10^10 Ohms (does not load strain gauge)`,
      language: "text",
      output: "R1 = 10k, Rf = 91k, Non-inverting gain = 10.1x with near-infinite input impedance.",
      explanation:
        "Non-inverting configuration ensures the delicate strain gauge bridge is not loaded by the amplifier.",
    },
    commonMistakes: [
      {
        mistake: "Choosing extremely small resistor values (e.g. $R_f = 10\\,\\Omega$) or huge values ($R_f = 100\\,\\text{M}\\Omega$).",
        fix: "Very small resistors overload the op-amp output current; huge resistors introduce noise and phase delay. Keep resistors between $1\\,\\text{k}\\Omega$ and $1\\,\\text{M}\\Omega$.",
      },
    ],
    quickRevision: [
      "Inverting gain: $A_v = -R_f / R_1$. Inverting terminal is virtual ground.",
      "Non-inverting gain: $A_v = 1 + (R_f / R_1)$. Near-infinite input impedance.",
      "Voltage follower: $R_f = 0, R_1 = \\infty \\implies A_v = 1$.",
    ],
    checkUnderstanding: [
      {
        question: "What is the closed-loop voltage gain of an inverting op-amp circuit with $R_1 = 2\\text{ k}\\Omega$ and $R_f = 20\\text{ k}\\Omega$?",
        options: ["+10", "-10", "+11", "-0.1"],
        answer: "-10",
        explanation: "$A_v = -R_f / R_1 = -20\\text{ k} / 2\\text{ k} = -10$.",
      },
    ],
    prevTopicId: "analog-opamp-fundamentals",
    prevTopicTitle: "Operational Amplifier Fundamentals",
    nextTopicId: "analog-opamp-applications",
    nextTopicTitle: "Op-Amp Applications",
  },
  {
    id: "analog-opamp-applications",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.13",
    title: "Op-Amp Applications",
    readTimeMinutes: 8,
    why: "Op-Amps are capable of analog mathematical computing: addition, subtraction, differentiation, and integration. These circuits form the backbone of PID controllers, audio mixers, active peak detectors, and analog sensors.",
    need: "Differential sensor bridges (like thermistors and pressure sensors) output tiny differences riding on high common-mode voltages; without a Difference Amplifier, common-mode noise overwhelms the signal.",
    whatYouWillLearn: [
      "Summing Amplifier (Audio Mixer): $V_{\\text{out}} = -R_f (\\frac{V_1}{R_1} + \\frac{V_2}{R_2} + \\dots)$",
      "Difference Amplifier (Differential Subtractor)",
      "Instrumentation Amplifier (In-Amp) with 3 op-amps and high CMRR",
      "Integrator circuit (Capacitor in feedback loop: $V_{\\text{out}} = -\\frac{1}{RC} \\int V_{\\text{in}} dt$)",
      "Differentiator circuit and stability noise compensation",
      "Voltage Comparators and Schmitt Triggers (positive feedback for hysteresis)",
    ],
    prerequisites: "Inverting and non-inverting op-amp circuits (Topic 3.12).",
    conceptExplanation:
      "- **Summing Amplifier**: Multiple inputs feed into the virtual ground, producing an inverted weighted sum.\n- **Integrator**: Replacing $R_f$ with a capacitor produces an output proportional to the mathematical integral of the input (converts square waves to triangular waves).\n- **Instrumentation Amplifier**: Uses two non-inverting input buffers and a difference amplifier stage to provide gigohm differential input impedance and $>100\\text{dB}$ CMRR.\n- **Schmitt Trigger**: Uses *positive feedback* to create two distinct switching thresholds, eliminating chatter caused by noisy analog sensor inputs.",
    howItWorks: [
      {
        step: "Integrator Action",
        detail: "Input resistor sets charging current $I = V_{\\text{in}} / R$. Capacitor integrates charge: $V = Q/C$.",
      },
      {
        step: "Schmitt Trigger Hysteresis",
        detail: "Positive feedback snaps the threshold higher when output is high and lower when output is low.",
      },
    ],
    practicalExample: {
      title: "Schmitt Trigger for Noisy Photodiode Sensor",
      description: "Designing positive feedback thresholds ($V_{TL} = 1.5\\text{V}, V_{TH} = 3.5\\text{V}$) on a 5V supply.",
      codeOrSpec: `// Circuit:
// Input signal ---> Inverting terminal (-)
// Non-inverting terminal (+) connected to voltage divider between V_out and reference

When V_out = +5V (High):
  Upper Threshold: V_TH = 3.5 V
  Sensor must rise ABOVE 3.5V to force output Low.

When V_out = 0V (Low):
  Lower Threshold: V_TL = 1.5 V
  Sensor must fall BELOW 1.5V to force output High.

Hysteresis Band = V_TH - V_TL = 3.5 - 1.5 = 2.0 V
Any noise or chatter under 2.0 V is completely ignored!`,
      language: "text",
      output: "Hysteresis prevents multiple false triggers from slow-moving analog signals.",
      explanation:
        "The Schmitt trigger produces a crisp, clean digital clock/pulse from noisy optical transitions.",
    },
    commonMistakes: [
      {
        mistake: "Building an op-amp differentiator without a series input resistor, leading to high-frequency oscillation.",
        fix: "Pure differentiators amplify high-frequency noise infinitely. Always place a small resistor in series with the input capacitor to cap high-frequency gain.",
      },
    ],
    quickRevision: [
      "Summing amp adds voltages at virtual ground.",
      "Integrator uses feedback capacitor: output is integral of input.",
      "Schmitt trigger uses positive feedback to provide noise hysteresis.",
    ],
    checkUnderstanding: [
      {
        question: "What waveform is produced at the output of an ideal op-amp integrator when a constant DC positive voltage is applied to its input?",
        options: [
          "A constant positive DC voltage",
          "A negative-going linear ramp",
          "A sine wave",
          "A high-frequency square wave",
        ],
        answer: "A negative-going linear ramp",
        explanation: "Integrating a constant $V$ yields $V_{\\text{out}} = -\\frac{1}{RC} \\int V dt = -\\frac{V}{RC} \\cdot t$, which is a downward-sloping linear ramp.",
      },
    ],
    prevTopicId: "analog-opamp-circuits",
    prevTopicTitle: "Inverting and Non-Inverting Op-Amp Circuits",
    nextTopicId: "analog-filters-oscillators",
    nextTopicTitle: "Feedback and Oscillator Fundamentals",
  },
  {
    id: "analog-filters-oscillators",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.14",
    title: "Feedback and Oscillator Fundamentals",
    readTimeMinutes: 8,
    why: "Signal processing requires isolating desired frequencies and rejecting unwanted noise (filtering), as well as generating stable sine waves and clock pulses for radio transmission and microcontrollers (oscillators).",
    need: "Without anti-aliasing low-pass filters before an ADC, high-frequency noise folds back into the audio band, permanently corrupting sampled digital data.",
    whatYouWillLearn: [
      "Active Filters: Low-Pass, High-Pass, Band-Pass, and Band-Stop (Notch)",
      "Filter responses: Butterworth (maximally flat passband), Chebyshev, and Bessel",
      "Sallen-Key filter topology and cutoff frequency calculation ($f_c = \\frac{1}{2\\pi RC}$)",
      "Barkhausen Criterion for sustained oscillation: $|A\\beta| = 1$ and $\\angle A\\beta = 0^\\circ$ ($360^\\circ$)",
      "RC Phase-Shift and Wien Bridge Oscillators (audio frequencies)",
      "LC (Colpitts, Hartley) and Crystal Oscillators (RF and high-precision clocks)",
    ],
    prerequisites: "Op-Amp circuits and AC impedance (Topics 3.11-3.13).",
    conceptExplanation:
      "### Active Filters:\nActive filters combine op-amps with resistors and capacitors to provide sharp frequency cutoff roll-offs (-20dB/dec for 1st order, -40dB/dec for 2nd order) without bulky, expensive inductors.\n\n### Oscillators:\nAn oscillator is an amplifier with **positive feedback** that produces a periodic output without any external input signal.\n\n**Barkhausen Criterion** for sustained oscillations:\n1. The loop gain magnitude must be unity: $|A\\beta| = 1$.\n2. The total phase shift around the closed loop must be $0^\\circ$ or $360^\\circ$.",
    howItWorks: [
      {
        step: "Noise Initiation",
        detail: "Thermal noise in components contains all frequencies.",
      },
      {
        step: "Selective Feedback",
        detail: "The frequency-selective feedback network $\\beta$ only satisfies Barkhausen criterion at one exact frequency $f_0$.",
      },
      {
        step: "Sustained Oscillation",
        detail: "The circuit regenerates a clean, pure sinusoidal waveform at $f_0$.",
      },
    ],
    practicalExample: {
      title: "1kHz Wien Bridge Audio Oscillator",
      description: "Designing a Wien Bridge oscillator using an op-amp to generate a 1kHz sine test wave.",
      codeOrSpec: `// Wien Bridge Frequency Formula:
  f_0 = 1 / (2 * pi * R * C)

Choose C = 10 nF = 10 * 10^-9 F:
  R = 1 / (2 * pi * f_0 * C)
  R = 1 / (2 * 3.14159 * 1000 * 10e-9) = 1 / (6.283e-5) = 15.915 kOhms
  Choose standard 1% resistor: R = 15.8 kOhms or 16 kOhms

Gain Requirement:
  At f_0, feedback attenuation is beta = 1/3.
  Therefore, amplifier gain MUST be A_v = 1 + (R_f / R_1) = 3.
  R_f / R_1 = 2 -> Choose R_1 = 10 kOhms, R_f = 20 kOhms (with automatic amplitude stabilization)`,
      language: "text",
      output: "R = 16k, C = 10nF, A_v = 3. Outputs pure 1.0kHz sine wave.",
      explanation:
        "The Wien bridge network provides $0^\\circ$ phase shift and $1/3$ attenuation at $f_0 = 1\\text{kHz}$; the amplifier provides $3\\times$ gain to sustain oscillation.",
    },
    commonMistakes: [
      {
        mistake: "Setting loop gain slightly less than 1, causing oscillations to decay to zero.",
        fix: "Oscillators must be designed with loop gain slightly $>1$ at startup, with a non-linear element (like diodes or PTC thermistors) to throttle gain back to exactly 1 at steady state.",
      },
    ],
    quickRevision: [
      "Active filters use op-amps to eliminate the need for heavy inductors.",
      "Barkhausen criteria: $|A\\beta| = 1$ and phase shift = $0^\\circ$.",
      "Wien bridge is ideal for low/audio frequencies; Colpitts/Crystals for RF.",
    ],
    checkUnderstanding: [
      {
        question: "What are the two conditions of the Barkhausen Criterion for sustained sinusoidal oscillation?",
        options: [
          "Loop gain $|A\\beta| < 1$ and phase shift $= 90^\\circ$",
          "Loop gain $|A\\beta| = 1$ and total loop phase shift $= 0^\\circ$ (or multiple of $360^\\circ$)",
          "Gain must be infinity and phase shift must be $180^\\circ$",
          "Resistance must equal zero",
        ],
        answer: "Loop gain $|A\\beta| = 1$ and total loop phase shift $= 0^\\circ$ (or multiple of $360^\\circ$)",
        explanation: "Barkhausen requires unit loop magnitude and zero net phase shift around the feedback loop so signals re-add constructively.",
      },
    ],
    prevTopicId: "analog-opamp-applications",
    prevTopicTitle: "Op-Amp Applications",
    nextTopicId: "analog-regulators-supplies",
    nextTopicTitle: "Voltage Regulators & Power Supply Design",
  },
  {
    id: "analog-regulators-supplies",
    stageId: "analog-electronics",
    stageTitle: "Analog Electronics",
    serial: "3.15",
    title: "Voltage Regulators & Power Supply Design",
    readTimeMinutes: 8,
    why: "Stable power delivery is the foundation of reliable hardware engineering. Linear regulators (like the 7805 and low-dropout LDOs) and switched-mode power supplies (Buck, Boost, Buck-Boost) convert raw battery or adapter voltage into clean, regulated rails for sensitive silicon.",
    need: "Using a linear regulator to drop 12V to 3.3V at 2A burns 17.4 Watts as pure waste heat, destroying the device without a bulky heatsink. A switching buck converter operates at 90%+ efficiency, running cool.",
    whatYouWillLearn: [
      "Linear Regulators: LM78xx fixed series and LM317 adjustable regulator",
      "Low-Dropout (LDO) regulators and dropout voltage ($V_{\\text{drop}}$)",
      "Thermal calculations: $P_{\\text{diss}} = (V_{\\text{in}} - V_{\\text{out}}) \\cdot I_{\\text{load}}$ and junction temperature ($T_J$)",
      "Switched-Mode Power Supplies (SMPS): Buck (step-down), Boost (step-up), and Buck-Boost",
      "PWM switching frequency, inductor selection, and output capacitor ESR",
    ],
    prerequisites: "Zener diodes, MOSFETs, and active filters (Topics 3.5, 3.9, 3.14).",
    conceptExplanation:
      "### Linear Regulators (LDO):\nAct as an automated variable series resistor (pass transistor) controlled by an error amplifier. Extremely clean, low noise, but efficiency is limited to $\\eta \\approx \\frac{V_{\\text{out}}}{V_{\\text{in}}}$.\n\n### Switching Converters (SMPS):\nRapidly switch an inductor and capacitor ON and OFF at hundreds of kilohertz (e.g. 500kHz to 2MHz), transferring energy with 85%-95% efficiency.",
    howItWorks: [
      {
        step: "Buck Converter ON-State",
        detail: "Switch closes; current ramps up through the inductor, storing magnetic energy and powering load.",
      },
      {
        step: "Buck Converter OFF-State",
        detail: "Switch opens; inductor discharges stored energy through the freewheeling diode/MOSFET into the load.",
      },
    ],
    practicalExample: {
      title: "Selecting Between an LDO and a Buck Converter",
      description: "Powering an IoT device (3.3V @ 500mA) from a 12V lead-acid battery.",
      codeOrSpec: `Option 1: Linear LDO (AMS1117-3.3)
  P_diss = (12V - 3.3V) * 0.5A = 8.7V * 0.5A = 4.35 Watts!
  Thermal resistance R_theta_JA = 90 °C/W
  Temperature rise = 4.35W * 90°C/W = 391.5 °C -> INSTANT THERMAL SHUTDOWN / BURNOUT!

Option 2: Switching Buck Converter (MP2307 / LM2596 @ 90% efficiency)
  P_out = 3.3V * 0.5A = 1.65 W
  P_in = P_out / 0.90 = 1.65 / 0.90 = 1.83 W
  P_diss = P_in - P_out = 1.83 - 1.65 = 0.18 Watts (180 mW!)
  Result: Runs barely warm to the touch without any heatsink.`,
      language: "text",
      output: "Linear burns 4.35W (unsafe); Buck burns only 0.18W (clean, cool, efficient).",
      explanation:
        "When the difference between $V_{\\text{in}}$ and $V_{\\text{out}}$ is large, switching buck regulators are mandatory.",
    },
    commonMistakes: [
      {
        mistake: "Omitting input and output ceramic bypass capacitors on an LDO.",
        fix: "LDOs will oscillate uncontrollably if input and output capacitors are missing. Always place $10\\mu\\text{F}$ and $0.1\\mu\\text{F}$ capacitors close to the regulator pins.",
      },
    ],
    quickRevision: [
      "Linear regulators are simple and low-noise, but waste power as heat: $P = (V_{\\text{in}} - V_{\\text{out}}) \\cdot I$.",
      "Switching converters (Buck, Boost) achieve 85-95% efficiency.",
      "Always bypass regulator pins with decoupling capacitors.",
    ],
    checkUnderstanding: [
      {
        question: "Why is a switching buck converter preferred over a linear regulator when stepping down 12V to 3.3V at high currents?",
        options: [
          "Because buck converters have lower component count",
          "Because buck converters achieve 85-95% efficiency by transferring energy through an inductor instead of burning excess voltage as heat",
          "Because linear regulators only work on alternating current",
          "Because buck converters operate silently",
        ],
        answer: "Because buck converters achieve 85-95% efficiency by transferring energy through an inductor instead of burning excess voltage as heat",
        explanation: "A linear regulator would drop 8.7V linearly, wasting over 70% of energy as pure heat, whereas a buck converter switches efficiently with minimal dissipation.",
      },
    ],
    prevTopicId: "analog-filters-oscillators",
    prevTopicTitle: "Feedback and Oscillator Fundamentals",
    nextTopicId: "digital-number-systems",
    nextTopicTitle: "Number Systems and Base Conversions (Binary, Octal, Hex, Decimal)",
  },
];
