import { describe, expect, it } from 'vitest';
import { projects } from '../shared/data/projects';
import { mount } from '../../testing/mount';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  it('liste les projets du plus récent au plus ancien', async () => {
    const fixture = await mount(ProjectsComponent);
    const listed = fixture.componentInstance.projects;

    expect(listed.length).toBe(projects.length);
    expect(listed[0].startYear).toBeGreaterThanOrEqual(
      listed[listed.length - 1].startYear,
    );
  });

  it('restreint la liste au projet sélectionné', async () => {
    const fixture = await mount(ProjectsComponent);
    const slug = fixture.componentInstance.projects[0].slug;

    fixture.componentInstance.selectProject(slug);
    fixture.detectChanges();

    expect(
      fixture.componentInstance
        .visibleProjects()
        .map((project) => project.slug),
    ).toEqual([slug]);
  });

  it('traduit chaque statut de projet', async () => {
    const fixture = await mount(ProjectsComponent);

    expect(fixture.componentInstance.statusLabel('live')).toBeTruthy();
    expect(fixture.componentInstance.statusLabel('archive')).toBeTruthy();
  });
});
