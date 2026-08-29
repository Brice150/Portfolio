import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { AccentName, ThemeMode, ThemeService } from '../../core/services/theme.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-settings-panel',
  imports: [A11yModule, IconComponent],
  templateUrl: './settings-panel.component.html',
  styleUrl: './settings-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelComponent {
  private readonly themeService = inject(ThemeService);

  readonly open = signal(false);

  readonly theme = this.themeService.theme;
  readonly accent = this.themeService.accent;
  readonly motion = this.themeService.motion;
  readonly themeOptions = this.themeService.themeOptions;
  readonly accentOptions = this.themeService.accentOptions;

  readonly motionEnabled = computed(() => this.motion() === 'full');

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) return;

    const target = event.target as HTMLElement;
    if (!target.closest('app-settings-panel')) this.close();
  }

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  selectTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }

  selectAccent(accent: AccentName): void {
    this.themeService.setAccent(accent);
  }

  toggleMotion(): void {
    this.themeService.toggleMotion();
  }

  quickToggle(): void {
    this.themeService.toggleTheme();
  }
}
