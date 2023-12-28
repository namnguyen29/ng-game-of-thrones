import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@got-core/configs';
import { Character } from '@got-shared/models';

@Injectable({
  providedIn: 'root',
})
export class CharacterApi {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV_CONFIG);

  public getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.env.baseUrl}/characters`);
  }

  public getCharacter(characterId: string): Observable<Character> {
    return this.http.get<Character>(`${this.env.baseUrl}/characters/${characterId}`);
  }
}
