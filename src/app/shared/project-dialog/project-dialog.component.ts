import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/core/interface/project';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent implements OnInit {
  imagePath: string = environment.imagePath;
  videoPath: string = environment.videoPath;
  project!: Project;

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}

  ngOnInit(): void {
    this.project = this.data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
