import { ManualEntryForm } from '@/components/analisis/manual-entry-form';
import { DataUploadSection } from '@/components/analisis/data-upload-section';
import { AiPreviewPanel } from '@/components/analisis/ai-preview-panel';

export default function AnalisisPage() {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-8 lg:flex-row">
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-white">
            Nuevo Análisis de Riesgo
          </h2>
          <p className="mt-2 text-[#c3c6d7]">
            Ingrese los parámetros manualmente o cargue un archivo masivo para procesamiento con AxIA.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ManualEntryForm />
          <DataUploadSection />
        </div>
      </div>
      <aside className="w-full lg:w-96">
        <AiPreviewPanel />
      </aside>
    </div>
  );
}
