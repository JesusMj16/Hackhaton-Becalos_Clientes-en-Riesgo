"use client";

import { useState, useEffect, useCallback } from "react";

/* =============================================
   TRAXIÓN AxIA — Dashboard de Detección Temprana
   de Clientes en Riesgo
   
   - Vista principal con resultados.
   - Formulario en panel deslizante (Drawer).
   - Integrado con Gemini vía n8n Webhook.
   ============================================= */

// ─── Tipos ────────────────────────────────────
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

interface ActionCard {
  action: string;
  deadline: string;
  deadlineColor: string;
  responsible: string;
}

interface AnalysisResult {
  clientName: string;
  riskLevel: "CRÍTICO" | "ALTO" | "MEDIO" | "BAJO";
  riskColor: string;
  diagnosis: string;
  causes: string[];
  actions: ActionCard[];
  specialAlerts: string[];
}

// ─── Webhook del Agente IA (n8n) ─────────────
const N8N_WEBHOOK_URL =
  "https://guillex999.app.n8n.cloud/webhook/43a76ab1-7403-4470-8b42-54d7691365da";

// ─── Valores por defecto del formulario ──────
const defaultFormData: FormData = {
  clientId: "",
  sector: "",
  clientName: "",
  serviceLevel: 50,
  punctuality: 50,
  nps: 0,
  openComplaints: 0,
  complaintTrend: 0,
  tenure: 12,
  monthlyBilling: 0,
};

// ─── Iconos SVG inline ───────────────────────

function IconBrain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1.1 2.9L12 12" />
      <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1.1 2.9L12 12" />
      <path d="M12 12l2.9 2.9A4 4 0 0 1 12 22" />
      <path d="M12 12l-2.9 2.9A4 4 0 0 0 12 22" />
      <path d="M20 9a2 2 0 0 1 0 4" />
      <path d="M4 9a2 2 0 0 0 0 4" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <polygon points="16,8 20,8 23,11 23,16 16,16" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Componentes auxiliares ──────────────────

/** Campo de texto estilizado */
function InputField({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string | number;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 focus:ring-2"
        style={{
          backgroundColor: "var(--surface-200)",
          border: "1px solid var(--card-border)",
          color: "var(--foreground)",
          caretColor: "var(--accent-blue)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-blue)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--card-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

/** Slider con valor en vivo */
function SliderField({
  label,
  id,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (val: number) => void;
}) {
  // Calculate color based on value position
  const ratio = (value - min) / (max - min);
  const getColor = () => {
    if (ratio >= 0.7) return "var(--risk-green)";
    if (ratio >= 0.4) return "var(--risk-yellow)";
    return "var(--risk-red)";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </label>
        <span
          className="text-lg font-bold tabular-nums min-w-[60px] text-right"
          style={{ color: getColor() }}
        >
          {value}
          {unit}
        </span>
      </div>
      <div className="relative">
        <div
          className="absolute top-1/2 left-0 h-1.5 rounded-full -translate-y-1/2 pointer-events-none transition-all duration-200"
          style={{
            width: `${ratio * 100}%`,
            background: `linear-gradient(90deg, ${getColor()}, ${getColor()})`,
            opacity: 0.7,
          }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 w-full"
        />
      </div>
      <div className="flex justify-between text-xs" style={{ color: "var(--text-dim)" }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

/** Campo numérico con stepper */
function NumberField({
  label,
  id,
  value,
  onChange,
  min,
  max,
  prefix = "",
}: {
  label: string;
  id: string;
  value: number;
  onChange: (val: number) => void;
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
      <label htmlFor={id} className="block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: "var(--surface-200)",
            border: "1px solid var(--card-border)",
            color: "var(--text-muted)",
          }}
        >
          −
        </button>
        <div className="flex-1 relative">
          {prefix && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: "var(--text-dim)" }}
            >
              {prefix}
            </span>
          )}
          <input
            id={id}
            type="number"
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (min !== undefined && v < min) return;
              if (max !== undefined && v > max) return;
              onChange(v);
            }}
            className="w-full px-4 py-2.5 rounded-xl text-center text-sm font-semibold outline-none transition-all duration-200 tabular-nums"
            style={{
              backgroundColor: "var(--surface-200)",
              border: "1px solid var(--card-border)",
              color: "var(--foreground)",
              paddingLeft: prefix ? "2.5rem" : undefined,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-blue)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        <button
          type="button"
          onClick={increment}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: "var(--surface-200)",
            border: "1px solid var(--card-border)",
            color: "var(--text-muted)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Componente principal ────────────────────

export default function DashboardPage() {
  // === Estado del formulario ===
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // === Estado de la sección de resultados ===
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // === Estado del slide-over (drawer) ===
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isNewClientOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNewClientOpen]);

  // Abrir el panel y resetear el formulario a valores limpios
  const openNewClient = useCallback(() => {
    setFormData(defaultFormData);
    setIsClosing(false);
    setIsNewClientOpen(true);
  }, []);

  // Cerrar con animación de salida simulada por estado (usando transform en styles)
  const closeNewClient = useCallback(() => {
    if (isAnalyzing) return; // No cerrar mientras analiza
    setIsClosing(true);
    setTimeout(() => {
      setIsNewClientOpen(false);
      setIsClosing(false);
    }, 300); // 300ms transition duration
  }, [isAnalyzing]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handler del botón de análisis — Conexión real al agente AxIA (n8n)
  const handleAnalyze = async () => {
    // 1. Activar estado de carga y limpiar resultados previos
    setIsAnalyzing(true);
    setResults(null);

    try {
      // 2. Mapear formData al payload exacto que espera el webhook
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

      // 3. Llamada al webhook de n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      // 4. Parseo seguro del JSON (evita "Unexpected end of JSON input")
      const rawText = await response.text();
      if (!rawText || rawText.trim().length === 0) {
        throw new Error("La respuesta del agente IA está vacía.");
      }

      const data = JSON.parse(rawText);

      // 5. Mapear respuesta de la IA al formato AnalysisResult
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
        "CRÍTICO": "var(--risk-red)",
        "ALTO": "var(--risk-red)",
        "MEDIO": "var(--risk-yellow)",
        "BAJO": "var(--risk-green)",
      };

      const rawDataArray = Array.isArray(data.recomendaciones) ? data.recomendaciones : 
                           Array.isArray(data.acciones) ? data.acciones : 
                           Array.isArray(data.actions) ? data.actions : [];

      const rawActions: ActionCard[] = rawDataArray.map(
        (acc: any) => {
          // 1. Manejo en caso de que la IA haya devuelto un arreglo strings planos
          if (typeof acc === "string") {
            const lowerString = acc.toLowerCase();
            let deadlineColor = "var(--accent-blue)";
            if (lowerString.includes("inmediat")) deadlineColor = "var(--risk-red)";
            else if (lowerString.includes("corto")) deadlineColor = "var(--risk-yellow)";
            
            return {
              action: acc,
              deadline: lowerString.includes("inmediat") ? "Inmediato" : 
                        lowerString.includes("corto") ? "Corto plazo" : "Por definir",
              deadlineColor,
              responsible: "Gerente / Monitor",
            };
          }

          // 2. Manejo en caso de ser objeto (Asegurar fallback property names)
          const actionText = acc.accion || acc.action || acc.recomendacion || acc.descripcion || "Acción no especificada";
          const plazo = acc.plazo || acc.deadline || acc.tiempo || acc.urgencia || "Por definir";
          const responsable = acc.responsable || acc.responsible || acc.encargado || acc.rol || "Por asignar";
          
          const plazoLower = String(plazo).toLowerCase();
          let deadlineColor = "var(--accent-blue)";
          if (plazoLower.includes("inmediat")) {
            deadlineColor = "var(--risk-red)";
          } else if (plazoLower.includes("corto") || plazoLower.includes("semana")) {
            deadlineColor = "var(--risk-yellow)";
          }

          return {
            action: actionText,
            deadline: plazo,
            deadlineColor,
            responsible: responsable,
          };
        }
      );

      const mappedResult: AnalysisResult = {
        clientName: data.nombre_cliente || formData.clientName,
        riskLevel,
        riskColor: riskColorMap[riskLevel],
        diagnosis: data.diagnostico || data.diagnosis || "Sin diagnóstico disponible.",
        causes: data.causas || data.causes || [],
        actions: rawActions,
        specialAlerts: data.alertas_especiales || data.specialAlerts || [],
      };

      setResults(mappedResult);

      // UX: Cerrar drawer automáticamente para mostrar resultados
      setIsClosing(true);
      setTimeout(() => {
        setIsNewClientOpen(false);
        setIsClosing(false);
      }, 300);

    } catch (error: unknown) {
      // 6. Resultado de error visual seguro para que el componente no colapse
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido al contactar al agente IA.";

      setResults({
        clientName: formData.clientName || "Cliente",
        riskLevel: "CRÍTICO",
        riskColor: "var(--risk-red)",
        diagnosis: `⚠️ No se pudo completar el análisis: ${errorMessage}. Verifica tu conexión a internet e intenta de nuevo.`,
        causes: [
          "No se pudo establecer comunicación con el agente AxIA.",
          "Esto puede deberse a un problema de red, límite de peticiones (Rate Limit), o una respuesta inesperada del servidor.",
        ],
        actions: [
          {
            action: "Verificar la conexión a internet y volver a intentar el análisis.",
            deadline: "Inmediato",
            deadlineColor: "var(--risk-red)",
            responsible: "Usuario",
          },
        ],
        specialAlerts: [
          "🔴 ERROR DE CONEXIÓN — El agente AxIA no respondió correctamente",
        ],
      });
      // Aún si hay error, cerramos el panel para ver el mensaje de error.
      setIsClosing(true);
      setTimeout(() => {
        setIsNewClientOpen(false);
        setIsClosing(false);
      }, 300);

    } finally {
      // 7. Siempre desactivar estado de carga
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ─── Header / Navbar ─── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                boxShadow: "0 4px 12px var(--accent-blue-glow)",
              }}
            >
              <IconTruck />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-none text-white">
                Trax<span style={{ color: "var(--accent-blue-light)" }}>ión</span>
              </h1>
              <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
                Logística Inteligente
              </p>
            </div>
          </div>

          {/* Center title */}
          <div className="hidden md:flex items-center gap-2">
            <div className="text-[var(--text-muted)]"><IconShield /></div>
            <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
              Dashboard de Detección Temprana de Clientes en Riesgo
            </span>
          </div>

          {/* AxIA badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.05))",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              color: "var(--accent-blue-light)",
            }}
          >
            <IconBrain />
            <span className="hidden sm:inline">Agente AxIA</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--risk-green)" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "var(--risk-green)" }} />
            </span>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* ─── Top action bar with + Nuevo Cliente ─── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              🤖
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Resultado del Análisis AxIA</h2>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                Diagnóstico automatizado y plan de acción
              </p>
            </div>
          </div>
          <button
            id="new-client-button"
            type="button"
            onClick={openNewClient}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 15px var(--accent-blue-glow)",
              letterSpacing: "0.03em",
            }}
          >
            <IconPlus />
            Nuevo Cliente
          </button>
        </div>

        {/* ═══════════════════════════════════
            Panel de Resultados IA (full width)
            ═══════════════════════════════════ */}
        <section className="space-y-6">
          {results ? (
            <div className="space-y-5">
              {/* ─── Risk Header ─── */}
              <div
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl"
                style={{ 
                  backgroundColor: "var(--surface-100)", 
                  border: "1px solid rgba(239, 68, 68, 0.3)" 
                }}
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                    Cliente Analizado
                  </p>
                  <h3 className="text-xl font-bold text-white">{results.clientName}</h3>
                </div>

                {/* Traffic light / Semáforo */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl" style={{ backgroundColor: "var(--surface-200)" }}>
                    {/* Green light */}
                    <div
                      className="w-5 h-5 rounded-full transition-all"
                      style={{
                        backgroundColor: results.riskLevel === "BAJO" ? "var(--risk-green)" : "var(--surface-300)",
                        boxShadow: results.riskLevel === "BAJO" ? "0 0 12px var(--risk-green)" : "none",
                      }}
                    />
                    {/* Yellow light */}
                    <div
                      className="w-5 h-5 rounded-full transition-all"
                      style={{
                        backgroundColor: results.riskLevel === "MEDIO" ? "var(--risk-yellow)" : "var(--surface-300)",
                        boxShadow: results.riskLevel === "MEDIO" ? "0 0 12px var(--risk-yellow)" : "none",
                      }}
                    />
                    {/* Red light */}
                    <div
                      className="w-5 h-5 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          results.riskLevel === "CRÍTICO" || results.riskLevel === "ALTO"
                            ? "var(--risk-red)"
                            : "var(--surface-300)",
                        boxShadow:
                          results.riskLevel === "CRÍTICO" || results.riskLevel === "ALTO"
                            ? "0 0 12px var(--risk-red)"
                            : "none",
                      }}
                    />
                  </div>
                  <span
                    className="px-4 py-2 rounded-xl text-sm font-extrabold uppercase tracking-widest animate-pulse"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.15)",
                      color: "var(--risk-red)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    {results.riskLevel}
                  </span>
                </div>
              </div>

              {/* ─── Diagnosis Card ─── */}
              <div
                className="p-5 sm:p-6 rounded-2xl"
                style={{
                  backgroundColor: "var(--surface-100)",
                  border: "1px solid var(--card-border)",
                  borderLeft: "4px solid var(--accent-blue)",
                }}
              >
                <div className="flex items-center gap-2 mb-3 text-[var(--accent-blue-light)]">
                  <IconBrain />
                  <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent-blue-light)" }}>
                    Diagnóstico de AxIA
                  </h4>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {results.diagnosis}
                </p>
              </div>

              {/* ─── Root Causes ─── */}
              <div className="p-5 sm:p-6 rounded-2xl" style={{ backgroundColor: "var(--surface-100)", border: "1px solid var(--card-border)" }}>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-[var(--risk-red)]">
                  <span className="flex items-center gap-2">
                    <IconAlert />
                    Causas Principales Detectadas
                  </span>
                </h4>
                <ul className="space-y-3">
                  {results.causes.map((cause, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.06)",
                        border: "1px solid rgba(239, 68, 68, 0.12)",
                      }}
                    >
                      <span
                        className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.2)",
                          color: "var(--risk-red)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {cause}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ─── Action Recommendation Cards ─── */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-[var(--risk-green)]">
                  <IconShield />
                  Recomendaciones de Acción Preventiva
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.actions.map((action, i) => (
                    <div
                      key={i}
                      className="p-5 space-y-4 rounded-2xl transition-colors hover:border-[var(--accent-blue)]"
                      style={{ backgroundColor: "var(--surface-100)", border: "1px solid var(--card-border)" }}
                    >
                      {/* Action number */}
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{
                            background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)]">
                          ACCIÓN {i + 1}
                        </span>
                      </div>

                      {/* Action text */}
                      <p className="text-sm leading-relaxed text-white">
                        {action.action}
                      </p>

                      {/* Metadata: Deadline + Responsible */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t" style={{ borderColor: "var(--card-border)" }}>
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${action.deadlineColor} 15%, transparent)`,
                            color: action.deadlineColor,
                            border: `1px solid color-mix(in srgb, ${action.deadlineColor} 25%, transparent)`,
                          }}
                        >
                          <IconClock />
                          {action.deadline}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor: "var(--surface-200)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--card-border)",
                          }}
                        >
                          <IconUser />
                          {action.responsible}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Special Alerts ─── */}
              {results.specialAlerts.length > 0 && (
                <div className="space-y-3">
                  {results.specialAlerts.map((alert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(234, 179, 8, 0.06))",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      <span className="text-sm font-semibold" style={{ color: "var(--risk-yellow)" }}>
                        {alert}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ─── Empty state: invita a agregar un cliente ─── */
            <div className="p-16 flex flex-col items-center justify-center text-center space-y-6 rounded-2xl" style={{ backgroundColor: "var(--surface-100)", border: "1px solid var(--card-border)" }}>
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
                  border: "1px solid rgba(37, 99, 235, 0.2)",
                }}
              >
                🤖
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Bienvenido al Dashboard AxIA</h3>
                <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-dim)" }}>
                  Comienza ingresando las métricas de un cliente en el panel para generar un diagnóstico de riesgo automatizado con Inteligencia Artificial.
                </p>
              </div>
              <button
                type="button"
                onClick={openNewClient}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                  color: "white",
                  border: "none",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 15px var(--accent-blue-glow)",
                }}
              >
                <IconPlus />
                Nuevo Cliente
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ═══════════════════════════════════════════════
          SLIDE-OVER DRAWER: Panel de Métricas
          ═══════════════════════════════════════════════ */}
      {isNewClientOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop overlay */}
          <div
            onClick={closeNewClient}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              opacity: isClosing ? 0 : 1
            }}
          />

          {/* Drawer panel */}
          <aside
            className="relative w-full max-w-lg flex flex-col h-full transition-transform duration-300 ease-in-out"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.97)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid var(--card-border)",
              boxShadow: "-8px 0 40px rgba(0, 0, 0, 0.5)",
              transform: isClosing ? "translateX(100%)" : "translateX(0)"
            }}
          >
            {/* ─── Drawer Header ─── */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                  }}
                >
                  📊
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Panel de Métricas</h2>
                  <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                    Ingrese los indicadores del cliente para el análisis
                  </p>
                </div>
              </div>
              <button
                id="close-drawer-button"
                type="button"
                onClick={closeNewClient}
                disabled={isAnalyzing}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--surface-200)",
                  border: "1px solid var(--card-border)",
                  color: "var(--text-muted)",
                }}
                title="Cerrar"
              >
                <IconClose />
              </button>
            </div>

            {/* ─── Drawer Body (scrollable) ─── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Client info */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="ID del Cliente"
                  id="clientId"
                  value={formData.clientId}
                  onChange={(v) => updateField("clientId", v)}
                  placeholder="CLT-000"
                />
                <InputField
                  label="Sector"
                  id="sector"
                  value={formData.sector}
                  onChange={(v) => updateField("sector", v)}
                  placeholder="Logística"
                />
              </div>

              <InputField
                label="Nombre de la Entidad"
                id="clientName"
                value={formData.clientName}
                onChange={(v) => updateField("clientName", v)}
                placeholder="Razón Social Completa"
              />

              {/* Divider */}
              <div className="border-t" style={{ borderColor: "var(--card-border)" }} />

              {/* Sliders */}
              <SliderField
                label="Nivel de Servicio"
                id="serviceLevel"
                value={formData.serviceLevel}
                min={0}
                max={100}
                unit="%"
                onChange={(v) => updateField("serviceLevel", v)}
              />

              <SliderField
                label="Puntualidad"
                id="punctuality"
                value={formData.punctuality}
                min={0}
                max={100}
                unit="%"
                onChange={(v) => updateField("punctuality", v)}
              />

              <SliderField
                label="NPS — Net Promoter Score"
                id="nps"
                value={formData.nps}
                min={-100}
                max={100}
                unit=""
                onChange={(v) => updateField("nps", v)}
              />

              {/* Divider */}
              <div className="border-t" style={{ borderColor: "var(--card-border)" }} />

              {/* Number fields */}
              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Quejas Abiertas"
                  id="openComplaints"
                  value={formData.openComplaints}
                  onChange={(v) => updateField("openComplaints", v)}
                  min={0}
                />
                <NumberField
                  label="Tendencia Quejas"
                  id="complaintTrend"
                  value={formData.complaintTrend}
                  onChange={(v) => updateField("complaintTrend", v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label="Antigüedad (meses)"
                  id="tenure"
                  value={formData.tenure}
                  onChange={(v) => updateField("tenure", v)}
                  min={0}
                />
                <NumberField
                  label="Facturación Mensual"
                  id="monthlyBilling"
                  value={formData.monthlyBilling}
                  onChange={(v) => updateField("monthlyBilling", v)}
                  min={0}
                  prefix="$"
                />
              </div>
            </div>

            {/* ─── Drawer Footer: CTA Button ─── */}
            <div
              className="px-6 py-4 border-t"
              style={{ borderColor: "var(--card-border)" }}
            >
              <button
                id="analyze-button"
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 px-6 rounded-2xl text-base font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: isAnalyzing
                    ? "var(--surface-300)"
                    : "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                  color: "white",
                  border: "none",
                  letterSpacing: "0.05em",
                }}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                    </svg>
                    Analizando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <IconBrain />
                    Analizar Riesgo con AxIA
                  </span>
                )}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer
        className="border-t py-4 text-center mt-auto"
        style={{
          borderColor: "var(--card-border)",
          backgroundColor: "rgba(15, 23, 42, 0.5)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>
          © 2026 Traxión — Plataforma AxIA de Inteligencia Artificial · Detección Temprana de Riesgo v1.0
        </p>
      </footer>
    </div>
  );
}
