import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  listPricingPlans,
  listPricingPlansPage,
  getPricingPlan,
  createPricingPlan,
  updatePricingPlan,
  deactivatePricingPlan,
  getPlanHistory,
  reindexPricingSearch,
  syncPricingSearchByPlanId,
} from '../api/pricing';
import type {
  PricingPlan,
  PriceHistory,
  PageResponse,
  CreatePricingPlanRequest,
  PricingType,
  TariffDimension,
  ConnectorType,
  CreatePricingComponentRequest,
} from '../types/pricing';
import { useToast } from '../hooks/useToast';
import { TableSkeleton } from '../components/ui/Skeleton';
import { PaginationControls } from '../components/PaginationControls';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

const PRICING_TYPES: PricingType[] = ['FLAT', 'TIME_OF_USE', 'DYNAMIC', 'TIERED', 'SUBSCRIPTION'];
const DIMENSIONS: TariffDimension[] = ['ENERGY', 'TIME', 'PARKING', 'FLAT', 'RESERVATION'];
const CONNECTOR_TYPES: ConnectorType[] = [
  'CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO', 'TESLA',
  'IEC_62196_T1', 'IEC_62196_T1_COMBO', 'GBT_AC', 'GBT_DC', 'NACS',
];

const DEFAULT_PRICING_PLANS: CreatePricingPlanRequest[] = [
  {
    name: 'Default DC Fast (CCS2)',
    description: 'Default fast charging tariff for CCS2 connectors.',
    currency: 'USD',
    pricingType: 'FLAT',
    connectorType: 'IEC_62196_T2_COMBO',
    components: [{ dimension: 'ENERGY', price: 0.39, stepSize: 1 }],
  },
  {
    name: 'Default AC Level 2',
    description: 'Default AC level 2 tariff for destination charging.',
    currency: 'USD',
    pricingType: 'FLAT',
    connectorType: 'IEC_62196_T2',
    components: [{ dimension: 'ENERGY', price: 0.22, stepSize: 1 }],
  },
  {
    name: 'Default NACS Fast',
    description: 'Default fast charging tariff for NACS connectors.',
    currency: 'USD',
    pricingType: 'FLAT',
    connectorType: 'NACS',
    components: [{ dimension: 'ENERGY', price: 0.36, stepSize: 1 }],
  },
];

type FormMode = 'create' | 'edit';
type PricingStatusFilter = 'all' | 'active' | 'inactive';
type PricingRouteState =
  | { mode: 'list' }
  | { mode: 'view'; planId: string }
  | { mode: 'edit'; planId: string };

const PLANS_PAGE_SIZE = 10;
const emptyPageInfo = {
  total: 0,
  limit: PLANS_PAGE_SIZE,
  offset: 0,
  currentPage: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function PricingPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* form state */
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreatePricingPlanRequest>(emptyForm());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [defaultsSubmitting, setDefaultsSubmitting] = useState(false);
  const [pricingReindexing, setPricingReindexing] = useState(false);
  const [pricingSyncing, setPricingSyncing] = useState(false);
  const [pricingSyncPlanId, setPricingSyncPlanId] = useState('');

  /* detail/history */
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [history, setHistory] = useState<PriceHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [routeState, setRouteState] = useState<PricingRouteState>(() => parsePricingRoute(window.location.pathname));
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PricingStatusFilter>('all');
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState(emptyPageInfo);
  const debouncedSearch = useDebouncedValue(search);

  const isListRoute = routeState.mode === 'list';
  const isViewRoute = routeState.mode === 'view';
  const isEditRoute = routeState.mode === 'edit';

  const navigatePricingRoute = useCallback((path: string, options?: { replace?: boolean }) => {
    const replace = options?.replace ?? false;
    if (replace) {
      window.history.replaceState({ page: 'pricing' }, '', path);
    } else {
      window.history.pushState({ page: 'pricing' }, '', path);
    }
    setRouteState(parsePricingRoute(path));
  }, []);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const active = statusFilter === 'all' ? undefined : statusFilter === 'active';
      const data = await listPricingPlansPage(token, {
        query: debouncedSearch.trim() || undefined,
        active,
        page,
        size: PLANS_PAGE_SIZE,
      });
      const requestedPage = data.number ?? page;
      const normalizedPage = data.totalPages > 0 ? Math.min(requestedPage, data.totalPages - 1) : 0;
      if (requestedPage !== normalizedPage) {
        setPage(normalizedPage);
        return;
      }
      setPlans(Array.isArray(data.content) ? data.content : []);
      setPageInfo(mapPageResponseToPageInfo(data, page));
    } catch (err) {
      setPlans([]);
      setPageInfo(emptyPageInfo);
      setError(err instanceof Error ? err.message : 'Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, statusFilter, token]);

  useEffect(() => {
    if (!isListRoute) return;
    void fetchPlans();
  }, [fetchPlans, isListRoute]);

  useEffect(() => {
    setPage(0);
  }, [search, statusFilter]);

  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parsePricingRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (routeState.mode === 'list') {
      setRouteLoading(false);
      setRouteError(null);
      setSelectedPlan(null);
      setHistory([]);
      return;
    }

    let cancelled = false;
    const { planId } = routeState;

    setRouteLoading(true);
    setHistoryLoading(true);
    setRouteError(null);

    const loadRoutePlan = async () => {
      try {
        const [plan, historyData] = await Promise.all([
          getPricingPlan(token, planId),
          getPlanHistory(token, planId),
        ]);

        if (cancelled) return;

        setSelectedPlan(plan);
        setHistory(Array.isArray(historyData) ? historyData : []);

        if (routeState.mode === 'edit') {
          setFormMode('edit');
          setEditingPlanId(plan.id);
          setFormData(mapPlanToForm(plan));
          setShowForm(false);
        }
      } catch (err) {
        if (cancelled) return;
        setSelectedPlan(null);
        setHistory([]);
        setRouteError(err instanceof Error ? err.message : 'Failed to load pricing plan');
      } finally {
        if (cancelled) return;
        setRouteLoading(false);
        setHistoryLoading(false);
      }
    };

    void loadRoutePlan();
    return () => {
      cancelled = true;
    };
  }, [routeState, token]);

  /* ── handlers ── */

  function openCreateForm() {
    setFormMode('create');
    setEditingPlanId(null);
    setFormData(emptyForm());
    setShowForm(true);
  }

  async function handleSubmitForm() {
    setFormSubmitting(true);
    try {
      const payload = normalizeFormDataForApi(formData);
      if (formMode === 'create') {
        await createPricingPlan(token, payload);
        toast.addToast('Pricing plan created', 'success');
        setShowForm(false);
        await fetchPlans();
      } else if (editingPlanId) {
        const updatedPlan = await updatePricingPlan(token, editingPlanId, payload);
        toast.addToast('Pricing plan updated', 'success');
        await fetchPlans();
        if (isEditRoute) {
          setSelectedPlan(updatedPlan);
          navigatePricingRoute(`/pricing/plans/${encodeURIComponent(editingPlanId)}`, { replace: true });
        } else {
          setShowForm(false);
        }
      }
    } catch (err) {
      toast.addToast(err instanceof Error ? err.message : 'Operation failed', 'error');
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleDeactivate(planId: string) {
    if (!confirm('Are you sure you want to deactivate this pricing plan?')) return;
    try {
      await deactivatePricingPlan(token, planId);
      toast.addToast('Pricing plan deactivated', 'success');
      await fetchPlans();
      if (!isListRoute && selectedPlan?.id === planId) {
        setRouteState(parsePricingRoute(window.location.pathname));
      }
    } catch (err) {
      toast.addToast(err instanceof Error ? err.message : 'Failed to deactivate', 'error');
    }
  }

  async function handleAddDefaultPrices() {
    setDefaultsSubmitting(true);
    try {
      const existingPlans = await listPricingPlans(token);
      const existingPlanNames = new Set(existingPlans.map((plan) => plan.name.trim().toLowerCase()));
      const candidates = DEFAULT_PRICING_PLANS.filter(
        (plan) => !existingPlanNames.has(plan.name.trim().toLowerCase()),
      );

      if (candidates.length === 0) {
        toast.addToast('Default pricing plans already exist.', 'info');
        return;
      }

      let created = 0;
      for (const plan of candidates) {
        await createPricingPlan(token, plan);
        created += 1;
      }

      toast.addToast(`Added ${created} default pricing plan${created === 1 ? '' : 's'}.`, 'success');
      await fetchPlans();
    } catch (err) {
      toast.addToast(err instanceof Error ? err.message : 'Failed to add default pricing plans', 'error');
    } finally {
      setDefaultsSubmitting(false);
    }
  }

  async function handleReindexPricingSearch() {
    setPricingReindexing(true);
    try {
      const result = await reindexPricingSearch(token);
      toast.addToast(
        `Pricing ES reindex completed: ${result.indexedPlans}/${result.totalPlans} indexed, ${result.failedPlans} failed.`,
        result.failedPlans > 0 ? 'warning' : 'success',
      );
    } catch (err) {
      toast.addToast(err instanceof Error ? err.message : 'Failed to reindex pricing search index', 'error');
    } finally {
      setPricingReindexing(false);
    }
  }

  async function handleSyncPricingSearchByPlanId() {
    const planId = pricingSyncPlanId.trim();
    if (!planId) {
      toast.addToast('Enter a pricing plan ID to run selective ES sync.', 'warning');
      return;
    }

    setPricingSyncing(true);
    try {
      const result = await syncPricingSearchByPlanId(token, planId);
      const tone = result.failedPlans > 0 ? 'warning' : 'success';
      toast.addToast(
        `Pricing ES sync (${result.syncType}) for ${result.syncValue}: ${result.indexedPlans}/${result.candidatePlans} indexed, ${result.failedPlans} failed.`,
        tone,
      );
    } catch (err) {
      toast.addToast(err instanceof Error ? err.message : 'Failed selective pricing ES sync', 'error');
    } finally {
      setPricingSyncing(false);
    }
  }

  function addComponent() {
    setFormData((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        { dimension: 'ENERGY' as TariffDimension, price: 0, stepSize: 1 },
      ],
    }));
  }

  function removeComponent(index: number) {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index),
    }));
  }

  function updateComponent(index: number, field: keyof CreatePricingComponentRequest, value: string | number | undefined) {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  }

  function renderPricingPlanFormFields() {
    return (
      <>
        <div className="form-grid">
          <div className="form-field">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Standard DC Fast"
            />
          </div>
          <div className="form-field">
            <label>Currency *</label>
            <input
              type="text"
              value={formData.currency}
              onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value.toUpperCase() }))}
              placeholder="USD"
              maxLength={3}
            />
          </div>
          <div className="form-field">
            <label>Pricing Type *</label>
            <select
              value={formData.pricingType}
              onChange={(e) => setFormData((p) => ({ ...p, pricingType: e.target.value as PricingType }))}
            >
              {PRICING_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Connector Type</label>
            <select
              value={formData.connectorType ?? ''}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  connectorType: e.target.value ? (e.target.value as ConnectorType) : undefined,
                }))
              }
            >
              <option value="">All Connectors</option>
              {CONNECTOR_TYPES.map((ct) => (
                <option key={ct} value={ct}>
                  {ct.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field" style={{ gridColumn: '1 / -1' }}>
            <label>Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="Describe this pricing plan..."
            />
          </div>
          <div className="form-field">
            <label>Location ID</label>
            <input
              type="text"
              value={formData.locationId ?? ''}
              onChange={(e) => setFormData((p) => ({ ...p, locationId: e.target.value || undefined }))}
              placeholder="Optional"
            />
          </div>
          <div className="form-field">
            <label>Valid From</label>
            <input
              type="datetime-local"
              value={formData.validFrom ?? ''}
              onChange={(e) => setFormData((p) => ({ ...p, validFrom: e.target.value || undefined }))}
            />
          </div>
          <div className="form-field">
            <label>Valid To</label>
            <input
              type="datetime-local"
              value={formData.validTo ?? ''}
              onChange={(e) => setFormData((p) => ({ ...p, validTo: e.target.value || undefined }))}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0 }}>Tariff Components</h3>
            <button className="secondary-button" onClick={addComponent} type="button">
              + Add Component
            </button>
          </div>

          {formData.components.length === 0 ? (
            <p className="subtle-copy">No components yet. Add at least one tariff component.</p>
          ) : (
            formData.components.map((comp, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  background: 'var(--card-bg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong>Component #{idx + 1}</strong>
                  <button
                    className="action-button danger"
                    onClick={() => removeComponent(idx)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Dimension *</label>
                    <select
                      value={comp.dimension}
                      onChange={(e) => updateComponent(idx, 'dimension', e.target.value)}
                    >
                      {DIMENSIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Price *</label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={comp.price}
                      onChange={(e) => updateComponent(idx, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Step Size</label>
                    <input
                      type="number"
                      min="1"
                      value={comp.stepSize ?? 1}
                      onChange={(e) => updateComponent(idx, 'stepSize', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  {formData.pricingType === 'TIME_OF_USE' && (
                    <>
                      <div className="form-field">
                        <label>Day of Week</label>
                        <input
                          type="text"
                          value={comp.dayOfWeek ?? ''}
                          onChange={(e) => updateComponent(idx, 'dayOfWeek', e.target.value || undefined)}
                          placeholder="MONDAY"
                        />
                      </div>
                      <div className="form-field">
                        <label>Start Time</label>
                        <input
                          type="time"
                          value={comp.startTime ?? ''}
                          onChange={(e) => updateComponent(idx, 'startTime', e.target.value || undefined)}
                        />
                      </div>
                      <div className="form-field">
                        <label>End Time</label>
                        <input
                          type="time"
                          value={comp.endTime ?? ''}
                          onChange={(e) => updateComponent(idx, 'endTime', e.target.value || undefined)}
                        />
                      </div>
                    </>
                  )}

                  {formData.pricingType === 'TIERED' && (
                    <>
                      <div className="form-field">
                        <label>Tier Min kWh</label>
                        <input
                          type="number"
                          step="0.01"
                          value={comp.tierMinKwh ?? ''}
                          onChange={(e) => updateComponent(idx, 'tierMinKwh', e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Tier Max kWh</label>
                        <input
                          type="number"
                          step="0.01"
                          value={comp.tierMaxKwh ?? ''}
                          onChange={(e) => updateComponent(idx, 'tierMaxKwh', e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </div>
                    </>
                  )}

                  <div className="form-field">
                    <label>Max kWh</label>
                    <input
                      type="number"
                      step="0.01"
                      value={comp.maxKwh ?? ''}
                      onChange={(e) => updateComponent(idx, 'maxKwh', e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </div>
                  <div className="form-field">
                    <label>Max Duration (min)</label>
                    <input
                      type="number"
                      value={comp.maxDurationMinutes ?? ''}
                      onChange={(e) => updateComponent(idx, 'maxDurationMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Revenue Management</p>
          <h1>
            {isListRoute
              ? 'Pricing'
              : isViewRoute
                ? 'Pricing Plan Details'
                : 'Edit Pricing Plan'}
          </h1>
          <p className="hero-copy">
            {isListRoute
              ? 'Manage pricing plans, tariff components, and pricing history'
              : isViewRoute
                ? 'Review a pricing plan and its full change history'
                : 'Update pricing plan details and tariff components'}
          </p>
        </div>
        {isListRoute ? (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="primary-button" onClick={openCreateForm} type="button">
              + New Pricing Plan
            </button>
            <button
              className="secondary-button"
              onClick={handleAddDefaultPrices}
              disabled={defaultsSubmitting}
              type="button"
            >
              {defaultsSubmitting ? 'Adding Defaults...' : 'Add Default Prices'}
            </button>
            <button className="secondary-button" onClick={fetchPlans} type="button">
              Refresh
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className="secondary-button"
              onClick={() => navigatePricingRoute('/pricing')}
              type="button"
            >
              Back To Plans
            </button>
            {selectedPlan && isViewRoute ? (
              <button
                className="primary-button"
                onClick={() => navigatePricingRoute(`/pricing/plans/${encodeURIComponent(selectedPlan.id)}/edit`)}
                type="button"
              >
                Edit Plan
              </button>
            ) : null}
          </div>
        )}
      </header>

      {isListRoute ? (
        <section className="single-panel">
          <div className="panel-header subscription-page-head">
            <div>
              <p className="section-label">Elasticsearch</p>
              <h2>Pricing Sync Controls</h2>
              <p className="subtle-copy">Push pricing plans to ES with full reindex or one-plan selective sync.</p>
            </div>
          </div>

          <div className="subscription-filter-bar user-filter-bar" style={{ marginTop: '0.5rem' }}>
            <label className="field subscription-search-field">
              <span>Selective sync by plan ID</span>
              <input
                placeholder="Pricing plan UUID"
                type="text"
                value={pricingSyncPlanId}
                onChange={(event) => setPricingSyncPlanId(event.target.value)}
              />
            </label>
            <button
              className="secondary-button"
              onClick={handleSyncPricingSearchByPlanId}
              disabled={pricingSyncing || !pricingSyncPlanId.trim()}
              type="button"
            >
              {pricingSyncing ? 'Syncing...' : 'Sync Plan To ES'}
            </button>
            <button
              className="primary-button"
              onClick={handleReindexPricingSearch}
              disabled={pricingReindexing}
              type="button"
            >
              {pricingReindexing ? 'Reindexing...' : 'Full Reindex To ES'}
            </button>
          </div>
        </section>
      ) : null}

      {isListRoute ? (
        <section className="single-panel">
          {error ? (
            <div className="empty-state">
              <p className="subtle-copy">{error}</p>
              <button className="secondary-button" onClick={fetchPlans} type="button">
                Retry
              </button>
            </div>
          ) : null}

          {!error ? (
            <>
              <div className="panel-header subscription-page-head">
                <div>
                  <p className="section-label">Pricing</p>
                  <h2>Pricing plan catalog</h2>
                  <p className="subtle-copy">Browse, filter, and manage active and inactive pricing plans.</p>
                </div>
                <span className="count-chip">{pageInfo.total}</span>
              </div>

              <div className="subscription-filter-bar user-filter-bar">
                <label className="field subscription-search-field">
                  <span>Search pricing plans</span>
                  <input
                    placeholder="Find by plan name, type, connector, currency, location"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <label className="field user-status-filter">
                  <span>Status</span>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as PricingStatusFilter)}
                  >
                    <option value="all">All plans</option>
                    <option value="active">Active only</option>
                    <option value="inactive">Inactive only</option>
                  </select>
                </label>
              </div>

              <div className="subscription-table-wrap">
                {loading ? <TableSkeleton rows={6} cols={9} /> : null}
                {!loading && plans.length === 0 ? (
                  <div className="blank-card">
                    <h3>No pricing plans found</h3>
                    <p>Try a different search term or status filter.</p>
                  </div>
                ) : null}
                {!loading && plans.length > 0 ? (
                  <table className="data-table pricing-plans-table">
                    <colgroup>
                      <col style={{ width: '23%' }} />
                      <col style={{ width: '11%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '14%' }} />
                      <col style={{ width: '11%' }} />
                      <col style={{ width: '9%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '11%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Currency</th>
                        <th>Components</th>
                        <th>Location</th>
                        <th>Connector</th>
                        <th>Status</th>
                        <th>Valid From</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan) => (
                        <tr key={plan.id}>
                          <td className="table-cell-name">
                            <strong>{plan.name}</strong>
                            <p className="table-cell-sub">
                              {plan.description?.trim() ? plan.description : 'No description'}
                            </p>
                          </td>
                          <td>
                            <span className={`badge badge-${plan.pricingType.toLowerCase()}`}>
                              {plan.pricingType.replace('_', ' ')}
                            </span>
                          </td>
                          <td>{plan.currency}</td>
                          <td>{plan.components?.length ?? 0}</td>
                          <td>{plan.locationId ?? '—'}</td>
                          <td>{plan.connectorType?.replace(/_/g, ' ') ?? 'All'}</td>
                          <td>
                            <span className={`status-pill ${plan.active ? 'enabled' : 'disabled'}`}>
                              {plan.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{plan.validFrom ? new Date(plan.validFrom).toLocaleDateString() : '—'}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton
                                icon="view"
                                label="View pricing plan"
                                onClick={() => navigatePricingRoute(`/pricing/plans/${encodeURIComponent(plan.id)}`)}
                              />
                              <TableActionIconButton
                                icon="edit"
                                label="Edit pricing plan"
                                onClick={() => navigatePricingRoute(`/pricing/plans/${encodeURIComponent(plan.id)}/edit`)}
                              />
                              {plan.active ? (
                                <TableActionIconButton
                                  icon="deactivate"
                                  label="Deactivate pricing plan"
                                  onClick={() => handleDeactivate(plan.id)}
                                  tone="danger"
                                />
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>

              {!loading ? <PaginationControls onPageChange={setPage} pageInfo={pageInfo} /> : null}
            </>
          ) : null}
        </section>
      ) : null}

      {(isViewRoute || isEditRoute) ? (
        <section className="single-panel">
          {routeLoading ? <TableSkeleton rows={8} cols={4} /> : null}
          {!routeLoading && routeError ? (
            <div className="empty-state">
              <p className="subtle-copy">{routeError}</p>
              <button
                className="secondary-button"
                onClick={() => setRouteState(parsePricingRoute(window.location.pathname))}
                type="button"
              >
                Retry
              </button>
            </div>
          ) : null}

          {!routeLoading && !routeError && selectedPlan ? (
            <>
              {isViewRoute ? (
                <>
                  <div className="panel-header subscription-page-head" style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <p className="section-label">Pricing</p>
                      <h2>{selectedPlan.name}</h2>
                      <p className="subtle-copy">URL: {`/pricing/plans/${selectedPlan.id}`}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className={`status-pill ${selectedPlan.active ? 'enabled' : 'disabled'}`}>
                        {selectedPlan.active ? 'Active' : 'Inactive'}
                      </span>
                      {selectedPlan.active ? (
                        <button
                          className="secondary-button"
                          onClick={() => handleDeactivate(selectedPlan.id)}
                          type="button"
                        >
                          Deactivate
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="subscription-table-wrap" style={{ marginBottom: '1rem' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Plan</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Currency</th>
                          <th>Location</th>
                          <th>Connector</th>
                          <th>Valid From</th>
                          <th>Valid To</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-cell-name">
                            <strong>{selectedPlan.name}</strong>
                            <p className="table-cell-sub">
                              {selectedPlan.description?.trim() ? selectedPlan.description : 'No description'}
                            </p>
                          </td>
                          <td>{selectedPlan.pricingType.replace('_', ' ')}</td>
                          <td>
                            <span className={`status-pill ${selectedPlan.active ? 'enabled' : 'disabled'}`}>
                              {selectedPlan.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{selectedPlan.currency}</td>
                          <td>{selectedPlan.locationId ?? '—'}</td>
                          <td>{selectedPlan.connectorType?.replace(/_/g, ' ') ?? 'All'}</td>
                          <td>{selectedPlan.validFrom ? new Date(selectedPlan.validFrom).toLocaleString() : '—'}</td>
                          <td>{selectedPlan.validTo ? new Date(selectedPlan.validTo).toLocaleString() : '—'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="panel-header" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>Tariff components</h3>
                  </div>
                  <div className="subscription-table-wrap" style={{ marginBottom: '1rem' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Dimension</th>
                          <th>Price</th>
                          <th>Step Size</th>
                          <th>Day/Time</th>
                          <th>Tier (kWh)</th>
                          <th>Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPlan.components.length === 0 ? (
                          <tr>
                            <td colSpan={6}>No tariff components configured.</td>
                          </tr>
                        ) : (
                          selectedPlan.components.map((component, index) => (
                            <tr key={`${selectedPlan.id}-${component.dimension}-${index}`}>
                              <td>{component.dimension}</td>
                              <td>{component.price.toFixed(4)}</td>
                              <td>{component.stepSize ?? 1}</td>
                              <td>
                                {component.dayOfWeek
                                  ? `${component.dayOfWeek} ${component.startTime ?? ''}${component.endTime ? ` - ${component.endTime}` : ''}`
                                  : '—'}
                              </td>
                              <td>
                                {component.tierMinKwh != null || component.tierMaxKwh != null
                                  ? `${component.tierMinKwh ?? 0} - ${component.tierMaxKwh ?? '∞'}`
                                  : '—'}
                              </td>
                              <td>
                                {component.maxKwh != null
                                  ? `maxKwh: ${component.maxKwh}`
                                  : component.maxDurationMinutes != null
                                    ? `maxDuration: ${component.maxDurationMinutes} min`
                                    : component.maxParkingMinutes != null
                                      ? `maxParking: ${component.maxParkingMinutes} min`
                                      : '—'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="panel-header" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>Change history</h3>
                  </div>
                  {historyLoading ? (
                    <TableSkeleton rows={3} cols={4} />
                  ) : history.length === 0 ? (
                    <div className="empty-state">
                      <p className="subtle-copy">No history records found for this plan.</p>
                    </div>
                  ) : (
                    <div className="subscription-table-wrap">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Changed At</th>
                            <th>Changed By</th>
                            <th>Reason</th>
                            <th>Effective At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map((h) => (
                            <tr key={h.id}>
                              <td>{new Date(h.createdAt).toLocaleString()}</td>
                              <td>{h.changedBy}</td>
                              <td>{h.changeReason}</td>
                              <td>{new Date(h.effectiveAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="panel-header subscription-page-head" style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <p className="section-label">Pricing</p>
                      <h2>Edit: {selectedPlan.name}</h2>
                      <p className="subtle-copy">URL: {`/pricing/plans/${selectedPlan.id}/edit`}</p>
                    </div>
                  </div>
                  <div style={{ maxWidth: '1080px' }}>
                    {renderPricingPlanFormFields()}
                  </div>
                  <div className="form-actions" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
                    <button
                      className="secondary-button"
                      onClick={() => navigatePricingRoute(`/pricing/plans/${encodeURIComponent(selectedPlan.id)}`)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="primary-button"
                      onClick={handleSubmitForm}
                      disabled={formSubmitting || !formData.name || !formData.currency}
                      type="button"
                    >
                      {formSubmitting ? 'Saving...' : 'Update Plan'}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : null}
        </section>
      ) : null}

      {/* ── Create Modal ── */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="modal-content modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create Pricing Plan</h2>
              <button className="modal-close" onClick={() => setShowForm(false)} type="button">
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {renderPricingPlanFormFields()}
            </div>

            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setShowForm(false)} type="button">
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={handleSubmitForm}
                disabled={formSubmitting || !formData.name || !formData.currency}
                type="button"
              >
                {formSubmitting
                  ? 'Saving...'
                  : formMode === 'create'
                    ? 'Create Plan'
                    : 'Update Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function emptyForm(): CreatePricingPlanRequest {
  return {
    name: '',
    description: '',
    currency: 'USD',
    pricingType: 'FLAT',
    components: [{ dimension: 'ENERGY', price: 0.35, stepSize: 1 }],
  };
}

function normalizeFormDataForApi(formData: CreatePricingPlanRequest): CreatePricingPlanRequest {
  return {
    ...formData,
    validFrom: toApiInstant(formData.validFrom),
    validTo: toApiInstant(formData.validTo),
  };
}

function toApiInstant(value?: string): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString();
}

function toDateTimeLocalValue(value?: string | null): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const timezoneOffsetMs = parsed.getTimezoneOffset() * 60_000;
  return new Date(parsed.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

function mapPlanToForm(plan: PricingPlan): CreatePricingPlanRequest {
  return {
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    pricingType: plan.pricingType,
    locationId: plan.locationId ?? undefined,
    connectorType: plan.connectorType ?? undefined,
    validFrom: toDateTimeLocalValue(plan.validFrom),
    validTo: toDateTimeLocalValue(plan.validTo),
    components: plan.components.map((component) => ({
      dimension: component.dimension,
      price: component.price,
      stepSize: component.stepSize,
      dayOfWeek: component.dayOfWeek ?? undefined,
      startTime: component.startTime ?? undefined,
      endTime: component.endTime ?? undefined,
      tierMinKwh: component.tierMinKwh ?? undefined,
      tierMaxKwh: component.tierMaxKwh ?? undefined,
      minPrice: component.minPrice ?? undefined,
      maxPrice: component.maxPrice ?? undefined,
      maxKwh: component.maxKwh ?? undefined,
      maxDurationMinutes: component.maxDurationMinutes ?? undefined,
      maxParkingMinutes: component.maxParkingMinutes ?? undefined,
    })),
  };
}

function parsePricingRoute(pathname: string): PricingRouteState {
  const normalizedPath = normalizePricingPath(pathname);
  const editMatch = normalizedPath.match(/^\/pricing\/plans\/([^/]+)\/edit$/);
  if (editMatch?.[1]) {
    return { mode: 'edit', planId: decodeURIComponent(editMatch[1]) };
  }

  const viewMatch = normalizedPath.match(/^\/pricing\/plans\/([^/]+)$/);
  if (viewMatch?.[1]) {
    return { mode: 'view', planId: decodeURIComponent(viewMatch[1]) };
  }

  return { mode: 'list' };
}

function normalizePricingPath(pathname: string): string {
  if (!pathname) return '/pricing';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function mapPageResponseToPageInfo(response: PageResponse<PricingPlan>, fallbackPage: number) {
  const limit = response.size ?? PLANS_PAGE_SIZE;
  const currentPage = response.number ?? fallbackPage;
  const totalPages = response.totalPages ?? 0;
  const total = response.totalElements ?? 0;

  return {
    total,
    limit,
    offset: currentPage * limit,
    currentPage,
    totalPages,
    hasNext: currentPage + 1 < totalPages,
    hasPrevious: currentPage > 0,
  };
}
