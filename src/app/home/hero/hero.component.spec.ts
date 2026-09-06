import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { mount, textOf } from '../../../testing/mount';
import { HeroComponent } from './hero.component';

/** Doit suivre `ROTATION_INTERVAL` dans le composant. */
const ROTATION_INTERVAL = 3200;

/**
 * La rotation démarre dans un `afterNextRender` : plutôt que d'avancer une
 * horloge factice posée trop tard, on récupère le rappel passé à `setInterval`.
 * Les autres minuteurs de la page suivent leur cours.
 */
const captureRotation = (): (() => void) => {
  let tick: (() => void) | undefined;
  const real = globalThis.setInterval;

  vi.spyOn(globalThis, 'setInterval').mockImplementation(((
    callback: () => void,
    delay?: number,
  ) => {
    if (delay !== ROTATION_INTERVAL) return real(callback, delay);

    tick = callback;
    return 0 as unknown as ReturnType<typeof setInterval>;
  }) as typeof setInterval);

  return () => tick?.();
};

afterEach(() => vi.restoreAllMocks());

describe('HeroComponent', () => {
  it('affiche le nom et démarre la rotation au premier rôle', async () => {
    const fixture = await mount(HeroComponent);

    expect(textOf(fixture)).toContain('Brice');
    expect(fixture.componentInstance.rotationIndex()).toBe(0);
  });

  it('signale le téléchargement du CV par un toast', async () => {
    const fixture = await mount(HeroComponent);

    fixture.componentInstance.onCvDownload();

    expect(TestBed.inject(ToastService).toasts().length).toBe(1);
  });

  it('fait tourner les rôles en boucle', async () => {
    const tick = captureRotation();
    const fixture = await mount(HeroComponent);
    await fixture.whenStable();

    const { rotation, rotationIndex } = fixture.componentInstance;

    tick();
    expect(rotationIndex()).toBe(1);

    // Le dernier rôle ramène au premier plutôt que de sortir du tableau.
    for (let step = 1; step < rotation.length; step++) tick();
    expect(rotationIndex()).toBe(0);

    expect(() => fixture.destroy()).not.toThrow();
  });

  it('ne fait rien tourner quand le visiteur limite les animations', async () => {
    const setInterval = vi.spyOn(globalThis, 'setInterval');

    const fixture = await mount(HeroComponent, {
      providers: [
        { provide: ThemeService, useValue: { motion: signal('reduced') } },
      ],
    });
    await fixture.whenStable();

    expect(setInterval).not.toHaveBeenCalledWith(
      expect.anything(),
      ROTATION_INTERVAL,
    );
    expect(fixture.componentInstance.rotationIndex()).toBe(0);
  });
});
