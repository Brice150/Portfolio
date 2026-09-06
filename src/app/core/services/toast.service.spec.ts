import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from './toast.service';

const inject = (): ToastService => TestBed.inject(ToastService);

beforeEach(() =>
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  }),
);

afterEach(() => vi.useRealTimers());

describe('ToastService', () => {
  it('associe une icône à chaque tonalité', () => {
    const service = inject();

    service.success('ok');
    service.error('ko');

    expect(service.toasts().map((toast) => toast.icon)).toEqual([
      'check',
      'alert',
    ]);
  });

  it('ne conserve que les trois derniers messages', () => {
    const service = inject();

    for (const message of ['un', 'deux', 'trois', 'quatre'])
      service.show(message);

    expect(service.toasts().map((toast) => toast.message)).toEqual([
      'deux',
      'trois',
      'quatre',
    ]);
  });

  it('retire le message demandé', () => {
    const service = inject();

    service.show('un');
    service.dismiss(service.toasts()[0].id);

    expect(service.toasts()).toEqual([]);
  });

  it('retire le message de lui-même au bout de son délai', () => {
    vi.useFakeTimers();
    const service = inject();

    service.show('un');
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(4000);

    expect(service.toasts()).toEqual([]);
  });

  it('n’affiche rien côté serveur, faute de quelqu’un pour le lire', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const service = inject();
    service.show('un');

    expect(service.toasts()).toEqual([]);
  });
});
