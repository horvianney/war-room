"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function RealTimeClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right">
      <p className="text-2xl font-bold tabular-nums text-white tracking-tight">
        {format(now, "HH:mm:ss")}
      </p>
      <p className="text-xs text-slate-500 capitalize">
        {format(now, "EEEE d MMMM yyyy", { locale: fr })}
      </p>
    </div>
  );
}
