import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconName } from '../../../core/interfaces/icon';
import { IconComponent } from '../icon/icon.component';

export interface FilterOption {
  value: string;
  label: string;
  icon?: IconName;
}

/** `aria-pressed` et non un rôle d'onglet : on filtre une liste, sans changer de panneau. */
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
