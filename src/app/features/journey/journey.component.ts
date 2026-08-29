import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { certifications, milestones } from '../../core/data/journey';
import { MilestoneKind } from '../../core/interface/experience';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TimelineComponent } from '../../shared/components/timeline/timeline.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

type JourneyFilter = 'all' | MilestoneKind;

@Component({
  selector: 'app-journey',
  imports: [
    PageHeroComponent,
    SectionHeaderComponent,
    TimelineComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly certifications = certifications;
  readonly filter = signal<JourneyFilter>('all');

  readonly filters: { value: JourneyFilter; label: string }[] = [
    { value: 'all', label: 'Tout le parcours' },
    { value: 'work', label: 'Expériences' },
    { value: 'turning-point', label: 'Reconversion' },
    { value: 'education', label: 'Formation' },
  ];

  readonly visibleMilestones = computed(() => {
    const value = this.filter();
    return value === 'all' ? milestones : milestones.filter((item) => item.kind === value);
  });

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Parcours | Brice Lecomte, développeur Angular & Java',
      description:
        'Sopra Steria, Capgemini, Open : cinq ans d’expérience full-stack Angular et Java, précédés d’un diplôme d’ingénieur ISAE-ENSMA et d’une reconversion assumée.',
      path: '/parcours',
    });
  }

  setFilter(value: JourneyFilter): void {
    this.filter.set(value);
  }
}
