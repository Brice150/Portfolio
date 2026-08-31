import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast-host',
  imports: [IconComponent],
  templateUrl: './toast-host.component.html',
  styleUrl: './toast-host.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHostComponent {
  private readonly toastService = inject(ToastService);

  readonly t = inject(LanguageService).t;
  readonly toasts = this.toastService.toasts;

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
