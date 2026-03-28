import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { login } from './api/auth';
import { LoginScreen } from './components/LoginScreen';
import { Toast } from './components/ui/Toast';
import { TableSkeleton } from './components/ui/Skeleton';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './hooks/useToast';
import { AppLayout } from './layouts/AppLayout';
import type { JwtPayload } from './types/admin';

/* lazy-loaded pages */
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'));
const RbacPolicyPage = lazy(() => import('./pages/RbacPolicyPage'));
const ChargerManagementPage = lazy(() => import('./pages/ChargerManagementPage'));
const ChargerAssetsPage = lazy(() => import('./pages/ChargerAssetsPage'));
const ChargersPage = lazy(() => import('./pages/ChargersPage'));
const EvsesPage = lazy(() => import('./pages/EvsesPage'));
const ConnectorsPage = lazy(() => import('./pages/ConnectorsPage'));
const AllocationsPage = lazy(() => import('./pages/AllocationsPage'));
const UtilizationsPage = lazy(() => import('./pages/UtilizationsPage'));
const AuditLogsPage = lazy(() => import('./pages/AuditLogsPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const NetworkOperatorPage = lazy(() => import('./pages/NetworkOperatorPage'));
const ChargeStationMakePage = lazy(() => import('./pages/ChargeStationMakePage'));
const PortLevelPage = lazy(() => import('./pages/PortLevelPage'));
const ChargeStationModelPage = lazy(() => import('./pages/ChargeStationModelPage'));
const SiteControllerPage = lazy(() => import('./pages/SiteControllerPage'));

export type PageId =
  | 'dashboard'
  | 'users'
  | 'admin-users'
  | 'subscriptions'
  | 'rbac-policy'
  | 'charger-enterprise'
  | 'charger-network'
  | 'charger-location'
  | 'charger-groups'
  | 'chargers'
  | 'evses'
  | 'connectors'
  | 'allocations'
  | 'utilizations'
  | 'audit-logs'
  | 'pricing'
  | 'network-operator'
  | 'charge-station-make'
  | 'port-level'
  | 'charge-station-model'
  | 'site-controller';

const pagePathMap: Record<PageId, string> = {
  dashboard: '/dashboard',
  users: '/users',
  'admin-users': '/admin-users',
  subscriptions: '/subscriptions',
  'rbac-policy': '/rbac/policy',
  'charger-enterprise': '/charger/enterprise',
  'charger-network': '/charger/network',
  'charger-location': '/charger/location',
  'charger-groups': '/charger-management/charger-groups',
  chargers: '/charger-management/chargers',
  evses: '/charger-management/evses',
  connectors: '/charger-management/connectors',
  allocations: '/allocations',
  utilizations: '/utilizations',
  'audit-logs': '/audit-logs',
  pricing: '/pricing',
  'network-operator': '/general/network-operator',
  'charge-station-make': '/general/charge-station-make',
  'port-level': '/general/port-level',
  'charge-station-model': '/general/charge-station-model',
  'site-controller': '/network-operator/site-controller',
};

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/dashboard';
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function pageFromPath(pathname: string): PageId | null {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === '/pricing' || normalizedPath.startsWith('/pricing/')) {
    return 'pricing';
  }
  const match = (Object.entries(pagePathMap) as Array<[PageId, string]>).find(([, path]) => path === normalizedPath);
  return match?.[0] ?? null;
}

function PageLoader() {
  return (
    <div style={{ padding: '2rem' }}>
      <TableSkeleton rows={5} cols={4} />
    </div>
  );
}

const accessTokenStorageKey = 'admin-portal-access-token';

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(accessTokenStorageKey));
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<PageId>(() => pageFromPath(window.location.pathname) ?? 'dashboard');

  const payload = useMemo(() => decodeJwt(accessToken), [accessToken]);
  const isSystemAdmin = payload?.roles?.includes('SYSTEM_ADMIN') ?? false;

  const navigateToPage = useCallback((page: PageId, options?: { replace?: boolean }) => {
    const normalizedCurrentPath = normalizePath(window.location.pathname);
    const nextPath = pagePathMap[page];
    const replace = options?.replace ?? false;

    setActivePage(page);

    if (normalizedCurrentPath === nextPath) {
      return;
    }

    if (replace) {
      window.history.replaceState({ page }, '', nextPath);
      return;
    }

    window.history.pushState({ page }, '', nextPath);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(accessTokenStorageKey);
    setAccessToken(null);
    setLoginError(null);
    navigateToPage('dashboard', { replace: true });
  }, [navigateToPage]);

  useEffect(() => {
    const routePage = pageFromPath(window.location.pathname);
    if (!routePage) {
      window.history.replaceState({ page: 'dashboard' }, '', pagePathMap.dashboard);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(pageFromPath(window.location.pathname) ?? 'dashboard');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  async function handleLogin(email: string, password: string) {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await login({ email, password });
      const decoded = decodeJwt(response.accessToken);
      if (!(decoded?.roles?.includes('SYSTEM_ADMIN') ?? false)) {
        setLoginError('This account is authenticated, but it is not authorized for the admin portal.');
        return;
      }

      localStorage.setItem(accessTokenStorageKey, response.accessToken);
      setAccessToken(response.accessToken);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setLoginLoading(false);
    }
  }

  if (!accessToken) {
    return <LoginScreen error={loginError} loading={loginLoading} onSubmit={handleLogin} />;
  }

  if (!isSystemAdmin) {
    return (
      <div className="login-shell">
        <section className="login-card">
          <div>
            <p className="section-label">Access denied</p>
            <h2>System admin role required</h2>
          </div>
          <p className="subtle-copy">
            The stored session token is valid, but it does not include the `SYSTEM_ADMIN` role required by this portal.
          </p>
          <button className="primary-button" onClick={handleLogout} type="button">
            Clear session
          </button>
        </section>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Suspense fallback={<PageLoader />}><DashboardPage onNavigate={navigateToPage} /></Suspense>;
      case 'users':
        return <Suspense fallback={<PageLoader />}><UsersPage /></Suspense>;
      case 'admin-users':
        return <Suspense fallback={<PageLoader />}><AdminUsersPage /></Suspense>;
      case 'subscriptions':
        return <Suspense fallback={<PageLoader />}><SubscriptionsPage /></Suspense>;
      case 'rbac-policy':
        return <Suspense fallback={<PageLoader />}><RbacPolicyPage /></Suspense>;
      case 'charger-enterprise':
        return <Suspense fallback={<PageLoader />}><ChargerManagementPage section="enterprise" /></Suspense>;
      case 'charger-network':
        return <Suspense fallback={<PageLoader />}><ChargerManagementPage section="network" /></Suspense>;
      case 'charger-location':
        return <Suspense fallback={<PageLoader />}><ChargerManagementPage section="location" /></Suspense>;
      case 'charger-groups':
        return <Suspense fallback={<PageLoader />}><ChargerAssetsPage section="charger-groups" /></Suspense>;
      case 'chargers':
        return <Suspense fallback={<PageLoader />}><ChargersPage /></Suspense>;
      case 'evses':
        return <Suspense fallback={<PageLoader />}><EvsesPage /></Suspense>;
      case 'connectors':
        return <Suspense fallback={<PageLoader />}><ConnectorsPage /></Suspense>;
      case 'allocations':
        return <Suspense fallback={<PageLoader />}><AllocationsPage /></Suspense>;
      case 'utilizations':
        return <Suspense fallback={<PageLoader />}><UtilizationsPage /></Suspense>;
      case 'audit-logs':
        return <Suspense fallback={<PageLoader />}><AuditLogsPage /></Suspense>;
      case 'pricing':
        return <Suspense fallback={<PageLoader />}><PricingPage /></Suspense>;
      case 'network-operator':
        return <Suspense fallback={<PageLoader />}><NetworkOperatorPage /></Suspense>;
      case 'charge-station-make':
        return <Suspense fallback={<PageLoader />}><ChargeStationMakePage /></Suspense>;
      case 'port-level':
        return <Suspense fallback={<PageLoader />}><PortLevelPage /></Suspense>;
      case 'charge-station-model':
        return <Suspense fallback={<PageLoader />}><ChargeStationModelPage /></Suspense>;
      case 'site-controller':
        return <Suspense fallback={<PageLoader />}><SiteControllerPage /></Suspense>;
      default:
        return <Suspense fallback={<PageLoader />}><DashboardPage onNavigate={navigateToPage} /></Suspense>;
    }
  };

  return (
    <ToastProvider>
      <AuthProvider payload={payload} token={accessToken}>
        <AppLayout
          token={accessToken}
          payload={payload}
          onLogout={handleLogout}
          activePage={activePage}
          onNavigate={navigateToPage}
        >
          {renderPage()}
        </AppLayout>
        <Toast />
      </AuthProvider>
    </ToastProvider>
  );
}

function decodeJwt(token: string | null): JwtPayload | null {
  if (!token) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '='));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}
