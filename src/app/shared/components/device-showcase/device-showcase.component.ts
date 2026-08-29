import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';
import { Project } from '../../../core/interfaces/project';
import { DeviceFrameComponent } from '../device-frame/device-frame.component';

/**
 * Présentation d'un projet dans une maquette d'ordinateur et une maquette de
 * téléphone, toutes deux réellement défilables.
 */
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
  /** Version resserrée, utilisée dans les cartes de la liste des projets. */
  readonly compact = input(false, { transform: booleanAttribute });

  readonly displayUrl = computed(() => {
    const live = this.project().links.live;
    if (!live) return `${this.project().slug}.local`;

    return live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  });
}
