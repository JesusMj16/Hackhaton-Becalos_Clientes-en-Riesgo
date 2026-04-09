import type { ClientDetail } from '@/types/dashboard';

const clientDetails: ClientDetail[] = [
  {
    id: '1',
    initials: 'GN',
    name: 'Grupo Industrial Norteño',
    sector: 'Sector Industrial',
    sectorIcon: 'precision_manufacturing',
    riskLevel: 'critico',
    score: 15,
    nps: -5,
    revenue: '$680k',
    executiveName: 'Ana Torres',
    executiveTitle: 'Ejecutivo Senior',
    tenureMonths: 36,
    billingLabel: '$680,000 MXN/mes',
    metrics: [
      {
        id: 'm1',
        label: 'Nivel Servicio',
        value: '84%',
        points: 3,
        displayType: 'progress',
        progressPercent: 84,
      },
      {
        id: 'm2',
        label: 'Puntualidad',
        value: '79%',
        points: 3,
        displayType: 'progress',
        progressPercent: 79,
      },
      {
        id: 'm3',
        label: 'NPS',
        value: -5,
        points: 4,
        displayType: 'segments',
        segments: { active: 1, total: 3 },
      },
      {
        id: 'm4',
        label: 'Quejas',
        value: 6,
        points: 3,
        displayType: 'trend',
        trend: '+50% vs mes anterior',
      },
    ],
    totalScoreMetric: {
      score: 15,
      maxScore: 16,
      riskLabel: 'Nivel de Riesgo Extremo',
    },
    diagnosis:
      'Grupo Industrial Norteño presenta un cuadro de deserción inminente impulsado por fallos recurrentes en la cadena de suministro regional. El análisis de sentimiento en los últimos 3 tickets de soporte revela un tono de frustración nivel 8/10, centrífugo a la falta de respuesta en la zona Bajío. La combinación de NPS negativo y aumento súbito en quejas de facturación indica una ruptura de confianza sistémica que requiere intervención ejecutiva inmediata.',
    causes: [
      {
        id: 'c1',
        title: 'Baja puntualidad en ruta Bajío',
        description: 'Retraso promedio de 4.2 horas en las últimas 12 entregas.',
      },
      {
        id: 'c2',
        title: 'Aumento de quejas de facturación',
        description: 'Discrepancias en 4 de las últimas 10 facturas emitidas.',
      },
      {
        id: 'c3',
        title: 'Falta de contacto proactivo',
        description: 'Han pasado 22 días desde la última visita de seguimiento.',
      },
    ],
    mitigationPlan: [
      {
        id: 'mp1',
        timeframe: 'Acción Inmediata (24h)',
        icon: 'flash_on',
        title: 'Llamada de Contención',
        description:
          'Contacto telefónico directo de Dirección Comercial para ofrecer disculpas y asegurar plan de choque.',
      },
      {
        id: 'mp2',
        timeframe: 'Corto Plazo (72h)',
        icon: 'assignment_turned_in',
        title: 'Auditoría de Facturación',
        description:
          'Conciliación total de cuentas y corrección de discrepancias con nota de crédito compensatoria.',
      },
      {
        id: 'mp3',
        timeframe: 'Seguimiento',
        icon: 'update',
        title: 'Revisión de Operativa Bajío',
        description:
          'Reasignación de flota prioritaria y monitoreo GPS en tiempo real para las próximas 10 entregas.',
      },
    ],
    alertTags: ['CRITICAL_CHURN_RISK', 'ANCHOR_CLIENT'],
    alertTitle: 'Alertas Especiales Detectadas',
    alertSubtitle: 'Clasificación: Cliente Ancla y Ruptura de Confianza Detectada',
  },
];

export function getClientDetail(id: string): ClientDetail | undefined {
  return clientDetails.find((c) => c.id === id);
}