"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Check,
  CheckCheck,
  Filter,
  Clock,
} from "lucide-react";
import { MOCK_ALERTS } from "@/lib/mock-data";
import type { Alert, AlertSeverity } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const severityConfig: Record<AlertSeverity, { icon: typeof AlertCircle; color: string; bg: string; border: string; label: string }> = {
  critical: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/25", label: "Critique" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", label: "Attention" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", label: "Info" },
};

const typeLabels: Record<Alert["type"], string> = {
  absence: "Absence",
  late: "Retard",
  overload: "Surcharge",
  understaffed: "Sous-effectif",
  emergency: "Urgence",
};

export default function AlertesPage() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [filter, setFilter] = useState<AlertSeverity | "all" | "pending">("pending");

  const displayed = alerts.filter((a) => {
    if (filter === "pending") return !a.acknowledged;
    if (filter === "all") return true;
    return a.severity === filter && !a.acknowledged;
  });

  const critCount = alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length;
  const warnCount = alerts.filter((a) => a.severity === "warning" && !a.acknowledged).length;
  const totalPending = alerts.filter((a) => !a.acknowledged).length;

  function acknowledge(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }

  function acknowledgeAll() {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Centre d'Alertes</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {totalPending} alerte{totalPending > 1 ? "s" : ""} en attente
          </p>
        </div>
        {totalPending > 0 && (
          <Button variant="outline" size="sm" onClick={acknowledgeAll}>
            <CheckCheck className="w-4 h-4 mr-1.5" /> Tout acquitter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Critiques", count: critCount, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
          { label: "Avertissements", count: warnCount, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "En attente", count: totalPending, color: "text-white", bg: "bg-slate-800 border-slate-700" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl border p-4 text-center", s.bg)}>
            <p className={cn("text-3xl font-bold", s.color)}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500" />
        {([
          { key: "pending", label: `En attente (${totalPending})` },
          { key: "all", label: "Toutes" },
          { key: "critical", label: "Critiques" },
          { key: "warning", label: "Attention" },
        ] as { key: typeof filter; label: string }[]).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border transition-all",
              filter === f.key
                ? "bg-blue-600 border-blue-600 text-white"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {displayed.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-slate-600"
            >
              <Check className="w-12 h-12 mb-3" />
              <p className="text-sm">Aucune alerte à afficher</p>
            </motion.div>
          )}
          {displayed.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: alert.acknowledged ? 0.4 : 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={cn("rounded-xl border p-5 transition-all", cfg.bg, cfg.border)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("rounded-xl p-2.5", cfg.bg)}>
                    <Icon className={cn("w-5 h-5", cfg.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={cn("text-xs font-bold uppercase tracking-wider", cfg.color)}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-slate-600 bg-slate-800 rounded px-1.5 py-0.5">
                        {typeLabels[alert.type]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-600 ml-auto">
                        <Clock className="w-3 h-3" /> {alert.timestamp}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-100">{alert.message}</p>
                    <p className="text-sm text-slate-400 mt-1">{alert.detail}</p>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-shrink-0"
                      onClick={() => acknowledge(alert.id)}
                    >
                      <Check className="w-3.5 h-3.5 mr-1" /> Acquitter
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
