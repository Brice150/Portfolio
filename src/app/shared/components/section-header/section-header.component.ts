import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
} from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-centered]': 'centered()' },
  // L'en-tête apparaît au défilement, puis dessine le trait de son surtitre.
  hostDirectives: [RevealDirective],
})
export class SectionHeaderComponent {
  readonly eyebrow = input<string>('');
  readonly heading = input.required<string>();
  readonly lead = input<string>('');
  readonly centered = input(false, { transform: booleanAttribute });
  readonly level = input<2 | 3>(2);
}
