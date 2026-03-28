import { pricingApiBaseUrl } from './config';
import { requestJson } from './http';
import type {
  CreatePricingPlanRequest,
  PageResponse,
  PriceHistory,
  PricingPlan,
  PricingSearchReindexResponse,
  PricingSearchSyncResponse,
  PricingPlanSummary,
  UpdatePricingPlanRequest,
} from '../types/pricing';

const base = `${pricingApiBaseUrl}/api/v1/pricing`;

/* ── Plans CRUD ── */

export async function listPricingPlans(token: string): Promise<PricingPlan[]> {
  return requestJson<PricingPlan[]>(`${base}/plans`, { token });
}

export async function listPricingPlansPage(
  token: string,
  params: {
    query?: string;
    active?: boolean;
    page?: number;
    size?: number;
  },
): Promise<PageResponse<PricingPlan>> {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.set('query', params.query);
  if (params.active !== undefined) searchParams.set('active', String(params.active));
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));

  const queryString = searchParams.toString();
  const url = queryString ? `${base}/plans/paged?${queryString}` : `${base}/plans/paged`;
  return requestJson<PageResponse<PricingPlan>>(url, { token });
}

export async function getPricingPlan(token: string, planId: string): Promise<PricingPlan> {
  return requestJson<PricingPlan>(`${base}/plans/${planId}`, { token });
}

export async function createPricingPlan(
  token: string,
  request: CreatePricingPlanRequest,
): Promise<PricingPlan> {
  return requestJson<PricingPlan>(`${base}/plans`, {
    method: 'POST',
    body: JSON.stringify(request),
    token,
  });
}

export async function updatePricingPlan(
  token: string,
  planId: string,
  request: UpdatePricingPlanRequest,
): Promise<PricingPlan> {
  return requestJson<PricingPlan>(`${base}/plans/${planId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
    token,
  });
}

export async function deactivatePricingPlan(token: string, planId: string): Promise<void> {
  await requestJson<void>(`${base}/plans/${planId}`, {
    method: 'DELETE',
    token,
  });
}

/* ── Search ── */

export async function searchPricingPlans(
  token: string,
  params: {
    query?: string;
    pricingType?: string;
    currency?: string;
    activeOnly?: boolean;
    page?: number;
    size?: number;
  },
): Promise<PageResponse<PricingPlanSummary>> {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.set('query', params.query);
  if (params.pricingType) searchParams.set('pricingType', params.pricingType);
  if (params.currency) searchParams.set('currency', params.currency);
  if (params.activeOnly !== undefined) searchParams.set('activeOnly', String(params.activeOnly));
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));

  return requestJson<PageResponse<PricingPlanSummary>>(
    `${base}/search?${searchParams.toString()}`,
    { method: 'POST', token },
  );
}

/* ── History ── */

export async function getPlanHistory(
  token: string,
  planId: string,
): Promise<PriceHistory[]> {
  return requestJson<PriceHistory[]>(`${base}/history/plan/${planId}`, { token });
}

/* ── Health ── */

export async function getPricingHealth(): Promise<{ status: string; timestamp: string }> {
  return requestJson<{ status: string; timestamp: string }>(`${base}/health`);
}

/* ── Elasticsearch Sync ── */

export async function reindexPricingSearch(token: string): Promise<PricingSearchReindexResponse> {
  return requestJson<PricingSearchReindexResponse>(`${base}/plans/search/reindex`, {
    method: 'POST',
    token,
  });
}

export async function syncPricingSearchByPlanId(
  token: string,
  planId: string,
): Promise<PricingSearchSyncResponse> {
  return requestJson<PricingSearchSyncResponse>(`${base}/plans/search/sync/${encodeURIComponent(planId)}`, {
    method: 'POST',
    token,
  });
}
