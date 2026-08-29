import { Routes } from '@angular/router';
import { projects } from './shared/data/projects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    title: 'Brice Lecomte | Développeur Full-Stack Angular & Java',
  },
  {
    path: 'competences',
    loadComponent: () => import('./skills/skills.component').then((m) => m.SkillsComponent),
    title: 'Compétences | Brice Lecomte',
  },
  {
    path: 'parcours',
    loadComponent: () => import('./journey/journey.component').then((m) => m.JourneyComponent),
    title: 'Parcours | Brice Lecomte',
  },
  {
    path: 'projets',
    loadComponent: () => import('./projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Projets | Brice Lecomte',
  },
  {
    path: 'projets/:slug',
    loadComponent: () =>
      import('./projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent,
      ),
  },
  {
    path: 'expertise',
    loadComponent: () =>
      import('./expertise/expertise.component').then((m) => m.ExpertiseComponent),
    title: 'Expertise | Brice Lecomte',
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact | Brice Lecomte',
  },
  // Anciennes URL : les liens déjà partagés continuent de fonctionner.
  { path: 'prestations', redirectTo: 'expertise', pathMatch: 'full' },
  { path: 'a-propos', redirectTo: 'parcours', pathMatch: 'full' },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page introuvable | Brice Lecomte',
  },
  { path: '**', redirectTo: 'not-found' },
];

/** Slugs connus, réutilisés pour le prerendering des fiches projet. */
export const projectSlugs = projects.map((project) => project.slug);
