import { Directive, ElementRef, inject, input } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

/**
 * Incline l'élément vers le curseur. La directive ne fait que poser des
 * variables (`--rx`, `--ry`) :
 * le rendu, et sa neutralisation quand les animations sont réduites, restent
 * dans la feuille de style du composant.
 */
@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'reset()',
  },
})
export class TiltDirective {
  /** Inclinaison maximale, en degrés. */
  readonly max = input<number, unknown>(8, {
    alias: 'appTilt',
    transform: (value: unknown) => Number(value) || 8,
  });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService = inject(ThemeService);

  onMove(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (this.themeService.motion() === 'reduced') return;

    const element = this.host.nativeElement;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // Position relative, de -0,5 à 0,5 de part et d'autre du centre.
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const max = this.max();

    element.style.setProperty('--ry', `${(x * 2 * max).toFixed(2)}deg`);
    element.style.setProperty('--rx', `${(-y * 2 * max).toFixed(2)}deg`);
    element.classList.add('is-tilting');
  }

  reset(): void {
    const element = this.host.nativeElement;

    for (const name of ['--rx', '--ry']) {
      element.style.removeProperty(name);
    }
    element.classList.remove('is-tilting');
  }
}
