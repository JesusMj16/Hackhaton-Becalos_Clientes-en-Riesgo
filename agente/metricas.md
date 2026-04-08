# Métricas del Agente — Detección Temprana de Clientes en Riesgo
## Hackaton Becalos Traxion Tech Challenge 2026 · Eje 2

---

## 1. Métricas Utilizadas

El agente evalúa **7 métricas operativas** por cliente. Cada una tiene umbrales definidos que generan puntos de riesgo.

| # | Métrica | Unidad | Descripción |
|---|---------|--------|-------------|
| 1 | `nivel_servicio` | % | Porcentaje de viajes completados vs. comprometidos en el contrato |
| 2 | `puntualidad` | % | Porcentaje de llegadas dentro de tolerancia de 5 minutos |
| 3 | `nps` | -100 a 100 | Net Promoter Score del cliente (última medición disponible) |
| 4 | `quejas_abiertas` | entero | Número de quejas sin resolver al momento del análisis |
| 5 | `tendencia_quejas` | entero | Diferencia de quejas abiertas vs. hace 3 meses (positivo = más quejas) |
| 6 | `antiguedad_meses` | entero | Meses desde el inicio del contrato |
| 7 | `facturacion_mensual_mxn` | número | Facturación mensual en pesos mexicanos (referencia de prioridad estratégica) |

---

## 2. Sistema de Puntuación de Riesgo

Cada métrica suma **puntos de riesgo (PR)**. Al final se suman para determinar el nivel de riesgo del cliente.

### Nivel de Servicio

| Valor | Puntos |
|-------|--------|
| >= 95% | 0 — Sin riesgo |
| 88% – 94.9% | 1 — Observación |
| < 88% | 3 — Crítico |

### Puntualidad

| Valor | Puntos |
|-------|--------|
| >= 90% | 0 — Sin riesgo |
| 82% – 89.9% | 1 — Observación |
| < 82% | 3 — Crítico |

### NPS (Net Promoter Score)

| Valor | Puntos |
|-------|--------|
| >= 40 | 0 — Sin riesgo |
| 10 – 39 | 1 — Observación |
| < 10 | 3 — Crítico |

> **Nota:** NPS negativo suma 4 puntos (señal de alerta máxima).

### Quejas Abiertas

| Valor | Puntos |
|-------|--------|
| 0 – 1 | 0 — Sin riesgo |
| 2 – 4 | 1 — Observación |
| >= 5 | 3 — Crítico |

### Tendencia de Quejas (últimos 3 meses)

| Valor | Puntos |
|-------|--------|
| <= 0 (igual o menos quejas) | 0 — Sin riesgo |
| 1 – 2 quejas más | 1 — Observación |
| >= 3 quejas más | 2 — Crítico |

---

## 3. Clasificación Final de Riesgo

| Puntos Totales | Nivel | Color | Acción Sugerida |
|---------------|-------|-------|-----------------|
| 0 – 2 | **Saludable** | Verde | Seguimiento mensual estándar |
| 3 – 5 | **En Observación** | Amarillo | Contacto proactivo en 72 horas |
| 6 o más | **Crítico** | Rojo | Acción inmediata — escalar con dirección |

---

## 4. Factores Modificadores (no suman puntos, ajustan el diagnóstico narrativo)

### Antigüedad del Cliente
- **< 6 meses:** Cliente nuevo. Las quejas tempranas son más preocupantes. Señalar en el diagnóstico como "período de adopción crítico".
- **6 – 24 meses:** Relación en consolidación. El NPS tiene peso normal.
- **> 24 meses:** Relación establecida. Una caída brusca del NPS es señal de alarma mayor. Señalar como "ruptura de confianza en cliente ancla".

### Facturación Mensual
- **< $100,000 MXN:** Cliente estándar.
- **$100,000 – $500,000 MXN:** Cliente estratégico. Añadir urgencia en las recomendaciones.
- **> $500,000 MXN:** Cliente ancla. Escalar automáticamente a gerencia aunque el riesgo sea "En Observación".

---

## 5. Manejo de Datos Faltantes

Si alguna métrica no está disponible en el JSON de entrada:

| Campo faltante | Comportamiento |
|---------------|----------------|
| `nivel_servicio` | Asumir 90% y notificarlo en el diagnóstico |
| `puntualidad` | Asumir 88% y notificarlo |
| `nps` | Asumir 15 (observación baja) y notificarlo |
| `quejas_abiertas` | Asumir 0 |
| `tendencia_quejas` | Asumir 0 |
| `antiguedad_meses` | Asumir 12 meses |
| `facturacion_mensual_mxn` | No aplicar modificador de facturación |

---

## 6. Resumen Rápido de Reglas (para validación humana)

```
SI nivel_servicio < 88% → PR +3
SI puntualidad < 82% → PR +3
SI nps < 0 → PR +4 | SI nps < 10 → PR +3 | SI nps < 40 → PR +1
SI quejas_abiertas >= 5 → PR +3 | SI quejas_abiertas >= 2 → PR +1
SI tendencia_quejas >= 3 → PR +2 | SI tendencia_quejas >= 1 → PR +1

TOTAL >= 6 → CRÍTICO
TOTAL 3-5 → EN OBSERVACIÓN
TOTAL 0-2 → SALUDABLE
```
