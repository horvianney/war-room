"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Star, Phone, MapPin, ChevronRight, SlidersHorizontal } from "lucide-react";
import { MOCK_EMPLOYEES, MOCK_ZONES, computeKPI } from "@/lib/mock-data";
import { EmployeeStatusBadge } from "@/components/war-room/EmployeeStatusBadge";
import { AddEmployeeModal } from "@/components/war-room/AddEmployeeModal";
import { ExportDropdown } from "@/components/war-room/ExportDropdown";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Department, Employee } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const DEPARTMENTS: (Department | "Tous")[] = ["Tous", "Type a", "Type b", "Type c", "Type d", "Type e", "Type f"];

const deptColors: Record<Department, string> = {
  "Type a": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "Type b": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Type c": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Type d": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Type e": "text-pink-400 bg-pink-500/10 border-pink-500/20",
  "Type f": "text-slate-400 bg-slate-700/20 border-slate-700/30",
};

const scoreColor = (s: number) =>
  s >= 90 ? "bg-emerald-500" : s >= 75 ? "bg-blue-500" : s >= 60 ? "bg-amber-500" : "bg-red-500";

const avatarGradients = [
  "from-blue-600 to-blue-800", "from-emerald-600 to-emerald-800",
  "from-purple-600 to-purple-800", "from-orange-600 to-orange-800",
  "from-pink-600 to-pink-800", "from-cyan-600 to-cyan-800",
  "from-rose-600 to-rose-800", "from-teal-600 to-teal-800",
];

const ALL_ZONES = ["Toutes les zones", ...MOCK_ZONES.map((z) => z.name)] as const;

export default function EmployesPage() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [dept, setDept] = useState<Department | "Tous">("Tous");
  const [zone, setZone] = useState("Toutes les zones");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  function handleAdd(emp: Employee) {
    setEmployees((prev) => [emp, ...prev]);
  }

  const filtered = employees.filter((e) => {
    const matchDept = dept === "Tous" || e.department === dept;
    const matchZone = zone === "Toutes les zones" || e.zone === zone;
    const q = search.toLowerCase();
    const matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      (e.zone ?? "").toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q);
    return matchDept && matchZone && matchSearch;
  });

  const kpi = computeKPI(employees);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Gestion des Employés</h1>
          <p className="text-sm text-slate-500 mt-0.5">{employees.length} collaborateurs • {kpi.present} présents aujourd'hui</p>
        </div>
        <div className="flex gap-2">
          <ExportDropdown employees={filtered} />
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <UserPlus className="w-4 h-4 mr-1.5" /> Ajouter
          </Button>
        </div>
      </div>

      <AddEmployeeModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total", value: employees.length, color: "text-white" },
          { label: "Présents", value: kpi.present, color: "text-emerald-400" },
          { label: "Absents", value: kpi.absent, color: "text-red-400" },
          { label: "En congé", value: kpi.onLeave, color: "text-purple-400" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, rôle, zone, département..."
            className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              {ALL_ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {DEPARTMENTS.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-all",
                dept === d
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
              )}
            >
              {d}
            </button>
          ))}
        </div>
        {(zone !== "Toutes les zones" || dept !== "Tous" || search) && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</span>
            <button
              onClick={() => { setZone("Toutes les zones"); setDept("Tous"); setSearch(""); }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((emp, i) => (
          <motion.div
            key={emp.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link href={`/employes/${emp.id}`}>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-600 hover:bg-slate-900 transition-all group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex-shrink-0 flex items-center justify-center text-white font-bold text-sm",
                    avatarGradients[i % avatarGradients.length]
                  )}>
                    {emp.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-100 truncate">{emp.name}</p>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-sm text-slate-500">{emp.role}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border", deptColors[emp.department])}>
                        {emp.department}
                      </span>
                      <EmployeeStatusBadge status={emp.status} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500" /> Performance
                    </span>
                    <span className="text-slate-300 font-medium">{emp.performanceScore}/100</span>
                  </div>
                  <Progress value={emp.performanceScore} indicatorClassName={scoreColor(emp.performanceScore)} />
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  {emp.zone ? (
                    <button
                      onClick={(e) => { e.preventDefault(); setZone(zone === emp.zone ? "Toutes les zones" : emp.zone!); }}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-0.5 border transition-all",
                        zone === emp.zone
                          ? "bg-blue-600/20 border-blue-500/40 text-blue-400"
                          : "border-transparent hover:border-slate-700 hover:text-slate-300"
                      )}
                    >
                      <MapPin className="w-3 h-3" /> {emp.zone}
                    </button>
                  ) : (
                    <span>—</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {emp.shiftsThisWeek} shifts/sem
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
