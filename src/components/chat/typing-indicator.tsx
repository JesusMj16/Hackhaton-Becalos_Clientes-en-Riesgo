export function TypingIndicator() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#131b2e]">
        <span className="material-symbols-outlined text-sm text-[#b4c5ff]">smart_toy</span>
      </div>
      <div className="flex items-center gap-1 rounded-full border border-[#434655]/10 bg-[#222a3d]/40 px-4 py-2">
        <span className="text-[11px] italic text-[#8d90a0]">AxIA está escribiendo</span>
        <div className="ml-2 flex gap-1">
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#b4c5ff]" />
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#b4c5ff] delay-75" />
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#b4c5ff] delay-150" />
        </div>
      </div>
    </div>
  );
}
