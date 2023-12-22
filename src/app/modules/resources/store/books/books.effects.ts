import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

import { BookApi } from '@got-shared/apis';
import { booksActions } from './books.actions';

@Injectable()
export class BooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly booksApi = inject(BookApi);

  public readonly loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.loadBooks),
      switchMap(() =>
        this.booksApi.getBooks().pipe(
          map((data) => booksActions.loadBooksSuccess({ data })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
