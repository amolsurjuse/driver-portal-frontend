import { chargerApiBaseUrl } from './config';
import { requestJson } from './http';
import type {
  ChargerRecord,
  ConnectorSearchReindexResponse,
  ConnectorSearchSyncResponse,
  ConnectorRecord,
  CreateChargerRequest,
  CreateConnectorRequest,
  CreateEvseRequest,
  CreateEnterpriseRequest,
  CreateLocationRequest,
  CreateNetworkRequest,
  EvseRecord,
  EnterpriseRecord,
  LocationRecord,
  NetworkRecord,
  PagedResponse,
} from '../types/chargerManagement';

type ListParams = {
  search?: string;
  limit?: number;
  offset?: number;
};

export function listEnterprises(token: string, params: ListParams = {}) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  return requestJson<PagedResponse<EnterpriseRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/enterprises?${query.toString()}`,
    { token }
  );
}

export function createEnterprise(token: string, payload: CreateEnterpriseRequest) {
  return requestJson<EnterpriseRecord>(`${chargerApiBaseUrl}/api/v1/admin/enterprises`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listNetworks(
  token: string,
  params: ListParams & { enterpriseId?: string } = {}
) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.enterpriseId?.trim()) {
    query.set('enterpriseId', params.enterpriseId.trim());
  }
  return requestJson<PagedResponse<NetworkRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/networks?${query.toString()}`,
    { token }
  );
}

export function createNetwork(token: string, payload: CreateNetworkRequest) {
  return requestJson<NetworkRecord>(`${chargerApiBaseUrl}/api/v1/admin/networks`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listLocations(
  token: string,
  params: ListParams & { networkId?: string } = {}
) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.networkId?.trim()) {
    query.set('networkId', params.networkId.trim());
  }
  return requestJson<PagedResponse<LocationRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/locations?${query.toString()}`,
    { token }
  );
}

export function createLocation(token: string, payload: CreateLocationRequest) {
  return requestJson<LocationRecord>(`${chargerApiBaseUrl}/api/v1/admin/locations`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listManagedChargers(
  token: string,
  params: ListParams & { locationId?: string } = {}
) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.locationId?.trim()) {
    query.set('locationId', params.locationId.trim());
  }
  return requestJson<PagedResponse<ChargerRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/chargers?${query.toString()}`,
    { token }
  );
}

export function createManagedCharger(token: string, payload: CreateChargerRequest) {
  return requestJson<ChargerRecord>(`${chargerApiBaseUrl}/api/v1/admin/chargers`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listEvses(
  token: string,
  params: ListParams & { chargerId?: string } = {}
) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.chargerId?.trim()) {
    query.set('chargerId', params.chargerId.trim());
  }
  return requestJson<PagedResponse<EvseRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/evses?${query.toString()}`,
    { token }
  );
}

export function createEvse(token: string, payload: CreateEvseRequest) {
  return requestJson<EvseRecord>(`${chargerApiBaseUrl}/api/v1/admin/evses`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listConnectors(
  token: string,
  params: ListParams & { evseId?: string } = {}
) {
  const query = new URLSearchParams({
    limit: String(params.limit ?? 50),
    offset: String(params.offset ?? 0),
  });
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }
  if (params.evseId?.trim()) {
    query.set('evseId', params.evseId.trim());
  }
  return requestJson<PagedResponse<ConnectorRecord>>(
    `${chargerApiBaseUrl}/api/v1/admin/connectors?${query.toString()}`,
    { token }
  );
}

export function createConnector(token: string, payload: CreateConnectorRequest) {
  return requestJson<ConnectorRecord>(`${chargerApiBaseUrl}/api/v1/admin/connectors`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function reindexConnectorSearch(token: string) {
  return requestJson<ConnectorSearchReindexResponse>(
    `${chargerApiBaseUrl}/api/v1/admin/connectors/search/reindex`,
    {
      method: 'POST',
      token,
    }
  );
}

export function syncConnectorSearchByConnectorId(token: string, connectorId: string) {
  return requestJson<ConnectorSearchSyncResponse>(
    `${chargerApiBaseUrl}/api/v1/admin/connectors/search/sync/${encodeURIComponent(connectorId)}`,
    {
      method: 'POST',
      token,
    }
  );
}

export function syncConnectorSearchByEvseId(token: string, evseId: string) {
  return requestJson<ConnectorSearchSyncResponse>(
    `${chargerApiBaseUrl}/api/v1/admin/connectors/search/sync/evse/${encodeURIComponent(evseId)}`,
    {
      method: 'POST',
      token,
    }
  );
}

export function syncConnectorSearchByChargerId(token: string, chargerId: string) {
  return requestJson<ConnectorSearchSyncResponse>(
    `${chargerApiBaseUrl}/api/v1/admin/connectors/search/sync/charger/${encodeURIComponent(chargerId)}`,
    {
      method: 'POST',
      token,
    }
  );
}
