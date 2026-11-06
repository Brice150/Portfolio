import { ComponentFixture } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../../testing/mount';
import {
  SCRAMBLE_DELAY,
  SCRAMBLE_STEP,
  ScrambleTextComponent,
} from './scramble-text.component';

const TEXT = 'Brice Lecomte';

describe('ScrambleTextComponent', () => {
  let frames: FrameRequestCallback[];

  const visible = (fixture: ComponentFixture<ScrambleTextComponent>) =>
    (fixture.nativeElement as HTMLElement)
      .querySelector('.glyphs')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();

  const runFrame = async (
    fixture: ComponentFixture<ScrambleTextComponent>,
    at: number,
  ): Promise<void> => {
    const pending = frames;
    frames = [];
    pending.forEach((frame) => frame(at));
    await fixture.whenStable();
  };

  beforeEach(() => {
    frames = [];
    vi.spyOn(performance, 'now').mockReturnValue(0);
    vi.stubGlobal('requestAnimationFrame', (frame: FrameRequestCallback) => {
      frames.push(frame);
      return frames.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('brouille les lettres puis les fixe une à une sur le texte final', async () => {
    const fixture = await mount(ScrambleTextComponent, {
      inputs: { text: TEXT },
    });
    await fixture.whenStable();

    expect(fixture.componentInstance.running()).toBe(true);

    await runFrame(fixture, SCRAMBLE_DELAY + SCRAMBLE_STEP * 2);
    const partial = visible(fixture) ?? '';
    // Les premières lettres sont fixées, le reste est encore brouillé.
    expect(partial.startsWith('Bri')).toBe(true);
    expect(fixture.componentInstance.scrambled().at(-1)).not.toBeNull();

    await runFrame(fixture, SCRAMBLE_DELAY + SCRAMBLE_STEP * TEXT.length);

    expect(fixture.componentInstance.running()).toBe(false);
    expect(visible(fixture)).toBe(TEXT);
  });

  it('expose une copie intacte aux aides techniques pendant l’effet', async () => {
    const fixture = await mount(ScrambleTextComponent, {
      inputs: { text: TEXT },
    });
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.sr-only')?.textContent).toBe(TEXT);
    expect(host.querySelector('.glyphs')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('affiche directement le texte quand les animations sont réduites', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('reduce'),
    }));

    const fixture = await mount(ScrambleTextComponent, {
      inputs: { text: TEXT },
    });
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    expect(fixture.componentInstance.running()).toBe(false);
    expect(visible(fixture)).toBe(TEXT);
    // Une seule occurrence du texte dans la page : rien en double pour le SEO.
    expect(host.querySelector('.sr-only')).toBeNull();
    expect(host.querySelector('.glyphs')?.hasAttribute('aria-hidden')).toBe(
      false,
    );
  });
});
