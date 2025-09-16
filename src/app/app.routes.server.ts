import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'books/:bookId',
    renderMode: RenderMode.Server
  },
  {
    path: 'houses/:houseId',
    renderMode: RenderMode.Server
  },
  {
    path: 'characters/:characterId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
