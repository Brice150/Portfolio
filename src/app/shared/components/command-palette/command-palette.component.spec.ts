import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { mount } from '../../../../testing/mount';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ToastService } from '../../../core/services/toast.service';
import { profile } from '../../data/profile';
import {
  Command,
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

const build = async (
  resolved: 'light' | 'dark' = 'dark',
): Promise<ComponentFixture<CommandPaletteComponent>> => {
  // jsdom n'implémente pas matchMedia, que le thème « système » interroge.
  vi.spyOn(ThemeService.prototype, 'resolved').mockReturnValue(resolved);
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

describe('commandes de la palette', () => {
  const command = (
    fixture: ComponentFixture<CommandPaletteComponent>,
    id: string,
  ): Command => {
    const found = fixture.componentInstance
      .commands()
      .find((entry) => entry.id === id);
    if (!found) throw new Error(`Commande absente : ${id}`);
    return found;
  };

  const lastToast = () => TestBed.inject(ToastService).toasts().at(-1);

  const stubClipboard = (value: unknown): void => {
    Object.defineProperty(navigator, 'clipboard', {
      value,
      configurable: true,
    });
  };

  afterEach(() => Reflect.deleteProperty(navigator, 'clipboard'));

  it('ouvre la page d’un projet', async () => {
    const fixture = await build();
    const navigate = vi
      .spyOn(TestBed.inject(Router), 'navigateByUrl')
      .mockResolvedValue(true);

    command(fixture, 'project-life-rise').run();

    expect(navigate).toHaveBeenCalledWith('/projets/life-rise');
  });

  it('ouvre LinkedIn et GitHub dans un nouvel onglet', async () => {
    const fixture = await build();
    const open = vi.spyOn(window, 'open').mockReturnValue(null);

    command(fixture, 'linkedin').run();
    command(fixture, 'github').run();

    expect(open).toHaveBeenCalledWith(profile.linkedin, '_blank', 'noopener');
    expect(open).toHaveBeenCalledWith(profile.github, '_blank', 'noopener');
  });

  it('télécharge le CV de la langue affichée', async () => {
    const fixture = await build();
    let downloaded = '';
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        downloaded = this.download;
      });

    command(fixture, 'download-cv').run();

    expect(click).toHaveBeenCalled();
    expect(downloaded).toBe(profile.cvFileName.fr);
    expect(lastToast()?.tone).toBe('success');
  });

  it('copie l’adresse e-mail', async () => {
    const fixture = await build();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });

    command(fixture, 'copy-email').run();
    await fixture.whenStable();

    expect(writeText).toHaveBeenCalledWith(profile.email);
    expect(lastToast()?.tone).toBe('success');
  });

  it('signale une copie impossible', async () => {
    const fixture = await build();

    stubClipboard(undefined);
    command(fixture, 'copy-email').run();
    await fixture.whenStable();
    expect(lastToast()?.tone).toBe('error');

    stubClipboard({ writeText: vi.fn().mockRejectedValue(new Error('non')) });
    const count = TestBed.inject(ToastService).toasts().length;
    command(fixture, 'copy-email').run();
    await fixture.whenStable();
    expect(TestBed.inject(ToastService).toasts().length).toBe(count + 1);
    expect(lastToast()?.tone).toBe('error');
  });

  it('propose le thème opposé au thème affiché', async () => {
    const dark = await build('dark');
    const toggle = vi.spyOn(TestBed.inject(ThemeService), 'toggleTheme');
    expect(command(dark, 'theme').label).toBe('Passer en thème clair');
    command(dark, 'theme').run();
    expect(toggle).toHaveBeenCalled();

    TestBed.resetTestingModule();
    vi.restoreAllMocks();
    const light = await build('light');
    expect(command(light, 'theme').label).toBe('Passer en thème sombre');
  });

  it('change la langue, le niveau d’animation et l’accent', async () => {
    const fixture = await build();
    const theme = TestBed.inject(ThemeService);
    const language = TestBed.inject(LanguageService);

    expect(command(fixture, 'motion').label).toBe('Réduire les animations');
    command(fixture, 'motion').run();
    expect(theme.motion()).toBe('reduced');
    expect(command(fixture, 'motion').label).toBe('Activer les animations');

    command(fixture, 'accent-violet').run();
    expect(theme.accent()).toBe('violet');

    command(fixture, 'lang-en').run();
    expect(language.lang()).toBe('en');
  });
});

describe('clavier de la palette', () => {
  it('va au début et à la fin avec Ctrl Début et Ctrl Fin seulement', async () => {
    const fixture = await build();
    const input = await open(fixture);
    const component = fixture.componentInstance;
    const last = component.results().length - 1;

    key(input, 'End');
    expect(component.activeIndex()).toBe(0);
    key(input, 'End', { ctrlKey: true });
    expect(component.activeIndex()).toBe(last);

    key(input, 'Home');
    expect(component.activeIndex()).toBe(last);
    key(input, 'Home', { ctrlKey: true });
    expect(component.activeIndex()).toBe(0);

    key(input, 'a');
    expect(component.activeIndex()).toBe(0);
  });

  it('ne fait rien au clavier sans résultat', async () => {
    const fixture = await build();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    const input = await open(fixture);
    const component = fixture.componentInstance;

    await search(fixture, input, 'zzzz');
    for (const name of ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter']) {
      key(input, name, { ctrlKey: true });
    }

    expect(component.activeIndex()).toBe(0);
    expect(navigate).not.toHaveBeenCalled();
    expect(TestBed.inject(CommandPaletteService).isOpen()).toBe(true);
  });

  it('fait défiler la liste jusqu’à l’option active', async () => {
    const scroll = vi.fn();
    Element.prototype.scrollIntoView = scroll;
    const fixture = await build();
    const input = await open(fixture);

    key(input, 'ArrowDown');
    await fixture.whenStable();
    expect(scroll).toHaveBeenCalledWith({ block: 'nearest' });

    // Sans option active, rien à faire défiler.
    scroll.mockClear();
    await search(fixture, input, 'zzzz');
    fixture.componentInstance.setActive(0);
    await fixture.whenStable();
    expect(scroll).not.toHaveBeenCalled();
  });
});
