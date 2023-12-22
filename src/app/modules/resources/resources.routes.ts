import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { BookListComponent, CharacterListComponent, HouseListComponent } from './pages';
import {
  BooksEffects,
  CharactersEffects,
  HousesEffects,
  booksFeature,
  charactersFeature,
  housesFeature,
} from './store';

export const resourceRoutes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
    providers: [provideState(booksFeature), provideEffects(BooksEffects)],
  },
  {
    path: 'characters',
    component: CharacterListComponent,
    providers: [provideState(charactersFeature), provideEffects(CharactersEffects)],
  },
  {
    path: 'houses',
    component: HouseListComponent,
    providers: [provideState(housesFeature), provideEffects(HousesEffects)],
  },
];
