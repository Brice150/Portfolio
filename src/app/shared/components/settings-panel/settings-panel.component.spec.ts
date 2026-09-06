import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ThemeService } from '../../../core/services/theme.service';
import { mount } from '../../../../testing/mount';
import { SettingsPanelComponent } from './settings-panel.component';

describe('SettingsPanelComponent', () => {
  it('bascule l’ouverture du panneau', async () => {
    const fixture = await mount(SettingsPanelComponent);

    fixture.componentInstance.toggle();
    fixture.detectChanges();
    expect(fixture.componentInstance.open()).toBe(true);

    fixture.componentInstance.close();
    fixture.detectChanges();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('relaie les préférences au service de thème', async () => {
    const fixture = await mount(SettingsPanelComponent);
    const theme = TestBed.inject(ThemeService);

    fixture.componentInstance.selectTheme('dark');
    fixture.componentInstance.selectAccent('emerald');
    fixture.componentInstance.toggleMotion();

    expect(theme.theme()).toBe('dark');
    expect(theme.accent()).toBe('emerald');
    expect(fixture.componentInstance.motionEnabled()).toBe(false);
  });

  it('referme sur Echap, et ne fait rien s il est deja ferme', async () => {
    const fixture = await mount(SettingsPanelComponent);

    fixture.componentInstance.onEscape();
    expect(fixture.componentInstance.open()).toBe(false);

    fixture.componentInstance.toggle();
    fixture.componentInstance.onEscape();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('reste ouvert sur un clic dans le panneau', async () => {
    const fixture = await mount(SettingsPanelComponent);
    fixture.componentInstance.toggle();
    // Le panneau reconnait les siens par la balise du selecteur, pas par l element hote que
    // TestBed lui donne : le clic est donc decrit tel que le document le porterait.
    const wrapper = document.createElement('app-settings-panel');
    const inside = document.createElement('button');
    wrapper.appendChild(inside);

    fixture.componentInstance.onDocumentClick({
      target: inside,
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(true);
  });

  it('referme sur un clic ailleurs dans la page', async () => {
    const fixture = await mount(SettingsPanelComponent);
    fixture.componentInstance.toggle();

    fixture.componentInstance.onDocumentClick({
      target: document.createElement('button'),
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ignore les clics tant que le panneau est ferme', async () => {
    const fixture = await mount(SettingsPanelComponent);

    fixture.componentInstance.onDocumentClick({
      target: document.createElement('button'),
    } as unknown as MouseEvent);

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('ecoute reellement le clavier et les clics du document', async () => {
    const fixture = await mount(SettingsPanelComponent);
    fixture.componentInstance.toggle();

    // Un vrai clic part toujours d'un élément, jamais du document lui-même.
    const elsewhere = document.createElement('button');
    document.body.appendChild(elsewhere);
    elsewhere.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.open()).toBe(false);
    elsewhere.remove();

    fixture.componentInstance.toggle();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('bascule le theme depuis le raccourci', async () => {
    const fixture = await mount(SettingsPanelComponent);
    const theme = TestBed.inject(ThemeService);
    fixture.componentInstance.selectTheme('light');

    fixture.componentInstance.quickToggle();

    expect(theme.theme()).not.toBe('light');
  });
});
