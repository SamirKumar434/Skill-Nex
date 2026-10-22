"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Terminal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const cppLiveCode = `class SkillNex {
private:
    vector<string> patterns = {
        "Two Pointers",
        "Sliding Window",
        "Dynamic Programming"
    };
    AIAssistant mentor;

public:
    void crackInterview() {
        for (const auto& pattern : patterns) {
            mentor.masterPatterns(pattern);
        }
        // Placement ready! 🚀
    }
};`;

const codeSnippets: Record<string, { filename: string; code: string[] }> = {
  cpp: {
    filename: "SKILLNEX.CPP",
    code: cppLiveCode.split("\n"),
  },
  python: {
    filename: "SKILLNEX.PY",
    code: [
      "class SkillNex:",
      "    def __init__(self):",
      '        self.patterns = ["Sliding Window", "Intervals", "Graphs"]',
      "        self.ai_coach = AICoach()",
      "",
      "    def crack_the_code(self):",
      "        for pattern in self.patterns:",
      "            self.ai_coach.explain_intuition(pattern)",
      "            self.ai_coach.simulate_mock_interview()",
      "        # Ready for top tech interviews! 🚀",
    ],
  },
  java: {
    filename: "SKILLNEX.JAVA",
    code: [
      "public class SkillNex {",
      "    private final List<String> patterns = List.of(",
      '        "Binary Search", "Two Pointers", "Tree DFS"',
      "    );",
      "",
      "    public void crackTheCode() {",
      "        patterns.forEach(PatternVisualizer::render);",
      "        System.out.println(\"Offer received! 🎉\");",
      "    }",
      "}",
    ],
  },
};

function formatCodeLine(line: string) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
    return <span className="text-[#64748B] italic">{line}</span>;
  }
  if (trimmed === "private:" || trimmed === "public:") {
    return <span className="text-[#C084FC] font-semibold">{line}</span>;
  }
  if (line.includes("class ") || line.includes("def ") || line.includes("void ")) {
    const parts = line.split(" ");
    return (
      <span>
        <span className="text-[#C084FC] font-semibold">{parts[0]} </span>
        <span className="text-[#F8FAFC]">{parts.slice(1).join(" ")}</span>
      </span>
    );
  }
  if (line.includes('"')) {
    const parts = line.split('"');
    return (
      <span>
        {parts.map((p, i) =>
          i % 2 === 1 ? (
            <span key={i} className="text-[#34D399]">&quot;{p}&quot;</span>
          ) : (
            <span key={i} className="text-[#E2E8F0]">{p}</span>
          )
        )}
      </span>
    );
  }
  return <span className="text-[#E2E8F0]">{line}</span>;
}

function CodeEditorMock() {
  const [lang, setLang] = useState<"cpp" | "python" | "java">("cpp");
  const [copied, setCopied] = useState(false);
  const [charIndex, setCharIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth live typing animation for C++
  useEffect(() => {
    if (lang !== "cpp") return;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setCharIndex(1);
      }, 4000);
      return () => clearTimeout(pauseTimer);
    }

    if (charIndex < cppLiveCode.length) {
      const speed = cppLiveCode[charIndex] === "\n" ? 80 : 32;
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsPaused(true);
    }
  }, [charIndex, isPaused, lang]);

  const activeSnippet = codeSnippets[lang];

  // Derive visible lines based on typing state
  const visibleLines =
    lang === "cpp"
      ? cppLiveCode.slice(0, charIndex).split("\n")
      : activeSnippet.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(cppLiveCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative w-full max-w-[500px] group">
      {/* Ambient Purple Backlight / Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#8B5CF6]/30 via-[#A855F7]/20 to-[#6D28D9]/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Editor Container */}
      <div className="relative bg-[#090712] border border-[#2D2744] rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D0B17] border-b border-[#1E1B2E]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="font-mono text-xs font-semibold text-[#C084FC] tracking-wider uppercase flex items-center gap-1.5">
              <Terminal size={12} className="text-[#A855F7]" />
              {activeSnippet.filename}
            </span>
          </div>

          {/* Language Switcher pills */}
          <div className="flex items-center gap-1 bg-[#050508] p-1 rounded-lg border border-[#1E1B2E]">
            {(["cpp", "python", "java"] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  if (l === "cpp") {
                    setCharIndex(1);
                    setIsPaused(false);
                  }
                }}
                className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                  lang === l
                    ? "bg-[#8B5CF6] text-white font-semibold shadow-sm"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
            <button
              onClick={handleCopy}
              title="Copy snippet"
              className="ml-1 text-[#94A3B8] hover:text-[#C084FC] p-1 rounded transition-colors cursor-pointer"
            >
              {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            </button>
          </div>
        </div>

        {/* Code Content with live typing */}
        <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#F8FAFC] overflow-x-auto scrollbar-hide min-h-[340px] flex flex-col justify-between">
          <div className="space-y-1">
            {visibleLines.map((line, idx) => {
              const isLastLine = idx === visibleLines.length - 1;
              return (
                <div key={idx} className="flex gap-4">
                  <span className="text-[#475569] select-none w-5 text-right text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="whitespace-pre">
                    {formatCodeLine(line)}
                    {isLastLine && (
                      <span className="inline-block w-2 h-4 bg-[#A855F7] ml-0.5 translate-y-0.5 animate-cursor-blink" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom helper pill */}
          <div className="mt-4 pt-3 border-t border-[#1E1B2E] flex items-center justify-between text-[11px] text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#C084FC]">
              <Sparkles size={12} /> Live Compiler &amp; Pattern Tutor
            </span>
            <span className="text-[#10B981] font-mono text-[10px]">
              {lang === "cpp" && !isPaused ? "⚡ Typing in C++..." : "● System Online"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 lg:min-h-[85vh] lg:flex lg:items-center overflow-hidden bg-[#050508]"
    >
      {/* Background purple mesh & grid with smooth bottom fade */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]" />
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#6D28D9]/12 blur-[120px] pointer-events-none" />

      {/* Bottom seamless transition to Why Choose section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Copy - centered on mobile, 7 cols & left-aligned on desktop */}
          <div className="w-full lg:col-span-7 space-y-4 sm:space-y-6 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#F8FAFC] tracking-tight leading-[1.2] sm:leading-[1.14]">
              SkillNex — <br className="hidden sm:inline" />
              <span className="text-white">From Learning to </span>
              <span className="text-[#A855F7] drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                Placement-Ready.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg leading-relaxed max-w-lg lg:max-w-xl mx-auto lg:mx-0">
              Build coding skills. Create projects. Build your profile. Get ready for top placement opportunities.
            </p>

            {/* Dual CTA Buttons - stacked full-width on mobile, inline on tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <Button
                as="a"
                href="#paths"
                variant="purple-glow"
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 py-3.5 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.55)] cursor-pointer text-center"
              >
                Start Practicing
                <ArrowRight size={17} />
              </Button>
              <Button
                as="a"
                href="#roadmap"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 py-3.5 font-medium text-sm sm:text-base text-[#F8FAFC] hover:text-[#C084FC] text-center justify-center"
              >
                View Roadmap
              </Button>
            </div>
          </div>

          {/* Right Column: Code Editor Mockup - hidden on mobile/tablet screens, visible on desktop */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-start">
            <CodeEditorMock />
          </div>
        </div>
      </div>
    </section>
  );
}


