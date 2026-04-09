export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-1 px-6 py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]">
          <span className="material-symbols-outlined text-xl text-white">analytics</span>
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white">AxIA Dashboard</h1>
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">
        Digital Command Center
      </span>
    </div>
  );
}
