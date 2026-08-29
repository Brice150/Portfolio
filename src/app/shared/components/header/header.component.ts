import { DOCUMENT } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { navItems, profile } from '../../data/profile';
import { IconComponent } from '../icon/icon.component';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, A11yModule, IconComponent, SettingsPanelComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'haut-de-page', tabindex: '-1' },
})
export class HeaderComponent {
  readonly navItems = navItems;
  readonly profile = profile;
  readonly imagePath = environment.imagePath;

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly progress = signal(0);

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  @HostListener('document:scroll')
  onScroll(): void {
    const view = this.document.defaultView;
    if (!view) return;

    const offset = view.scrollY;
    const height = this.document.documentElement.scrollHeight - view.innerHeight;

    this.scrolled.set(offset > 12);
    this.progress.set(height > 0 ? Math.min(100, (offset / height) * 100) : 0);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.lockScroll(this.menuOpen());
  }

  closeMenu(): void {
    if (!this.menuOpen()) return;

    this.menuOpen.set(false);
    this.lockScroll(false);
  }

  private lockScroll(locked: boolean): void {
    this.document.body.style.overflow = locked ? 'hidden' : '';
  }
}
