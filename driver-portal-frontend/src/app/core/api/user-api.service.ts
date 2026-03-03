import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_API_BASE_URL } from '../tokens';

export type UserSummaryResponse = {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  enabled: boolean;
  createdAt: string;
};

export type UserSearchResponse = {
  items: UserSummaryResponse[];
  total: number;
  limit: number;
  offset: number;
};

export type UserProfileResponse = {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  countryCode: string | null;
  countryName: string | null;
  countryDialCode: string | null;
  enabled: boolean;
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(USER_API_BASE_URL);

  getProfile(userId: string) {
    return this.http.get<UserProfileResponse>(`${this.baseUrl}/api/v1/users/${userId}/profile`);
  }

  searchUsers(query: string, limit = 25) {
    return this.http.get<UserSearchResponse>(`${this.baseUrl}/api/v1/users`, {
      params: {
        query,
        limit,
      },
    });
  }
}
