import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/interface/project';
import { environment } from 'src/environments/environment';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  imagePath: string = environment.imagePath;

  projects: Project[] = [
    {
      name: 'PLART',
      title: '3D Printing',
      logo: 'logos/plart.png',
      image: 'projects/plart/PLART.png',
      link: '/plart',
    },
    {
      name: 'PICK ME',
      title: 'Dating',
      logo: 'logos/pickme.png',
      image: 'projects/pickme/PICKME.png',
      link: '/pickme',
    },
    {
      name: 'GAME TIME',
      title: 'Gaming',
      logo: 'logos/gametime.png',
      image: 'projects/gametime/GAMETIME.png',
      link: '/gametime',
    },
    {
      name: 'DASHBOARD',
      title: 'Forecasting',
      logo: 'logos/dashboard.png',
      image: 'projects/dashboard/DASHBOARD.png',
      link: '/dashboard',
    },
  ];

  ngOnInit() {
    VanillaTilt.init(document.getElementById('project') as any);
  }
}
