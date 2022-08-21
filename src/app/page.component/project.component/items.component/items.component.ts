import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppComponentDialog } from '../dialog.component/dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class AppComponentItems {
  imagePath: string = environment.imagePath;

  constructor(public dialog: MatDialog) {}

  openDialog(type: string) {
    const dialogRef = this.dialog.open(AppComponentDialog, {
      data: { type: type },
    });
  }
}
