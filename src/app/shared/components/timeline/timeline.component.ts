import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Milestone, MilestoneKind } from '../../../core/interfaces/experience';
import { IconName } from '../../../core/interfaces/icon';
import { Dictionary } from '../../../core/i18n/locales';
import { LanguageService } from '../../../core/services/language.service';
import { techLabel } from '../../data/tech';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';

const KIND_ICONS: Record<MilestoneKind, IconName> = {
  work: 'briefcase',
  education: 'graduation',
  certification: 'award',
  'turning-point': 'rocket',
};

type KindLabelKey = Extract<keyof Dictionary['timeline'], `kind${string}`>;

const KIND_LABELS: Record<MilestoneKind, KindLabelKey> = {
  work: 'kindWork',
  education: 'kindEducation',
  certification: 'kindCertification',
  'turning-point': 'kindTurningPoint',
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
  readonly compact = input(false, { transform: booleanAttribute });

  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;
  readonly tr = this.languageService.tr;
  readonly lang = this.languageService.lang;
  readonly techLabel = techLabel;

  readonly imagePath = environment.imagePath;

  iconFor(kind: MilestoneKind): IconName {
    return KIND_ICONS[kind];
  }

  labelFor(kind: MilestoneKind): string {
    return this.t().timeline[KIND_LABELS[kind]];
  }
}
