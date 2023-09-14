import { Component } from '@angular/core';
import { Project } from 'src/app/core/interface/project';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath;
  projects: Project[] = [
    {
      name: 'PLART',
      title: '3D Printing',
      logo: 'logos/plart.png',
      image: 'projects/plart/PLART.png',
      features: [
        'Safely login',
        'Upload/download objects',
        'Send a message to a user',
        'Admin page',
      ],
      link: '/plart',
    },
    {
      name: 'PICK ME',
      title: 'Dating',
      logo: 'logos/pickme.png',
      image: 'projects/pickme/PICKME.png',
      features: [
        'Safely login',
        'Select attractive users and match',
        'Send a message to a match',
        'Admin page',
      ],
      link: '/pickme',
    },
    {
      name: 'GAME TIME',
      title: 'Gaming',
      logo: 'logos/gametime.png',
      image: 'projects/gametime/GAMETIME.png',
      features: [
        'Handle your account',
        'Guess a word or number in various games',
        'Earn medals',
      ],
      link: '/gametime',
    },
    {
      name: 'DASHBOARD',
      title: 'Forecasting',
      logo: 'logos/dashboard.png',
      image: 'projects/dashboard/DASHBOARD.png',
      features: [
        'Select dark/light mode',
        'See weather forecast for 4 days',
        'See finance forecast for 25 years',
        'Handle your tasks',
      ],
      link: '/dashboard',
    },
  ];

  config: SwiperOptions = {
    grabCursor: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    speed: 1500,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    spaceBetween: 80,
    breakpoints: {
      0: {
        slidesPerView: 1,
        loop: true,
      },
      700: {
        slidesPerView: 2,
        loop: true,
      },
      1300: {
        slidesPerView: 3,
        loop: true,
      },
      1850: {
        slidesPerView: 4,
        loop: false,
      },
    },
  };
}
