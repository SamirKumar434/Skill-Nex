import { Target, Map, BookOpen, TrendingUp } from "lucide-react";
import { howItWorksSteps } from "@/data/landing-page";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  target: Target,
  map: Map,
  "book-open": BookOpen,
  "trending-up": TrendingUp,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <SectionHeading
            title={
              <>
                A clearer path from{" "}
                <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                  learning to placement.
                </span>
              </>
            }
            subtitle="Four simple steps to make your preparation more structured and manageable."
            align="center"
          />
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  {/* Icon bubble */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#090712] border border-[#1E1B2E] flex flex-col items-center justify-center gap-1 mb-5 transition-all group-hover:border-[#8B5CF6]/60 group-hover:bg-[#120F22] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                    <Icon size={22} className="text-[#C084FC] group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-[#A855F7] font-mono">{step.step}</span>
                  </div>

                  {/* Label */}
                  <p className="text-xs font-bold tracking-widest uppercase text-[#F8FAFC] mb-1.5">
                    {step.label}
                  </p>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-[190px]">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

