import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@got-core/configs';
import { House } from '@got-shared/models';

@Injectable({
  providedIn: 'root',
})
export class HouseApi {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV_CONFIG);

  public getHouses(): Observable<House[]> {
    return this.http.get<House[]>(`${this.env.baseUrl}/houses`);
  }

  public getHouse(houseId: string): Observable<House> {
    return this.http.get<House>(`${this.env.baseUrl}/houses/${houseId}`);
  }
}
