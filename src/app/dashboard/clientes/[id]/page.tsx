import { notFound } from 'next/navigation';
import { getClientDetail } from '@/data/client-details';
import type {
  CriticoClientDetail,
  ObservacionClientDetail,
  SaludableClientDetail,
} from '@/types/dashboard';
import { CriticoLayout } from '@/components/dashboard/client-detail/layouts/critico-layout';
import { ObservacionLayout } from '@/components/dashboard/client-detail/layouts/observacion-layout';
import { SaludableLayout } from '@/components/dashboard/client-detail/layouts/saludable-layout';

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientDetail(id);

  if (!client) notFound();

  if (client.riskLevel === 'critico') {
    return <CriticoLayout client={client as CriticoClientDetail} />;
  }

  if (client.riskLevel === 'observacion') {
    return <ObservacionLayout client={client as ObservacionClientDetail} />;
  }

  return <SaludableLayout client={client as SaludableClientDetail} />;
}
