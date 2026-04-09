import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Client } from '@/types/dashboard';
import type { ClientsTableProps, ClientRowProps } from '@/types/components';
import { NPS_COLOR_CLASS } from '@/constants/risk';
import { RiskBadge } from './risk-badge';
import { IconButton } from './icon-button';

export function ClientsTable({ clients }: ClientsTableProps) {
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
              <th className="px-6 py-4 text-center font-bold">Puntuación Total</th>
              <th className="px-6 py-4 text-center font-bold">NPS</th>
              <th className="px-6 py-4 text-right font-bold">Facturación</th>
              <th className="px-6 py-4 text-center font-bold">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#434655]/5">
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} npsColorClass={NPS_COLOR_CLASS} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[#434655]/10 px-6 py-5">
      <h3 className="font-heading text-lg font-bold text-white">Detalle de Clientes</h3>
      <div className="flex gap-2">
        <IconButton icon="filter_list" />
        <IconButton icon="more_vert" />
      </div>
    </div>
  );
}

function ClientRow({ client, npsColorClass }: ClientRowProps) {
  const npsSign = client.nps > 0 ? '+' : '';

  return (
    <tr className="transition-colors hover:bg-[#222a3d]">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <ClientAvatar client={client} />
          <span className="text-sm font-semibold text-white">{client.name}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm font-medium text-slate-400">{client.sector}</td>
      <td className="px-6 py-5">
        <RiskBadge level={client.riskLevel} />
      </td>
      <td className="px-6 py-5 text-center font-heading text-sm font-bold text-white">
        {client.score} pts
      </td>
      <td className="px-6 py-5 text-center">
        <span className={cn('text-sm font-bold', npsColorClass[client.riskLevel])}>
          {npsSign}{client.nps} NPS
        </span>
      </td>
      <td className="px-6 py-5 text-right font-heading text-sm font-bold text-white">
        {client.revenue}
      </td>
      <td className="px-6 py-5 text-center">
        <Link
          href={`/dashboard/clientes/${client.id}`}
          className="rounded-lg bg-[#2563eb]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#b4c5ff] transition-all hover:bg-[#2563eb] hover:text-white"
        >
          Ver Análisis
        </Link>
      </td>
    </tr>
  );
}

function ClientAvatar({ client }: { client: Client }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d3449] text-xs font-bold text-[#b4c5ff]">
      {client.initials}
    </div>
  );
}
