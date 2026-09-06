import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/** L'état masqué n'est appliqué que sous `html.js` : sans JS, tout reste visible. */
@Directive({
  selector: '[appReveal]',
  host: {
    'data-reveal': '',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class RevealDirective implements OnDestroy {
  readonly delay = input<number, unknown>(0, {
    alias: 'appReveal',
    transform: toDelay,
  });

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
