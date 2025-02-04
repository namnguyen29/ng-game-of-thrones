import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { Book } from '@app-shared/models';

@Injectable({
  providedIn: 'root'
})
export class BookApi {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.env.baseUrl}/books`);
  }
}
