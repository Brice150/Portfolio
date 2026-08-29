import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Milestone, MilestoneKind } from '../../../core/interface/experience';
import { IconName } from '../../../core/interface/icon';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';

const KIND_ICONS: Record<MilestoneKind, IconName> = {
  work: 'briefcase',
  education: 'graduation',
  certification: 'award',
  'turning-point': 'rocket',
};

const KIND_LABELS: Record<MilestoneKind, string> = {
  work: 'Expérience',
  education: 'Formation',
  certification: 'Certification',
  'turning-point': 'Tournant',
};

@Component({
  selector: 'app-timeline',
  imports: [IconComponent, RevealDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  readonly milestones = input.required<Milestone[]>();
  /** Version resserrée : résumé seul, sans la liste des réalisations. */
  readonly compact = input(false, { transform: booleanAttribute });

  readonly imagePath = environment.imagePath;

  iconFor(kind: MilestoneKind): IconName {
    return KIND_ICONS[kind];
  }

  labelFor(kind: MilestoneKind): string {
    return KIND_LABELS[kind];
  }
}
