import { describe, expect, it } from 'vitest';
import { mount } from '../../../../testing/mount';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  it('rend le tracé associé au nom', async () => {
    const fixture = await mount(IconComponent, { inputs: { name: 'home' } });

    expect(fixture.componentInstance.icon().d).toBeTruthy();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('svg'),
    ).toBeTruthy();
  });

  it('reste décorative sans libellé', async () => {
    const fixture = await mount(IconComponent, { inputs: { name: 'home' } });
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');

    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });
});
