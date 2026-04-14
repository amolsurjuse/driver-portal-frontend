import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(selectAuthState, (s) => s.accessToken);
export const selectIsAuthenticated = createSelector(selectAuthState, (s) => !!s.accessToken);
export const selectUserId = createSelector(selectAuthState, (s) => s.userId);
export const selectUserEmail = createSelector(selectAuthState, (s) => s.email);
export const selectRoles = createSelector(selectAuthState, (s) => s.roles);
export const selectAuthLoading = createSelector(selectAuthState, (s) => s.loading);
export const selectAuthError = createSelector(selectAuthState, (s) => s.error);
