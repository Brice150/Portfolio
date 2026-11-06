import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../testing/mount';
import { ThemeService } from '../../core/services/theme.service';
import { TiltDirective } from './tilt.directive';

@Component({
  imports: [TiltDirective],
  template: '<div appTilt="10"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

const move = (
  element: HTMLElement,
  x: number,
  y: number,
  pointerType = 'mouse',
): void => {
  const event = new MouseEvent('pointermove', { clientX: x, clientY: y });
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  element.dispatchEvent(event);
};

const build = async (): Promise<HTMLElement> => {
  const fixture = await mount(HostComponent);
  const element = (fixture.nativeElement as HTMLElement).querySelector(
    'div',
  ) as HTMLElement;

  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 200,
    height: 100,
  } as DOMRect);

  return element;
};

afterEach(() => vi.restoreAllMocks());

describe('TiltDirective', () => {
  it('incline vers le curseur', async () => {
    const element = await build();

    // Coin bas droit : inclinaison maximale vers la droite et vers le bas.
    move(element, 200, 100);

    expect(element.style.getPropertyValue('--ry')).toBe('10.00deg');
    expect(element.style.getPropertyValue('--rx')).toBe('-10.00deg');
    expect(element.classList).toContain('is-tilting');
  });

  it('reste à plat au centre', async () => {
    const element = await build();

    move(element, 100, 50);

    expect(element.style.getPropertyValue('--ry')).toBe('0.00deg');
    expect(element.style.getPropertyValue('--rx')).toBe('0.00deg');
  });

  it('revient à plat quand le curseur s’en va', async () => {
    const element = await build();

    move(element, 200, 100);
    element.dispatchEvent(new MouseEvent('pointerleave'));

    expect(element.style.getPropertyValue('--ry')).toBe('');
    expect(element.classList).not.toContain('is-tilting');
  });

  it('ignore le doigt et les animations réduites', async () => {
    const element = await build();

    move(element, 200, 100, 'touch');
    expect(element.style.getPropertyValue('--ry')).toBe('');

    TestBed.inject(ThemeService).motion.set('reduced');
    move(element, 200, 100);
    expect(element.style.getPropertyValue('--ry')).toBe('');
  });
});
