import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICONS, IconDefinition } from '../../../core/data/icons';
import { IconName } from '../../../core/interface/icon';

/**
 * Icône SVG inline. Décorative par défaut (aria-hidden) ; passer `label`
 * lorsqu'elle porte seule le sens, par exemple dans un bouton sans texte.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-icon' },
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<string>('1.25em');
  readonly label = input<string>('');

  readonly icon = computed<IconDefinition>(() => ICONS[this.name()]);
}
