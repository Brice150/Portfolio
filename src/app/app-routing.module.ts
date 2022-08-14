import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component/app.component';
import { AppComponentCard } from './card.component/card.component';
import { AppComponentHome } from './home.component/home.component';

const routes: Routes = [
  {path: 'home', component: AppComponentHome},
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
  AppComponentHome]
