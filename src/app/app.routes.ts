import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { HistoryComponent } from './history/history.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { animation: 'SkillsPage' },
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: { animation: 'HistoryPage' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { animation: 'ProjectsPage' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { animation: 'ContactPage' },
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
