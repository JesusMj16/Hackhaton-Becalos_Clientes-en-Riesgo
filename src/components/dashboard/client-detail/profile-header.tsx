import type { ClientProfileHeaderProps } from '@/types/components';
import { RISK_CONFIG } from '@/constants/risk';
import { cn } from '@/lib/utils';

export function ClientProfileHeader({ client }: ClientProfileHeaderProps) {
  const { label, badgeClass } = RISK_CONFIG[client.riskLevel];

  return (
    <section className="mb-10">
      <div className="flex items-end justify-between">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#434655]/30 bg-[#2d3449]">
            <span className="material-symbols-outlined text-4xl text-[#b4c5ff]">
              {client.sectorIcon}
            </span>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-4">
              <h2 className="font-heading text-4xl font-extrabold leading-none tracking-tight text-white">
                {client.name}
              </h2>
              <span
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest',
                  badgeClass,
                  client.riskLevel === 'critico' && 'risk-glow',
                )}
              >
                {label}
              </span>
            </div>
            <div className="flex items-center gap-6 text-slate-400">
              <MetaItem icon="precision_manufacturing" label={client.sector} />
              <MetaItem icon="event_repeat" label={`${client.tenureMonths} meses de antigüedad`} />
              <MetaItem
                icon="account_circle"
                label={
                  <>
                    Ejecutivo:{' '}
                    <span className="font-bold text-white">{client.executiveName}</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Facturación Mensual
          </p>
          <p className="font-heading text-3xl font-extrabold text-white">
            {client.billingLabel.split(' ')[0]}{' '}
            <span className="text-sm font-medium text-slate-400">
              {client.billingLabel.split(' ').slice(1).join(' ')}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function MetaItem({
  icon,
  label,
}: {
  icon: string;
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
