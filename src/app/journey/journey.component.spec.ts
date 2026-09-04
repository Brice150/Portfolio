import { describe, expect, it } from 'vitest';
import { milestones } from '../shared/data/journey';
import { mount } from '../../testing/mount';
import { JourneyComponent } from './journey.component';

describe('JourneyComponent', () => {
  it('affiche tous les jalons par défaut', async () => {
    const fixture = await mount(JourneyComponent);

    expect(fixture.componentInstance.visibleMilestones().length).toBe(milestones.length);
  });

  it('ne garde que les jalons de la nature filtrée', async () => {
    const fixture = await mount(JourneyComponent);

    fixture.componentInstance.setFilter('work');
    fixture.detectChanges();

    const visible = fixture.componentInstance.visibleMilestones();

    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((milestone) => milestone.kind === 'work')).toBe(true);
  });
});
