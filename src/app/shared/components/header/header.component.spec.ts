import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { afterEach, describe, expect, it } from 'vitest';
import { navItems } from '../../data/profile';
import { mount } from '../../../../testing/mount';
import { HeaderComponent } from './header.component';

interface ScrollState {
  scrollY: number;
  innerHeight: number;
  scrollHeight: number;
}

/** jsdom fige la géométrie du document : on la pose pour l'occasion. */
const stubScroll = ({
  scrollY,
  innerHeight,
  scrollHeight,
}: ScrollState): void => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    configurable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: innerHeight,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  });
};

afterEach(() => {
  Reflect.deleteProperty(window, 'scrollY');
  Reflect.deleteProperty(window, 'innerHeight');
  Reflect.deleteProperty(document.documentElement, 'scrollHeight');
});

describe('HeaderComponent', () => {
  it('rend un lien par entrée de navigation', async () => {
    const fixture = await mount(HeaderComponent);

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('nav a[href]')
        .length,
    ).toBeGreaterThanOrEqual(navItems.length);
  });

  it('ouvre puis referme le menu mobile', async () => {
    const fixture = await mount(HeaderComponent);

    fixture.componentInstance.toggleMenu();
    expect(fixture.componentInstance.menuOpen()).toBe(true);

    fixture.componentInstance.onEscape();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('suit la progression de lecture au défilement', async () => {
    const fixture = await mount(HeaderComponent);

    fixture.componentInstance.onScroll();

    expect(fixture.componentInstance.progress()).toBeGreaterThanOrEqual(0);
    expect(fixture.componentInstance.scrolled()).toBe(false);
  });

  it('calcule la progression à partir de la hauteur restant à lire', async () => {
    const fixture = await mount(HeaderComponent);

    stubScroll({ scrollY: 500, innerHeight: 800, scrollHeight: 1800 });
    fixture.componentInstance.onScroll();

    // 500 parcourus sur 1000 réellement défilables.
    expect(fixture.componentInstance.progress()).toBe(50);
    expect(fixture.componentInstance.scrolled()).toBe(true);
  });

  it('plafonne la progression et supporte une page non défilable', async () => {
    const fixture = await mount(HeaderComponent);

    stubScroll({ scrollY: 4000, innerHeight: 800, scrollHeight: 1800 });
    fixture.componentInstance.onScroll();
    expect(fixture.componentInstance.progress()).toBe(100);

    stubScroll({ scrollY: 0, innerHeight: 800, scrollHeight: 800 });
    fixture.componentInstance.onScroll();
    expect(fixture.componentInstance.progress()).toBe(0);
  });

  it('referme le menu à chaque navigation', async () => {
    const fixture = await mount(HeaderComponent, {
      routes: [{ path: 'parcours', children: [] }],
    });

    fixture.componentInstance.toggleMenu();
    expect(fixture.componentInstance.menuOpen()).toBe(true);

    await TestBed.inject(Router).navigateByUrl('/parcours');
    await fixture.whenStable();

    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('écoute réellement le défilement et l’échappement du document', async () => {
    const fixture = await mount(HeaderComponent);
    fixture.componentInstance.toggleMenu();

    stubScroll({ scrollY: 900, innerHeight: 800, scrollHeight: 1800 });
    document.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    expect(fixture.componentInstance.scrolled()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('ne calcule rien sans fenêtre, au prerendering', async () => {
    const fixture = await mount(HeaderComponent);
    Object.defineProperty(document, 'defaultView', {
      value: null,
      configurable: true,
    });

    try {
      fixture.componentInstance.onScroll();
    } finally {
      Reflect.deleteProperty(document, 'defaultView');
    }

    expect(fixture.componentInstance.progress()).toBe(0);
    expect(fixture.componentInstance.scrolled()).toBe(false);
  });

  it('ignore la touche d’échappement quand le menu est déjà fermé', async () => {
    const fixture = await mount(HeaderComponent);

    fixture.componentInstance.onEscape();
    fixture.componentInstance.closeMenu();

    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });
});
