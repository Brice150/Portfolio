import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

export type DeviceVariant = 'desktop' | 'phone';

/** Vitesse du défilement automatique, en pixels par frame. */
const AUTO_SCROLL_SPEED = 0.7;

/**
 * Maquette d'appareil dont l'écran défile réellement.
 *
 * Le défilement est natif (donc utilisable à la molette, au doigt et au
 * clavier) et se lance automatiquement au survol ou à la prise de focus.
 * Toute interaction de l'utilisateur reprend la main immédiatement.
 */
@Component({
  selector: 'app-device-frame',
  imports: [IconComponent],
  templateUrl: './device-frame.component.html',
  styleUrl: './device-frame.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-desktop]': 'variant() === "desktop"',
    '[class.is-phone]': 'variant() === "phone"',
  },
})
export class DeviceFrameComponent implements OnDestroy {
  readonly variant = input<DeviceVariant>('desktop');
  /** Chemin de la capture, relatif au dossier des images. */
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  /** Libellé de l'URL affichée dans la barre du navigateur simulé. */
  readonly url = input<string>('');

  private readonly themeService = inject(ThemeService);
  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');

  private frameId = 0;
  private userTook = false;

  readonly imagePath = environment.imagePath;
  readonly hintVisible = signal(true);

  readonly source = computed(() => `${this.imagePath}${this.src()}`);
  readonly label = computed(() =>
    this.variant() === 'phone'
      ? `${this.alt()} — aperçu mobile défilable`
      : `${this.alt()} — aperçu bureau défilable`,
  );

  ngOnDestroy(): void {
    this.stop();
  }

  onEnter(): void {
    if (this.themeService.motion() === 'reduced') return;

    this.userTook = false;
    this.start();
  }

  onLeave(): void {
    this.stop();

    if (this.userTook) return;

    this.screen().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.hintVisible.set(true);
  }

  /** Une action explicite de l'utilisateur interrompt le défilement auto. */
  onUserScroll(): void {
    this.userTook = true;
    this.stop();
    this.hintVisible.set(false);
  }

  private start(): void {
    this.stop();
    this.hintVisible.set(false);

    const element = this.screen().nativeElement;

    const step = (): void => {
      const max = element.scrollHeight - element.clientHeight;

      if (this.userTook || element.scrollTop >= max - 1) {
        this.frameId = 0;
        return;
      }

      element.scrollTop += AUTO_SCROLL_SPEED;
      this.frameId = requestAnimationFrame(step);
    };

    this.frameId = requestAnimationFrame(step);
  }

  private stop(): void {
    if (!this.frameId) return;

    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }
}
