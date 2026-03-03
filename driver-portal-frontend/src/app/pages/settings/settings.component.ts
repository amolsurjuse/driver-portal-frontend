import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Observable, switchMap } from 'rxjs';
import {
  PaymentApiService,
  PaymentCard,
  PaymentStateResponse,
  TopUpSourceApi,
  WalletTopUp,
} from '../../core/api/payment-api.service';

type PaymentCardView = {
  id: string;
  brand: string;
  nickname: string;
  last4: string;
  expiry: string;
};

type WalletTopUpView = {
  id: string;
  amount: number;
  timestamp: string;
  source: 'Manual' | 'Auto';
  note?: string;
};

type AutoTopUpDraft = {
  enabled: boolean;
  threshold: number;
  amount: number;
  cardId: string;
};

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();
  private paymentApi = inject(PaymentApiService);
  private autoReloadTimer: ReturnType<typeof setInterval> | null = null;

  walletBalance = signal(0);
  walletBudget = signal(0);
  currencyCode = signal('USD');
  currencySymbol = signal('$');
  quickAmounts = signal<number[]>([10, 25, 50, 100]);
  lastSyncedAt = signal('--');
  walletTopUps = signal<WalletTopUpView[]>([]);
  cards = signal<PaymentCardView[]>([]);
  pendingDeleteCard = signal<PaymentCardView | null>(null);
  currentAutoTopUp = signal<AutoTopUpDraft | null>(null);
  pendingAutoTopUp = signal<AutoTopUpDraft | null>(null);
  errorMessage = signal<string | null>(null);
  loading = signal(false);

  walletForm = this.fb.group({
    amount: [25, [Validators.required, Validators.min(1)]],
  });

  autoTopUpForm = this.fb.group({
    enabled: [false],
    threshold: [30, [Validators.required, Validators.min(1)]],
    amount: [20, [Validators.required, Validators.min(1)]],
    cardId: ['', [Validators.required]],
  });

  cardForm = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(2)]],
    brand: ['Visa', [Validators.required]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
  });

  ngOnInit() {
    this.loadPaymentState();
    this.startAutoReload();
  }

  ngOnDestroy() {
    this.stopAutoReload();
  }

  hasActiveCards(): boolean {
    return this.cards().length > 0;
  }

  addWalletBalance() {
    if (!this.hasActiveCards()) {
      this.errorMessage.set('Add a credit card before adding wallet balance.');
      return;
    }
    if (this.walletForm.invalid) return;
    const amount = Number(this.walletForm.value.amount ?? 0);
    if (!Number.isFinite(amount) || amount <= 0) return;

    this.runApi(
      this.paymentApi
        .addTopUp({ amount, source: 'MANUAL' })
        .pipe(switchMap(() => this.paymentApi.getState())),
      (state) => {
        this.walletForm.patchValue({ amount: this.defaultTopUpAmount() });
        this.applyState(state);
      }
    );
  }

  setWalletAmount(amount: number) {
    this.walletForm.patchValue({ amount });
  }

  onAutoTopUpConfigChange() {
    if (this.loading() || this.pendingAutoTopUp()) return;
    if (!this.hasActiveCards()) {
      this.pendingAutoTopUp.set(null);
      return;
    }
    if (this.autoTopUpForm.invalid) return;
    const raw = this.autoTopUpForm.getRawValue();
    const cardId = raw.cardId ?? '';
    if (!cardId) return;

    const threshold = Number(raw.threshold ?? 0);
    const amount = Number(raw.amount ?? 0);
    if (!Number.isFinite(threshold) || !Number.isFinite(amount) || threshold <= 0 || amount <= 0) {
      return;
    }

    const draft: AutoTopUpDraft = {
      enabled: !!raw.enabled,
      threshold,
      amount,
      cardId,
    };

    const current = this.currentAutoTopUp();
    if (current && this.isSameAutoTopUpConfig(current, draft)) {
      return;
    }

    this.pendingAutoTopUp.set(draft);
  }

  cancelAutoTopUpChange() {
    if (this.loading()) {
      return;
    }
    this.pendingAutoTopUp.set(null);
    this.restoreAutoTopUpFormFromCurrent();
  }

  confirmAutoTopUpChange() {
    const draft = this.pendingAutoTopUp();
    if (!draft) {
      return;
    }
    if (!this.hasActiveCards()) {
      this.pendingAutoTopUp.set(null);
      this.errorMessage.set('Add a credit card before configuring auto top-up.');
      return;
    }

    this.runApi(
      this.paymentApi.updateAutoTopUp(draft).pipe(switchMap(() => this.paymentApi.getState())),
      (state) => {
        this.applyState(state);
        this.pendingAutoTopUp.set(null);
      },
      false
    );
  }

  addCard() {
    if (this.cardForm.invalid) return;
    const payload = {
      nickname: this.cardForm.value.nickname ?? '',
      brand: this.cardForm.value.brand ?? 'Visa',
      cardNumber: this.cardForm.value.cardNumber ?? '',
      expiry: this.cardForm.value.expiry ?? '',
    };

    this.runApi(
      this.paymentApi.addCard(payload).pipe(switchMap(() => this.paymentApi.getState())),
      (state) => {
        this.cardForm.reset({
          nickname: '',
          brand: 'Visa',
          cardNumber: '',
          expiry: '',
        });
        this.applyState(state);
      }
    );
  }

  openDeleteCardDialog(card: PaymentCardView) {
    if (this.loading()) {
      return;
    }
    this.pendingDeleteCard.set(card);
  }

  closeDeleteCardDialog() {
    if (this.loading()) {
      return;
    }
    this.pendingDeleteCard.set(null);
  }

  confirmDeleteCard() {
    const card = this.pendingDeleteCard();
    if (!card) {
      return;
    }

    this.runApi(
      this.paymentApi.deleteCard(card.id).pipe(switchMap(() => this.paymentApi.getState())),
      (state) => {
        this.applyState(state);
        this.pendingDeleteCard.set(null);
      }
    );
  }

  walletUsagePercent(): number {
    const budget = this.walletBudget();
    if (budget <= 0) {
      return 0;
    }
    const value = (this.walletBalance() / budget) * 100;
    return Math.max(0, Math.min(100, Number(value.toFixed(1))));
  }

  private startAutoReload() {
    this.stopAutoReload();
    this.autoReloadTimer = setInterval(() => this.reloadPaymentData(), 30000);
  }

  private stopAutoReload() {
    if (this.autoReloadTimer) {
      clearInterval(this.autoReloadTimer);
      this.autoReloadTimer = null;
    }
  }

  private reloadPaymentData() {
    if (this.pendingDeleteCard() || this.pendingAutoTopUp()) {
      return;
    }
    this.runApi(
      this.paymentApi.reload(),
      (response) => this.applyState(response.state),
      false
    );
  }

  private loadPaymentState() {
    this.runApi(this.paymentApi.getState(), (state) => this.applyState(state));
  }

  private applyState(state: PaymentStateResponse) {
    const cards = state.cards ?? [];
    this.walletBalance.set(this.moneyToNumber(state.wallet?.balance));
    this.walletBudget.set(this.moneyToNumber(state.wallet?.budget));
    const currencyCode = this.resolveCurrencyCode(state.wallet?.currency);
    const countryCode = (state.wallet?.countryCode ?? '').trim().toUpperCase();
    this.currencyCode.set(currencyCode);
    this.currencySymbol.set(this.resolveCurrencySymbol(state.wallet?.currencySymbol));
    this.quickAmounts.set(this.resolveTopUpPresets(state.wallet?.topUpPresets, currencyCode, countryCode));
    this.cards.set(cards);
    const pendingCard = this.pendingDeleteCard();
    if (pendingCard && !cards.some((card) => card.id === pendingCard.id)) {
      this.pendingDeleteCard.set(null);
    }

    this.walletTopUps.set((state.topUps ?? []).slice(0, 5).map((topUp) => this.toWalletTopUpView(topUp)));

    const requestedCardId = state.autoTopUp?.cardId ?? '';
    const resolvedCardId = this.resolveCardId(requestedCardId, cards);
    const currentAutoTopUp: AutoTopUpDraft = {
      enabled: cards.length > 0 ? !!state.autoTopUp?.enabled : false,
      threshold: this.moneyToNumber(state.autoTopUp?.threshold),
      amount: this.moneyToNumber(state.autoTopUp?.amount),
      cardId: resolvedCardId,
    };
    this.autoTopUpForm.patchValue(
      currentAutoTopUp,
      { emitEvent: false }
    );
    this.currentAutoTopUp.set(currentAutoTopUp);

    this.lastSyncedAt.set(this.formatSyncTimestamp(state.lastSyncedAt));
    this.errorMessage.set(null);
  }

  private resolveCardId(candidateCardId: string, cards: PaymentCard[]): string {
    if (cards.length === 0) {
      return '';
    }
    if (candidateCardId && cards.some((card) => card.id === candidateCardId)) {
      return candidateCardId;
    }
    return cards[0].id;
  }

  private toWalletTopUpView(topUp: WalletTopUp): WalletTopUpView {
    return {
      id: topUp.id,
      amount: this.moneyToNumber(topUp.amount),
      timestamp: this.formatTopUpTimestamp(topUp.timestamp),
      source: this.toTopUpSource(topUp.source),
      note: topUp.note ?? undefined,
    };
  }

  private toTopUpSource(source: TopUpSourceApi): 'Manual' | 'Auto' {
    return source === 'AUTO' ? 'Auto' : 'Manual';
  }

  autoTopUpCardLabel(cardId: string): string {
    const card = this.cards().find((item) => item.id === cardId);
    if (!card) {
      return 'selected card';
    }
    return `${card.brand} •••• ${card.last4}`;
  }

  private moneyToNumber(value: number | null | undefined): number {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private restoreAutoTopUpFormFromCurrent() {
    const current = this.currentAutoTopUp();
    if (!current) {
      return;
    }
    this.autoTopUpForm.patchValue(current, { emitEvent: false });
  }

  private isSameAutoTopUpConfig(left: AutoTopUpDraft, right: AutoTopUpDraft): boolean {
    return (
      left.enabled === right.enabled &&
      left.threshold === right.threshold &&
      left.amount === right.amount &&
      left.cardId === right.cardId
    );
  }

  private formatTopUpTimestamp(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return 'Unknown';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }

  private formatSyncTimestamp(iso: string | null | undefined): string {
    const date = iso ? new Date(iso) : new Date();
    if (Number.isNaN(date.getTime())) {
      return '--';
    }
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  formatCurrency(amount: number): string {
    const code = this.currencyCode();
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code,
      }).format(amount);
    } catch {
      return `${this.currencySymbol()}${amount.toFixed(2)}`;
    }
  }

  formatQuickAmount(amount: number): string {
    return this.formatCurrency(amount);
  }

  private runApi<T>(
    request$: Observable<T>,
    onSuccess: (response: T) => void,
    showError = true
  ) {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);

    request$
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => onSuccess(response),
        error: (error: unknown) => {
          if (showError) {
            this.errorMessage.set(this.extractErrorMessage(error));
          }
        },
      });
  }

  private extractErrorMessage(error: unknown): string {
    if (typeof error !== 'object' || error === null) {
      return 'Payment API request failed.';
    }

    const maybeError = error as {
      error?: unknown;
      message?: string;
      status?: number;
      statusText?: string;
    };

    if (typeof maybeError.error === 'string' && maybeError.error.trim()) {
      return maybeError.error;
    }

    if (maybeError.error && typeof maybeError.error === 'object') {
      const payload = maybeError.error as { message?: string; error?: string };
      if (payload.message) {
        return payload.message;
      }
      if (payload.error) {
        return payload.error;
      }
    }

    if (maybeError.message) {
      return maybeError.message;
    }

    if (maybeError.status) {
      const statusText = maybeError.statusText ? ` ${maybeError.statusText}` : '';
      return `Payment API request failed (${maybeError.status}${statusText}).`;
    }

    return 'Payment API request failed.';
  }

  private resolveCurrencyCode(value: string | null | undefined): string {
    const normalized = (value ?? '').trim().toUpperCase();
    return normalized || 'USD';
  }

  private resolveCurrencySymbol(value: string | null | undefined): string {
    const normalized = (value ?? '').trim();
    return normalized || '$';
  }

  private resolveTopUpPresets(values: number[] | null | undefined, currencyCode: string, countryCode: string): number[] {
    const fallback = this.defaultTopUpPresets(currencyCode, countryCode);
    if (!Array.isArray(values) || values.length === 0) {
      return fallback;
    }

    const parsed = values
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value) && value > 0)
      .map((value) => Number(value.toFixed(2)));

    return parsed.length > 0 ? parsed : fallback;
  }

  private defaultTopUpPresets(currencyCode: string, countryCode: string): number[] {
    const country = countryCode.trim().toUpperCase();
    const currency = currencyCode.trim().toUpperCase();

    if (country === 'IN' || currency === 'INR') {
      return [500, 1000, 2000, 5000];
    }
    if (country === 'JP' || currency === 'JPY') {
      return [1000, 3000, 5000, 10000];
    }
    if (country === 'GB' || currency === 'GBP') {
      return [10, 20, 40, 80];
    }
    if (country === 'SE' || currency === 'SEK') {
      return [100, 250, 500, 1000];
    }
    if (country === 'NO' || currency === 'NOK') {
      return [120, 300, 600, 1200];
    }
    if (country === 'DK' || currency === 'DKK') {
      return [75, 200, 350, 700];
    }
    if (country === 'AE' || currency === 'AED') {
      return [25, 50, 100, 200];
    }
    if (currency === 'EUR') {
      return [10, 25, 50, 100];
    }
    return [10, 25, 50, 100];
  }

  private defaultTopUpAmount(): number {
    const values = this.quickAmounts();
    if (values.length === 0) {
      return 25;
    }
    return values[Math.min(1, values.length - 1)];
  }
}
