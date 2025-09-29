import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { switchMap, take } from 'rxjs';

import { AuthService } from '@app-shared/services';
import { toObservable } from '@angular/core/rxjs-interop';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken$ = toObservable(inject(AuthService).accessToken);

  return accessToken$.pipe(
    take(1),
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const modifiedRequest = req.clone({
        headers
      });

      return next(modifiedRequest);
    })
  );
};
