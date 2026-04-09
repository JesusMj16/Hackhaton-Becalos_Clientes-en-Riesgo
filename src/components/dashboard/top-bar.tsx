import { GlobalSearch } from './global-search';
import { NotificationsDropdown } from './notifications-dropdown';
import { AppsDropdown } from './apps-dropdown';

export function TopBar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#434655]/20 bg-[#0b1326]/80 px-8 backdrop-blur-xl">
      <GlobalSearch />
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <AppsDropdown />
        <div className="mx-2 h-8 w-px bg-[#434655]/20" />
        <UserAvatar />
      </div>
    </header>
  );
}

function UserAvatar() {
  return (
    <div className="flex items-center gap-3 pl-2">
      <div className="hidden text-right sm:block">
        <p className="text-xs font-bold leading-none text-white">Admin Traxion</p>
        <p className="mt-1 text-[10px] leading-none text-[#8d90a0]">Estratega Senior</p>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d3449] text-xs font-bold text-[#b4c5ff] ring-2 ring-[#2563eb]/20">
        AT
      </div>
    </div>
  );
}
