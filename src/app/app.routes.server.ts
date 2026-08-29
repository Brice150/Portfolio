import { RenderMode, ServerRoute } from '@angular/ssr';
import { projectSlugs } from './app.routes';

/**
 * Toutes les routes sont générées en HTML au moment du build : Firebase
 * Hosting ne sert que des fichiers statiques, sans serveur Node.
 */
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
