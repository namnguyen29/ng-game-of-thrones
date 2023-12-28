import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

import { HouseApi } from '@got-shared/apis';
import { housesActions } from './houses.actions';

@Injectable()
export class HousesEffects {
  private readonly actions$ = inject(Actions);
  private readonly housesApi = inject(HouseApi);

  public readonly loadHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(housesActions.loadHouses),
      switchMap(() =>
        this.housesApi.getHouses().pipe(
          map((data) => housesActions.loadHousesSuccess({ data })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
