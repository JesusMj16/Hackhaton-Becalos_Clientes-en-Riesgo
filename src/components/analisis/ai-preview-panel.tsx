export function AiPreviewPanel() {
  return (
    <div className="glass-panel sticky top-24 flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-[#434655]/10 shadow-2xl">
      <div className="border-b border-[#434655]/10 p-6">
        <h3 className="font-heading flex items-center gap-2 text-lg font-bold text-white">
          <span className="material-symbols-outlined text-[#b4c5ff]">monitoring</span>
          Preview en Tiempo Real
        </h3>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-[#b4c5ff]/20 blur-[60px]" />
          <div className="relative flex h-32 w-32 items-center justify-center">
            <span
              className="material-symbols-outlined animate-pulse text-6xl text-[#b4c5ff]/40"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              neurology
            </span>
          </div>
        </div>
        <h4 className="mb-2 font-bold text-white">Esperando Datos de Entrada</h4>
        <p className="text-sm leading-relaxed text-[#8d90a0]">
          Comience a llenar el formulario o cargue un archivo para ver una pre-visualización de los
          cálculos de riesgo de AxIA.
        </p>

        <div className="mt-12 w-full space-y-6">
          <div className="relative mx-auto h-4 w-3/4 overflow-hidden rounded-full bg-[#2d3449]/40">
            <div className="absolute inset-y-0 left-0 w-1/4 bg-[#2563eb]/20" />
          </div>
          <div className="mx-auto h-4 w-1/2 rounded-full bg-[#2d3449]/40" />
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="h-16 rounded-xl border border-[#434655]/10 bg-[#2d3449]/20" />
            <div className="h-16 rounded-xl border border-[#434655]/10 bg-[#2d3449]/20" />
          </div>
        </div>
      </div>

      <div className="border-t border-[#434655]/10 bg-[#2d3449]/40 p-6">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#8d90a0]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
            Motor IA: Standby
          </span>
        </div>
      </div>
    </div>
  );
}
