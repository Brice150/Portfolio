import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly lead = input<string>('');
}
