import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="nf">
      <h1>Page not found</h1>
      <p>We couldn't locate that page. Try heading back to the dashboard.</p>
      <a routerLink="/dashboard">Go to dashboard</a>
    </section>
  `,
  styles: [
    `
      .nf {
        padding: 40px;
        text-align: center;
      }
      a {
        color: var(--accent);
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
