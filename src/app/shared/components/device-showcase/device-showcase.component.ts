import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { Project } from '../../../core/interfaces/project';
import { LanguageService } from '../../../core/services/language.service';
import { SITE_URL } from '../../data/profile';
import { DeviceFrameComponent } from '../device-frame/device-frame.component';

/** Seul projet sans lien « Visiter le site » : il est déjà la page courante. */
const SELF_SLUG = 'portfolio';

@Component({
  selector: 'app-device-showcase',
  imports: [DeviceFrameComponent],
  templateUrl: './device-showcase.component.html',
  styleUrl: './device-showcase.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-compact]': 'compact()' },
})
export class DeviceShowcaseComponent {
  readonly project = input.required<Project>();
  readonly compact = input(false, { transform: booleanAttribute });

  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;
  readonly tr = this.languageService.tr;

  readonly displayUrl = computed(() => {
    const project = this.project();
    const live =
      project.links.live ?? (project.slug === SELF_SLUG ? SITE_URL : undefined);

    if (!live) return `${project.slug}.local`;

    return live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  });
}
