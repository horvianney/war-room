import React from "react";
import type { EmployeeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  status: EmployeeStatus;
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<EmployeeStatus, { label: string; dot: string; text: string; bg: string }> = {
  present: { label: "Présent", dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  late: { label: "En retard", dot: "bg-amber-400 animate-pulse", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  absent: { label: "Absent", dot: "bg-red-500 animate-pulse", text: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  on_leave: { label: "Congé", dot: "bg-purple-400", text: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  off_duty: { label: "Hors service", dot: "bg-slate-500", text: "text-slate-400", bg: "bg-slate-700/20 border-slate-700/30" },
};

export function EmployeeStatusBadge({ status, showDot = true, className }: Props) {
  const cfg = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium", cfg.bg, cfg.text, className)}>
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />}
      {cfg.label}
    </span>
  );
}
