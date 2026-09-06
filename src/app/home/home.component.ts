import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { collaboration } from '../shared/data/expertise';
import {
  highlights,
  principles,
  yearsOfExperience,
} from '../shared/data/profile';
import { skillGroups } from '../shared/data/skills';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { HeroComponent } from './hero/hero.component';
import { HighlightGridComponent } from './highlight-grid/highlight-grid.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { TechMarqueeComponent } from './tech-marquee/tech-marquee.component';

const MARQUEE_SIZE = 14;

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    HighlightGridComponent,
    ProfileIntroComponent,
    TechMarqueeComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly tr = this.languageService.tr;

  readonly highlights = highlights;
  readonly principles = principles;
  readonly collaboration = collaboration;
  readonly years = yearsOfExperience();

  readonly technologies = computed(() =>
    skillGroups
      .flatMap((group) => group.skills.map((skill) => this.tr(skill.name)))
      .slice(0, MARQUEE_SIZE),
  );

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.homeTitle),
      description: fromDictionary(
        (dictionary) => dictionary.seo.homeDescription,
        { years: this.years },
      ),
      path: '/',
      type: 'profile',
    });
  }
}
