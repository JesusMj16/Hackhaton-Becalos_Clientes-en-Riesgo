'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormState {
  clientId: string;
  sector: string;
  name: string;
  serviceLevel: number;
  punctuality: number;
  nps: number;
  complaints: number;
  tenure: number;
  billingTrend: number;
  annualBilling: number;
}

const SECTORS = [
  'Logística', 'Manufactura', 'Retail', 'Tecnología',
  'Educativo', 'Turístico', 'Corporativo',
];

const INITIAL_STATE: FormState = {
  clientId:     '',
  sector:       'Logística',
  name:         '',
  serviceLevel: 85,
  punctuality:  92,
  nps:          7,
  complaints:   0,
  tenure:       1,
  billingTrend: 0,
  annualBilling: 0,
};

export function ManualEntryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  return (
    <section className="rounded-xl bg-[#131b2e] p-6 shadow-2xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-[#2563eb]/10 p-2 text-[#b4c5ff]">
          <span className="material-symbols-outlined">edit_note</span>
        </div>
        <h3 className="font-heading text-xl font-bold text-white">Entrada Manual</h3>
      </div>

      <div className="space-y-6">
        {/* ID + Sector */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="ID Cliente">
            <input
              className={inputClass}
              placeholder="TX-0000"
              value={form.clientId}
              onChange={(e) => set('clientId', e.target.value)}
            />
          </FormField>
          <FormField label="Sector">
            <select
              className={cn(inputClass, 'appearance-none')}
              value={form.sector}
              onChange={(e) => set('sector', e.target.value)}
            >
              {SECTORS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
        </div>

        {/* Nombre */}
        <FormField label="Nombre de la Entidad">
          <input
            className={inputClass}
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </FormField>

        {/* Sliders */}
        <div className="space-y-6 pt-4">
          <RangeField
            label="Nivel de Servicio"
            value={form.serviceLevel}
            display={`${form.serviceLevel}%`}
            min={0} max={100}
            onChange={(v) => set('serviceLevel', v)}
          />
          <RangeField
            label="Puntualidad"
            value={form.punctuality}
            display={`${form.punctuality}%`}
            min={0} max={100}
            onChange={(v) => set('punctuality', v)}
          />
          <RangeField
            label="NPS (Net Promoter Score)"
            value={form.nps}
            display={form.nps.toString()}
            min={-10} max={100} step={1}
            onChange={(v) => set('nps', v)}
          />
        </div>

        {/* Steppers */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          <StepperField
            label="Quejas Mensuales"
            value={form.complaints}
            min={0} max={999} step={1}
            onChange={(v) => set('complaints', clamp(v, 0, 999))}
            suffix="quejas"
          />
          <StepperField
            label="Antigüedad (Años)"
            value={form.tenure}
            min={0} max={50} step={0.5}
            decimals={1}
            onChange={(v) => set('tenure', clamp(v, 0, 50))}
            suffix="años"
          />
          <StepperField
            label="Tendencia Facturación"
            value={form.billingTrend}
            min={-100} max={100} step={0.5}
            decimals={1}
            onChange={(v) => set('billingTrend', clamp(v, -100, 100))}
            suffix="%"
            allowNegative
          />
          <StepperField
            label="Facturación Anual (MXN)"
            value={form.annualBilling}
            min={0} max={99_999_999} step={1000}
            onChange={(v) => set('annualBilling', clamp(v, 0, 99_999_999))}
            prefix="$"
          />
        </div>

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-linear-to-r from-[#b4c5ff] to-[#2563eb] py-4 font-heading font-black text-[#002a78] shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">psychology</span>
          ANALIZAR CON AXIA
        </button>
      </div>
    </section>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none';

// ── Sub-components ───────────────────────────────────────────────────────────

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
        {label}
      </label>
      {children}
    </div>
  );
}

function RangeField({
  label, value, display, min, max, step = 1, onChange,
}: {
  label: string; value: number; display: string;
  min: number; max: number; step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-[#dae2fd]">{label}</label>
        <span className="text-xs font-bold text-[#b4c5ff]">{display}</span>
      </div>
      <div className="flex items-center gap-3">
        <StepBtn onClick={() => onChange(Math.max(min, value - step))} icon="remove" />
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-[#2d3449] accent-[#b4c5ff]"
        />
        <StepBtn onClick={() => onChange(Math.min(max, value + step))} icon="add" />
      </div>
    </div>
  );
}

function StepperField({
  label, value, min, max, step, decimals = 0, prefix, suffix, allowNegative = false, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  decimals?: number; prefix?: string; suffix?: string;
  allowNegative?: boolean; onChange: (v: number) => void;
}) {
  const formatted = value.toFixed(decimals);
  const display   = `${prefix ?? ''}${Number(formatted).toLocaleString('es-MX')}${suffix ? ` ${suffix}` : ''}`;

  return (
    <FormField label={label}>
      <div className="flex items-center overflow-hidden rounded-t-lg border-b border-[#434655] bg-[#222a3d] transition-all focus-within:border-[#b4c5ff]">
        <StepBtn
          onClick={() => onChange(Math.max(min, parseFloat((value - step).toFixed(decimals))))}
          icon="remove"
          className="rounded-none border-r border-[#434655]/50 px-3 py-3 text-[#8d90a0] hover:text-[#b4c5ff]"
        />
        <div className="flex flex-1 flex-col items-center py-1">
          <span className="text-sm font-bold text-[#dae2fd]">{display}</span>
          {allowNegative && (
            <span className={cn('text-[9px] font-bold', value > 0 ? 'text-[#4ae176]' : value < 0 ? 'text-[#ef4444]' : 'text-[#8d90a0]')}>
              {value > 0 ? 'Crecimiento' : value < 0 ? 'Decremento' : 'Sin cambio'}
            </span>
          )}
        </div>
        <StepBtn
          onClick={() => onChange(Math.min(max, parseFloat((value + step).toFixed(decimals))))}
          icon="add"
          className="rounded-none border-l border-[#434655]/50 px-3 py-3 text-[#8d90a0] hover:text-[#b4c5ff]"
        />
      </div>
    </FormField>
  );
}

function StepBtn({
  onClick, icon, className,
}: {
  onClick: () => void; icon: string; className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2d3449] text-[#8d90a0] transition-all hover:bg-[#b4c5ff]/10 hover:text-[#b4c5ff] active:scale-90',
        className,
      )}
    >
      <span className="material-symbols-outlined text-base">{icon}</span>
    </button>
  );
}
