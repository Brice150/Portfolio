import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile, yearsOfExperience } from '../../../../core/data/profile';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-profile-intro',
  imports: [RouterLink, IconComponent, SectionHeaderComponent, RevealDirective],
  templateUrl: './profile-intro.component.html',
  styleUrl: './profile-intro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIntroComponent {
  readonly profile = profile;
  readonly years = yearsOfExperience();

  readonly facts = [
    { icon: 'pin' as const, label: 'Basé à', value: 'Rennes, France' },
    { icon: 'globe' as const, label: 'Recherche', value: 'Paris, full remote' },
    { icon: 'graduation' as const, label: 'Formation', value: 'Ingénieur ISAE-ENSMA' },
    { icon: 'award' as const, label: 'Certifié', value: 'Angular · Java' },
    { icon: 'users' as const, label: 'Langues', value: 'Français · Anglais C1' },
    { icon: 'briefcase' as const, label: 'Statut', value: 'En poste, à l’écoute' },
  ];
}
