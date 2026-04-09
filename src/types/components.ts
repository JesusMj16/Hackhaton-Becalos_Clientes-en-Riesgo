import type {
  Client,
  NavItem,
  RiskLevel,
  ClientDetail,
  ClientMetric,
  TotalScoreMetric,
  CauseItem,
  MitigationAction,
} from "./dashboard";

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
  variant?: "round" | "square";
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

// --- Client detail ---

export interface ClientBreadcrumbProps {
  clientName: string;
}

export interface ClientProfileHeaderProps {
  client: ClientDetail;
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
