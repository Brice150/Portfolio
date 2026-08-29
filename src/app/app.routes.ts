import { Routes } from '@angular/router';
import { projects } from './core/data/projects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Brice Lecomte | Développeur Full-Stack Angular & Java',
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'À propos | Brice Lecomte',
  },
  {
    path: 'competences',
    loadComponent: () => import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    title: 'Compétences | Brice Lecomte',
  },
  {
    path: 'parcours',
    loadComponent: () =>
      import('./features/journey/journey.component').then((m) => m.JourneyComponent),
    title: 'Parcours | Brice Lecomte',
  },
  {
    path: 'projets',
    loadComponent: () =>
      import('./features/projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Projets | Brice Lecomte',
  },
  {
    path: 'projets/:slug',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent,
      ),
  },
  {
    path: 'expertise',
    loadComponent: () =>
      import('./features/expertise/expertise.component').then((m) => m.ExpertiseComponent),
    title: 'Expertise | Brice Lecomte',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact | Brice Lecomte',
  },
  { path: 'prestations', redirectTo: 'expertise', pathMatch: 'full' },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page introuvable | Brice Lecomte',
  },
  { path: '**', redirectTo: 'not-found' },
];

/** Slugs connus, réutilisés pour le prerendering des fiches projet. */
export const projectSlugs = projects.map((project) => project.slug);
