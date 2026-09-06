import { describe, expect, it } from 'vitest';
import { mount, textOf } from '../../../../testing/mount';
import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
  it('affiche le titre demandé', async () => {
    const fixture = await mount(SectionHeaderComponent, {
      inputs: { heading: 'Compétences' },
    });

    expect(textOf(fixture)).toContain('Compétences');
  });

  it('marque l’hôte quand la variante centrée est demandée', async () => {
    const fixture = await mount(SectionHeaderComponent, {
      inputs: { heading: 'Compétences', centered: true },
    });

    expect((fixture.nativeElement as HTMLElement).classList).toContain(
      'is-centered',
    );
  });
});
