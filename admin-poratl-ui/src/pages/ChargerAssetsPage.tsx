import { FormEvent, useEffect, useMemo, useState } from 'react';
import { TableActionIconButton } from '../components/ui/TableActionIconButton';

export type ChargerAssetsSection = 'charger-groups' | 'chargers' | 'evses' | 'connectors';
type ViewMode = 'list' | 'add';

type ChargerGroupRecord = {
  id: string;
  name: string;
  enterprise: string;
  network: string;
  loadProfile: string;
  chargerCount: number;
  enabled: boolean;
  createdAt: string;
};

type ChargerRecord = {
  id: string;
  chargerId: string;
  groupId: string;
  location: string;
  model: string;
  ocppVersion: '1.6J' | '2.0.1';
  maxPowerKw: number;
  enabled: boolean;
  createdAt: string;
};

type EvseRecord = {
  id: string;
  evseUid: string;
  chargerId: string;
  zone: string;
  connectorCount: number;
  capabilities: string;
  enabled: boolean;
  createdAt: string;
};

type ConnectorRecord = {
  id: string;
  connectorId: string;
  evseId: string;
  standard: string;
  format: string;
  powerType: string;
  maxPowerKw: number;
  enabled: boolean;
  createdAt: string;
};

type SectionMeta = {
  title: string;
  singular: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  addButtonLabel: string;
  emptyTitle: string;
  emptyMessage: string;
};

const sectionMeta: Record<ChargerAssetsSection, SectionMeta> = {
  'charger-groups': {
    title: 'Charger Groups',
    singular: 'Charger group',
    description: 'Create operational groups to organize chargers by network, load profile, and ownership.',
    searchLabel: 'Search charger groups',
    searchPlaceholder: 'Find by group, enterprise, or network',
    addButtonLabel: 'Add Charger Group',
    emptyTitle: 'No charger groups found',
    emptyMessage: 'Create a charger group to begin onboarding chargers.',
  },
  chargers: {
    title: 'Chargers',
    singular: 'Charger',
    description: 'Manage chargers and OCPP versions before EVSE and connector provisioning.',
    searchLabel: 'Search chargers',
    searchPlaceholder: 'Find by charger ID, model, or location',
    addButtonLabel: 'Add Charger',
    emptyTitle: 'No chargers found',
    emptyMessage: 'Create your first charger record to continue provisioning.',
  },
  evses: {
    title: 'EVSEs',
    singular: 'EVSE',
    description: 'Track EVSE mappings per charger with connector capacity and operational capabilities.',
    searchLabel: 'Search EVSEs',
    searchPlaceholder: 'Find by EVSE UID, charger ID, or zone',
    addButtonLabel: 'Add EVSE',
    emptyTitle: 'No EVSEs found',
    emptyMessage: 'Create EVSE records for each charger endpoint.',
  },
  connectors: {
    title: 'Connectors',
    singular: 'Connector',
    description: 'Configure connector standards, power type, and max power delivered per EVSE.',
    searchLabel: 'Search connectors',
    searchPlaceholder: 'Find by connector ID, EVSE, or standard',
    addButtonLabel: 'Add Connector',
    emptyTitle: 'No connectors found',
    emptyMessage: 'Create connector records to complete charger setup.',
  },
};

const enterpriseOptions = ['Electra Hub Mobility Inc.', 'Electra Hub Europe BV'];
const networkOptions = ['US East Public Network', 'US West Highway Network', 'Amsterdam Downtown Network'];
const locationOptions = ['Boston Seaport Hub', 'San Francisco Marina', 'Amsterdam Central Station'];
const chargerModelOptions = ['ABB Terra 184', 'Tritium PKM150', 'Delta UFC200'];
const ocppOptions: Array<ChargerRecord['ocppVersion']> = ['1.6J', '2.0.1'];
const connectorStandards = ['CCS1', 'CCS2', 'NACS', 'CHAdeMO'];
const connectorFormats = ['SOCKET', 'CABLE'];
const powerTypes = ['AC_3_PHASE', 'DC'];

const initialChargerGroups: ChargerGroupRecord[] = [
  {
    id: 'CG-001',
    name: 'Boston Public Fast Charging',
    enterprise: 'Electra Hub Mobility Inc.',
    network: 'US East Public Network',
    loadProfile: 'Balanced 240kW',
    chargerCount: 2,
    enabled: true,
    createdAt: '2026-03-18T10:15:00Z',
  },
  {
    id: 'CG-002',
    name: 'Bay Area Fleet Depots',
    enterprise: 'Electra Hub Mobility Inc.',
    network: 'US West Highway Network',
    loadProfile: 'Fleet Priority 300kW',
    chargerCount: 1,
    enabled: true,
    createdAt: '2026-03-18T13:40:00Z',
  },
];

const initialChargers: ChargerRecord[] = [
  {
    id: 'CHG-001',
    chargerId: 'EH-BOS-CHG-001',
    groupId: 'CG-001',
    location: 'Boston Seaport Hub',
    model: 'ABB Terra 184',
    ocppVersion: '2.0.1',
    maxPowerKw: 180,
    enabled: true,
    createdAt: '2026-03-18T11:22:00Z',
  },
  {
    id: 'CHG-002',
    chargerId: 'EH-BOS-CHG-002',
    groupId: 'CG-001',
    location: 'Boston Seaport Hub',
    model: 'Tritium PKM150',
    ocppVersion: '1.6J',
    maxPowerKw: 150,
    enabled: true,
    createdAt: '2026-03-18T12:05:00Z',
  },
  {
    id: 'CHG-003',
    chargerId: 'EH-SFO-CHG-001',
    groupId: 'CG-002',
    location: 'San Francisco Marina',
    model: 'Delta UFC200',
    ocppVersion: '2.0.1',
    maxPowerKw: 200,
    enabled: true,
    createdAt: '2026-03-18T16:48:00Z',
  },
];

const initialEvses: EvseRecord[] = [
  {
    id: 'EVSE-001',
    evseUid: 'US*EHB*E*BOS001A',
    chargerId: 'CHG-001',
    zone: 'L2-A',
    connectorCount: 2,
    capabilities: 'REMOTE_START_STOP, RESERVABLE',
    enabled: true,
    createdAt: '2026-03-18T11:35:00Z',
  },
  {
    id: 'EVSE-002',
    evseUid: 'US*EHB*E*BOS002A',
    chargerId: 'CHG-002',
    zone: 'L2-B',
    connectorCount: 2,
    capabilities: 'REMOTE_START_STOP',
    enabled: true,
    createdAt: '2026-03-18T12:18:00Z',
  },
];

const initialConnectors: ConnectorRecord[] = [
  {
    id: 'CON-001',
    connectorId: 'CON-BOS-001',
    evseId: 'EVSE-001',
    standard: 'CCS1',
    format: 'CABLE',
    powerType: 'DC',
    maxPowerKw: 180,
    enabled: true,
    createdAt: '2026-03-18T11:50:00Z',
  },
  {
    id: 'CON-002',
    connectorId: 'CON-BOS-002',
    evseId: 'EVSE-001',
    standard: 'NACS',
    format: 'CABLE',
    powerType: 'DC',
    maxPowerKw: 150,
    enabled: true,
    createdAt: '2026-03-18T11:52:00Z',
  },
];

type ChargerAssetsPageProps = {
  section?: ChargerAssetsSection;
};

export default function ChargerAssetsPage({ section = 'chargers' }: ChargerAssetsPageProps) {
  const [search, setSearch] = useState('');
  const [viewBySection, setViewBySection] = useState<Record<ChargerAssetsSection, ViewMode>>({
    'charger-groups': 'list',
    chargers: 'list',
    evses: 'list',
    connectors: 'list',
  });

  const [chargerGroups, setChargerGroups] = useState<ChargerGroupRecord[]>(initialChargerGroups);
  const [chargers, setChargers] = useState<ChargerRecord[]>(initialChargers);
  const [evses, setEvses] = useState<EvseRecord[]>(initialEvses);
  const [connectors, setConnectors] = useState<ConnectorRecord[]>(initialConnectors);

  const [groupForm, setGroupForm] = useState({
    name: '',
    enterprise: enterpriseOptions[0] ?? '',
    network: networkOptions[0] ?? '',
    loadProfile: 'Balanced 240kW',
  });
  const [chargerForm, setChargerForm] = useState({
    chargerId: '',
    groupId: initialChargerGroups[0]?.id ?? '',
    location: locationOptions[0] ?? '',
    model: chargerModelOptions[0] ?? '',
    ocppVersion: '2.0.1' as ChargerRecord['ocppVersion'],
    maxPowerKw: '180',
  });
  const [evseForm, setEvseForm] = useState({
    evseUid: '',
    chargerId: initialChargers[0]?.id ?? '',
    zone: '',
    connectorCount: '2',
    capabilities: 'REMOTE_START_STOP',
  });
  const [connectorForm, setConnectorForm] = useState({
    connectorId: '',
    evseId: initialEvses[0]?.id ?? '',
    standard: connectorStandards[0] ?? 'CCS1',
    format: connectorFormats[0] ?? 'SOCKET',
    powerType: powerTypes[1] ?? 'DC',
    maxPowerKw: '120',
  });

  useEffect(() => {
    setSearch('');
  }, [section]);

  useEffect(() => {
    if (chargerGroups.length === 0) {
      return;
    }
    if (!chargerGroups.some((group) => group.id === chargerForm.groupId)) {
      setChargerForm((current) => ({ ...current, groupId: chargerGroups[0]?.id ?? '' }));
    }
  }, [chargerForm.groupId, chargerGroups]);

  useEffect(() => {
    if (chargers.length === 0) {
      return;
    }
    if (!chargers.some((charger) => charger.id === evseForm.chargerId)) {
      setEvseForm((current) => ({ ...current, chargerId: chargers[0]?.id ?? '' }));
    }
  }, [evseForm.chargerId, chargers]);

  useEffect(() => {
    if (evses.length === 0) {
      return;
    }
    if (!evses.some((evse) => evse.id === connectorForm.evseId)) {
      setConnectorForm((current) => ({ ...current, evseId: evses[0]?.id ?? '' }));
    }
  }, [connectorForm.evseId, evses]);

  const activeView = viewBySection[section];
  const meta = sectionMeta[section];
  const searchQuery = search.trim().toLowerCase();

  const filteredChargerGroups = useMemo(() => {
    if (!searchQuery) {
      return chargerGroups;
    }
    return chargerGroups.filter((group) =>
      [group.id, group.name, group.enterprise, group.network, group.loadProfile].some((value) =>
        value.toLowerCase().includes(searchQuery)
      )
    );
  }, [chargerGroups, searchQuery]);

  const filteredChargers = useMemo(() => {
    if (!searchQuery) {
      return chargers;
    }
    return chargers.filter((charger) =>
      [charger.id, charger.chargerId, charger.location, charger.model, charger.ocppVersion].some((value) =>
        value.toLowerCase().includes(searchQuery)
      )
    );
  }, [chargers, searchQuery]);

  const filteredEvses = useMemo(() => {
    if (!searchQuery) {
      return evses;
    }
    return evses.filter((evse) =>
      [evse.id, evse.evseUid, evse.zone, evse.capabilities].some((value) =>
        value.toLowerCase().includes(searchQuery)
      )
    );
  }, [evses, searchQuery]);

  const filteredConnectors = useMemo(() => {
    if (!searchQuery) {
      return connectors;
    }
    return connectors.filter((connector) =>
      [connector.id, connector.connectorId, connector.standard, connector.format, connector.powerType].some((value) =>
        value.toLowerCase().includes(searchQuery)
      )
    );
  }, [connectors, searchQuery]);

  function openAddScreen() {
    setViewBySection((current) => ({ ...current, [section]: 'add' }));
  }

  function backToList() {
    setViewBySection((current) => ({ ...current, [section]: 'list' }));
  }

  function handleCreateChargerGroup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: ChargerGroupRecord = {
      id: `CG-${nextId(chargerGroups.length + 1)}`,
      name: groupForm.name.trim(),
      enterprise: groupForm.enterprise,
      network: groupForm.network,
      loadProfile: groupForm.loadProfile.trim(),
      chargerCount: 0,
      enabled: true,
      createdAt: new Date().toISOString(),
    };
    setChargerGroups((current) => [payload, ...current]);
    setGroupForm({
      name: '',
      enterprise: enterpriseOptions[0] ?? '',
      network: networkOptions[0] ?? '',
      loadProfile: 'Balanced 240kW',
    });
    setViewBySection((current) => ({ ...current, 'charger-groups': 'list' }));
  }

  function handleCreateCharger(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedChargerId = chargerForm.chargerId.trim().toUpperCase();
    const payload: ChargerRecord = {
      id: `CHG-${nextId(chargers.length + 1)}`,
      chargerId: normalizedChargerId,
      groupId: chargerForm.groupId,
      location: chargerForm.location,
      model: chargerForm.model,
      ocppVersion: chargerForm.ocppVersion,
      maxPowerKw: Number.parseInt(chargerForm.maxPowerKw, 10),
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    setChargers((current) => [payload, ...current]);
    setChargerGroups((current) =>
      current.map((group) =>
        group.id === chargerForm.groupId
          ? { ...group, chargerCount: group.chargerCount + 1 }
          : group
      )
    );
    setChargerForm({
      chargerId: '',
      groupId: chargerGroups[0]?.id ?? '',
      location: locationOptions[0] ?? '',
      model: chargerModelOptions[0] ?? '',
      ocppVersion: '2.0.1',
      maxPowerKw: '180',
    });
    setViewBySection((current) => ({ ...current, chargers: 'list' }));
  }

  function handleCreateEvse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: EvseRecord = {
      id: `EVSE-${nextId(evses.length + 1)}`,
      evseUid: evseForm.evseUid.trim().toUpperCase(),
      chargerId: evseForm.chargerId,
      zone: evseForm.zone.trim(),
      connectorCount: Number.parseInt(evseForm.connectorCount, 10),
      capabilities: evseForm.capabilities.trim().toUpperCase(),
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    setEvses((current) => [payload, ...current]);
    setEvseForm({
      evseUid: '',
      chargerId: chargers[0]?.id ?? '',
      zone: '',
      connectorCount: '2',
      capabilities: 'REMOTE_START_STOP',
    });
    setViewBySection((current) => ({ ...current, evses: 'list' }));
  }

  function handleCreateConnector(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: ConnectorRecord = {
      id: `CON-${nextId(connectors.length + 1)}`,
      connectorId: connectorForm.connectorId.trim().toUpperCase(),
      evseId: connectorForm.evseId,
      standard: connectorForm.standard,
      format: connectorForm.format,
      powerType: connectorForm.powerType,
      maxPowerKw: Number.parseInt(connectorForm.maxPowerKw, 10),
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    setConnectors((current) => [payload, ...current]);
    setConnectorForm({
      connectorId: '',
      evseId: evses[0]?.id ?? '',
      standard: connectorStandards[0] ?? 'CCS1',
      format: connectorFormats[0] ?? 'SOCKET',
      powerType: powerTypes[1] ?? 'DC',
      maxPowerKw: '120',
    });
    setViewBySection((current) => ({ ...current, connectors: 'list' }));
  }

  function handleViewRecord(identifier: string) {
    setSearch(identifier);
  }

  function handleEditChargerGroup(group: ChargerGroupRecord) {
    setGroupForm({
      name: group.name,
      enterprise: group.enterprise,
      network: group.network,
      loadProfile: group.loadProfile,
    });
    setViewBySection((current) => ({ ...current, 'charger-groups': 'add' }));
  }

  function handleEditCharger(charger: ChargerRecord) {
    setChargerForm({
      chargerId: charger.chargerId,
      groupId: charger.groupId,
      location: charger.location,
      model: charger.model,
      ocppVersion: charger.ocppVersion,
      maxPowerKw: String(charger.maxPowerKw),
    });
    setViewBySection((current) => ({ ...current, chargers: 'add' }));
  }

  function handleEditEvse(evse: EvseRecord) {
    setEvseForm({
      evseUid: evse.evseUid,
      chargerId: evse.chargerId,
      zone: evse.zone,
      connectorCount: String(evse.connectorCount),
      capabilities: evse.capabilities,
    });
    setViewBySection((current) => ({ ...current, evses: 'add' }));
  }

  function handleEditConnector(connector: ConnectorRecord) {
    setConnectorForm({
      connectorId: connector.connectorId,
      evseId: connector.evseId,
      standard: connector.standard,
      format: connector.format,
      powerType: connector.powerType,
      maxPowerKw: String(connector.maxPowerKw),
    });
    setViewBySection((current) => ({ ...current, connectors: 'add' }));
  }

  return (
    <>
      <header className="portal-page-head">
        <div>
          <p className="eyebrow">Charger Operations</p>
          <h1>{meta.title}</h1>
          <p className="hero-copy">{meta.description}</p>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Charger groups</span>
          <strong>{chargerGroups.length}</strong>
          <small>Organization and load pools</small>
        </article>
        <article className="stat-card warm">
          <span>Chargers</span>
          <strong>{chargers.length}</strong>
          <small>Physical charging units</small>
        </article>
        <article className="stat-card cool">
          <span>EVSEs</span>
          <strong>{evses.length}</strong>
          <small>Addressable charging endpoints</small>
        </article>
        <article className="stat-card muted">
          <span>Connectors</span>
          <strong>{connectors.length}</strong>
          <small>Connector definitions</small>
        </article>
      </section>

      <section className="single-panel">
        {activeView === 'list' ? (
          <>
            <div className="subscription-filter-bar user-filter-bar">
              <label className="field subscription-search-field">
                <span>{meta.searchLabel}</span>
                <input
                  placeholder={meta.searchPlaceholder}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <button className="primary-button" onClick={openAddScreen} type="button">
                {meta.addButtonLabel}
              </button>
            </div>

            {section === 'charger-groups' ? (
              <div className="subscription-table-wrap">
                {filteredChargerGroups.length === 0 ? (
                  <div className="blank-card">
                    <h3>{meta.emptyTitle}</h3>
                    <p>{meta.emptyMessage}</p>
                  </div>
                ) : (
                  <table className="data-table">
                    <colgroup>
                      <col style={{ width: '22%' }} />
                      <col style={{ width: '16%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '14%' }} />
                      <col style={{ width: '7%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Group</th>
                        <th>Enterprise</th>
                        <th>Network</th>
                        <th>Load profile</th>
                        <th>Chargers</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredChargerGroups.map((group) => (
                        <tr key={group.id}>
                          <td>
                            <div className="table-cell-name">
                              <strong>{group.name}</strong>
                              <p className="subtle-copy table-cell-sub">{group.id}</p>
                            </div>
                          </td>
                          <td>{group.enterprise}</td>
                          <td>{group.network}</td>
                          <td><code className="code-chip">{group.loadProfile}</code></td>
                          <td>{group.chargerCount}</td>
                          <td>
                            <span className={`status-pill ${group.enabled ? 'enabled' : 'disabled'}`}>
                              {group.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td>{formatDate(group.createdAt)}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton icon="view" label="View charger group" onClick={() => handleViewRecord(group.id)} />
                              <TableActionIconButton icon="edit" label="Edit charger group" onClick={() => handleEditChargerGroup(group)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}

            {section === 'chargers' ? (
              <div className="subscription-table-wrap">
                {filteredChargers.length === 0 ? (
                  <div className="blank-card">
                    <h3>{meta.emptyTitle}</h3>
                    <p>{meta.emptyMessage}</p>
                  </div>
                ) : (
                  <table className="data-table">
                    <colgroup>
                      <col style={{ width: '17%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '16%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '7%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '7%' }} />
                      <col style={{ width: '6%' }} />
                      <col style={{ width: '9%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Charger</th>
                        <th>Group</th>
                        <th>Location</th>
                        <th>Model</th>
                        <th>OCPP</th>
                        <th>Power</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredChargers.map((charger) => (
                        <tr key={charger.id}>
                          <td>
                            <div className="table-cell-name">
                              <strong>{charger.chargerId}</strong>
                              <p className="subtle-copy table-cell-sub">{charger.id}</p>
                            </div>
                          </td>
                          <td>{groupNameForId(charger.groupId, chargerGroups)}</td>
                          <td>{charger.location}</td>
                          <td>{charger.model}</td>
                          <td><code className="code-chip">{charger.ocppVersion}</code></td>
                          <td>{charger.maxPowerKw} kW</td>
                          <td>
                            <span className={`status-pill ${charger.enabled ? 'enabled' : 'disabled'}`}>
                              {charger.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td>{formatDate(charger.createdAt)}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton icon="view" label="View charger asset" onClick={() => handleViewRecord(charger.id)} />
                              <TableActionIconButton icon="edit" label="Edit charger asset" onClick={() => handleEditCharger(charger)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}

            {section === 'evses' ? (
              <div className="subscription-table-wrap">
                {filteredEvses.length === 0 ? (
                  <div className="blank-card">
                    <h3>{meta.emptyTitle}</h3>
                    <p>{meta.emptyMessage}</p>
                  </div>
                ) : (
                  <table className="data-table">
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '9%' }} />
                      <col style={{ width: '22%' }} />
                      <col style={{ width: '7%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '9%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>EVSE</th>
                        <th>Charger</th>
                        <th>Zone</th>
                        <th>Connectors</th>
                        <th>Capabilities</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvses.map((evse) => (
                        <tr key={evse.id}>
                          <td>
                            <div className="table-cell-name">
                              <strong>{evse.evseUid}</strong>
                              <p className="subtle-copy table-cell-sub">{evse.id}</p>
                            </div>
                          </td>
                          <td>{chargerIdForRecord(evse.chargerId, chargers)}</td>
                          <td>{evse.zone}</td>
                          <td>{evse.connectorCount}</td>
                          <td>{evse.capabilities}</td>
                          <td>
                            <span className={`status-pill ${evse.enabled ? 'enabled' : 'disabled'}`}>
                              {evse.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td>{formatDate(evse.createdAt)}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton icon="view" label="View EVSE asset" onClick={() => handleViewRecord(evse.id)} />
                              <TableActionIconButton icon="edit" label="Edit EVSE asset" onClick={() => handleEditEvse(evse)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}

            {section === 'connectors' ? (
              <div className="subscription-table-wrap">
                {filteredConnectors.length === 0 ? (
                  <div className="blank-card">
                    <h3>{meta.emptyTitle}</h3>
                    <p>{meta.emptyMessage}</p>
                  </div>
                ) : (
                  <table className="data-table">
                    <colgroup>
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '12%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '13%' }} />
                      <col style={{ width: '9%' }} />
                      <col style={{ width: '11%' }} />
                      <col style={{ width: '8%' }} />
                      <col style={{ width: '12%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Connector</th>
                        <th>EVSE</th>
                        <th>Standard</th>
                        <th>Format</th>
                        <th>Power type</th>
                        <th>Power</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConnectors.map((connector) => (
                        <tr key={connector.id}>
                          <td>
                            <div className="table-cell-name">
                              <strong>{connector.connectorId}</strong>
                              <p className="subtle-copy table-cell-sub">{connector.id}</p>
                            </div>
                          </td>
                          <td>{evseUidForRecord(connector.evseId, evses)}</td>
                          <td><code className="code-chip">{connector.standard}</code></td>
                          <td>{connector.format}</td>
                          <td>{connector.powerType}</td>
                          <td>{connector.maxPowerKw} kW</td>
                          <td>
                            <span className={`status-pill ${connector.enabled ? 'enabled' : 'disabled'}`}>
                              {connector.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td>{formatDate(connector.createdAt)}</td>
                          <td>
                            <div className="table-row-actions table-action-icons">
                              <TableActionIconButton icon="view" label="View connector asset" onClick={() => handleViewRecord(connector.id)} />
                              <TableActionIconButton icon="edit" label="Edit connector asset" onClick={() => handleEditConnector(connector)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}
          </>
        ) : null}

        {activeView === 'add' && section === 'charger-groups' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Charger group</p>
                <h2>Add charger group</h2>
                <p className="subtle-copy">Create grouping before attaching chargers and EVSE assets.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
                Back to list
              </button>
            </div>

            <form className="editor-form" onSubmit={handleCreateChargerGroup}>
              <div className="field-grid">
                <label className="field">
                  <span>Group name</span>
                  <input
                    required
                    type="text"
                    value={groupForm.name}
                    onChange={(event) => setGroupForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>Enterprise</span>
                  <select
                    required
                    value={groupForm.enterprise}
                    onChange={(event) => setGroupForm((current) => ({ ...current, enterprise: event.target.value }))}
                  >
                    {enterpriseOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Network</span>
                  <select
                    required
                    value={groupForm.network}
                    onChange={(event) => setGroupForm((current) => ({ ...current, network: event.target.value }))}
                  >
                    {networkOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Load profile</span>
                  <input
                    required
                    type="text"
                    value={groupForm.loadProfile}
                    onChange={(event) => setGroupForm((current) => ({ ...current, loadProfile: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  Create charger group
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === 'add' && section === 'chargers' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Charger</p>
                <h2>Add charger</h2>
                <p className="subtle-copy">Capture charger inventory and OCPP protocol metadata.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
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
                    value={chargerForm.chargerId}
                    onChange={(event) => setChargerForm((current) => ({ ...current, chargerId: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>Charger group</span>
                  <select
                    required
                    value={chargerForm.groupId}
                    onChange={(event) => setChargerForm((current) => ({ ...current, groupId: event.target.value }))}
                  >
                    {chargerGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Location</span>
                  <select
                    required
                    value={chargerForm.location}
                    onChange={(event) => setChargerForm((current) => ({ ...current, location: event.target.value }))}
                  >
                    {locationOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Model</span>
                  <select
                    required
                    value={chargerForm.model}
                    onChange={(event) => setChargerForm((current) => ({ ...current, model: event.target.value }))}
                  >
                    {chargerModelOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>OCPP version</span>
                  <select
                    required
                    value={chargerForm.ocppVersion}
                    onChange={(event) =>
                      setChargerForm((current) => ({
                        ...current,
                        ocppVersion: event.target.value as ChargerRecord['ocppVersion'],
                      }))
                    }
                  >
                    {ocppOptions.map((item) => (
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
                    value={chargerForm.maxPowerKw}
                    onChange={(event) => setChargerForm((current) => ({ ...current, maxPowerKw: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  Create charger
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === 'add' && section === 'evses' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">EVSE</p>
                <h2>Add EVSE</h2>
                <p className="subtle-copy">Assign EVSE UIDs and capacity for each charger.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
                Back to list
              </button>
            </div>

            <form className="editor-form" onSubmit={handleCreateEvse}>
              <div className="field-grid">
                <label className="field">
                  <span>EVSE UID</span>
                  <input
                    required
                    type="text"
                    value={evseForm.evseUid}
                    onChange={(event) => setEvseForm((current) => ({ ...current, evseUid: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>Charger</span>
                  <select
                    required
                    value={evseForm.chargerId}
                    onChange={(event) => setEvseForm((current) => ({ ...current, chargerId: event.target.value }))}
                  >
                    {chargers.map((charger) => (
                      <option key={charger.id} value={charger.id}>
                        {charger.chargerId}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Zone / floor</span>
                  <input
                    required
                    type="text"
                    value={evseForm.zone}
                    onChange={(event) => setEvseForm((current) => ({ ...current, zone: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>Connector count</span>
                  <input
                    min={1}
                    required
                    type="number"
                    value={evseForm.connectorCount}
                    onChange={(event) => setEvseForm((current) => ({ ...current, connectorCount: event.target.value }))}
                  />
                </label>

                <label className="field field-wide">
                  <span>Capabilities</span>
                  <input
                    required
                    type="text"
                    value={evseForm.capabilities}
                    onChange={(event) => setEvseForm((current) => ({ ...current, capabilities: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  Create EVSE
                </button>
              </div>
            </form>
          </section>
        ) : null}

        {activeView === 'add' && section === 'connectors' ? (
          <section className="single-panel">
            <div className="panel-header subscription-page-head">
              <div>
                <p className="section-label">Connector</p>
                <h2>Add connector</h2>
                <p className="subtle-copy">Define connector standards and power characteristics.</p>
              </div>
              <button className="ghost-button" onClick={backToList} type="button">
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
                    value={connectorForm.connectorId}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, connectorId: event.target.value }))}
                  />
                </label>

                <label className="field">
                  <span>EVSE</span>
                  <select
                    required
                    value={connectorForm.evseId}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, evseId: event.target.value }))}
                  >
                    {evses.map((evse) => (
                      <option key={evse.id} value={evse.id}>
                        {evse.evseUid}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Standard</span>
                  <select
                    required
                    value={connectorForm.standard}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, standard: event.target.value }))}
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
                    value={connectorForm.format}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, format: event.target.value }))}
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
                    value={connectorForm.powerType}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, powerType: event.target.value }))}
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
                    value={connectorForm.maxPowerKw}
                    onChange={(event) => setConnectorForm((current) => ({ ...current, maxPowerKw: event.target.value }))}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button className="ghost-button" onClick={backToList} type="button">
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  Create connector
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

function nextId(value: number) {
  return String(value).padStart(3, '0');
}

function groupNameForId(groupId: string, groups: ChargerGroupRecord[]) {
  return groups.find((group) => group.id === groupId)?.name ?? groupId;
}

function chargerIdForRecord(chargerId: string, chargers: ChargerRecord[]) {
  return chargers.find((charger) => charger.id === chargerId)?.chargerId ?? chargerId;
}

function evseUidForRecord(evseId: string, evses: EvseRecord[]) {
  return evses.find((evse) => evse.id === evseId)?.evseUid ?? evseId;
}
