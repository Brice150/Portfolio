import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pickme',
  templateUrl: './pickme.component.html',
  styleUrls: ['./pickme.component.css']
})
export class AppComponentPickme {
  videoPath: string = environment.videoPath;
}
