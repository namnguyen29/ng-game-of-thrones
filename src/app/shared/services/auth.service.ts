import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { StorageKey } from '@app-shared/enums';
import { CookieService } from '@app-shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cookie = inject(CookieService);
  public accessToken = signal('v1_access_token');

  public get isAuthenticated(): boolean {
    return !!this.cookie.get(StorageKey.ACCESS_TOKEN);
  }

  public async login(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.cookie.set(StorageKey.ACCESS_TOKEN, this.accessToken());
    }
    await this.router.navigate(['/']);
  }

  public async logout(): Promise<void> {
    this.cookie.delete(StorageKey.ACCESS_TOKEN);
    await this.router.navigate(['/login']);
  }
}
