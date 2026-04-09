interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  active?: boolean;
}

const HISTORY_ITEMS: HistoryItem[] = [
  { id: '1', title: 'Riesgo Grupo Industrial Norteño', timestamp: 'Hace 2 min', active: true },
  { id: '2', title: 'Análisis de NPS Automotriz', timestamp: 'Hace 2 horas' },
  { id: '3', title: 'Reporte de puntualidad Q3', timestamp: 'Ayer' },
  { id: '4', title: 'Proyección de churn mensual', timestamp: '12 de Oct' },
];

export function HistoryPanel() {
  return (
    <section className="flex w-72 shrink-0 flex-col border-r border-[#434655]/10 bg-[#131b2e]">
      <div className="p-6">
        <h2 className="font-heading mb-4 text-lg font-bold tracking-tight text-white">Historial</h2>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#434655]/20 bg-[#222a3d] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d3449]">
          <span className="material-symbols-outlined text-lg text-[#b4c5ff]">add</span>
          Nueva Consulta
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto px-4">
        <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
          Recientes
        </p>
        <div className="space-y-1">
          {HISTORY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={
                item.active
                  ? 'cursor-pointer rounded-xl border-l-2 border-[#b4c5ff] bg-[#2d3449]/40 p-3'
                  : 'cursor-pointer rounded-xl p-3 transition-colors hover:bg-[#222a3d]'
              }
            >
              <p className={`truncate text-sm font-medium ${item.active ? 'text-white' : 'text-[#c3c6d7]'}`}>
                {item.title}
              </p>
              <p className="mt-1 text-xs text-[#8d90a0]">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
