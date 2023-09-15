import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  imagePath: string = environment.imagePath;

  constructor(private toastr: ToastrService) {}

  download() {
    this.toastr.success('CV downloaded', 'File', {
      positionClass: 'toast-bottom-center',
    });
  }
}
