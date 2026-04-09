export function PageHeader() {
  return (
    <section className="flex flex-col items-end justify-between gap-4 md:flex-row">
      <div>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white">
          Vista General del Portafolio
        </h2>
        <p className="mt-1 text-[#c3c6d7]">
          Panel de control de salud y riesgo de clientes en tiempo real.
        </p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-[#222a3d] px-4 py-2 text-sm font-semibold text-[#dae2fd] transition-colors hover:bg-[#31394d]">
          <span className="material-symbols-outlined text-lg">download</span>
          Exportar
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#b4c5ff] to-[#2563eb] px-4 py-2 text-sm font-bold text-[#002a78] shadow-lg shadow-[#2563eb]/20 transition-all hover:brightness-110 active:scale-95">
          <span className="material-symbols-outlined text-lg">add</span>
          Nuevo Cliente
        </button>
      </div>
    </section>
  );
}
