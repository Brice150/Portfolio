import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ProjectDialogComponent, ConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [ProjectDialogComponent, ConfirmationDialogComponent],
})
export class SharedModule {}
