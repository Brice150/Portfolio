import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppComponentHeader {

  toHome() {
    document.getElementById("home")?.scrollIntoView({behavior:"smooth"});
  }

  toAbout() {
    document.getElementById("about")?.scrollIntoView({behavior:"smooth"});
  }

  toProject() {
    document.getElementById("project")?.scrollIntoView({behavior:"smooth"});
  }

  toContact() {
    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
  }
}