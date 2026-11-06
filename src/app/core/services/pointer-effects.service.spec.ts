import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PointerEffectsService } from './pointer-effects.service';
import { ThemeService } from './theme.service';

describe('PointerEffectsService', () => {
  let frames: FrameRequestCallback[];
  let ambience: HTMLElement;
  let detach: () => void;

  const move = (target: Element, x: number, y: number, type = 'mouse') => {
    const event = new MouseEvent('pointermove', {
      clientX: x,
      clientY: y,
      bubbles: true,
    });
    Object.defineProperty(event, 'pointerType', { value: type });
    target.dispatchEvent(event);
  };

  const flush = (): void => {
    const pending = frames;
    frames = [];
    pending.forEach((frame) => frame(0));
  };

  beforeEach(() => {
    frames = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((frame) => {
      frames.push(frame);
      return frames.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(
      () => undefined,
    );
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500);

    ambience = document.createElement('div');
    document.body.append(ambience);

    detach = TestBed.inject(PointerEffectsService).attach(ambience);
    // Seules comptent les images demandées par le service, pas par Angular.
    frames = [];
  });

  afterEach(() => {
    detach();
    ambience.remove();
    vi.restoreAllMocks();
  });

  it('pose la position du curseur sur le fond, en fraction de l’écran', () => {
    move(document.body, 250, 400);
    flush();

    expect(ambience.style.getPropertyValue('--px')).toBe('0.2500');
    expect(ambience.style.getPropertyValue('--py')).toBe('0.8000');
  });

  it('regroupe les mouvements d’une même image', () => {
    move(document.body, 100, 100);
    move(document.body, 500, 250);

    expect(frames.length).toBe(1);
    flush();
    expect(ambience.style.getPropertyValue('--px')).toBe('0.5000');
  });

  it('ignore le doigt et les animations réduites', () => {
    TestBed.inject(ThemeService).motion.set('reduced');
    frames = [];
    move(document.body, 250, 400);
    expect(frames.length).toBe(0);

    TestBed.inject(ThemeService).motion.set('full');
    frames = [];
    move(document.body, 250, 400, 'touch');

    expect(frames.length).toBe(0);
  });

  it('cesse d’écouter une fois débranché', () => {
    detach();
    move(document.body, 250, 400);

    expect(frames.length).toBe(0);
  });
});
