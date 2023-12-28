import { createFeature, createReducer, on } from '@ngrx/store';

import { GenericState, House } from '@got-shared/models';
import { housesActions } from './houses.actions';

const initialState: GenericState<House[]> = {
  data: null,
  isLoading: false,
  error: '',
};

export const housesFeature = createFeature({
  name: 'houses',
  reducer: createReducer(
    initialState,
    on(housesActions.loadHouses, (state) => ({ ...state, isLoading: true, error: '', data: null })),
    on(housesActions.loadHousesSuccess, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
    })),
    on(housesActions.loadHousesFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
