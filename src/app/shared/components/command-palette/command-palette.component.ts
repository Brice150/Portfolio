import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IconName } from '../../../core/interfaces/icon';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ToastService } from '../../../core/services/toast.service';
import { navItems, profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { IconComponent } from '../icon/icon.component';

type CommandGroup = 'navigation' | 'projects' | 'actions' | 'preferences';

export interface Command {
  id: string;
  group: CommandGroup;
  icon: IconName;
  label: string;
  hint?: string;
  run: () => void;
}

export interface CommandSection {
  group: CommandGroup;
  commands: { command: Command; index: number }[];
}

const GROUP_ORDER: CommandGroup[] = [
  'navigation',
  'projects',
  'actions',
  'preferences',
];

/** Minuscules sans accents : « compétences » se trouve en tapant « competences ». */
export const normalize = (value: string): string =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Chaque mot saisi doit apparaître dans le libellé, l'indice ou le groupe. */
export const matches = (haystack: string, query: string): boolean => {
  const text = normalize(haystack);
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
};

/**
 * Palette de commandes (Ctrl K / ⌘ K) : pages, projets, actions et
 * préférences au clavier. Bâtie sur <dialog> en modal : le navigateur gère
 * la couche supérieure, le piège du focus, Échap et le retour du focus.
 * La liste suit le motif combobox de l'ARIA : le focus reste dans le champ,
 * l'option active est annoncée par `aria-activedescendant`.
 */
@Component({
  selector: 'app-command-palette',
  imports: [IconComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class CommandPaletteComponent {
  private readonly palette = inject(CommandPaletteService);
  private readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly list = viewChild<ElementRef<HTMLElement>>('list');
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;
  readonly isOpen = this.palette.isOpen;

  readonly query = signal('');
  private pressedOutside = false;
  readonly activeIndex = signal(0);

  readonly commands = computed<Command[]>(() => {
    const t = this.t().palette;
    const tr = this.languageService.tr;
    const common = this.t().common;
    const lang = this.languageService.lang();

    const navigation: Command[] = navItems.map((item) => ({
      id: `nav-${item.path}`,
      group: 'navigation',
      icon: item.icon,
      label: tr(item.label),
      hint: tr(item.hint),
      run: () => this.navigate(item.path),
    }));

    const projectCommands: Command[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      group: 'projects',
      icon: 'briefcase',
      label: tr(project.name),
      hint: tr(project.tagline),
      run: () => this.navigate(`/projets/${project.slug}`),
    }));

    const actions: Command[] = [
      {
        id: 'copy-email',
        group: 'actions',
        icon: 'mail',
        label: common.copyEmail,
        hint: profile.email,
        run: () => void this.copyEmail(),
      },
      {
        id: 'download-cv',
        group: 'actions',
        icon: 'download',
        label: common.downloadCv,
        hint: 'PDF',
        run: () => this.downloadCv(),
      },
      {
        id: 'linkedin',
        group: 'actions',
        icon: 'linkedin',
        label: common.linkedinProfile,
        run: () => this.openExternal(profile.linkedin),
      },
      {
        id: 'github',
        group: 'actions',
        icon: 'github',
        label: common.githubProfile,
        run: () => this.openExternal(profile.github),
      },
    ];

    const dark = this.themeService.resolved() === 'dark';
    const reduced = this.themeService.motion() === 'reduced';
    const preferences: Command[] = [
      {
        id: 'theme',
        group: 'preferences',
        icon: dark ? 'sun' : 'moon',
        label: dark ? t.themeLight : t.themeDark,
        run: () => this.themeService.toggleTheme(),
      },
      ...this.languageService.locales
        .filter((locale) => locale.code !== lang)
        .map<Command>((locale) => ({
          id: `lang-${locale.code}`,
          group: 'preferences',
          icon: 'globe',
          label: this.format(t.lang, { label: locale.label }),
          run: () => this.languageService.setLang(locale.code),
        })),
      {
        id: 'motion',
        group: 'preferences',
        icon: 'motion',
        label: reduced ? t.motionOn : t.motionOff,
        run: () => this.themeService.toggleMotion(),
      },
      ...this.themeService.accentOptions
        .filter((option) => option.value !== this.themeService.accent())
        .map<Command>((option) => ({
          id: `accent-${option.value}`,
          group: 'preferences',
          icon: 'palette',
          label: this.format(t.accent, {
            label: this.t().theme[option.value],
          }),
          run: () => this.themeService.setAccent(option.value),
        })),
    ];

    return [...navigation, ...projectCommands, ...actions, ...preferences];
  });

  readonly results = computed<Command[]>(() => {
    const query = this.query().trim();
    const groups = this.t().palette;

    if (!query) return this.commands();

    return this.commands().filter((command) =>
      matches(
        `${command.label} ${command.hint ?? ''} ${groups[command.group]}`,
        query,
      ),
    );
  });

  /** Résultats regroupés, chacun avec sa position dans la liste à plat. */
  readonly sections = computed<CommandSection[]>(() => {
    const results = this.results();

    return GROUP_ORDER.map((group) => ({
      group,
      commands: results
        .map((command, index) => ({ command, index }))
        .filter(({ command }) => command.group === group),
    })).filter((section) => section.commands.length > 0);
  });

  readonly activeId = computed(() => {
    const command = this.results()[this.activeIndex()];
    return command ? `commande-${command.id}` : null;
  });

  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;

      if (this.isOpen() && !dialog.open) {
        this.query.set('');
        this.activeIndex.set(0);
        dialog.showModal();
        // Le contenu n'existe qu'une fois la palette ouverte : on attend son rendu.
        afterNextRender(() => this.input()?.nativeElement.focus(), {
          injector: this.injector,
        });
      } else if (!this.isOpen() && dialog.open) {
        dialog.close();
      }
    });
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.palette.toggle();
    }
  }

  /** Fermeture native (Échap, `dialog.close()`) : l'état suit. */
  onDialogClose(): void {
    this.palette.close();
  }

  /** Le clic ne ferme que s'il a aussi commencé hors du panneau (voir onClick). */
  onPointerDown(event: PointerEvent): void {
    this.pressedOutside = event.target === this.dialog().nativeElement;
  }

  /**
   * Clics délégués : sur une option, elle s'exécute ; hors du panneau (sur le
   * voile, la cible est alors la <dialog> elle-même), la palette se ferme.
   * Il faut que l'appui y ait aussi commencé : sélectionner le texte du champ
   * en relâchant dehors ne doit pas fermer. Au clavier, le champ de
   * recherche porte déjà toutes les interactions.
   */
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const pressedOutside = this.pressedOutside;
    this.pressedOutside = false;

    if (target === this.dialog().nativeElement) {
      if (pressedOutside) this.palette.close();
      return;
    }

    const option = target.closest<HTMLElement>('[role="option"]');
    const command = option && this.results()[Number(option.dataset['index'])];
    if (command) this.execute(command);
  }

  onInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(0);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.results().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (count) this.setActive((this.activeIndex() + 1) % count);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (count) this.setActive((this.activeIndex() - 1 + count) % count);
        break;
      case 'Home':
        if (count && event.ctrlKey) {
          event.preventDefault();
          this.setActive(0);
        }
        break;
      case 'End':
        if (count && event.ctrlKey) {
          event.preventDefault();
          this.setActive(count - 1);
        }
        break;
      case 'Enter': {
        event.preventDefault();
        const command = this.results()[this.activeIndex()];
        if (command) this.execute(command);
        break;
      }
      default:
        break;
    }
  }

  setActive(index: number): void {
    this.activeIndex.set(index);

    afterNextRender(
      () => {
        const id = this.activeId();
        if (!id) return;

        this.list()
          ?.nativeElement.querySelector(`#${CSS.escape(id)}`)
          ?.scrollIntoView({ block: 'nearest' });
      },
      { injector: this.injector },
    );
  }

  execute(command: Command): void {
    this.palette.close();
    command.run();
  }

  private navigate(path: string): void {
    void this.router.navigateByUrl(path);
  }

  private openExternal(url: string): void {
    this.document.defaultView?.open(url, '_blank', 'noopener');
  }

  private downloadCv(): void {
    const tr = this.languageService.tr;
    const link = this.document.createElement('a');
    link.href = tr(profile.cv);
    link.download = tr(profile.cvFileName);
    link.click();
    this.toastService.success(this.t().toast.cvDownloaded);
  }

  private async copyEmail(): Promise<void> {
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Presse-papier indisponible.');

      await clipboard.writeText(profile.email);
      this.toastService.success(this.t().common.emailCopied);
    } catch {
      this.toastService.error(this.t().toast.copyFailed);
    }
  }
}
