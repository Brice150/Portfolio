import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { LanguageService } from '../core/services/language.service';
import { agents } from '../shared/data/ai';
import { mount } from '../../testing/mount';
import { AiComponent } from './ai.component';

describe('AiComponent', () => {
  it('présente chaque agent de la chaîne, dans l’ordre', async () => {
    const fixture = await mount(AiComponent);
    const host = fixture.nativeElement as HTMLElement;
    const lang = TestBed.inject(LanguageService).lang();

    const titles = [...host.querySelectorAll('.agent h3')].map((title) =>
      title.textContent?.trim(),
    );

    expect(titles).toEqual(agents.map((agent) => agent.name[lang]));
  });

  it('encadre la chaîne entre le ticket et la validation humaine', async () => {
    const fixture = await mount(AiComponent);
    const steps = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.pipeline > li',
    );

    expect(steps.length).toBe(agents.length + 2);
    expect(steps[0].classList).toContain('node');
    expect(steps[steps.length - 1].classList).toContain('node--end');
  });

  it('renvoie vers le formulaire de contact', async () => {
    const fixture = await mount(AiComponent);
    const link = (fixture.nativeElement as HTMLElement).querySelector('.cta a');

    expect(link?.getAttribute('href')).toBe('/contact');
  });
});
