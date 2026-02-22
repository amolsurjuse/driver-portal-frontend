import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/auth/auth.actions';
import { AuthApiService } from '../../core/api/auth-api.service';
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../../core/auth/auth.selectors';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { combineLatest, map, shareReplay, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private api = inject(AuthApiService);

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  private countryDialCodeByCode = new Map<string, string>();
  countries$ = this.api.listCountries().pipe(
    tap((countries) => {
      this.countryDialCodeByCode.clear();
      countries.forEach((country) => this.countryDialCodeByCode.set(country.code.toUpperCase(), country.dialCode));
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryIsoCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[\d\s-]{6,20}$/)]],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
  });
  phoneDialCode$ = combineLatest([
    this.form.controls.countryIsoCode.valueChanges.pipe(startWith(this.form.controls.countryIsoCode.value)),
    this.countries$,
  ]).pipe(map(([countryCode]) => this.resolveDialCode((countryCode ?? '').toUpperCase())));

  constructor() {
    this.store.select(selectIsAuthenticated)
      .pipe(filter(Boolean))
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

  submit() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const countryIsoCode = (v.countryIsoCode ?? '').toUpperCase();
    const localPhoneNumber = (v.phoneNumber ?? '').replace(/\D/g, '');
    const dialCode = this.resolveDialCode(countryIsoCode);
    const payload = {
      email: v.email ?? '',
      password: v.password ?? '',
      firstName: v.firstName ?? '',
      lastName: v.lastName ?? '',
      phoneNumber: `${dialCode === '+' ? '+' : dialCode}${localPhoneNumber}`,
      address: {
        street: v.street ?? '',
        city: v.city ?? '',
        state: v.state ?? '',
        postalCode: v.postalCode ?? '',
        countryIsoCode,
      },
    };
    this.store.dispatch(AuthActions.register({ payload }));
  }

  private resolveDialCode(countryIsoCode: string): string {
    return this.countryDialCodeByCode.get(countryIsoCode) ?? '+';
  }
}
