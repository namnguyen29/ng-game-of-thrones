import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Character } from '@got-shared/models';

export const charactersActions = createActionGroup({
  source: 'Characters API',
  events: {
    'Load Characters': emptyProps(),
    'Load Characters Success': props<{ data: Character[] }>(),
    'Load Characters Failure': props<{ error: string }>(),
  },
});
