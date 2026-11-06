import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

export const SCRAMBLE_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/#%&*=+';
/** Délai avant que la première lettre ne se fixe. */
export const SCRAMBLE_DELAY = 260;
/** Écart entre deux lettres qui se fixent. */
export const SCRAMBLE_STEP = 55;
/** Fréquence de changement des caractères aléatoires. */
const SCRAMBLE_TICK = 45;

interface Glyph {
  index: number;
  final: string;
}

/**
 * Affiche un texte qui se « décode » : chaque lettre fait défiler des
 * caractères aléatoires avant de se fixer, de gauche à droite.
 *
 * Le prérendu contient déjà le texte final : moteurs de recherche, lecteurs
 * d'écran (via la copie masquée) et visiteurs sans JS voient le vrai nom.
 * Chaque lettre garde sa largeur pendant l'effet : la ligne ne bouge pas.
 * Seul le contenu des nœuds texte change, jamais les nœuds eux-mêmes : le
 * nom reste le même candidat au plus grand rendu de la page.
 */
@Component({
  selector: 'app-scramble-text',
  templateUrl: './scramble-text.component.html',
  styleUrl: './scramble-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrambleTextComponent {
  readonly text = input.required<string>();

  readonly words = computed<Glyph[][]>(() => {
    let index = 0;

    return this.text()
      .split(' ')
      .map((word) => [...word].map((final) => ({ index: index++, final })));
  });

  /** Caractères affichés à la place des lettres ; vide hors animation. */
  readonly scrambled = signal<readonly (string | null)[]>([]);
  readonly running = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService = inject(ThemeService);
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Côté serveur, ni animation ni `cancelAnimationFrame`.
    destroyRef.onDestroy(() => {
      if (this.frame) cancelAnimationFrame(this.frame);
    });

    afterNextRender(() => {
      if (
        this.themeService.motion() === 'reduced' ||
        globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      this.play();
    });
  }

  glyph(glyph: Glyph): string {
    return this.scrambled()[glyph.index] ?? glyph.final;
  }

  private play(): void {
    const letters = [
      ...this.host.nativeElement.querySelectorAll<HTMLElement>('.ch'),
    ];
    // Largeurs mesurées sur le texte final, figées le temps de l'effet.
    for (const letter of letters) {
      letter.style.width = `${letter.getBoundingClientRect().width}px`;
    }

    const total = this.words().flat().length;
    const start = performance.now();
    let lastTick = -Infinity;

    this.running.set(true);

    const tick = (now: number): void => {
      const elapsed = now - start;
      const settled = Math.floor((elapsed - SCRAMBLE_DELAY) / SCRAMBLE_STEP);

      if (settled >= total) {
        this.scrambled.set([]);
        this.running.set(false);
        for (const letter of letters) letter.style.removeProperty('width');
        return;
      }

      if (now - lastTick >= SCRAMBLE_TICK) {
        lastTick = now;
        this.scrambled.set(
          Array.from({ length: total }, (_, index) =>
            index <= settled ? null : randomGlyph(),
          ),
        );
      }

      this.frame = requestAnimationFrame(tick);
    };

    this.frame = requestAnimationFrame(tick);
  }
}

const randomGlyph = (): string =>
  SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
