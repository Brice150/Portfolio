import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

export const COUNT_DURATION = 1200;
export const COUNT_DELAY = 200;
const LEADING_NUMBER = /^\d+/;

/**
 * Affiche une valeur (« 8 ans », « 4 ») en faisant défiler son nombre de tête
 * quand elle entre à l'écran. Le texte vient toujours de la valeur reçue : le
 * prérendu et un changement de langue affichent la valeur complète.
 */
@Directive({
  selector: '[appCountUp]',
  host: { '[textContent]': 'display()' },
})
export class CountUpDirective {
  readonly value = input.required<string>({ alias: 'appCountUp' });

  // Nombre en cours de défilement ; `null` hors animation.
  private readonly current = signal<number | null>(null);
  readonly display = computed(() => {
    const current = this.current();
    const value = this.value();
    return current === null
      ? value
      : value.replace(LEADING_NUMBER, String(current));
  });

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly themeService = inject(ThemeService);
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const target = Number(this.value().match(LEADING_NUMBER)?.[0]);

      if (
        !target ||
        typeof IntersectionObserver === 'undefined' ||
        this.themeService.motion() === 'reduced' ||
        globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      this.current.set(0);
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          observer.disconnect();
          this.count(target);
        },
        { threshold: 0.5 },
      );
      observer.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  private count(target: number): void {
    const start = performance.now() + COUNT_DELAY;

    const tick = (now: number): void => {
      const progress = Math.min(Math.max((now - start) / COUNT_DURATION, 0), 1);
      // Ralentit à l'approche de la valeur, comme un compteur qui s'arrête.
      const eased = 1 - Math.pow(1 - progress, 3);

      if (progress < 1) {
        this.current.set(Math.round(target * eased));
        this.frame = requestAnimationFrame(tick);
      } else {
        this.current.set(null);
      }
    };

    this.frame = requestAnimationFrame(tick);
  }
}
