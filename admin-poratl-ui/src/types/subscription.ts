export type DiscountType = 'NONE' | 'PERCENTAGE' | 'FIXED_AMOUNT';
export type AllocationType = 'USER' | 'ORGANIZATION' | 'ORGANIZATION_GROUP';
export type AllocationStatus = 'ACTIVE' | 'PAUSED' | 'EXPIRED';
export type AuditAction =
  | 'PLAN_CREATED'
  | 'PLAN_UPDATED'
  | 'ALLOCATION_CREATED'
  | 'ALLOCATION_STATUS_CHANGED'
  | 'UTILIZATION_RECORDED';

export type SubscriptionPlan = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  currencyCode: string;
  totalFeeDiscountType: DiscountType;
  totalFeeDiscountValue: string;
  sessionFeeDiscountType: DiscountType;
  sessionFeeDiscountValue: string;
  defaultQuotaLimit: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionPlanSearchResponse = {
  items: SubscriptionPlan[];
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type CreateSubscriptionPlanRequest = {
  code: string;
  name: string;
  description: string;
  currencyCode: string;
  totalFeeDiscountType: DiscountType;
  totalFeeDiscountValue: number;
  sessionFeeDiscountType: DiscountType;
  sessionFeeDiscountValue: number;
  defaultQuotaLimit: number | null;
};

export type SubscriptionAllocation = {
  id: string;
  planId: string;
  planCode: string;
  planName: string;
  currencyCode: string;
  allocationType: AllocationType;
  userId: string | null;
  organizationId: string | null;
  groupId: string | null;
  quotaLimit: number | null;
  effectiveQuotaLimit: number | null;
  consumedUnits: number;
  remainingQuota: number | null;
  startsAt: string;
  endsAt: string | null;
  status: AllocationStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubscriptionAllocationRequest = {
  planId: string;
  allocationType: AllocationType;
  userId?: string;
  organizationId?: string;
  groupId?: string;
  quotaLimit?: number | null;
  startsAt: string;
  endsAt?: string;
  status?: AllocationStatus;
  createdBy: string;
};

export type UpdateAllocationStatusRequest = {
  status: AllocationStatus;
  actor: string;
  reason?: string;
};

export type SubscriptionAuditLog = {
  id: string;
  planId: string | null;
  allocationId: string | null;
  userId: string | null;
  organizationId: string | null;
  groupId: string | null;
  action: AuditAction;
  actor: string;
  detail: string;
  createdAt: string;
};

export type SubscriptionUtilization = {
  id: string;
  allocationId: string;
  planId: string;
  planCode: string;
  planName: string;
  currencyCode: string;
  userId: string;
  organizationId: string | null;
  groupId: string | null;
  sessionReference: string | null;
  chargingCost: string;
  sessionFee: string;
  idleFee: string;
  taxes: string;
  eligibleSubtotal: string;
  totalFeeDiscountAmount: string;
  sessionFeeDiscountAmount: string;
  totalDiscountAmount: string;
  finalChargeExcludingTax: string;
  finalChargeIncludingTax: string;
  unitsConsumed: number;
  remainingQuota: number | null;
  note: string | null;
  utilizedAt: string;
};

export type PreviewSubscriptionUtilizationRequest = {
  allocationId?: string;
  userId: string;
  organizationId?: string;
  groupId?: string;
  sessionReference?: string;
  chargingCost: number;
  sessionFee: number;
  idleFee: number;
  taxes: number;
  unitsConsumed?: number | null;
};

export type SubscriptionUtilizationPreview = {
  allocationId: string;
  planId: string;
  planCode: string;
  planName: string;
  currencyCode: string;
  userId: string;
  organizationId: string | null;
  groupId: string | null;
  sessionReference: string | null;
  chargingCost: string;
  sessionFee: string;
  idleFee: string;
  taxes: string;
  eligibleSubtotal: string;
  totalFeeDiscountAmount: string;
  sessionFeeDiscountAmount: string;
  totalDiscountAmount: string;
  finalChargeExcludingTax: string;
  finalChargeIncludingTax: string;
  unitsConsumed: number;
  remainingQuotaAfterUse: number | null;
};

export type RecordSubscriptionUtilizationRequest = {
  allocationId?: string;
  userId: string;
  organizationId?: string;
  groupId?: string;
  sessionReference?: string;
  chargingCost: number;
  sessionFee: number;
  idleFee: number;
  taxes: number;
  unitsConsumed?: number | null;
  note?: string;
  actor: string;
};
