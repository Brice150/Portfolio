import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sliderAnimation } from './animation';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [sliderAnimation],
})
export class AppComponent {}
