export type RiskLevel = 'critico' | 'observacion' | 'saludable';

export type MetricDisplayType = 'progress' | 'segments' | 'trend';

// --- Shared domain types ---

export interface Client {
  id: string;
  initials: string;
  name: string;
  sector: string;
  riskLevel: RiskLevel;
  score: number;
  nps: number;
  revenue: string;
}

export interface NavItem {
  href: string;
  icon: string;
  label: string;
}

export interface ClientMetric {
  id: string;
  label: string;
  value: string | number;
  points: number;
  displayType: MetricDisplayType;
  progressPercent?: number;
  segments?: { active: number; total: number };
  trend?: string;
}

export interface TotalScoreMetric {
  score: number;
  maxScore: number;
  riskLabel: string;
}

export interface CauseItem {
  id: string;
  title: string;
  description: string;
}

export interface MitigationAction {
  id: string;
  timeframe: string;
  icon: string;
  title: string;
  description: string;
}

export interface HeaderStat {
  id: string;
  label: string;
  value: string;
  valueClassName?: string;
}

export interface HorizontalMetric {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  points: number;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
}

export interface GrowthOpportunity {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: string;
}

export interface ClientBadge {
  icon: string;
  title: string;
  subtitle: string;
}

// --- Base detail (shared across all risk levels) ---

export interface ClientDetailBase extends Client {
  executiveName: string;
  executiveTitle: string;
  tenureMonths: number;
  sectorIcon: string;
  billingLabel: string;
  metrics: ClientMetric[];
  totalScoreMetric: TotalScoreMetric;
  diagnosis: string;
}

// --- Critico ---

export interface CriticoClientDetail extends ClientDetailBase {
  riskLevel: 'critico';
  causes: CauseItem[];
  mitigationPlan: MitigationAction[];
  alertTags: string[];
  alertTitle: string;
  alertSubtitle: string;
}

// --- Observacion ---

export interface ObservacionClientDetail extends ClientDetailBase {
  riskLevel: 'observacion';
  clientBadge: ClientBadge;
  clientId: string;
  headerStats: HeaderStat[];
  horizontalMetrics: HorizontalMetric[];
  diagnosisBullets: string[];
  churnProbability: number;
  churnLabel: string;
  recommendations: RecommendationItem[];
  lastInteraction: { description: string; date: string };
}

// --- Saludable ---

export interface SaludableClientDetail extends ClientDetailBase {
  riskLevel: 'saludable';
  clientBadge: ClientBadge;
  clientId: string;
  headerStats: HeaderStat[];
  horizontalMetrics: HorizontalMetric[];
  diagnosisBullets: string[];
  renewalProbability: number;
  renewalLabel: string;
  growthOpportunities: GrowthOpportunity[];
  lastInteraction: { description: string; date: string };
}

// --- Union type used across the app ---

export type AnyClientDetail = CriticoClientDetail | ObservacionClientDetail | SaludableClientDetail;

// Keep backward compat alias used in existing components
export type ClientDetail = AnyClientDetail;
