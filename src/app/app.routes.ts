import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';
import { authGuard } from '@app-shared/guards';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
        title: 'Home | Game Of Thrones'
      },
      {
        path: 'books',
        loadComponent: async () => (await import('./pages/books/books.component')).BooksComponent,
        title: 'Books | Game Of Thrones'
      },
      {
        path: 'houses',
        loadComponent: async () =>
          (await import('./pages/houses/houses.component')).HousesComponent,
        title: 'Houses | Game Of Thrones'
      },
      {
        path: 'characters',
        loadComponent: async () =>
          (await import('./pages/characters/characters.component')).CharactersComponent,
        title: 'Characters | Game Of Thrones'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: async () => (await import('./pages/login/login.component')).LoginComponent,
    title: 'Login | Game Of Thrones'
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: async () =>
      (await import('./pages/not-found/not-found.component')).NotFoundComponent
  }
];
