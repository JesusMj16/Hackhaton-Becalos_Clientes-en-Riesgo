import { cn } from '@/lib/utils';
import type { HorizontalMetricsProps } from '@/types/components';
import { RISK_TEXT_CLASS, RISK_BORDER_CLASS } from '@/constants/risk';

export function HorizontalMetrics({ metrics, riskLevel }: HorizontalMetricsProps) {
  const textClass = RISK_TEXT_CLASS[riskLevel];
  const borderClass = RISK_BORDER_CLASS[riskLevel];

  return (
    <div className="mb-8 overflow-x-auto custom-scrollbar">
      <div className="flex min-w-[640px] gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={cn(
              'flex-1 rounded-xl border-b-2 bg-[#222a3d]/40 p-6',
              borderClass,
            )}
          >
            <div className="mb-4 flex items-start justify-between">
              <span className={cn('material-symbols-outlined text-2xl', textClass)}>
                {metric.icon}
              </span>
              <span className={cn('text-xs font-bold', textClass)}>
                +{metric.points} pt{metric.points !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="font-heading mb-1 text-2xl font-black text-white">{metric.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
