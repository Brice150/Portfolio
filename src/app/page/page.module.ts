import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { ContactModule } from './contact/contact.module';
import { ProjectModule } from './project/project.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { SkillsModule } from './skills/skills.module';
import { HistoryModule } from './history/history.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    HomeModule,
    ContactModule,
    SkillsModule,
    HistoryModule,
    ProjectModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule,
  ],
  exports: [PageComponent],
})
export class PageModule {}
