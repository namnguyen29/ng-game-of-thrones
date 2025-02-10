import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ENV_CONFIG } from '@app-core/configs';
import { House } from '@app-shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  public getHouses(): Observable<House[]> {
    return this.http.get<House[]>(`${this.env.baseUrl}/houses`);
  }

  public getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.env.baseUrl}/houses/${id}`);
  }
}
