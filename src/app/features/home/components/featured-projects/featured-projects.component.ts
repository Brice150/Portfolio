import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { featuredProjects } from '../../../../core/data/projects';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ProjectCardComponent } from '../../../projects/components/project-card/project-card.component';

@Component({
  selector: 'app-featured-projects',
  imports: [
    RouterLink,
    IconComponent,
    SectionHeaderComponent,
    ProjectCardComponent,
    RevealDirective,
  ],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjectsComponent {
  readonly projects = featuredProjects();
}
