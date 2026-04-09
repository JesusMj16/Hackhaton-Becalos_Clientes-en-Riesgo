'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { KpiSection } from '@/components/dashboard/kpi-section';
import { ClientsTable } from '@/components/dashboard/clients-table';
import { DashboardFooter } from '@/components/dashboard/dashboard-footer';
import { clients } from '@/data/clients';
import { AiAnalysisResult } from '@/components/dashboard/ai-analysis-result';
import type { AnalysisResult } from '@/components/dashboard/new-client-drawer';

const { criticalCount, watchingCount, healthyCount } = clients.reduce(
  (acc, c) => {
    if (c.riskLevel === 'critico') acc.criticalCount++;
    else if (c.riskLevel === 'observacion') acc.watchingCount++;
    else acc.healthyCount++;
    return acc;
  },
  { criticalCount: 0, watchingCount: 0, healthyCount: 0 },
);

import { useAnalysisContext } from '@/context/AnalysisContext';

export default function DashboardPage() {
  const { history, setHistory, activeFormData, setActiveFormData, results, setResults, handleLoadAnalysis } = useAnalysisContext();

  const handleAnalysisComplete = (res: AnalysisResult, formData?: any) => {
    setResults(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (formData) {
      setHistory(prev => [{ formData, result: res }, ...prev].slice(0, 4));
    }
  };



  const dynCritical = history.filter(item => item.result.riskLevel === 'CRÍTICO').length;
  const dynWatching = history.filter(item => item.result.riskLevel === 'ALTO' || item.result.riskLevel === 'MEDIO').length;
  const dynHealthy = history.filter(item => item.result.riskLevel === 'BAJO').length;
  const totalLength = history.length;

  return (
    <>
      <PageHeader onAnalysisComplete={handleAnalysisComplete} initialFormData={activeFormData} />
      
      {results && (
        <div className="bg-[#0b1326] p-6 rounded-2xl border border-[#434655]/30 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-[#434655]/20 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[#7c3aed] to-[#4f46e5] text-white">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Resultado del Análisis AxIA</h2>
              <p className="text-xs text-[#8d90a0]">Diagnóstico automatizado y plan de acción</p>
            </div>
          </div>
          <AiAnalysisResult results={results} />
        </div>
      )}

      <KpiSection
        total={totalLength}
        critical={totalLength === 0 ? 0 : dynCritical}
        watching={totalLength === 0 ? 0 : dynWatching}
        healthy={totalLength === 0 ? 0 : dynHealthy}
      />
      <ClientsTable history={history} />
      <DashboardFooter />
    </>
  );
}
