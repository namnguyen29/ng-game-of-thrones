import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { House, HouseFilter } from '@app-shared/models';

@Injectable({
  providedIn: 'root'
})
export class HouseApi {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  public getHouses(filter?: HouseFilter): Observable<House[]> {
    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach((key) => {
        const filterValue = filter[key as keyof HouseFilter];

        if (filterValue) {
          params = params.set(key, `${filterValue}`);
        } else {
          params = params.delete(key, `${filterValue}`);
        }
      });
    }

    return this.http.get<House[]>(`${this.env.baseUrl}/houses`, {
      params
    });
  }

  public getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.env.baseUrl}/houses/${id}`);
  }
}
