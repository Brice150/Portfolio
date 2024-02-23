import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ProjectDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [ProjectDialogComponent],
})
export class SharedModule {}
