import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

/** Entête de section : sur-titre, titre et chapeau, avec un niveau réglable. */
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-centered]': 'centered()' },
})
export class SectionHeaderComponent {
  readonly eyebrow = input<string>('');
  readonly heading = input.required<string>();
  readonly lead = input<string>('');
  readonly centered = input(false, { transform: booleanAttribute });
  /** Niveau de titre, pour conserver une hiérarchie correcte dans la page. */
  readonly level = input<2 | 3>(2);
}
