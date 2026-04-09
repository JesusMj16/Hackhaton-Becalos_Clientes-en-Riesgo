import type { ObservacionLayoutProps } from '@/types/components';
import { ClientPageHeader } from '../client-page-header';
import { HeaderStatsGrid } from '../header-stats-grid';
import { HorizontalMetrics } from '../horizontal-metrics';
import { DiagnosisBento } from '../diagnosis-bento';
import { RecommendationsPanel } from '../recommendations-panel';
import { HistoryCard } from '../history-card';

export function ObservacionLayout({ client }: ObservacionLayoutProps) {
  return (
    <>
      <ClientPageHeader client={client} />
      <HeaderStatsGrid stats={client.headerStats} />
      <HorizontalMetrics metrics={client.horizontalMetrics} riskLevel={client.riskLevel} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DiagnosisBento
            bullets={client.diagnosisBullets}
            churnProbability={client.churnProbability}
            churnLabel={client.churnLabel}
            riskLevel={client.riskLevel}
          />
        </div>
        <div className="space-y-0">
          <RecommendationsPanel
            recommendations={client.recommendations}
            riskLevel={client.riskLevel}
          />
          <HistoryCard
            description={client.lastInteraction.description}
            date={client.lastInteraction.date}
            riskLevel={client.riskLevel}
          />
        </div>
      </div>
    </>
  );
}
