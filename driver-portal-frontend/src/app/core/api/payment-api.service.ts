import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PAYMENT_API_BASE_URL } from '../tokens';

export type TopUpSourceApi = 'MANUAL' | 'AUTO';

export type WalletStateResponse = {
  balance: number;
  budget: number;
  currency: string;
  currencySymbol: string;
  countryCode: string;
  topUpPresets: number[];
};

export type AutoTopUpConfig = {
  enabled: boolean;
  threshold: number;
  amount: number;
  cardId: string;
};

export type PaymentCard = {
  id: string;
  brand: string;
  nickname: string;
  last4: string;
  expiry: string;
};

export type WalletTopUp = {
  id: string;
  amount: number;
  timestamp: string;
  source: TopUpSourceApi;
  note?: string | null;
};

export type PaymentStateResponse = {
  wallet: WalletStateResponse;
  autoTopUp: AutoTopUpConfig;
  cards: PaymentCard[];
  topUps: WalletTopUp[];
  lastSyncedAt: string;
};

export type AddTopUpRequest = {
  amount: number;
  source?: TopUpSourceApi;
  note?: string;
};

export type TopUpCreatedResponse = {
  topUp: WalletTopUp;
  walletBalance: number;
};

export type AddCardRequest = {
  brand: string;
  nickname: string;
  cardNumber: string;
  expiry: string;
};

export type DeleteCardResponse = {
  cardId: string;
  deleted: boolean;
};

export type UpdateAutoTopUpRequest = {
  enabled: boolean;
  threshold: number;
  amount: number;
  cardId: string;
};

export type ReloadResponse = {
  lastSyncedAt: string;
  autoTopUpApplied: boolean;
  state: PaymentStateResponse;
};

@Injectable({ providedIn: 'root' })
export class PaymentApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(PAYMENT_API_BASE_URL);

  getState() {
    return this.http.get<PaymentStateResponse>(`${this.baseUrl}/api/v1/payment/state`);
  }

  addTopUp(payload: AddTopUpRequest) {
    return this.http.post<TopUpCreatedResponse>(`${this.baseUrl}/api/v1/payment/wallet/topups`, payload);
  }

  addCard(payload: AddCardRequest) {
    return this.http.post<PaymentCard>(`${this.baseUrl}/api/v1/payment/cards`, payload);
  }

  deleteCard(cardId: string) {
    return this.http.delete<DeleteCardResponse>(`${this.baseUrl}/api/v1/payment/cards/${cardId}`);
  }

  updateAutoTopUp(payload: UpdateAutoTopUpRequest) {
    return this.http.put<AutoTopUpConfig>(`${this.baseUrl}/api/v1/payment/auto-topup`, payload);
  }

  reload() {
    return this.http.post<ReloadResponse>(`${this.baseUrl}/api/v1/payment/reload`, {});
  }
}
