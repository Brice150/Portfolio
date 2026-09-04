import { describe, expect, it } from 'vitest';
import { navItems } from '../../data/profile';
import { mount } from '../../../../testing/mount';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('rend un lien par entrée de navigation', async () => {
    const fixture = await mount(HeaderComponent);

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('nav a[href]').length,
    ).toBeGreaterThanOrEqual(navItems.length);
  });

  it('ouvre puis referme le menu mobile', async () => {
    const fixture = await mount(HeaderComponent);

    fixture.componentInstance.toggleMenu();
    expect(fixture.componentInstance.menuOpen()).toBe(true);

    fixture.componentInstance.onEscape();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('suit la progression de lecture au défilement', async () => {
    const fixture = await mount(HeaderComponent);

    fixture.componentInstance.onScroll();

    expect(fixture.componentInstance.progress()).toBeGreaterThanOrEqual(0);
    expect(fixture.componentInstance.scrolled()).toBe(false);
  });
});
