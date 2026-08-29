import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { collaboration, serviceOffers } from '../shared/data/expertise';
import { profile, yearsOfExperience } from '../shared/data/profile';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

@Component({
  selector: 'app-expertise',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly offers = serviceOffers;
  readonly collaboration = collaboration;
  readonly profile = profile;
  readonly years = yearsOfExperience();

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Expertise | Développeur Angular & Java — Brice Lecomte',
      description:
        'Création d’applications métier, reprise d’un existant, optimisation des performances, conformité RGAA et DSFR : les domaines sur lesquels j’interviens en Angular et Java.',
      path: '/expertise',
    });
  }
}
