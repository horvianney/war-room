import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {label} {props.required && <span className="text-red-400">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-lg border bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600",
            "border-slate-700 focus:border-blue-500 focus:outline-none transition-colors",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
