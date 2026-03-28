import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createSubscriptionPlan, listSubscriptionPlans } from '../api/subscriptions';
import { TableActionIconButton } from './ui/TableActionIconButton';
import type { CreateSubscriptionPlanRequest, SubscriptionPlan, SubscriptionPlanSearchResponse } from '../types/subscription';

type SubscriptionWorkspaceProps = {
  token: string;
  actor: string;
};

type SubscriptionView = 'list' | 'create';

const defaultPlanForm: SubscriptionPlanFormState = {
  code: '',
  name: '',
  description: '',
  currencyCode: 'USD',
  totalFeeDiscountType: 'PERCENTAGE',
  totalFeeDiscountValue: '0',
  sessionFeeDiscountType: 'PERCENTAGE',
  sessionFeeDiscountValue: '0',
  defaultQuotaLimit: '',
};

type SubscriptionPlanFormState = {
  code: string;
  name: string;
  description: string;
  currencyCode: string;
  totalFeeDiscountType: CreateSubscriptionPlanRequest['totalFeeDiscountType'];
  totalFeeDiscountValue: string;
  sessionFeeDiscountType: CreateSubscriptionPlanRequest['sessionFeeDiscountType'];
  sessionFeeDiscountValue: string;
  defaultQuotaLimit: string;
};

export function SubscriptionWorkspace({ token, actor }: SubscriptionWorkspaceProps) {
  const pageSize = 10;
  const [view, setView] = useState<SubscriptionView>('list');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [total, setTotal] = useState(0);
  const [pageInfo, setPageInfo] = useState<SubscriptionPlanSearchResponse>({
    items: [],
    total: 0,
    limit: pageSize,
    offset: 0,
    currentPage: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [page, setPage] = useState(0);
  const [planForm, setPlanForm] = useState<SubscriptionPlanFormState>(defaultPlanForm);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    void loadPlans(page);
  }, [page]);

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return plans;
    }

    return plans.filter((plan) =>
      [plan.name, plan.code, plan.currencyCode, plan.description ?? ''].some((value) => value.toLowerCase().includes(query))
    );
  }, [plans, search]);

  const activePlanCount = useMemo(() => plans.filter((plan) => plan.active).length, [plans]);

  async function loadPlans(nextPage: number) {
    setLoading(true);
    setError(null);

    try {
      const response = await listSubscriptionPlans(token, pageSize, nextPage * pageSize);
      setPlans(response.items);
      setTotal(response.total);
      setPageInfo(response);
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to load subscriptions.'));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload: CreateSubscriptionPlanRequest = {
      code: planForm.code.trim().toUpperCase(),
      name: planForm.name.trim(),
      description: planForm.description.trim(),
      currencyCode: planForm.currencyCode.trim().toUpperCase(),
      totalFeeDiscountType: planForm.totalFeeDiscountType,
      totalFeeDiscountValue: parseDecimal(planForm.totalFeeDiscountValue),
      sessionFeeDiscountType: planForm.sessionFeeDiscountType,
      sessionFeeDiscountValue: parseDecimal(planForm.sessionFeeDiscountValue),
      defaultQuotaLimit: parseOptionalInteger(planForm.defaultQuotaLimit),
    };

    try {
      const created = await createSubscriptionPlan(token, payload);
      setPlanForm(defaultPlanForm);
      setSuccess(`Created subscription ${created.name}.`);
      setPage(0);
      await loadPlans(0);
      setView('list');
    } catch (requestError) {
      setError(extractMessage(requestError, 'Unable to create the subscription.'));
    } finally {
      setSaving(false);
    }
  }

  function handleViewPlan(plan: SubscriptionPlan) {
    setSearch(plan.code);
  }

  function handleEditPlan(plan: SubscriptionPlan) {
    setPlanForm({
      code: plan.code,
      name: plan.name,
      description: plan.description ?? '',
      currencyCode: plan.currencyCode,
      totalFeeDiscountType: plan.totalFeeDiscountType,
      totalFeeDiscountValue: plan.totalFeeDiscountValue,
      sessionFeeDiscountType: plan.sessionFeeDiscountType,
      sessionFeeDiscountValue: plan.sessionFeeDiscountValue,
      defaultQuotaLimit: plan.defaultQuotaLimit === null ? '' : String(plan.defaultQuotaLimit),
    });
    setView('create');
  }

  return (
    <section className="subscription-stack">
      {error ? <p className="error-banner">{error}</p> : null}
      {success ? <p className="success-banner">{success}</p> : null}

      {view === 'list' ? (
        <>
          <section className="stats-grid">
            <article className="stat-card">
              <span>Total subscriptions</span>
              <strong>{total}</strong>
              <small>Plans in catalog</small>
            </article>
            <article className="stat-card cool">
              <span>Active subscriptions</span>
              <strong>{activePlanCount}</strong>
              <small>Available for allocation</small>
            </article>
            <article className="stat-card warm">
              <span>Search results</span>
              <strong>{filteredPlans.length}</strong>
              <small>Matching the current filter</small>
            </article>
            <article className="stat-card muted">
              <span>Catalog owner</span>
              <strong>{initialsForActor(actor)}</strong>
              <small>{actor}</small>
            </article>
          </section>

          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Subscription</p>
                <h2>Subscription list</h2>
                <p className="subtle-copy">Review available subscription plans and open the add flow when you need a new one.</p>
              </div>
              <div className="subscription-toolbar-actions">
                <button className="ghost-button" onClick={() => void loadPlans(page)} type="button">
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button className="primary-button" onClick={() => setView('create')} type="button">
                  Add subscription
                </button>
              </div>
            </div>

            <div className="subscription-filter-bar">
              <label className="field subscription-search-field">
                <span>Search subscriptions</span>
                <input
                  placeholder="Find by name, code, currency, or description"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            <div className="subscription-table-wrap">
              {loading ? <p className="subtle-copy">Loading subscriptions...</p> : null}
              {!loading && filteredPlans.length === 0 ? (
                <div className="blank-card">
                  <h3>No subscriptions found</h3>
                  <p>Try a different search term or create a new subscription plan.</p>
                </div>
              ) : null}
              {!loading && filteredPlans.length > 0 ? (
                <>
                  {/* Desktop / tablet table */}
                  <table className="data-table">
                    <colgroup>
                      <col className="col-name" />
                      <col className="col-code" />
                      <col className="col-currency" />
                      <col className="col-status" />
                      <col className="col-total-disc" />
                      <col className="col-session-disc" />
                      <col className="col-quota" />
                      <col className="col-user-actions" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Currency</th>
                        <th>Status</th>
                        <th>Total Fee Discount</th>
                        <th>Session Fee Discount</th>
                        <th>Quota</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlans.map((plan) => (
                        <tr key={plan.id}>
                          <td>
                            <div className="table-cell-name">
                              <strong>{plan.name}</strong>
                              {plan.description ? (
                                <p className="subtle-copy table-cell-sub">{plan.description}</p>
                              ) : null}
                            </div>
                          </td>
                          <td><code className="code-chip">{plan.code}</code></td>
                          <td>{plan.currencyCode}</td>
                          <td>
                            <span className={`status-pill ${plan.active ? 'enabled' : 'disabled'}`}>
                              {plan.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <span className="table-discount-value">{formatDiscount(plan.totalFeeDiscountValue, plan.totalFeeDiscountType)}</span>
                          </td>
                          <td>
                            <span className="table-discount-value">{formatDiscount(plan.sessionFeeDiscountValue, plan.sessionFeeDiscountType)}</span>
                          </td>
                          <td>{plan.defaultQuotaLimit ?? <span className="subtle-copy">Flexible</span>}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton icon="view" label="View subscription plan" onClick={() => handleViewPlan(plan)} />
                              <TableActionIconButton icon="edit" label="Edit subscription plan" onClick={() => handleEditPlan(plan)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile card list */}
                  <div className="subscription-card-list">
                    {filteredPlans.map((plan) => (
                      <article className="subscription-mobile-card" key={plan.id}>
                        <div className="subscription-mobile-card-head">
                          <div>
                            <strong>{plan.name}</strong>
                            <p className="subtle-copy">{plan.code} · {plan.currencyCode}</p>
                          </div>
                          <span className={`status-pill ${plan.active ? 'enabled' : 'disabled'}`}>
                            {plan.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        {plan.description ? <p className="subtle-copy">{plan.description}</p> : null}

                        <div className="subscription-mobile-card-meta">
                          <span className="role-pill">{humanize(plan.totalFeeDiscountType)} total fee</span>
                          <span className="role-pill">{humanize(plan.sessionFeeDiscountType)} session fee</span>
                          <span className="role-pill">Quota {plan.defaultQuotaLimit ?? 'Flexible'}</span>
                        </div>

                        <div className="subscription-mobile-card-details">
                          <div>
                            <span className="subtle-copy">Total fee discount</span>
                            <strong>{plan.totalFeeDiscountValue}</strong>
                          </div>
                          <div>
                            <span className="subtle-copy">Session fee discount</span>
                            <strong>{plan.sessionFeeDiscountValue}</strong>
                          </div>
                          <div>
                            <span className="subtle-copy">Created</span>
                            <strong>{formatDate(plan.createdAt)}</strong>
                          </div>
                          <div>
                            <span className="subtle-copy">Updated</span>
                            <strong>{formatDate(plan.updatedAt)}</strong>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <PaginationControls
              pageInfo={pageInfo}
              onPageChange={setPage}
            />
          </section>
        </>
      ) : null}

      {view === 'create' ? (
        <section className="single-panel subscription-create-page">
          <div className="panel-header subscription-page-head">
            <div>
              <p className="section-label">Subscription</p>
              <h2>Add subscription</h2>
              <p className="subtle-copy">Create a new subscription plan and return to the list when you are done.</p>
            </div>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Back to list
            </button>
          </div>

          <form className="editor-form" onSubmit={handleCreatePlan}>
            <div className="field-grid">
              <label className="field">
                <span>Subscription code</span>
                <input
                  required
                  type="text"
                  value={planForm.code}
                  onChange={(event) => setPlanForm((current) => ({ ...current, code: event.target.value }))}
                />
              </label>

              <label className="field">
                <span>Subscription name</span>
                <input
                  required
                  type="text"
                  value={planForm.name}
                  onChange={(event) => setPlanForm((current) => ({ ...current, name: event.target.value }))}
                />
              </label>

              <label className="field field-wide">
                <span>Description</span>
                <input
                  type="text"
                  value={planForm.description}
                  onChange={(event) => setPlanForm((current) => ({ ...current, description: event.target.value }))}
                />
              </label>

              <label className="field">
                <span>Currency code</span>
                <input
                  maxLength={3}
                  required
                  type="text"
                  value={planForm.currencyCode}
                  onChange={(event) =>
                    setPlanForm((current) => ({ ...current, currencyCode: event.target.value.toUpperCase() }))
                  }
                />
              </label>

              <label className="field">
                <span>Default quota</span>
                <input
                  min="1"
                  type="number"
                  value={planForm.defaultQuotaLimit}
                  onChange={(event) =>
                    setPlanForm((current) => ({ ...current, defaultQuotaLimit: event.target.value }))
                  }
                />
              </label>

              <label className="field">
                <span>Total fee discount type</span>
                <select
                  value={planForm.totalFeeDiscountType}
                  onChange={(event) =>
                    setPlanForm((current) => ({
                      ...current,
                      totalFeeDiscountType: event.target.value as CreateSubscriptionPlanRequest['totalFeeDiscountType'],
                    }))
                  }
                >
                  <option value="NONE">None</option>
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED_AMOUNT">Fixed amount</option>
                </select>
              </label>

              <label className="field">
                <span>Total fee discount value</span>
                <input
                  min="0"
                  step="0.01"
                  required
                  type="number"
                  value={planForm.totalFeeDiscountValue}
                  onChange={(event) =>
                    setPlanForm((current) => ({ ...current, totalFeeDiscountValue: event.target.value }))
                  }
                />
              </label>

              <label className="field">
                <span>Session fee discount type</span>
                <select
                  value={planForm.sessionFeeDiscountType}
                  onChange={(event) =>
                    setPlanForm((current) => ({
                      ...current,
                      sessionFeeDiscountType: event.target.value as CreateSubscriptionPlanRequest['sessionFeeDiscountType'],
                    }))
                  }
                >
                  <option value="NONE">None</option>
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED_AMOUNT">Fixed amount</option>
                </select>
              </label>

              <label className="field">
                <span>Session fee discount value</span>
                <input
                  min="0"
                  step="0.01"
                  required
                  type="number"
                  value={planForm.sessionFeeDiscountValue}
                  onChange={(event) =>
                    setPlanForm((current) => ({ ...current, sessionFeeDiscountValue: event.target.value }))
                  }
                />
              </label>
            </div>

            <div className="form-actions">
              <button className="ghost-button" onClick={() => setView('list')} type="button">
                Cancel
              </button>
              <button className="primary-button" disabled={saving} type="submit">
                {saving ? 'Creating subscription...' : 'Create subscription'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </section>
  );
}

function parseDecimal(value: string) {
  return Number.parseFloat(value || '0');
}

function parseOptionalInteger(value: string) {
  const normalized = value.trim();
  return normalized ? Number.parseInt(normalized, 10) : null;
}

function extractMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

function humanize(value: string) {
  const mapped: Record<string, string> = {
    PERCENTAGE: '%',
    FIXED_AMOUNT: 'Fixed amount',
    NONE: 'None',
  };
  return mapped[value] ?? value.replace(/_/g, ' ');
}

function formatDiscount(value: string, discountType: string) {
  if (discountType === 'NONE') return 'None';
  if (discountType === 'PERCENTAGE') return `${value}%`;
  if (discountType === 'FIXED_AMOUNT') return `${value} fixed`;
  return value;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(value));
}

function initialsForActor(value: string) {
  const words = value
    .split('@')[0]
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) {
    return 'SA';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
}

function PaginationControls({
  pageInfo,
  onPageChange,
}: {
  pageInfo: SubscriptionPlanSearchResponse;
  onPageChange: (page: number) => void;
}) {
  const pages = buildVisiblePages(pageInfo.currentPage, pageInfo.totalPages);
  const start = pageInfo.total === 0 ? 0 : pageInfo.offset + 1;
  const end = Math.min(pageInfo.total, pageInfo.offset + pageInfo.limit);

  return (
    <div className="pagination-bar">
      <p className="subtle-copy">
        Showing {start}-{end} of {pageInfo.total}
      </p>
      <div className="pagination-actions">
        <button className="ghost-button" disabled={!pageInfo.hasPrevious} onClick={() => onPageChange(0)} type="button">
          First
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasPrevious}
          onClick={() => onPageChange(pageInfo.currentPage - 1)}
          type="button"
        >
          Previous
        </button>
        <div className="pagination-pages">
          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <span className="pagination-ellipsis" key={`ellipsis-${index}`}>
                ...
              </span>
            ) : (
              <button
                className={`pagination-page-button ${page === pageInfo.currentPage ? 'active' : ''}`}
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page + 1}
              </button>
            )
          )}
        </div>
        <button className="ghost-button" disabled={!pageInfo.hasNext} onClick={() => onPageChange(pageInfo.currentPage + 1)} type="button">
          Next
        </button>
        <button
          className="ghost-button"
          disabled={!pageInfo.hasNext || pageInfo.totalPages === 0}
          onClick={() => onPageChange(Math.max(pageInfo.totalPages - 1, 0))}
          type="button"
        >
          Last
        </button>
      </div>
    </div>
  );
}

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = new Set<number>([0, 1, currentPage - 1, currentPage, currentPage + 1, totalPages - 2, totalPages - 1]);
  const sorted = Array.from(pages).filter((page) => page >= 0 && page < totalPages).sort((a, b) => a - b);
  const visible: Array<number | 'ellipsis'> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];
    if (index > 0 && previous !== undefined && page - previous > 1) {
      visible.push('ellipsis');
    }
    visible.push(page);
  }

  return visible;
}
