import { describe, expect, it } from 'vitest';
import { milestones } from '../../data/journey';
import { mount } from '../../../../testing/mount';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  it('rend une entrée par jalon', async () => {
    const items = milestones.slice(0, 2);
    const fixture = await mount(TimelineComponent, {
      inputs: { milestones: items },
    });

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('li.entry')
        .length,
    ).toBe(items.length);
  });

  it('associe une icône et un libellé à chaque nature de jalon', async () => {
    const fixture = await mount(TimelineComponent, {
      inputs: { milestones: [] },
    });

    expect(fixture.componentInstance.iconFor('work')).toBe('briefcase');
    expect(fixture.componentInstance.labelFor('education')).toBeTruthy();
  });
});
