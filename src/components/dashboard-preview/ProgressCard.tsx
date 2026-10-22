interface ProgressCardProps {
  label: string;
  value: number; // 0–100
  color?: string;
  subtitle?: string;
}

export function ProgressCard({ label, value, color = "#8B5CF6", subtitle }: ProgressCardProps) {
  return (
    <div className="bg-[#0E0C18] rounded-xl border border-[#1E1B2E] p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-[#F8FAFC]">{label}</span>
        <span className="text-xs sm:text-sm font-bold font-mono" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#171426] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      {subtitle && <p className="mt-1.5 text-[11px] text-[#94A3B8]">{subtitle}</p>}
    </div>
  );
}
