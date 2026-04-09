import { cn } from '@/lib/utils';
import type { DiagnosisBentoProps } from '@/types/components';
import { RISK_TEXT_CLASS, RISK_BG_CLASS } from '@/constants/risk';
import { ChurnBar } from './churn-bar';

export function DiagnosisBento({
  bullets,
  churnProbability,
  churnLabel,
  riskLevel,
  barLabel,
}: DiagnosisBentoProps) {
  const textClass = RISK_TEXT_CLASS[riskLevel];
  const dotBgClass = RISK_BG_CLASS[riskLevel];

  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#222a3d] to-[#131b2e] p-8 ring-1 ring-[#EAB308]/20">
      <div className="absolute right-0 top-0 p-8 opacity-10">
        <span className={cn('material-symbols-outlined text-8xl', textClass)}>psychology</span>
      </div>
      <h3 className={cn('font-heading mb-6 flex items-center gap-3 text-xl font-bold text-white')}>
        <span
          className={cn('material-symbols-outlined', textClass)}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        Diagnóstico AxIA
      </h3>
      <div className="relative z-10 space-y-6">
        {bullets.map((bullet, i) => (
          <div key={i} className="flex gap-4">
            <div className="mt-1 shrink-0">
              <span className={cn('block h-2 w-2 rounded-full', dotBgClass)} />
            </div>
            <p
              className="leading-relaxed text-[#c3c6d7]"
              dangerouslySetInnerHTML={{ __html: bullet }}
            />
          </div>
        ))}
      </div>
      <ChurnBar
        probability={churnProbability}
        label={churnLabel}
        riskLevel={riskLevel}
        barLabel={barLabel}
      />
    </div>
  );
}
