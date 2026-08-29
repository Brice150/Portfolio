import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconName } from '../../../core/interfaces/icon';
import { IconComponent } from '../icon/icon.component';

export interface FilterOption {
  value: string;
  label: string;
  icon?: IconName;
}

/**
 * Barre de filtres en pastilles, partagée par les pages Compétences,
 * Parcours et Projets. Les boutons portent `aria-pressed` plutôt qu'un
 * rôle d'onglet : ils filtrent une liste, ils ne changent pas de panneau.
 */
@Component({
  selector: 'app-filter-bar',
  imports: [IconComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
  readonly options = input.required<FilterOption[]>();
  readonly active = input.required<string>();
  readonly label = input.required<string>();

  readonly changed = output<string>();
}
