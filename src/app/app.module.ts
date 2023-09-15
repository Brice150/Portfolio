import { NgModule } from '@angular/core';
import { appRouter } from './app.router';
import { AppComponent } from './app.component';
import { PageModule } from './page/page.module';
import { PlartModule } from './projects/plart/plart.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './projects/dashboard/dashboard.module';
import { ErrorPathComponent } from './error-path/error-path.component';
import { HomeModule } from './page/home/home.module';
import { PickmeModule } from './projects/pickme/pickme.module';
import { GametimeModule } from './projects/gametime/gametime.module';

@NgModule({
  declarations: [AppComponent, ErrorPathComponent],
  imports: [
    BrowserModule,
    appRouter,
    HomeModule,
    PageModule,
    PickmeModule,
    PlartModule,
    GametimeModule,
    DashboardModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
