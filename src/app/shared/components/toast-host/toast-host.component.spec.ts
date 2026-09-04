import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ToastService } from '../../../core/services/toast.service';
import { mount, textOf } from '../../../../testing/mount';
import { ToastHostComponent } from './toast-host.component';

describe('ToastHostComponent', () => {
  it('affiche les toasts publiés puis les retire au clic', async () => {
    const fixture = await mount(ToastHostComponent);
    const host = fixture.nativeElement as HTMLElement;

    TestBed.inject(ToastService).success('Copié');
    fixture.detectChanges();

    expect(textOf(fixture)).toContain('Copié');

    host.querySelector<HTMLButtonElement>('.close')?.click();
    fixture.detectChanges();

    expect(host.querySelectorAll('.toast').length).toBe(0);
  });
});
