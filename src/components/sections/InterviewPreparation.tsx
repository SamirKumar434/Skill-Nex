import { BookMarked, Terminal, Mic, Building2 } from "lucide-react";
import { interviewPrepCards } from "@/data/landing-page";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TopicBadge } from "@/components/ui/TopicBadge";

const iconMap = {
  "book-marked": BookMarked,
  terminal: Terminal,
  mic: Mic,
  "building-2": Building2,
};

// Mini code editor preview for Coding Assessments card
function CodeEditorPreview() {
  return (
    <div className="bg-[#050508] rounded-xl border border-[#1E1B2E] p-3 font-mono text-[11px] mt-3">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
        <span className="ml-2 text-[10px] text-[#A855F7]">two_sum.py</span>
      </div>
      <p><span className="text-[#A855F7]">def </span><span className="text-[#C084FC]">twoSum</span><span className="text-[#94A3B8]">(nums, target):</span></p>
      <p className="pl-3 text-[#64748B]">seen = &#123;&#125;</p>
      <p className="pl-3"><span className="text-[#A855F7]">for </span><span className="text-[#F8FAFC]">i, n </span><span className="text-[#A855F7]">in </span><span className="text-[#94A3B8]">enumerate</span><span className="text-[#94A3B8]">(nums):</span></p>
      <p className="pl-6 text-[#94A3B8]">diff = target - n</p>
      <p className="pl-6"><span className="text-[#A855F7]">if </span><span className="text-[#F8FAFC]">diff </span><span className="text-[#A855F7]">in </span><span className="text-[#F8FAFC]">seen</span><span className="text-[#94A3B8]">:</span></p>
      <p className="pl-9"><span className="text-[#10B981]">return </span><span className="text-[#94A3B8]">[seen[diff], i]</span></p>
    </div>
  );
}

export function InterviewPreparation() {
  const purplePalette = ["#8B5CF6", "#A855F7", "#C084FC", "#9333EA"];

  return (
    <section id="interview-prep" className="py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <SectionHeading
            title={
              <>
                Prepare for every{" "}
                <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                  interview stage.
                </span>
              </>
            }
            subtitle="From concept revision to mock interviews — everything you need before placement day."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interviewPrepCards.map((card, idx) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            const cardColor = purplePalette[idx % purplePalette.length];

            return (
              <div
                key={card.title}
                className="bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/50 rounded-3xl p-6 card-hover flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border"
                    style={{
                      backgroundColor: `${cardColor}15`,
                      borderColor: `${cardColor}35`,
                    }}
                  >
                    <Icon size={22} style={{ color: cardColor }} />
                  </div>
                  <h3 className="text-base font-bold text-[#F8FAFC] mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">{card.description}</p>

                  {/* Mini code editor for Coding card */}
                  {card.icon === "terminal" && <CodeEditorPreview />}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-[#1E1B2E]">
                  {card.tags.map((tag) => (
                    <TopicBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

