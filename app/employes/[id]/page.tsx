"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Activity,
} from "lucide-react";
import { MOCK_EMPLOYEES } from "@/lib/mock-data";
import { EmployeeStatusBadge } from "@/components/war-room/EmployeeStatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const mockWeekAttendance = [true, true, false, true, true, false, false];

const scoreColor = (s: number) =>
  s >= 90 ? "bg-emerald-500" : s >= 75 ? "bg-blue-500" : s >= 60 ? "bg-amber-500" : "bg-red-500";

const avatarGradients = [
  "from-blue-600 to-blue-800", "from-emerald-600 to-emerald-800",
  "from-purple-600 to-purple-800", "from-orange-600 to-orange-800",
  "from-pink-600 to-pink-800", "from-cyan-600 to-cyan-800",
  "from-rose-600 to-rose-800", "from-teal-600 to-teal-800",
];

const mockStats = [
  { label: "Jours travaillés (mois)", value: 18, max: 22, unit: "j" },
  { label: "Retards ce mois", value: 2, max: 10, unit: "×" },
  { label: "Absences ce mois", value: 1, max: 5, unit: "j" },
  { label: "Heures sup. hebdo", value: 3.5, max: 10, unit: "h" },
];

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const empIndex = MOCK_EMPLOYEES.findIndex((e) => e.id === id);
  const emp = MOCK_EMPLOYEES[empIndex];

  if (!emp) {
    return (
      <div className="p-6 flex items-center justify-center min-h-64 text-slate-500">
        Employé introuvable.
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">Fiche Employé</h1>
          <p className="text-sm text-slate-500">Détails et KPIs individuels</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className={cn(
            "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold flex-shrink-0",
            avatarGradients[empIndex % avatarGradients.length]
          )}>
            {emp.initials}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{emp.name}</h2>
              <EmployeeStatusBadge status={emp.status} />
            </div>
            <p className="text-slate-400 mt-1">{emp.role} • {emp.department}</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Phone className="w-4 h-4" /> {emp.phone}
              </span>
              {emp.zone && (
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" /> {emp.zone}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock className="w-4 h-4" /> Prise de poste : {emp.expectedTime}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={emp.performanceScore >= 90 ? "#10b981" : emp.performanceScore >= 75 ? "#3b82f6" : "#f59e0b"}
                  strokeWidth="3"
                  strokeDasharray={`${emp.performanceScore} ${100 - emp.performanceScore}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                {emp.performanceScore}
              </span>
            </div>
            <p className="text-xs text-slate-500">Score</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {mockStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-white">{stat.value}<span className="text-sm text-slate-500 ml-1">{stat.unit}</span></p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                <Progress value={(stat.value / stat.max) * 100} className="mt-2 h-1" indicatorClassName="bg-blue-500" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              Présence cette semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {weekDays.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2 flex-1">
                  <p className="text-xs text-slate-500">{day}</p>
                  <div className={cn(
                    "w-full h-10 rounded-lg flex items-center justify-center text-xs font-medium",
                    i >= emp.shiftsThisWeek
                      ? "bg-slate-800 text-slate-600"
                      : mockWeekAttendance[i]
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/20 border border-red-500/30 text-red-400"
                  )}>
                    {i >= emp.shiftsThisWeek ? "—" : mockWeekAttendance[i] ? "✓" : "✗"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-400" />
              Historique récent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { date: "Auj.", action: "Pointage 08:02", type: "success" },
                { date: "Hier", action: "Pointage 08:15 (+15 min)", type: "warning" },
                { date: "Mar.", action: "Journée complète", type: "success" },
                { date: "Lun.", action: "Absence signalée", type: "error" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    item.type === "success" ? "bg-emerald-400" : item.type === "warning" ? "bg-amber-400" : "bg-red-400"
                  )} />
                  <span className="text-xs text-slate-500 w-8 flex-shrink-0">{item.date}</span>
                  <span className="text-xs text-slate-300">{item.action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              Évolution Performance (6 mois)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1.5 h-20">
              {[72, 78, 81, 85, 88, emp.performanceScore].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={cn("w-full rounded-t-sm transition-all", scoreColor(v))}
                    style={{ height: `${(v / 100) * 80}px` }}
                  />
                  <span className="text-[9px] text-slate-600">M{i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400" />
              Compétences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { skill: "Ponctualité", value: 80 },
                { skill: "Productivité", value: emp.performanceScore },
                { skill: "Travail d'équipe", value: 92 },
                { skill: "Initiative", value: 75 },
              ].map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{s.skill}</span>
                    <span className="text-slate-300 font-medium">{s.value}%</span>
                  </div>
                  <Progress value={s.value} indicatorClassName={scoreColor(s.value)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
