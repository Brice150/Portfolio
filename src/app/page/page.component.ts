import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  config: SwiperOptions = {
    mousewheel: {},
    keyboard: {},
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      900: {
        slidesPerView: 2,
      },
      1800: {
        slidesPerView: 3,
      },
    },
  };

  ngOnInit() {
    this.initializeVanillaTilt();
  }

  initializeVanillaTilt() {
    if (window.innerWidth >= 900) {
      VanillaTilt.init(document.querySelectorAll('.card') as any);
    }
  }
}
