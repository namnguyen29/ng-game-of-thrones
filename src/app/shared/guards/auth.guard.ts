import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '@app-shared/services';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
