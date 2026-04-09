import type { NavItem } from '@/types/dashboard';

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/dashboard/clientes', icon: 'groups', label: 'Clientes' },
  { href: '/dashboard/analisis', icon: 'analytics', label: 'Análisis IA' },
  { href: '/dashboard/chat', icon: 'chat', label: 'Chat AxIA' },
  { href: '/dashboard/configuracion', icon: 'settings', label: 'Configuración' },
];
