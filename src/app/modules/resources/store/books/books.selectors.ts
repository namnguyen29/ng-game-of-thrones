import { createSelector } from '@ngrx/store';

import { booksFeature } from './books.feature';

export const selectBooksVm = createSelector(booksFeature.selectBooksState, (booksVm) => booksVm);
