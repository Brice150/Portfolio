import { describe, expect, it } from 'vitest';
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
});
