import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
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
});
