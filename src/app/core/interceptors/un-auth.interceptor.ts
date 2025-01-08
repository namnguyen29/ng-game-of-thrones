import { HttpInterceptorFn, HttpResponse, HttpStatusCode } from '@angular/common/http';

import { catchError, of } from 'rxjs';

export const unAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpResponse<unknown>) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        console.error('Open dialog or do something::');
      }
      return of(error);
    })
  );
};
