import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule } from '@angular/router';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, RouterModule, NgxUsefulSwiperModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
