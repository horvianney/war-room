"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { MOCK_ZONES, MOCK_EMPLOYEES } from "@/lib/mock-data";
import { EmployeeStatusBadge } from "@/components/war-room/EmployeeStatusBadge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getOccupancyClass(ratio: number) {
  if (ratio >= 0.9) return { bar: "bg-red-500", text: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10", label: "Saturé" };
  if (ratio >= 0.7) return { bar: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", label: "Chargé" };
  if (ratio >= 0.3) return { bar: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", label: "Normal" };
  return { bar: "bg-blue-500", text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", label: "Creux" };
}

export default function ZonesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedZone = MOCK_ZONES.find((z) => z.id === selected);
  const zoneEmployees = selectedZone
    ? MOCK_EMPLOYEES.filter((e) => selectedZone.employees.includes(e.id))
    : [];

  const totalCapacity = MOCK_ZONES.reduce((s, z) => s + z.capacity, 0);
  const totalCurrent = MOCK_ZONES.reduce((s, z) => s + z.current, 0);
  const saturated = MOCK_ZONES.filter((z) => z.current / z.capacity >= 0.9).length;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-white">Gestion des Zones</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {MOCK_ZONES.length} zones • {totalCurrent}/{totalCapacity} postes occupés
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Occupation globale", value: `${Math.round((totalCurrent / totalCapacity) * 100)}%`, icon: TrendingUp, color: "text-blue-400" },
          { label: "Zones saturées", value: saturated, icon: AlertTriangle, color: saturated > 0 ? "text-red-400" : "text-emerald-400" },
          { label: "Employés actifs", value: totalCurrent, icon: Users, color: "text-emerald-400" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <stat.icon className={cn("w-8 h-8", stat.color)} />
              <div>
                <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_ZONES.map((zone, i) => {
            const ratio = zone.current / zone.capacity;
            const cfg = getOccupancyClass(ratio);
            const isSelected = selected === zone.id;
            return (
              <motion.button
                key={zone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(isSelected ? null : zone.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all hover:scale-[1.01]",
                  isSelected
                    ? cn("border-blue-500/50 bg-blue-500/10")
                    : cn("border-slate-800 bg-slate-900/60 hover:border-slate-700")
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{zone.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-100 text-sm">{zone.name}</p>
                      <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded border", cfg.bg, cfg.text, cfg.border)}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-xl font-bold tabular-nums", cfg.text)}>
                      {zone.current}
                    </p>
                    <p className="text-xs text-slate-600">/{zone.capacity}</p>
                  </div>
                </div>
                <Progress value={ratio * 100} indicatorClassName={cfg.bar} />
                <p className="text-xs text-slate-600 mt-1.5">{Math.round(ratio * 100)}% de capacité</p>
              </motion.button>
            );
          })}
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                {selectedZone ? `Zone : ${selectedZone.name}` : "Sélectionner une zone"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedZone && (
                <p className="text-sm text-slate-600 text-center py-8">
                  Cliquez sur une zone pour voir les détails
                </p>
              )}
              {selectedZone && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xl font-bold text-white">{selectedZone.current}</p>
                      <p className="text-xs text-slate-500">Présents</p>
                    </div>
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xl font-bold text-slate-400">{selectedZone.capacity - selectedZone.current}</p>
                      <p className="text-xs text-slate-500">Disponibles</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Employés sur zone</p>
                    <div className="flex flex-col gap-2">
                      {zoneEmployees.length === 0 && (
                        <p className="text-xs text-slate-600">Aucun employé assigné</p>
                      )}
                      {zoneEmployees.map((emp) => (
                        <div key={emp.id} className="flex items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2">
                          <div>
                            <p className="text-xs font-medium text-slate-200">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.role}</p>
                          </div>
                          <EmployeeStatusBadge status={emp.status} showDot />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
