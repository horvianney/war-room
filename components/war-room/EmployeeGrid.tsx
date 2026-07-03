"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, MapPin, Star, Filter } from "lucide-react";
import type { Employee, Department, EmployeeStatus } from "@/lib/types";
import { EmployeeStatusBadge } from "./EmployeeStatusBadge";
import { cn } from "@/lib/utils";

interface Props {
  employees: Employee[];
}

const departmentColors: Record<Department, string> = {
  Cuisine: "text-orange-400",
  Salle: "text-emerald-400",
  Bar: "text-amber-400",
  Livraison: "text-blue-400",
  Management: "text-pink-400",
  Logistique: "text-slate-400",
};

const ALL_STATUSES: EmployeeStatus[] = ["present", "late", "absent", "on_leave", "off_duty"];
const STATUS_LABELS: Record<EmployeeStatus, string> = {
  present: "Présent",
  late: "Retard",
  absent: "Absent",
  on_leave: "Congé",
  off_duty: "Off",
};

const avatarColors = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-purple-600 to-purple-800",
  "from-orange-600 to-orange-800",
  "from-pink-600 to-pink-800",
  "from-cyan-600 to-cyan-800",
];

export function EmployeeGrid({ employees }: Props) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<EmployeeStatus | "all">("all");

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex gap-1">
            <button
              onClick={() => setFilterStatus("all")}
              className={cn("text-xs px-2.5 py-1 rounded-full border transition-all", filterStatus === "all" ? "bg-blue-600 border-blue-600 text-white" : "border-slate-700 text-slate-400 hover:border-slate-600")}
            >
              Tous ({employees.length})
            </button>
            {ALL_STATUSES.slice(0, 4).map((s) => {
              const count = employees.filter((e) => e.status === s).length;
              if (count === 0) return null;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
                  className={cn("text-xs px-2.5 py-1 rounded-full border transition-all", filterStatus === s ? "bg-blue-600 border-blue-600 text-white" : "border-slate-700 text-slate-400 hover:border-slate-600")}
                >
                  {STATUS_LABELS[s]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-1">
        <AnimatePresence>
          {filtered.map((emp, i) => (
            <motion.div
              key={emp.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-slate-700 hover:bg-slate-900 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl bg-gradient-to-br flex-shrink-0 flex items-center justify-center text-white text-sm font-bold",
                  avatarColors[i % avatarColors.length]
                )}>
                  {emp.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-sm font-semibold text-slate-100 truncate">{emp.name}</p>
                    <EmployeeStatusBadge status={emp.status} showDot={false} className="flex-shrink-0 text-[10px] py-0" />
                  </div>
                  <p className="text-xs text-slate-500 truncate">{emp.role}</p>
                  <p className={cn("text-xs font-medium mt-0.5", departmentColors[emp.department])}>{emp.department}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                {emp.zone && (
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <span className="text-xs text-slate-500 truncate">{emp.zone}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-slate-400">{emp.performanceScore}/100</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-600">
                    {emp.checkInTime ? (
                      <span className="text-emerald-400">✓ {emp.checkInTime}</span>
                    ) : emp.status === "absent" ? (
                      <span className="text-red-400">✗ Absent</span>
                    ) : emp.status === "on_leave" ? (
                      <span className="text-purple-400">🏖 Congé</span>
                    ) : emp.status === "off_duty" ? (
                      <span className="text-slate-500">— {emp.expectedTime}</span>
                    ) : (
                      <span className="text-amber-400">⚠ En route</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={`tel:${emp.phone}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors">
                  <Phone className="w-3 h-3" />
                  {emp.phone}
                </a>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 flex items-center justify-center py-12 text-slate-600"
            >
              Aucun résultat pour "{search}"
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
