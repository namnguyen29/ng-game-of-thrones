import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { Character, CharacterFilter } from '@app-shared/models';

@Injectable({
  providedIn: 'root'
})
export class CharacterApi {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV_CONFIG);

  public getCharacters(filter?: CharacterFilter): Observable<Character[]> {
    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach((key) => {
        const filterValue = filter[key as keyof CharacterFilter];

        if (filterValue) {
          params = params.set(key, `${filterValue}`);
        } else {
          params = params.delete(key, `${filterValue}`);
        }
      });
    }

    return this.http.get<Character[]>(`${this.env.baseUrl}/characters`, {
      params
    });
  }
}
