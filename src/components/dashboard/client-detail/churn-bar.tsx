import { cn } from '@/lib/utils';
import type { ChurnBarProps } from '@/types/components';
import { RISK_BG_CLASS, RISK_TEXT_CLASS } from '@/constants/risk';

export function ChurnBar({ probability, label, riskLevel, barLabel = 'Probabilidad de Churn (Predicción)' }: ChurnBarProps) {
  const bgClass = RISK_BG_CLASS[riskLevel];
  const textClass = RISK_TEXT_CLASS[riskLevel];

  return (
    <div className="mt-8 rounded-lg border border-[#434655]/10 bg-[#0b1326]/40 p-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {barLabel}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#2d3449]">
        <div
          className={cn('h-full rounded-full transition-all', bgClass)}
          style={{ width: `${probability}%` }}
        />
      </div>
      <p className={cn('mt-2 text-right text-xs font-bold', textClass)}>{label}</p>
    </div>
  );
}
