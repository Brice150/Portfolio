import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile, yearsOfExperience } from '../../shared/data/profile';
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
  readonly profile = profile;
  readonly years = yearsOfExperience();

  /** Repères factuels, sans information de localisation ni de disponibilité. */
  readonly facts = [
    {
      icon: 'graduation' as const,
      label: 'Formation',
      value: 'Double diplôme d’ingénieur aérospatial',
    },
    {
      icon: 'award' as const,
      label: 'Certifications',
      value: 'Angular · Java',
    },
    {
      icon: 'monitor' as const,
      label: 'Front',
      value: 'Angular · TypeScript · RxJS',
    },
    {
      icon: 'server' as const,
      label: 'Back',
      value: 'Java · Spring Boot · SQL',
    },
    {
      icon: 'shield' as const,
      label: 'Domaines',
      value: 'Défense · Maritime public',
    },
    {
      icon: 'globe' as const,
      label: 'Langues',
      value: 'Français · Anglais C1',
    },
  ];
}
