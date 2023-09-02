import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  videoPath: string = environment.videoPath;
  imagePath: string = environment.imagePath + "/projects/dashboard/";
}
