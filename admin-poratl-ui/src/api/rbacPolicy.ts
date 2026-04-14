import { userApiBaseUrl } from './config';
import { requestJson } from './http';
import type { RbacPolicy, RbacPolicyUpdateRequest } from '../types/admin';

export function getRbacPolicy(token: string) {
  return requestJson<RbacPolicy>(`${userApiBaseUrl}/api/v1/admin/rbac/policy`, {
    token,
  });
}

export function updateRbacPolicy(token: string, payload: RbacPolicyUpdateRequest) {
  return requestJson<RbacPolicy>(`${userApiBaseUrl}/api/v1/admin/rbac/policy`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
}
