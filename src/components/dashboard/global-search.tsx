'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAnalysisContext } from '@/context/AnalysisContext';

export function GlobalSearch() {
  const [query, setQuery]   = useState('');
  const [open, setOpen]     = useState(false);
  const router              = useRouter();
  const containerRef        = useRef<HTMLDivElement>(null);
  const { history, handleLoadAnalysis } = useAnalysisContext();

  const results = query.trim().length >= 2
    ? history.filter((item) => {
        const q = query.toLowerCase();
        const clientName = (item.formData.clientName || item.result.clientName || '').toLowerCase();
        const sector = (item.formData.sector || '').toLowerCase();
        return clientName.includes(q) || sector.includes(q);
      })
    : [];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearchSelect(item: any) {
    setQuery('');
    setOpen(false);
    
    handleLoadAnalysis(item);
    
    // Si estamos en otra ruta, regresamos al dashboard para ver el resultado
    if (window.location.pathname !== '/dashboard') {
      router.push('/dashboard');
    }

    // Un timeout pequeño para permitir render o push del router antes de scrollear
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#8d90a0]">
        search
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        placeholder="Buscar clientes o indicadores..."
        className="w-full rounded-lg border-none bg-[#131b2e] py-2 pl-10 pr-4 text-sm text-[#dae2fd] outline-none placeholder:text-[#8d90a0] focus:ring-1 focus:ring-[#2563eb]"
      />

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl">
          <p className="border-b border-[#434655]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
            Clientes encontrados
          </p>
          <ul>
            {results.map((item, index) => {
              const displayName = item.formData.clientName || item.result.clientName || 'Sin Nombre';
              const sector = item.formData.sector || 'Sin sector';
              const initials = displayName.substring(0, 2).toUpperCase() || '??';
              const riskLevel = item.result.riskLevel || 'MEDIO';

              const riskColors: Record<string, string> = {
                'CRÍTICO': 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30',
                'ALTO': 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30',
                'MEDIO': 'bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30',
                'BAJO': 'bg-[#4ae176]/20 text-[#4ae176] border border-[#4ae176]/30',
              };
              const badgeClass = riskColors[riskLevel] || riskColors['MEDIO'];

              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSearchSelect(item)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#222a3d]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2d3449] text-xs font-bold text-[#b4c5ff]">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{displayName}</p>
                      <p className="text-xs text-[#8d90a0]">{sector}</p>
                    </div>
                    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold', badgeClass)}>
                      {riskLevel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {open && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-[#434655]/20 bg-[#131b2e] px-4 py-6 text-center shadow-2xl">
          <p className="text-sm text-[#8d90a0]">No se encontraron clientes que coincidan con la búsqueda.</p>
        </div>
      )}
    </div>
  );
}
