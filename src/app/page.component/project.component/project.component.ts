import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class AppComponentProject {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath;
}
