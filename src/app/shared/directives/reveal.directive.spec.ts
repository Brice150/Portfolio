import { ChangeDetectionStrategy, Component } from '@angular/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../testing/mount';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: '<p [appReveal]="240">Contenu</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

@Component({
  imports: [RevealDirective],
  template: '<p appReveal="plus tard">Contenu</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InvalidDelayHostComponent {}

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

/** jsdom n'implémente pas `IntersectionObserver` : on le pose pour l'observer. */
const stubIntersectionObserver = (): {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  trigger: (entries: Partial<IntersectionObserverEntry>[]) => void;
} => {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  let callback: ObserverCallback = () => undefined;

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    value: class {
      constructor(received: ObserverCallback) {
        callback = received;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    },
    configurable: true,
  });

  return {
    observe,
    unobserve,
    disconnect,
    trigger: (entries) => callback(entries),
  };
};

afterEach(() => Reflect.deleteProperty(globalThis, 'IntersectionObserver'));

describe('RevealDirective', () => {
  it('marque l’élément et reporte le délai en style', async () => {
    const fixture = await mount(HostComponent);
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.hasAttribute('data-reveal')).toBe(true);
    expect(paragraph?.style.getPropertyValue('--reveal-delay')).toBe('240ms');
  });

  it('ramène un délai illisible à zéro', async () => {
    const fixture = await mount(InvalidDelayHostComponent);
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.style.getPropertyValue('--reveal-delay')).toBe('0ms');
  });

  it('révèle immédiatement sans IntersectionObserver', async () => {
    const fixture = await mount(HostComponent);
    await fixture.whenStable();

    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.classList.contains('is-revealed')).toBe(true);
  });

  it('révèle l’élément à son entrée dans le champ de vision', async () => {
    const observer = stubIntersectionObserver();

    const fixture = await mount(HostComponent);
    await fixture.whenStable();

    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.classList.contains('is-revealed')).toBe(false);
    expect(observer.observe).toHaveBeenCalledWith(paragraph);

    observer.trigger([{ isIntersecting: true, target: paragraph! }]);

    expect(paragraph?.classList.contains('is-revealed')).toBe(true);
    // Une fois révélé, l'élément n'a plus rien à dire à l'observateur.
    expect(observer.unobserve).toHaveBeenCalledWith(paragraph);
  });

  it('laisse masqué un élément encore hors du champ de vision', async () => {
    const observer = stubIntersectionObserver();

    const fixture = await mount(HostComponent);
    await fixture.whenStable();

    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    observer.trigger([{ isIntersecting: false, target: paragraph! }]);

    expect(paragraph?.classList.contains('is-revealed')).toBe(false);
    expect(observer.unobserve).not.toHaveBeenCalled();
  });

  it('coupe l’observation à la destruction', async () => {
    const observer = stubIntersectionObserver();

    const fixture = await mount(HostComponent);
    await fixture.whenStable();
    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalled();
  });
});
