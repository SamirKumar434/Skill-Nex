import { softwareRoadmapStages } from "@/data/landing-page";
import { RoadmapPreview } from "@/components/dashboard-preview/RoadmapPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RoadmapShowcase() {
  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-[#0B0D12] scroll-mt-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left copy */}
          <div>
            <SectionHeading
              title="A closer look at the roadmap."
            />
            <p className="mt-4 text-[#969DAF] text-base leading-relaxed">
              See every stage at a glance. Move through fundamentals, core
              topics, practice rounds, and interview preparation — all in a
              single, organized view.
            </p>
          </div>

          {/* Right: roadmap showcase */}
          <div className="bg-[#10131B] border border-[#272D3A] rounded-2xl p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#969DAF]">
                YOUR LEARNING JOURNEY
              </p>
              <span className="text-[10px] text-[#60A5FA] font-semibold px-2.5 py-1 rounded-full bg-[#1E3A8A]/20 border border-[#1D4ED8]/40">
                ACTIVE PATH: SOFTWARE &amp; IT
              </span>
            </div>

            {/* Horizontal roadmap */}
            <RoadmapPreview stages={softwareRoadmapStages} />

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-[#272D3A] flex items-center justify-between text-xs text-[#969DAF]">
              <span>18 of 45 items</span>
              <span>Remaining: 24 hrs left</span>
              <div className="flex items-center gap-2">
                <span>Progress</span>
                <div className="w-20 h-1 bg-[#272D3A] rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-[#1D4ED8] rounded-full" />
                </div>
                <span>40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
