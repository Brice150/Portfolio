import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./skills/skills.component').then((m) => m.SkillsComponent),
    data: { animation: 'SkillsPage' },
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.component').then((m) => m.HistoryComponent),
    data: { animation: 'HistoryPage' },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/projects.component').then((m) => m.ProjectsComponent),
    data: { animation: 'ProjectsPage' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
    data: { animation: 'ContactPage' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
