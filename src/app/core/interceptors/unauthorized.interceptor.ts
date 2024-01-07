import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';

import { Observable, catchError, of } from 'rxjs';

export const unauthorizedInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpResponse<unknown>) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log('@@ unauthorized, open modal');
      }
      return of(error);
    }),
  );
};
