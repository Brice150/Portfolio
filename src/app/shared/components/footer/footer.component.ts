import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { navItems, profile } from '../../data/profile';
import { IconComponent } from '../icon/icon.component';
import { CopyTextDirective } from '../../directives/copy-text.directive';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent, CopyTextDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly profile = profile;
  readonly navItems = navItems;
  readonly imagePath = environment.imagePath;
  readonly currentYear = new Date().getFullYear();
}
