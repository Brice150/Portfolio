import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/core/interface/project';
import { ProjectDialogComponent } from 'src/app/shared/project-dialog/project-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  imagePath: string = environment.imagePath;

  constructor(public dialog: MatDialog) {}

  fullStackProjects: Project[] = [
    {
      name: 'PICK ME',
      logo: 'logos/pickme.png',
      image: 'projects/PICKME.png',
      video: 'projects/PICKME.mp4',
      description: 'A dating web application',
      repoLink: 'https://github.com/Brice150/PICKME',
    },
    {
      name: 'PLART',
      logo: 'logos/plart.png',
      image: 'projects/PLART.png',
      video: 'projects/PLART.mp4',
      description: 'A 3D printing web application',
      repoLink: 'https://github.com/Brice150/PLART',
    },
  ];

  frontendProjects: Project[] = [
    {
      name: 'TESLA',
      logo: 'logos/tesla.png',
      image: 'projects/TESLA.png',
      video: 'projects/TESLA.mp4',
      description: 'A car configurator',
      repoLink: 'https://github.com/Brice150/Tesla',
      siteLink: 'https://main--astonishing-torrone-2afc2a.netlify.app/',
    },
    {
      name: 'SIMULATOR',
      logo: 'logos/simulator.png',
      image: 'projects/SIMULATOR.png',
      video: 'projects/SIMULATOR.mp4',
      description: 'A house renovation subsidies calculator',
      repoLink: 'https://github.com/Brice150/Simulator',
      siteLink: 'https://brice150.github.io/Simulator/',
    },
    {
      name: 'DASHBOARD',
      logo: 'logos/dashboard.png',
      image: 'projects/DASHBOARD.png',
      video: 'projects/DASHBOARD.mp4',
      description: 'A personal everyday dashboard',
      repoLink: 'https://github.com/Brice150/DASHBOARD',
      siteLink: 'https://brice150.github.io/DASHBOARD/',
    },
    {
      name: 'GAME TIME',
      logo: 'logos/gametime.png',
      image: 'projects/GAMETIME.png',
      video: 'projects/GAMETIME.mp4',
      description: 'A gaming web application',
      repoLink: 'https://github.com/Brice150/GAMETIME',
      siteLink: 'https://brice150.github.io/GAMETIME/',
    },
  ];

  openDialog(project: Project): void {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
    });
  }
}
