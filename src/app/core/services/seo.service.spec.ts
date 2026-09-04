import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { l } from '../i18n/lang';
import { LanguageService } from './language.service';
import { SeoService } from './seo.service';

const page = {
  title: l('Titre français', 'English title'),
  description: l('Description française', 'English description'),
  path: '/parcours',
};

beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  // jsdom annonce un navigateur anglophone : on fixe la langue attendue.
  TestBed.inject(LanguageService).setLang('fr');
});

describe('SeoService', () => {
  it('renseigne titre, description et partage social', () => {
    TestBed.inject(SeoService).setPage(page);

    expect(TestBed.inject(Title).getTitle()).toBe('Titre français');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(
      'Description française',
    );
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toContain('/parcours');
  });

  it('pose une canonique unique et un JSON-LD', () => {
    TestBed.inject(SeoService).setPage(page);

    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.getElementById('page-schema')?.textContent).toContain('WebPage');
  });

  it('exclut de l’index les pages marquées noindex', () => {
    TestBed.inject(SeoService).setPage({ ...page, noindex: true });

    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toContain('noindex');
  });

  it('suit la langue courante', () => {
    TestBed.inject(SeoService).setPage(page);
    TestBed.inject(LanguageService).setLang('en');
    TestBed.tick();

    expect(TestBed.inject(Title).getTitle()).toBe('English title');
  });
});
