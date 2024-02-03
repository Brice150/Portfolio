import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { appRouter } from './app.routes';
import { HomeModule } from './page/home/home.module';
import { PageModule } from './page/page.module';
import { DashboardModule } from './projects/dashboard/dashboard.module';
import { GametimeModule } from './projects/gametime/gametime.module';
import { PickmeModule } from './projects/pickme/pickme.module';
import { PlartModule } from './projects/plart/plart.module';
import { SimulatorModule } from './projects/simulator/simulator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    appRouter,
    HomeModule,
    PageModule,
    PickmeModule,
    PlartModule,
    GametimeModule,
    DashboardModule,
    SimulatorModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
