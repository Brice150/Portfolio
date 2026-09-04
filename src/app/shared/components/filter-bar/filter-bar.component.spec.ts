import { describe, expect, it } from 'vitest';
import { mount } from '../../../../testing/mount';
import { FilterBarComponent } from './filter-bar.component';

const options = [
  { value: 'all', label: 'Tout' },
  { value: 'work', label: 'Expérience' },
];

describe('FilterBarComponent', () => {
  it('marque l’option active via aria-pressed', async () => {
    const fixture = await mount(FilterBarComponent, {
      inputs: { options, active: 'work', label: 'Filtrer' },
    });

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');

    expect(buttons.length).toBe(2);
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('émet la valeur choisie au clic', async () => {
    const fixture = await mount(FilterBarComponent, {
      inputs: { options, active: 'all', label: 'Filtrer' },
    });

    let emitted = '';
    fixture.componentInstance.changed.subscribe((value) => (emitted = value));
    (fixture.nativeElement as HTMLElement).querySelectorAll('button')[1].click();

    expect(emitted).toBe('work');
  });
});
