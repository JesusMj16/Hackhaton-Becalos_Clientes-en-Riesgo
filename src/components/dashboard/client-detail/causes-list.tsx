import { cn } from '@/lib/utils';
import type { CausesListProps } from '@/types/components';
import type { CauseItem } from '@/types/dashboard';
import { RISK_BG_CLASS } from '@/constants/risk';

export function CausesList({ causes, riskLevel }: CausesListProps) {
  const dotBgClass = RISK_BG_CLASS[riskLevel];

  return (
    <div className="rounded-2xl border border-[#434655]/10 bg-[#131b2e] p-8">
      <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-400">
        Causas Principales
      </h3>
      <ul className="space-y-6">
        {causes.map((cause) => (
          <CauseItem key={cause.id} cause={cause} dotBgClass={dotBgClass} />
        ))}
      </ul>
    </div>
  );
}

function CauseItem({ cause, dotBgClass }: { cause: CauseItem; dotBgClass: string }) {
  return (
    <li className="flex gap-4">
      <div
        className={cn(
          'mt-1 h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]',
          dotBgClass,
        )}
      />
      <div>
        <p className="mb-1 text-sm font-bold text-white">{cause.title}</p>
        <p className="text-xs leading-tight text-slate-500">{cause.description}</p>
      </div>
    </li>
  );
}
