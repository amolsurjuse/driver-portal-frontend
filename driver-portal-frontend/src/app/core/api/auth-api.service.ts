import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../tokens';

export type LoginRequest = {
  email: string;
  password: string;
};

export type AddressDto = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  countryIsoCode: string;
};

export type CountryOption = {
  code: string;
  name: string;
  dialCode: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: AddressDto;
};

export type AccessTokenResponse = {
  accessToken: string;
  tokenType: string;
};

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  login(payload: LoginRequest) {
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/api/auth/login`, payload);
  }

  register(payload: RegisterRequest) {
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/api/auth/register`, payload);
  }

  refresh() {
    return this.http.post<AccessTokenResponse>(`${this.baseUrl}/api/auth/refresh`, {});
  }

  logoutDevice() {
    return this.http.post<void>(`${this.baseUrl}/api/auth/logout-device`, {});
  }

  logoutAll() {
    return this.http.post<void>(`${this.baseUrl}/api/auth/logout-all`, {});
  }

  listCountries() {
    return this.http.get<CountryOption[]>(`${this.baseUrl}/api/countries`);
  }
}
