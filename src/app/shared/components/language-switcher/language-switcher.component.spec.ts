import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { LanguageService } from '../../../core/services/language.service';
import { mount } from '../../../../testing/mount';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  it('reflète l’ouverture du menu sur le déclencheur', async () => {
    const fixture = await mount(LanguageSwitcherComponent);

    fixture.componentInstance.toggle();
    fixture.detectChanges();

    const trigger = (fixture.nativeElement as HTMLElement).querySelector('.trigger');

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
});
