import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { DashboardComponent } from './projects/dashboard/dashboard.component';
import { GametimeComponent } from './projects/gametime/gametime.component';
import { PickmeComponent } from './projects/pickme/pickme.component';
import { PlartComponent } from './projects/plart/plart.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'plart', component: PlartComponent },
  { path: 'pickme', component: PickmeComponent },
  { path: 'gametime', component: GametimeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageComponent },
];

export const appRouter = RouterModule.forRoot(routes);
