import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '@app-shared/services';

export const unAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const location = inject(Location);

  if (authService.isAuthenticated) {
    location.back();
    return false;
  }

  return true;
};
