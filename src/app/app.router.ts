import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { PageComponent } from './page/page.component';
import { PickmeComponent } from './pickme/pickme.component';
import { PlartComponent } from './plart/plart.component';

const routes: Routes = [
  {path: 'page', component: PageComponent},
  {path: 'card', component: CardComponent},
  {path: 'plart', component: PlartComponent},
  {path: 'pickme', component: PickmeComponent},
  {path: '', redirectTo: '/card', pathMatch: 'full'},
];

export const appRouter = RouterModule.forRoot(routes)