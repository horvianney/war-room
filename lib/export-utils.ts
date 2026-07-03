"use client";

import type { Employee } from "./types";

const STATUS_LABELS: Record<string, string> = {
  present: "Présent",
  late: "En retard",
  absent: "Absent",
  on_leave: "Congé",
  off_duty: "Hors service",
};

function buildRows(employees: Employee[]) {
  return employees.map((e) => ({
    Nom: e.name,
    Rôle: e.role,
    Département: e.department,
    Zone: e.zone ?? "—",
    Statut: STATUS_LABELS[e.status] ?? e.status,
    Téléphone: e.phone,
    "Heure prévue": e.expectedTime,
    "Heure pointage": e.checkInTime ?? "—",
    "Score performance": e.performanceScore,
    "Shifts / semaine": e.shiftsThisWeek,
  }));
}

export async function exportToXLSX(employees: Employee[], filename = "employes") {
  const XLSX = await import("xlsx");
  const rows = buildRows(employees);
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employés");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

export async function exportToCSV(employees: Employee[], filename = "employes") {
  const XLSX = await import("xlsx");
  const rows = buildRows(employees);
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportToXLS(employees: Employee[], filename = "employes") {
  const XLSX = await import("xlsx");
  const rows = buildRows(employees);
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employés");
  XLSX.writeFile(wb, `${filename}.xls`, { bookType: "xls" });
}

export async function exportToODS(employees: Employee[], filename = "employes") {
  const XLSX = await import("xlsx");
  const rows = buildRows(employees);
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employés");
  XLSX.writeFile(wb, `${filename}.ods`, { bookType: "ods" });
}

export async function exportToPDF(employees: Employee[], filename = "employes") {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text("Rapport Employés — War Room RH", 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Exporté le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}`, 14, 23);

  autoTable(doc, {
    startY: 28,
    head: [["Nom", "Rôle", "Département", "Zone", "Statut", "Téléphone", "Score"]],
    body: employees.map((e) => [
      e.name,
      e.role,
      e.department,
      e.zone ?? "—",
      STATUS_LABELS[e.status] ?? e.status,
      e.phone,
      `${e.performanceScore}/100`,
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: { 6: { halign: "center" } },
  });

  doc.save(`${filename}.pdf`);
}
