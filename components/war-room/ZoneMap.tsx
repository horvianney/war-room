"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { Zone } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  zones: Zone[];
}

function getOccupancyColor(ratio: number): string {
  if (ratio >= 0.9) return "bg-red-500";
  if (ratio >= 0.7) return "bg-amber-500";
  if (ratio >= 0.4) return "bg-emerald-500";
  return "bg-blue-500";
}

function getOccupancyTextColor(ratio: number): string {
  if (ratio >= 0.9) return "text-red-400";
  if (ratio >= 0.7) return "text-amber-400";
  return "text-emerald-400";
}

export function ZoneMap({ zones }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-semibold text-slate-200">Occupation des Zones</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {zones.map((zone, i) => {
          const ratio = zone.current / zone.capacity;
          const pct = Math.round(ratio * 100);
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{zone.icon}</span>
                  <span className="text-xs font-medium text-slate-300 truncate max-w-[80px]">{zone.name}</span>
                </div>
                <span className={cn("text-xs font-bold tabular-nums", getOccupancyTextColor(ratio))}>
                  {zone.current}/{zone.capacity}
                </span>
              </div>
              <Progress
                value={pct}
                className="h-1.5"
                indicatorClassName={getOccupancyColor(ratio)}
              />
              <p className="text-xs text-slate-600 mt-1 text-right">{pct}%</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
