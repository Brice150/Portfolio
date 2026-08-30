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
 * En deçà de ce débordement, la capture tient presque entièrement dans le
 * cadre : la faire défiler ne révélerait rien et produirait surtout une
 * secousse au survol. Le défilement et son invite sont alors désactivés.
 */
const MIN_SCROLLABLE = 48;

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
  readonly hintVisible = signal(false);
  /** Faux tant que la capture tient dans le cadre : le défilement est alors inutile. */
  readonly scrollable = signal(false);

  readonly source = computed(() => `${this.imagePath}${this.src()}`);
  readonly label = computed(() => {
    const vue = this.variant() === 'phone' ? 'aperçu mobile' : 'aperçu bureau';

    return this.scrollable() ? `${this.alt()}, ${vue} défilable` : `${this.alt()}, ${vue}`;
  });

  ngOnDestroy(): void {
    this.stop();
  }

  /** La hauteur réelle de la capture n’est connue qu’une fois l’image chargée. */
  onImageLoad(): void {
    this.measure();
    this.hintVisible.set(this.scrollable());
  }

  onEnter(): void {
    // La largeur du cadre a pu changer depuis le chargement de l’image.
    this.measure();

    if (this.themeService.motion() === 'reduced' || !this.scrollable()) return;

    this.userTook = false;
    this.start();
  }

  onLeave(): void {
    this.stop();

    if (this.userTook || !this.scrollable()) return;

    this.screen().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.hintVisible.set(true);
  }

  /** Une action explicite de l'utilisateur interrompt le défilement auto. */
  onUserScroll(): void {
    this.userTook = true;
    this.stop();
    this.hintVisible.set(false);
  }

  private measure(): void {
    const element = this.screen().nativeElement;

    this.scrollable.set(element.scrollHeight - element.clientHeight >= MIN_SCROLLABLE);
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
