import { RenderMode, ServerRoute } from '@angular/ssr';
import { projectSlugs } from './app.routes';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projets/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => projectSlugs.map((slug) => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
