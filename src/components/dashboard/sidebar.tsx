'use client';

import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/nav';
import { SidebarHeader } from './sidebar-header';
import { NavLink } from './nav-link';
import { SidebarFooter } from './sidebar-footer';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-[#131b2e] font-heading text-sm font-bold tracking-wide">
      <SidebarHeader />
      <nav className="flex-1 space-y-1 px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} item={item} isActive={pathname === item.href} />
        ))}
      </nav>
      <SidebarFooter />
    </aside>
  );
}
