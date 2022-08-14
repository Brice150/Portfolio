import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-root',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class AppComponentCard implements OnInit{
  imagePath: string = environment.imagePath;

  ngOnInit() {
    VanillaTilt.init(document.querySelector(".card") as any);
  }
}
