import { InjectionToken, ValueProvider } from '@angular/core';

import { Environment } from '@app-shared/models';

export const ENV_CONFIG = new InjectionToken<Environment>('app.config');

export const provideEnvironment = (value: Environment): ValueProvider => ({
  useValue: value,
  provide: ENV_CONFIG
});
