import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  certifications,
  milestones,
  personalNotes,
} from '../shared/data/journey';
import { profile, transferableStrengths } from '../shared/data/profile';
import { MilestoneKind } from '../core/interfaces/experience';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import {
  FilterBarComponent,
  FilterOption,
} from '../shared/components/filter-bar/filter-bar.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { TimelineComponent } from '../shared/components/timeline/timeline.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

type JourneyFilter = 'all' | MilestoneKind;

@Component({
  selector: 'app-journey',
  imports: [
    PageHeroComponent,
    FilterBarComponent,
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
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly tr = this.languageService.tr;

  readonly certifications = certifications;
  readonly strengths = transferableStrengths;
  readonly notes = personalNotes;
  readonly profile = profile;

  readonly filter = signal<JourneyFilter>('all');

  readonly filters = computed<FilterOption[]>(() => {
    const journey = this.t().journey;

    return [
      { value: 'all', label: journey.filterAll },
      { value: 'work', label: journey.filterWork },
      { value: 'turning-point', label: journey.filterTurningPoint },
      { value: 'education', label: journey.filterEducation },
    ];
  });

  readonly visibleMilestones = computed(() => {
    const value = this.filter();
    return value === 'all'
      ? milestones
      : milestones.filter((item) => item.kind === value);
  });

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.journeyTitle),
      description: fromDictionary((dictionary) => dictionary.seo.journeyDescription),
      path: '/parcours',
    });
  }

  setFilter(value: string): void {
    this.filter.set(value as JourneyFilter);
  }
}
