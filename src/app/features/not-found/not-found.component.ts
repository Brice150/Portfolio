import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navItems } from '../../core/data/profile';
import { SeoService } from '../../core/services/seo.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly navItems = navItems;

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Page introuvable | Brice Lecomte',
      description: 'Cette page n’existe pas ou n’existe plus. Voici comment retrouver votre chemin.',
      path: '/not-found',
    });
  }
}
