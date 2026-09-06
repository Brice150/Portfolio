import { describe, expect, it } from 'vitest';
import { mount } from '../../../../testing/mount';
import { FlagComponent } from './flag.component';

describe('FlagComponent', () => {
  it('rend le drapeau français', async () => {
    const fixture = await mount(FlagComponent, { inputs: { lang: 'fr' } });

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('svg'),
    ).toBeTruthy();
  });

  it('rend le drapeau anglais', async () => {
    const fixture = await mount(FlagComponent, { inputs: { lang: 'en' } });

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('svg'),
    ).toBeTruthy();
  });
});
