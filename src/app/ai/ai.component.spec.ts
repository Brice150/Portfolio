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

    const titles = [...host.querySelectorAll('.agent .rail-title')].map(
      (title) => title.textContent?.trim(),
    );

    expect(titles).toEqual(agents.map((agent) => agent.name[lang]));
  });

  it('encadre la chaîne entre le ticket et la validation humaine', async () => {
    const fixture = await mount(AiComponent);
    const steps = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.rail > .rail-entry',
    );

    expect(steps.length).toBe(agents.length + 2);
  });
});
