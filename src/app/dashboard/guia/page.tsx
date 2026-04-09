export default function GuiaPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-white">
          Guía de Uso: Plataforma AxIA
        </h2>
        <p className="mt-2 text-[#c3c6d7]">
          Documentación y referencia rápida sobre el funcionamiento y los niveles de riesgo del sistema de IA.
        </p>
      </div>

      <div className="space-y-6">
        {/* Sección 1: Propósito */}
        <div className="overflow-hidden rounded-xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#b4c5ff] to-[#2563eb] text-white">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">Propósito de AxIA</h3>
          </div>
          <p className="text-[#8d90a0] leading-relaxed">
            AxIA es un sistema avanzado de Inteligencia Artificial enfocado en la detección temprana de riesgos en clientes logísticos. Su objetivo principal es analizar un conjunto de métricas y permitir a los ejecutivos tomar acciones preventivas precisas antes de que la relación comercial se deteriore o el cliente se vuelva vulnerable.
          </p>
        </div>

        {/* Sección 2: ¿Cómo Funciona? */}
        <div className="overflow-hidden rounded-xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#7c3aed] to-[#4f46e5] text-white">
              <span className="material-symbols-outlined">settings_suggest</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">¿Cómo funciona?</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#2563eb] font-bold">1</div>
              <div>
                <p className="font-bold text-white mb-1">Ingreso de Métricas</p>
                <p className="text-sm text-[#8d90a0]">Ingresa métricas y medidores operativos clave del cliente (como el NPS, el Nivel de Servicio, Puntualidad, etc.) en el cajón lateral de "Nuevo Cliente".</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/20 text-[#7c3aed] font-bold">2</div>
              <div>
                <p className="font-bold text-white mb-1">Procesamiento Inteligente</p>
                <p className="text-sm text-[#8d90a0]">El agente interactivo de AxIA procesa los datos operativos usando inferencia avanzada y modelos predictivos en tiempo real para evaluar el estado actual del cliente.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eab308]/20 text-[#eab308] font-bold">3</div>
              <div>
                <p className="font-bold text-white mb-1">Diagnóstico Automatizado</p>
                <p className="text-sm text-[#8d90a0]">Se genera un diagnóstico automatizado comprensible, que incluye un plan de acción sugerido con recomendaciones concretas y asignación de tiempos de cumplimiento probables.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Arquitectura Técnica y Motor de IA */}
        <div className="overflow-hidden rounded-xl border border-[#38bdf8]/40 bg-[#131b2e] shadow-[0_0_30px_rgba(56,189,248,0.15)] p-6 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#38bdf8] to-[#0284c7] text-white">
              <span className="material-symbols-outlined">memory</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">Arquitectura del Agente AxIA</h3>
          </div>

          <div className="mb-8 relative z-10">
            <img 
              src="/image_c8c5c3.png" 
              alt="Arquitectura del Agente AxIA en n8n" 
              className="w-full object-cover border border-[#434655] rounded-xl shadow-xl"
            />
            <p className="text-xs text-center text-[#8d90a0] mt-3 font-medium">
              Captura de pantalla real del flujo de orquestación en n8n que conecta el Dashboard con Google Gemini 1.5
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/20 hover:border-[#38bdf8]/40 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Agente de IA Funcional</p>
                <p className="text-sm text-[#8d90a0]">El sistema no usa datos simulados, se conecta en tiempo real a un agente inteligente.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/20 hover:border-[#38bdf8]/40 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/15 text-[#f59e0b]">
                <span className="material-symbols-outlined">account_tree</span>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Orquestación</p>
                <p className="text-sm text-[#8d90a0]">Desarrollado utilizando flujos automatizados con n8n.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/20 hover:border-[#38bdf8]/40 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6]">
                <span className="material-symbols-outlined">sync_alt</span>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Comunicación</p>
                <p className="text-sm text-[#8d90a0]">Integración bidireccional mediante Webhooks (POST request desde el cliente, procesamiento y respuesta JSON estructurada).</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-[#0b1326] border border-[#434655]/20 hover:border-[#38bdf8]/40 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/15 text-[#3b82f6]">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Modelo LLM</p>
                <p className="text-sm text-[#8d90a0]">Procesamiento cognitivo impulsado por el modelo Google Gemini 1.5, encargado de evaluar las métricas, emitir el diagnóstico y generar el plan de acción preventivo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 4: Semáforo de Riesgo */}
        <div className="overflow-hidden rounded-xl border border-[#434655]/20 bg-[#131b2e] shadow-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#10b981] to-[#047857] text-white">
              <span className="material-symbols-outlined">traffic</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">Semáforo de Riesgo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Crítico */}
            <div className="p-5 rounded-xl bg-[#0b1326] border border-[#ef4444]/30 relative overflow-hidden group transition-colors hover:border-[#ef4444]/50">
              <div className="absolute inset-0 bg-[#ef4444]/5 transition-colors group-hover:bg-[#ef4444]/15"></div>
              <div className="relative z-10 flex flex-col gap-2">
                <span className="flex w-min items-center justify-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">CRÍTICO</span>
                <p className="text-sm text-[#8d90a0] leading-relaxed">
                  <strong className="text-white block mt-2 mb-1">Riesgo Alto de Pérdida</strong>
                  Requiere atención y acciones inmediatas. Hay claras deficiencias operativas que amenazan fuertemente la retención de la cuenta.
                </p>
              </div>
            </div>
            {/* Medio / Alto */}
            <div className="p-5 rounded-xl bg-[#0b1326] border border-[#eab308]/30 relative overflow-hidden group transition-colors hover:border-[#eab308]/50">
              <div className="absolute inset-0 bg-[#eab308]/5 transition-colors group-hover:bg-[#eab308]/15"></div>
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="flex w-min items-center justify-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30">MEDIO</span>
                  <span className="flex w-min items-center justify-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">ALTO</span>
                </div>
                <p className="text-sm text-[#8d90a0] leading-relaxed">
                  <strong className="text-white block mt-2 mb-1">Requiere Observación</strong>
                  El cliente experimenta fricciones que, de no atenderse a corto o mediano plazo, podrían escalarse a un nivel crítico.
                </p>
              </div>
            </div>
            {/* Bajo */}
            <div className="p-5 rounded-xl bg-[#0b1326] border border-[#4ae176]/30 relative overflow-hidden group transition-colors hover:border-[#4ae176]/50">
              <div className="absolute inset-0 bg-[#4ae176]/5 transition-colors group-hover:bg-[#4ae176]/15"></div>
              <div className="relative z-10 flex flex-col gap-2">
                <span className="flex w-min items-center justify-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#4ae176]/20 text-[#4ae176] border border-[#4ae176]/30">BAJO</span>
                <p className="text-sm text-[#8d90a0] leading-relaxed">
                  <strong className="text-white block mt-2 mb-1">Cliente Saludable</strong>
                  La cuenta está operando dentro de los parámetros esperados. La relación comercial es sana y estable en este momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
