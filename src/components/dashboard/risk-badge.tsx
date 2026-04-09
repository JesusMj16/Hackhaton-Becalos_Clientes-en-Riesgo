import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/dashboard';
import { RISK_CONFIG } from '@/constants/risk';

export function RiskBadge({ level }: { level: RiskLevel }) {
  const { label, dotClass, badgeClass } = RISK_CONFIG[level];

  return (
    <span
      className={cn(
        'flex w-fit items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black uppercase',
        badgeClass,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotClass)} />
      {label}
    </span>
  );
}
