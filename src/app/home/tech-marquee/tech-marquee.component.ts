import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/** La liste est dupliquée pour que la translation de 50 % boucle sans saut. */
@Component({
  selector: 'app-tech-marquee',
  templateUrl: './tech-marquee.component.html',
  styleUrl: './tech-marquee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMarqueeComponent {
  readonly items = input.required<string[]>();
  readonly label = input.required<string>();

  readonly loop = computed(() => [...this.items(), ...this.items()]);
}
