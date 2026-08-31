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
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

export type DeviceVariant = 'desktop' | 'phone';

const AUTO_SCROLL_SPEED = 0.7;

/** En deçà, faire défiler ne révélerait rien et secouerait l'image au survol. */
const MIN_SCROLLABLE = 48;

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
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly url = input<string>('');

  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');

  readonly t = this.languageService.t;

  private frameId = 0;
  private userTook = false;

  readonly imagePath = environment.imagePath;
  readonly hintVisible = signal(false);
  readonly scrollable = signal(false);

  readonly source = computed(() => `${this.imagePath}${this.src()}`);
  readonly label = computed(() => {
    const device = this.t().device;
    const view = this.variant() === 'phone' ? device.mobileView : device.desktopView;

    return this.scrollable()
      ? `${this.alt()}, ${view} ${device.scrollable}`
      : `${this.alt()}, ${view}`;
  });

  ngOnDestroy(): void {
    this.stop();
  }

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
