import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        present: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        late: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        absent: "bg-red-500/20 text-red-400 border border-red-500/30",
        on_leave: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
        off_duty: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
        critical: "bg-red-500/20 text-red-400 border border-red-500/30",
        warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        default: "bg-slate-700 text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
