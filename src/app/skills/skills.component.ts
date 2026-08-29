import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { serviceOffers } from '../shared/data/expertise';
import { practices, skillGroups } from '../shared/data/skills';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { FilterBarComponent, FilterOption } from '../shared/components/filter-bar/filter-bar.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-skills',
  imports: [
    PageHeroComponent,
    FilterBarComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly groups = skillGroups;
  readonly practices = practices;
  readonly offers = serviceOffers;

  readonly activeGroup = signal('all');

  readonly filters: FilterOption[] = [
    { value: 'all', label: 'Toutes' },
    ...this.groups.map((group) => ({ value: group.id, label: group.title, icon: group.icon })),
  ];

  readonly visibleGroups = computed(() => {
    const active = this.activeGroup();
    return active === 'all' ? this.groups : this.groups.filter((group) => group.id === active);
  });

  readonly skillCount = this.groups.reduce((total, group) => total + group.skills.length, 0);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Compétences | Angular, Java, Spring Boot — Brice Lecomte',
      description:
        'Le détail de ma stack : Angular, TypeScript, RxJS, Java, Spring Boot, PostgreSQL, Oracle, accessibilité et performance. Avec, pour chaque brique, ce que j’en fais réellement.',
      path: '/competences',
    });
  }

  selectGroup(id: string): void {
    this.activeGroup.set(id);
  }
}
