import type { Employee, Zone, Alert, AttendancePoint, ActivityLog } from "./types";

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "e1",  name: "Akossiwa Mensah",    role: "Chef de Cuisine",          department: "Cuisine",     status: "present",  initials: "AK", checkInTime: "08:02", expectedTime: "08:00", zone: "Lomé-Tokoin",   phone: "+228 90 12 34 56", performanceScore: 94, shiftsThisWeek: 4 },
  { id: "e2",  name: "Kokou Agbéko",       role: "Sous-Chef",                department: "Cuisine",     status: "late",     initials: "KA", expectedTime: "08:00",                        zone: "Adidogomé",     phone: "+228 91 23 45 67", performanceScore: 87, shiftsThisWeek: 3 },
  { id: "e3",  name: "Afi Dossou",         role: "Serveuse",                 department: "Salle",       status: "present",  initials: "AD", checkInTime: "09:55", expectedTime: "10:00", zone: "Bé Kpota",      phone: "+228 92 34 56 78", performanceScore: 91, shiftsThisWeek: 5 },
  { id: "e4",  name: "Kwame Adjovi",       role: "Barman",                   department: "Bar",         status: "present",  initials: "KW", checkInTime: "11:00", expectedTime: "11:00", zone: "Kodjoviakopé",  phone: "+228 93 45 67 89", performanceScore: 89, shiftsThisWeek: 4 },
  { id: "e5",  name: "Eyram Togbé",        role: "Serveuse",                 department: "Salle",       status: "absent",   initials: "ET", expectedTime: "10:00",                        phone: "+228 94 56 78 90", performanceScore: 76, shiftsThisWeek: 2 },
  { id: "e6",  name: "Mawuli Attivor",     role: "Livreur",                  department: "Livraison",   status: "present",  initials: "MA", checkInTime: "09:30", expectedTime: "09:30", zone: "Agoè-Nyivé",    phone: "+228 95 67 89 01", performanceScore: 82, shiftsThisWeek: 5 },
  { id: "e7",  name: "Kafui Amétépé",      role: "Manager",                  department: "Management",  status: "present",  initials: "KF", checkInTime: "07:58", expectedTime: "08:00", zone: "Kara",          phone: "+228 96 78 90 12", performanceScore: 97, shiftsThisWeek: 5 },
  { id: "e8",  name: "Kossi Kpogo",        role: "Cuisinier",                department: "Cuisine",     status: "on_leave", initials: "KK", expectedTime: "08:00",                        phone: "+228 97 89 01 23", performanceScore: 83, shiftsThisWeek: 0 },
  { id: "e9",  name: "Yawa Abalo",         role: "Hôtesse",                  department: "Salle",       status: "present",  initials: "YA", checkInTime: "09:48", expectedTime: "10:00", zone: "Hédzranawoé",   phone: "+228 98 90 12 34", performanceScore: 95, shiftsThisWeek: 4 },
  { id: "e10", name: "Elikplim Klutse",    role: "Barista",                  department: "Bar",         status: "late",     initials: "EK", expectedTime: "09:00",                        phone: "+228 99 01 23 45", performanceScore: 78, shiftsThisWeek: 3 },
  { id: "e11", name: "Sena Tsatsu",        role: "Cuisinière",               department: "Cuisine",     status: "present",  initials: "ST", checkInTime: "07:55", expectedTime: "08:00", zone: "Kpalimé",       phone: "+228 90 11 22 33", performanceScore: 90, shiftsThisWeek: 4 },
  { id: "e12", name: "Dela Fiagbedzi",     role: "Livreur",                  department: "Livraison",   status: "off_duty", initials: "DF", expectedTime: "14:00",                        phone: "+228 91 22 33 44", performanceScore: 85, shiftsThisWeek: 2 },
  { id: "e13", name: "Ama Honu",           role: "Serveuse",                 department: "Salle",       status: "present",  initials: "AH", checkInTime: "10:02", expectedTime: "10:00", zone: "Nyékonakpoè",   phone: "+228 92 33 44 55", performanceScore: 88, shiftsThisWeek: 4 },
  { id: "e14", name: "Komi Koffi",         role: "Plongeur",                 department: "Cuisine",     status: "absent",   initials: "KO", expectedTime: "08:00",                        phone: "+228 93 44 55 66", performanceScore: 71, shiftsThisWeek: 1 },
  { id: "e15", name: "Akoua Amegan",       role: "Responsable Logistique",   department: "Logistique",  status: "present",  initials: "AA", checkInTime: "08:15", expectedTime: "08:15", zone: "Sokodé",        phone: "+228 94 55 66 77", performanceScore: 92, shiftsThisWeek: 5 },
];

export const MOCK_ZONES: Zone[] = [
  { id: "z1",  name: "Lomé-Tokoin",   capacity: 5, current: 3, color: "#ef4444", icon: "🔥", employees: ["e1", "e11"] },
  { id: "z2",  name: "Adidogomé",     capacity: 3, current: 1, color: "#3b82f6", icon: "❄️", employees: ["e2"] },
  { id: "z3",  name: "Bé Kpota",      capacity: 8, current: 5, color: "#10b981", icon: "🍽️", employees: ["e3", "e13"] },
  { id: "z4",  name: "Kodjoviakopé",  capacity: 3, current: 2, color: "#f59e0b", icon: "🍹", employees: ["e4"] },
  { id: "z5",  name: "Nyékonakpoè",   capacity: 4, current: 2, color: "#8b5cf6", icon: "☀️", employees: ["e13"] },
  { id: "z6",  name: "Hédzranawoé",   capacity: 2, current: 1, color: "#06b6d4", icon: "👋", employees: ["e9"] },
  { id: "z7",  name: "Agoè-Nyivé",    capacity: 4, current: 1, color: "#f97316", icon: "🚚", employees: ["e6"] },
  { id: "z8",  name: "Kara",          capacity: 3, current: 1, color: "#ec4899", icon: "💼", employees: ["e7"] },
  { id: "z9",  name: "Sokodé",        capacity: 3, current: 1, color: "#6b7280", icon: "📦", employees: ["e15"] },
  { id: "z10", name: "Kpalimé",       capacity: 2, current: 1, color: "#f59e0b", icon: "🧁", employees: ["e11"] },
];

export const MOCK_ALERTS: Alert[] = [
  { id: "a1", type: "absence", severity: "critical", message: "2 absences non justifiées", detail: "Eyram Togbé et Komi Koffi sont absents sans notification.", timestamp: "08:05", acknowledged: false },
  { id: "a2", type: "late", severity: "warning", message: "Retard détecté : Kokou Agbéko", detail: "Kokou Agbéko (Sous-Chef) attendu à 08:00. Retard actuel : +45 min.", timestamp: "08:47", acknowledged: false, employeeId: "e2" },
  { id: "a3", type: "late", severity: "warning", message: "Retard détecté : Elikplim Klutse", detail: "Elikplim Klutse (Barista) attendu à 09:00. Toujours absent.", timestamp: "09:15", acknowledged: false, employeeId: "e10" },
  { id: "a4", type: "understaffed", severity: "critical", message: "Adidogomé sous-effectif", detail: "Seulement 1/3 postes couverts. Service du midi à risque.", timestamp: "09:30", acknowledged: false, zoneId: "z2" },
  { id: "a5", type: "overload", severity: "warning", message: "Nyékonakpoè proche saturation", detail: "2/4 postes occupés mais affluence prévue à 12h30.", timestamp: "10:00", acknowledged: true, zoneId: "z5" },
];

export const MOCK_ATTENDANCE: AttendancePoint[] = [
  { hour: "07h", present: 2, expected: 3 },
  { hour: "08h", present: 6, expected: 8 },
  { hour: "09h", present: 8, expected: 10 },
  { hour: "10h", present: 10, expected: 12 },
  { hour: "11h", present: 11, expected: 12 },
  { hour: "12h", present: 11, expected: 13 },
  { hour: "13h", present: 10, expected: 13 },
  { hour: "14h", present: 9, expected: 11 },
  { hour: "15h", present: 8, expected: 10 },
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: "l1", action: "Pointage arrivée", entityType: "employee", entityId: "e1",  entityName: "Akossiwa Mensah",  userId: "system", timestamp: "08:02" },
  { id: "l2", action: "Alerte générée",   entityType: "alert",    entityId: "a1",  entityName: "Absence non justifiée", userId: "system", timestamp: "08:05" },
  { id: "l3", action: "Pointage arrivée", entityType: "employee", entityId: "e3",  entityName: "Afi Dossou",       userId: "system", timestamp: "09:55" },
  { id: "l4", action: "Zone mise à jour", entityType: "zone",     entityId: "z2",  entityName: "Adidogomé",        userId: "e7",     timestamp: "09:30" },
  { id: "l5", action: "Alerte acquittée", entityType: "alert",    entityId: "a5",  entityName: "Nyékonakpoè saturation", userId: "e7", timestamp: "10:02" },
  { id: "l6", action: "Pointage arrivée", entityType: "employee", entityId: "e9",  entityName: "Yawa Abalo",       userId: "system", timestamp: "09:48" },
];

export function computeKPI(employees: Employee[]) {
  const active = employees.filter((e) => e.status !== "off_duty");
  const present = active.filter((e) => e.status === "present").length;
  const late = active.filter((e) => e.status === "late").length;
  const absent = active.filter((e) => e.status === "absent").length;
  const onLeave = active.filter((e) => e.status === "on_leave").length;
  const total = active.length;
  const punctualityRate = total > 0 ? Math.round(((present) / (present + late + absent)) * 100) : 0;
  const presenceRate = total > 0 ? Math.round(((present + late) / (total - onLeave)) * 100) : 0;
  return { present, late, absent, onLeave, total, punctualityRate, presenceRate };
}
