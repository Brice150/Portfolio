import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { Project } from '../../core/interface/project';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

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
      autoFocus: false,
    });
  }
}
