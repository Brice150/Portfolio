import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { projects } from '../../assets/data/projects';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule, ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent {
  projects = projects;
}
