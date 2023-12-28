import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

import { CharacterApi } from '@got-shared/apis';
import { charactersActions } from './characters.actions';

@Injectable()
export class CharactersEffects {
  private readonly actions$ = inject(Actions);
  private readonly characterApi = inject(CharacterApi);

  public readonly loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersActions.loadCharacters),
      switchMap(() =>
        this.characterApi.getCharacters().pipe(
          map((data) => charactersActions.loadCharactersSuccess({ data })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
