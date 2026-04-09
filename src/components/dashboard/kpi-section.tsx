import type { KpiSectionProps } from "@/types/components";
import { KpiCard } from "./kpi-card";
import { RiskDistributionCard } from "./risk-distribution-card";

export function KpiSection({
  total,
  critical,
  watching,
  healthy,
}: KpiSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <KpiCard
        label="Total Clientes"
        value={total}
        icon="group"
        iconBgClassName="bg-[#2563eb]/10"
        iconColorClassName="text-[#b4c5ff]"
        trend={{
          icon: "trending_up",
          label: "+12% vs mes anterior",
          className: "text-[#4ae176]",
        }}
      />
      <KpiCard
        label="Críticos"
        value={critical}
        valueClassName="text-[#EF4444]"
        icon="warning"
        iconBgClassName="bg-red-500/10"
        iconColorClassName="text-red-400"
        trend={{
          icon: "warning_amber",
          label: "Requiere acción inmediata",
          className: "text-red-400",
        }}
      />
      <KpiCard
        label="En Observación"
        value={watching}
        valueClassName="text-[#EAB308]"
        icon="visibility"
        iconBgClassName="bg-amber-500/10"
        iconColorClassName="text-amber-400"
        trend={{
          icon: "trending_flat",
          label: "Tendencia de riesgo leve",
          className: "text-amber-400",
        }}
      />
      <RiskDistributionCard
        healthy={healthy}
        watching={watching}
        critical={critical}
      />
    </section>
  );
}
