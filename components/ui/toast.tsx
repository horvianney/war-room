"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const toastConfig: Record<ToastType, { icon: typeof CheckCircle; bg: string; border: string; icon_color: string }> = {
  success: { icon: CheckCircle, bg: "bg-emerald-950", border: "border-emerald-500/40", icon_color: "text-emerald-400" },
  error: { icon: AlertCircle, bg: "bg-red-950", border: "border-red-500/40", icon_color: "text-red-400" },
  warning: { icon: AlertTriangle, bg: "bg-amber-950", border: "border-amber-500/40", icon_color: "text-amber-400" },
  info: { icon: Info, bg: "bg-blue-950", border: "border-blue-500/40", icon_color: "text-blue-400" },
};

function Toast({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const cfg = toastConfig[item.type];
  const Icon = cfg.icon;

  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl min-w-[280px] max-w-sm",
        cfg.bg, cfg.border
      )}
    >
      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", cfg.icon_color)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{item.title}</p>
        {item.message && <p className="text-xs text-slate-400 mt-0.5">{item.message}</p>}
      </div>
      <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev.slice(-4), { ...t, id }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <Toast item={t} onClose={() => remove(t.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
