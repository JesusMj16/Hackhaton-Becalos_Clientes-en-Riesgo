# Especificación de Métricas

## Detección Temprana de Clientes en Riesgo · Traxion

## Contexto de referencia

Los umbrales definidos en este documento se fundamentan en la norma **ISO 9001:2015** e **ISO 39001:2012**, ambas certificaciones activas de Traxion. En ausencia de SLAs contractuales públicos, ISO 9001 establece como estándar de industria para transporte corporativo certificado un cumplimiento de servicio igual o superior al 95%. Todo umbral por debajo de ese valor indica desviación del estándar.

---

## Bloque XML — Definición de Métricas

```xml
<metricas>

  <metrica id="nivel_servicio">
    <nombre>Nivel de Servicio</nombre>
    <descripcion>
      Porcentaje de viajes efectivamente completados sobre el total de viajes
      comprometidos en el contrato durante el mes en curso.
      Fórmula: (viajes_completados / viajes_comprometidos) * 100
    </descripcion>
    <unidad>porcentaje — valor entre 0.0 y 100.0</unidad>
    <fuente>Reporte operativo mensual del sistema de gestión de flota</fuente>
    <peso_en_riesgo>ALTO — indicador contractual directo</peso_en_riesgo>
    <umbrales>
      <nivel estado="SALUDABLE"  puntos="0">valor >= 95.0</nivel>
      <nivel estado="OBSERVACION" puntos="1">valor >= 88.0 AND valor &lt; 95.0</nivel>
      <nivel estado="CRITICO"    puntos="3">valor &lt; 88.0</nivel>
    </umbrales>
    <justificacion>
      ISO 9001:2015 establece 95% como umbral mínimo de conformidad para
      servicios de transporte certificados. Por debajo de 88% existe
      incumplimiento contractual explícito en la mayoría de contratos
      corporativos del sector.
    </justificacion>
  </metrica>

  <metrica id="puntualidad">
    <nombre>Puntualidad</nombre>
    <descripcion>
      Porcentaje de llegadas realizadas dentro de la tolerancia de 5 minutos
      respecto al horario acordado, sobre el total de servicios del mes.
      Fórmula: (llegadas_a_tiempo / total_servicios) * 100
    </descripcion>
    <unidad>porcentaje — valor entre 0.0 y 100.0</unidad>
    <fuente>Registro GPS del sistema de rastreo de unidades</fuente>
    <peso_en_riesgo>ALTO — impacto directo en operación del cliente</peso_en_riesgo>
    <umbrales>
      <nivel estado="SALUDABLE"   puntos="0">valor >= 90.0</nivel>
      <nivel estado="OBSERVACION" puntos="1">valor >= 82.0 AND valor &lt; 90.0</nivel>
      <nivel estado="CRITICO"     puntos="3">valor &lt; 82.0</nivel>
    </umbrales>
    <justificacion>
      ISO 39001:2012 (seguridad vial) requiere planificación de rutas que
      garantice 90%+ de cumplimiento horario. Por debajo de 82%, las demoras
      impactan la operación del cliente (entrada de turnos, horarios escolares,
      llegadas de vuelos) generando costos directos para el cliente.
    </justificacion>
  </metrica>

  <metrica id="nps">
    <nombre>Net Promoter Score (NPS)</nombre>
    <descripcion>
      Indicador de lealtad del cliente basado en la pregunta:
      "¿Con qué probabilidad recomendaría el servicio de Traxion?"
      Escala 0-10 por respondente. NPS = % Promotores (9-10) - % Detractores (0-6).
      Rango resultante: -100 a 100.
    </descripcion>
    <unidad>entero — valor entre -100 y 100</unidad>
    <fuente>Encuesta de satisfacción trimestral aplicada al contacto principal del cliente</fuente>
    <peso_en_riesgo>MEDIO — indicador subjetivo pero predictor de churn validado</peso_en_riesgo>
    <umbrales>
      <nivel estado="SALUDABLE"   puntos="0">valor >= 40</nivel>
      <nivel estado="OBSERVACION" puntos="1">valor >= 10 AND valor &lt;= 39</nivel>
      <nivel estado="CRITICO"     puntos="3">valor >= 0 AND valor &lt;= 9</nivel>
      <nivel estado="CRITICO"     puntos="4">valor &lt; 0 (NPS negativo)</nivel>
    </umbrales>
    <regla_especial>
      NPS negativo recibe 4 puntos en lugar de 3 porque indica que el cliente
      está activamente difundiendo una percepción negativa del servicio,
      lo que afecta la reputación de Traxion con otros prospectos del mismo sector.
    </regla_especial>
    <justificacion>
      Estándar internacional de NPS para B2B en servicios de transporte:
      40+ = Excelente, 10-39 = Aceptable (zona pasiva), bajo 10 = Riesgo de churn,
      negativo = Churn inminente. Referencia: Bain y Company, creadores del NPS.
    </justificacion>
  </metrica>

  <metrica id="quejas_abiertas">
    <nombre>Quejas Abiertas</nombre>
    <descripcion>
      Número total de quejas formales registradas por el cliente que aún no
      tienen resolución confirmada al momento del análisis.
      Una queja se considera "abierta" desde su registro hasta que el cliente
      confirma satisfacción con la solución.
    </descripcion>
    <unidad>entero — valor >= 0</unidad>
    <fuente>Sistema CRM de gestión de quejas y seguimiento de tickets</fuente>
    <peso_en_riesgo>ALTO — indica problemas no resueltos visibles para el cliente</peso_en_riesgo>
    <umbrales>
      <nivel estado="SALUDABLE"   puntos="0">valor = 0 OR valor = 1</nivel>
      <nivel estado="OBSERVACION" puntos="1">valor >= 2 AND valor &lt;= 4</nivel>
      <nivel estado="CRITICO"     puntos="3">valor >= 5</nivel>
    </umbrales>
    <justificacion>
      Una queja abierta no es necesariamente señal de riesgo — los problemas
      ocurren. El riesgo surge cuando se acumulan sin resolución. Más de 4 quejas
      sin resolver indica un patrón sistémico o falta de seguimiento del ejecutivo
      de cuenta. Con 5+, el cliente percibe abandono por parte de Traxion.
    </justificacion>
  </metrica>

  <metrica id="tendencia_quejas">
    <nombre>Tendencia de Quejas (últimos 3 meses)</nombre>
    <descripcion>
      Diferencia entre el número de quejas abiertas actuales y el número de
      quejas abiertas registradas hace exactamente 3 meses.
      Fórmula: quejas_abiertas_hoy - quejas_abiertas_hace_3_meses
      Valor positivo = más quejas que antes (deterioro).
      Valor negativo = menos quejas que antes (mejora).
      Valor cero = sin cambio.
    </descripcion>
    <unidad>entero — puede ser negativo, cero o positivo</unidad>
    <fuente>Diferencial calculado desde el histórico del sistema CRM</fuente>
    <peso_en_riesgo>MEDIO — indica dirección del deterioro, no el estado actual</peso_en_riesgo>
    <umbrales>
      <nivel estado="SALUDABLE"   puntos="0">valor &lt;= 0 (igual o menos quejas)</nivel>
      <nivel estado="OBSERVACION" puntos="1">valor = 1 OR valor = 2</nivel>
      <nivel estado="CRITICO"     puntos="2">valor >= 3</nivel>
    </umbrales>
    <justificacion>
      Esta métrica complementa a quejas_abiertas para detectar tendencias.
      Un cliente con 4 quejas abiertas que antes tenía 7 está mejorando (tendencia -3).
      Un cliente con 2 quejas que antes tenía 0 está deteriorándose (tendencia +2).
      La tendencia positiva sostenida es predictor de churn más fuerte que el valor absoluto.
    </justificacion>
  </metrica>

  <metrica id="antiguedad_meses">
    <nombre>Antigüedad del Cliente</nombre>
    <descripcion>
      Número de meses transcurridos desde la firma del primer contrato activo
      entre el cliente y Traxion hasta la fecha del análisis.
    </descripcion>
    <unidad>entero — valor >= 0</unidad>
    <fuente>Fecha de inicio de contrato en el sistema de gestión comercial</fuente>
    <peso_en_riesgo>MODIFICADOR — no genera puntos, ajusta el diagnóstico narrativo</peso_en_riesgo>
    <umbrales>
      <nivel tipo="ADOPCION"    rango="valor &lt; 6">
        Período de adopción crítico. Las quejas y caídas de NPS en esta etapa
        tienen mayor peso narrativo: indican riesgo de cancelación antes del
        primer año. Señalar explícitamente en el diagnóstico.
      </nivel>
      <nivel tipo="CONSOLIDACION" rango="valor >= 6 AND valor &lt;= 24">
        Relación en desarrollo. Comportamiento esperado normal.
      </nivel>
      <nivel tipo="ANCLA"       rango="valor > 24">
        Cliente ancla con relación consolidada. Una caída brusca del NPS
        o incremento de quejas en esta etapa indica ruptura de confianza grave.
        Señalar como "cliente ancla en riesgo" en el diagnóstico.
      </nivel>
    </umbrales>
  </metrica>

  <metrica id="facturacion_mensual_mxn">
    <nombre>Facturación Mensual</nombre>
    <descripcion>
      Monto total facturado al cliente en el mes más reciente, expresado en
      pesos mexicanos (MXN). Refleja el impacto económico directo de perder
      este cliente para Traxion.
    </descripcion>
    <unidad>número decimal — valor en pesos mexicanos (MXN), mayor a 0</unidad>
    <fuente>Sistema de facturación y cuentas por cobrar</fuente>
    <peso_en_riesgo>MODIFICADOR — no genera puntos, determina prioridad de escalación</peso_en_riesgo>
    <umbrales>
      <nivel tipo="ESTANDAR"   rango="valor &lt; 100000">
        Seguimiento estándar por el ejecutivo de cuenta asignado.
      </nivel>
      <nivel tipo="ESTRATEGICO" rango="valor >= 100000 AND valor &lt; 500000">
        Cliente estratégico. Añadir urgencia en las recomendaciones.
        El ejecutivo de cuenta debe priorizar este cliente en su agenda semanal.
      </nivel>
      <nivel tipo="ANCLA"      rango="valor >= 500000">
        Cliente ancla. Escalar automáticamente al Gerente de Unidad de Negocio
        incluso si el nivel de riesgo es EN_OBSERVACION. Incluir alerta especial
        en el diagnóstico.
      </nivel>
    </umbrales>
  </metrica>

</metricas>
```

---

## Tabla de Puntuación Consolidada (referencia rápida)

| Métrica           | SALUDABLE (0 pts) | EN OBSERVACIÓN (1 pt) | CRÍTICO (3 pts) | Excepción            |
| ----------------- | ----------------- | --------------------- | --------------- | -------------------- |
| Nivel de servicio | ≥ 95.0%           | ≥ 88.0% y < 95.0%     | < 88.0%         | —                    |
| Puntualidad       | ≥ 90.0%           | ≥ 82.0% y < 90.0%     | < 82.0%         | —                    |
| NPS               | ≥ 40              | ≥ 10 y ≤ 39           | ≥ 0 y ≤ 9       | NPS negativo = 4 pts |
| Quejas abiertas   | 0 o 1             | 2, 3 o 4              | ≥ 5             | —                    |
| Tendencia quejas  | ≤ 0               | 1 o 2                 | ≥ 3             | Máximo 2 pts         |

**Puntuación máxima posible: 16 puntos**

---

## Tabla de Clasificación Final

| Puntos Totales | Nivel          | Código           | Acción Mínima Requerida                |
| -------------- | -------------- | ---------------- | -------------------------------------- |
| 0, 1 o 2       | Saludable      | `SALUDABLE`      | Seguimiento mensual estándar           |
| 3, 4 o 5       | En Observación | `EN_OBSERVACION` | Contacto proactivo en máximo 72 horas  |
| 6 o más        | Crítico        | `CRITICO`        | Acción inmediata — escalar en 24 horas |

---

## Reglas de Desempate

Cuando dos clientes tienen el mismo puntaje total, se prioriza por:

1. **Mayor facturación mensual**: impacto económico
2. **NPS más bajo**: predictor más fuerte de churn
3. **Mayor tendencia de quejas**: velocidad del deterioro

---

## Manejo de Datos Faltantes

Si el campo no está presente en el JSON de entrada o su valor es `null`:

| Campo                     | Valor por defecto | Razón                                                          |
| ------------------------- | ----------------- | -------------------------------------------------------------- |
| `nivel_servicio`          | `90.0`            | Conservador: asume operación aceptable pero no excelente       |
| `puntualidad`             | `88.0`            | Conservador: coloca al cliente en zona de observación          |
| `nps`                     | `15`              | Conservador: zona pasiva baja                                  |
| `quejas_abiertas`         | `0`               | Beneficio de la duda: sin evidencia, sin penalización          |
| `tendencia_quejas`        | `0`               | Sin tendencia conocida, se trata como estable                  |
| `antiguedad_meses`        | `12`              | Se trata como cliente en consolidación                         |
| `facturacion_mensual_mxn` | `null`            | No aplicar modificador de facturación ni alertas de escalación |

**Siempre** documentar los campos faltantes en el array `datos_faltantes` del output.

---

## Notas Anti-sesgo

1. **NPS no es el único predictor.** Un cliente puede tener NPS bajo porque la encuesta fue aplicada justo después de un incidente resuelto. El agente debe considerar todas las métricas en conjunto, nunca clasificar basándose en una sola.

2. **Clientes nuevos no se penalizan igual.** Un cliente con 3 meses de antigüedad que tiene 2 quejas abiertas puede estar en proceso de ajuste de rutas, no necesariamente en riesgo real. La antigüedad como modificador narrativo evita falsos positivos críticos.

3. **La tendencia supera al valor absoluto en clientes con historial.** Un cliente con NPS de 30 que hace 6 meses tenía NPS de 55 está en deterioro severo aunque el número no parezca crítico. El agente debe señalarlo en el diagnóstico.

4. **Facturación no determina riesgo, determina urgencia.** Un cliente pequeño con score 8 es tan crítico como uno grande con score 8. La diferencia es quién actúa y en qué plazo.
