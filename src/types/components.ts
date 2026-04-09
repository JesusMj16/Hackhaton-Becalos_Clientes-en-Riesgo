import type {
  Client,
  NavItem,
  RiskLevel,
  AnyClientDetail,
  CriticoClientDetail,
  ObservacionClientDetail,
  SaludableClientDetail,
  ClientMetric,
  TotalScoreMetric,
  CauseItem,
  MitigationAction,
  HeaderStat,
  HorizontalMetric,
  RecommendationItem,
  GrowthOpportunity,
} from './dashboard';

// --- Dashboard overview ---

export interface KpiCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
  icon: string;
  iconBgClassName: string;
  iconColorClassName: string;
  trend?: { icon: string; label: string; className: string };
}

export interface KpiSectionProps {
  total: number;
  critical: number;
  watching: number;
  healthy: number;
}

export interface RiskDistributionCardProps {
  healthy: number;
  watching: number;
  critical: number;
}

export interface LegendDotProps {
  color: string;
  count: number;
}

export interface IconButtonProps {
  icon: string;
  variant?: 'round' | 'square';
}

export interface ClientsTableProps {
  clients: Client[];
}

export interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

export interface ClientRowProps {
  client: Client;
  npsColorClass: Record<RiskLevel, string>;
}

// --- Client detail — shared ---

export interface ClientBreadcrumbProps {
  clientName: string;
}

export interface ClientProfileHeaderProps {
  client: AnyClientDetail;
}

export interface MetricCardProps {
  metric: ClientMetric;
  riskLevel: RiskLevel;
}

export interface TotalScoreCardProps {
  metric: TotalScoreMetric;
  riskLevel: RiskLevel;
}

export interface MetricsSectionProps {
  metrics: ClientMetric[];
  totalScore: TotalScoreMetric;
  riskLevel: RiskLevel;
}

export interface DiagnosisPanelProps {
  diagnosis: string;
}

export interface CausesListProps {
  causes: CauseItem[];
  riskLevel: RiskLevel;
}

export interface MitigationCardProps {
  action: MitigationAction;
}

export interface MitigationSectionProps {
  plan: MitigationAction[];
}

export interface AlertsBannerProps {
  title: string;
  subtitle: string;
  tags: string[];
}

// --- Client detail — compact header (observacion + saludable) ---

export interface ClientPageHeaderProps {
  client: ObservacionClientDetail | SaludableClientDetail;
}

export interface HeaderStatsGridProps {
  stats: HeaderStat[];
}

export interface HorizontalMetricsProps {
  metrics: HorizontalMetric[];
  riskLevel: RiskLevel;
}

// --- Client detail — diagnosis bento (observacion) ---

export interface DiagnosisBentoProps {
  bullets: string[];
  churnProbability: number;
  churnLabel: string;
  riskLevel: RiskLevel;
  barLabel?: string;
}

export interface ChurnBarProps {
  probability: number;
  label: string;
  riskLevel: RiskLevel;
  barLabel?: string;
}

// --- Client detail — recommendations (observacion + saludable) ---

export interface RecommendationsPanelProps {
  recommendations: RecommendationItem[];
  riskLevel: RiskLevel;
}

export interface HistoryCardProps {
  description: string;
  date: string;
  riskLevel: RiskLevel;
}

// --- Client detail — growth (saludable) ---

export interface GrowthPanelProps {
  opportunities: GrowthOpportunity[];
}

// --- Layout orchestrators ---

export interface CriticoLayoutProps {
  client: CriticoClientDetail;
}

export interface ObservacionLayoutProps {
  client: ObservacionClientDetail;
}

export interface SaludableLayoutProps {
  client: SaludableClientDetail;
}
