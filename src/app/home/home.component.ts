import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  imagePath: string = environment.imagePath;

  download() {
    this.toastr.success('CV downloaded', 'File', {
      positionClass: 'toast-bottom-center',
    });
  }
}
