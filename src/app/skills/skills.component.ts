import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, RouterModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  imagePath: string = environment.imagePath + 'skills/';
  readonly scrollContent = viewChild.required<ElementRef>('content');
  seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Compétences | Angular, Java & Développement Web',
      description:
        'Explorez les compétences de Brice Lecomte : Angular, Java, Spring Boot, TypeScript et développement d’applications web modernes et performantes.',
      url: 'https://portfolio-brice.web.app/skills',
    });
  }

  scrollDown(): void {
    this.scrollContent().nativeElement.scrollTo({
      top: this.scrollContent().nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
