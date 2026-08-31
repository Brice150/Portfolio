import { Routes } from '@angular/router';
import { projects } from './shared/data/projects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'competences',
    loadComponent: () => import('./skills/skills.component').then((m) => m.SkillsComponent),
  },
  {
    path: 'parcours',
    loadComponent: () => import('./journey/journey.component').then((m) => m.JourneyComponent),
  },
  {
    path: 'projets',
    loadComponent: () => import('./projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projets/:slug',
    loadComponent: () =>
      import('./projects/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];

export const projectSlugs = projects.map((project) => project.slug);
