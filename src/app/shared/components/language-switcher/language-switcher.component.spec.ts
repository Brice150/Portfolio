import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { mount } from '../../../../testing/mount';
import { LanguageService } from '../../../core/services/language.service';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  /** Ouvre le menu et laisse le rendu se faire, les options n'existant qu'ouvertes. */
  async function opened(): Promise<
    ComponentFixture<LanguageSwitcherComponent>
  > {
    const fixture = await mount(LanguageSwitcherComponent);
    fixture.componentInstance.toggle();
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  function press(
    fixture: ComponentFixture<LanguageSwitcherComponent>,
    key: string,
  ): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key, cancelable: true });
    fixture.componentInstance.onKeydown(event);
    fixture.detectChanges();
    return event;
  }

  it('reflète l’ouverture du menu sur le déclencheur', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    fixture.componentInstance.toggle();
    fixture.detectChanges();

    const trigger = (fixture.nativeElement as HTMLElement).querySelector(
      '.trigger',
    );

    expect(fixture.componentInstance.open()).toBe(true);
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });

  it('change la langue et referme au choix d’une option', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    fixture.componentInstance.toggle();
    fixture.componentInstance.select('en');
    fixture.detectChanges();

    expect(TestBed.inject(LanguageService).lang()).toBe('en');
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('referme au deuxième appui sur le déclencheur', async () => {
    const fixture = await opened();

    fixture.componentInstance.toggle();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('reste ouvert sur un clic à l’intérieur du sélecteur', async () => {
    const fixture = await opened();
    // Le composant reconnaît les siens par la balise du sélecteur, pas par l'élément hôte que
    // TestBed lui donne : le clic est donc décrit tel que le document le porterait.
    const wrapper = document.createElement('app-language-switcher');
    const inside = document.createElement('button');
    wrapper.appendChild(inside);

    fixture.componentInstance.onDocumentClick({
      target: inside,
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('referme sur un clic ailleurs dans la page', async () => {
    const fixture = await opened();
    const outside = document.createElement('button');

    fixture.componentInstance.onDocumentClick({
      target: outside,
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ignore les clics tant que le menu est fermé', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    fixture.componentInstance.onDocumentClick({
      target: document.createElement('button'),
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ignore le clavier tant que le menu est fermé', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    const event = press(fixture, 'Escape');

    expect(fixture.componentInstance.open()).toBe(false);
    expect(event.defaultPrevented).toBe(false);
  });

  it('referme sur Échap', async () => {
    const fixture = await opened();

    press(fixture, 'Escape');

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ne piège pas le focus : Tab referme le menu', async () => {
    const fixture = await opened();

    press(fixture, 'Tab');

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('parcourt les options aux flèches, sans faire défiler la page', async () => {
    const fixture = await opened();

    const down = press(fixture, 'ArrowDown');
    expect(down.defaultPrevented).toBe(true);

    const up = press(fixture, 'ArrowUp');
    expect(up.defaultPrevented).toBe(true);

    // Le menu reste ouvert : les flèches déplacent le focus, elles ne valident rien.
    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('laisse passer une touche dont il n’a rien à faire', async () => {
    const fixture = await opened();

    const event = press(fixture, 'a');

    expect(event.defaultPrevented).toBe(false);
    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('rend la main au déclencheur après un choix', async () => {
    const fixture = await opened();

    fixture.componentInstance.select('en');
    fixture.detectChanges();

    const trigger = (fixture.nativeElement as HTMLElement).querySelector(
      '.trigger',
    );

    // Le focus ne doit pas retomber sur <body> : le clavier reprend là où il était.
    expect(document.activeElement).toBe(trigger);
  });

  it('ne fait rien de plus quand on referme un menu déjà fermé', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    expect(() =>
      fixture.componentInstance.close({ restoreFocus: true }),
    ).not.toThrow();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ne déplace aucun focus tant que les options ne sont pas rendues', async () => {
    const fixture = await mount(LanguageSwitcherComponent);
    // Ouvert dans l'état, mais pas encore dans le DOM : il n'y a rien à viser.
    fixture.componentInstance.toggle();

    expect(() => press(fixture, 'ArrowDown')).not.toThrow();
    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('repart de l’option courante quand le focus est ailleurs', async () => {
    const fixture = await opened();
    (document.activeElement as HTMLElement | null)?.blur();

    press(fixture, 'ArrowDown');
    await fixture.whenStable();

    const options = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[role="option"], .option',
    );

    expect([...options]).toContain(document.activeElement);
  });

  it('propose une option par langue disponible', async () => {
    const fixture = await opened();

    const options = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[role="option"], .option',
    );

    expect(options.length).toBe(fixture.componentInstance.locales.length);
  });
});
