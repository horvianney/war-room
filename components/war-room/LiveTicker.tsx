"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, LogIn, AlertTriangle, MapPin, Activity } from "lucide-react";
import type { LiveEvent } from "@/lib/use-simulation";
import { cn } from "@/lib/utils";

interface Props {
  events: LiveEvent[];
}

const eventConfig = {
  checkin: { icon: LogIn, color: "text-emerald-400", dot: "bg-emerald-500" },
  alert: { icon: AlertTriangle, color: "text-amber-400", dot: "bg-amber-500" },
  zone: { icon: MapPin, color: "text-blue-400", dot: "bg-blue-500" },
  status: { icon: Activity, color: "text-purple-400", dot: "bg-purple-500" },
};

export function LiveTicker({ events }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events]);

  if (events.length === 0) return null;

  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-6 overflow-x-hidden">
          <AnimatePresence mode="popLayout">
            {events.slice(0, 6).map((event) => {
              const cfg = eventConfig[event.type];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center gap-1.5 flex-shrink-0"
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
                  <Icon className={cn("w-3 h-3 flex-shrink-0", cfg.color)} />
                  <span className={cn("text-xs", cfg.color)}>{event.message}</span>
                  <span className="text-xs text-slate-700">{event.timestamp}</span>
                  <span className="text-slate-800 text-xs">•</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
