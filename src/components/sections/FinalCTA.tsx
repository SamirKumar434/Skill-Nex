import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="cta" className="py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-[#090714] border border-[#8B5CF6]/40 rounded-3xl px-8 py-16 lg:py-24 text-center overflow-hidden purple-glow-lg">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/15 via-transparent to-[#6D28D9]/15 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-40 bg-[#8B5CF6]/25 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C084FC] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} /> Start Your Transformation
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Your next step starts with{" "}
              <span className="text-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                SkillNex.
              </span>
            </h2>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Turn chaotic question lists into structured pattern mastery. Crack
              technical interviews with confidence.
            </p>

            <div className="pt-2">
              <Button
                as="a"
                href="#paths"
                variant="purple-glow"
                size="lg"
                className="rounded-full px-9 py-4 font-semibold text-base inline-flex items-center gap-2 shadow-[0_0_35px_rgba(139,92,246,0.6)] cursor-pointer"
              >
                Start Practicing Free
                <ArrowRight size={18} />
              </Button>
            </div>

            <p className="text-xs text-[#64748B]">
              No credit card required · Instant access to foundational patterns · Free tier forever
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

