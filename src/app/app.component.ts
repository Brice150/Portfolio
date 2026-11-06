import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { PointerEffectsService } from './core/services/pointer-effects.service';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastHostComponent } from './shared/components/toast-host/toast-host.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastHostComponent,
    CommandPaletteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly t = inject(LanguageService).t;

  private readonly ambience =
    viewChild.required<ElementRef<HTMLElement>>('ambience');

  constructor() {
    const pointerEffects = inject(PointerEffectsService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const detach = pointerEffects.attach(this.ambience().nativeElement);
      destroyRef.onDestroy(detach);
    });
  }
}
