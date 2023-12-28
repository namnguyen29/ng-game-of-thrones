import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { House } from '@got-shared/models';

export const housesActions = createActionGroup({
  source: 'Houses API',
  events: {
    'Load Houses': emptyProps(),
    'Load Houses Success': props<{ data: House[] }>(),
    'Load Houses Failure': props<{ error: string }>(),
  },
});
