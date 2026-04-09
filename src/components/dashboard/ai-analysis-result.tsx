import type { AnalysisResult } from './new-client-drawer';

export function AiAnalysisResult({ results }: { results: AnalysisResult }) {
  if (!results) return null;

  return (
    <div className="space-y-5">
      {/* ─── Risk Header ─── */}
      <div className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#131b2e] border ${
        results.riskLevel === 'CRÍTICO' || results.riskLevel === 'ALTO' ? 'border-red-500/50' : 
        results.riskLevel === 'MEDIO' ? 'border-yellow-500/50' : 
        'border-emerald-500/50'
      }`}>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8d90a0]">
            Riesgo del Cliente Analizado
          </p>
          <h3 className="text-xl font-bold text-white">{results.clientName}</h3>
        </div>

        {/* Traffic light / Semáforo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0b1326]">
            {/* Green light (Izquierda) */}
            <div
              className="w-5 h-5 rounded-full transition-all"
              style={{
                backgroundColor: results.riskLevel === "BAJO" ? "#22c55e" : "#334155",
                boxShadow: results.riskLevel === "BAJO" ? "0 0 12px #22c55e" : "none",
              }}
            />
            {/* Yellow light (Centro) */}
            <div
              className="w-5 h-5 rounded-full transition-all"
              style={{
                backgroundColor: results.riskLevel === "MEDIO" ? "#eab308" : "#334155",
                boxShadow: results.riskLevel === "MEDIO" ? "0 0 12px #eab308" : "none",
              }}
            />
            {/* Red light (Derecha) */}
            <div
              className="w-5 h-5 rounded-full transition-all"
              style={{
                backgroundColor:
                  results.riskLevel === "CRÍTICO" || results.riskLevel === "ALTO"
                    ? "#ef4444"
                    : "#334155",
                boxShadow:
                  results.riskLevel === "CRÍTICO" || results.riskLevel === "ALTO"
                    ? "0 0 12px #ef4444"
                    : "none",
              }}
            />
          </div>
          <span className={`px-4 py-2 rounded-xl text-sm font-extrabold uppercase tracking-widest animate-pulse border ${
            results.riskLevel === 'CRÍTICO' || results.riskLevel === 'ALTO' ? 'bg-[#ef4444]/15 text-red-400 border-[#ef4444]/30' :
            results.riskLevel === 'MEDIO' ? 'bg-[#eab308]/15 text-yellow-400 border-[#eab308]/30' :
            'bg-[#4ae176]/15 text-emerald-400 border-[#4ae176]/30'
          }`}>
            {results.riskLevel}
          </span>
        </div>
      </div>

      {/* ─── Diagnosis Card ─── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-[#434655]/20 border-left-[4px] border-l-[#2563eb]">
        <div className="flex items-center gap-2 mb-3 text-[#b4c5ff]">
          <span className="material-symbols-outlined text-lg">psychology</span>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#b4c5ff]">
            Diagnóstico de AxIA
          </h4>
        </div>
        <p className="text-sm leading-relaxed text-[#dae2fd]">
          {results.diagnosis}
        </p>
      </div>

      {/* ─── Root Causes ─── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#131b2e] border border-[#434655]/20">
        <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
          results.riskLevel === 'CRÍTICO' || results.riskLevel === 'ALTO' ? 'text-red-400' :
          results.riskLevel === 'MEDIO' ? 'text-yellow-400' : 'text-emerald-400'
        }`}>
          <span className="material-symbols-outlined text-lg">warning</span>
          Causas Principales Detectadas
        </h4>
        <ul className="space-y-3">
          {results.causes.map((cause, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 bg-[#ef4444]/5 border border-[#ef4444]/10"
            >
              <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#ef4444]/20 text-[#ef4444]">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-[#dae2fd]">
                {cause}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Action Recommendation Cards ─── */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#4ae176]">
          <span className="material-symbols-outlined text-lg">verified_user</span>
          Recomendaciones de Acción Preventiva
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {results.actions.map((action, i) => (
            <div
              key={i}
              className="p-5 space-y-4 rounded-2xl transition-colors hover:border-[#2563eb] bg-[#131b2e] border border-[#434655]/20"
            >
              {/* Action number */}
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-linear-to-br from-[#b4c5ff] to-[#2563eb]">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#8d90a0]">
                  Acción {i + 1}
                </span>
              </div>

              {/* Action text */}
              <p className="text-sm leading-relaxed text-white">
                {action.action}
              </p>

              {/* Metadata: Deadline + Responsible */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#434655]/20">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-transparent border border-current"
                  style={{ color: action.deadlineColor }}
                >
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {action.deadline}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#222a3d] text-[#8d90a0] border border-[#434655]/20">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  {action.responsible}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Special Alerts ─── */}
      {results.specialAlerts && results.specialAlerts.length > 0 && (
        <div className="space-y-3">
          {results.specialAlerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-linear-to-r from-[#ef4444]/10 to-[#eab308]/10 border border-[#ef4444]/20"
            >
              <span className="text-sm font-semibold text-[#eab308]">
                {alert}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
