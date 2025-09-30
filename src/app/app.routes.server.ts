import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'houses',
    renderMode: RenderMode.Server
  },
  {
    path: 'houses/:houseId',
    renderMode: RenderMode.Client
  },
  {
    path: 'books',
    renderMode: RenderMode.Client
  },
  {
    path: 'books/:bookId',
    renderMode: RenderMode.Client
  },
  {
    path: 'characters',
    renderMode: RenderMode.Client
  },
  {
    path: 'characters/:characterId',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
