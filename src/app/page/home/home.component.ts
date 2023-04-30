import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imagePath: string = environment.imagePath;

  constructor(private toastr: ToastrService) {}

  toContact() {
    document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
  }

  download() {
    this.toastr.success("CV downloaded", "File", {
      positionClass: "toast-bottom-center" 
    });
  }
}
