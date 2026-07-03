"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, LogIn, AlertCircle, MapPin, CheckCircle, Zap } from "lucide-react";
import type { ActivityLog } from "@/lib/types";
import type { LiveEvent } from "@/lib/use-simulation";
import { cn } from "@/lib/utils";

interface Props {
  logs: ActivityLog[];
  liveEvents?: LiveEvent[];
}

const entityIcons: Record<string, React.ReactNode> = {
  employee: <LogIn className="w-3 h-3" />,
  alert: <AlertCircle className="w-3 h-3" />,
  zone: <MapPin className="w-3 h-3" />,
  shift: <CheckCircle className="w-3 h-3" />,
};

const entityColors: Record<string, string> = {
  employee: "bg-blue-500/20 text-blue-400",
  alert: "bg-red-500/20 text-red-400",
  zone: "bg-emerald-500/20 text-emerald-400",
  shift: "bg-purple-500/20 text-purple-400",
};

const liveEventColors: Record<LiveEvent["type"], string> = {
  checkin: "bg-emerald-500/20 text-emerald-400",
  alert: "bg-red-500/20 text-red-400",
  zone: "bg-blue-500/20 text-blue-400",
  status: "bg-purple-500/20 text-purple-400",
};

export function ActivityFeed({ logs, liveEvents = [] }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-200">Activité Récente</span>
        </div>
        {liveEvents.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <Zap className="w-3 h-3" /> Live
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {liveEvents.slice(0, 4).map((ev) => (
            <motion.div
              key={ev.id}
              layout
              initial={{ opacity: 0, x: -8, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3"
            >
              <div className={cn("rounded-full p-1.5 flex-shrink-0 mt-0.5", liveEventColors[ev.type])}>
                <Zap className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 font-medium">{ev.message}</p>
              </div>
              <span className="text-xs text-emerald-600 flex-shrink-0">{ev.timestamp}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {liveEvents.length > 0 && logs.length > 0 && (
          <div className="border-t border-slate-800/60 my-1" />
        )}

        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <div className={cn("rounded-full p-1.5 flex-shrink-0 mt-0.5", entityColors[log.entityType] ?? "bg-slate-700 text-slate-400")}>
              {entityIcons[log.entityType]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300">
                <span className="font-medium">{log.action}</span>
                {" — "}
                <span className="text-slate-500">{log.entityName}</span>
              </p>
            </div>
            <span className="text-xs text-slate-600 flex-shrink-0">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
