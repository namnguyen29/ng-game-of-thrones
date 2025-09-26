import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(REQUEST);

  public set(name: string, value: string, days: number = 7): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  public get(name: string): string | null {
    let cookies: string[] = [];
    if (isPlatformServer(this.platformId)) {
      cookies = this.request?.headers.get('Cookie')?.split('; ') || [];
    } else {
      cookies = document.cookie.split('; ');
    }

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (decodeURIComponent(cookieName) === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  public delete(name: string): void {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
