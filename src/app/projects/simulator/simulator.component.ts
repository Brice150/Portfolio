import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath + '/projects/simulator/';
}
