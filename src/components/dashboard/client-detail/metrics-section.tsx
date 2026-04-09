import type { MetricsSectionProps } from '@/types/components';
import { MetricCard, TotalScoreCard } from './metric-card';

export function MetricsSection({ metrics, totalScore, riskLevel }: MetricsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} riskLevel={riskLevel} />
      ))}
      <TotalScoreCard metric={totalScore} riskLevel={riskLevel} />
    </div>
  );
}
