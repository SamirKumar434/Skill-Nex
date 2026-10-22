import { Cpu, Code2, ArrowRight } from "lucide-react";
import { preparationPaths } from "@/data/landing-page";
import { TopicBadge } from "@/components/ui/TopicBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  cpu: Cpu,
  "code-2": Code2,
};

export function PreparationPaths() {
  return (
    <section
      id="paths"
      className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-20"
    >
      <span id="choose-path" className="absolute -top-20" />
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <SectionHeading
            title={
              <>
                Choose your path.{" "}
                <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                  Build your future.
                </span>
              </>
            }
            subtitle="Start with the preparation track that matches your placement goals."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {preparationPaths.map((path, idx) => {
            const Icon = iconMap[path.icon as keyof typeof iconMap];
            const purpleAccent = idx === 0 ? "#8B5CF6" : "#A855F7";

            return (
              <div
                key={path.id}
                className="group relative bg-[#090712] border border-[#1E1B2E] hover:border-[#8B5CF6]/50 rounded-3xl p-7 lg:p-8 card-hover flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 border transition-all group-hover:scale-105"
                  style={{
                    backgroundColor: `${purpleAccent}15`,
                    borderColor: `${purpleAccent}40`,
                  }}
                >
                  <Icon size={24} style={{ color: purpleAccent }} />
                </div>

                {/* Title & desc */}
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">{path.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{path.description}</p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {path.topics.map((t) => (
                    <TopicBadge key={t} label={t} />
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={path.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] rounded text-[#C084FC] hover:text-white"
                >
                  {path.ctaLabel}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

