import { FormEvent, Fragment, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Badge } from '../components/ui/Badge';
import { TableSkeleton } from '../components/ui/Skeleton';
import {
  listSubscriptionUtilizations,
  previewSubscriptionUtilization,
} from '../api/subscriptions';
import type {
  SubscriptionUtilization,
  SubscriptionUtilizationPreview,
  PreviewSubscriptionUtilizationRequest,
} from '../types/subscription';

const PAGE_SIZE = 10;

function formatCurrency(value: string, currency = 'USD') {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function UtilizationsPage() {
  const { token } = useAuth();
  const { addToast } = useToast();

  /* ---------- list state ---------- */
  const [utilizations, setUtilizations] = useState<SubscriptionUtilization[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ---------- filters ---------- */
  const [filterUserId, setFilterUserId] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  /* ---------- preview modal ---------- */
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewResult, setPreviewResult] = useState<SubscriptionUtilizationPreview | null>(null);
  const [previewForm, setPreviewForm] = useState<{
    userId: string;
    chargingCost: string;
    sessionFee: string;
    idleFee: string;
    taxes: string;
    unitsConsumed: string;
  }>({
    userId: '',
    chargingCost: '',
    sessionFee: '',
    idleFee: '',
    taxes: '',
    unitsConsumed: '',
  });

  /* ---------- fetch ---------- */
  const fetchUtilizations = async (userId: string) => {
    if (!userId.trim()) {
      setUtilizations([]);
      return;
    }
    setLoading(true);
    try {
      const res = await listSubscriptionUtilizations(token, userId.trim());
      setUtilizations(res);
      setPage(0);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to load utilizations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchUserId(filterUserId);
  };

  useEffect(() => {
    if (searchUserId) {
      void fetchUtilizations(searchUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUserId, token]);

  /* ---------- client-side pagination ---------- */
  const totalPages = Math.max(1, Math.ceil(utilizations.length / PAGE_SIZE));
  const paged = utilizations.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  /* ---------- preview handler ---------- */
  const handlePreview = async (e: FormEvent) => {
    e.preventDefault();
    if (!previewForm.userId || !previewForm.chargingCost) {
      addToast('User ID and Charging Cost are required', 'warning');
      return;
    }
    setPreviewLoading(true);
    setPreviewResult(null);
    try {
      const body: PreviewSubscriptionUtilizationRequest = {
        userId: previewForm.userId,
        chargingCost: Number(previewForm.chargingCost),
        sessionFee: Number(previewForm.sessionFee || 0),
        idleFee: Number(previewForm.idleFee || 0),
        taxes: Number(previewForm.taxes || 0),
      };
      if (previewForm.unitsConsumed) body.unitsConsumed = Number(previewForm.unitsConsumed);
      const result = await previewSubscriptionUtilization(token, body);
      setPreviewResult(result);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Preview failed', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  /* ---------- fee breakdown row ---------- */
  const renderBreakdown = (u: SubscriptionUtilization) => {
    const currency = u.currencyCode;
    return (
      <tr className="utilization-expanded-row">
        <td colSpan={7}>
          <div className="utilization-breakdown">
            <h4 style={{ margin: '0 0 12px' }}>Fee Breakdown</h4>
            <div className="utilization-breakdown-grid">
              <div className="breakdown-item">
                <span className="muted">Charging Cost</span>
                <strong>{formatCurrency(u.chargingCost, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Session Fee</span>
                <strong>{formatCurrency(u.sessionFee, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Idle Fee</span>
                <strong>{formatCurrency(u.idleFee, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Taxes</span>
                <strong>{formatCurrency(u.taxes, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Eligible Subtotal</span>
                <strong>{formatCurrency(u.eligibleSubtotal, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Total Fee Discount</span>
                <strong style={{ color: 'var(--color-success)' }}>−{formatCurrency(u.totalFeeDiscountAmount, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Session Fee Discount</span>
                <strong style={{ color: 'var(--color-success)' }}>−{formatCurrency(u.sessionFeeDiscountAmount, currency)}</strong>
              </div>
              <div className="breakdown-item">
                <span className="muted">Total Discount</span>
                <strong style={{ color: 'var(--color-success)' }}>−{formatCurrency(u.totalDiscountAmount, currency)}</strong>
              </div>
            </div>
            <div className="breakdown-totals">
              <div>
                <span className="muted">Final (excl. tax)</span>
                <strong>{formatCurrency(u.finalChargeExcludingTax, currency)}</strong>
              </div>
              <div>
                <span className="muted">Final (incl. tax)</span>
                <strong style={{ fontSize: '1.1rem' }}>{formatCurrency(u.finalChargeIncludingTax, currency)}</strong>
              </div>
            </div>
            {u.note && (
              <p className="muted" style={{ marginTop: 8, fontSize: '0.85rem' }}>Note: {u.note}</p>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Usage Analytics</p>
          <h1>Utilizations</h1>
          <p className="hero-copy">Track subscription utilization and charge breakdowns</p>
        </div>
      </header>

      {/* toolbar */}
      <section className="allocation-toolbar">
        <div className="allocation-filters">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              className="utilization-search-input"
              placeholder="Enter User ID to search…"
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="primary-button" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <button className="ghost-button action-button" onClick={() => { setShowPreview(true); setPreviewResult(null); }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><line x1="8" y1="5" x2="8" y2="8" /><line x1="8" y1="10.5" x2="8" y2="11" /></svg>
          Preview Charges
        </button>
      </section>

      {/* table */}
      <section className="allocation-table-section">
        {loading ? (
          <TableSkeleton rows={6} cols={7} />
        ) : !searchUserId ? (
          <div className="blank-card tall">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Search for utilizations</p>
              <p className="muted">Enter a User ID above and click Search to view utilization records.</p>
            </div>
          </div>
        ) : paged.length === 0 ? (
          <div className="blank-card tall">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No utilizations found</p>
              <p className="muted">No utilization records found for user <strong>{searchUserId}</strong>.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="subscription-table-wrap">
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '4%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>Plan</th>
                    <th>Session Ref</th>
                    <th>Charging Cost</th>
                    <th>Total Charge</th>
                    <th>Units</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((u) => (
                    <Fragment key={u.id}>
                      <tr
                        className={`utilization-row ${expandedId === u.id ? 'expanded' : ''}`}
                        onClick={() => setExpandedId(expandedId === u.id ? null : u.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <span className={`expand-chevron ${expandedId === u.id ? 'open' : ''}`}>&#9654;</span>
                        </td>
                        <td>
                          <strong style={{ display: 'block' }}>{u.planName}</strong>
                          <span className="muted" style={{ fontSize: '0.8rem' }}>{u.planCode}</span>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{u.sessionReference || '—'}</td>
                        <td>{formatCurrency(u.chargingCost, u.currencyCode)}</td>
                        <td>
                          <strong>{formatCurrency(u.finalChargeIncludingTax, u.currencyCode)}</strong>
                        </td>
                        <td>
                          <Badge variant="info">{u.unitsConsumed}</Badge>
                          {u.remainingQuota !== null && (
                            <span className="muted" style={{ display: 'block', fontSize: '0.75rem' }}>{u.remainingQuota} left</span>
                          )}
                        </td>
                        <td className="muted">{formatDate(u.utilizedAt)}</td>
                      </tr>
                      {expandedId === u.id && renderBreakdown(u)}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="pagination-bar">
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, utilizations.length)} of {utilizations.length}
              </span>
              <div className="pagination-actions">
                <button className="ghost-button" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} className={`pagination-page-button ${i === page ? 'active' : ''}`} onClick={() => setPage(i)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button className="ghost-button" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* preview modal */}
      {showPreview && (
        <div className="dialog-backdrop" onClick={() => setShowPreview(false)}>
          <div className="dialog-card" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px' }}>Preview Charges</h2>
            <p className="muted" style={{ margin: '0 0 16px' }}>
              Calculate estimated charges before recording utilization.
            </p>

            <form onSubmit={handlePreview}>
              <div className="editor-form">
                <div className="field">
                  <span>User ID *</span>
                  <input type="text" placeholder="Enter user ID…" value={previewForm.userId} onChange={(e) => setPreviewForm({ ...previewForm, userId: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="field">
                    <span>Charging Cost *</span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" value={previewForm.chargingCost} onChange={(e) => setPreviewForm({ ...previewForm, chargingCost: e.target.value })} />
                  </div>
                  <div className="field">
                    <span>Session Fee</span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" value={previewForm.sessionFee} onChange={(e) => setPreviewForm({ ...previewForm, sessionFee: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="field">
                    <span>Idle Fee</span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" value={previewForm.idleFee} onChange={(e) => setPreviewForm({ ...previewForm, idleFee: e.target.value })} />
                  </div>
                  <div className="field">
                    <span>Taxes</span>
                    <input type="number" step="0.01" min="0" placeholder="0.00" value={previewForm.taxes} onChange={(e) => setPreviewForm({ ...previewForm, taxes: e.target.value })} />
                  </div>
                </div>

                <div className="field">
                  <span>Units Consumed</span>
                  <input type="number" min="0" placeholder="Optional" value={previewForm.unitsConsumed} onChange={(e) => setPreviewForm({ ...previewForm, unitsConsumed: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
                <button type="button" className="ghost-button" onClick={() => setShowPreview(false)}>Close</button>
                <button type="submit" className="primary-button" disabled={previewLoading}>
                  {previewLoading ? 'Calculating…' : 'Calculate Preview'}
                </button>
              </div>
            </form>

            {/* preview result */}
            {previewResult && (
              <div className="subscription-preview" style={{ marginTop: 20 }}>
                <h4 style={{ margin: 0 }}>Estimated Charges — {previewResult.planName}</h4>
                <div className="subscription-preview-grid">
                  <div>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>Eligible Subtotal</span>
                    <strong>{formatCurrency(previewResult.eligibleSubtotal, previewResult.currencyCode)}</strong>
                  </div>
                  <div>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>Total Discount</span>
                    <strong style={{ color: 'var(--color-success)' }}>−{formatCurrency(previewResult.totalDiscountAmount, previewResult.currencyCode)}</strong>
                  </div>
                  <div>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>Final (excl. tax)</span>
                    <strong>{formatCurrency(previewResult.finalChargeExcludingTax, previewResult.currencyCode)}</strong>
                  </div>
                  <div>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>Final (incl. tax)</span>
                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.15rem' }}>{formatCurrency(previewResult.finalChargeIncludingTax, previewResult.currencyCode)}</strong>
                  </div>
                </div>
                {previewResult.remainingQuotaAfterUse !== null && (
                  <p className="muted" style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>
                    Remaining quota after use: <strong>{previewResult.remainingQuotaAfterUse}</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
