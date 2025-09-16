import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { Book, BookFilter } from '@app-shared/models';

@Injectable({
  providedIn: 'root'
})
export class BookApi {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  public getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.env.baseUrl}/books/${bookId}`);
  }

  public getBooks(filter?: BookFilter): Observable<Book[]> {
    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach((key) => {
        const filterValue = filter[key as keyof BookFilter];

        if (filterValue) {
          params = params.set(key, `${filterValue}`);
        } else {
          params = params.delete(key, `${filterValue}`);
        }
      });
    }

    return this.http.get<Book[]>(`${this.env.baseUrl}/books`, {
      params
    });
  }
}
