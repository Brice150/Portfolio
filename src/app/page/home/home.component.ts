import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imagePath: string = environment.imagePath;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.initializeVanillaTilt();
  }

  initializeVanillaTilt() {
    if (window.innerWidth >= 900) {
      VanillaTilt.init(document.getElementById('home') as any);
    }
  }

  download() {
    this.toastr.success('CV downloaded', 'File', {
      positionClass: 'toast-bottom-center',
    });
  }
}
