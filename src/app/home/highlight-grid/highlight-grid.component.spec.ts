import { describe, expect, it } from 'vitest';
import { highlights } from '../../shared/data/profile';
import { mount } from '../../../testing/mount';
import { HighlightGridComponent } from './highlight-grid.component';

describe('HighlightGridComponent', () => {
  it('rend une carte par élément mis en avant', async () => {
    const fixture = await mount(HighlightGridComponent, { inputs: { items: highlights } });

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('app-icon').length).toBe(
      highlights.length,
    );
  });
});
