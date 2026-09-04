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
});
