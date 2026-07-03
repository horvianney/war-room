"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MOCK_EMPLOYEES, MOCK_ALERTS, MOCK_ZONES, computeKPI } from "./mock-data";
import type { Employee, Alert, Zone, EmployeeStatus } from "./types";

export interface LiveEvent {
  id: string;
  message: string;
  type: "checkin" | "alert" | "zone" | "status";
  timestamp: string;
}

export interface ToastPayload {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

interface SimulationState {
  employees: Employee[];
  alerts: Alert[];
  zones: Zone[];
  events: LiveEvent[];
  kpi: ReturnType<typeof computeKPI>;
}

function now() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function makeEvent(message: string, type: LiveEvent["type"]): LiveEvent {
  return { id: Math.random().toString(36).slice(2), message, type, timestamp: now() };
}

const SIMULATION_INTERVAL_MS = 6000;

export function useSimulation(onToast: (t: ToastPayload) => void) {
  const [state, setState] = useState<SimulationState>(() => {
    const employees = [...MOCK_EMPLOYEES];
    return { employees, alerts: [...MOCK_ALERTS], zones: [...MOCK_ZONES], events: [], kpi: computeKPI(employees) };
  });

  const tickRef = useRef(0);

  const simulateEvent = useCallback(() => {
    tickRef.current += 1;
    const tick = tickRef.current;

    setState((prev) => {
      const employees = [...prev.employees];
      const alerts = [...prev.alerts];
      const zones = [...prev.zones];
      let newEvents: LiveEvent[] = [];
      let toast: ToastPayload | null = null;

      const scenario = tick % 7;

      if (scenario === 0 || scenario === 3) {
        const lateEmployees = employees.filter((e) => e.status === "late");
        if (lateEmployees.length > 0) {
          const idx = employees.findIndex((e) => e.id === lateEmployees[0].id);
          employees[idx] = {
            ...employees[idx],
            status: "present",
            checkInTime: now().slice(0, 5),
          };
          newEvents.push(makeEvent(`${employees[idx].name} vient de pointer`, "checkin"));
          toast = { type: "success", title: "Pointage enregistré", message: `${employees[idx].name} (${employees[idx].role}) — ${now().slice(0, 5)}` };
        }
      } else if (scenario === 1) {
        const absentEmployees = employees.filter((e) => e.status === "absent");
        if (absentEmployees.length > 0) {
          const idx = employees.findIndex((e) => e.id === absentEmployees[0].id);
          employees[idx] = { ...employees[idx], status: "late", checkInTime: undefined };
          newEvents.push(makeEvent(`Retard signalé : ${employees[idx].name}`, "status"));
          toast = { type: "warning", title: "Retard signalé", message: `${employees[idx].name} attendu depuis ${employees[idx].expectedTime}` };
        }
      } else if (scenario === 2) {
        const newAlert: Alert = {
          id: `a-sim-${tick}`,
          type: "understaffed",
          severity: "warning",
          message: `Zone à surveiller — ${zones[tick % zones.length].name}`,
          detail: `L'occupation de la zone ${zones[tick % zones.length].name} nécessite une attention.`,
          timestamp: now().slice(0, 5),
          acknowledged: false,
        };
        alerts.unshift(newAlert);
        newEvents.push(makeEvent(`Nouvelle alerte : ${zones[tick % zones.length].name}`, "alert"));
        toast = { type: "warning", title: "Alerte générée", message: newAlert.message };
      } else if (scenario === 4) {
        const zoneIdx = tick % zones.length;
        const delta = Math.random() > 0.5 ? 1 : -1;
        const updated = {
          ...zones[zoneIdx],
          current: Math.max(0, Math.min(zones[zoneIdx].capacity, zones[zoneIdx].current + delta)),
        };
        zones[zoneIdx] = updated;
        newEvents.push(makeEvent(`Zone ${updated.name} : ${updated.current}/${updated.capacity}`, "zone"));
      } else if (scenario === 5) {
        const presentIdx = employees.findIndex((e) => e.status === "present");
        if (presentIdx !== -1) {
          const delta = Math.floor(Math.random() * 5) - 2;
          employees[presentIdx] = {
            ...employees[presentIdx],
            performanceScore: Math.max(50, Math.min(100, employees[presentIdx].performanceScore + delta)),
          };
          newEvents.push(makeEvent(`Score mis à jour : ${employees[presentIdx].name}`, "status"));
        }
      } else if (scenario === 6) {
        const ackIdx = alerts.findIndex((a) => !a.acknowledged);
        if (ackIdx !== -1) {
          alerts[ackIdx] = { ...alerts[ackIdx], acknowledged: true };
          newEvents.push(makeEvent(`Alerte acquittée automatiquement`, "alert"));
          toast = { type: "info", title: "Alerte résolue", message: alerts[ackIdx].message };
        }
      }

      if (toast) onToast(toast);

      const allEvents = [...newEvents, ...prev.events].slice(0, 20);
      return {
        employees,
        alerts,
        zones,
        events: allEvents,
        kpi: computeKPI(employees),
      };
    });
  }, [onToast]);

  useEffect(() => {
    const interval = setInterval(simulateEvent, SIMULATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [simulateEvent]);

  const acknowledgeAlert = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    }));
  }, []);

  const triggerManual = useCallback(() => {
    simulateEvent();
  }, [simulateEvent]);

  return { state, acknowledgeAlert, triggerManual };
}
