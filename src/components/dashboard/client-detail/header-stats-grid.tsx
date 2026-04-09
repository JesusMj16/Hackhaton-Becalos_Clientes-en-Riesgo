import { cn } from '@/lib/utils';
import type { HeaderStatsGridProps } from '@/types/components';

export function HeaderStatsGrid({ stats }: HeaderStatsGridProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id} className="rounded-xl bg-[#131b2e] p-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {stat.label}
          </p>
          <p className={cn('font-heading text-xl font-bold text-white', stat.valueClassName)}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
