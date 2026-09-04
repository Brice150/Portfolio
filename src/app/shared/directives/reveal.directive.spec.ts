import { ChangeDetectionStrategy, Component } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { mount } from '../../../testing/mount';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: '<p [appReveal]="240">Contenu</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('RevealDirective', () => {
  it('marque l’élément et reporte le délai en style', async () => {
    const fixture = await mount(HostComponent);
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.hasAttribute('data-reveal')).toBe(true);
    expect(paragraph?.style.getPropertyValue('--reveal-delay')).toBe('240ms');
  });

  it('révèle immédiatement sans IntersectionObserver', async () => {
    const fixture = await mount(HostComponent);
    await fixture.whenStable();

    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.classList.contains('is-revealed')).toBe(true);
  });
});
