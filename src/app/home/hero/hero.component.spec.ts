import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ToastService } from '../../core/services/toast.service';
import { mount, textOf } from '../../../testing/mount';
import { HeroComponent } from './hero.component';

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
});
