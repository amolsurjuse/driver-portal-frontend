import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, of, startWith, switchMap, throwError } from 'rxjs';
import { selectUserEmail, selectUserId } from '../../core/auth/auth.selectors';
import { UserApiService, UserProfileResponse } from '../../core/api/user-api.service';

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
  private userApi = inject(UserApiService);

  email$ = this.store.select(selectUserEmail);
  private userId$ = this.store.select(selectUserId);

  profileState$ = combineLatest([this.userId$, this.email$]).pipe(
    switchMap(([userId, email]) => {
      if (!userId && !email) {
        return of({
          loading: false,
          error: 'Missing user identity in session token.',
          profile: null as UserProfileResponse | null,
          email,
        });
      }

      return this.loadProfile(userId, email).pipe(
        map((profile) => ({
          loading: false,
          error: null as string | null,
          profile,
          email,
        })),
        catchError(() =>
          of({
            loading: false,
            error: 'Unable to load profile details.',
            profile: null as UserProfileResponse | null,
            email,
          })
        ),
        startWith({
          loading: true,
          error: null as string | null,
          profile: null as UserProfileResponse | null,
          email,
        })
      );
    })
  );

  private loadProfile(userId: string | null, email: string | null) {
    if (userId) {
      return this.userApi.getProfile(userId).pipe(
        catchError((error: unknown) => this.loadProfileByEmailIfNotFound(error, email))
      );
    }
    return this.loadProfileByEmail(email);
  }

  private loadProfileByEmailIfNotFound(error: unknown, email: string | null) {
    if (error instanceof HttpErrorResponse && error.status === 404 && email) {
      return this.loadProfileByEmail(email);
    }
    return throwError(() => error);
  }

  private loadProfileByEmail(email: string | null) {
    const normalizedEmail = (email ?? '').trim().toLowerCase();
    if (!normalizedEmail) {
      return throwError(() => new Error('Missing user email in session token.'));
    }
    return this.userApi.searchUsers(normalizedEmail, 50).pipe(
      map((response) =>
        response.items.find((item) => item.email.toLowerCase() === normalizedEmail) ?? null
      ),
      switchMap((match) => {
        if (!match) {
          return throwError(() => new Error('User not found.'));
        }
        return this.userApi.getProfile(match.userId);
      })
    );
  }

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

  fullName(profile: UserProfileResponse | null, email: string | null | undefined): string {
    const first = (profile?.firstName ?? '').trim();
    const last = (profile?.lastName ?? '').trim();
    const merged = `${first} ${last}`.trim();
    return merged || this.displayName(email);
  }
}
