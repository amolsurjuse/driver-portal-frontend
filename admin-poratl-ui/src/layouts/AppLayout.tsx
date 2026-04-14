import { ReactNode, useState } from 'react';
import { Header } from '../components/shared/Header';
import { Sidebar } from '../components/shared/Sidebar';
import type { JwtPayload } from '../types/admin';
import type { PageId } from '../App';

type AppLayoutProps = {
  token: string;
  payload: JwtPayload | null;
  onLogout: () => void;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
};

export function AppLayout({ payload, onLogout, activePage, onNavigate, children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const userIdentifier = payload?.sub ?? 'System Admin';

  return (
    <div className="admin-app-shell">
      <Header userIdentifier={userIdentifier} onLogout={onLogout} />

      <main className={`admin-content-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userIdentifier={userIdentifier}
          activePage={activePage}
          onNavigate={onNavigate}
        />

        <section className="content">
          {children}
        </section>
      </main>

      <footer className="admin-footer">
        <p className="subtle-copy">© Electra Hub Admin Portal</p>
      </footer>
    </div>
  );
}
