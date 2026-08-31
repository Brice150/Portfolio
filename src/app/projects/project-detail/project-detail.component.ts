import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SITE_URL } from '../../shared/data/profile';
import { projectBySlug, projectsByDate } from '../../shared/data/projects';
import { techLabel } from '../../shared/data/tech';
import { LOCALES } from '../../core/i18n/locales';
import { format } from '../../core/i18n/format';
import { fromLocales } from '../../core/i18n/localize';
import { LanguageService } from '../../core/services/language.service';
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
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly tr = this.languageService.tr;
  readonly lang = this.languageService.lang;
  readonly techLabel = techLabel;

  readonly project = computed(() => projectBySlug(this.slug()));

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
      title: fromLocales((lang) =>
        format(LOCALES[lang].dictionary.seo.projectTitle, {
          name: project.name[lang],
          tagline: project.tagline[lang],
        }),
      ),
      description: project.summary,
      path: `/projets/${project.slug}`,
      type: 'article',
      schema: this.seoService.projectSchema(project.name, project.summary, url),
    });
  }
}
