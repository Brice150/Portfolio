import { describe, expect, it } from 'vitest';
import { projects, projectsByDate } from '../../shared/data/projects';
import { mount, textOf } from '../../../testing/mount';
import { ProjectDetailComponent } from './project-detail.component';

const slug = projects[0].slug;

describe('ProjectDetailComponent', () => {
  it('résout le projet à partir du slug de la route', async () => {
    const fixture = await mount(ProjectDetailComponent, { inputs: { slug } });

    expect(fixture.componentInstance.project()?.slug).toBe(slug);
    expect(textOf(fixture)).toContain(
      fixture.componentInstance.tr(projects[0].name),
    );
  });

  it('propose au moins un projet voisin', async () => {
    const fixture = await mount(ProjectDetailComponent, { inputs: { slug } });
    const { previousProject, nextProject } = fixture.componentInstance;

    expect(previousProject() ?? nextProject()).toBeTruthy();
  });

  it('redirige vers la page 404 quand le slug est inconnu', async () => {
    const fixture = await mount(ProjectDetailComponent, {
      inputs: { slug: 'projet-inexistant' },
      routes: [{ path: 'not-found', children: [] }],
    });

    expect(fixture.componentInstance.project()).toBeUndefined();
    expect(fixture.componentInstance.previousProject()).toBeUndefined();
    expect(fixture.componentInstance.nextProject()).toBeUndefined();
  });

  it('n’annonce pas de précédent sur le projet le plus récent', async () => {
    const ordered = projectsByDate();
    const fixture = await mount(ProjectDetailComponent, {
      inputs: { slug: ordered[0].slug },
    });

    expect(fixture.componentInstance.previousProject()).toBeUndefined();
    expect(fixture.componentInstance.nextProject()?.slug).toBe(ordered[1].slug);
  });

  it('n’annonce pas de suivant sur le projet le plus ancien', async () => {
    const ordered = projectsByDate();
    const last = ordered[ordered.length - 1];
    const fixture = await mount(ProjectDetailComponent, {
      inputs: { slug: last.slug },
    });

    expect(fixture.componentInstance.nextProject()).toBeUndefined();
    expect(fixture.componentInstance.previousProject()?.slug).toBe(
      ordered[ordered.length - 2].slug,
    );
  });
});
