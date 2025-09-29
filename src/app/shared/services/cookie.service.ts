import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly request = inject(REQUEST);
  private readonly platformId = inject(PLATFORM_ID);

  public get(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    }

    const cookies = this.request?.headers.get('Cookie')?.split('; ');
    if (cookies && cookies.length > 0) {
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (name === cookieName) {
          return cookieValue;
        }
      }
    }
    return null;
  }

  public set(name: string, value: string, days: number = 7, path: string = '/'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path}`;
  }

  public delete(name: string, path: string = '/'): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
  }

  public deleteAll(): void {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      if (name) {
        this.delete(name);
      }
    }
  }
}
