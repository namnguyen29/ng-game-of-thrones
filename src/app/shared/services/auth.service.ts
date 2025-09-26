import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { StorageKey } from '@app-shared/enums';
import { CookieService } from '@app-shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly cookie = inject(CookieService);
  public accessToken = signal('my_access_token');

  public get isAuthenticated(): boolean {
    return !!this.cookie.get(StorageKey.ACCESS_TOKEN);
  }

  public login(): void {
    this.cookie.set(StorageKey.ACCESS_TOKEN, this.accessToken());
    this.cookie.set('StorageKey.ACCESS_TOKEN test', '1234');
    this.router.navigate(['/']);
  }

  public logout(): void {
    this.cookie.delete(StorageKey.ACCESS_TOKEN);
    this.router.navigate(['/login']);
  }
}
