'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AnalysisResult } from '@/components/dashboard/new-client-drawer';

export interface HistoryItem {
  formData: any;
  result: AnalysisResult;
}

interface AnalysisContextType {
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  activeFormData: any;
  setActiveFormData: React.Dispatch<React.SetStateAction<any>>;
  results: AnalysisResult | null;
  setResults: React.Dispatch<React.SetStateAction<AnalysisResult | null>>;
  handleLoadAnalysis: (item: HistoryItem) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeFormData, setActiveFormData] = useState<any>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleLoadAnalysis = (item: HistoryItem) => {
    setActiveFormData(item.formData);
    setResults(item.result);
    
    // Navegar a la ruta raíz del dashboard para asegurar que los resultados sean visibles
    router.push('/dashboard');
    
    // Ejecutar scroll después de la intención de navegación
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnalysisContext.Provider value={{ history, setHistory, activeFormData, setActiveFormData, results, setResults, handleLoadAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  return context;
}
