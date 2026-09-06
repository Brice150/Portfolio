import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './theme.service';

const inject = (): ThemeService => TestBed.inject(ThemeService);

/** Le service lit `matchMedia`, que jsdom n'implémente pas. */
const stubColorScheme = (prefersLight: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({ matches: prefersLight }),
    configurable: true,
  });
};

const onServer = (): void => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      { provide: PLATFORM_ID, useValue: 'server' },
    ],
  });
};

beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  Reflect.deleteProperty(window, 'matchMedia');
  document.documentElement.removeAttribute('data-theme');
  vi.restoreAllMocks();
});

describe('ThemeService', () => {
  it('part des préférences par défaut', () => {
    const service = inject();

    expect(service.theme()).toBe('system');
    expect(service.accent()).toBe('azure');
    expect(service.motion()).toBe('full');
  });

  it('reporte thème et accent sur la racine du document', () => {
    const service = inject();

    service.setTheme('dark');
    service.setAccent('violet');
    TestBed.tick();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-accent')).toBe('violet');
  });

  it('bascule entre clair et sombre', () => {
    const service = inject();

    service.setTheme('dark');
    service.toggleTheme();

    expect(service.theme()).toBe('light');
  });

  it('bascule le niveau d’animation', () => {
    const service = inject();

    service.toggleMotion();

    expect(service.motion()).toBe('reduced');
  });

  it('reporte le niveau d’animation sur la racine du document', () => {
    const service = inject();

    service.toggleMotion();
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-motion')).toBe(
      'reduced',
    );

    service.toggleMotion();
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-motion')).toBe('full');
  });

  it('laisse la racine sans thème imposé en mode système', () => {
    const service = inject();

    service.setTheme('dark');
    TestBed.tick();
    service.setTheme('system');
    TestBed.tick();

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('suit la préférence du système quand aucun thème n’est imposé', () => {
    stubColorScheme(true);
    const service = inject();

    expect(service.resolved()).toBe('light');

    stubColorScheme(false);
    expect(service.resolved()).toBe('dark');
  });

  it('bascule depuis le mode système en partant du thème résolu', () => {
    stubColorScheme(true);
    const service = inject();

    service.toggleTheme();

    expect(service.theme()).toBe('dark');
  });

  it('reprend les préférences mémorisées à l’ouverture', () => {
    localStorage.setItem(
      'portfolio-preferences',
      JSON.stringify({ theme: 'light', accent: 'amber', motion: 'reduced' }),
    );

    const service = inject();

    expect(service.theme()).toBe('light');
    expect(service.accent()).toBe('amber');
    expect(service.motion()).toBe('reduced');
  });

  it('complète des préférences partielles par les valeurs par défaut', () => {
    localStorage.setItem(
      'portfolio-preferences',
      JSON.stringify({ theme: 'light' }),
    );

    const service = inject();

    expect(service.theme()).toBe('light');
    expect(service.accent()).toBe('azure');
    expect(service.motion()).toBe('full');
  });

  it('ignore des préférences illisibles et garde les valeurs par défaut', () => {
    localStorage.setItem('portfolio-preferences', 'ceci n’est pas du JSON');

    const service = inject();

    expect(service.theme()).toBe('system');
    expect(service.accent()).toBe('azure');
  });

  it('survit à un stockage bloqué', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('stockage refusé');
    });

    const service = inject();
    service.setTheme('dark');

    expect(() => TestBed.tick()).not.toThrow();
    expect(service.theme()).toBe('dark');
  });

  it('retient le thème sombre côté serveur, sans document à interroger', () => {
    onServer();
    const service = inject();

    expect(service.resolved()).toBe('dark');

    service.setTheme('light');

    expect(() => TestBed.tick()).not.toThrow();
  });
});
