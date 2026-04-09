import { cn } from '@/lib/utils';
import type { ClientPageHeaderProps } from '@/types/components';
import { RISK_CONFIG, RISK_TEXT_CLASS } from '@/constants/risk';

export function ClientPageHeader({ client }: ClientPageHeaderProps) {
  const { label, badgeClass } = RISK_CONFIG[client.riskLevel];
  const textClass = RISK_TEXT_CLASS[client.riskLevel];

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <nav className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span>Dashboard</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span>Clientes</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-[#c3c6d7]">{client.name}</span>
        </nav>
        <div className="flex items-center gap-4">
          <h2 className="font-heading text-3xl font-black tracking-tight text-white">
            {client.name}
          </h2>
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest',
              badgeClass,
            )}
          >
            {label}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-2 text-sm text-[#c3c6d7]">
          {client.sector}
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          ID: {client.clientId}
        </p>
      </div>

      {client.clientBadge && (
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl border p-3',
            `border-current/10 bg-current/5`,
            textClass,
          )}
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          <span
            className={cn('material-symbols-outlined', textClass)}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {client.clientBadge.icon}
          </span>
          <div>
            <p className={cn('text-[10px] font-black uppercase tracking-widest', textClass)}>
              {client.clientBadge.title}
            </p>
            <p className="text-xs text-[#c3c6d7]">{client.clientBadge.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
