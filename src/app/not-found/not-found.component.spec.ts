import { Meta } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { navItems } from '../shared/data/profile';
import { mount } from '../../testing/mount';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('propose les entrées de navigation comme porte de sortie', async () => {
    const fixture = await mount(NotFoundComponent);

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('a[href]').length,
    ).toBeGreaterThanOrEqual(navItems.length);
  });

  it('se retire de l’indexation', async () => {
    await mount(NotFoundComponent);

    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toContain('noindex');
  });
});
