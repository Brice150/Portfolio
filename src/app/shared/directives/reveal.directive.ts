import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Révèle un élément à l'entrée dans le viewport.
 *
 * L'état initial masqué est porté par la feuille de styles globale, mais
 * uniquement sous `html.js` : sans JavaScript, le contenu reste visible.
 * L'attribut `data-reveal` est statique, donc présent dans le HTML prérendu.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    'data-reveal': '',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class RevealDirective implements OnDestroy {
  /** Décalage d'apparition, pour créer un effet de cascade. */
  readonly delay = input<number, unknown>(0, { alias: 'appReveal', transform: toDelay });

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const element = this.host.nativeElement as HTMLElement;

      if (typeof IntersectionObserver === 'undefined') {
        element.classList.add('is-revealed');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target.classList.add('is-revealed');
            this.observer?.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

function toDelay(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
