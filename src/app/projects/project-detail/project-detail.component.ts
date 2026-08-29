import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SITE_URL } from '../../shared/data/profile';
import { projectBySlug, projects } from '../../shared/data/projects';
import { SeoService } from '../../core/services/seo.service';
import { DeviceShowcaseComponent } from '../../shared/components/device-showcase/device-showcase.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, DeviceShowcaseComponent, IconComponent, RevealDirective],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  /** Alimenté par le routeur grâce à `withComponentInputBinding`. */
  readonly slug = input.required<string>();

  private readonly seoService = inject(SeoService);
  private readonly router = inject(Router);

  readonly imagePath = environment.imagePath;

  readonly project = computed(() => projectBySlug(this.slug()));

  readonly nextProject = computed(() => {
    const current = this.project();
    if (!current) return undefined;

    const index = projects.findIndex((item) => item.slug === current.slug);
    return projects[(index + 1) % projects.length];
  });

  ngOnInit(): void {
    const project = this.project();

    if (!project) {
      void this.router.navigate(['/not-found'], { skipLocationChange: true });
      return;
    }

    const url = `${SITE_URL}/projets/${project.slug}`;

    this.seoService.setPage({
      title: `${project.name} — ${project.tagline} | Brice Lecomte`,
      description: project.summary,
      path: `/projets/${project.slug}`,
      image: project.cover,
      type: 'article',
      schema: this.seoService.projectSchema(project.name, project.summary, url),
    });
  }
}
