import { cn } from '@/lib/utils';
import type { MetricCardProps, TotalScoreCardProps } from '@/types/components';
import { RISK_BORDER_CLASS, RISK_BG_CLASS, RISK_TEXT_CLASS, RISK_RING_CLASS, RISK_POINTS_CLASS } from '@/constants/risk';

export function MetricCard({ metric, riskLevel }: MetricCardProps) {
  const borderClass = RISK_BORDER_CLASS[riskLevel];
  const bgClass = RISK_BG_CLASS[riskLevel];
  const textClass = RISK_TEXT_CLASS[riskLevel];
  const pointsClass = RISK_POINTS_CLASS[riskLevel];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border-l-4 bg-[#131b2e] p-5',
        borderClass,
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {metric.label}
        </p>
        <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold', pointsClass)}>
          {metric.points}pts
        </span>
      </div>
      <p className="font-heading text-3xl font-extrabold text-white">{metric.value}</p>
      <MetricVisual metric={metric} bgClass={bgClass} textClass={textClass} />
    </div>
  );
}

function MetricVisual({
  metric,
  bgClass,
  textClass,
}: {
  metric: MetricCardProps['metric'];
  bgClass: string;
  textClass: string;
}) {
  if (metric.displayType === 'progress' && metric.progressPercent !== undefined) {
    return (
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#2d3449]">
        <div
          className={cn('h-full rounded-full', bgClass)}
          style={{ width: `${metric.progressPercent}%` }}
        />
      </div>
    );
  }

  if (metric.displayType === 'segments' && metric.segments) {
    const { active, total } = metric.segments;
    return (
      <div className="mt-4 flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn('h-1 flex-1 rounded-full', i < active ? bgClass : 'bg-[#2d3449]')}
          />
        ))}
      </div>
    );
  }

  if (metric.displayType === 'trend' && metric.trend) {
    return <p className={cn('mt-2 text-[10px] font-bold', textClass)}>{metric.trend}</p>;
  }

  return null;
}

export function TotalScoreCard({ metric, riskLevel }: TotalScoreCardProps) {
  const textClass = RISK_TEXT_CLASS[riskLevel];
  const ringClass = RISK_RING_CLASS[riskLevel];

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#222a3d] p-5 ring-2',
        ringClass,
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]">
          Total Score
        </p>
        <span className={cn('material-symbols-outlined', textClass)}>warning</span>
      </div>
      <div>
        <p className="font-heading text-4xl font-black text-white">
          {metric.score}
          <span className="text-lg text-slate-500">/{metric.maxScore}</span>
        </p>
        <p className={cn('mt-1 text-[10px] font-bold uppercase tracking-tighter', textClass)}>
          {metric.riskLabel}
        </p>
      </div>
    </div>
  );
}
