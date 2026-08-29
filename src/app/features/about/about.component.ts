import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { personalNotes } from '../../core/data/journey';
import { profile, transferableStrengths, yearsOfExperience } from '../../core/data/profile';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly profile = profile;
  readonly strengths = transferableStrengths;
  readonly notes = personalNotes;
  readonly years = yearsOfExperience();

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'À propos | Brice Lecomte, développeur Angular & Java',
      description:
        'De l’ingénierie aérospatiale au développement web : le récit d’une reconversion assumée, ce qu’elle a laissé en héritage, et la façon de travailler qui en découle.',
      path: '/a-propos',
      type: 'profile',
    });
  }
}
