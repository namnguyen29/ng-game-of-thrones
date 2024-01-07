import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, switchMap, take } from 'rxjs';

import { AuthService } from '@got-shared/services';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  return authService.fakeToken.pipe(
    take(1),
    switchMap((token) => {
      if (!token) {
        return next(req);
      }
      const headers = req.headers.set('Authorization', `Bearer ${token}`);
      const authRequest = req.clone({
        headers,
      });
      return next(authRequest);
    }),
  );
};
