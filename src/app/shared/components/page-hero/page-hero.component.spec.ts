import { describe, expect, it } from 'vitest';
import { mount, textOf } from '../../../../testing/mount';
import { PageHeroComponent } from './page-hero.component';

describe('PageHeroComponent', () => {
  it('affiche le surtitre, le titre et le chapô', async () => {
    const fixture = await mount(PageHeroComponent, {
      inputs: {
        eyebrow: 'Parcours',
        heading: 'De l’aérospatial au web',
        lead: 'Un chapô',
      },
    });

    expect(textOf(fixture)).toContain('Parcours');
    expect(textOf(fixture)).toContain('De l’aérospatial au web');
    expect(textOf(fixture)).toContain('Un chapô');
  });
});
