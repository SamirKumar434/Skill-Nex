import { MapPin, Code2, BarChart2, Check, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// ─── Mini UI Previews ─────────────────────────────────────────────────────────

function RoadmapMiniPreview() {
  const items = [
    { n: 1, label: "Core Subjects", done: true },
    { n: 2, label: "DSA Patterns", active: true, chip: "Arrays & Hashing" },
    { n: 3, label: "System Design", locked: true },
  ];
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.n}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs ${
            item.active
              ? "bg-[#1E2535] border-[#1D4ED8]/50"
              : "bg-[#151923] border-[#272D3A]/60"
          }`}
        >
          {item.done ? (
            <CheckCircle2 size={13} className="text-[#35C98A] shrink-0" />
          ) : item.locked ? (
            <span className="text-[#4A5568] shrink-0 text-[10px]">🔒</span>
          ) : (
            <span className="w-3.5 h-3.5 rounded-full border border-[#2563EB] shrink-0" />
          )}
          <span className={item.done ? "line-through text-[#969DAF]" : item.locked ? "text-[#4A5568]" : "text-[#F4F5F8] font-medium"}>
            {item.n}. {item.label}
          </span>
          {item.done && (
            <span className="ml-auto text-[10px] text-[#35C98A] bg-[#35C98A]/10 border border-[#35C98A]/30 px-1.5 py-0.5 rounded-full">✓</span>
          )}
          {item.chip && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#1E3A8A]/30 text-[#60A5FA] border border-[#1D4ED8]/30">{item.chip}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function PracticeMiniPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#F4F5F8]">Two Sum</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#35C98A]/10 text-[#35C98A] border border-[#35C98A]/30 font-semibold">EASY</span>
      </div>
      <div className="flex gap-2 text-[10px] text-[#969DAF]">
        <span>EASY</span><span>·</span><span>73% Pass Rate</span>
      </div>
      <div className="bg-[#0B0D12] rounded-lg p-2.5 font-mono text-[11px] border border-[#272D3A]">
        <p className="text-[#3B82F6]">function <span className="text-[#F4F5F8]">twoSum</span><span className="text-[#969DAF]">(nums, target) {"{"}</span></p>
        <p className="text-[#969DAF] pl-3"><span>{"// Solution here"}</span></p>
        <p className="text-[#969DAF]">{"}"}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#969DAF]">Code &nbsp; Practice</span>
        <span className="text-[10px] text-[#35C98A] flex items-center gap-1">Run Tests | Submit <Check size={10} /></span>
      </div>
    </div>
  );
}

function ProgressMiniPreview() {
  const week = ["W", "T", "W", "T", "F", "S", "S"];
  const active = [true, true, true, true, false, false, false];
  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {week.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-[#969DAF]">{d}</span>
            <span className={`w-5 h-5 rounded-sm ${active[i] ? "bg-[#35C98A]" : "bg-[#1E2535] border border-[#272D3A]"}`} />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-[#F4F5F8]">14 Days Streak 🔥</span>
          <span className="text-[#969DAF]">62%</span>
        </div>
        <div className="w-full h-1.5 bg-[#272D3A] rounded-full overflow-hidden">
          <div className="h-full w-[62%] bg-gradient-to-r from-[#1D4ED8] to-[#5B9DFF] rounded-full" />
        </div>
        <p className="text-[10px] text-[#969DAF]">Active Time: 8.5 hrs · ECE/Software</p>
      </div>
    </div>
  );
}

// ─── Feature cards data ────────────────────────────────────────────────────────
const featureCards = [
  {
    icon: MapPin,
    title: "Personalized Roadmaps",
    description: "Know what to study next.",
    Preview: RoadmapMiniPreview,
  },
  {
    icon: Code2,
    title: "Topic-wise Practice",
    description: "Turn concepts into problem-solving skills.",
    Preview: PracticeMiniPreview,
  },
  {
    icon: BarChart2,
    title: "Progress Tracking",
    description: "See your progress and identify what needs attention.",
    Preview: ProgressMiniPreview,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-[#0B0D12] scroll-mt-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeading
            title={
              <>
                Everything you need to{" "}
                <span className="gradient-text">prepare with purpose.</span>
              </>
            }
            subtitle={`"From learning the fundamentals to practising for interviews, keep your preparation organized in one place."`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map(({ icon: Icon, title, description, Preview }) => (
            <div
              key={title}
              className="bg-[#151923] border border-[#272D3A] rounded-2xl p-6 card-hover flex flex-col"
            >
              {/* Mini UI preview */}
              <div className="bg-[#10131B] rounded-xl border border-[#272D3A] p-4 mb-5 min-h-[130px] flex flex-col justify-center">
                <Preview />
              </div>

              {/* Icon + text */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/20 border border-[#1D4ED8]/30 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#60A5FA]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F5F8] mb-1">{title}</h3>
                  <p className="text-xs text-[#969DAF]">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
