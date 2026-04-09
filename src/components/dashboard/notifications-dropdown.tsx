'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAnalysisContext } from '@/context/AnalysisContext';

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const { history, handleLoadAnalysis } = useAnalysisContext();

  const activeAlerts = history
    .filter((item) => {
      const risk = item.result.riskLevel;
      return risk === 'CRÍTICO' || risk === 'ALTO' || risk === 'MEDIO';
    })
    .sort((a, b) => {
      // Sort CRÍTICO items first
      if (a.result.riskLevel === 'CRÍTICO' && b.result.riskLevel !== 'CRÍTICO') return -1;
      if (a.result.riskLevel !== 'CRÍTICO' && b.result.riskLevel === 'CRÍTICO') return 1;
      return 0;
    });

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  function handleAlertSelect(item: any) {
    setOpen(false);
    handleLoadAnalysis(item);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative text-[#8d90a0] transition-colors hover:text-white"
        aria-label="Notificaciones"
      >
        <span className="material-symbols-outlined">notifications</span>
        {activeAlerts.length > 0 && (
          <span className="absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full border-2 border-[#0b1326] bg-[#ef4444]" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#434655]/10 px-5 py-4">
            <h3 className="font-heading text-sm font-bold text-white">Alertas de Clientes</h3>
            {activeAlerts.length > 0 && (
              <span className="rounded-full bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-bold text-[#ef4444]">
                {activeAlerts.length} activas
              </span>
            )}
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {activeAlerts.length === 0 ? (
              <li className="px-5 py-6 text-center text-sm text-[#8d90a0]">
                No hay alertas críticas en este momento. El portafolio está bajo control.
              </li>
            ) : (
              activeAlerts.map((item, i) => {
                const displayName = item.formData.clientName || item.result.clientName || 'Sin Nombre';
                const sector = item.formData.sector || 'Sin sector';
                const isCritical = item.result.riskLevel === 'CRÍTICO';

                const badgeClass = isCritical
                  ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30'
                  : 'bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30';
                  
                const dotClass = isCritical ? 'bg-[#ef4444]' : 'bg-[#eab308]';

                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => handleAlertSelect(item)}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[#222a3d]"
                    >
                      <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClass)} />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                        <p className="text-xs text-[#8d90a0]">{sector}</p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold',
                          badgeClass,
                        )}
                      >
                        {isCritical ? 'URGENTE' : 'ATENCIÓN'}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <div className="border-t border-[#434655]/10 px-5 py-3">
            <Link
              href="/dashboard/clientes"
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-[#b4c5ff] hover:text-white"
            >
              Ver todos los clientes →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
