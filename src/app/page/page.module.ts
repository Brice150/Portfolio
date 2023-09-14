import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { ContactModule } from './contact/contact.module';
import { AboutModule } from './about/about.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { ProjectModule } from './project/project.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    ContactModule,
    AboutModule,
    HeaderModule,
    HomeModule,
    ProjectModule,
    BrowserAnimationsModule,
  ],
  exports: [PageComponent],
})
export class PageModule {}
