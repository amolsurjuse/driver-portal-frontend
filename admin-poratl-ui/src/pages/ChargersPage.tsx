import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createManagedCharger, listLocations, listManagedChargers } from '../api/chargerManagement';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useToast } from '../hooks/useToast';
import type { ChargerRecord, LocationRecord } from '../types/chargerManagement';

type ViewMode = 'list' | 'add';

const PAGE_SIZE = 100;

export default function ChargersPage() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [view, setView] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [chargers, setChargers] = useState<ChargerRecord[]>([]);
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    chargerId: '',
    displayName: '',
    locationId: '',
    model: '',
    ocppVersion: 'OCPP201' as 'OCPP16J' | 'OCPP201',
    maxPowerKw: '180',
  });

  const activeCount = useMemo(() => chargers.filter((item) => item.enabled).length, [chargers]);

  useEffect(() => {
    void loadLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    void loadChargers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, debouncedSearch]);

  useEffect(() => {
    if (form.locationId || locations.length === 0) {
      return;
    }
    setForm((current) => ({ ...current, locationId: locations[0]?.locationId ?? '' }));
  }, [form.locationId, locations]);

  async function loadLocations() {
    try {
      const response = await listLocations(token, { limit: 250, offset: 0 });
      setLocations(response.items);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load charger locations.', 'error');
    }
  }

  async function loadChargers() {
    setLoading(true);
    try {
      const response = await listManagedChargers(token, {
        search: debouncedSearch,
        limit: PAGE_SIZE,
        offset: 0,
      });
      setChargers(response.items);
      setTotal(response.total);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load chargers.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCharger(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.locationId) {
      addToast('Select a location before creating a charger.', 'warning');
      return;
    }

    setSaving(true);
    try {
      await createManagedCharger(token, {
        chargerId: form.chargerId.trim().toUpperCase(),
        displayName: form.displayName.trim(),
        locationId: form.locationId,
        model: form.model.trim(),
        ocppVersion: form.ocppVersion,
        maxPowerKw: Number.parseFloat(form.maxPowerKw),
        enabled: true,
      });
      addToast('Charger created successfully.', 'success');
      setForm({
        chargerId: '',
        displayName: '',
        locationId: locations[0]?.locationId ?? '',
        model: '',
        ocppVersion: 'OCPP201',
        maxPowerKw: '180',
      });
      setView('list');
      await loadChargers();
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create charger.', 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleView(charger: ChargerRecord) {
    setSearch(charger.chargerId);
    setView('list');
  }

  function handleEdit(charger: ChargerRecord) {
    setForm({
      chargerId: charger.chargerId,
      displayName: charger.displayName,
      locationId: charger.locationId,
      model: charger.model,
      ocppVersion: charger.ocppVersion,
      maxPowerKw: String(charger.maxPowerKw),
    });
    setView('add');
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Operations</p>
          <h1>Chargers</h1>
          <p className="hero-copy">Manage charger inventory and map each charger to enterprise, network, and location.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total chargers</span>
          <strong>{total}</strong>
          <small>All registered chargers</small>
        </article>
        <article className="stat-card cool">
          <span>Active chargers</span>
          <strong>{activeCount}</strong>
          <small>Enabled and available</small>
        </article>
        <article className="stat-card warm">
          <span>Known locations</span>
          <strong>{locations.length}</strong>
          <small>Mapped charger locations</small>
        </article>
      </section>

      {view === 'list' ? (
        <section className="single-panel">
          <div className="subscription-filter-bar user-filter-bar">
            <label className="field subscription-search-field">
              <span>Search chargers</span>
              <input
                placeholder="Find by charger id, name, model, location"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="primary-button" onClick={() => setView('add')} type="button">
              Add Charger
            </button>
          </div>

          <div className="subscription-table-wrap">
            {loading ? <TableSkeleton rows={6} cols={9} /> : null}
            {!loading && chargers.length === 0 ? (
              <div className="blank-card">
                <h3>No chargers found</h3>
                <p>Create a charger to get started.</p>
              </div>
            ) : null}

            {!loading && chargers.length > 0 ? (
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '6%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Charger ID</th>
                    <th>Name</th>
                    <th>Enterprise</th>
                    <th>Network</th>
                    <th>Location</th>
                    <th>Model</th>
                    <th>OCPP</th>
                    <th>Power</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {chargers.map((charger) => (
                    <tr key={charger.chargerId}>
                      <td><code className="code-chip">{charger.chargerId}</code></td>
                      <td>{charger.displayName}</td>
                      <td>{charger.enterpriseName}</td>
                      <td>{charger.networkName}</td>
                      <td>{charger.locationName}</td>
                      <td>{charger.model}</td>
                      <td>{charger.ocppVersion}</td>
                      <td>{charger.maxPowerKw} kW</td>
                      <td>
                        <div className="table-row-actions table-action-icons">
                          <TableActionIconButton icon="view" label="View charger" onClick={() => handleView(charger)} />
                          <TableActionIconButton icon="edit" label="Edit charger" onClick={() => handleEdit(charger)} />
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
              <p className="section-label">Charger</p>
              <h2>Add charger</h2>
              <p className="subtle-copy">Capture charger details and map it to a location.</p>
            </div>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Back to list
            </button>
          </div>

          <form className="editor-form" onSubmit={handleCreateCharger}>
            <div className="field-grid">
              <label className="field">
                <span>Charger ID</span>
                <input
                  required
                  type="text"
                  value={form.chargerId}
                  onChange={(event) => setForm((current) => ({ ...current, chargerId: event.target.value }))}
                />
              </label>
              <label className="field">
                <span>Display name</span>
                <input
                  required
                  type="text"
                  value={form.displayName}
                  onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
                />
              </label>
              <label className="field">
                <span>Location</span>
                <select
                  required
                  value={form.locationId}
                  onChange={(event) => setForm((current) => ({ ...current, locationId: event.target.value }))}
                >
                  {locations.map((location) => (
                    <option key={location.locationId} value={location.locationId}>
                      {location.name} ({location.networkName})
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Model</span>
                <input
                  required
                  type="text"
                  value={form.model}
                  onChange={(event) => setForm((current) => ({ ...current, model: event.target.value }))}
                />
              </label>
              <label className="field">
                <span>OCPP version</span>
                <select
                  required
                  value={form.ocppVersion}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      ocppVersion: event.target.value as 'OCPP16J' | 'OCPP201',
                    }))
                  }
                >
                  <option value="OCPP201">OCPP201</option>
                  <option value="OCPP16J">OCPP16J</option>
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
            </div>

            <div className="form-actions">
              <button className="ghost-button" onClick={() => setView('list')} type="button">
                Cancel
              </button>
              <button className="primary-button" disabled={saving} type="submit">
                {saving ? 'Saving...' : 'Create charger'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
