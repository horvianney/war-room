"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogIn, AlertCircle, MapPin, CheckCircle, Clock, Activity } from "lucide-react";
import { MOCK_ACTIVITY } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const entityIcons = {
  employee: LogIn,
  alert: AlertCircle,
  zone: MapPin,
  shift: CheckCircle,
};

const entityColors: Record<string, string> = {
  employee: "bg-blue-500/20 text-blue-400 border-blue-500/20",
  alert: "bg-red-500/20 text-red-400 border-red-500/20",
  zone: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
  shift: "bg-purple-500/20 text-purple-400 border-purple-500/20",
};

const extendedLogs = [
  ...MOCK_ACTIVITY,
  { id: "l7",  action: "Pointage arrivée", entityType: "employee", entityId: "e13", entityName: "Ama Honu",           userId: "system", timestamp: "10:02" },
  { id: "l8",  action: "Alerte générée",   entityType: "alert",    entityId: "a4",  entityName: "Adidogomé sous-effectif", userId: "system", timestamp: "09:30" },
  { id: "l9",  action: "Pointage arrivée", entityType: "employee", entityId: "e6",  entityName: "Mawuli Attivor",     userId: "system", timestamp: "09:30" },
  { id: "l10", action: "Zone mise à jour", entityType: "zone",     entityId: "z3",  entityName: "Bé Kpota",           userId: "e7",     timestamp: "09:15" },
  { id: "l11", action: "Alerte générée",   entityType: "alert",    entityId: "a3",  entityName: "Retard Elikplim Klutse", userId: "system", timestamp: "09:15" },
  { id: "l12", action: "Pointage arrivée", entityType: "employee", entityId: "e15", entityName: "Akoua Amegan",       userId: "system", timestamp: "08:15" },
  { id: "l13", action: "Alerte générée",   entityType: "alert",    entityId: "a2",  entityName: "Retard Kokou Agbéko", userId: "system", timestamp: "08:47" },
  { id: "l14", action: "Pointage arrivée", entityType: "employee", entityId: "e4",  entityName: "Kwame Adjovi",       userId: "system", timestamp: "11:00" },
];

export default function ActivitePage() {
  const grouped: Record<string, typeof extendedLogs> = {};
  extendedLogs.forEach((log) => {
    const hour = log.timestamp.split(":")[0] + "h";
    if (!grouped[hour]) grouped[hour] = [];
    grouped[hour].push(log);
  });

  const hours = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-white">Journal d'Activité</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Audit trail complet • {extendedLogs.length} événements aujourd'hui
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Pointages", count: extendedLogs.filter((l) => l.action.includes("Pointage")).length, color: "text-blue-400" },
          { label: "Alertes", count: extendedLogs.filter((l) => l.entityType === "alert").length, color: "text-red-400" },
          { label: "Mises à jour zones", count: extendedLogs.filter((l) => l.entityType === "zone").length, color: "text-emerald-400" },
          { label: "Actions manuelles", count: extendedLogs.filter((l) => l.userId !== "system").length, color: "text-purple-400" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={cn("text-3xl font-bold", s.color)}>{s.count}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-400" />
            Événements par heure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-800" />
            <div className="flex flex-col gap-0">
              {hours.map((hour) => (
                <div key={hour} className="relative pl-14">
                  <div className="sticky top-0 py-2 z-10">
                    <span className="absolute left-0 flex items-center justify-center w-10 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 font-medium -translate-x-0">
                      {hour}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pb-4">
                    {grouped[hour].map((log, i) => {
                      const Icon = entityIcons[log.entityType as keyof typeof entityIcons] ?? Activity;
                      const colorClass = entityColors[log.entityType] ?? "bg-slate-700 text-slate-400 border-slate-700";
                      return (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 hover:border-slate-700 transition-colors"
                        >
                          <div className={cn("rounded-lg p-2 border flex-shrink-0", colorClass)}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-slate-200">{log.action}</p>
                              <span className="text-xs text-slate-600">—</span>
                              <p className="text-sm text-slate-400 truncate">{log.entityName}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs text-slate-600 capitalize">{log.entityType}</span>
                              <span className="text-xs text-slate-600">
                                Par: {log.userId === "system" ? "Système" : log.userId}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-600 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            {log.timestamp}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
