import { Component } from '@angular/core';
import { Project } from 'src/app/core/interface/project';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath;
  projects: Project[] = 
  [
    {
      name: 'PLART',
      title: '3D Printing Web Application',
      logo: 'logos/plart.png',
      image: 'projects/PLART.png',
      features: [
        'Safely login',
        'Upload/download objects',
        'Send a message to a user',
        'Admin page'
      ],
      link: '/plart'
    }, 
    {
      name: 'PICK ME',
      title: 'Dating Web Application',
      logo: 'logos/pickme.png',
      image: 'projects/PICKME.png',
      features: [
        'Safely login',
        'Select attractive users and match',
        'Send a message to a match',
        'Admin page'
      ],
      link: '/pickme'
    }
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
      dynamicBullets: true
    },
    spaceBetween: 80,
    breakpoints: {
      0: {
        slidesPerView: 1,
        loop: true
      },
      700: {
        slidesPerView: 2,
        loop: true
      },
      1300: {
        slidesPerView: 3,
        loop: false
      },
      1850: {
        slidesPerView: 4,
        loop: false
      }
    }
  };
}
