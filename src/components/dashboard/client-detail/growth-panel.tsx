import type { GrowthPanelProps } from '@/types/components';

export function GrowthPanel({ opportunities }: GrowthPanelProps) {
  return (
    <div className="rounded-xl bg-[#131b2e] p-6">
      <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
        Oportunidades de Crecimiento
      </h4>
      <div className="space-y-3">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="cursor-pointer rounded-lg border-l-4 border-[#4ae176] bg-[#222a3d] p-4 transition-all hover:bg-[#31394d]"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#4ae176]">{opp.icon}</span>
                <p className="text-xs font-bold text-white">{opp.title}</p>
              </div>
              <span className="rounded bg-[#4ae176]/10 px-2 py-0.5 text-[10px] font-bold text-[#4ae176]">
                {opp.impact}
              </span>
            </div>
            <p className="text-[10px] text-[#c3c6d7]">{opp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
