import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public fakeToken = of('fakeToken-auth01');
}
