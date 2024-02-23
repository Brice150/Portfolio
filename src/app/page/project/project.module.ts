import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, RouterModule, MatTabsModule, SharedModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
