import { ClassProvider, InjectionToken, Sanitizer } from '@angular/core';

import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

export const DOM_SANITIZER = new InjectionToken<Sanitizer>('app.dom.sanitizer');

export const domSanitizerProvider: ClassProvider = {
  provide: DOM_SANITIZER,
  useClass: NgDompurifySanitizer,
};
