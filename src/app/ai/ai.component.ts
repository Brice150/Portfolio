import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  agentBenefits,
  agentGuardrails,
  agents,
  pipelineEnd,
  pipelineStart,
} from '../shared/data/ai';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { SectionHeaderComponent } from '../shared/components/section-header/section-header.component';
import { RevealDirective } from '../shared/directives/reveal.directive';

@Component({
  selector: 'app-ai',
  imports: [
    PageHeroComponent,
    SectionHeaderComponent,
    IconComponent,
    RevealDirective,
  ],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly tr = this.languageService.tr;

  readonly agents = agents;
  readonly start = pipelineStart;
  readonly end = pipelineEnd;
  readonly guardrails = agentGuardrails;
  readonly benefits = agentBenefits;

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.aiTitle),
      description: fromDictionary((dictionary) => dictionary.seo.aiDescription),
      path: '/ia',
    });
  }
}
