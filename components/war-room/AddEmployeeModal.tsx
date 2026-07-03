"use client";

import React, { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_ZONES } from "@/lib/mock-data";
import type { Employee, Department } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

const DEPARTMENTS: Department[] = ["Cuisine", "Salle", "Bar", "Livraison", "Management", "Logistique"];

const deptColors: Record<Department, string> = {
  Cuisine: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  Salle: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  Bar: "border-amber-500/50 bg-amber-500/10 text-amber-400",
  Livraison: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  Management: "border-pink-500/50 bg-pink-500/10 text-pink-400",
  Logistique: "border-slate-500/50 bg-slate-700/20 text-slate-400",
};

interface FormState {
  name: string;
  role: string;
  department: Department;
  zone: string;
  phone: string;
  expectedTime: string;
  performanceScore: string;
}

interface Errors {
  name?: string;
  role?: string;
  phone?: string;
  expectedTime?: string;
}

const INITIAL: FormState = {
  name: "",
  role: "",
  department: "Cuisine",
  zone: "",
  phone: "+228 ",
  expectedTime: "08:00",
  performanceScore: "80",
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export function AddEmployeeModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Le nom est requis";
    if (!form.role.trim()) e.role = "Le rôle est requis";
    if (!form.phone.trim() || form.phone.trim().length < 8) e.phone = "Numéro invalide";
    if (!form.expectedTime) e.expectedTime = "L'heure est requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const newEmployee: Employee = {
        id: `e-${Date.now()}`,
        name: form.name.trim(),
        role: form.role.trim(),
        department: form.department,
        zone: form.zone || undefined,
        phone: form.phone.trim(),
        expectedTime: form.expectedTime,
        status: "off_duty",
        initials: getInitials(form.name),
        performanceScore: Math.max(0, Math.min(100, parseInt(form.performanceScore) || 80)),
        shiftsThisWeek: 0,
      };
      onAdd(newEmployee);
      setForm(INITIAL);
      setErrors({});
      setLoading(false);
      onClose();
    }, 600);
  }

  function handleClose() {
    setForm(INITIAL);
    setErrors({});
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-400" />
            Ajouter un employé
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du nouveau collaborateur.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 flex flex-col gap-4">

            <Input
              label="Nom complet"
              placeholder="ex : Kofi Mensah"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Rôle / Poste"
              placeholder="ex : Chef de Cuisine"
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              error={errors.role}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Département <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set("department", d)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full border transition-all",
                      form.department === d
                        ? deptColors[d]
                        : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Zone d'affectation
              </label>
              <select
                value={form.zone}
                onChange={(e) => set("zone", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">— Non assigné —</option>
                {MOCK_ZONES.map((z) => (
                  <option key={z.id} value={z.name}>
                    {z.icon} {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Téléphone"
                placeholder="+228 90 00 00 00"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors.phone}
                required
              />
              <Input
                label="Heure prévue"
                type="time"
                value={form.expectedTime}
                onChange={(e) => set("expectedTime", e.target.value)}
                error={errors.expectedTime}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Score de performance initial
                <span className="ml-2 text-blue-400 font-bold">{form.performanceScore}/100</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.performanceScore}
                onChange={(e) => set("performanceScore", e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>0 — Débutant</span>
                <span>100 — Expert</span>
              </div>
            </div>

          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement...</>
              ) : (
                <><UserPlus className="w-4 h-4 mr-2" /> Enregistrer</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
