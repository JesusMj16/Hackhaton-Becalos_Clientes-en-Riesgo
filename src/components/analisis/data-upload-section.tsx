import { UploadHistoryItem } from './upload-history-item';

const recentUploads = [
  { filename: 'clientes_q3_logistics.csv', timestamp: 'Hace 2 horas' },
  { filename: 'data_predictive_global.json', timestamp: 'Ayer, 14:20' },
];

export function DataUploadSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-1 flex-col rounded-xl bg-[#131b2e] p-6 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg bg-[#007e37]/10 p-2 text-[#4ae176]">
            <span className="material-symbols-outlined">upload_file</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white">Carga de Datos</h3>
        </div>

        <div className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#434655]/30 p-12 text-center transition-colors hover:border-[#b4c5ff]/50">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2d3449] transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-4xl text-[#b4c5ff]">cloud_upload</span>
          </div>
          <h4 className="mb-2 text-lg font-bold text-white">Arrastra tus archivos aquí</h4>
          <p className="mb-6 text-sm text-[#8d90a0]">Formatos soportados: .JSON, .CSV, .XLSX</p>
          <button className="rounded-full border border-[#b4c5ff] px-6 py-2 text-xs font-bold text-[#b4c5ff] transition-colors hover:bg-[#b4c5ff]/10">
            Seleccionar Archivo
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8d90a0]">
            Últimas Cargas
          </h4>
          <div className="space-y-2">
            {recentUploads.map((u) => (
              <UploadHistoryItem key={u.filename} filename={u.filename} timestamp={u.timestamp} />
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
