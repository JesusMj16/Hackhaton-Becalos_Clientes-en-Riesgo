import type { NavItem } from '@/types/dashboard';

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/dashboard/clientes', icon: 'groups', label: 'Clientes' },
  { href: '/dashboard/guia', icon: 'menu_book', label: 'Guía de Uso' },
];
