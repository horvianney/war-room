"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, Table, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Employee } from "@/lib/types";
import { exportToXLSX, exportToXLS, exportToCSV, exportToODS, exportToPDF } from "@/lib/export-utils";

interface Props {
  employees: Employee[];
}

const FORMATS = [
  {
    id: "xlsx",
    label: "Excel (.xlsx)",
    desc: "Format Excel moderne",
    icon: FileSpreadsheet,
    color: "text-emerald-400",
    fn: exportToXLSX,
  },
  {
    id: "xls",
    label: "Excel 97-2003 (.xls)",
    desc: "Compatibilité maximale",
    icon: FileSpreadsheet,
    color: "text-emerald-300",
    fn: exportToXLS,
  },
  {
    id: "csv",
    label: "CSV (.csv)",
    desc: "Tableur universel",
    icon: Table,
    color: "text-blue-400",
    fn: exportToCSV,
  },
  {
    id: "ods",
    label: "LibreOffice (.ods)",
    desc: "Format open source",
    icon: FileSpreadsheet,
    color: "text-amber-400",
    fn: exportToODS,
  },
  {
    id: "pdf",
    label: "PDF (.pdf)",
    desc: "Rapport imprimable",
    icon: FileText,
    color: "text-red-400",
    fn: exportToPDF,
  },
] as const;

export function ExportDropdown({ employees }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleExport(format: (typeof FORMATS)[number]) {
    if (loading) return;
    setLoading(format.id);
    setOpen(false);
    try {
      await format.fn(employees, "employes-war-room-rh");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-all",
          "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800",
          open && "border-blue-500/50 text-blue-400"
        )}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Exporter
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-800">
              <p className="text-xs text-slate-500 font-medium">
                {employees.length} employé{employees.length > 1 ? "s" : ""} à exporter
              </p>
            </div>
            <div className="p-1.5 flex flex-col gap-0.5">
              {FORMATS.map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => handleExport(fmt)}
                    disabled={!!loading}
                    className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    <Icon className={cn("w-4 h-4 flex-shrink-0", fmt.color)} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200">{fmt.label}</p>
                      <p className="text-xs text-slate-600">{fmt.desc}</p>
                    </div>
                    {loading === fmt.id && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400 ml-auto flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
