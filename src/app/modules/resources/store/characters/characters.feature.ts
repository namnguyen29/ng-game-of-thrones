import { createFeature, createReducer, on } from '@ngrx/store';

import { Character, GenericState } from '@got-shared/models';
import { charactersActions } from './characters.actions';

const initialState: GenericState<Character[]> = {
  data: null,
  isLoading: false,
  error: '',
};

export const charactersFeature = createFeature({
  name: 'characters',
  reducer: createReducer(
    initialState,
    on(charactersActions.loadCharacters, (state) => ({
      ...state,
      isLoading: true,
      error: '',
      data: null,
    })),
    on(charactersActions.loadCharactersSuccess, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
    })),
    on(charactersActions.loadCharactersFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
