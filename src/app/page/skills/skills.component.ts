import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  ngOnInit() {
    VanillaTilt.init(document.getElementById('skills') as any);
  }
}
