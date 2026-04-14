import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createEvse, listEvses, listManagedChargers } from '../api/chargerManagement';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useToast } from '../hooks/useToast';
import type { ChargerRecord, EvseRecord } from '../types/chargerManagement';

type ViewMode = 'list' | 'add';

const PAGE_SIZE = 100;

export default function EvsesPage() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [view, setView] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [evses, setEvses] = useState<EvseRecord[]>([]);
  const [chargers, setChargers] = useState<ChargerRecord[]>([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    chargerId: '',
    evseUid: '',
    zone: '',
    capabilities: '',
  });

  const activeCount = useMemo(() => evses.filter((item) => item.enabled).length, [evses]);

  useEffect(() => {
    void loadChargers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    void loadEvses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, debouncedSearch]);

  useEffect(() => {
    if (form.chargerId || chargers.length === 0) {
      return;
    }
    setForm((current) => ({ ...current, chargerId: chargers[0]?.chargerId ?? '' }));
  }, [form.chargerId, chargers]);

  async function loadChargers() {
    try {
      const response = await listManagedChargers(token, { limit: 250, offset: 0 });
      setChargers(response.items);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load chargers for EVSE mapping.', 'error');
    }
  }

  async function loadEvses() {
    setLoading(true);
    try {
      const response = await listEvses(token, {
        search: debouncedSearch,
        limit: PAGE_SIZE,
        offset: 0,
      });
      setEvses(response.items);
      setTotal(response.total);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load EVSEs.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateEvse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.chargerId) {
      addToast('Select a charger before creating an EVSE.', 'warning');
      return;
    }

    setSaving(true);
    try {
      await createEvse(token, {
        chargerId: form.chargerId,
        evseUid: form.evseUid.trim().toUpperCase(),
        zone: form.zone.trim() || undefined,
        capabilities: form.capabilities.trim() || undefined,
        enabled: true,
      });
      addToast('EVSE created successfully.', 'success');
      setForm({
        chargerId: chargers[0]?.chargerId ?? '',
        evseUid: '',
        zone: '',
        capabilities: '',
      });
      setView('list');
      await loadEvses();
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create EVSE.', 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleView(evse: EvseRecord) {
    setSearch(evse.evseUid);
    setView('list');
  }

  function handleEdit(evse: EvseRecord) {
    setForm({
      chargerId: evse.chargerId,
      evseUid: evse.evseUid,
      zone: evse.zone ?? '',
      capabilities: evse.capabilities ?? '',
    });
    setView('add');
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Operations</p>
          <h1>EVSEs</h1>
          <p className="hero-copy">Persist and manage OCPI EVSE identifiers linked to chargers.</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total EVSEs</span>
          <strong>{total}</strong>
          <small>Persisted EVSE records</small>
        </article>
        <article className="stat-card cool">
          <span>Active EVSEs</span>
          <strong>{activeCount}</strong>
          <small>Enabled and publish-ready</small>
        </article>
        <article className="stat-card warm">
          <span>Chargers</span>
          <strong>{chargers.length}</strong>
          <small>Available charger mappings</small>
        </article>
      </section>

      {view === 'list' ? (
        <section className="single-panel">
          <div className="subscription-filter-bar user-filter-bar">
            <label className="field subscription-search-field">
              <span>Search EVSEs</span>
              <input
                placeholder="Find by EVSE UID, EVSE ID, charger"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="primary-button" onClick={() => setView('add')} type="button">
              Add EVSE
            </button>
          </div>

          <div className="subscription-table-wrap">
            {loading ? <TableSkeleton rows={6} cols={8} /> : null}
            {!loading && evses.length === 0 ? (
              <div className="blank-card">
                <h3>No EVSEs found</h3>
                <p>Create an EVSE record to map charger endpoints.</p>
              </div>
            ) : null}

            {!loading && evses.length > 0 ? (
              <table className="data-table">
                <colgroup>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '7%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>EVSE UID</th>
                    <th>EVSE ID</th>
                    <th>Charger</th>
                    <th>Zone</th>
                    <th>Connectors</th>
                    <th>Capabilities</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {evses.map((evse) => (
                    <tr key={evse.evseId}>
                      <td><code className="code-chip">{evse.evseUid}</code></td>
                      <td>{evse.evseId}</td>
                      <td>{evse.chargerDisplayName} ({evse.chargerId})</td>
                      <td>{evse.zone ?? '—'}</td>
                      <td>{evse.connectorCount}</td>
                      <td>{evse.capabilities ?? '—'}</td>
                      <td>{new Date(evse.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="table-row-actions table-action-icons">
                          <TableActionIconButton icon="view" label="View EVSE" onClick={() => handleView(evse)} />
                          <TableActionIconButton icon="edit" label="Edit EVSE" onClick={() => handleEdit(evse)} />
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
              <p className="section-label">EVSE</p>
              <h2>Add EVSE</h2>
              <p className="subtle-copy">Create a persisted EVSE record mapped to a charger.</p>
            </div>
            <button className="ghost-button" onClick={() => setView('list')} type="button">
              Back to list
            </button>
          </div>

          <form className="editor-form" onSubmit={handleCreateEvse}>
            <div className="field-grid">
              <label className="field">
                <span>Charger</span>
                <select
                  required
                  value={form.chargerId}
                  onChange={(event) => setForm((current) => ({ ...current, chargerId: event.target.value }))}
                >
                  {chargers.map((charger) => (
                    <option key={charger.chargerId} value={charger.chargerId}>
                      {charger.displayName} ({charger.chargerId})
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>EVSE UID</span>
                <input
                  required
                  type="text"
                  value={form.evseUid}
                  onChange={(event) => setForm((current) => ({ ...current, evseUid: event.target.value }))}
                />
              </label>
              <label className="field">
                <span>Zone</span>
                <input
                  type="text"
                  value={form.zone}
                  onChange={(event) => setForm((current) => ({ ...current, zone: event.target.value }))}
                />
              </label>
              <label className="field field-wide">
                <span>Capabilities (comma separated)</span>
                <input
                  type="text"
                  value={form.capabilities}
                  onChange={(event) => setForm((current) => ({ ...current, capabilities: event.target.value }))}
                  placeholder="REMOTE_START_STOP,RESERVABLE"
                />
              </label>
            </div>

            <div className="form-actions">
              <button className="ghost-button" onClick={() => setView('list')} type="button">
                Cancel
              </button>
              <button className="primary-button" disabled={saving} type="submit">
                {saving ? 'Saving...' : 'Create EVSE'}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
