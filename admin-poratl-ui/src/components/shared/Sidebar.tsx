import { useEffect, useState } from 'react';
import type { PageId } from '../../App';
import { displayNameFromIdentifier, initialsForIdentifier } from './Header';

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  userIdentifier: string;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
};

type SidebarIconName =
  | 'users'
  | 'shield'
  | 'card'
  | 'charger'
  | 'enterprise'
  | 'network'
  | 'location'
  | 'group'
  | 'plug'
  | 'evse'
  | 'chevron-left'
  | 'chevron-right'
  | 'dashboard'
  | 'allocation'
  | 'utilization'
  | 'audit'
  | 'pricing'
  | 'operator'
  | 'hardware'
  | 'bolt'
  | 'model'
  | 'controller';

const topNavigationItems: { id: PageId; label: string; icon: SidebarIconName }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'charger-enterprise', label: 'Enterprise', icon: 'enterprise' },
  { id: 'charger-network', label: 'Network', icon: 'network' },
  { id: 'charger-location', label: 'Location', icon: 'location' },
];

const secondaryNavigationItems: { id: PageId; label: string; icon: SidebarIconName }[] = [
  { id: 'pricing', label: 'Pricing', icon: 'pricing' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'card' },
  { id: 'allocations', label: 'Allocations', icon: 'allocation' },
  { id: 'utilizations', label: 'Utilizations', icon: 'utilization' },
  { id: 'audit-logs', label: 'Audit Logs', icon: 'audit' },
];

const manageUsersItems: { id: PageId; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'admin-users', label: 'Admin Users' },
  { id: 'rbac-policy', label: 'RBAC Policy' },
];

const generalItems: { id: PageId; label: string }[] = [
  { id: 'network-operator', label: 'Network Operator' },
  { id: 'charge-station-make', label: 'Charge Station Make' },
  { id: 'port-level', label: 'Port Level' },
  { id: 'charge-station-model', label: 'Charge Station Model' },
];

const chargerManagementItems: { id: PageId; label: string }[] = [
  { id: 'charger-groups', label: 'Charger Groups' },
  { id: 'chargers', label: 'Chargers' },
  { id: 'evses', label: 'EVSEs' },
  { id: 'connectors', label: 'Connectors' },
  { id: 'site-controller', label: 'Site Controller' },
];

export function Sidebar({ collapsed, onToggleCollapse, userIdentifier, activePage, onNavigate }: SidebarProps) {
  const isGeneralActive = generalItems.some((item) => item.id === activePage);
  const isManageUsersActive = manageUsersItems.some((item) => item.id === activePage);
  const isChargerManagementActive = chargerManagementItems.some((item) => item.id === activePage);

  const [generalExpanded, setGeneralExpanded] = useState(isGeneralActive);
  const [manageUsersExpanded, setManageUsersExpanded] = useState(isManageUsersActive);
  const [chargerMenuExpanded, setChargerMenuExpanded] = useState(isChargerManagementActive);

  useEffect(() => {
    if (isGeneralActive) {
      setGeneralExpanded(true);
    }
  }, [isGeneralActive]);

  useEffect(() => {
    if (isManageUsersActive) {
      setManageUsersExpanded(true);
    }
  }, [isManageUsersActive]);

  useEffect(() => {
    if (isChargerManagementActive) {
      setChargerMenuExpanded(true);
    }
  }, [isChargerManagementActive]);

  const renderTopLink = (item: { id: PageId; label: string; icon: SidebarIconName }) => (
    <button
      key={item.id}
      className={`admin-left-nav-link ${activePage === item.id ? 'active' : ''}`}
      title={item.label}
      onClick={() => onNavigate(item.id)}
      type="button"
    >
      <span className="admin-left-nav-icon" aria-hidden="true">
        <SidebarIcon name={item.icon} />
      </span>
      <span className="admin-left-nav-label">{item.label}</span>
    </button>
  );

  const renderSublinks = (items: Array<{ id: PageId; label: string }>) =>
    items.map((item) => (
      <button
        key={item.id}
        className={`admin-left-nav-sublink ${activePage === item.id ? 'active' : ''}`}
        onClick={() => onNavigate(item.id)}
        title={item.label}
        type="button"
      >
        {item.label}
      </button>
    ));

  return (
    <aside className="admin-left-nav">
      <button
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        className="admin-left-nav-user"
        onClick={onToggleCollapse}
        title={displayNameFromIdentifier(userIdentifier)}
        type="button"
      >
        <span className="admin-left-nav-user-avatar">{initialsForIdentifier(userIdentifier)}</span>
        <span className="admin-left-nav-user-name">{displayNameFromIdentifier(userIdentifier)}</span>
        <span className="admin-left-nav-toggle" aria-hidden="true">
          <SidebarIcon name={collapsed ? 'chevron-right' : 'chevron-left'} />
        </span>
      </button>

      <nav aria-label="Admin portal sections">
        {topNavigationItems.map((item) => renderTopLink(item))}

        <div className={`admin-left-nav-group ${isGeneralActive ? 'active' : ''}`}>
          <button
            aria-expanded={generalExpanded}
            className={`admin-left-nav-link admin-left-nav-group-trigger ${isGeneralActive || generalExpanded ? 'active' : ''}`}
            title="General"
            onClick={() => setGeneralExpanded((current) => !current)}
            type="button"
          >
            <span className="admin-left-nav-icon" aria-hidden="true">
              <SidebarIcon name="operator" />
            </span>
            <span className="admin-left-nav-label">General</span>
            <span
              className={`admin-left-nav-group-caret ${generalExpanded ? 'expanded' : ''}`}
              aria-hidden="true"
            >
              <SidebarIcon name="chevron-right" />
            </span>
          </button>

          {!collapsed && generalExpanded ? (
            <div className="admin-left-nav-children">
              {renderSublinks(generalItems)}
            </div>
          ) : null}
        </div>

        <div className={`admin-left-nav-group ${isChargerManagementActive ? 'active' : ''}`}>
          <button
            aria-expanded={chargerMenuExpanded}
            className={`admin-left-nav-link admin-left-nav-group-trigger ${isChargerManagementActive || chargerMenuExpanded ? 'active' : ''}`}
            title="Charger Management"
            onClick={() => setChargerMenuExpanded((current) => !current)}
            type="button"
          >
            <span className="admin-left-nav-icon" aria-hidden="true">
              <SidebarIcon name="charger" />
            </span>
            <span className="admin-left-nav-label">Charger Management</span>
            <span
              className={`admin-left-nav-group-caret ${chargerMenuExpanded ? 'expanded' : ''}`}
              aria-hidden="true"
            >
              <SidebarIcon name="chevron-right" />
            </span>
          </button>

          {!collapsed && chargerMenuExpanded ? (
            <div className="admin-left-nav-children">
              {renderSublinks(chargerManagementItems)}
            </div>
          ) : null}
        </div>

        <div className={`admin-left-nav-group ${isManageUsersActive ? 'active' : ''}`}>
          <button
            aria-expanded={manageUsersExpanded}
            className={`admin-left-nav-link admin-left-nav-group-trigger ${isManageUsersActive || manageUsersExpanded ? 'active' : ''}`}
            title="Manage Users"
            onClick={() => setManageUsersExpanded((current) => !current)}
            type="button"
          >
            <span className="admin-left-nav-icon" aria-hidden="true">
              <SidebarIcon name="users" />
            </span>
            <span className="admin-left-nav-label">Manage Users</span>
            <span
              className={`admin-left-nav-group-caret ${manageUsersExpanded ? 'expanded' : ''}`}
              aria-hidden="true"
            >
              <SidebarIcon name="chevron-right" />
            </span>
          </button>

          {!collapsed && manageUsersExpanded ? (
            <div className="admin-left-nav-children">
              {renderSublinks(manageUsersItems)}
            </div>
          ) : null}
        </div>

        {secondaryNavigationItems.map((item) => renderTopLink(item))}
      </nav>
    </aside>
  );
}

function SidebarIcon({ name }: { name: SidebarIconName }) {
  switch (name) {
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.25" />
          <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 3v5c0 4.2-2.4 8.1-7 10-4.6-1.9-7-5.8-7-10V6l7-3Z" />
          <circle cx="12" cy="10" r="2.2" />
          <path d="M8.8 16a3.8 3.8 0 0 1 6.4 0" />
        </svg>
      );
    case 'card':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
          <path d="M14 15h3" />
        </svg>
      );
    case 'charger':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 5h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <path d="M9 9h3" />
          <path d="M16 9h2a1 1 0 0 1 1 1v4" />
          <path d="M12 18v2" />
          <path d="m11 11 2 2-2 2" />
        </svg>
      );
    case 'enterprise':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 10h.01M12 10h.01M15 10h.01M9 14h.01M12 14h.01M15 14h.01" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="19" r="2" />
          <circle cx="19" cy="12" r="2" />
          <path d="M7 12h10M12 7v10" />
        </svg>
      );
    case 'location':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case 'group':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="8" height="6" rx="1.5" />
          <rect x="13" y="5" width="8" height="6" rx="1.5" />
          <rect x="8" y="13" width="8" height="6" rx="1.5" />
          <path d="M7 11v2m10-2v2m-6-2v2" />
        </svg>
      );
    case 'evse':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="9" height="13" rx="2" />
          <path d="M9 7h3" />
          <path d="M15 7h2a1 1 0 0 1 1 1v4" />
          <path d="M12 16v5" />
          <path d="m11 9 2 2-2 2" />
        </svg>
      );
    case 'plug':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3v6" />
          <path d="M15 3v6" />
          <path d="M7 9h10v2a5 5 0 0 1-5 5v5" />
          <path d="M7 11v0" />
        </svg>
      );
    case 'allocation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18" />
          <path d="M3 6h18" />
          <path d="M3 18h18" />
          <path d="M3 9v6" />
          <path d="M21 9v6" />
        </svg>
      );
    case 'utilization':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'audit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
          <path d="M9 12H6m12 0h-3" />
        </svg>
      );
    case 'pricing':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'operator':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M9 21V10l3-7 3 7v11" />
          <path d="M5 21V14h4" />
          <path d="M15 14h4v7" />
          <path d="M11 14h2" />
        </svg>
      );
    case 'hardware':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
      );
    case 'model':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 8h4M7 11h6" />
        </svg>
      );
    case 'controller':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="2" />
          <path d="M13 15h4M15 13v4" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 6-6 6 6 6" />
        </svg>
      );
  }
}
