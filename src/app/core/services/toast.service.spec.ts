import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { ToastService } from './toast.service';

const inject = (): ToastService => TestBed.inject(ToastService);

beforeEach(() =>
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  }),
);

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
});
