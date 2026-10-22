import { X, Check } from "lucide-react";
import { problemPoints, solutionPoints } from "@/data/landing-page";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProblemSolution() {
  return (
    <section id="problem-solution" className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <SectionHeading
            title={
              <>
                Less searching.{" "}
                <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                  More deliberate mastery.
                </span>
              </>
            }
            subtitle="The difference between random question grinding and pattern-first interview readiness."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Without roadmap */}
          <div className="bg-[#090712] border border-[#1E1B2E] rounded-3xl p-7 lg:p-8">
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#64748B] mb-6">
              WITHOUT PATTERN ROADMAP
            </p>
            <ul className="space-y-4">
              {problemPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                    <X size={11} className="text-red-400" />
                  </span>
                  <span className="text-sm text-[#94A3B8]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With SkillNex */}
          <div className="bg-[#0D0B18] border border-[#8B5CF6]/50 rounded-3xl p-7 lg:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent pointer-events-none rounded-3xl" />
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#C084FC] mb-6 flex items-center justify-between">
              <span>WITH SKILLNEX</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-white">PROVEN</span>
            </p>
            <ul className="space-y-4 relative z-10">
              {solutionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-[#10B981]" />
                  </span>
                  <span className="text-sm font-medium text-[#F8FAFC]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

