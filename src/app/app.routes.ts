import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';

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
        path: '404',
        loadComponent: async () =>
          (await import('./pages/not-found/not-found.component')).NotFoundComponent,
        title: 'Page Not Found'
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
