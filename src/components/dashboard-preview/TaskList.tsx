import { Check } from "lucide-react";

interface Task {
  label: string;
  done: boolean;
  tag?: string;
}

interface TaskListProps {
  tasks: Task[];
  title?: string;
}

export function TaskList({ tasks, title }: TaskListProps) {
  return (
    <div className="bg-[#0E0C18] rounded-2xl border border-[#1E1B2E] p-4 sm:p-5 h-full flex flex-col justify-between">
      {title && <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">{title}</h4>}
      <ul className="space-y-3.5">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5 min-w-0">
              <span
                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 transition-colors ${
                  task.done
                    ? "bg-[#10B981] border-[#10B981]"
                    : "bg-[#171426] border-[#2E2844]"
                }`}
              >
                {task.done && <Check size={10} className="text-white stroke-[3]" />}
              </span>
              <span className={`leading-snug ${task.done ? "line-through text-[#64748B]" : "text-[#CBD5E1]"}`}>
                {task.label}
              </span>
            </div>
            {task.tag && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171426] text-[#A855F7] border border-[#2E2844] shrink-0 text-right">
                {task.tag}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
