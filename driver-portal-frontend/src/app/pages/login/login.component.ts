import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/auth/auth.actions';
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../../core/auth/auth.selectors';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  passwordVisible = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    this.store.select(selectIsAuthenticated)
      .pipe(filter(Boolean))
      .subscribe(() => this.router.navigate(['/dashboard']));
  }

  submit() {
    if (this.form.invalid) return;
    const payload = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };
    this.store.dispatch(AuthActions.login({ payload }));
  }

  togglePasswordVisibility() {
    this.passwordVisible.update(v => !v);
  }
}
