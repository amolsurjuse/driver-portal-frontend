import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUserEmail } from '../../core/auth/auth.selectors';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private store = inject(Store);

  email$ = this.store.select(selectUserEmail);

  displayName(email: string | null | undefined): string {
    const source = (email ?? '').trim();
    if (!source) return 'Driver';
    const local = source.split('@')[0] ?? source;
    const words = local
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .map((part) => part.trim())
      .filter(Boolean);
    if (words.length === 0) return 'Driver';
    return words.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }

  initials(email: string | null | undefined): string {
    const words = this.displayName(email).split(' ').filter(Boolean);
    if (words.length === 0) return 'DR';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
  }
}
