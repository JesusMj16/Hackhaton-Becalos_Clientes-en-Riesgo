'use client';

import { useState, useEffect } from 'react';

export interface ActionCard {
  action: string;
  deadline: string;
  deadlineColor: string;
  responsible: string;
}

export interface AnalysisResult {
  clientName: string;
  riskLevel: "CRÍTICO" | "ALTO" | "MEDIO" | "BAJO";
  riskColor: string;
  diagnosis: string;
  causes: string[];
  actions: ActionCard[];
  specialAlerts: string[];
}

interface FormData {
  clientId: string;
  sector: string;
  clientName: string;
  serviceLevel: number;
  punctuality: number;
  nps: number;
  openComplaints: number;
  complaintTrend: number;
  tenure: number;
  monthlyBilling: number;
}

const defaultFormData: FormData = {
  clientId: '',
  sector: 'Logística',
  clientName: '',
  serviceLevel: 80,
  punctuality: 80,
  nps: 40,
  openComplaints: 0,
  complaintTrend: 0,
  tenure: 12,
  monthlyBilling: 0,
};

interface NewClientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: AnalysisResult, formData?: any) => void;
  initialFormData?: any;
}

export function NewClientDrawer({ isOpen, onClose, onAnalysisComplete, initialFormData }: NewClientDrawerProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(initialFormData || defaultFormData);
      setIsClosing(false);
      requestAnimationFrame(() => {
        setTimeout(() => setShowContent(true), 10);
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setShowContent(false);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const payload = {
        cliente_id: formData.clientId,
        sector: formData.sector,
        nombre_cliente: formData.clientName,
        nivel_servicio: formData.serviceLevel,
        puntualidad: formData.punctuality,
        nps: formData.nps,
        quejas_abiertas: formData.openComplaints,
        tendencia_quejas: formData.complaintTrend,
        antiguedad_meses: formData.tenure,
        facturacion_mensual_mxn: formData.monthlyBilling,
      };

      const response = await fetch("https://guillex999.app.n8n.cloud/webhook/43a76ab1-7403-4470-8b42-54d7691365da", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const rawText = await response.text();
      if (!rawText || rawText.trim().length === 0) {
        throw new Error("La respuesta del agente IA está vacía.");
      }

      const data = JSON.parse(rawText);

      const riskRaw = (data.nivel_riesgo || data.riskLevel || "MEDIO").toUpperCase().trim();
      const riskMap: Record<string, AnalysisResult["riskLevel"]> = {
        "CRÍTICO": "CRÍTICO",
        "CRITICO": "CRÍTICO",
        "ALTO": "ALTO",
        "MEDIO": "MEDIO",
        "BAJO": "BAJO",
      };
      const riskLevel: AnalysisResult["riskLevel"] = riskMap[riskRaw] || "MEDIO";

      const riskColorMap: Record<AnalysisResult["riskLevel"], string> = {
        "CRÍTICO": "#ef4444",
        "ALTO": "#ef4444",
        "MEDIO": "#eab308",
        "BAJO": "#4ae176",
      };

      const rawDataArray = Array.isArray(data.recomendaciones) ? data.recomendaciones : 
                           Array.isArray(data.acciones) ? data.acciones : 
                           Array.isArray(data.actions) ? data.actions : [];

      // Tablas de Fallbacks (Reglas de Negocio)
      const plazoFallbacks = {
        'CRÍTICO': 'Inmediato (24H)',
        'ALTO': 'Inmediato (24H)',
        'MEDIO': 'Urgente (72H)',
        'BAJO': 'Siguiente Visita'
      };

      const responsibleRoles = {
        'CRÍTICO': ['Dirección de Operaciones', 'Gerencia Comercial', 'Líder de Soporte Técnico'],
        'ALTO': ['Gerencia de Operaciones', 'Gerencia Comercial', 'Coordinador de Cuentas'],
        'MEDIO': ['Gerencia Comercial', 'Ejecutivo de Cuenta Sr.', 'Coordinador de Soporte'],
        'BAJO': ['Ejecutivo de Cuenta Sr.', 'Ejecutivo de Cuenta Jr.']
      };

      const rawActions: ActionCard[] = rawDataArray.map((acc: any, i: number) => {
        const isString = typeof acc === "string";
        const actionText = isString ? acc : (acc.accion || acc.action || acc.recomendacion || acc.descripcion || "Acción Crítica requerida");
        
        let plazo = isString ? "" : (acc.plazo || acc.deadline || acc.tiempo || acc.urgencia || "");
        if (!plazo || plazo.toLowerCase() === "por definir") {
          plazo = plazoFallbacks[riskLevel];
        }
        
        let responsable = isString ? "" : (acc.responsable || acc.responsible || acc.encargado || acc.rol || "");
        if (!responsable || responsable.toLowerCase() === "por asignar") {
          const roles = responsibleRoles[riskLevel];
          responsable = roles[i % roles.length];
        }

        const plazoLower = String(plazo).toLowerCase();
        let deadlineColor = "#2563eb";
        if (plazoLower.includes("inmediat") || plazoLower.includes("urgente") || plazoLower.includes("crític") || plazoLower.includes("alto") || riskLevel === 'CRÍTICO' || riskLevel === 'ALTO') {
          deadlineColor = "#ef4444";
        } else if (plazoLower.includes("corto") || plazoLower.includes("semana") || riskLevel === 'MEDIO') {
          deadlineColor = "#eab308";
        }

        return {
          action: actionText,
          deadline: plazo,
          deadlineColor,
          responsible: responsable,
        };
      });

      if (rawActions.length === 0) {
        rawActions.push({
          action: "Revisión inmediata de cuenta a profundidad",
          deadline: plazoFallbacks[riskLevel],
          deadlineColor: riskLevel === 'CRÍTICO' || riskLevel === 'ALTO' ? "#ef4444" : riskLevel === 'MEDIO' ? "#eab308" : "#2563eb",
          responsible: responsibleRoles[riskLevel][0],
        });
      }

      const result: AnalysisResult = {
        clientName: data.nombre_cliente || formData.clientName,
        riskLevel,
        riskColor: riskColorMap[riskLevel],
        diagnosis: data.diagnostico || data.diagnosis || "Sin diagnóstico disponible.",
        causes: data.causas || data.causes || [],
        actions: rawActions,
        specialAlerts: data.alertas_especiales || data.specialAlerts || [],
      };

      onAnalysisComplete(result, formData);
      handleClose();

    } catch (error: any) {
      onAnalysisComplete({
        clientName: formData.clientName || "Cliente",
        riskLevel: "CRÍTICO",
        riskColor: "#f97316", // Naranja suave/acento rojo
        diagnosis: "⚠️ El motor de análisis AxIA no se encuentra disponible temporalmente debido a una interrupción en la conexión. Por favor, reintente en unos momentos.",
        causes: [
          "Interrupción en el enlace de datos",
          "Tiempo de espera del servidor agotado"
        ],
        actions: [
          {
            action: "Verificar estado del servicio y reintentar análisis",
            deadline: "Inmediato",
            deadlineColor: "#ef4444",
            responsible: "Usuario"
          }
        ],
        specialAlerts: ["ERROR DE COMUNICACIÓN CON EL SERVIDOR"],
      });
      handleClose();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop overlay */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          isClosing || !showContent ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`relative flex h-full w-full max-w-2xl flex-col bg-[#0b1326] border-l border-[#434655]/20 shadow-[-8px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out ${
          isClosing || !showContent ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#434655]/20 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#b4c5ff] to-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Panel de Métricas
              </h2>
              <p className="text-[11px] text-[#8d90a0]">
                Ingrese los indicadores del cliente
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#222a3d] text-[#8d90a0] transition-colors hover:bg-[#31394d] hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wide text-[#8d90a0]">
                ID del Cliente
              </label>
              <input
                className="w-full rounded-xl border border-[#434655]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#dae2fd] transition-all focus:border-[#2563eb] focus:outline-none"
                placeholder="CLT-000"
                value={formData.clientId}
                onChange={(e) => updateField('clientId', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wide text-[#8d90a0]">
                Sector
              </label>
              <input
                className="w-full rounded-xl border border-[#434655]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#dae2fd] transition-all focus:border-[#2563eb] focus:outline-none"
                placeholder="Logística"
                value={formData.sector}
                onChange={(e) => updateField('sector', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wide text-[#8d90a0]">
              Nombre de la Entidad
            </label>
            <input
              className="w-full rounded-xl border border-[#434655]/30 bg-[#131b2e] px-4 py-3 text-sm text-[#dae2fd] transition-all focus:border-[#2563eb] focus:outline-none"
              placeholder="Razón Social Completa"
              value={formData.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
            />
          </div>

          <div className="border-t border-[#434655]/20 pt-6 space-y-6">
            <SliderField
              label="Nivel de Servicio"
              value={formData.serviceLevel}
              min={0}
              max={100}
              unit="%"
              onChange={(v) => updateField('serviceLevel', v)}
            />
            <SliderField
              label="Puntualidad"
              value={formData.punctuality}
              min={0}
              max={100}
              unit="%"
              onChange={(v) => updateField('punctuality', v)}
            />
            <SliderField
              label="NPS — Net Promoter Score"
              value={formData.nps}
              min={-100}
              max={100}
              unit=""
              onChange={(v) => updateField('nps', v)}
            />
          </div>

          <div className="border-t border-[#434655]/20 pt-6 grid grid-cols-2 gap-4">
            <NumberField
              label="Quejas Abiertas"
              value={formData.openComplaints}
              min={0}
              onChange={(v) => updateField('openComplaints', v)}
            />
            <NumberField
              label="Tendencia Quejas"
              value={formData.complaintTrend}
              onChange={(v) => updateField('complaintTrend', v)}
            />
            <NumberField
              label="Antigüedad (meses)"
              value={formData.tenure}
              min={0}
              onChange={(v) => updateField('tenure', v)}
            />
            <NumberField
              label="Facturación Mensual"
              value={formData.monthlyBilling}
              min={0}
              prefix="$"
              onChange={(v) => updateField('monthlyBilling', v)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#434655]/20 p-6 bg-[#0b1326] relative z-10">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#b4c5ff] to-[#2563eb] px-6 py-4 text-base font-black text-[#002a78] uppercase tracking-wide transition-all shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-[#002a78]" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                </svg>
                Analizando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">psychology</span>
                Analizar Riesgo con AxIA
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}

// ── Helpers ──

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const ratio = (value - min) / (max - min);
  const getColor = () => {
    if (ratio >= 0.7) return '#4ae176'; // green
    if (ratio >= 0.4) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wide text-[#8d90a0]">
          {label}
        </label>
        <span
          className="text-lg font-bold tabular-nums"
          style={{ color: getColor() }}
        >
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <div
          className="absolute top-1/2 left-0 h-1.5 rounded-full -translate-y-1/2 pointer-events-none transition-all duration-200"
          style={{
            width: `${ratio * 100}%`,
            background: `linear-gradient(90deg, ${getColor()}, ${getColor()})`,
            opacity: 0.9,
            boxShadow: `0 0 10px ${getColor()}40`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 w-full h-1.5 appearance-none rounded-full bg-[#131b2e] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#8d90a0]">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  prefix = '',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
}) {
  const decrement = () => {
    const newVal = value - 1;
    if (min !== undefined && newVal < min) return;
    onChange(newVal);
  };
  const increment = () => {
    const newVal = value + 1;
    if (max !== undefined && newVal > max) return;
    onChange(newVal);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-wide text-[#8d90a0] block h-8">
        {label}
      </label>
      <div className="flex items-center overflow-hidden rounded-xl border border-[#434655]/30 bg-[#131b2e] focus-within:border-[#2563eb] transition-all">
        <button
          type="button"
          onClick={decrement}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#8d90a0] transition-colors hover:text-[#b4c5ff] hover:bg-[#222a3d] border-r border-[#434655]/30"
        >
          <span className="material-symbols-outlined text-lg">remove</span>
        </button>
        <div className="relative flex-1">
          {prefix && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8d90a0]">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (min !== undefined && v < min) return;
              if (max !== undefined && v > max) return;
              onChange(v);
            }}
            className="w-full h-10 bg-transparent text-center text-sm font-bold text-[#dae2fd] outline-none tabular-nums"
            style={{ paddingLeft: prefix ? '1.5rem' : '0' }}
          />
        </div>
        <button
          type="button"
          onClick={increment}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#8d90a0] transition-colors hover:text-[#b4c5ff] hover:bg-[#222a3d] border-l border-[#434655]/30"
        >
          <span className="material-symbols-outlined text-lg">add</span>
        </button>
      </div>
    </div>
  );
}
