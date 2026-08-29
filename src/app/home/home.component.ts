import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { collaboration } from '../shared/data/expertise';
import { highlights, principles, yearsOfExperience } from '../shared/data/profile';
import { skillGroups } from '../shared/data/skills';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { HeroComponent } from './hero/hero.component';
import { HighlightGridComponent } from './highlight-grid/highlight-grid.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { TechMarqueeComponent } from './tech-marquee/tech-marquee.component';

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

  readonly highlights = highlights;
  readonly principles = principles;
  readonly collaboration = collaboration;
  readonly years = yearsOfExperience();

  readonly technologies = skillGroups
    .flatMap((group) => group.skills.map((skill) => skill.name))
    .slice(0, 14);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Brice Lecomte | Développeur Full-Stack Angular & Java',
      description: `Développeur Full-Stack Angular et Java confirmé, ${this.years} ans d’expérience en ESN sur des applications métier réglementées. Ingénieur aérospatial reconverti au développement logiciel.`,
      path: '/',
      type: 'profile',
    });
  }
}
