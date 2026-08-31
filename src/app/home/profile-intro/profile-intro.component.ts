import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile, profileFacts } from '../../shared/data/profile';
import { LanguageService } from '../../core/services/language.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { CopyTextDirective } from '../../shared/directives/copy-text.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-profile-intro',
  imports: [
    RouterLink,
    IconComponent,
    SectionHeaderComponent,
    RevealDirective,
    CopyTextDirective,
  ],
  templateUrl: './profile-intro.component.html',
  styleUrl: './profile-intro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIntroComponent {
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;

  readonly profile = profile;

  readonly facts = profileFacts;
}
