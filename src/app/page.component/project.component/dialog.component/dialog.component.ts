import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})



export class AppComponentDialog implements OnInit{
  texts: string[] = [];
  images: string[] = [];
  imagePath: string = environment.imagePath;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {type: string}, 
  public dialogRef: MatDialogRef<AppComponentDialog>) {}

  ngOnInit() {
    if (this.data.type === 'animation') {
      this.images.unshift(
        'plart/animations/header.png',
        'plart/animations/card.png',
        'plart/animations/slider.png');
      this.texts.unshift(
        'Retractable header displaying current page',
        'Flipping cards to show more content',
        'Auto slider for a better experience');
    }
    else if (this.data.type ==='user') {
      this.images.unshift(
        'plart/users/messages.png',
        'plart/users/userlist.png',
        'plart/users/orders.png');
      this.texts.unshift(
        'Messages can be sent to the admin',
        'Admin can see user list and manage them',
        'Admin can manage user orders');
    }
    else if (this.data.type === 'work') {
      this.images.unshift(
        'plart/works/works.png',
        'plart/works/cart.png',
        'plart/works/pictures.png');
      this.texts.unshift(
        'Works are displayed and can be added to cart',
        'Cart can be seen and an order may be sent',
        'Admin can modify work pictures and 3D files');
    }
  }
}