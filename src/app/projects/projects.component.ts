import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projects } from '../shared/data/projects';
import { SeoService } from '../core/services/seo.service';
import { DeviceShowcaseComponent } from '../shared/components/device-showcase/device-showcase.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeaderComponent,
    DeviceShowcaseComponent,
    ProjectCardComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly projects = projects;
  readonly showcaseProjects = projects.filter((project) => !!project.shots);

  readonly selectedSlug = signal(this.showcaseProjects[0].slug);

  readonly selected = computed(
    () =>
      this.showcaseProjects.find((project) => project.slug === this.selectedSlug()) ??
      this.showcaseProjects[0],
  );

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Projets | Applications web Angular & Java — Brice Lecomte',
      description:
        'Cinq applications web conçues, développées et déployées de bout en bout : gestion du quotidien, quiz multijoueur, simulateur d’aides, application full-stack Java et ce portfolio.',
      path: '/projets',
    });
  }

  select(slug: string): void {
    this.selectedSlug.set(slug);
  }

  /** Navigation au clavier entre les onglets, conforme au motif « tabs ». */
  onTabKeydown(event: KeyboardEvent, index: number): void {
    const last = this.showcaseProjects.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    if (next === null) return;

    event.preventDefault();
    this.select(this.showcaseProjects[next].slug);

    const target = event.currentTarget as HTMLElement;
    const tabs = target.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.item(next)?.focus();
  }
}
