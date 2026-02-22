import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../auth/auth.selectors';
import { switchMap, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return store.select(selectAccessToken).pipe(
    take(1),
    switchMap((token) => {
      let authReq = req.clone({ withCredentials: true });
      if (token) {
        authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
      return next(authReq);
    })
  );
};
