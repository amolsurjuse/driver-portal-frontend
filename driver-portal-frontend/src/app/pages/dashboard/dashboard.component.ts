import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentApiService } from '../../core/api/payment-api.service';

type UsagePoint = {
  month: string;
  energyKwh: number;
  priceUsd: number;
};

type ChartPoint = {
  x: number;
  y: number;
};

type Tick = {
  y: number;
  value: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private paymentApi = inject(PaymentApiService);

  stats = signal([
    {
      key: 'energy',
      label: 'Energy used (total)',
      value: '428.6 kWh',
      icon: '⚡',
      tone: 'energy',
      meta: 'Updated now',
    },
    {
      key: 'session',
      label: 'Last charging date',
      value: 'Feb 21, 2026',
      icon: '🗓',
      tone: 'date',
      meta: 'Last session',
    },
    {
      key: 'wallet',
      label: 'Wallet balance',
      value: '$96.40',
      icon: '👛',
      tone: 'wallet',
      meta: 'Available credit',
    },
    {
      key: 'savings',
      label: 'Total savings',
      value: '$184.25',
      icon: '💰',
      tone: 'savings',
      meta: 'With subscriptions',
    },
  ]);

  usageLastYear: UsagePoint[] = [
    { month: 'Jan', energyKwh: 22, priceUsd: 10.8 },
    { month: 'Feb', energyKwh: 27, priceUsd: 12.6 },
    { month: 'Mar', energyKwh: 31, priceUsd: 14.2 },
    { month: 'Apr', energyKwh: 29, priceUsd: 13.7 },
    { month: 'May', energyKwh: 33, priceUsd: 15.1 },
    { month: 'Jun', energyKwh: 38, priceUsd: 17.5 },
    { month: 'Jul', energyKwh: 36, priceUsd: 16.8 },
    { month: 'Aug', energyKwh: 40, priceUsd: 18.4 },
    { month: 'Sep', energyKwh: 43, priceUsd: 20.1 },
    { month: 'Oct', energyKwh: 41, priceUsd: 19.4 },
    { month: 'Nov', energyKwh: 46, priceUsd: 21.3 },
    { month: 'Dec', energyKwh: 49, priceUsd: 22.7 },
  ];

  chart = this.buildUsageChart();

  ngOnInit(): void {
    this.paymentApi.getState().subscribe({
      next: (state) => {
        const code = (state.wallet?.currency ?? 'USD').toUpperCase();
        const amount = Number(state.wallet?.balance ?? 0);
        const walletValue = this.formatCurrency(amount, code);
        this.stats.update((cards) =>
          cards.map((card) =>
            card.key === 'wallet'
              ? {
                  ...card,
                  value: walletValue,
                  meta: 'Available credit',
                }
              : card
          )
        );
      },
      error: () => {
        this.stats.update((cards) =>
          cards.map((card) =>
            card.key === 'wallet'
              ? {
                  ...card,
                  meta: 'Unable to refresh',
                }
              : card
          )
        );
      },
    });
  }

  private formatCurrency(amount: number, currencyCode: string): string {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
    } catch {
      return `$${amount.toFixed(2)}`;
    }
  }

  private buildUsageChart() {
    const width = 1040;
    const height = 360;
    const left = 54;
    const right = 54;
    const top = 24;
    const bottom = 54;

    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const baseY = top + plotHeight;
    const count = this.usageLastYear.length;
    const stepX = count > 1 ? plotWidth / (count - 1) : plotWidth;

    const energyMax = Math.max(...this.usageLastYear.map((d) => d.energyKwh));
    const priceMax = Math.max(...this.usageLastYear.map((d) => d.priceUsd));

    const energyPoints: ChartPoint[] = this.usageLastYear.map((d, i) => ({
      x: left + i * stepX,
      y: this.scaleY(d.energyKwh, energyMax, top, plotHeight),
    }));
    const pricePoints: ChartPoint[] = this.usageLastYear.map((d, i) => ({
      x: left + i * stepX,
      y: this.scaleY(d.priceUsd, priceMax, top, plotHeight),
    }));

    const energyTicks = this.buildTicks(energyMax, top, plotHeight, '');
    const priceTicks = this.buildTicks(priceMax, top, plotHeight, '$');
    const xLabels = this.usageLastYear.map((d, i) => ({
      label: d.month,
      x: left + i * stepX,
    }));

    return {
      width,
      height,
      top,
      left,
      right,
      baseY,
      energyPoints,
      pricePoints,
      energyLinePath: this.toLinePath(energyPoints),
      priceLinePath: this.toLinePath(pricePoints),
      energyAreaPath: this.toAreaPath(energyPoints, baseY),
      priceAreaPath: this.toAreaPath(pricePoints, baseY),
      energyTicks,
      priceTicks,
      xLabels,
    };
  }

  private scaleY(value: number, max: number, top: number, plotHeight: number): number {
    if (max <= 0) {
      return top + plotHeight;
    }
    return top + plotHeight - (value / max) * plotHeight;
  }

  private buildTicks(max: number, top: number, plotHeight: number, prefix: string): Tick[] {
    const tickCount = 5;
    return Array.from({ length: tickCount }, (_, index) => {
      const ratio = index / (tickCount - 1);
      const value = Math.round(max - ratio * max);
      return {
        y: top + ratio * plotHeight,
        value: `${prefix}${value}`,
      };
    });
  }

  private toLinePath(points: ChartPoint[]): string {
    if (points.length === 0) return '';
    return points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  private toAreaPath(points: ChartPoint[], baseY: number): string {
    if (points.length === 0) return '';
    const line = this.toLinePath(points);
    const first = points[0];
    const last = points[points.length - 1];
    return `${line} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`;
  }
}
