import type { MitigationCardProps } from '@/types/components';

export function MitigationCard({ action }: MitigationCardProps) {
  return (
    <div className="glass-panel rounded-xl border border-white/5 p-6 transition-all hover:border-[#b4c5ff]/30">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded bg-[#b4c5ff]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-[#b4c5ff]">
          {action.timeframe}
        </span>
        <span className="material-symbols-outlined text-sm text-[#b4c5ff]">{action.icon}</span>
      </div>
      <h4 className="mb-2 text-base font-bold text-white">{action.title}</h4>
      <p className="text-sm leading-snug text-slate-400">{action.description}</p>
    </div>
  );
}
