import { describe, expect, it } from 'vitest';
import { skillGroups } from '../shared/data/skills';
import { mount } from '../../testing/mount';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  it('affiche tous les groupes par défaut', async () => {
    const fixture = await mount(SkillsComponent);

    expect(fixture.componentInstance.visibleGroups().length).toBe(
      skillGroups.length,
    );
    expect(fixture.componentInstance.filters().length).toBe(
      skillGroups.length + 1,
    );
  });

  it('restreint la liste au groupe sélectionné', async () => {
    const fixture = await mount(SkillsComponent);

    fixture.componentInstance.selectGroup(skillGroups[0].id);
    fixture.detectChanges();

    expect(fixture.componentInstance.visibleGroups()).toEqual([skillGroups[0]]);
  });
});
