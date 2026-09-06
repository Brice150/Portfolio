import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { l } from '../i18n/lang';
import { LanguageService } from './language.service';

const inject = (): LanguageService => TestBed.inject(LanguageService);

const stubNavigatorLanguage = (value: string): void => {
  Object.defineProperty(navigator, 'language', {
    value,
    configurable: true,
  });
};

beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  Reflect.deleteProperty(navigator, 'language');
  vi.restoreAllMocks();
});

describe('LanguageService', () => {
  it('expose un dictionnaire complet pour chaque langue', () => {
    const service = inject();

    const french = service.t();
    service.setLang('en');
    const english = service.t();

    expect(Object.keys(english)).toEqual(Object.keys(french));
  });

  it('traduit une valeur localisée selon la langue courante', () => {
    const service = inject();
    const value = l('Accueil', 'Home');

    service.setLang('fr');
    expect(service.tr(value)).toBe('Accueil');

    service.setLang('en');
    expect(service.tr(value)).toBe('Home');
  });

  it('mémorise la langue choisie et la reporte sur le document', () => {
    const service = inject();

    service.setLang('en');
    TestBed.tick();

    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');
  });

  it('reprend la langue mémorisée à l’ouverture', () => {
    localStorage.setItem('portfolio-lang', 'en');

    expect(inject().lang()).toBe('en');
  });

  it('suit la langue du navigateur en l’absence de choix mémorisé', () => {
    stubNavigatorLanguage('en-GB');

    expect(inject().lang()).toBe('en');
  });

  it('retombe sur le français pour une langue non traduite', () => {
    stubNavigatorLanguage('de-DE');

    expect(inject().lang()).toBe('fr');
  });

  it('se rabat sur la langue du navigateur si le stockage est illisible', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('stockage refusé');
    });
    stubNavigatorLanguage('en-US');

    expect(inject().lang()).toBe('en');
  });

  it('survit à un stockage bloqué en écriture', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('stockage refusé');
    });

    const service = inject();
    service.setLang('en');

    expect(() => TestBed.tick()).not.toThrow();
    expect(service.lang()).toBe('en');
  });

  it('reste en français côté serveur, sans navigateur à interroger', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const service = inject();
    service.setLang('en');

    expect(() => TestBed.tick()).not.toThrow();
    expect(service.lang()).toBe('en');
  });
});
