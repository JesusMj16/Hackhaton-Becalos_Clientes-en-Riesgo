'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { clients } from '@/data/clients';
import { RISK_CONFIG } from '@/constants/risk';

const alerts = clients
  .filter((c) => c.riskLevel === 'critico' || c.riskLevel === 'observacion')
  .sort((a, b) => (a.riskLevel === 'critico' ? -1 : 1) - (b.riskLevel === 'critico' ? -1 : 1));

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative text-[#8d90a0] transition-colors hover:text-white"
        aria-label="Notificaciones"
      >
        <span className="material-symbols-outlined">notifications</span>
        {alerts.length > 0 && (
          <span className="absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full border-2 border-[#0b1326] bg-[#ef4444]" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#434655]/10 px-5 py-4">
            <h3 className="font-heading text-sm font-bold text-white">Alertas de Clientes</h3>
            <span className="rounded-full bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-bold text-[#ef4444]">
              {alerts.length} activas
            </span>
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {alerts.map((client) => {
              const cfg = RISK_CONFIG[client.riskLevel];
              const isCritical = client.riskLevel === 'critico';
              return (
                <li key={client.id}>
                  <Link
                    href={`/dashboard/clientes/${client.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-[#222a3d]"
                  >
                    <div className={cn('h-1.5 w-1.5 shrink-0 rounded-full', cfg.dotClass)} />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{client.name}</p>
                      <p className="text-xs text-[#8d90a0]">{client.sector}</p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold',
                        cfg.badgeClass,
                      )}
                    >
                      {isCritical ? 'URGENTE' : 'ATENCIÓN'}
                    </span>
                  </Link>
                </li>
              );
            })}
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
