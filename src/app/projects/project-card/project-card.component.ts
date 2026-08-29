import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Project, ProjectStatus } from '../../core/interfaces/project';
import { IconComponent } from '../../shared/components/icon/icon.component';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'En ligne',
  archive: 'Démo vidéo',
  wip: 'En cours',
};

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, IconComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  /** Nombre maximum de technologies affichées sur la carte. */
  readonly stackLimit = input(4);

  readonly imagePath = environment.imagePath;

  readonly statusLabel = computed(() => STATUS_LABELS[this.project().status]);
  readonly visibleStack = computed(() => this.project().stack.slice(0, this.stackLimit()));
  readonly hiddenStackCount = computed(() =>
    Math.max(0, this.project().stack.length - this.stackLimit()),
  );
}
