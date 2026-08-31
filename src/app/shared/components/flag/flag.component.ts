import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Lang } from '../../../core/i18n/lang';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  readonly lang = input.required<Lang>();
}
