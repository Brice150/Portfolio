import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Bandeau défilant de technologies. La liste est dupliquée une fois afin que
 * la translation de 50 % boucle sans saut visible.
 */
@Component({
  selector: 'app-tech-marquee',
  templateUrl: './tech-marquee.component.html',
  styleUrl: './tech-marquee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMarqueeComponent {
  readonly items = input.required<string[]>();
  readonly label = input('Technologies utilisées au quotidien');

  readonly loop = computed(() => [...this.items(), ...this.items()]);
}
