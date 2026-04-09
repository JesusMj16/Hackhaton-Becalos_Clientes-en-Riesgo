import type { CriticoLayoutProps } from '@/types/components';
import { ClientBreadcrumb } from '../breadcrumb';
import { ClientProfileHeader } from '../profile-header';
import { MetricsSection } from '../metrics-section';
import { DiagnosisPanel } from '../diagnosis-panel';
import { CausesList } from '../causes-list';
import { MitigationSection } from '../mitigation-section';
import { AlertsBanner } from '../alerts-banner';

export function CriticoLayout({ client }: CriticoLayoutProps) {
  return (
    <>
      <ClientBreadcrumb clientName={client.name} />
      <ClientProfileHeader client={client} />
      <MetricsSection
        metrics={client.metrics}
        totalScore={client.totalScoreMetric}
        riskLevel={client.riskLevel}
      />
      <div className="mb-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <DiagnosisPanel diagnosis={client.diagnosis} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <CausesList causes={client.causes} riskLevel={client.riskLevel} />
        </div>
      </div>
      <MitigationSection plan={client.mitigationPlan} />
      <AlertsBanner
        title={client.alertTitle}
        subtitle={client.alertSubtitle}
        tags={client.alertTags}
      />
    </>
  );
}
