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
    mousewheel: true,
    keyboard: true,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    simulateTouch: false,
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
    if (!window.matchMedia('(max-width: 900px)').matches) {
      VanillaTilt.init(document.querySelectorAll('.card') as any);
    }
  }
}
