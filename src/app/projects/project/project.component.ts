import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Project } from '../../core/interface/project';
import { environment } from '../../../environments/environment';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  readonly project = input.required<Project>();
  readonly dialog = inject(MatDialog);
  imagePath: string = environment.imagePath;

  viewMore(): void {
    this.dialog.open(DialogComponent, {
      data: this.project(),
    });
  }
}
