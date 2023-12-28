import { createFeature, createReducer, on } from '@ngrx/store';

import { Book, GenericState } from '@got-shared/models';
import { booksActions } from './books.actions';

const initialState: GenericState<Book[]> = {
  data: null,
  isLoading: false,
  error: '',
};

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialState,
    on(booksActions.loadBooks, (state) => ({ ...state, isLoading: true, error: '', data: null })),
    on(booksActions.loadBooksSuccess, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
    })),
    on(booksActions.loadBooksFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
