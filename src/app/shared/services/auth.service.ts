import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable, of } from 'rxjs';

import { StorageKey } from '@app-shared/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  public dumpAccessToken$: Observable<string> = of('accc_seees_mee');
  public accessToken = toSignal(this.dumpAccessToken$, { initialValue: '' });

  public get isAuthenticated(): boolean {
    return !!localStorage.getItem(StorageKey.ACCESS_TOKEN);
  }

  public login(): void {
    localStorage.setItem(StorageKey.ACCESS_TOKEN, this.accessToken());
    this.router.navigate(['/']);
  }

  public logout(): void {
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    this.router.navigate(['/login']);
  }
}
