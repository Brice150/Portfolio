import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { highlights, principles, yearsOfExperience } from '../../core/data/profile';
import { skillGroups } from '../../core/data/skills';
import { milestones } from '../../core/data/journey';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TimelineComponent } from '../../shared/components/timeline/timeline.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { FeaturedProjectsComponent } from './components/featured-projects/featured-projects.component';
import { HeroComponent } from './components/hero/hero.component';
import { HighlightGridComponent } from './components/highlight-grid/highlight-grid.component';
import { ProfileIntroComponent } from './components/profile-intro/profile-intro.component';
import { TechMarqueeComponent } from './components/tech-marquee/tech-marquee.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    HeroComponent,
    HighlightGridComponent,
    ProfileIntroComponent,
    TechMarqueeComponent,
    FeaturedProjectsComponent,
    TimelineComponent,
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
  readonly years = yearsOfExperience();

  /** Trois dernières expériences professionnelles, pour l'aperçu du parcours. */
  readonly recentMilestones = milestones.filter((milestone) => milestone.kind === 'work');

  readonly technologies = skillGroups
    .flatMap((group) => group.skills.map((skill) => skill.name))
    .slice(0, 14);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Brice Lecomte | Développeur Full-Stack Angular & Java',
      description: `Développeur Full-Stack Angular et Java confirmé, ${this.years} ans d’expérience en ESN. Reconverti depuis l’ingénierie aérospatiale, disponible sur Paris en full remote.`,
      path: '/',
      type: 'profile',
    });
  }
}
