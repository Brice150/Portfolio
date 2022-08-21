import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component/app.component';
import { AppComponentCard } from './card.component/card.component';
import { AppComponentAbout } from './page.component/about.component/about.component';
import { AppComponentHistory } from './page.component/about.component/history.component/history.component';
import { AppComponentSkills } from './page.component/about.component/skills.component/skills.component';
import { AppComponentContact } from './page.component/contact.component/contact.component';
import { AppComponentHeader } from './page.component/header.component/header.component';
import { AppComponentHome } from './page.component/home.component/home.component';
import { AppComponentPage } from './page.component/page.component';
import { AppComponentDialog } from './page.component/project.component/dialog.component/dialog.component';
import { AppComponentItems } from './page.component/project.component/items.component/items.component';
import { AppComponentProject } from './page.component/project.component/project.component';

const routes: Routes = [
  {path: 'page', component: AppComponentPage},
  {path: 'card', component: AppComponentCard},
  {path: '', redirectTo: '/card', pathMatch: 'full'},
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AppComponent,
  AppComponentCard, 
  AppComponentPage,
  AppComponentHeader,
  AppComponentHome,
  AppComponentAbout,
  AppComponentContact,
  AppComponentProject,
  AppComponentSkills,
  AppComponentHistory,
  AppComponentItems,
  AppComponentDialog]
