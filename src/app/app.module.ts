import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { appRouter } from './app.routes';
import { HomeModule } from './page/home/home.module';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    appRouter,
    HomeModule,
    PageModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
