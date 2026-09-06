import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from '../../../core/services/toast.service';
import { mount, textOf } from '../../../../testing/mount';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('affiche l’année courante', async () => {
    const fixture = await mount(FooterComponent);

    expect(textOf(fixture)).toContain(String(new Date().getFullYear()));
  });

  it('signale le téléchargement du CV par un toast', async () => {
    const fixture = await mount(FooterComponent);
    const toastService = TestBed.inject(ToastService);

    fixture.componentInstance.onCvDownload();

    expect(toastService.toasts().length).toBe(1);
    expect(toastService.toasts()[0].tone).toBe('success');
  });

  it('remonte en haut et y ramène aussi le focus clavier', async () => {
    const scrollTo = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);

    const anchor = document.createElement('a');
    anchor.id = 'haut-de-page';
    anchor.tabIndex = -1;
    document.body.appendChild(anchor);

    const fixture = await mount(FooterComponent);
    fixture.componentInstance.scrollToTop();

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    // Sans cela, l'utilisateur clavier reste coincé en bas du document.
    expect(document.activeElement).toBe(anchor);

    anchor.remove();
  });
});

afterEach(() => vi.restoreAllMocks());
