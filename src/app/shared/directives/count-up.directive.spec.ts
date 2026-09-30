import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../testing/mount';
import { ThemeService } from '../../core/services/theme.service';
import {
  COUNT_DELAY,
  COUNT_DURATION,
  CountUpDirective,
} from './count-up.directive';

@Component({
  imports: [CountUpDirective],
  template: '<p [appCountUp]="value()"></p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
  readonly value = signal('8 ans');
}

@Component({
  imports: [CountUpDirective],
  template: '<p appCountUp="Angular"></p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class WordHostComponent {}

describe('CountUpDirective', () => {
  let callbacks: IntersectionObserverCallback[];
  let frames: FrameRequestCallback[];
  const disconnect = vi.fn();

  const text = (fixture: ComponentFixture<HostComponent>): string =>
    (fixture.nativeElement as HTMLElement).querySelector('p')?.textContent ??
    '';

  // Les images deja demandees viennent d'Angular : seules comptent les
  // suivantes.
  const intersect = (isIntersecting: boolean): void => {
    frames = [];
    callbacks.forEach((callback) =>
      callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
  };

  const runFrames = async (
    fixture: ComponentFixture<HostComponent>,
    at: number,
  ): Promise<void> => {
    const pending = frames;
    frames = [];
    pending.forEach((frame) => frame(at));
    await fixture.whenStable();
  };

  const build = async (): Promise<ComponentFixture<HostComponent>> => {
    const fixture = await mount(HostComponent);
    await fixture.whenStable();
    return fixture;
  };

  beforeEach(() => {
    callbacks = [];
    frames = [];
    vi.spyOn(performance, 'now').mockReturnValue(0);
    vi.stubGlobal('requestAnimationFrame', (frame: FrameRequestCallback) => {
      frames.push(frame);
      return frames.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(next: IntersectionObserverCallback) {
          callbacks.push(next);
        }
        observe = vi.fn();
        disconnect = disconnect;
      },
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('repart de zéro en attendant d’être vue', async () => {
    const fixture = await build();

    expect(text(fixture)).toBe('0 ans');
  });

  it('ne compte pas hors de l’écran', async () => {
    const fixture = await build();

    intersect(false);

    expect(frames).toHaveLength(0);
    expect(text(fixture)).toBe('0 ans');
  });

  it('fait défiler le nombre jusqu’à la valeur complète', async () => {
    const fixture = await build();

    intersect(true);
    await runFrames(fixture, COUNT_DELAY + COUNT_DURATION / 2);
    const halfway = parseInt(text(fixture), 10);
    expect(halfway).toBeGreaterThan(0);
    expect(halfway).toBeLessThan(8);

    await runFrames(fixture, COUNT_DELAY + COUNT_DURATION);
    expect(text(fixture)).toBe('8 ans');
    expect(disconnect).toHaveBeenCalled();
  });

  it('suit un changement de langue, même pendant le défilement', async () => {
    const fixture = await build();

    fixture.componentInstance.value.set('8 years');
    await fixture.whenStable();

    expect(text(fixture)).toBe('0 years');
  });

  it('arrête le défilement à la destruction', async () => {
    const fixture = await build();

    fixture.destroy();

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('affiche la valeur complète quand les animations sont réduites', async () => {
    const fixture = await mount(HostComponent, {
      providers: [
        { provide: ThemeService, useValue: { motion: () => 'reduced' } },
      ],
    });
    await fixture.whenStable();

    expect(text(fixture)).toBe('8 ans');
  });

  it('respecte la préférence système', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));

    const fixture = await build();

    expect(text(fixture)).toBe('8 ans');
  });

  it('affiche la valeur complète sans IntersectionObserver', async () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    const fixture = await build();

    expect(text(fixture)).toBe('8 ans');
  });

  it('laisse telle quelle une valeur sans nombre', async () => {
    const fixture = await mount(WordHostComponent);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toBe('Angular');
    expect(callbacks).toHaveLength(0);
  });
});
