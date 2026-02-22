import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CHARGING_SESSIONS } from './charging-history.data';

@Component({
  selector: 'app-charging-receipt',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './charging-receipt.component.html',
  styleUrls: ['./charging-receipt.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargingReceiptComponent {
  private readonly route = inject(ActivatedRoute);

  sessionId = this.route.snapshot.paramMap.get('sessionId') ?? '';
  session = CHARGING_SESSIONS.find((item) => item.sessionId === this.sessionId);

  downloadPdf() {
    if (!this.session) return;
    const tax = this.session.taxesUsd;
    const energyCharge = Math.max(this.session.costUsd - tax, 0);
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Receipt ${this.escape(this.session.sessionId)}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #0f172a; }
      .card { border: 1px solid #d9e2ec; border-radius: 12px; padding: 20px; max-width: 760px; }
      h1 { margin: 0 0 4px; font-size: 1.5rem; }
      .muted { color: #64748b; margin: 0 0 18px; }
      .row { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid #e7edf4; padding: 10px 0; }
      .row:last-child { border-bottom: none; }
      .total { font-weight: 700; font-size: 1.05rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Charging Receipt</h1>
      <p class="muted">Electra Hub · ${this.escape(this.session.sessionId)}</p>
      <div class="row"><span>Station</span><span>${this.escape(this.session.station)}</span></div>
      <div class="row"><span>Connector</span><span>${this.escape(this.session.connector)}</span></div>
      <div class="row"><span>Started</span><span>${this.escape(this.session.startedAt)}</span></div>
      <div class="row"><span>Ended</span><span>${this.escape(this.session.endedAt)}</span></div>
      <div class="row"><span>Energy</span><span>${this.session.energyKwh.toFixed(1)} kWh</span></div>
      <div class="row"><span>Tariff</span><span>$${this.session.tariffPerKwh.toFixed(2)} / kWh</span></div>
      <div class="row"><span>Energy charge</span><span>$${energyCharge.toFixed(2)}</span></div>
      <div class="row"><span>Taxes</span><span>$${tax.toFixed(2)}</span></div>
      <div class="row total"><span>Total</span><span>$${this.session.costUsd.toFixed(2)}</span></div>
      <div class="row"><span>Paid with</span><span>${this.escape(this.session.paymentMethod)}</span></div>
    </div>
    <script>
      window.onload = function() {
        window.print();
      };
    </script>
  </body>
</html>`;

    const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
    if (!popup) return;
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
  }

  private escape(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
