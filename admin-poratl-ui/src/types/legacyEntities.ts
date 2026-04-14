/* Types for legacy JSF admin portal entities */

export type NetworkOperator = {
  operatorId: string;
  operatorName: string;
  contactPerson: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  currencyUnit: string;
  postalCode: string;
  plugshareSubOperator: string;
  subdomain: string;
  legalEntityName: string;
  taxRegAttrName: string;
  taxRegAttrValue: string;
  insightAccess: boolean;
  firmwareManagement: boolean;
  demandResponse: boolean;
  driverMaxPrice: boolean;
  smartFleetAccess: boolean;
  alertsNotifications: boolean;
  flexChargeManager: boolean;
  chargerGroup: boolean;
  price360Pricing: boolean;
  pricePlanAllowed: boolean;
  oneMpsPricing: boolean;
  calculateIdleFeeOnStatus: boolean;
  fleetDashboard: boolean;
  enableSubscription: boolean;
  enableReservation: boolean;
  autoTaxEnabled: boolean;
  supervisorLimit: number;
  teamleadLimit: number;
  agentLimit: number;
  tosUrl: string;
  tosVersion: string;
  createdAt: string;
};

export type ChargeStationMake = {
  makeId: string;
  name: string;
  shortName: string;
  address: string;
  description: string;
  createdAt: string;
};

export type PortLevel = {
  levelId: string;
  level: string;
  connectorName: string;
  voltageV: number;
  currentA: number;
  powerKw: number;
};

export type ChargeStationModel = {
  modelId: string;
  makeName: string;
  makeId: string;
  modelName: string;
  numberOfPorts: number;
  protocol: string;
  createdAt: string;
};

export type SiteController = {
  siteControllerId: string;
  name: string;
  operatorName: string;
  enterpriseName: string;
  locationName: string;
  dateCommissioned: string;
  inverterPowerKw: number;
  batteryCapacityKwh: number;
  peakCapacityKw: number;
  meterReadingIntervalMins: number;
  loadRamping: boolean;
  defaultPowerUnknown: number;
  defaultPowerConnectionClose: number;
  defaultPowerReadingSkip: number;
  skipCount: number;
  powerLevelDataIntervalSec: number;
  loadControl: 'SKY' | 'SITE_CONTROLLER';
  offlineNotification: boolean;
  peakCapacityNotification: boolean;
  associatedStations: number;
  currentLoadKw: number;
  availability: 'ONLINE' | 'OFFLINE';
  lastCommunication: string;
};
