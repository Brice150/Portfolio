import { Component } from '@angular/core';
import { Project } from 'src/app/core/interface/project';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  imagePath: string = environment.imagePath;

  projects: Project[] = [
    {
      name: 'DASHBOARD',
      description:
        'A personnal dashboard web application to see weather, tasks or finance',
      logo: 'logos/dashboard.png',
      image: 'projects/dashboard/DASHBOARD.png',
      link: '/dashboard',
    },
    {
      name: 'GAME TIME',
      description:
        'A gaming application to show off your skills with words and numbers',
      logo: 'logos/gametime.png',
      image: 'projects/gametime/GAMETIME.png',
      link: '/gametime',
    },
    {
      name: 'PICK ME',
      description:
        'A dating web application to like, chat and match with other users',
      logo: 'logos/pickme.png',
      image: 'projects/pickme/PICKME.png',
      link: '/pickme',
    },
    {
      name: 'PLART',
      description:
        'A 3D printing web application to share files with other users and chat',
      logo: 'logos/plart.png',
      image: 'projects/plart/PLART.png',
      link: '/plart',
    },
  ];
}
