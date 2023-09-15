import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent {
  config: SwiperOptions = {
    mousewheel: {},
    keyboard: {},
    grabCursor: true,
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
}
