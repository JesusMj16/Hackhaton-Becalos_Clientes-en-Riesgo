import { cn } from '@/lib/utils';
import type { RecommendationsPanelProps } from '@/types/components';
import { RISK_BORDER_CLASS } from '@/constants/risk';

export function RecommendationsPanel({ recommendations, riskLevel }: RecommendationsPanelProps) {
  const borderClass = RISK_BORDER_CLASS[riskLevel];

  return (
    <div className="rounded-xl bg-[#131b2e] p-6">
      <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
        Acciones Recomendadas
      </h4>
      <div className="space-y-3">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className={cn(
              'cursor-pointer rounded-lg border-l-4 bg-[#222a3d] p-4 transition-all hover:bg-[#31394d]',
              borderClass,
            )}
          >
            <p className="mb-1 text-xs font-bold text-white">{item.title}</p>
            <p className="text-[10px] text-[#c3c6d7]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
