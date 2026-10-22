import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  Code2,
  Cpu,
  FolderGit2,
  Mic,
  ArrowRight,
  Target,
  ExternalLink,
} from "lucide-react";
import { ProgressCard } from "@/components/dashboard-preview/ProgressCard";
import { TaskList } from "@/components/dashboard-preview/TaskList";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: false },
  { icon: Map, label: "My Roadmap", active: true },
  { icon: Code2, label: "Practice", active: false },
  { icon: Cpu, label: "Core Subjects", active: false },
  { icon: FolderGit2, label: "Projects & GitHub", active: false },
  { icon: Mic, label: "Mock Interviews", active: false },
];

const weeklyTasks = [
  { label: "Revise Boolean Algebra concepts", done: true, tag: "Core Electronics" },
  { label: "Solve 5 DSA practice problems", done: true, tag: "Practice" },
  { label: "Study Flip-Flops and Sequential Circuits", done: false, tag: "Digital Electronics" },
  { label: "Complete a basic Git & GitHub workflow", done: false, tag: "Projects & GitHub" },
  { label: "Attempt a mini technical quiz", done: false, tag: "Core Concepts" },
];

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="py-14 sm:py-20 lg:py-28 bg-[#050508] relative scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <SectionHeading
            title={
              <>
                Your next step{" "}
                <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                  starts here.
                </span>
              </>
            }
            subtitle="A single, organized dashboard that keeps your entire preparation visible at a glance."
            align="center"
          />
        </div>

        {/* Dashboard shell */}
        <div className="bg-[#090712] border border-[#1E1B2E] rounded-3xl overflow-hidden shadow-2xl">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 bg-[#0D0B17] border-b border-[#1E1B2E]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="hidden sm:inline ml-3 text-xs text-[#94A3B8] font-mono">skillnex.app / dashboard</span>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#A855F7] hover:text-[#C084FC] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Launch Live Dashboard</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          <div className="flex min-h-[460px]">
            {/* Sidebar */}
            <aside className="w-[215px] border-r border-[#1E1B2E] p-4 hidden sm:flex flex-col gap-1 shrink-0 bg-[#08060F]">
              <div className="mb-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#64748B] mb-3">NAVIGATION</p>
                {sidebarItems.map(({ icon: Icon, label, active }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl mb-1 text-xs transition-colors ${
                      active
                        ? "bg-[#8B5CF6]/20 text-[#C084FC] font-semibold border border-[#8B5CF6]/40"
                        : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151222]"
                    }`}
                  >
                    <Icon size={14} />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>

              {/* Current focus */}
              <div className="mt-auto bg-[#0E0C18] rounded-2xl p-3.5 border border-[#1E1B2E]">
                <p className="text-[10px] font-bold text-[#A855F7] uppercase tracking-wide mb-1">Current Focus</p>
                <p className="text-xs text-[#F8FAFC] font-bold">Digital Electronics</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">Logic Gates &amp; Boolean Algebra</p>
                <div className="mt-2.5 w-full h-1.5 bg-[#1E1B2E] rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full" />
                </div>
                <p className="text-[10px] text-[#94A3B8] mt-1.5 font-mono">65% complete</p>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 p-5 lg:p-7 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Progress cards col */}
                <div className="lg:col-span-1 space-y-2.5">
                  <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">Overall Progress</h3>
                  <ProgressCard label="Programming" value={100} color="#10B981" subtitle="Completed" />
                  <ProgressCard label="Data Structures & Algorithms" value={65} color="#8B5CF6" subtitle="In Progress" />
                  <ProgressCard label="Core Electronics" value={40} color="#A855F7" subtitle="In Progress" />
                  <ProgressCard label="Communication Systems" value={0} color="#64748B" subtitle="Upcoming" />
                  <ProgressCard label="Embedded Systems" value={0} color="#64748B" subtitle="Upcoming" />
                </div>

                {/* Weekly tasks */}
                <div className="lg:col-span-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">Weekly Tasks</h3>
                  <div className="flex-1">
                    <TaskList tasks={weeklyTasks} />
                  </div>
                </div>

                {/* Recommended next step */}
                <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">Recommended Next Step</h3>
                    <div className="bg-[#0E0C18] border border-[#8B5CF6]/40 rounded-2xl p-4.5">
                      <div className="flex items-center gap-2 mb-2.5">
                        <Target size={15} className="text-[#A855F7]" />
                        <span className="text-xs sm:text-sm font-semibold text-[#C084FC]">
                          Next: Flip-Flops &amp; Sequential Circuits
                        </span>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                        You&apos;ve covered the fundamentals of Boolean Algebra and logic gates. Continue with Flip-Flops to understand how digital circuits store and process information.
                      </p>
                      <Link
                        href="/dashboard"
                        className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-[#8B5CF6] text-white px-4 py-2.5 rounded-full hover:bg-[#7C3AED] transition-colors shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                      >
                        Explore in Dashboard <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="bg-[#0E0C18] border border-[#1E1B2E] rounded-2xl p-4.5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#F8FAFC]">7-Day Learning Streak 🔥</span>
                      <span className="text-xs text-[#10B981] font-medium">Active</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <span
                            className="w-full aspect-square rounded-md bg-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.35)] flex items-center justify-center"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                          </span>
                          <span className="text-[9px] font-mono text-[#64748B]">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

