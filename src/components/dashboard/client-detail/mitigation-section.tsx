import type { MitigationSectionProps } from '@/types/components';
import { MitigationCard } from './mitigation-card';

export function MitigationSection({ plan }: MitigationSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">
        Plan de Mitigación Recomendado
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plan.map((action) => (
          <MitigationCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
