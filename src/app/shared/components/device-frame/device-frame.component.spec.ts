import { ComponentFixture } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../../testing/mount';
import { ThemeService } from '../../../core/services/theme.service';
import { DeviceFrameComponent } from './device-frame.component';

describe('DeviceFrameComponent', () => {
  /**
   * jsdom ne met pas en page : les hauteurs valent zéro et le composant croirait la maquette
   * jamais défilable. On les impose donc pour décrire l'écran qu'il est censé mesurer.
   */
  function sizeScreen(
    fixture: ComponentFixture<DeviceFrameComponent>,
    {
      scrollHeight,
      clientHeight,
    }: { scrollHeight: number; clientHeight: number },
  ): HTMLElement {
    const screen = (fixture.nativeElement as HTMLElement).querySelector(
      '.screen',
    ) as HTMLElement;
    Object.defineProperty(screen, 'scrollHeight', {
      value: scrollHeight,
      configurable: true,
    });
    Object.defineProperty(screen, 'clientHeight', {
      value: clientHeight,
      configurable: true,
    });
    return screen;
  }

  async function frame(
    inputs: Record<string, unknown> = {},
  ): Promise<ComponentFixture<DeviceFrameComponent>> {
    return mount(DeviceFrameComponent, {
      inputs: { src: 'projet.webp', alt: 'Capture du projet', ...inputs },
    });
  }

  beforeEach(() => {
    // Les images ne se chargent pas et rien n'est peint : on pilote la boucle d'animation
    // nous-mêmes pour observer le défilement pas à pas.
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 1),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('préfixe la source par le chemin des images', async () => {
    const fixture = await frame();

    expect(fixture.componentInstance.source()).toContain('projet.webp');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('img'),
    ).toBeTruthy();
  });

  it('décrit la variante affichée dans le libellé', async () => {
    const fixture = await frame({ variant: 'phone' });

    expect(fixture.componentInstance.label()).toContain('Capture du projet');
    expect((fixture.nativeElement as HTMLElement).classList).toContain(
      'is-phone',
    );
  });

  it('ne propose rien à faire défiler quand la capture tient dans le cadre', async () => {
    const fixture = await frame();
    sizeScreen(fixture, { scrollHeight: 300, clientHeight: 300 });

    fixture.componentInstance.onImageLoad();

    expect(fixture.componentInstance.scrollable()).toBe(false);
    expect(fixture.componentInstance.hintVisible()).toBe(false);
  });

  it('invite à faire défiler une capture plus haute que le cadre', async () => {
    const fixture = await frame();
    sizeScreen(fixture, { scrollHeight: 2000, clientHeight: 300 });

    fixture.componentInstance.onImageLoad();

    expect(fixture.componentInstance.scrollable()).toBe(true);
    expect(fixture.componentInstance.hintVisible()).toBe(true);
    // Le libellé prévient un lecteur d'écran que le contenu continue plus bas.
    expect(fixture.componentInstance.label()).not.toBe('Capture du projet');
  });

  it('déroule la maquette quand le curseur entre dessus', async () => {
    const fixture = await frame();
    sizeScreen(fixture, { scrollHeight: 2000, clientHeight: 300 });
    fixture.componentInstance.onImageLoad();

    // Angular en programme lui-même pendant le rendu : seuls comptent les appels qui suivent.
    vi.mocked(requestAnimationFrame).mockClear();
    fixture.componentInstance.onEnter();

    expect(requestAnimationFrame).toHaveBeenCalled();
    expect(fixture.componentInstance.hintVisible()).toBe(false);
  });

  it('respecte le réglage de mouvement réduit', async () => {
    const fixture = await frame();
    const theme = fixture.debugElement.injector.get(ThemeService);
    theme.motion.set('reduced');
    sizeScreen(fixture, { scrollHeight: 2000, clientHeight: 300 });
    fixture.componentInstance.onImageLoad();

    vi.mocked(requestAnimationFrame).mockClear();
    fixture.componentInstance.onEnter();

    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('rend la main dès que le visiteur fait défiler lui-même', async () => {
    const fixture = await frame();
    sizeScreen(fixture, { scrollHeight: 2000, clientHeight: 300 });
    fixture.componentInstance.onImageLoad();
    fixture.componentInstance.onEnter();

    fixture.componentInstance.onUserScroll();

    expect(cancelAnimationFrame).toHaveBeenCalled();
    expect(fixture.componentInstance.hintVisible()).toBe(false);
  });

  it('remonte la maquette quand le curseur repart, sauf si le visiteur l’a prise en main', async () => {
    const fixture = await frame();
    const screen = sizeScreen(fixture, {
      scrollHeight: 2000,
      clientHeight: 300,
    });
    screen.scrollTo = vi.fn();
    fixture.componentInstance.onImageLoad();
    fixture.componentInstance.onEnter();

    fixture.componentInstance.onLeave();

    expect(screen.scrollTo).toHaveBeenCalled();
    expect(fixture.componentInstance.hintVisible()).toBe(true);

    fixture.componentInstance.onUserScroll();
    fixture.componentInstance.onLeave();

    // La maquette reste où le visiteur l'a laissée : un seul retour en haut, celui d'avant.
    expect(screen.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('avance image par image, puis se coupe une fois en bas', async () => {
    const fixture = await frame();
    const screen = sizeScreen(fixture, {
      scrollHeight: 2000,
      clientHeight: 300,
    });
    // jsdom ne fait pas défiler : on porte la position nous-mêmes.
    let scrollTop = 0;
    Object.defineProperty(screen, 'scrollTop', {
      get: () => scrollTop,
      set: (value: number) => (scrollTop = value),
      configurable: true,
    });
    fixture.componentInstance.onImageLoad();

    const steps: FrameRequestCallback[] = [];
    vi.mocked(requestAnimationFrame).mockImplementation(((
      callback: FrameRequestCallback,
    ) => {
      steps.push(callback);
      return steps.length;
    }) as typeof requestAnimationFrame);

    fixture.componentInstance.onEnter();
    steps.pop()?.(0);

    expect(scrollTop).toBeGreaterThan(0);
    expect(steps.length).toBe(1);

    // Arrivé en bas, le pas suivant ne redemande pas d'image.
    scrollTop = 1700;
    steps.pop()?.(0);

    expect(steps.length).toBe(0);
  });

  it('cesse d’avancer dès que le visiteur prend la main', async () => {
    const fixture = await frame();
    const screen = sizeScreen(fixture, {
      scrollHeight: 2000,
      clientHeight: 300,
    });
    Object.defineProperty(screen, 'scrollTop', { value: 0, writable: true });
    fixture.componentInstance.onImageLoad();

    const steps: FrameRequestCallback[] = [];
    vi.mocked(requestAnimationFrame).mockImplementation(((
      callback: FrameRequestCallback,
    ) => {
      steps.push(callback);
      return steps.length;
    }) as typeof requestAnimationFrame);

    fixture.componentInstance.onEnter();
    fixture.componentInstance.onUserScroll();
    steps.pop()?.(0);

    expect(steps.length).toBe(0);
  });

  it('arrête la boucle quand le composant disparaît', async () => {
    const fixture = await frame();
    sizeScreen(fixture, { scrollHeight: 2000, clientHeight: 300 });
    fixture.componentInstance.onImageLoad();
    fixture.componentInstance.onEnter();

    fixture.destroy();

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
