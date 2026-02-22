import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authReducer } from './core/auth/auth.reducer';
import { AuthEffects } from './core/auth/auth.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { API_BASE_URL, PAYMENT_API_BASE_URL } from './core/tokens';
import { environment } from '../environments/environment';

function resolveApiBaseUrl(): string {
  return environment.apiBaseUrl;
}

function resolvePaymentApiBaseUrl(): string {
  return environment.paymentApiBaseUrl;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    { provide: API_BASE_URL, useFactory: resolveApiBaseUrl },
    { provide: PAYMENT_API_BASE_URL, useFactory: resolvePaymentApiBaseUrl },
  ],
};
