import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SITE_URL } from '../../shared/data/profile';
import { projectBySlug, projectsByDate } from '../../shared/data/projects';
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

  /** Voisins dans l’ordre chronologique de la page Projets. */
  private readonly neighbours = computed(() => {
    const current = this.project();
    if (!current) return { previous: undefined, next: undefined };

    const ordered = projectsByDate();
    const index = ordered.findIndex((item) => item.slug === current.slug);

    return {
      previous: index > 0 ? ordered[index - 1] : undefined,
      next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
    };
  });

  readonly previousProject = computed(() => this.neighbours().previous);
  readonly nextProject = computed(() => this.neighbours().next);

  ngOnInit(): void {
    const project = this.project();

    if (!project) {
      void this.router.navigate(['/not-found'], { skipLocationChange: true });
      return;
    }

    const url = `${SITE_URL}/projets/${project.slug}`;

    this.seoService.setPage({
      title: `${project.name} : ${project.tagline} | Brice Lecomte`,
      description: project.summary,
      path: `/projets/${project.slug}`,
      // Pas de visuel dédié ici : les couvertures sont en WebP, que LinkedIn
      // ignore. La bannière JPEG du site est reprise par défaut.
      type: 'article',
      schema: this.seoService.projectSchema(project.name, project.summary, url),
    });
  }
}
