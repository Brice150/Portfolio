import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plart',
  templateUrl: './plart.component.html',
  styleUrls: ['./plart.component.css'],
})
export class PlartComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath + '/projects/plart/';
}
