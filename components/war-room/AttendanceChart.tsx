"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { AttendancePoint } from "@/lib/types";
import { TrendingUp } from "lucide-react";

interface Props {
  data: AttendancePoint[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-xs font-semibold" style={{ color: entry.color }}>
            {entry.name}: <span className="text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AttendanceChart({ data }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-semibold text-slate-200">Présences du Jour</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gradPresent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="hour" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span style={{ color: "#94a3b8", fontSize: 11 }}>{value}</span>}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="expected"
            name="Prévu"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="url(#gradExpected)"
          />
          <Area
            type="monotone"
            dataKey="present"
            name="Présents"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#gradPresent)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
