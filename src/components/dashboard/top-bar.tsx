import { IconButton } from './icon-button';

export function TopBar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#434655]/20 bg-[#0b1326]/80 px-8 backdrop-blur-xl">
      <SearchInput />
      <div className="flex items-center gap-4">
        <IconButton icon="notifications" variant="round" />
        <IconButton icon="apps" variant="round" />
        <div className="mx-2 h-8 w-px bg-[#434655]/20" />
        <UserAvatar />
      </div>
    </header>
  );
}

function SearchInput() {
  return (
    <div className="relative w-full max-w-xl">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
        search
      </span>
      <input
        type="text"
        placeholder="Buscar clientes o indicadores..."
        className="w-full rounded-lg border-none bg-[#131b2e] py-2 pl-10 pr-4 text-sm text-[#dae2fd] outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-[#2563eb]"
      />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex items-center gap-3 pl-2">
      <div className="hidden text-right sm:block">
        <p className="text-xs font-bold leading-none text-white">Admin Traxion</p>
        <p className="mt-1 text-[10px] leading-none text-slate-400">Estratega Senior</p>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d3449] text-xs font-bold text-[#b4c5ff] ring-2 ring-[#2563eb]/20">
        AT
      </div>
    </div>
  );
}
