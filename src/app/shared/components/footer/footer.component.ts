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

  readonly profile = profile;
  readonly navItems = navItems;
  readonly imagePath = environment.imagePath;
  readonly currentYear = new Date().getFullYear();

  onCvDownload(): void {
    this.toastService.success('CV téléchargé. Merci de votre intérêt !');
  }
}
