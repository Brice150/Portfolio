import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../../testing/mount';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import {
  CommandPaletteComponent,
  matches,
  normalize,
} from './command-palette.component';

const key = (
  target: EventTarget,
  name: string,
  init: KeyboardEventInit = {},
): void => {
  target.dispatchEvent(
    new KeyboardEvent('keydown', { key: name, bubbles: true, ...init }),
  );
};

const build = async (): Promise<ComponentFixture<CommandPaletteComponent>> => {
  // jsdom n'implémente pas matchMedia, que le thème « système » interroge.
  vi.spyOn(ThemeService.prototype, 'resolved').mockReturnValue('dark');
  const fixture = await mount(CommandPaletteComponent);
  TestBed.inject(LanguageService).setLang('fr');
  await fixture.whenStable();
  return fixture;
};

const open = async (
  fixture: ComponentFixture<CommandPaletteComponent>,
): Promise<HTMLInputElement> => {
  TestBed.inject(CommandPaletteService).open();
  await fixture.whenStable();
  return (fixture.nativeElement as HTMLElement).querySelector(
    'input',
  ) as HTMLInputElement;
};

const search = async (
  fixture: ComponentFixture<CommandPaletteComponent>,
  input: HTMLInputElement,
  value: string,
): Promise<void> => {
  input.value = value;
  input.dispatchEvent(new Event('input'));
  await fixture.whenStable();
};

beforeAll(() => {
  // jsdom ne gère pas toujours le mode modal de <dialog>.
  const proto = HTMLDialogElement.prototype;
  proto.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  proto.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

afterEach(() => vi.restoreAllMocks());

describe('recherche de la palette', () => {
  it('ignore la casse et les accents', () => {
    expect(normalize('Compétences')).toBe('competences');
    expect(matches('Compétences La stack', 'COMPETENCES')).toBe(true);
  });

  it('exige chaque mot saisi, dans n’importe quel ordre', () => {
    expect(matches('Passer en thème sombre', 'sombre theme')).toBe(true);
    expect(matches('Passer en thème sombre', 'sombre clair')).toBe(false);
  });
});

describe('CommandPaletteComponent', () => {
  it('s’ouvre et se ferme avec Ctrl K', async () => {
    const fixture = await build();
    const palette = TestBed.inject(CommandPaletteService);

    key(document, 'k', { ctrlKey: true });
    await fixture.whenStable();
    expect(palette.isOpen()).toBe(true);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('dialog')?.open,
    ).toBe(true);

    key(document, 'k', { metaKey: true });
    await fixture.whenStable();
    expect(palette.isOpen()).toBe(false);
  });

  it('filtre les commandes et annonce l’option active', async () => {
    const fixture = await build();
    const input = await open(fixture);

    await search(fixture, input, 'life');

    const options = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '[role="option"]',
    );
    expect(options.length).toBe(1);
    expect(options[0].textContent).toContain('Life Rise');
    expect(input.getAttribute('aria-activedescendant')).toBe(options[0].id);
  });

  it('indique l’absence de résultat', async () => {
    const fixture = await build();
    const input = await open(fixture);

    await search(fixture, input, 'zzzz');

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Aucun résultat',
    );
  });

  it('parcourt la liste aux flèches, en boucle', async () => {
    const fixture = await build();
    const input = await open(fixture);
    const component = fixture.componentInstance;

    key(input, 'ArrowUp');
    expect(component.activeIndex()).toBe(component.results().length - 1);

    key(input, 'ArrowDown');
    expect(component.activeIndex()).toBe(0);
  });

  it('exécute la commande active avec Entrée et se referme', async () => {
    const fixture = await build();
    const navigate = vi
      .spyOn(TestBed.inject(Router), 'navigateByUrl')
      .mockResolvedValue(true);
    const input = await open(fixture);

    await search(fixture, input, 'contact');
    key(input, 'Enter');
    await fixture.whenStable();

    expect(navigate).toHaveBeenCalledWith('/contact');
    expect(TestBed.inject(CommandPaletteService).isOpen()).toBe(false);
  });

  it('bascule une préférence', async () => {
    const fixture = await build();
    const theme = TestBed.inject(ThemeService);
    const input = await open(fixture);

    await search(fixture, input, 'animations');
    key(input, 'Enter');

    expect(theme.motion()).toBe('reduced');
  });

  it('exécute une option au clic et se ferme au clic sur le voile', async () => {
    const fixture = await build();
    const navigate = vi
      .spyOn(TestBed.inject(Router), 'navigateByUrl')
      .mockResolvedValue(true);
    const palette = TestBed.inject(CommandPaletteService);
    const host = fixture.nativeElement as HTMLElement;
    const input = await open(fixture);

    await search(fixture, input, 'parcours');
    host.querySelector<HTMLElement>('.option-label')?.click();
    expect(navigate).toHaveBeenCalledWith('/parcours');
    expect(palette.isOpen()).toBe(false);

    const dialog = host.querySelector('dialog') as HTMLDialogElement;
    const field = await open(fixture);

    // Sélection du texte du champ relâchée dehors : la palette reste ouverte.
    field.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    dialog.click();
    expect(palette.isOpen()).toBe(true);

    dialog.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    dialog.click();
    expect(palette.isOpen()).toBe(false);
  });
});
