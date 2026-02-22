import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthApiService } from '../api/auth-api.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(AuthApiService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ payload }) =>
        this.api.login(payload).pipe(
          map((res) => AuthActions.loginSuccess({ accessToken: res.accessToken })),
          catchError((err) => of(AuthActions.loginFailure({ error: err?.error?.message ?? 'Login failed' })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ payload }) =>
        this.api.register(payload).pipe(
          map((res) => AuthActions.registerSuccess({ accessToken: res.accessToken })),
          catchError((err) => of(AuthActions.registerFailure({ error: err?.error?.message ?? 'Registration failed' })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        this.api.refresh().pipe(
          map((res) => AuthActions.refreshSuccess({ accessToken: res.accessToken })),
          catchError((err) => of(AuthActions.refreshFailure({ error: err?.error?.message ?? 'Refresh failed' })))
        )
      )
    )
  );

  logoutDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutDevice),
      mergeMap(() =>
        this.api.logoutDevice().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((err) => of(AuthActions.logoutFailure({ error: err?.error?.message ?? 'Logout failed' })))
        )
      )
    )
  );

  logoutAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutAll),
      mergeMap(() =>
        this.api.logoutAll().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((err) => of(AuthActions.logoutFailure({ error: err?.error?.message ?? 'Logout failed' })))
        )
      )
    )
  );

  persistToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess, AuthActions.refreshSuccess),
        tap(({ accessToken }) => {
          localStorage.setItem('accessToken', accessToken);
        })
      ),
    { dispatch: false }
  );

  clearToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess, AuthActions.clearAuth),
        tap(() => {
          localStorage.removeItem('accessToken');
        })
      ),
    { dispatch: false }
  );
}
