import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  imagePath: string = environment.imagePath;

  ngOnInit() {
    VanillaTilt.init(document.querySelector(".card") as any);
  }
}
