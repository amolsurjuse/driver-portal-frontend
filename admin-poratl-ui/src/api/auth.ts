import { authApiBaseUrl } from './config';
import { requestJson } from './http';
import type { AccessTokenResponse, LoginRequest } from '../types/admin';

export function login(payload: LoginRequest) {
  return requestJson<AccessTokenResponse>(`${authApiBaseUrl}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logoutAll(token: string) {
  return requestJson<void>(`${authApiBaseUrl}/api/auth/logout-all`, {
    method: 'POST',
    token,
    body: JSON.stringify({}),
  });
}
