import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ThemeService } from './theme.service';

/**
 * Le fond suit le curseur : halos et grille éclairée lisent sa position en
 * variables CSS (`--px`, `--py`, en fraction de l'écran). Les variables sont
 * posées sur le fond seul, jamais sur la racine : une variable héritée
 * modifiée à chaque image forcerait le recalcul des styles de toute la page.
 */
@Injectable({ providedIn: 'root' })
export class PointerEffectsService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeService = inject(ThemeService);

  /** Branche les effets ; renvoie la fonction qui les débranche. */
  attach(ambience: HTMLElement): () => void {
    const view = this.document.defaultView;
    if (!this.isBrowser || !view) return () => undefined;

    const reduced = view.matchMedia?.('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = (): void => {
      frame = 0;
      ambience.style.setProperty('--px', (x / view.innerWidth).toFixed(4));
      ambience.style.setProperty('--py', (y / view.innerHeight).toFixed(4));
    };

    const onMove = (event: PointerEvent): void => {
      // Au doigt, il n'y a pas de curseur à suivre.
      if (event.pointerType === 'touch') return;
      if (this.themeService.motion() === 'reduced' || reduced?.matches) return;

      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = view.requestAnimationFrame(apply);
    };

    view.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      view.removeEventListener('pointermove', onMove);
      if (frame) view.cancelAnimationFrame(frame);
    };
  }
}
