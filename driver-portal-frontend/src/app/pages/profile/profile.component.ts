import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap, takeUntil, throwError } from 'rxjs';
import { Subject, combineLatest } from 'rxjs';
import { selectUserEmail, selectUserId } from '../../core/auth/auth.selectors';
import {
  UpdateUserProfileRequest,
  UserApiService,
  UserProfileResponse,
} from '../../core/api/user-api.service';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private userApi = inject(UserApiService);
  private toast = inject(ToastService);
  private destroy$ = new Subject<void>();

  private userId$ = this.store.select(selectUserId);
  email$ = this.store.select(selectUserEmail);

  loading = signal(true);
  saving = signal(false);
  editing = signal(false);
  errorMessage = signal<string | null>(null);
  saveMessage = signal<string | null>(null);
  profile = signal<UserProfileResponse | null>(null);
  email = signal<string | null>(null);
  submitted = signal(false);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    countryIsoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
  });

  ngOnInit() {
    combineLatest([this.userId$, this.email$])
      .pipe(
        switchMap(([userId, email]) => {
          this.loading.set(true);
          this.errorMessage.set(null);
          this.saveMessage.set(null);
          this.email.set(email);

          if (!userId && !email) {
            return of({
              profile: null as UserProfileResponse | null,
              email,
              error: 'Missing user identity in session token.',
            });
          }

          return this.loadProfile(userId, email).pipe(
            map((profile) => ({
              profile,
              email,
              error: null as string | null,
            })),
            catchError(() =>
              of({
                profile: null as UserProfileResponse | null,
                email,
                error: 'Unable to load profile details.',
              })
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ profile, email, error }) => {
        this.email.set(email);
        this.profile.set(profile);
        this.errorMessage.set(error);
        this.loading.set(false);

        if (profile) {
          this.applyProfileToForm(profile);
        } else {
          this.form.reset(
            {
              firstName: '',
              lastName: '',
              street: '',
              city: '',
              state: '',
              postalCode: '',
              countryIsoCode: '',
            },
            { emitEvent: false }
          );
          this.form.markAsPristine();
          this.form.markAsUntouched();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    this.submitted.set(true);
    this.saveMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const profile = this.profile();
    if (!profile) {
      this.errorMessage.set('Unable to save profile details.');
      return;
    }

    const raw = this.form.getRawValue();
    const payload: UpdateUserProfileRequest = {
      firstName: raw.firstName.trim(),
      lastName: raw.lastName.trim(),
      address: {
        street: raw.street.trim(),
        city: raw.city.trim(),
        state: raw.state.trim(),
        postalCode: raw.postalCode.trim(),
        countryIsoCode: raw.countryIsoCode.trim().toUpperCase(),
      },
    };

    this.saving.set(true);
    this.errorMessage.set(null);

    this.userApi
      .updateProfile(profile.userId, payload)
      .pipe(
        finalize(() => this.saving.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (updatedProfile) => {
          this.profile.set(updatedProfile);
          this.applyProfileToForm(updatedProfile);
          this.submitted.set(false);
          this.editing.set(false);
          this.toast.show('Profile updated successfully', 'success');
        },
        error: (error: unknown) => {
          this.toast.show(this.extractErrorMessage(error), 'error');
        },
      });
  }

  resetForm() {
    const profile = this.profile();
    if (!profile || this.saving()) {
      return;
    }

    this.editing.set(false);
    this.submitted.set(false);
    this.saveMessage.set(null);
    this.errorMessage.set(null);
    this.applyProfileToForm(profile);
  }

  startEditing() {
    if (!this.profile() || this.saving()) {
      return;
    }

    this.editing.set(true);
    this.submitted.set(false);
    this.saveMessage.set(null);
    this.errorMessage.set(null);
  }

  showControlError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  controlErrorMessage(controlName: keyof typeof this.form.controls): string {
    const control = this.form.controls[controlName];
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('minlength') || control.hasError('maxlength')) {
      return 'Enter a valid country code.';
    }
    return 'Invalid value.';
  }

  countryName(profile: UserProfileResponse | null): string {
    return profile?.countryName?.trim() || profile?.countryCode?.trim() || 'Not set';
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

  relativeTime(iso: string | null | undefined): string {
    if (!iso) return 'Not set';
    const date = new Date(iso);
    if (isNaN(date.getTime())) return 'Not set';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const days = Math.floor(diffMs / 86400000);
    if (days < 1) return 'Today';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  }

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

  private applyProfileToForm(profile: UserProfileResponse) {
    this.form.setValue(
      {
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        street: profile.street ?? '',
        city: profile.city ?? '',
        state: profile.state ?? '',
        postalCode: profile.postalCode ?? '',
        countryIsoCode: profile.countryCode ?? '',
      },
      { emitEvent: false }
    );
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const payload = error.error as
        | { message?: string; details?: string[] }
        | string
        | null
        | undefined;

      if (typeof payload === 'string' && payload.trim()) {
        return payload;
      }

      if (payload && typeof payload === 'object') {
        if (Array.isArray(payload.details) && payload.details.length > 0) {
          return payload.details[0] ?? 'Unable to save profile details.';
        }
        if (payload.message) {
          return payload.message;
        }
      }

      if (error.message) {
        return error.message;
      }
    }

    return 'Unable to save profile details.';
  }
}
