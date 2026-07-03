"use client";

import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_EMPLOYEES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const weeklyPresence = [
  { day: "Lun", present: 12, absent: 2, late: 1 },
  { day: "Mar", present: 13, absent: 1, late: 1 },
  { day: "Mer", present: 10, absent: 3, late: 2 },
  { day: "Jeu", present: 14, absent: 0, late: 1 },
  { day: "Ven", present: 11, absent: 2, late: 2 },
  { day: "Sam", present: 8, absent: 1, late: 0 },
  { day: "Dim", present: 5, absent: 0, late: 0 },
];

const monthlyTrend = [
  { month: "Jan", rate: 88 }, { month: "Fév", rate: 91 },
  { month: "Mar", rate: 87 }, { month: "Avr", rate: 93 },
  { month: "Mai", rate: 89 }, { month: "Jun", rate: 92 },
  { month: "Jul", rate: 90 },
];

const deptData = [
  { dept: "Cuisine", score: 89 },
  { dept: "Salle", score: 91 },
  { dept: "Bar", score: 84 },
  { dept: "Livraison", score: 83 },
  { dept: "Management", score: 97 },
  { dept: "Logistique", score: 92 },
];

const PIE_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const pieData = [
  { name: "Présents", value: 10 },
  { name: "En retard", value: 2 },
  { name: "Absents", value: 2 },
  { name: "Congés", value: 1 },
];

const radarData = [
  { metric: "Ponctualité", A: 88 },
  { metric: "Présence", A: 91 },
  { metric: "Performance", A: 87 },
  { metric: "Engagement", A: 79 },
  { metric: "Productivité", A: 85 },
  { metric: "Qualité", A: 93 },
];

const PERIODS = ["7 jours", "30 jours", "3 mois", "1 an"];

const tooltipStyle = {
  contentStyle: { backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" },
  labelStyle: { color: "#94a3b8", fontSize: 11 },
  itemStyle: { fontSize: 11 },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7 jours");

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Analytics RH</h1>
          <p className="text-sm text-slate-500 mt-0.5">Indicateurs de performance et tendances</p>
        </div>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-all",
                period === p
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-700 text-slate-400 hover:border-slate-600"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Taux de présence", value: "91%", sub: "+2% vs mois dernier", icon: Users, color: "text-emerald-400" },
          { label: "Ponctualité", value: "88%", sub: "Objectif : 90%", icon: Clock, color: "text-amber-400" },
          { label: "Score moyen", value: "87/100", sub: "Performance globale", icon: TrendingUp, color: "text-blue-400" },
          { label: "Heures sup. / sem", value: "24h", sub: "5 employés concernés", icon: BarChart3, color: "text-purple-400" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                  <p className={cn("text-2xl font-bold mt-1", kpi.color)}>{kpi.value}</p>
                  <p className="text-xs text-slate-600 mt-1">{kpi.sub}</p>
                </div>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Présences hebdomadaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyPresence} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Legend formatter={(v) => <span style={{ color: "#94a3b8", fontSize: 11 }}>{v}</span>} iconType="circle" iconSize={8} />
                <Bar dataKey="present" name="Présents" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" name="Retards" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absents" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition du jour</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mt-1">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                  <span className="text-xs text-slate-600 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tendance mensuelle (taux présence %)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="rate" name="Taux %" stroke="#3b82f6" strokeWidth={2} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance par département</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#475569", fontSize: 10 }} />
                <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classement des employés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {MOCK_EMPLOYEES
              .filter((e) => e.status !== "off_duty")
              .sort((a, b) => b.performanceScore - a.performanceScore)
              .slice(0, 8)
              .map((emp, i) => (
                <div key={emp.id} className="flex items-center gap-3 rounded-lg hover:bg-slate-800/40 px-2 py-1.5 transition-colors">
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    i === 0 ? "bg-amber-500 text-white" : i === 1 ? "bg-slate-400 text-white" : i === 2 ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400"
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-200 truncate">{emp.name}</span>
                      <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{emp.performanceScore}/100</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", emp.performanceScore >= 90 ? "bg-emerald-500" : emp.performanceScore >= 75 ? "bg-blue-500" : "bg-amber-500")}
                        style={{ width: `${emp.performanceScore}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 flex-shrink-0 w-20 text-right">{emp.department}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
