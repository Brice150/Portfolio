import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeService } from './theme.service';

const inject = (): ThemeService => TestBed.inject(ThemeService);

beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
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
});
