import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AppComponentHome {

  constructor(private snackBar: MatSnackBar) {}

  download() {
    this.snackBar.open("CV downloaded", "Dismiss", {duration: 2000});
  }
}
