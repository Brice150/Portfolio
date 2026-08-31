import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navItems } from '../shared/data/profile';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, IconComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly tr = this.languageService.tr;

  readonly navItems = navItems;

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.notFoundTitle),
      description: fromDictionary((dictionary) => dictionary.seo.notFoundDescription),
      path: '/not-found',
      noindex: true,
    });
  }
}
