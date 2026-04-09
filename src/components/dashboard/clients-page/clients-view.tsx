'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { clients } from '@/data/clients';
import { ClientsTable } from '@/components/dashboard/clients-table';
import type { RiskLevel } from '@/types/dashboard';

type Filter = 'all' | RiskLevel;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',         label: 'Todos' },
  { value: 'critico',     label: 'Crítico' },
  { value: 'observacion', label: 'Observación' },
  { value: 'saludable',   label: 'Saludable' },
];

const FILTER_STYLES: Record<Filter, string> = {
  all:         'border-[#b4c5ff]/40 bg-[#b4c5ff]/10 text-[#b4c5ff]',
  critico:     'border-[#ef4444]/40 bg-[#ef4444]/10 text-[#ef4444]',
  observacion: 'border-[#EAB308]/40 bg-[#EAB308]/10 text-[#EAB308]',
  saludable:   'border-[#4ae176]/40 bg-[#4ae176]/10 text-[#4ae176]',
};

import { useAnalysisContext } from '@/context/AnalysisContext';

export function ClientsView() {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const { history } = useAnalysisContext();

  const filtered = history.filter((item) => {
    // We map Context types to our local filters: 
    // CRÍTICO -> critico, ALTO/MEDIO -> observacion, BAJO -> saludable
    let mappedRisk: Filter = 'saludable';
    if (item.result.riskLevel === 'CRÍTICO') mappedRisk = 'critico';
    else if (item.result.riskLevel === 'ALTO' || item.result.riskLevel === 'MEDIO') mappedRisk = 'observacion';

    const matchesFilter = filter === 'all' || mappedRisk === filter;
    const q = query.toLowerCase();
    
    // Fallback names logic
    const clientName = item.formData.clientName || item.result.clientName || '';
    const sector = item.formData.sector || '';

    const matchesQuery = !q || clientName.toLowerCase().includes(q) || sector.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const criticalCount = history.filter((item) => item.result.riskLevel === 'CRÍTICO').length;
  const watchingCount = history.filter((item) => item.result.riskLevel === 'ALTO' || item.result.riskLevel === 'MEDIO').length;
  const healthyCount  = history.filter((item) => item.result.riskLevel === 'BAJO').length;

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Clientes" value={history.length} colorClass="text-white" />
        <StatCard label="Crítico"     value={criticalCount}   colorClass="text-[#ef4444]" />
        <StatCard label="Observación" value={watchingCount}   colorClass="text-[#EAB308]" />
        <StatCard label="Saludable"   value={healthyCount}    colorClass="text-[#4ae176]" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#8d90a0]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o sector..."
            className="w-full rounded-lg border border-[#434655]/20 bg-[#131b2e] py-2 pl-10 pr-4 text-sm text-[#dae2fd] outline-none placeholder:text-[#8d90a0] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-bold transition-all',
                filter === value
                  ? FILTER_STYLES[value]
                  : 'border-[#434655]/30 text-[#8d90a0] hover:border-[#434655]/60 hover:text-[#c3c6d7]',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <ClientsTable history={filtered} />
      ) : (
        <div className="rounded-xl border border-[#434655]/10 bg-[#131b2e] py-16 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-[#434655]">search_off</span>
          <p className="text-sm text-[#8d90a0]">No se encontraron clientes con esos criterios.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="rounded-xl border border-[#434655]/10 bg-[#131b2e] px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">{label}</p>
      <p className={cn('font-heading mt-1 text-3xl font-black', colorClass)}>{value}</p>
    </div>
  );
}
