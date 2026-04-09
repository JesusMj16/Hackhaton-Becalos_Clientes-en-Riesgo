import { cn } from '@/lib/utils';
import type { RiskDistributionCardProps, LegendDotProps } from '@/types/components';

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getStrokeDashoffset(percentage: number) {
  return CIRCUMFERENCE * (1 - percentage);
}

export function RiskDistributionCard({ healthy, watching, critical }: RiskDistributionCardProps) {
  const total = healthy + watching + critical;
  const healthyPct = total > 0 ? healthy / total : 0;
  const watchingPct = total > 0 ? watching / total : 0;
  const criticalPct = total > 0 ? critical / total : 0;

  return (
    <div className="flex flex-col rounded-xl bg-[#131b2e] p-6">
      <span className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        Distribución de Riesgo
      </span>
      <div className="relative flex h-32 items-center justify-center">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={RADIUS} fill="transparent" stroke="#2d3449" strokeWidth="12" />
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="transparent" stroke="#4ae176" strokeWidth="12"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={getStrokeDashoffset(healthyPct)}
          />
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="transparent" stroke="#f59e0b" strokeWidth="12"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={getStrokeDashoffset(watchingPct)}
          />
          <circle
            cx="48" cy="48" r={RADIUS}
            fill="transparent" stroke="#ef4444" strokeWidth="12"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={getStrokeDashoffset(criticalPct)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-white">{total}</span>
          <span className="text-[8px] uppercase tracking-tighter text-slate-500">Total</span>
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <LegendDot color="bg-[#4ae176]" count={healthy} />
        <LegendDot color="bg-amber-500" count={watching} />
        <LegendDot color="bg-red-500" count={critical} />
      </div>
    </div>
  );
}

function LegendDot({ color, count }: LegendDotProps) {
  return (
    <div className="flex items-center gap-1">
      <div className={cn('h-2 w-2 rounded-full', color)} />
      <span className="text-[10px] text-slate-400">{count}</span>
    </div>
  );
}
