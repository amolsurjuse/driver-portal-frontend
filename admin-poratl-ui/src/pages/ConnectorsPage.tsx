import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createConnector, listConnectors, listEvses } from '../api/chargerManagement';
import { listPricingPlans } from '../api/pricing';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useToast } from '../hooks/useToast';
import type { ConnectorRecord, EvseRecord } from '../types/chargerManagement';
import type { PricingPlan } from '../types/pricing';

type ViewMode = 'list' | 'add';

const PAGE_SIZE = 100;
const connectorStandards = ['CCS1', 'CCS2', 'NACS', 'CHADEMO', 'IEC_62196_T2', 'IEC_62196_T2_COMBO'];
const connectorFormats = ['SOCKET', 'CABLE'];
const powerTypes = ['AC_1_PHASE', 'AC_3_PHASE', 'DC'];

export default function ConnectorsPage() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [view, setView] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [connectors, setConnectors] = useState<ConnectorRecord[]>([]);
  const [evses, setEvses] = useState<EvseRecord[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    connectorId: '',
    evseId: '',
    standard: connectorStandards[0] ?? 'CCS1',
    format: connectorFormats[0] ?? 'SOCKET',
    powerType: powerTypes[0] ?? 'DC',
    maxPowerKw: '120',
    ocpiTariffIds: [] as string[],
  });

  const activeCount = useMemo(() => connectors.filter((item) => item.enabled).length, [connectors]);

  useEffect(() => {
    void Promise.all([loadEvses(), loadPricingPlans()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    void loadConnectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, debouncedSearch]);

  useEffect(() => {
    if (form.evseId || evses.length === 0) {
      return;
    }
    setForm((current) => ({ ...current, evseId: evses[0]?.evseId ?? '' }));
  }, [form.evseId, evses]);

  async function loadEvses() {
    try {
      const response = await listEvses(token, { limit: 250, offset: 0 });
      setEvses(response.items);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load EVSEs for connector mapping.', 'error');
    }
  }

  async function loadPricingPlans() {
    try {
      const plans = await listPricingPlans(token);
      setPricingPlans(Array.isArray(plans) ? plans : []);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load pricing plans for connector tariffs.', 'warning');
    }
  }

  async function loadConnectors() {
    setLoading(true);
    try {
      const response = await listConnectors(token, {
        search: debouncedSearch,
        limit: PAGE_SIZE,
        offset: 0,
      });
      setConnectors(response.items);
      setTotal(response.total);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load connectors.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateConnector(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.evseId) {
      addToast('Select an EVSE before creating a connector.', 'warning');
      return;
    }

    setSaving(true);
    try {
      await createConnector(token, {
        connectorId: form.connectorId.trim().toUpperCase(),
        evseId: form.evseId,
        standard: form.standard,
        format: form.format,
        powerType: form.powerType,
        maxPowerKw: Number.parseFloat(form.maxPowerKw),
        ocpiTariffIds: form.ocpiTariffIds,
        enabled: true,
      });
      addToast('Connector created successfully.', 'success');
      setForm({
        connectorId: '',
        evseId: evses[0]?.evseId ?? '',
        standard: connectorStandards[0] ?? 'CCS1',
        format: connectorFormats[0] ?? 'SOCKET',
        powerType: powerTypes[0] ?? 'DC',
        maxPowerKw: '120',
        ocpiTariffIds: [],
      });
      setView('list');
      await loadConnectors();
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create connector.', 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleView(connector: ConnectorRecord) {
    setSearch(connector.connectorId);
    setView('list');
  }

  function handleEdit(connector: ConnectorRecord) {
    setForm({
      connectorId: connector.connectorId,
      evseId: connector.evseId,
      standard: connector.standard,
      format: connector.format,
      powerType: connector.powerType,
      maxPowerKw: String(connector.maxPowerKw),
      ocpiTariffIds: connector.ocpiTariffIds ?? [],
    });
    setView('add');
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Operations</p>
          <h1>Connectors</h1>
          <p className="hero-copy">Assign OCPI connector tariffs (`tariff_ids`) directly on persisted connectors.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total connectors</span>
          <strong>{total}</strong>
          <small>Persisted connector records</small>
        </article>
        <article className="stat-card cool">
          <span>Active connectors</span>
          <strong>{activeCount}</strong>
          <small>Enabled and available</small>
        </article>
        <article className="stat-card warm">
          <span>EVSE mappings</span>
          <strong>{evses.length}</strong>
          <small>Connector parent EVSE records</small>
        </article>
      </section>

      {view === 'list' ? (
        <section className="single-panel">
          <div className="subscription-filter-bar user-filter-bar">
            <label className="field subscription-search-field">
              <span>Search connectors</span>
              <input
                placeholder="Find by connector ID, EVSE UID, charger, standard"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="primary-button" onClick={() => setView('add')} type="button">
              Add Connector
            </button>
          </div>

          <div className="subscription-table-wrap">
            {loading ? <TableSkeleton rows={6} cols={9} /> : null}
            {!loading && connectors.length === 0 ? (
              <div className="blank-card">
                <h3>No connectors found</h3>
                <p>Create connector records and assign OCPI tariff IDs.</p>
              </div>
            ) : null}

            {!loading && connectors.length > 0 ? (
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Connector ID</th>
                    <th>EVSE UID</th>
                    <th>Charger</th>
                    <th>Standard</th>
                    <th>Format</th>
                    <th>Power Type</th>
                    <th>Power</th>
                    <th>OCPI Tariff IDs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connectors.map((connector) => (
                    <tr key={connector.connectorId}>
                      <td><code className="code-chip">{connector.connectorId}</code></td>
                      <td>{connector.evseUid}</td>
                      <td>{connector.chargerId}</td>
                      <td>{connector.standard}</td>
                      <td>{connector.format}</td>
                      <td>{connector.powerType}</td>
                      <td>{connector.maxPowerKw} kW</td>
                      <td>
                        {connector.ocpiTariffIds?.length
                          ? `${connector.ocpiTariffIds.slice(0, 2).join(', ')}${connector.ocpiTariffIds.length > 2 ? ` +${connector.ocpiTariffIds.length - 2}` : ''}`
                          : '—'}
                      </td>
                      <td>
                        <div className="table-row-actions table-action-icons">
                          <TableActionIconButton icon="view" label="View connector" onClick={() => handleView(connector)} />
                          <TableActionIconButton icon="edit" label="Edit connector" onClick={() => handleEdit(connector)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </section>
      ) : null}

      {view === 'add' ? (
        <section className="single-panel">
          <div className="panel-header subscription-page-head">
            <div>
              <p className="section-label">Connector</p>
              <h2>Add connector</h2>
              <p className="subtle-copy">Assign connector profile and OCPI tariff IDs.</p>
            </div>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Back to list
            </button>
          </div>

          <form className="editor-form" onSubmit={handleCreateConnector}>
            <div className="field-grid">
              <label className="field">
                <span>Connector ID</span>
                <input
                  required
                  type="text"
                  value={form.connectorId}
                  onChange={(event) => setForm((current) => ({ ...current, connectorId: event.target.value }))}
                />
              </label>
              <label className="field">
                <span>EVSE</span>
                <select
                  required
                  value={form.evseId}
                  onChange={(event) => setForm((current) => ({ ...current, evseId: event.target.value }))}
                >
                  {evses.map((evse) => (
                    <option key={evse.evseId} value={evse.evseId}>
                      {evse.evseUid} ({evse.chargerDisplayName})
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Standard</span>
                <select
                  required
                  value={form.standard}
                  onChange={(event) => setForm((current) => ({ ...current, standard: event.target.value }))}
                >
                  {connectorStandards.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Format</span>
                <select
                  required
                  value={form.format}
                  onChange={(event) => setForm((current) => ({ ...current, format: event.target.value }))}
                >
                  {connectorFormats.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Power type</span>
                <select
                  required
                  value={form.powerType}
                  onChange={(event) => setForm((current) => ({ ...current, powerType: event.target.value }))}
                >
                  {powerTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Max power (kW)</span>
                <input
                  min={1}
                  required
                  type="number"
                  value={form.maxPowerKw}
                  onChange={(event) => setForm((current) => ({ ...current, maxPowerKw: event.target.value }))}
                />
              </label>
              <label className="field field-wide">
                <span>OCPI Tariff IDs (Connector `tariff_ids`)</span>
                <select
                  multiple
                  size={Math.min(6, Math.max(pricingPlans.length, 3))}
                  value={form.ocpiTariffIds}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ocpiTariffIds: Array.from(event.target.selectedOptions).map((option) => option.value),
                    }))
                  }
                >
                  {pricingPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.currency}) - {plan.id}
                    </option>
                  ))}
                </select>
                <small className="subtle-copy">
                  Choose one or more tariffs. These map to OCPI `Connector.tariff_ids`.
                </small>
              </label>
            </div>

            <div className="form-actions">
              <button className="ghost-button" onClick={() => setView('list')} type="button">
                Cancel
              </button>
              <button className="primary-button" disabled={saving} type="submit">
                {saving ? 'Saving...' : 'Create connector'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
