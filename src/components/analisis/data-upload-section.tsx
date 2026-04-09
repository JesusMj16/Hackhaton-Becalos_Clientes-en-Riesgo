'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

const ACCEPTED_TYPES = ['.json', '.csv', '.xlsx', '.xls'];
const ACCEPTED_MIME  = [
  'application/json',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

interface UploadEntry {
  filename: string;
  timestamp: string;
}

const INITIAL_UPLOADS: UploadEntry[] = [
  { filename: 'clientes_q3_logistics.csv', timestamp: 'Hace 2 horas' },
  { filename: 'data_predictive_global.json', timestamp: 'Ayer, 14:20' },
];

function isValidFile(file: File): boolean {
  const ext  = '.' + file.name.split('.').pop()?.toLowerCase();
  const mime = file.type;
  return ACCEPTED_TYPES.includes(ext) || ACCEPTED_MIME.includes(mime);
}

export function DataUploadSection() {
  const [uploads, setUploads] = useState<UploadEntry[]>(INITIAL_UPLOADS);
  const [error, setError]     = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError(null);
    if (!isValidFile(file)) {
      setError(`Tipo no soportado: "${file.name}". Use ${ACCEPTED_TYPES.join(', ')}.`);
      return;
    }
    setUploads((prev) => [
      { filename: file.name, timestamp: 'Justo ahora' },
      ...prev.slice(0, 4),
    ]);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-1 flex-col rounded-xl bg-[#131b2e] p-6 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg bg-[#007e37]/10 p-2 text-[#4ae176]">
            <span className="material-symbols-outlined">upload_file</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white">Carga de Datos</h3>
        </div>

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all',
            dragging
              ? 'border-[#b4c5ff]/70 bg-[#b4c5ff]/5'
              : 'border-[#434655]/30 hover:border-[#b4c5ff]/50',
          )}
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2d3449] transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-4xl text-[#b4c5ff]">cloud_upload</span>
          </div>
          <h4 className="mb-2 text-lg font-bold text-white">
            {dragging ? 'Suelta el archivo aquí' : 'Arrastra tus archivos aquí'}
          </h4>
          <p className="mb-6 text-sm text-[#8d90a0]">
            Formatos soportados: {ACCEPTED_TYPES.map((t) => t.toUpperCase()).join(', ')}
          </p>
          <span className="rounded-full border border-[#b4c5ff] px-6 py-2 text-xs font-bold text-[#b4c5ff] transition-colors hover:bg-[#b4c5ff]/10">
            Seleccionar Archivo
          </span>
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={onInputChange}
          className="hidden"
        />

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#ef4444]/20 bg-[#ef4444]/5 p-3">
            <span className="material-symbols-outlined shrink-0 text-lg text-[#ef4444]">error</span>
            <p className="text-xs text-[#ef4444]">{error}</p>
          </div>
        )}

        {/* Upload history */}
        <div className="mt-8 space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
            Últimas Cargas
          </h4>
          <div className="space-y-2">
            {uploads.map((u, i) => (
              <UploadHistoryItem key={`${u.filename}-${i}`} filename={u.filename} timestamp={u.timestamp} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-xl border border-[#434655]/10 bg-[#2d3449]/30 p-5">
        <span className="material-symbols-outlined text-[#b4c5ff]">info</span>
        <p className="text-xs leading-relaxed text-[#c3c6d7]">
          AxIA procesará hasta 10,000 registros por carga. Los resultados se generarán en un reporte
          interactivo con semáforos de riesgo automatizados.
        </p>
      </div>
    </section>
  );
}

function UploadHistoryItem({ filename, timestamp }: UploadEntry) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#222a3d]/40 p-3">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#4ae176]">check_circle</span>
        <span className="truncate text-xs text-[#dae2fd]">{filename}</span>
      </div>
      <span className="shrink-0 text-[10px] text-[#8d90a0]">{timestamp}</span>
    </div>
  );
}
