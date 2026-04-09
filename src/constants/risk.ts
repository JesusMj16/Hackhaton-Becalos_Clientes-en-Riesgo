import type { RiskLevel } from '@/types/dashboard';

export const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; dotClass: string; badgeClass: string }
> = {
  critico: {
    label: 'CRÍTICO',
    dotClass: 'bg-red-500 animate-pulse',
    badgeClass:
      'bg-red-500/10 text-[#EF4444] border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.2)]',
  },
  observacion: {
    label: 'EN OBSERVACIÓN',
    dotClass: 'bg-amber-500',
    badgeClass: 'bg-amber-500/10 text-[#EAB308] border-amber-500/20',
  },
  saludable: {
    label: 'SALUDABLE',
    dotClass: 'bg-[#4ae176]',
    badgeClass: 'bg-[#4ae176]/10 text-[#4ae176] border-[#4ae176]/20',
  },
};

export const NPS_COLOR_CLASS: Record<RiskLevel, string> = {
  critico: 'text-red-400',
  observacion: 'text-amber-500',
  saludable: 'text-[#4ae176]',
};

export const RISK_BORDER_CLASS: Record<RiskLevel, string> = {
  critico: 'border-red-500',
  observacion: 'border-amber-500',
  saludable: 'border-[#4ae176]',
};

export const RISK_BG_CLASS: Record<RiskLevel, string> = {
  critico: 'bg-red-500',
  observacion: 'bg-amber-500',
  saludable: 'bg-[#4ae176]',
};

export const RISK_TEXT_CLASS: Record<RiskLevel, string> = {
  critico: 'text-red-500',
  observacion: 'text-amber-500',
  saludable: 'text-[#4ae176]',
};

export const RISK_RING_CLASS: Record<RiskLevel, string> = {
  critico: 'ring-red-500/50',
  observacion: 'ring-amber-500/50',
  saludable: 'ring-[#4ae176]/50',
};

export const RISK_POINTS_CLASS: Record<RiskLevel, string> = {
  critico: 'text-red-500 bg-red-500/10',
  observacion: 'text-amber-500 bg-amber-500/10',
  saludable: 'text-[#4ae176] bg-[#4ae176]/10',
};
