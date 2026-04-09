const SUGGESTIONS = [
  { icon: 'lightbulb', text: 'Solicitar llamada de retención inmediata con el Director General.' },
  { icon: 'summarize', text: 'Generar reporte de contingencia para el equipo de operaciones.' },
];

export function ContextPanel() {
  return (
    <aside className="flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-[#434655]/10 bg-[#131b2e] p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
        Referencia Contextual
      </p>

      {/* Client summary card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#434655]/10 bg-[#2d3449]/30 p-5">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-tighter text-[#ef4444]">
            Riesgo Crítico
          </span>
          <div className="h-2 w-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
        </div>
        <div className="mb-6">
          <p className="text-[10px] font-medium text-[#8d90a0]">Cliente Seleccionado</p>
          <h3 className="font-heading text-lg font-bold leading-tight text-white">
            Grupo Industrial Norteño
          </h3>
          <p className="text-xs text-[#8d90a0]">Sector: Manufactura Pesada</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-end justify-between border-b border-[#434655]/10 pb-3">
            <div>
              <p className="text-[10px] uppercase tracking-tighter text-[#8d90a0]">Health Score</p>
              <p className="font-heading text-2xl font-black text-[#ef4444]">
                34<span className="text-xs font-normal text-[#8d90a0]">/100</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-tighter text-[#8d90a0]">NPS</p>
              <p className="text-xl font-bold text-[#ef4444]">-8</p>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase text-[#8d90a0]">Puntualidad</p>
              <span className="text-[10px] text-[#ef4444]">-12%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#131b2e]">
              <div className="h-full w-[34%] rounded-full bg-[#ef4444]" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-xl border border-[#434655]/20 bg-[#222a3d] py-2 text-xs font-bold text-white transition-colors hover:bg-[#2d3449]"
        >
          Ver Expediente Completo
        </button>
      </div>

      {/* AI suggestions */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
          Sugerencias IA
        </p>
        <div className="space-y-2">
          {SUGGESTIONS.map((s) => (
            <div
              key={s.icon}
              className="cursor-pointer rounded-xl border border-[#434655]/5 bg-[#222a3d]/50 p-3 transition-all hover:border-[#b4c5ff]/30"
            >
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-lg text-[#b4c5ff]">{s.icon}</span>
                <p className="text-[11px] leading-snug text-[#c3c6d7]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last activity */}
      <div className="mt-auto rounded-2xl border border-[#434655]/10 bg-[#060e20] p-4">
        <p className="mb-3 text-[9px] uppercase text-[#8d90a0]">Última Actividad</p>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-[#ef4444]" />
          <div>
            <p className="text-[11px] font-bold text-white">Ticket #4092 Escalado</p>
            <p className="text-[10px] text-[#8d90a0]">Hace 45 minutos</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
