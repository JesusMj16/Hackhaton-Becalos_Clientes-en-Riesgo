import { cn } from '@/lib/utils';
import type { HistoryCardProps } from '@/types/components';
import { RISK_TEXT_CLASS, RISK_BG_CLASS } from '@/constants/risk';

export function HistoryCard({ description, date, riskLevel }: HistoryCardProps) {
  const textClass = RISK_TEXT_CLASS[riskLevel];
  const bgClass = RISK_BG_CLASS[riskLevel];

  return (
    <div className={cn('mt-4 rounded-xl p-6', bgClass)}>
      <div className="mb-3 flex items-center gap-3">
        <span className="material-symbols-outlined text-[#002109]">history_edu</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#002109]">
          Historial Reciente
        </p>
      </div>
      <p className="mb-1 text-sm font-bold text-[#002109]">Última interacción</p>
      <p className="text-xs text-[#002109]/80">{description} — {date}</p>
      <button className="mt-4 w-full rounded py-2 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'rgba(0,33,9,0.3)' }}
      >
        Ver Bitácora Completa
      </button>
    </div>
  );
}
