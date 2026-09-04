import { describe, expect, it } from 'vitest';
import { projects } from '../../data/projects';
import { mount } from '../../../../testing/mount';
import { DeviceShowcaseComponent } from './device-showcase.component';

describe('DeviceShowcaseComponent', () => {
  it('affiche les deux cadres du projet', async () => {
    const fixture = await mount(DeviceShowcaseComponent, { inputs: { project: projects[0] } });

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('app-device-frame').length,
    ).toBe(2);
  });

  it('nettoie le protocole et la barre finale de l’URL affichée', async () => {
    const project = { ...projects[0], links: { live: 'https://exemple.fr/' } };
    const fixture = await mount(DeviceShowcaseComponent, { inputs: { project } });

    expect(fixture.componentInstance.displayUrl()).toBe('exemple.fr');
  });
});
