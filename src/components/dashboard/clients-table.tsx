import { cn } from '@/lib/utils';
import type { AnalysisResult } from './new-client-drawer';
import { IconButton } from './icon-button';
import { useAnalysisContext } from '@/context/AnalysisContext';

interface HistoryItem {
  formData: any;
  result: AnalysisResult;
}

export function ClientsTable({ history = [] }: { history?: HistoryItem[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#434655]/10 bg-[#131b2e] shadow-2xl">
      <TableHeader />
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#434655]/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <th className="px-6 py-4 text-left font-bold">Cliente</th>
              <th className="px-6 py-4 text-left font-bold">Sector</th>
              <th className="px-6 py-4 text-left font-bold">Nivel de Riesgo</th>
              <th className="px-6 py-4 text-center font-bold">NPS</th>
              <th className="px-6 py-4 text-right font-bold">Facturación</th>
              <th className="px-6 py-4 text-center font-bold">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#434655]/5">
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm font-medium text-slate-400">
                  Aún no hay clientes analizados en esta sesión.
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <HistoryRow key={index} item={item} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[#434655]/10 px-6 py-5">
      <h3 className="font-heading text-lg font-bold text-white">Historial de Análisis</h3>
      <div className="flex gap-2">
        <IconButton icon="filter_list" />
        <IconButton icon="more_vert" />
      </div>
    </div>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const { formData, result } = item;
  const { handleLoadAnalysis } = useAnalysisContext();
  
  const riskColors: Record<string, string> = {
    'CRÍTICO': 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30',
    'ALTO': 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30',
    'MEDIO': 'bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30',
    'BAJO': 'bg-[#4ae176]/20 text-[#4ae176] border border-[#4ae176]/30',
  };
  const colorClass = riskColors[result.riskLevel] || riskColors['MEDIO'];

  const npsSign = formData.nps > 0 ? '+' : '';
  const clientDisplayName = formData?.clientName || result?.clientName || 'Sin Nombre';

  return (
    <tr className="transition-colors hover:bg-[#222a3d]">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <ClientAvatar name={clientDisplayName} />
          <span className="text-sm font-semibold text-white">{clientDisplayName}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm font-medium text-slate-400">{formData.sector}</td>
      <td className="px-6 py-5">
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>
          {result.riskLevel}
        </span>
      </td>

      <td className="px-6 py-5 text-center">
        <span className={cn('text-sm font-bold', formData.nps > 0 ? 'text-[#4ae176]' : 'text-[#ef4444]')}>
          {npsSign}{formData.nps} NPS
        </span>
      </td>
      <td className="px-6 py-5 text-right font-heading text-sm font-bold text-white">
        ${Number(formData.monthlyBilling || 0).toLocaleString()}
      </td>
      <td className="px-6 py-5 text-center">
        <button
          onClick={() => handleLoadAnalysis(item)}
          className="rounded-lg bg-[#2563eb]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#b4c5ff] transition-all hover:bg-[#2563eb] hover:text-white cursor-pointer"
        >
          Ver Análisis
        </button>
      </td>
    </tr>
  );
}

function ClientAvatar({ name }: { name: string }) {
  const initials = name ? name.substring(0, 2).toUpperCase() : '??';
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d3449] text-xs font-bold text-[#b4c5ff]">
      {initials}
    </div>
  );
}
