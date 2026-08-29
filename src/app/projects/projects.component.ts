import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProjectStatus } from '../core/interfaces/project';
import { projectsByDate } from '../shared/data/projects';
import { SeoService } from '../core/services/seo.service';
import { DeviceShowcaseComponent } from '../shared/components/device-showcase/device-showcase.component';
import { FilterBarComponent, FilterOption } from '../shared/components/filter-bar/filter-bar.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

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

  readonly projects = projectsByDate();
  readonly imagePath = environment.imagePath;

  readonly statusLabels: Record<ProjectStatus, string> = {
    live: 'En ligne',
    archive: 'Non hébergé',
    wip: 'En cours',
  };

  readonly activeProject = signal('all');

  readonly filters: FilterOption[] = [
    { value: 'all', label: 'Tous' },
    ...this.projects.map((project) => ({ value: project.slug, label: project.name })),
  ];

  readonly visibleProjects = computed(() => {
    const active = this.activeProject();
    return active === 'all'
      ? this.projects
      : this.projects.filter((project) => project.slug === active);
  });

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Projets | Applications web Angular & Java — Brice Lecomte',
      description:
        '5 applications web conçues, développées et déployées de bout en bout : gestion du quotidien, quiz multijoueur, simulateur d’aides, application full-stack Java et ce portfolio.',
      path: '/projets',
    });
  }

  selectProject(slug: string): void {
    this.activeProject.set(slug);
  }
}
