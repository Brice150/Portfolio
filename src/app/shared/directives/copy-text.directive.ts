import { DOCUMENT } from '@angular/common';
import { Directive, OnDestroy, inject, input, signal } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

/** Durée d'affichage de la confirmation, en millisecondes. */
const FEEDBACK_DELAY = 2200;

/**
 * Copie une valeur dans le presse-papier au clic, plutôt que d'ouvrir un
 * client mail. Le retour visuel est laissé à l'hôte, qui lit `copied()` :
 *
 * ```html
 * <button type="button" [appCopyText]="email" #copy="appCopyText">
 *   {{ copy.copied() ? 'Adresse copiée' : email }}
 * </button>
 * ```
 */
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
  /** Libellé annoncé dans la notification de confirmation. */
  readonly appCopyLabel = input('Copié dans le presse-papier');

  private readonly document = inject(DOCUMENT);
  private readonly toastService = inject(ToastService);
  private timer?: ReturnType<typeof setTimeout>;

  readonly copied = signal(false);
  /** Vrai lorsque le presse-papier est refusé par le navigateur. */
  readonly failed = signal(false);

  async copy(): Promise<void> {
    const value = this.appCopyText();

    try {
      await this.write(value);
      this.failed.set(false);
      this.copied.set(true);
      this.toastService.success(this.appCopyLabel());
    } catch {
      this.copied.set(false);
      this.failed.set(true);
      this.toastService.error('Copie impossible. Sélectionnez le texte pour le copier à la main.');
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

    // L'API moderne existe mais rejette dans plusieurs cas courants : document
    // sans focus, contexte non sécurisé, permission refusée. On tente d'abord,
    // puis on retombe sur la méthode historique plutôt que d'abandonner.
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
