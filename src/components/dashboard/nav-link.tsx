import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from '@/types/components';

export function NavLink({ item, isActive }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200',
        isActive
          ? 'bg-[#222a3d] text-[#b4c5ff]'
          : 'text-slate-400 hover:bg-[#222a3d] hover:text-white',
      )}
    >
      <span className="material-symbols-outlined">{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}
