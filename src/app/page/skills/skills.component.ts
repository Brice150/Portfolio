import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  ngOnInit() {
    this.initializeVanillaTilt();
  }

  initializeVanillaTilt() {
    if (window.innerWidth >= 900) {
      VanillaTilt.init(document.getElementById('skills') as any);
    }
  }
}
