import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@got-core/configs';
import { Book } from '@got-shared/models';

@Injectable({
  providedIn: 'root',
})
export class BookApi {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV_CONFIG);

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.env.baseUrl}/books`);
  }

  public getBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.env.baseUrl}/books/${bookId}`);
  }
}
