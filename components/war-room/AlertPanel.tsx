"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, Check, Bell, BellOff } from "lucide-react";
import type { Alert } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

const alertConfig = {
  critical: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-500 animate-pulse" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-500 animate-pulse" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", dot: "bg-blue-500" },
};

export function AlertPanel({ alerts, onAcknowledge }: Props) {
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  const visible = showAcknowledged ? alerts : alerts.filter((a) => !a.acknowledged);
  const criticalCount = alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length;
  const warningCount = alerts.filter((a) => a.severity === "warning" && !a.acknowledged).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-200">Alertes Actives</span>
          {criticalCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">{criticalCount}</span>
          )}
          {warningCount > 0 && (
            <span className="bg-amber-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">{warningCount}</span>
          )}
        </div>
        <button
          onClick={() => setShowAcknowledged(!showAcknowledged)}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
        >
          {showAcknowledged ? <BellOff className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
          {showAcknowledged ? "Masquer acquittées" : "Voir tout"}
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1">
        <AnimatePresence>
          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-slate-600"
            >
              <Check className="w-8 h-8 mb-2" />
              <p className="text-sm">Aucune alerte active</p>
            </motion.div>
          )}
          {visible.map((alert) => {
            const cfg = alertConfig[alert.severity];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: alert.acknowledged ? 0.5 : 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={cn(
                  "rounded-lg border p-3 transition-all",
                  cfg.bg,
                  alert.acknowledged && "opacity-50"
                )}
              >
                <div className="flex items-start gap-2">
                  <span className={cn("mt-0.5 w-2 h-2 rounded-full flex-shrink-0", cfg.dot)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-xs font-semibold truncate", cfg.color)}>{alert.message}</p>
                      <span className="text-xs text-slate-600 flex-shrink-0">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{alert.detail}</p>
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 h-6 text-xs px-2 text-slate-400 hover:text-white"
                        onClick={() => onAcknowledge(alert.id)}
                      >
                        <Check className="w-3 h-3 mr-1" /> Acquitter
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
