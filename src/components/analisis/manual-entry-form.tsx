'use client';

import { useState } from 'react';

interface FormState {
  clientId: string;
  sector: string;
  name: string;
  serviceLevel: number;
  punctuality: number;
  nps: number;
  complaints: string;
  tenure: string;
  billingTrend: string;
  annualBilling: string;
}

const SECTORS = ['Logística', 'Manufactura', 'Retail', 'Tecnología', 'Educativo', 'Turístico', 'Corporativo'];

const INITIAL_STATE: FormState = {
  clientId: '',
  sector: 'Logística',
  name: '',
  serviceLevel: 85,
  punctuality: 92,
  nps: 7.5,
  complaints: '',
  tenure: '',
  billingTrend: '',
  annualBilling: '',
};

export function ManualEntryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function handleChange(field: keyof FormState, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
        <div className="grid grid-cols-2 gap-4">
          <FormField label="ID Cliente">
            <input
              className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              placeholder="TX-0000"
              value={form.clientId}
              onChange={(e) => handleChange('clientId', e.target.value)}
            />
          </FormField>
          <FormField label="Sector">
            <select
              className="w-full appearance-none rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              value={form.sector}
              onChange={(e) => handleChange('sector', e.target.value)}
            >
              {SECTORS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
        </div>

        <FormField label="Nombre de la Entidad">
          <input
            className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
            placeholder="Nombre completo"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </FormField>

        <div className="space-y-6 pt-4">
          <RangeField
            label="Nivel de Servicio"
            value={form.serviceLevel}
            display={`${form.serviceLevel}%`}
            min={0} max={100}
            onChange={(v) => handleChange('serviceLevel', v)}
          />
          <RangeField
            label="Puntualidad"
            value={form.punctuality}
            display={`${form.punctuality}%`}
            min={0} max={100}
            onChange={(v) => handleChange('punctuality', v)}
          />
          <RangeField
            label="NPS (Net Promoter Score)"
            value={form.nps}
            display={form.nps.toString()}
            min={-10} max={100} step={1}
            onChange={(v) => handleChange('nps', v)}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4">
          <FormField label="Quejas Mensuales">
            <input
              type="number"
              className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              placeholder="0"
              value={form.complaints}
              onChange={(e) => handleChange('complaints', e.target.value)}
            />
          </FormField>
          <FormField label="Antigüedad (Años)">
            <input
              type="number"
              className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              placeholder="1"
              value={form.tenure}
              onChange={(e) => handleChange('tenure', e.target.value)}
            />
          </FormField>
          <FormField label="Tendencia Facturación">
            <input
              className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              placeholder="+12.5%"
              value={form.billingTrend}
              onChange={(e) => handleChange('billingTrend', e.target.value)}
            />
          </FormField>
          <FormField label="Facturación Anual">
            <input
              className="w-full rounded-t-lg border-b border-[#434655] bg-[#222a3d] p-3 text-sm text-[#dae2fd] transition-all focus:border-[#b4c5ff] focus:outline-none"
              placeholder="$0.00"
              value={form.annualBilling}
              onChange={(e) => handleChange('annualBilling', e.target.value)}
            />
          </FormField>
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
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-[#dae2fd]">{label}</label>
        <span className="text-xs font-bold text-[#b4c5ff]">{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#2d3449] accent-[#b4c5ff]"
      />
    </div>
  );
}
