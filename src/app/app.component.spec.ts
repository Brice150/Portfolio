import { describe, expect, it, vi } from 'vitest';
import { PointerEffectsService } from './core/services/pointer-effects.service';
import { mount } from '../testing/mount';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('assemble l’entête, la zone de routage et le pied de page', async () => {
    const fixture = await mount(AppComponent);
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('app-header')).toBeTruthy();
    expect(host.querySelector('router-outlet')).toBeTruthy();
    expect(host.querySelector('app-footer')).toBeTruthy();
  });

  it('branche les effets du pointeur sur le fond et les débranche à la fin', async () => {
    const detach = vi.fn();
    const attach = vi
      .spyOn(PointerEffectsService.prototype, 'attach')
      .mockReturnValue(detach);

    const fixture = await mount(AppComponent);
    await fixture.whenStable();

    expect(attach).toHaveBeenCalledWith(
      (fixture.nativeElement as HTMLElement).querySelector('.ambience'),
    );

    fixture.destroy();
    expect(detach).toHaveBeenCalled();
    attach.mockRestore();
  });
});
