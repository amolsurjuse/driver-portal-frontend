import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Badge } from '../components/ui/Badge';
import { TableSkeleton } from '../components/ui/Skeleton';
import {
  listSubscriptionAllocations,
  listSubscriptionPlans,
  createSubscriptionAllocation,
  updateSubscriptionAllocationStatus,
} from '../api/subscriptions';
import type {
  SubscriptionAllocation,
  SubscriptionPlan,
  AllocationType,
  AllocationStatus,
  CreateSubscriptionAllocationRequest,
} from '../types/subscription';

const PAGE_SIZE = 10;

const statusBadgeVariant = (s: AllocationStatus): 'success' | 'warning' | 'danger' => {
  if (s === 'ACTIVE') return 'success';
  if (s === 'PAUSED') return 'warning';
  return 'danger';
};

export default function AllocationsPage() {
  const { token, payload } = useAuth();
  const { addToast } = useToast();
  const actor = payload?.sub ?? 'System Admin';

  /* ---------- list state ---------- */
  const [allocations, setAllocations] = useState<SubscriptionAllocation[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  /* ---------- filters ---------- */
  const [filterType, setFilterType] = useState<AllocationType | ''>('');
  const [filterStatus, setFilterStatus] = useState<AllocationStatus | ''>('');
  const [filterPlanId, setFilterPlanId] = useState('');

  /* ---------- create modal ---------- */
  const [showCreate, setShowCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm, setCreateForm] = useState<{
    planId: string;
    allocationType: AllocationType;
    entityId: string;
    quotaLimit: string;
    startsAt: string;
    endsAt: string;
  }>({
    planId: '',
    allocationType: 'USER',
    entityId: '',
    quotaLimit: '',
    startsAt: new Date().toISOString().slice(0, 10),
    endsAt: '',
  });

  /* ---------- status change modal ---------- */
  const [statusModal, setStatusModal] = useState<{ allocation: SubscriptionAllocation; newStatus: AllocationStatus } | null>(null);
  const [statusReason, setStatusReason] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);

  /* ---------- fetch ---------- */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [allocRes, planRes] = await Promise.all([
        listSubscriptionAllocations(token, {
          activeOnly: filterStatus === 'ACTIVE' ? true : undefined,
        }),
        listSubscriptionPlans(token, 100),
      ]);
      setAllocations(allocRes);
      setPlans(planRes.items);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to load allocations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ---------- client-side filter + paginate ---------- */
  const filtered = allocations.filter((a) => {
    if (filterType && a.allocationType !== filterType) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterPlanId && a.planId !== filterPlanId) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  /* ---------- create handler ---------- */
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!createForm.planId || !createForm.entityId) {
      addToast('Plan and Entity ID are required', 'warning');
      return;
    }
    setCreateLoading(true);
    try {
      const body: CreateSubscriptionAllocationRequest = {
        planId: createForm.planId,
        allocationType: createForm.allocationType,
        startsAt: new Date(createForm.startsAt).toISOString(),
        createdBy: actor,
      };
      if (createForm.allocationType === 'USER') body.userId = createForm.entityId;
      else if (createForm.allocationType === 'ORGANIZATION') body.organizationId = createForm.entityId;
      else body.groupId = createForm.entityId;
      if (createForm.quotaLimit) body.quotaLimit = Number(createForm.quotaLimit);
      if (createForm.endsAt) body.endsAt = new Date(createForm.endsAt).toISOString();

      await createSubscriptionAllocation(token, body);
      addToast('Allocation created successfully', 'success');
      setShowCreate(false);
      setCreateForm({ planId: '', allocationType: 'USER', entityId: '', quotaLimit: '', startsAt: new Date().toISOString().slice(0, 10), endsAt: '' });
      await fetchData();
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to create allocation', 'error');
    } finally {
      setCreateLoading(false);
    }
  };

  /* ---------- status change handler ---------- */
  const handleStatusChange = async () => {
    if (!statusModal) return;
    setStatusLoading(true);
    try {
      await updateSubscriptionAllocationStatus(token, statusModal.allocation.id, {
        status: statusModal.newStatus,
        actor,
        reason: statusReason || undefined,
      });
      addToast(`Allocation ${statusModal.newStatus.toLowerCase()} successfully`, 'success');
      setStatusModal(null);
      setStatusReason('');
      await fetchData();
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to update status', 'error');
    } finally {
      setStatusLoading(false);
    }
  };

  /* ---------- quota progress ---------- */
  const quotaBar = (a: SubscriptionAllocation) => {
    const limit = a.effectiveQuotaLimit;
    if (limit === null || limit === 0) return <span className="muted">Unlimited</span>;
    const pct = Math.min(100, (a.consumedUnits / limit) * 100);
    const color = pct >= 90 ? 'var(--color-danger)' : pct >= 70 ? 'var(--color-warning)' : 'var(--color-success)';
    return (
      <div className="quota-bar-wrap">
        <div className="quota-bar-track">
          <div className="quota-bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="quota-bar-label">{a.consumedUnits} / {limit}</span>
      </div>
    );
  };

  const entityLabel = (a: SubscriptionAllocation) => a.userId || a.organizationId || a.groupId || '—';

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Resource Management</p>
          <h1>Allocations</h1>
          <p className="hero-copy">Manage subscription allocations across users and organizations</p>
        </div>
      </header>

      {/* toolbar */}
      <section className="allocation-toolbar">
        <div className="allocation-filters">
          <select className="allocation-filter-select" value={filterType} onChange={(e) => { setFilterType(e.target.value as AllocationType | ''); setPage(0); }}>
            <option value="">All Types</option>
            <option value="USER">User</option>
            <option value="ORGANIZATION">Organization</option>
            <option value="ORGANIZATION_GROUP">Group</option>
          </select>

          <select className="allocation-filter-select" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as AllocationStatus | ''); setPage(0); }}>
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <select className="allocation-filter-select" value={filterPlanId} onChange={(e) => { setFilterPlanId(e.target.value); setPage(0); }}>
            <option value="">All Plans</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <button className="primary-button action-button" onClick={() => setShowCreate(true)}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" /></svg>
          New Allocation
        </button>
      </section>

      {/* table */}
      <section className="allocation-table-section">
        {loading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : paged.length === 0 ? (
          <div className="blank-card tall">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No allocations found</p>
              <p className="muted">Try adjusting your filters or create a new allocation.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="subscription-table-wrap">
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '22%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Type</th>
                    <th>Entity</th>
                    <th>Quota</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <strong style={{ display: 'block' }}>{a.planName}</strong>
                        <span className="muted" style={{ fontSize: '0.8rem' }}>{a.planCode}</span>
                      </td>
                      <td><Badge variant="neutral">{a.allocationType}</Badge></td>
                      <td style={{ wordBreak: 'break-all', fontSize: '0.85rem' }}>{entityLabel(a)}</td>
                      <td>{quotaBar(a)}</td>
                      <td><Badge variant={statusBadgeVariant(a.status)}>{a.status}</Badge></td>
                      <td>
                        <div className="allocation-actions">
                          {a.status === 'ACTIVE' && (
                            <button className="ghost-button button-compact" onClick={() => setStatusModal({ allocation: a, newStatus: 'PAUSED' })} type="button">
                              Pause
                            </button>
                          )}
                          {a.status === 'PAUSED' && (
                            <button className="ghost-button button-compact" onClick={() => setStatusModal({ allocation: a, newStatus: 'ACTIVE' })} type="button">
                              Resume
                            </button>
                          )}
                          {a.status !== 'EXPIRED' && (
                            <button className="danger-button button-compact" onClick={() => setStatusModal({ allocation: a, newStatus: 'EXPIRED' })} type="button">
                              Expire
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="pagination-bar">
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div className="pagination-actions">
                <button className="ghost-button" disabled={page === 0} onClick={() => setPage(page - 1)} type="button">Previous</button>
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} className={`pagination-page-button ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} type="button">
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button className="ghost-button" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} type="button">Next</button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* create modal */}
      {showCreate && (
        <div className="dialog-backdrop" onClick={() => setShowCreate(false)}>
          <div className="dialog-card" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px' }}>Create Allocation</h2>
            <form onSubmit={handleCreate}>
              <div className="editor-form">
                <div className="field">
                  <span>Plan *</span>
                  <select value={createForm.planId} onChange={(e) => setCreateForm({ ...createForm, planId: e.target.value })}>
                    <option value="">Select a plan…</option>
                    {plans.filter((p) => p.active).map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <span>Allocation Type *</span>
                  <div className="allocation-type-radios">
                    {(['USER', 'ORGANIZATION', 'ORGANIZATION_GROUP'] as AllocationType[]).map((t) => (
                      <label key={t} className="radio-label">
                        <input type="radio" name="allocationType" value={t} checked={createForm.allocationType === t} onChange={() => setCreateForm({ ...createForm, allocationType: t, entityId: '' })} />
                        {t === 'ORGANIZATION_GROUP' ? 'Group' : t.charAt(0) + t.slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <span>{createForm.allocationType === 'USER' ? 'User ID' : createForm.allocationType === 'ORGANIZATION' ? 'Organization ID' : 'Group ID'} *</span>
                  <input type="text" placeholder="Enter ID…" value={createForm.entityId} onChange={(e) => setCreateForm({ ...createForm, entityId: e.target.value })} />
                </div>

                <div className="field">
                  <span>Quota Limit</span>
                  <input type="number" min="0" placeholder="Leave empty for plan default" value={createForm.quotaLimit} onChange={(e) => setCreateForm({ ...createForm, quotaLimit: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="field">
                    <span>Start Date *</span>
                    <input type="date" value={createForm.startsAt} onChange={(e) => setCreateForm({ ...createForm, startsAt: e.target.value })} />
                  </div>
                  <div className="field">
                    <span>End Date</span>
                    <input type="date" value={createForm.endsAt} onChange={(e) => setCreateForm({ ...createForm, endsAt: e.target.value })} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                <button type="button" className="ghost-button" onClick={() => setShowCreate(false)}>Cancel</button>
                <button type="submit" className="primary-button" disabled={createLoading}>
                  {createLoading ? 'Creating…' : 'Create Allocation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* status change modal */}
      {statusModal && (
        <div className="dialog-backdrop" onClick={() => { setStatusModal(null); setStatusReason(''); }}>
          <div className={`dialog-card ${statusModal.newStatus === 'EXPIRED' ? 'danger-dialog' : ''}`} style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px' }}>
              {statusModal.newStatus === 'PAUSED' && 'Pause Allocation'}
              {statusModal.newStatus === 'ACTIVE' && 'Resume Allocation'}
              {statusModal.newStatus === 'EXPIRED' && 'Expire Allocation'}
            </h2>
            <p className="muted" style={{ margin: '0 0 16px' }}>
              Change status of <strong>{statusModal.allocation.planName}</strong> allocation for{' '}
              <strong>{entityLabel(statusModal.allocation)}</strong> to <Badge variant={statusBadgeVariant(statusModal.newStatus)}>{statusModal.newStatus}</Badge>?
            </p>

            <div className="field">
              <span>Reason (optional)</span>
              <input type="text" placeholder="Why are you changing the status?" value={statusReason} onChange={(e) => setStatusReason(e.target.value)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
              <button className="ghost-button" onClick={() => { setStatusModal(null); setStatusReason(''); }} type="button">Cancel</button>
              <button className={statusModal.newStatus === 'EXPIRED' ? 'danger-button' : 'primary-button'} disabled={statusLoading} onClick={handleStatusChange} type="button">
                {statusLoading ? 'Updating…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
