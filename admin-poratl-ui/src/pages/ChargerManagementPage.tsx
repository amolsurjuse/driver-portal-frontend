import { FormEvent, useEffect, useState } from 'react';
import {
  createEnterprise,
  createLocation,
  createNetwork,
  listEnterprises,
  listLocations,
  listNetworks,
} from '../api/chargerManagement';
import { useAuth } from '../contexts/AuthContext';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useToast } from '../hooks/useToast';
import { TableSkeleton } from '../components/ui/Skeleton';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';
import type { EnterpriseRecord, LocationRecord, NetworkRecord } from '../types/chargerManagement';

type ManagementTab = 'enterprise' | 'network' | 'location';
type ViewMode = 'list' | 'add';
export type ChargerManagementSection = ManagementTab;

const PAGE_SIZE = 100;

type ChargerManagementPageProps = {
  section?: ChargerManagementSection;
};

export default function ChargerManagementPage({ section = 'enterprise' }: ChargerManagementPageProps) {
  const activeTab = section;
  const { token } = useAuth();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [viewByTab, setViewByTab] = useState<Record<ManagementTab, ViewMode>>({
    enterprise: 'list',
    network: 'list',
    location: 'list',
  });

  const [summary, setSummary] = useState({
    enterprises: 0,
    networks: 0,
    locations: 0,
  });

  const [enterprises, setEnterprises] = useState<EnterpriseRecord[]>([]);
  const [networks, setNetworks] = useState<NetworkRecord[]>([]);
  const [locations, setLocations] = useState<LocationRecord[]>([]);

  const [enterpriseLookup, setEnterpriseLookup] = useState<EnterpriseRecord[]>([]);
  const [networkLookup, setNetworkLookup] = useState<NetworkRecord[]>([]);

  const [enterpriseForm, setEnterpriseForm] = useState({
    name: '',
    countryCode: 'US',
    partyId: '',
    timezone: 'America/New_York',
  });

  const [networkForm, setNetworkForm] = useState({
    name: '',
    enterpriseId: '',
    region: '',
    operatorEmail: '',
  });

  const [locationForm, setLocationForm] = useState({
    name: '',
    networkId: '',
    city: '',
    address: '',
    ocpiLocationId: '',
  });

  const activeView = viewByTab[activeTab];

  useEffect(() => {
    setSearch('');
  }, [activeTab]);

  useEffect(() => {
    if (networkForm.enterpriseId || enterpriseLookup.length === 0) {
      return;
    }
    setNetworkForm((current) => ({ ...current, enterpriseId: enterpriseLookup[0]?.enterpriseId ?? '' }));
  }, [networkForm.enterpriseId, enterpriseLookup]);

  useEffect(() => {
    if (locationForm.networkId || networkLookup.length === 0) {
      return;
    }
    setLocationForm((current) => ({ ...current, networkId: networkLookup[0]?.networkId ?? '' }));
  }, [locationForm.networkId, networkLookup]);

  useEffect(() => {
    void loadSummary();
    void refreshLookups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    void loadActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeTab, debouncedSearch]);

  async function loadSummary() {
    try {
      const [enterprisePage, networkPage, locationPage] = await Promise.all([
        listEnterprises(token, { limit: 1, offset: 0 }),
        listNetworks(token, { limit: 1, offset: 0 }),
        listLocations(token, { limit: 1, offset: 0 }),
      ]);
      setSummary({
        enterprises: enterprisePage.total,
        networks: networkPage.total,
        locations: locationPage.total,
      });
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load charger management summary.', 'error');
    }
  }

  async function refreshLookups() {
    try {
      const [enterprisePage, networkPage] = await Promise.all([
        listEnterprises(token, { limit: 200, offset: 0 }),
        listNetworks(token, { limit: 200, offset: 0 }),
      ]);
      setEnterpriseLookup(enterprisePage.items);
      setNetworkLookup(networkPage.items);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to load lookup data.', 'error');
    }
  }

  async function loadActiveTab() {
    setLoading(true);
    try {
      if (activeTab === 'enterprise') {
        const page = await listEnterprises(token, { search: debouncedSearch, limit: PAGE_SIZE, offset: 0 });
        setEnterprises(page.items);
      } else if (activeTab === 'network') {
        const page = await listNetworks(token, { search: debouncedSearch, limit: PAGE_SIZE, offset: 0 });
        setNetworks(page.items);
      } else {
        const page = await listLocations(token, { search: debouncedSearch, limit: PAGE_SIZE, offset: 0 });
        setLocations(page.items);
      }
    } catch (error) {
      addToast(error instanceof Error ? error.message : `Unable to load ${activeTab} records.`, 'error');
    } finally {
      setLoading(false);
    }
  }

  function openAddScreen() {
    setViewByTab((current) => ({ ...current, [activeTab]: 'add' }));
  }

  function backToList() {
    setViewByTab((current) => ({ ...current, [activeTab]: 'list' }));
  }

  function handleViewRecord(identifier: string) {
    setSearch(identifier);
    setViewByTab((current) => ({ ...current, [activeTab]: 'list' }));
  }

  function handleEditEnterprise(item: EnterpriseRecord) {
    setEnterpriseForm({
      name: item.name,
      countryCode: item.countryCode,
      partyId: item.partyId,
      timezone: item.timezone,
    });
    setViewByTab((current) => ({ ...current, enterprise: 'add' }));
  }

  function handleEditNetwork(item: NetworkRecord) {
    setNetworkForm({
      name: item.name,
      enterpriseId: item.enterpriseId,
      region: item.region,
      operatorEmail: item.operatorEmail,
    });
    setViewByTab((current) => ({ ...current, network: 'add' }));
  }

  function handleEditLocation(item: LocationRecord) {
    setLocationForm({
      name: item.name,
      networkId: item.networkId,
      city: item.city,
      address: item.address,
      ocpiLocationId: item.ocpiLocationId,
    });
    setViewByTab((current) => ({ ...current, location: 'add' }));
  }

  async function handleCreateEnterprise(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      await createEnterprise(token, {
        name: enterpriseForm.name.trim(),
        countryCode: enterpriseForm.countryCode.trim().toUpperCase(),
        partyId: enterpriseForm.partyId.trim().toUpperCase(),
        timezone: enterpriseForm.timezone.trim(),
        enabled: true,
      });
      addToast('Enterprise created successfully.', 'success');
      setEnterpriseForm({ name: '', countryCode: 'US', partyId: '', timezone: 'America/New_York' });
      setViewByTab((current) => ({ ...current, enterprise: 'list' }));
      await Promise.all([loadSummary(), refreshLookups(), loadActiveTab()]);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create enterprise.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateNetwork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!networkForm.enterpriseId) {
      addToast('Select an enterprise before creating a network.', 'warning');
      return;
    }

    setSaving(true);
    try {
      await createNetwork(token, {
        name: networkForm.name.trim(),
        enterpriseId: networkForm.enterpriseId,
        region: networkForm.region.trim().toUpperCase(),
        operatorEmail: networkForm.operatorEmail.trim().toLowerCase(),
        enabled: true,
      });
      addToast('Network created successfully.', 'success');
      setNetworkForm({
        name: '',
        enterpriseId: enterpriseLookup[0]?.enterpriseId ?? '',
        region: '',
        operatorEmail: '',
      });
      setViewByTab((current) => ({ ...current, network: 'list' }));
      await Promise.all([loadSummary(), refreshLookups(), loadActiveTab()]);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create network.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!locationForm.networkId) {
      addToast('Select a network before creating a location.', 'warning');
      return;
    }

    setSaving(true);
    try {
      await createLocation(token, {
        name: locationForm.name.trim(),
        networkId: locationForm.networkId,
        city: locationForm.city.trim(),
        address: locationForm.address.trim(),
        ocpiLocationId: locationForm.ocpiLocationId.trim().toUpperCase(),
        enabled: true,
      });
      addToast('Location created successfully.', 'success');
      setLocationForm({
        name: '',
        networkId: networkLookup[0]?.networkId ?? '',
        city: '',
        address: '',
        ocpiLocationId: '',
      });
      setViewByTab((current) => ({ ...current, location: 'list' }));
      await Promise.all([loadSummary(), refreshLookups(), loadActiveTab()]);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Unable to create location.', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Operations</p>
          <h1>Charger Management</h1>
          <p className="hero-copy">
            Manage enterprise, network, and location masters before charger onboarding.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Enterprises</span>
          <strong>{summary.enterprises}</strong>
          <small>Tenant organizations</small>
        </article>
        <article className="stat-card warm">
          <span>Networks</span>
          <strong>{summary.networks}</strong>
          <small>Operational clusters</small>
        </article>
        <article className="stat-card cool">
          <span>Locations</span>
          <strong>{summary.locations}</strong>
          <small>OCPI mapped sites</small>
        </article>
      </section>

      <section className="single-panel">
        {activeView === 'list' ? (
          <>
            <div className="subscription-filter-bar user-filter-bar">
              <label className="field subscription-search-field">
                <span>Search {activeTab}</span>
                <input
                  placeholder={`Find ${activeTab} records`}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <button className="primary-button" onClick={openAddScreen} type="button">
                Add {activeTab === 'enterprise' ? 'Enterprise' : activeTab === 'network' ? 'Network' : 'Location'}
              </button>
            </div>

            <div className="subscription-table-wrap">
              {loading ? <TableSkeleton rows={6} cols={7} /> : null}

              {!loading && activeTab === 'enterprise' && enterprises.length === 0 ? (
                <div className="blank-card">
                  <h3>No enterprise records</h3>
                  <p>Create an enterprise to get started.</p>
                </div>
              ) : null}

              {!loading && activeTab === 'enterprise' && enterprises.length > 0 ? (
                <table className="data-table">
                  <colgroup>
                    <col style={{ width: '24%' }} />
                    <col style={{ width: '14%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Enterprise</th>
                      <th>Country</th>
                      <th>Party ID</th>
                      <th>Timezone</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enterprises.map((item) => (
                      <tr key={item.enterpriseId}>
                        <td>
                          <div className="table-cell-name">
                            <strong>{item.name}</strong>
                            <p className="subtle-copy table-cell-sub">{item.enterpriseId}</p>
                          </div>
                        </td>
                        <td>{item.countryCode}</td>
                        <td><code className="code-chip">{item.partyId}</code></td>
                        <td>{item.timezone}</td>
                        <td>
                          <span className={`status-pill ${item.enabled ? 'enabled' : 'disabled'}`}>
                            {item.enabled ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton icon="view" label="View enterprise" onClick={() => handleViewRecord(item.enterpriseId)} />
                            <TableActionIconButton icon="edit" label="Edit enterprise" onClick={() => handleEditEnterprise(item)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}

              {!loading && activeTab === 'network' && networks.length === 0 ? (
                <div className="blank-card">
                  <h3>No network records</h3>
                  <p>Create a network to assign sites and locations.</p>
                </div>
              ) : null}

              {!loading && activeTab === 'network' && networks.length > 0 ? (
                <table className="data-table">
                  <colgroup>
                    <col style={{ width: '22%' }} />
                    <col style={{ width: '18%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Network</th>
                      <th>Enterprise</th>
                      <th>Region</th>
                      <th>Operator</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {networks.map((item) => (
                      <tr key={item.networkId}>
                        <td>
                          <div className="table-cell-name">
                            <strong>{item.name}</strong>
                            <p className="subtle-copy table-cell-sub">{item.networkId}</p>
                          </div>
                        </td>
                        <td>{item.enterpriseName}</td>
                        <td><code className="code-chip">{item.region}</code></td>
                        <td>{item.operatorEmail}</td>
                        <td>
                          <span className={`status-pill ${item.enabled ? 'enabled' : 'disabled'}`}>
                            {item.enabled ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton icon="view" label="View network" onClick={() => handleViewRecord(item.networkId)} />
                            <TableActionIconButton icon="edit" label="Edit network" onClick={() => handleEditNetwork(item)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}

              {!loading && activeTab === 'location' && locations.length === 0 ? (
                <div className="blank-card">
                  <h3>No location records</h3>
                  <p>Create a location to map OCPI and charger assets.</p>
                </div>
              ) : null}

              {!loading && activeTab === 'location' && locations.length > 0 ? (
                <table className="data-table">
                  <colgroup>
                    <col style={{ width: '18%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Network</th>
                      <th>City</th>
                      <th>Address</th>
                      <th>OCPI Location ID</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((item) => (
                      <tr key={item.locationId}>
                        <td>
                          <div className="table-cell-name">
                            <strong>{item.name}</strong>
                            <p className="subtle-copy table-cell-sub">{item.locationId}</p>
                          </div>
                        </td>
                        <td>{item.networkName}</td>
                        <td>{item.city}</td>
                        <td>{item.address}</td>
                        <td><code className="code-chip">{item.ocpiLocationId}</code></td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <div className="table-row-actions table-action-icons">
                            <TableActionIconButton icon="view" label="View location" onClick={() => handleViewRecord(item.locationId)} />
                            <TableActionIconButton icon="edit" label="Edit location" onClick={() => handleEditLocation(item)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </>
        ) : null}

        {activeView === 'add' && activeTab === 'enterprise' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Enterprise</p>
                <h2>Add enterprise</h2>
                <p className="subtle-copy">Create enterprise master data and OCPI party mapping.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
                Back to list
              </button>
            </div>

            <form className="editor-form" onSubmit={handleCreateEnterprise}>
              <div className="field-grid">
                <label className="field">
                  <span>Enterprise name</span>
                  <input
                    required
                    type="text"
                    value={enterpriseForm.name}
                    onChange={(event) => setEnterpriseForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Country code</span>
                  <input
                    maxLength={2}
                    required
                    type="text"
                    value={enterpriseForm.countryCode}
                    onChange={(event) => setEnterpriseForm((current) => ({ ...current, countryCode: event.target.value.toUpperCase() }))}
                  />
                </label>
                <label className="field">
                  <span>Party ID</span>
                  <input
                    maxLength={3}
                    required
                    type="text"
                    value={enterpriseForm.partyId}
                    onChange={(event) => setEnterpriseForm((current) => ({ ...current, partyId: event.target.value.toUpperCase() }))}
                  />
                </label>
                <label className="field">
                  <span>Timezone</span>
                  <input
                    required
                    type="text"
                    value={enterpriseForm.timezone}
                    onChange={(event) => setEnterpriseForm((current) => ({ ...current, timezone: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" disabled={saving} type="submit">
                  {saving ? 'Saving...' : 'Create enterprise'}
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === 'add' && activeTab === 'network' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Network</p>
                <h2>Add network</h2>
                <p className="subtle-copy">Link network to enterprise and assign operator ownership.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
                Back to list
              </button>
            </div>

            <form className="editor-form" onSubmit={handleCreateNetwork}>
              <div className="field-grid">
                <label className="field">
                  <span>Network name</span>
                  <input
                    required
                    type="text"
                    value={networkForm.name}
                    onChange={(event) => setNetworkForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Enterprise</span>
                  <select
                    required
                    value={networkForm.enterpriseId}
                    onChange={(event) => setNetworkForm((current) => ({ ...current, enterpriseId: event.target.value }))}
                  >
                    {enterpriseLookup.map((enterprise) => (
                      <option key={enterprise.enterpriseId} value={enterprise.enterpriseId}>
                        {enterprise.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Region</span>
                  <input
                    required
                    type="text"
                    value={networkForm.region}
                    onChange={(event) => setNetworkForm((current) => ({ ...current, region: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Operator email</span>
                  <input
                    required
                    type="email"
                    value={networkForm.operatorEmail}
                    onChange={(event) => setNetworkForm((current) => ({ ...current, operatorEmail: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" disabled={saving} type="submit">
                  {saving ? 'Saving...' : 'Create network'}
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === 'add' && activeTab === 'location' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Location</p>
                <h2>Add location</h2>
                <p className="subtle-copy">Create location and map OCPI location identifier.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
                Back to list
              </button>
            </div>

            <form className="editor-form" onSubmit={handleCreateLocation}>
              <div className="field-grid">
                <label className="field">
                  <span>Location name</span>
                  <input
                    required
                    type="text"
                    value={locationForm.name}
                    onChange={(event) => setLocationForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Network</span>
                  <select
                    required
                    value={locationForm.networkId}
                    onChange={(event) => setLocationForm((current) => ({ ...current, networkId: event.target.value }))}
                  >
                    {networkLookup.map((network) => (
                      <option key={network.networkId} value={network.networkId}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>City</span>
                  <input
                    required
                    type="text"
                    value={locationForm.city}
                    onChange={(event) => setLocationForm((current) => ({ ...current, city: event.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>OCPI location ID</span>
                  <input
                    required
                    type="text"
                    value={locationForm.ocpiLocationId}
                    onChange={(event) => setLocationForm((current) => ({ ...current, ocpiLocationId: event.target.value }))}
                  />
                </label>
                <label className="field field-wide">
                  <span>Address</span>
                  <input
                    required
                    type="text"
                    value={locationForm.address}
                    onChange={(event) => setLocationForm((current) => ({ ...current, address: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" disabled={saving} type="submit">
                  {saving ? 'Saving...' : 'Create location'}
                </button>
              </div>
            </form>
          </section>
        ) : null}
      </section>
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(value));
}
