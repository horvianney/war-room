"use client";

import React from "react";
import { Bell, Radio } from "lucide-react";
import { RealTimeClock } from "@/components/war-room/RealTimeClock";

interface Props {
  alertCount: number;
  criticalCount: number;
}

export function Header({ alertCount, criticalCount }: Props) {
  return (
    <header className="h-16 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          Live
        </span>
        <span className="text-slate-700 text-xs">|</span>
        <span className="text-xs text-slate-500">Données actualisées en temps réel</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Bell className="w-4.5 h-4.5" />
          {alertCount > 0 && (
            <span className={`absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${criticalCount > 0 ? "bg-red-500" : "bg-amber-500"}`}>
              {alertCount}
            </span>
          )}
        </button>
        <div className="h-5 w-px bg-slate-800" />
        <RealTimeClock />
      </div>
    </header>
  );
}
