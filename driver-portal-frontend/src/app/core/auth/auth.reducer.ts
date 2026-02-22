import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { decodeJwt } from '../util/jwt';

export type AuthState = {
  accessToken: string | null;
  email: string | null;
  roles: string[];
  loading: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  accessToken: null,
  email: null,
  roles: [],
  loading: false,
  error: null,
};

function enrichWithToken(state: AuthState, accessToken: string | null): AuthState {
  const payload = decodeJwt(accessToken);
  return {
    ...state,
    accessToken,
    email: payload?.sub ?? null,
    roles: payload?.roles ?? [],
  };
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.register, AuthActions.refresh, AuthActions.logoutAll, AuthActions.logoutDevice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, AuthActions.refreshSuccess, (state, { accessToken }) => ({
    ...enrichWithToken(state, accessToken),
    loading: false,
    error: null,
  })),
  on(AuthActions.logoutSuccess, AuthActions.clearAuth, (state) => ({
    ...initialAuthState,
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, AuthActions.refreshFailure, AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.setAccessToken, (state, { accessToken }) => ({
    ...enrichWithToken(state, accessToken),
  }))
);
