import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { navItems, profile } from '../../data/profile';
import { IconComponent } from '../icon/icon.component';
import { CopyTextDirective } from '../../directives/copy-text.directive';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent, CopyTextDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly toastService = inject(ToastService);
  private readonly document = inject(DOCUMENT);

  readonly profile = profile;
  readonly navItems = navItems;
  readonly imagePath = environment.imagePath;
  readonly currentYear = new Date().getFullYear();

  /** Remonte la page courante sans changer de route. */
  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    // L’utilisateur clavier ne doit pas rester coincé en bas du document.
    this.document.getElementById('haut-de-page')?.focus({ preventScroll: true });
  }

  onCvDownload(): void {
    this.toastService.success('CV téléchargé. Merci de votre intérêt !');
  }
}
