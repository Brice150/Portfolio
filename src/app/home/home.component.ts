import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  imagePath: string = environment.imagePath;
  router = inject(Router);
  toastr = inject(ToastrService);
  seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Brice Lecomte | Développeur Full Stack Angular & Java',
      description:
        'Portfolio de Brice Lecomte, développeur Full Stack spécialisé Angular et Java.',
      url: 'https://portfolio-brice.web.app/',
    });
  }

  download(): void {
    this.toastr.info('CV téléchargé', 'CV', {
      positionClass: 'toast-bottom-center',
      toastClass: 'ngx-toastr custom info',
    });
  }
}
