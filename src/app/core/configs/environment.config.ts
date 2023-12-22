import { InjectionToken, ValueProvider } from '@angular/core';

import { Environment } from '@got-shared/models';

export const ENV_CONFIG = new InjectionToken<Environment>('app.config');

export const getEnvironmentProvider = (value: Environment): ValueProvider => ({
  useValue: value,
  provide: ENV_CONFIG,
});
