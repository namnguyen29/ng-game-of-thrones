import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

import { Observable, of } from 'rxjs';

import { StorageKey } from '@app-shared/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  public dumpAccessToken$: Observable<string> = of('accc_seees_mee');
  public accessToken = toSignal(this.dumpAccessToken$, { initialValue: '' });

  public get isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(StorageKey.ACCESS_TOKEN);
    }
    return false;
  }

  public login(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(StorageKey.ACCESS_TOKEN, this.accessToken());
    }
    this.router.navigate(['/']);
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    }
    this.router.navigate(['/login']);
  }
}
