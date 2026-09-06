import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectStatus } from '../core/interfaces/project';
import { projectsByDate } from '../shared/data/projects';
import { techLabel } from '../shared/data/tech';
import { Dictionary } from '../core/i18n/locales';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { DeviceShowcaseComponent } from '../shared/components/device-showcase/device-showcase.component';
import {
  FilterBarComponent,
  FilterOption,
} from '../shared/components/filter-bar/filter-bar.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

type StatusLabelKey = Extract<keyof Dictionary['projects'], `status${string}`>;

const STATUS_LABELS: Record<ProjectStatus, StatusLabelKey> = {
  live: 'statusLive',
  archive: 'statusArchive',
  wip: 'statusWip',
};

@Component({
  selector: 'app-projects',
  imports: [
    RouterLink,
    PageHeroComponent,
    FilterBarComponent,
    DeviceShowcaseComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;
  readonly tr = this.languageService.tr;
  readonly lang = this.languageService.lang;
  readonly techLabel = techLabel;

  readonly projects = projectsByDate();

  readonly activeProject = signal('all');

  readonly filters = computed<FilterOption[]>(() => [
    { value: 'all', label: this.t().projects.filterAll },
    ...this.projects.map((project) => ({
      value: project.slug,
      label: this.tr(project.name),
    })),
  ]);

  readonly visibleProjects = computed(() => {
    const active = this.activeProject();
    return active === 'all'
      ? this.projects
      : this.projects.filter((project) => project.slug === active);
  });

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.projectsTitle),
      description: fromDictionary(
        (dictionary) => dictionary.seo.projectsDescription,
      ),
      path: '/projets',
    });
  }

  statusLabel(status: ProjectStatus): string {
    return this.t().projects[STATUS_LABELS[status]];
  }

  selectProject(slug: string): void {
    this.activeProject.set(slug);
  }
}
