

export function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-white/5 p-4">
      <div className="mx-2 rounded-xl bg-[#222a3d] p-4">
        <div className="mb-1 flex items-center ">
          <span className="text-xs text-[#dae2fd] bg-[#689e77] w-full rounded-3xl p-2 text-center">
            AxIA Activo
          </span>
        </div>
        <p className="text-[10px] font-normal text-slate-500">
          Sincronizado: hace 2m
        </p>
      </div>
    </div>
  );
}
