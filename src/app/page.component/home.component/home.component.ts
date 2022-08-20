import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AppComponentHome {
  imagePath: string = environment.imagePath;

  constructor(private snackBar: MatSnackBar) {}

  toContact() {
    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
  }

  download() {
    this.snackBar.open("CV downloaded", "Dismiss", {duration: 2000});
  }
}
