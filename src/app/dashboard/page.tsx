import { PageHeader } from '@/components/dashboard/page-header';
import { KpiSection } from '@/components/dashboard/kpi-section';
import { ClientsTable } from '@/components/dashboard/clients-table';
import { DashboardFooter } from '@/components/dashboard/dashboard-footer';
import { clients } from '@/data/clients';

const { criticalCount, watchingCount, healthyCount } = clients.reduce(
  (acc, c) => {
    if (c.riskLevel === 'critico') acc.criticalCount++;
    else if (c.riskLevel === 'observacion') acc.watchingCount++;
    else acc.healthyCount++;
    return acc;
  },
  { criticalCount: 0, watchingCount: 0, healthyCount: 0 },
);

export default function DashboardPage() {
  return (
    <>
      <PageHeader />
      <KpiSection
        total={clients.length}
        critical={criticalCount}
        watching={watchingCount}
        healthy={healthyCount}
      />
      <ClientsTable clients={clients} />
      <DashboardFooter />
    </>
  );
}
