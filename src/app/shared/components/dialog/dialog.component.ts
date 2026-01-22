import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Project } from '../../../core/interface/project';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  imagePath: string = environment.imagePath;
  videoPath: string = environment.videoPath;
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly project = inject<Project>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
