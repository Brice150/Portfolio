import { ChangeDetectionStrategy, Component, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { profile, roleRotation, yearsOfExperience } from '../../shared/data/profile';
import { ThemeService } from '../../core/services/theme.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CopyTextDirective } from '../../shared/directives/copy-text.directive';

/** Durée d'affichage de chaque accroche, en millisecondes. */
const ROTATION_INTERVAL = 3200;

@Component({
  selector: 'app-hero',
  imports: [RouterLink, IconComponent, CopyTextDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnDestroy {
  readonly profile = profile;
  readonly rotation = roleRotation;
  readonly years = yearsOfExperience();
  readonly imagePath = environment.imagePath;

  readonly rotationIndex = signal(0);

  private readonly themeService = inject(ThemeService);
  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    // Uniquement dans le navigateur : aucun minuteur ne doit tourner au prerendering.
    afterNextRender(() => {
      if (this.themeService.motion() === 'reduced') return;

      this.timer = setInterval(() => {
        this.rotationIndex.update((index) => (index + 1) % this.rotation.length);
      }, ROTATION_INTERVAL);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
