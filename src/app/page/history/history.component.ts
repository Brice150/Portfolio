import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        displayDefaultIndicatorType: false,
      },
    },
  ],
})
export class HistoryComponent implements OnInit {
  imagePath: string = environment.imagePath;

  ngOnInit() {
    this.initializeVanillaTilt();
  }

  initializeVanillaTilt() {
    if (window.innerWidth >= 900) {
      VanillaTilt.init(document.getElementById('history') as any);
    }
  }
}
