import { createSelector } from '@ngrx/store';

import { charactersFeature } from './characters.feature';

export const selectCharactersVm = createSelector(
  charactersFeature.selectCharactersState,
  (charactersVm) => charactersVm,
);
