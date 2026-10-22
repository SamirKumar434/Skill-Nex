import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapStage, StageStatus } from "@/data/landing-page";

const statusConfig: Record<
  StageStatus,
  { label: string; labelClass: string; numClass: string; borderClass: string }
> = {
  completed: {
    label: "COMPLETED",
    labelClass: "text-[#35C98A] bg-[#35C98A]/10 border border-[#35C98A]/30",
    numClass: "bg-[#35C98A] text-white",
    borderClass: "border-[#35C98A]/30",
  },
  active: {
    label: "IN PROGRESS",
    labelClass: "text-[#60A5FA] bg-[#1E3A8A]/20 border border-[#1D4ED8]/40",
    numClass: "bg-[#1D4ED8] text-white",
    borderClass: "border-[#1D4ED8]/50",
  },
  upcoming: {
    label: "UP NEXT",
    labelClass: "text-[#969DAF] bg-[#272D3A] border border-[#272D3A]",
    numClass: "bg-[#1E2535] text-[#969DAF]",
    borderClass: "border-[#272D3A]",
  },
  locked: {
    label: "LOCKED",
    labelClass: "text-[#969DAF] bg-[#1A1F2E] border border-[#272D3A]",
    numClass: "bg-[#1A1F2E] text-[#4A5568]",
    borderClass: "border-[#272D3A]",
  },
};

interface RoadmapPreviewProps {
  stages: RoadmapStage[];
  compact?: boolean;
}

export function RoadmapPreview({ stages, compact = false }: RoadmapPreviewProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto scrollbar-hide", compact && "gap-1.5")}>
      {stages.map((stage) => {
        const cfg = statusConfig[stage.status];
        return (
          <div
            key={stage.num}
            className={cn(
              "shrink-0 rounded-xl border p-4 transition-colors",
              compact ? "w-36 p-3" : "w-48 sm:w-52",
              cfg.borderClass,
              stage.status === "active"
                ? "bg-[#191E2A]"
                : "bg-[#151923]"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  cfg.numClass
                )}
              >
                {stage.status === "completed" ? (
                  <CheckCircle2 size={14} />
                ) : stage.status === "locked" ? (
                  <Lock size={12} />
                ) : (
                  stage.num
                )}
              </span>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", cfg.labelClass)}>
                {cfg.label}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-[#F4F5F8] mb-1">{stage.title}</h4>
            <p className="text-xs text-[#969DAF] leading-relaxed">{stage.description}</p>

            {/* Tasks */}
            {stage.tasks && stage.status === "active" && (
              <div className="mt-3 space-y-1.5">
                {stage.tasks.map((t) => (
                  <label key={t.label} className="flex items-center gap-2 cursor-default">
                    <input
                      type="checkbox"
                      checked={t.done}
                      readOnly
                      className="w-3.5 h-3.5 accent-[#1D4ED8] cursor-default"
                    />
                    <span className={cn("text-xs", t.done ? "text-[#35C98A] line-through" : "text-[#969DAF]")}>
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
