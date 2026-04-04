import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-history',
  imports: [CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  imagePath: string = environment.imagePath + 'history/';
  seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Expérience | Développeur Angular & Java',
      description:
        'Découvrez le parcours de Brice Lecomte, développeur Full Stack spécialisé Angular et Java, avec ses expériences professionnelles, projets SaaS et réalisations techniques.',
      url: 'https://portfolio-brice.web.app/history',
    });
  }
}
