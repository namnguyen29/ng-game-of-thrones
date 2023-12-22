import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Book } from '@got-shared/models';

export const booksActions = createActionGroup({
  source: 'Books API',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ data: Book[] }>(),
    'Load Books Failure': props<{ error: string }>(),
  },
});
