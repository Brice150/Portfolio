import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Highlight } from '../../core/interfaces/content';
import { LanguageService } from '../../core/services/language.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-highlight-grid',
  imports: [IconComponent, RevealDirective],
  templateUrl: './highlight-grid.component.html',
  styleUrl: './highlight-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightGridComponent {
  readonly items = input.required<Highlight[]>();

  readonly tr = inject(LanguageService).tr;
}
