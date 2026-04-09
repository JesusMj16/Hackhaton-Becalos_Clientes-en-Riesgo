import { Sidebar } from '@/components/dashboard/sidebar';
import { TopBar } from '@/components/dashboard/top-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd]">
      <Sidebar />
      <TopBar />
      <main className="ml-64 min-h-screen space-y-8 px-8 pb-12 pt-24">{children}</main>
    </div>
  );
}
