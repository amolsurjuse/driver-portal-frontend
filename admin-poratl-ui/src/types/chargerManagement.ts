export type PagedResponse<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type EnterpriseRecord = {
  enterpriseId: string;
  name: string;
  countryCode: string;
  partyId: string;
  timezone: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NetworkRecord = {
  networkId: string;
  enterpriseId: string;
  enterpriseName: string;
  name: string;
  region: string;
  operatorEmail: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LocationRecord = {
  locationId: string;
  networkId: string;
  networkName: string;
  name: string;
  city: string;
  address: string;
  ocpiLocationId: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChargerRecord = {
  chargerId: string;
  displayName: string;
  locationId: string;
  locationName: string;
  networkId: string;
  networkName: string;
  enterpriseId: string;
  enterpriseName: string;
  model: string;
  ocppVersion: 'OCPP16J' | 'OCPP201';
  maxPowerKw: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EvseRecord = {
  evseId: string;
  chargerId: string;
  chargerDisplayName: string;
  evseUid: string;
  zone: string | null;
  connectorCount: number;
  capabilities: string | null;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ConnectorRecord = {
  connectorId: string;
  evseId: string;
  evseUid: string;
  chargerId: string;
  standard: string;
  format: string;
  powerType: string;
  maxPowerKw: number;
  ocpiTariffIds: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateEnterpriseRequest = {
  name: string;
  countryCode: string;
  partyId: string;
  timezone: string;
  enabled?: boolean;
};

export type CreateNetworkRequest = {
  enterpriseId: string;
  name: string;
  region: string;
  operatorEmail: string;
  enabled?: boolean;
};

export type CreateLocationRequest = {
  networkId: string;
  name: string;
  city: string;
  address: string;
  ocpiLocationId: string;
  enabled?: boolean;
};

export type CreateChargerRequest = {
  chargerId: string;
  displayName: string;
  locationId: string;
  model: string;
  ocppVersion: 'OCPP16J' | 'OCPP201';
  maxPowerKw: number;
  enabled?: boolean;
};

export type CreateEvseRequest = {
  chargerId: string;
  evseUid: string;
  zone?: string;
  capabilities?: string;
  enabled?: boolean;
};

export type CreateConnectorRequest = {
  connectorId: string;
  evseId: string;
  standard: string;
  format: string;
  powerType: string;
  maxPowerKw: number;
  ocpiTariffIds?: string[];
  enabled?: boolean;
};
