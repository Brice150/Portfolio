import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gametime',
  templateUrl: './gametime.component.html',
  styleUrls: ['./gametime.component.css'],
})
export class GametimeComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath + '/projects/gametime/';
}
