import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ProjectComponent],
  imports: [CommonModule, RouterModule, MatTabsModule],
  exports: [ProjectComponent],
})
export class ProjectModule {}
