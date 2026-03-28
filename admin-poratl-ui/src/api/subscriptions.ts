import { subscriptionApiBaseUrl } from './config';
import { requestJson } from './http';
import type {
  CreateSubscriptionAllocationRequest,
  CreateSubscriptionPlanRequest,
  PreviewSubscriptionUtilizationRequest,
  RecordSubscriptionUtilizationRequest,
  SubscriptionAllocation,
  SubscriptionAuditLog,
  SubscriptionPlan,
  SubscriptionPlanSearchResponse,
  SubscriptionUtilization,
  SubscriptionUtilizationPreview,
  UpdateAllocationStatusRequest,
} from '../types/subscription';

export function listSubscriptionPlans(token: string, limit = 10, offset = 0) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  return requestJson<SubscriptionPlanSearchResponse>(
    `${subscriptionApiBaseUrl}/api/v1/subscriptions/plans?${params.toString()}`,
    { token }
  );
}

export function createSubscriptionPlan(token: string, payload: CreateSubscriptionPlanRequest) {
  return requestJson<SubscriptionPlan>(`${subscriptionApiBaseUrl}/api/v1/subscriptions/plans`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function listSubscriptionAllocations(
  token: string,
  filters: { userId?: string; organizationId?: string; groupId?: string; activeOnly?: boolean }
) {
  const params = new URLSearchParams();
  if (filters.userId) params.set('userId', filters.userId);
  if (filters.organizationId) params.set('organizationId', filters.organizationId);
  if (filters.groupId) params.set('groupId', filters.groupId);
  if (typeof filters.activeOnly === 'boolean') params.set('activeOnly', String(filters.activeOnly));

  const query = params.toString();
  return requestJson<SubscriptionAllocation[]>(
    `${subscriptionApiBaseUrl}/api/v1/subscriptions/allocations${query ? `?${query}` : ''}`,
    { token }
  );
}

export function createSubscriptionAllocation(token: string, payload: CreateSubscriptionAllocationRequest) {
  return requestJson<SubscriptionAllocation>(`${subscriptionApiBaseUrl}/api/v1/subscriptions/allocations`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function updateSubscriptionAllocationStatus(
  token: string,
  allocationId: string,
  payload: UpdateAllocationStatusRequest
) {
  return requestJson<SubscriptionAllocation>(`${subscriptionApiBaseUrl}/api/v1/subscriptions/allocations/${allocationId}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify(payload),
  });
}

export function listSubscriptionAuditLogs(
  token: string,
  filters: { planId?: string; allocationId?: string; userId?: string; organizationId?: string; groupId?: string }
) {
  const params = new URLSearchParams();
  if (filters.planId) params.set('planId', filters.planId);
  if (filters.allocationId) params.set('allocationId', filters.allocationId);
  if (filters.userId) params.set('userId', filters.userId);
  if (filters.organizationId) params.set('organizationId', filters.organizationId);
  if (filters.groupId) params.set('groupId', filters.groupId);

  const query = params.toString();
  return requestJson<SubscriptionAuditLog[]>(
    `${subscriptionApiBaseUrl}/api/v1/subscriptions/audit-logs${query ? `?${query}` : ''}`,
    { token }
  );
}

export function listSubscriptionUtilizations(token: string, userId: string) {
  const params = new URLSearchParams({ userId });
  return requestJson<SubscriptionUtilization[]>(
    `${subscriptionApiBaseUrl}/api/v1/subscriptions/utilizations?${params.toString()}`,
    { token }
  );
}

export function previewSubscriptionUtilization(token: string, payload: PreviewSubscriptionUtilizationRequest) {
  return requestJson<SubscriptionUtilizationPreview>(`${subscriptionApiBaseUrl}/api/v1/subscriptions/utilizations/preview`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function recordSubscriptionUtilization(token: string, payload: RecordSubscriptionUtilizationRequest) {
  return requestJson<SubscriptionUtilization>(`${subscriptionApiBaseUrl}/api/v1/subscriptions/utilizations`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}
