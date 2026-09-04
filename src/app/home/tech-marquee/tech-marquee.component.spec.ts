import { describe, expect, it } from 'vitest';
import { mount } from '../../../testing/mount';
import { TechMarqueeComponent } from './tech-marquee.component';

describe('TechMarqueeComponent', () => {
  it('duplique la liste pour que le défilement boucle', async () => {
    const fixture = await mount(TechMarqueeComponent, {
      inputs: { items: ['Angular', 'Java'], label: 'Technologies' },
    });

    expect(fixture.componentInstance.loop()).toEqual(['Angular', 'Java', 'Angular', 'Java']);
  });
});
