import type { ClientBreadcrumbProps } from '@/types/components';

export function ClientBreadcrumb({ clientName }: ClientBreadcrumbProps) {
  return (
    <nav className="mb-8 flex items-center justify-between">
      <ol className="flex items-center gap-2 text-xs font-medium tracking-wide">
        <li className="text-slate-500">Dashboard</li>
        <li className="text-slate-500">
          <span className="material-symbols-outlined align-middle text-[14px]">chevron_right</span>
        </li>
        <li className="text-slate-500">Clientes</li>
        <li className="text-slate-500">
          <span className="material-symbols-outlined align-middle text-[14px]">chevron_right</span>
        </li>
        <li className="font-bold text-white">{clientName}</li>
      </ol>
      <div className="flex gap-3">
        <button className="rounded bg-[#222a3d] px-4 py-2 text-xs font-bold text-[#dae2fd] shadow-sm transition-all hover:brightness-110">
          Exportar Reporte
        </button>
        <button className="rounded bg-linear-to-br from-[#b4c5ff] to-[#2563eb] px-4 py-2 text-xs font-bold text-[#002a78] shadow-lg transition-all hover:scale-[0.98] active:scale-95">
          Agendar Reunión
        </button>
      </div>
    </nav>
  );
}
