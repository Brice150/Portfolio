import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';
import { Project } from '../../../core/interfaces/project';
import { SITE_URL } from '../../data/profile';
import { DeviceFrameComponent } from '../device-frame/device-frame.component';

/**
 * Le portfolio est le seul projet sans lien « Visiter le site » : il est déjà
 * la page courante. Sa maquette affiche donc l'adresse réelle du site plutôt
 * que le domaine local de repli.
 */
const SELF_SLUG = 'portfolio';

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
    const project = this.project();
    const live = project.links.live ?? (project.slug === SELF_SLUG ? SITE_URL : undefined);

    if (!live) return `${project.slug}.local`;

    return live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  });
}
