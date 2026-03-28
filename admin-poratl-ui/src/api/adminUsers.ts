import { userApiBaseUrl } from './config';
import { requestJson, requestVoid } from './http';
import type { AdminUpdateUserRequest, AdminUserDetail, AdminUserSearchResponse, UserSearchResponse } from '../types/admin';

export function searchUsers(token: string, query: string, limit = 50, offset = 0) {
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    offset: String(offset),
  });

  return requestJson<UserSearchResponse>(`${userApiBaseUrl}/api/v1/users?${params.toString()}`, {
    token,
  });
}

export function searchAdminUsers(token: string, query: string, limit = 50, offset = 0) {
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    offset: String(offset),
  });

  return requestJson<AdminUserSearchResponse>(`${userApiBaseUrl}/api/v1/admin/users?${params.toString()}`, {
    token,
  });
}

export function getAdminUser(token: string, userId: string) {
  return requestJson<AdminUserDetail>(`${userApiBaseUrl}/api/v1/admin/users/${userId}`, {
    token,
  });
}

export function updateAdminUser(token: string, userId: string, payload: AdminUpdateUserRequest) {
  return requestJson<AdminUserDetail>(`${userApiBaseUrl}/api/v1/admin/users/${userId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
}

export function resetAdminUserPassword(token: string, userId: string, newPassword: string) {
  return requestVoid(`${userApiBaseUrl}/api/v1/admin/users/${userId}/reset-password`, {
    method: 'POST',
    token,
    body: JSON.stringify({ newPassword }),
  });
}

export function deleteAdminUser(token: string, userId: string) {
  return requestVoid(`${userApiBaseUrl}/api/v1/admin/users/${userId}`, {
    method: 'DELETE',
    token,
  });
}
