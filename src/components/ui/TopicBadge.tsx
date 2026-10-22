import { cn } from "@/lib/utils";

interface TopicBadgeProps {
  label: string;
  className?: string;
}

export function TopicBadge({ label, className }: TopicBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#12101F] text-[#C084FC] border border-[#2D2744] hover:border-[#8B5CF6]/50 transition-colors select-none",
        className
      )}
    >
      {label}
    </span>
  );
}

