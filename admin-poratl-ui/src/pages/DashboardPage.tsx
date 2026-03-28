import { useEffect, useState } from 'react';
import { listSubscriptionPlans, listSubscriptionAllocations, listSubscriptionAuditLogs } from '../api/subscriptions';
import { searchAdminUsers, searchUsers } from '../api/adminUsers';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Skeleton } from '../components/ui/Skeleton';
import { Badge } from '../components/ui/Badge';
import type { SubscriptionAuditLog } from '../types/subscription';
import type { PageId } from '../App';

const CHART_COLORS = {
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  muted: '#94a3b8',
};

type DashboardPageProps = {
  onNavigate: (page: PageId) => void;
};

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { token } = useAuth();
  const { addToast } = useToast();

  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalAdminUsers, setTotalAdminUsers] = useState<number | null>(null);
  const [activePlans, setActivePlans] = useState<number | null>(null);
  const [activeAllocations, setActiveAllocations] = useState<number | null>(null);

  const [planStatusData, setPlanStatusData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [allocationStatusData, setAllocationStatusData] = useState<{ name: string; value: number; color: string }[]>([]);

  const [recentLogs, setRecentLogs] = useState<SubscriptionAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        const usersRes = await searchUsers(token, '', 1);
        setTotalUsers(usersRes.total);

        const adminUsersRes = await searchAdminUsers(token, '', 1);
        setTotalAdminUsers(adminUsersRes.total);

        const plansRes = await listSubscriptionPlans(token, 100);
        const activeCount = plansRes.items.filter((p) => p.active).length;
        const inactiveCount = plansRes.items.filter((p) => !p.active).length;
        setActivePlans(activeCount);
        setPlanStatusData([
          { name: 'Active', value: activeCount, color: CHART_COLORS.success },
          { name: 'Inactive', value: inactiveCount, color: CHART_COLORS.muted },
        ]);

        const allocationsRes = await listSubscriptionAllocations(token, {});
        const byStatus = {
          ACTIVE: allocationsRes.filter((a) => a.status === 'ACTIVE').length,
          PAUSED: allocationsRes.filter((a) => a.status === 'PAUSED').length,
          EXPIRED: allocationsRes.filter((a) => a.status === 'EXPIRED').length,
        };
        setActiveAllocations(allocationsRes.length);
        setAllocationStatusData([
          { name: 'Active', value: byStatus.ACTIVE, color: CHART_COLORS.success },
          { name: 'Paused', value: byStatus.PAUSED, color: CHART_COLORS.warning },
          { name: 'Expired', value: byStatus.EXPIRED, color: CHART_COLORS.danger },
        ]);

        const logsRes = await listSubscriptionAuditLogs(token, {});
        setRecentLogs(logsRes.slice(0, 10));
      } catch (error) {
        addToast(error instanceof Error ? error.message : 'Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [token, addToast]);

  const getActionBadgeVariant = (action: string): 'success' | 'danger' | 'warning' | 'info' | 'neutral' => {
    if (action.includes('CREATED')) return 'info';
    if (action.includes('UPDATED')) return 'warning';
    if (action.includes('DELETED')) return 'danger';
    if (action.includes('STATUS_CHANGED')) return 'success';
    return 'neutral';
  };

  const getActionLabel = (action: string): string => {
    if (action.includes('CREATED')) return 'Create';
    if (action.includes('UPDATED')) return 'Update';
    if (action.includes('DELETED')) return 'Delete';
    if (action.includes('STATUS_CHANGED')) return 'Status';
    if (action.includes('RECORDED')) return 'Record';
    return action;
  };

  /* simple CSS bar chart */
  const maxBarValue = Math.max(1, ...allocationStatusData.map((d) => d.value));

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Operations cockpit</p>
          <h1>Dashboard</h1>
          <p className="hero-copy">Welcome to Electra Hub Admin Portal</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total Users</span>
          {loading ? (<><Skeleton height="2rem" width="80%" /><Skeleton height="0.75rem" width="60%" /></>) : (<><strong>{totalUsers}</strong><small>System users</small></>)}
        </article>
        <article className="stat-card warm">
          <span>System Admins</span>
          {loading ? (<><Skeleton height="2rem" width="80%" /><Skeleton height="0.75rem" width="60%" /></>) : (<><strong>{totalAdminUsers}</strong><small>Admin accounts</small></>)}
        </article>
        <article className="stat-card cool">
          <span>Active Plans</span>
          {loading ? (<><Skeleton height="2rem" width="80%" /><Skeleton height="0.75rem" width="60%" /></>) : (<><strong>{activePlans}</strong><small>Subscription plans</small></>)}
        </article>
        <article className="stat-card muted">
          <span>Active Allocations</span>
          {loading ? (<><Skeleton height="2rem" width="80%" /><Skeleton height="0.75rem" width="60%" /></>) : (<><strong>{activeAllocations}</strong><small>Resource allocations</small></>)}
        </article>
      </section>

      {/* Charts Section — pure CSS, no recharts */}
      <section className="dashboard-charts-grid">
        <div className="dashboard-chart-card">
          <h3>Plan Status Distribution</h3>
          {loading ? (
            <Skeleton height="180px" />
          ) : planStatusData.length > 0 ? (
            <div className="css-donut-wrap">
              {(() => {
                const total = planStatusData.reduce((s, d) => s + d.value, 0) || 1;
                const pct = Math.round((planStatusData[0].value / total) * 100);
                return (
                  <>
                    <div
                      className="css-donut"
                      style={{
                        background: `conic-gradient(${planStatusData[0].color} 0% ${pct}%, ${planStatusData[1]?.color || CHART_COLORS.muted} ${pct}% 100%)`,
                      }}
                    >
                      <div className="css-donut-hole">{pct}%</div>
                    </div>
                    <div className="css-donut-legend">
                      {planStatusData.map((d) => (
                        <div key={d.name} className="css-donut-legend-item">
                          <span className="css-legend-swatch" style={{ background: d.color }} />
                          {d.name}: <strong>{d.value}</strong>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="blank-card">No data available</div>
          )}
        </div>

        <div className="dashboard-chart-card">
          <h3>Allocation Status Breakdown</h3>
          {loading ? (
            <Skeleton height="180px" />
          ) : allocationStatusData.length > 0 ? (
            <div className="css-bar-chart">
              {allocationStatusData.map((d) => (
                <div key={d.name} className="css-bar-row">
                  <span className="css-bar-label">{d.name}</span>
                  <div className="css-bar-track">
                    <div
                      className="css-bar-fill"
                      style={{
                        width: `${Math.max(2, (d.value / maxBarValue) * 100)}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                  <span className="css-bar-value">{d.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="blank-card">No data available</div>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-section">
        <div className="dashboard-section-head">
          <h2>Recent Activity</h2>
          <button className="ghost-button action-button" onClick={() => onNavigate('audit-logs')} type="button">
            View All
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gap: '12px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height="3rem" />
            ))}
          </div>
        ) : recentLogs.length > 0 ? (
          <div className="dashboard-activity-table">
            <table className="data-table">
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Entity Type</th>
                  <th>Actor</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id}>
                    <td><Badge variant={getActionBadgeVariant(log.action)}>{getActionLabel(log.action)}</Badge></td>
                    <td>{log.planId ? 'Plan' : log.allocationId ? 'Allocation' : 'Unknown'}</td>
                    <td className="muted">{log.actor}</td>
                    <td className="muted">{new Date(log.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="blank-card">No audit logs available</div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-card" onClick={() => onNavigate('admin-users')} type="button">
            <div className="quick-action-icon" style={{ background: CHART_COLORS.info }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="8" r="3.25" /><path d="M6.5 19a5.5 5.5 0 0 1 11 0" /></svg>
            </div>
            <div>
              <h4>Manage Admin Users</h4>
              <p>Add, edit, or remove admin accounts</p>
            </div>
          </button>
          <button className="quick-action-card" onClick={() => onNavigate('subscriptions')} type="button">
            <div className="quick-action-icon" style={{ background: CHART_COLORS.success }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18" /></svg>
            </div>
            <div>
              <h4>Subscription Plans</h4>
              <p>Set up new subscription plans</p>
            </div>
          </button>
          <button className="quick-action-card" onClick={() => onNavigate('allocations')} type="button">
            <div className="quick-action-icon" style={{ background: CHART_COLORS.warning }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></svg>
            </div>
            <div>
              <h4>View Allocations</h4>
              <p>Manage resource allocations</p>
            </div>
          </button>
          <button className="quick-action-card" onClick={() => onNavigate('audit-logs')} type="button">
            <div className="quick-action-icon" style={{ background: CHART_COLORS.danger }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            </div>
            <div>
              <h4>Audit Logs</h4>
              <p>Review system activity and changes</p>
            </div>
          </button>
        </div>
      </section>
    </>
  );
}
