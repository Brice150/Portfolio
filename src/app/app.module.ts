import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRouter } from './app.router';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { PageModule } from './page/page.module';
import { PickmeModule } from './pickme/pickme.module';
import { PlartModule } from './plart/plart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    appRouter, 
    CardModule, 
    PageModule, 
    PickmeModule, 
    PlartModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
