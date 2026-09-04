import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { l } from '../i18n/lang';
import { LanguageService } from './language.service';

const inject = (): LanguageService => TestBed.inject(LanguageService);

beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
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
});
