import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { TuiRootModule } from '@taiga-ui/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { getEnvironmentProvider } from '@got-core/configs';
import { environment } from '@got-environments/environment.development';
import { loggerInterceptor } from '@got-core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([loggerInterceptor])),
    provideRouter(appRoutes),
    getEnvironmentProvider(environment),
    provideEffects(),
    provideStore(),
    importProvidersFrom(TuiRootModule),
  ],
};
