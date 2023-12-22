import { createSelector } from '@ngrx/store';

import { housesFeature } from './houses.feature';

export const selectHousesVm = createSelector(
  housesFeature.selectHousesState,
  (housesVm) => housesVm,
);
