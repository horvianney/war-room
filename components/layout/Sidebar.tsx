"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Bell,
  MapPin,
  BarChart3,
  Settings,
  Shield,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "War Room", icon: LayoutDashboard },
  { href: "/employes", label: "Employés", icon: Users },
  { href: "/alertes", label: "Alertes", icon: Bell },
  { href: "/zones", label: "Zones", icon: MapPin },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/activite", label: "Activité", icon: Activity },
];

const BOTTOM_ITEMS = [
  { href: "/securite", label: "Sécurité", icon: Shield },
  { href: "/parametres", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 lg:w-56 flex-shrink-0 bg-slate-950 border-r border-slate-800/50 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-3 px-3 lg:px-5 h-16 border-b border-slate-800/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-bold text-white leading-none">War Room</p>
          <p className="text-xs text-slate-500 leading-none mt-0.5">RH Command Center</p>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                  : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-slate-800/50 flex flex-col gap-0.5">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-300 hover:bg-slate-800/60 transition-all"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}

        <div className="hidden lg:flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-slate-900">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            KF
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Kafui Amétépé</p>
            <p className="text-xs text-slate-600 truncate">Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
