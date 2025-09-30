import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, TransferState } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { House, HouseFilter } from '@app-shared/models';
import { transferState } from '@app-shared/constants';
import { TransferKeys } from '@app-shared/enums';

@Injectable({
  providedIn: 'root'
})
export class HouseApi {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly state = inject(TransferState);

  public getHouses(filter?: HouseFilter): Observable<House[]> {
    const cachedHouses = this.state.get(transferState[TransferKeys.Houses], null);
    if (cachedHouses) {
      this.state.remove(transferState[TransferKeys.Houses]);
      return of(cachedHouses);
    }

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

    return this.http
      .get<House[]>(`${this.env.baseUrl}/houses`, {
        params
      })
      .pipe(
        tap((houses) => {
          this.state.set(transferState[TransferKeys.Houses], houses);
        })
      );
  }

  public getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.env.baseUrl}/houses/${id}`);
  }
}
