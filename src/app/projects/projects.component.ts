import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { projects } from '../../assets/data/projects';
import { SeoService } from '../core/services/seo.service';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule, ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements OnInit {
  projects = projects;
  seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Projets - Brice Lecomte',
      description:
        'Découvrez les projets web et SaaS développés par Brice Lecomte.',
      url: 'https://portfolio-brice.web.app/projects',
    });
  }
}
