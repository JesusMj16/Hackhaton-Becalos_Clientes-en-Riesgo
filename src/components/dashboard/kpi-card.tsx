import { cn } from "@/lib/utils";
import type { KpiCardProps } from "@/types/components";

export function KpiCard({
  label,
  value,
  valueClassName = "text-white",
  icon,
  iconBgClassName,
  iconColorClassName,
  trend,
}: KpiCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-[#131b2e] p-6 transition-all duration-300 hover:bg-[#171f33]">
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconBgClassName,
            iconColorClassName,
          )}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-5">
        <span
          className={cn("font-heading text-4xl font-black", valueClassName)}
        >
          {value}
        </span>
        {trend && (
          <p
            className={cn(
              "mt-1 flex items-center gap-4 text-xs font-medium bg-gray-800/50 rounded p-2",
              trend.className,
            )}
          >
            {trend.label}
          </p>
        )}
      </div>
    </div>
  );
}
