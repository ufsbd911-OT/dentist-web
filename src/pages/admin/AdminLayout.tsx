import { Link, Outlet } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="admin-shell min-h-screen flex w-full">
        <AdminSidebar />
        <main className="admin-main flex-1 overflow-hidden">
          <header className="admin-topbar">
            <div className="admin-topbar__title"><SidebarTrigger /><span>Administration UFSBD Hérault</span></div>
            <Link to="/" className="admin-site-link">Voir le site <ArrowUpRight size={15} /></Link>
          </header>
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
