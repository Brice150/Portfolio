import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { projects } from '../../assets/data/projects';
import { SeoService } from '../core/services/seo.service';
import { ProjectComponent } from './project/project.component';

let swiperLoaderPromise: Promise<void> | null = null;

function ensureSwiperRegistered(): Promise<void> {
  if (!swiperLoaderPromise) {
    swiperLoaderPromise = import('swiper/element/bundle').then(
      ({ register }) => {
        register();
      },
    );
  }

  return swiperLoaderPromise;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule, ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects = projects;
  seoService = inject(SeoService);
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Projets - Brice Lecomte',
      description:
        'Découvrez les projets web et SaaS développés par Brice Lecomte.',
      url: 'https://portfolio-brice.web.app/projects',
    });

    void ensureSwiperRegistered();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperRef.nativeElement.swiper?.update();
    });
  }
}
