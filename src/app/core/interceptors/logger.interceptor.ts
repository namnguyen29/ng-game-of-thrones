import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

export const loggerInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const cloneRequest = req.clone();

  return next(cloneRequest);
};
