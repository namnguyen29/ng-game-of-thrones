import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@got-modules/home/pages')).HomeComponent,
  },
  {
    path: 'resources',
    loadChildren: async () =>
      (await import('@got-modules/resources/resources.routes')).resourceRoutes,
  },
  {
    path: 'login',
    loadComponent: async () => (await import('@got-modules/auth/pages')).LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
