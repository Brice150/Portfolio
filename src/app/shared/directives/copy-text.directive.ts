import { DOCUMENT } from '@angular/common';
import { Directive, OnDestroy, inject, input, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ToastService } from '../../core/services/toast.service';

const FEEDBACK_DELAY = 2200;

@Directive({
  selector: '[appCopyText]',
  exportAs: 'appCopyText',
  host: {
    '(click)': 'copy()',
    '[class.is-copied]': 'copied()',
  },
})
export class CopyTextDirective implements OnDestroy {
  readonly appCopyText = input.required<string>();
  readonly appCopyLabel = input('');

  private readonly document = inject(DOCUMENT);
  private readonly toastService = inject(ToastService);
  private readonly languageService = inject(LanguageService);
  private timer?: ReturnType<typeof setTimeout>;

  readonly copied = signal(false);
  readonly failed = signal(false);

  async copy(): Promise<void> {
    const value = this.appCopyText();
    const messages = this.languageService.t().toast;

    try {
      await this.write(value);
      this.failed.set(false);
      this.copied.set(true);
      this.toastService.success(this.appCopyLabel() || messages.copied);
    } catch {
      this.copied.set(false);
      this.failed.set(true);
      this.toastService.error(messages.copyFailed);
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.copied.set(false);
      this.failed.set(false);
    }, FEEDBACK_DELAY);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private async write(value: string): Promise<void> {
    const view = this.document.defaultView;

    // `navigator.clipboard` rejette hors contexte sécurisé ou sans focus : on
    // tente, puis on retombe sur la méthode historique.
    if (view?.navigator.clipboard) {
      try {
        await view.navigator.clipboard.writeText(value);
        return;
      } catch {
        // On poursuit avec le repli ci-dessous.
      }
    }

    const field = this.document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    this.document.body.appendChild(field);
    field.select();

    const ok = this.document.execCommand('copy');
    field.remove();

    if (!ok) throw new Error('Copie refusée par le navigateur.');
  }
}
