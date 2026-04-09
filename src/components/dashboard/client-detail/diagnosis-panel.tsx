import type { DiagnosisPanelProps } from '@/types/components';

export function DiagnosisPanel({ diagnosis }: DiagnosisPanelProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#434655]/10 bg-[#131b2e] p-8">
      <div className="absolute right-0 top-0 p-8 opacity-5">
        <span className="material-symbols-outlined text-9xl">psychology</span>
      </div>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-[#2563eb]/20 p-2">
          <span
            className="material-symbols-outlined text-[#b4c5ff]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            psychology
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold text-white">Diagnóstico AxIA</h3>
      </div>
      <p className="max-w-3xl text-lg leading-relaxed text-slate-300">{diagnosis}</p>
    </div>
  );
}
