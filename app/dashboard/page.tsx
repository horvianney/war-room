"use client";

import React, { useCallback } from "react";
import {
  UserCheck, UserX, Clock, Umbrella, TrendingUp, Percent, Zap,
} from "lucide-react";
import { KPICard } from "@/components/war-room/KPICard";
import { EmployeeGrid } from "@/components/war-room/EmployeeGrid";
import { AlertPanel } from "@/components/war-room/AlertPanel";
import { ZoneMap } from "@/components/war-room/ZoneMap";
import { AttendanceChart } from "@/components/war-room/AttendanceChart";
import { ActivityFeed } from "@/components/war-room/ActivityFeed";
import { LiveTicker } from "@/components/war-room/LiveTicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { MOCK_ATTENDANCE, MOCK_ACTIVITY } from "@/lib/mock-data";
import { useSimulation, type ToastPayload } from "@/lib/use-simulation";

export default function DashboardPage() {
  const { toast } = useToast();

  const handleToast = useCallback((t: ToastPayload) => {
    toast(t);
  }, [toast]);

  const { state, acknowledgeAlert, triggerManual } = useSimulation(handleToast);
  const { employees, alerts, zones, events, kpi } = state;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">War Room — Command Center RH</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Simulation temps réel active • {employees.length} employés suivis
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={triggerManual}
          className="flex-shrink-0"
        >
          <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
          Simuler événement
        </Button>
      </div>

      {events.length > 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2.5">
          <LiveTicker events={events} />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KPICard
          title="Présents"
          value={kpi.present}
          subtitle="sur poste actif"
          icon={UserCheck}
          color="green"
          trend={5}
          pulse
        />
        <KPICard
          title="En retard"
          value={kpi.late}
          subtitle="notification envoyée"
          icon={Clock}
          color="amber"
          pulse={kpi.late > 0}
        />
        <KPICard
          title="Absents"
          value={kpi.absent}
          subtitle="non justifié"
          icon={UserX}
          color="red"
          pulse={kpi.absent > 0}
        />
        <KPICard
          title="Congés"
          value={kpi.onLeave}
          subtitle="planifiés"
          icon={Umbrella}
          color="purple"
        />
        <KPICard
          title="Ponctualité"
          value={`${kpi.punctualityRate}%`}
          subtitle="ce mois"
          icon={Percent}
          color="blue"
          trend={2}
        />
        <KPICard
          title="Présence"
          value={`${kpi.presenceRate}%`}
          subtitle="taux brut"
          icon={TrendingUp}
          color={kpi.presenceRate >= 80 ? "green" : kpi.presenceRate >= 60 ? "amber" : "red"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Employés</CardTitle>
            </CardHeader>
            <CardContent className="pt-0" style={{ height: "520px" }}>
              <EmployeeGrid employees={employees} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="p-5">
              <AlertPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <ActivityFeed logs={MOCK_ACTIVITY} liveEvents={events} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <AttendanceChart data={MOCK_ATTENDANCE} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <ZoneMap zones={zones} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
