import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Badge } from '../components/ui/Badge';
import { TableSkeleton } from '../components/ui/Skeleton';
import { listSubscriptionAuditLogs } from '../api/subscriptions';
import type { SubscriptionAuditLog, AuditAction } from '../types/subscription';

const PAGE_SIZE = 15;

const ACTION_BADGE: Record<AuditAction, { variant: 'info' | 'warning' | 'danger' | 'success' | 'neutral'; label: string }> = {
  PLAN_CREATED: { variant: 'info', label: 'Create' },
  PLAN_UPDATED: { variant: 'warning', label: 'Update' },
  ALLOCATION_CREATED: { variant: 'info', label: 'Create' },
  ALLOCATION_STATUS_CHANGED: { variant: 'success', label: 'Status' },
  UTILIZATION_RECORDED: { variant: 'neutral', label: 'Record' },
};

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatTimestamp(iso);
}

function entityType(log: SubscriptionAuditLog): string {
  if (log.action.startsWith('PLAN_')) return 'Plan';
  if (log.action.startsWith('ALLOCATION_')) return 'Allocation';
  if (log.action.startsWith('UTILIZATION_')) return 'Utilization';
  return 'Unknown';
}

function entityId(log: SubscriptionAuditLog): string {
  return log.planId || log.allocationId || log.userId || '—';
}

type DatePreset = '24h' | '7d' | '30d' | 'all';

export default function AuditLogsPage() {
  const { token } = useAuth();
  const { addToast } = useToast();

  /* ---------- list state ---------- */
  const [logs, setLogs] = useState<SubscriptionAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  /* ---------- filters ---------- */
  const [filterAction, setFilterAction] = useState<AuditAction | ''>('');
  const [filterEntityType, setFilterEntityType] = useState<string>('');
  const [filterDatePreset, setFilterDatePreset] = useState<DatePreset>('all');
  const [filterSearch, setFilterSearch] = useState('');

  /* ---------- expanded detail ---------- */
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ---------- fetch ---------- */
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await listSubscriptionAuditLogs(token, {});
        setLogs(res);
      } catch (err) {
        addToast(err instanceof Error ? err.message : 'Failed to load audit logs', 'error');
      } finally {
        setLoading(false);
      }
    };
    void fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ---------- client-side filter ---------- */
  const filtered = useMemo(() => {
    let result = logs;

    if (filterAction) {
      result = result.filter((l) => l.action === filterAction);
    }

    if (filterEntityType) {
      result = result.filter((l) => entityType(l) === filterEntityType);
    }

    if (filterDatePreset !== 'all') {
      const now = Date.now();
      const cutoffs: Record<string, number> = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
      };
      const cutoff = now - (cutoffs[filterDatePreset] || 0);
      result = result.filter((l) => new Date(l.createdAt).getTime() >= cutoff);
    }

    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase();
      result = result.filter(
        (l) =>
          l.detail.toLowerCase().includes(q) ||
          l.actor.toLowerCase().includes(q) ||
          (l.planId && l.planId.toLowerCase().includes(q)) ||
          (l.allocationId && l.allocationId.toLowerCase().includes(q))
      );
    }

    return result;
  }, [logs, filterAction, filterEntityType, filterDatePreset, filterSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const resetFilters = () => {
    setFilterAction('');
    setFilterEntityType('');
    setFilterDatePreset('all');
    setFilterSearch('');
    setPage(0);
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Audit Trail</p>
          <h1>Audit Logs</h1>
          <p className="hero-copy">View and filter system audit logs for subscription activities</p>
        </div>
      </header>

      {/* filters */}
      <section className="audit-filter-bar">
        <div className="audit-filters-row">
          <select className="allocation-filter-select" value={filterAction} onChange={(e) => { setFilterAction(e.target.value as AuditAction | ''); setPage(0); }}>
            <option value="">All Actions</option>
            <option value="PLAN_CREATED">Plan Created</option>
            <option value="PLAN_UPDATED">Plan Updated</option>
            <option value="ALLOCATION_CREATED">Allocation Created</option>
            <option value="ALLOCATION_STATUS_CHANGED">Status Changed</option>
            <option value="UTILIZATION_RECORDED">Utilization Recorded</option>
          </select>

          <select className="allocation-filter-select" value={filterEntityType} onChange={(e) => { setFilterEntityType(e.target.value); setPage(0); }}>
            <option value="">All Entities</option>
            <option value="Plan">Plan</option>
            <option value="Allocation">Allocation</option>
            <option value="Utilization">Utilization</option>
          </select>

          <input
            type="text"
            className="utilization-search-input"
            placeholder="Search details, actor, IDs…"
            value={filterSearch}
            onChange={(e) => { setFilterSearch(e.target.value); setPage(0); }}
          />
        </div>

        <div className="audit-date-presets">
          {(['24h', '7d', '30d', 'all'] as DatePreset[]).map((preset) => (
            <button
              key={preset}
              className={`audit-date-button ${filterDatePreset === preset ? 'active' : ''}`}
              onClick={() => { setFilterDatePreset(preset); setPage(0); }}
              type="button"
            >
              {preset === '24h' ? 'Last 24h' : preset === '7d' ? 'Last 7d' : preset === '30d' ? 'Last 30d' : 'All Time'}
            </button>
          ))}

          {(filterAction || filterEntityType || filterDatePreset !== 'all' || filterSearch) && (
            <button className="ghost-button button-compact button-compact-wide" onClick={resetFilters} type="button">
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* table */}
      <section className="allocation-table-section">
        {loading ? (
          <TableSkeleton rows={8} cols={6} />
        ) : paged.length === 0 ? (
          <div className="blank-card tall">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No audit logs found</p>
              <p className="muted">
                {filterAction || filterEntityType || filterSearch || filterDatePreset !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'No audit trail activity recorded yet.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="subscription-table-wrap">
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '26%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Entity ID</th>
                    <th>Actor</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((log) => {
                    const badge = ACTION_BADGE[log.action] || { variant: 'neutral' as const, label: log.action };
                    const isExpanded = expandedId === log.id;
                    const truncatedDetail = log.detail.length > 60 ? log.detail.slice(0, 60) + '…' : log.detail;
                    return (
                        <tr key={log.id} className="audit-log-row" onClick={() => setExpandedId(isExpanded ? null : log.id)} style={{ cursor: log.detail.length > 60 ? 'pointer' : 'default' }}>
                          <td>
                            <span style={{ display: 'block', fontWeight: 500 }}>{relativeTime(log.createdAt)}</span>
                            <span className="muted" style={{ fontSize: '0.75rem' }}>{formatTimestamp(log.createdAt)}</span>
                          </td>
                          <td><Badge variant={badge.variant}>{badge.label}</Badge></td>
                          <td><Badge variant="neutral">{entityType(log)}</Badge></td>
                          <td style={{ fontSize: '0.82rem', wordBreak: 'break-all' }}>{entityId(log)}</td>
                          <td className="muted">{log.actor}</td>
                          <td style={{ fontSize: '0.85rem' }}>
                            {isExpanded ? log.detail : truncatedDetail}
                            {log.detail.length > 60 && (
                              <button className="audit-expand-btn" onClick={(e) => { e.stopPropagation(); setExpandedId(isExpanded ? null : log.id); }}>
                                {isExpanded ? 'less' : 'more'}
                              </button>
                            )}
                          </td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="pagination-bar">
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} logs
              </span>
              <div className="pagination-actions">
                <button className="ghost-button" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
                <div className="pagination-pages">
                  {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                    let pageNum = i;
                    if (totalPages > 7) {
                      if (page <= 3) pageNum = i;
                      else if (page >= totalPages - 4) pageNum = totalPages - 7 + i;
                      else pageNum = page - 3 + i;
                    }
                    return (
                      <button key={pageNum} className={`pagination-page-button ${pageNum === page ? 'active' : ''}`} onClick={() => setPage(pageNum)}>
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>
                <button className="ghost-button" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
