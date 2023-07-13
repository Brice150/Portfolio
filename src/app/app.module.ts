import { NgModule } from '@angular/core';
import { appRouter } from './app.router';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { PageModule } from './page/page.module';
import { PickmeModule } from './pickme/pickme.module';
import { PlartModule } from './plart/plart.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { GametimeModule } from './gametime/gametime.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    appRouter, 
    CardModule, 
    PageModule, 
    PickmeModule, 
    PlartModule,
    GametimeModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
