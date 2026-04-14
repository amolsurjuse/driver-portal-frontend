import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="not-found-page">
      <div class="not-found-content">
        <div class="not-found-code">404</div>
        <h1>Page not found</h1>
        <p class="muted">The page you're looking for doesn't exist or has been moved.</p>
        <div class="not-found-actions">
          <a routerLink="/dashboard" class="btn-primary">Go to Dashboard</a>
          <a routerLink="/charging-history" class="btn-ghost">Charging History</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .not-found-page {
        display: grid;
        place-items: center;
        min-height: 50vh;
        text-align: center;
        padding: 40px 20px;
      }

      .not-found-content {
        max-width: 420px;
        display: grid;
        gap: 12px;
        justify-items: center;
      }

      .not-found-code {
        font-size: 4.5rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: -0.04em;
        background: linear-gradient(135deg, var(--primary, #1a8a6e), #6bc4a4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .not-found-page h1 {
        margin: 0;
        font-size: 1.2rem;
      }

      .not-found-page p {
        margin: 0;
      }

      .muted {
        color: var(--muted, #5e6e7d);
      }

      .not-found-actions {
        display: flex;
        gap: 10px;
        margin-top: 8px;
        flex-wrap: wrap;
        justify-content: center;
      }

    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
