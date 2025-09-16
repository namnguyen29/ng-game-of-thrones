import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '@app-environments/environment.development';
import { provideEnvironment, provideFormFieldAppearance } from '@app-core/configs';
import { authInterceptor, unAuthInterceptor } from '@app-core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFormFieldAppearance('fill'),
    provideEnvironment(environment),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, unAuthInterceptor])),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay())
  ]
};
