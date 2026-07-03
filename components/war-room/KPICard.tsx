"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/animated-number";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  color: "green" | "amber" | "red" | "purple" | "blue" | "slate";
  trend?: number;
  pulse?: boolean;
  className?: string;
}

const colorMap = {
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "bg-emerald-500/20 text-emerald-400",
    value: "text-emerald-400",
    glow: "shadow-emerald-500/10",
    trend: "text-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "bg-amber-500/20 text-amber-400",
    value: "text-amber-400",
    glow: "shadow-amber-500/10",
    trend: "text-amber-400",
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "bg-red-500/20 text-red-400",
    value: "text-red-400",
    glow: "shadow-red-500/10",
    trend: "text-red-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "bg-purple-500/20 text-purple-400",
    value: "text-purple-400",
    glow: "shadow-purple-500/10",
    trend: "text-purple-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "bg-blue-500/20 text-blue-400",
    value: "text-blue-400",
    glow: "shadow-blue-500/10",
    trend: "text-blue-400",
  },
  slate: {
    bg: "bg-slate-700/30",
    border: "border-slate-700/50",
    icon: "bg-slate-700 text-slate-400",
    value: "text-slate-300",
    glow: "shadow-slate-700/10",
    trend: "text-slate-400",
  },
};

export function KPICard({ title, value, subtitle, icon: Icon, color, trend, pulse = false, className }: KPICardProps) {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "relative rounded-xl border p-5 overflow-hidden shadow-lg",
        c.bg, c.border, c.glow,
        className
      )}
    >
      {pulse && (
        <span className={cn("absolute top-4 right-4 flex h-2.5 w-2.5")}>
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            color === "red" ? "bg-red-400" : color === "amber" ? "bg-amber-400" : "bg-emerald-400"
          )} />
          <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5",
            color === "red" ? "bg-red-400" : color === "amber" ? "bg-amber-400" : "bg-emerald-400"
          )} />
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest truncate">{title}</p>
          <p className={cn("text-4xl font-bold mt-2 tabular-nums", c.value)}>
            {typeof value === "number" ? (
              <AnimatedNumber value={value} />
            ) : (
              value
            )}
          </p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <p className={cn("text-xs mt-2 font-medium", trend >= 0 ? "text-emerald-400" : "text-red-400")}>
              {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs hier
            </p>
          )}
        </div>
        <div className={cn("rounded-xl p-3 flex-shrink-0", c.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
