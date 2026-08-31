import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { Lang } from '../../../core/i18n/lang';
import { LanguageService } from '../../../core/services/language.service';
import { IconComponent } from '../icon/icon.component';
import { FlagComponent } from '../flag/flag.component';

/** Popover fait main plutôt que l'overlay du CDK : l'entête pèse sur le bundle initial. */
@Component({
  selector: 'app-language-switcher',
  imports: [IconComponent, FlagComponent],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly options = viewChildren<ElementRef<HTMLButtonElement>>('option');

  readonly open = signal(false);

  readonly lang = this.languageService.lang;
  readonly locale = this.languageService.locale;
  readonly locales = this.languageService.locales;
  readonly t = this.languageService.t;
  readonly format = this.languageService.format;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) return;

    const target = event.target as HTMLElement;
    if (!target.closest('app-language-switcher')) this.close();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;

    switch (event.key) {
      case 'Escape':
        event.stopPropagation();
        this.close({ restoreFocus: true });
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Tab':
        // Un menu ne piège pas le focus : le quitter au clavier le referme.
        this.close();
        break;
      default:
        break;
    }
  }

  toggle(): void {
    this.open.update((value) => !value);

    if (this.open()) this.focusOption(this.selectedIndex());
  }

  close(options: { restoreFocus?: boolean } = {}): void {
    if (!this.open()) return;

    this.open.set(false);

    if (options.restoreFocus) {
      this.host.nativeElement.querySelector<HTMLButtonElement>('.trigger')?.focus();
    }
  }

  select(lang: Lang): void {
    this.languageService.setLang(lang);
    this.close({ restoreFocus: true });
  }

  private selectedIndex(): number {
    return Math.max(
      0,
      this.locales.findIndex((locale) => locale.code === this.lang()),
    );
  }

  private moveFocus(step: number): void {
    const options = this.options();
    if (!options.length) return;

    const active = options.findIndex(
      (option) => option.nativeElement === this.host.nativeElement.ownerDocument.activeElement,
    );
    const from = active === -1 ? this.selectedIndex() : active;

    this.focusOption((from + step + options.length) % options.length);
  }

  private focusOption(index: number): void {
    // `inert` n'est retiré qu'au rendu : viser avant laisserait le focus sur <body>.
    afterNextRender(() => this.options()[index]?.nativeElement.focus(), {
      injector: this.injector,
    });
  }
}
