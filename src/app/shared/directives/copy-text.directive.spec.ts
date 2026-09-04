import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from '../../core/services/toast.service';
import { mount } from '../../../testing/mount';
import { CopyTextDirective } from './copy-text.directive';

@Component({
  imports: [CopyTextDirective],
  template: '<button type="button" appCopyText="contact@exemple.fr">Copier</button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const stubClipboard = (writeText: () => Promise<void>): void => {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
};

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard');
  Reflect.deleteProperty(document, 'execCommand');
  vi.restoreAllMocks();
});

describe('CopyTextDirective', () => {
  it('copie la valeur et confirme par un toast', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    stubClipboard(writeText);

    const fixture = await mount(HostComponent);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();

    expect(writeText).toHaveBeenCalledWith('contact@exemple.fr');
    expect(TestBed.inject(ToastService).toasts()[0].tone).toBe('success');
  });

  it('signale l’échec quand aucun mécanisme de copie n’aboutit', async () => {
    stubClipboard(() => Promise.reject(new Error('refusé')));
    Object.defineProperty(document, 'execCommand', { value: () => false, configurable: true });

    const fixture = await mount(HostComponent);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();

    expect(TestBed.inject(ToastService).toasts()[0].tone).toBe('error');
  });
});
