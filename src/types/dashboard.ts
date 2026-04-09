export type RiskLevel = 'critico' | 'observacion' | 'saludable';

export type MetricDisplayType = 'progress' | 'segments' | 'trend';

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

export interface ClientDetail extends Client {
  executiveName: string;
  executiveTitle: string;
  tenureMonths: number;
  sectorIcon: string;
  billingLabel: string;
  metrics: ClientMetric[];
  totalScoreMetric: TotalScoreMetric;
  diagnosis: string;
  causes: CauseItem[];
  mitigationPlan: MitigationAction[];
  alertTags: string[];
  alertTitle: string;
  alertSubtitle: string;
}
