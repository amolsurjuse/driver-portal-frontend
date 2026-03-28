/* ── Pricing domain types ── */

export type PricingType = 'FLAT' | 'TIME_OF_USE' | 'DYNAMIC' | 'TIERED' | 'SUBSCRIPTION';

export type TariffDimension = 'ENERGY' | 'TIME' | 'PARKING' | 'FLAT' | 'RESERVATION';

export type ConnectorType =
  | 'CHADEMO'
  | 'IEC_62196_T2'
  | 'IEC_62196_T2_COMBO'
  | 'TESLA'
  | 'IEC_62196_T1'
  | 'IEC_62196_T1_COMBO'
  | 'GBT_AC'
  | 'GBT_DC'
  | 'NACS';

export type PricingComponent = {
  id: string;
  dimension: TariffDimension;
  price: number;
  stepSize: number;
  dayOfWeek: string | null;
  startTime: string | null;
  endTime: string | null;
  tierMinKwh: number | null;
  tierMaxKwh: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  maxKwh: number | null;
  maxDurationMinutes: number | null;
  maxParkingMinutes: number | null;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  currency: string;
  pricingType: PricingType;
  locationId: string | null;
  connectorType: ConnectorType | null;
  validFrom: string | null;
  validTo: string | null;
  active: boolean;
  components: PricingComponent[];
  createdAt: string;
  updatedAt: string;
};

export type PricingPlanSummary = {
  id: string;
  name: string;
  currency: string;
  pricingType: PricingType;
  locationId: string | null;
  connectorType: ConnectorType | null;
  active: boolean;
  componentCount: number;
  validFrom: string | null;
  validTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePricingPlanRequest = {
  name: string;
  description: string;
  currency: string;
  pricingType: PricingType;
  locationId?: string;
  connectorType?: ConnectorType;
  validFrom?: string;
  validTo?: string;
  components: CreatePricingComponentRequest[];
};

export type CreatePricingComponentRequest = {
  dimension: TariffDimension;
  price: number;
  stepSize?: number;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  tierMinKwh?: number;
  tierMaxKwh?: number;
  minPrice?: number;
  maxPrice?: number;
  maxKwh?: number;
  maxDurationMinutes?: number;
  maxParkingMinutes?: number;
};

export type UpdatePricingPlanRequest = CreatePricingPlanRequest;

export type PriceHistory = {
  id: string;
  pricingPlanId: string;
  snapshotJson: string;
  changeReason: string;
  changedBy: string;
  effectiveAt: string;
  createdAt: string;
};

export type PricingSearchRequest = {
  query?: string;
  pricingType?: PricingType;
  currency?: string;
  locationId?: string;
  connectorType?: ConnectorType;
  activeOnly?: boolean;
  page?: number;
  size?: number;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export type PricingSearchReindexResponse = {
  indexName: string;
  totalPlans: number;
  indexedPlans: number;
  failedPlans: number;
  executedAt: string;
};

export type PricingSearchSyncResponse = {
  indexName: string;
  syncType: string;
  syncValue: string;
  candidatePlans: number;
  indexedPlans: number;
  failedPlans: number;
  executedAt: string;
};
