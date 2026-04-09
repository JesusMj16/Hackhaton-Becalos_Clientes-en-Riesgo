import { notFound } from "next/navigation";
import { getClientDetail } from "@/data/client-details";
import { ClientBreadcrumb } from "@/components/dashboard/client-detail/breadcrumb";
import { ClientProfileHeader } from "@/components/dashboard/client-detail/profile-header";
import { MetricsSection } from "@/components/dashboard/client-detail/metrics-section";
import { DiagnosisPanel } from "@/components/dashboard/client-detail/diagnosis-panel";
import { CausesList } from "@/components/dashboard/client-detail/causes-list";
import { MitigationSection } from "@/components/dashboard/client-detail/mitigation-section";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientDetail(id);

  if (!client) notFound();

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
    </>
  );
}
