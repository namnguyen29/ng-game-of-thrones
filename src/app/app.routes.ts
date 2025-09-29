import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';
import { authGuard, unAuthGuard } from '@app-shared/guards';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
        title: 'Home | Game Of Thrones'
      },
      {
        path: 'books',
        loadComponent: async () => (await import('./pages/books/books.component')).BooksComponent,
        title: 'Books | Game Of Thrones',
        canActivate: [authGuard]
      },
      {
        path: 'books/:bookId',
        loadComponent: async () => (await import('./pages/book-detail/book-detail.component')).BookDetailComponent,
        canActivate: [authGuard],
        title: 'Book Detail | Game Of Thrones'
      },
      {
        path: 'houses',
        loadComponent: async () => (await import('./pages/houses/houses.component')).HousesComponent,
        canActivate: [authGuard],
        title: 'Houses | Game Of Thrones'
      },
      {
        path: 'houses/:houseId',
        loadComponent: async () => (await import('./pages/house-detail/house-detail.component')).HouseDetailComponent,
        canActivate: [authGuard],
        title: 'House Detail | Game Of Thrones'
      },
      {
        path: 'characters',
        loadComponent: async () => (await import('./pages/characters/characters.component')).CharactersComponent,
        canActivate: [authGuard],
        title: 'Characters | Game Of Thrones'
      },
      {
        path: 'characters/:characterId',
        loadComponent: async () =>
          (await import('./pages/character-detail/character-detail.component')).CharacterDetailComponent,
        canActivate: [authGuard],
        title: 'Character Detail | Game Of Thrones'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: async () => (await import('./pages/login/login.component')).LoginComponent,
    title: 'Login | Game Of Thrones',
    canActivate: [unAuthGuard]
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: async () => (await import('./pages/not-found/not-found.component')).NotFoundComponent
  }
];
