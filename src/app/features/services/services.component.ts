import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile, yearsOfExperience } from '../../core/data/profile';
import { collaboration, serviceOffers } from '../../core/data/services';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly offers = serviceOffers;
  readonly collaboration = collaboration;
  readonly profile = profile;
  readonly years = yearsOfExperience();

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Prestations | Développeur Angular & Java en full remote',
      description:
        'Création d’applications métier, reprise d’un existant, optimisation des performances, mise en conformité RGAA. Développeur full-stack confirmé disponible sur Paris en télétravail complet.',
      path: '/prestations',
    });
  }
}
