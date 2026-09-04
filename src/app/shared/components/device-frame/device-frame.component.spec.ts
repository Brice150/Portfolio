import { describe, expect, it } from 'vitest';
import { mount } from '../../../../testing/mount';
import { DeviceFrameComponent } from './device-frame.component';

describe('DeviceFrameComponent', () => {
  it('préfixe la source par le chemin des images', async () => {
    const fixture = await mount(DeviceFrameComponent, {
      inputs: { src: 'projet.webp', alt: 'Capture du projet' },
    });

    expect(fixture.componentInstance.source()).toContain('projet.webp');
    expect((fixture.nativeElement as HTMLElement).querySelector('img')).toBeTruthy();
  });

  it('décrit la variante affichée dans le libellé', async () => {
    const fixture = await mount(DeviceFrameComponent, {
      inputs: { src: 'projet.webp', alt: 'Capture du projet', variant: 'phone' },
    });

    expect(fixture.componentInstance.label()).toContain('Capture du projet');
    expect((fixture.nativeElement as HTMLElement).classList).toContain('is-phone');
  });
});
