import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from '../../core/services/toast.service';
import { mount } from '../../../testing/mount';
import { CopyTextDirective } from './copy-text.directive';

@Component({
  imports: [CopyTextDirective],
  template:
    '<button type="button" appCopyText="contact@exemple.fr">Copier</button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const stubClipboard = (writeText: () => Promise<void>): void => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
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
    Object.defineProperty(document, 'execCommand', {
      value: () => false,
      configurable: true,
    });

    const fixture = await mount(HostComponent);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();

    expect(TestBed.inject(ToastService).toasts()[0].tone).toBe('error');
  });

  it('retombe sur la méthode historique quand le presse-papier refuse', async () => {
    stubClipboard(() => Promise.reject(new Error('hors contexte sécurisé')));
    const execCommand = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      value: execCommand,
      configurable: true,
    });

    const fixture = await mount(HostComponent);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(TestBed.inject(ToastService).toasts()[0].tone).toBe('success');
    // Le champ technique ne doit pas rester dans le document.
    expect(document.querySelector('body > textarea')).toBeNull();
  });

  it('copie sans presse-papier disponible du tout', async () => {
    const execCommand = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      value: execCommand,
      configurable: true,
    });

    const fixture = await mount(HostComponent);
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(TestBed.inject(ToastService).toasts()[0].tone).toBe('success');
  });

  it('efface la confirmation visuelle après son délai', async () => {
    vi.useFakeTimers();
    stubClipboard(() => Promise.resolve());

    const fixture = await mount(HostComponent);
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    );
    const directive = fixture.debugElement
      .query((node) => node.name === 'button')
      .injector.get(CopyTextDirective);

    button?.click();
    await vi.runAllTimersAsync();

    expect(directive.copied()).toBe(false);
    expect(directive.failed()).toBe(false);
    vi.useRealTimers();
  });
});
