import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';

export const sliderAnimation = trigger('sliderAnimation', [
  transition(
    'HomePage => SkillsPage, SkillsPage => HistoryPage, HistoryPage => ProjectsPage, ProjectsPage => ContactPage',
    [
      style({ position: 'relative', overflow: 'hidden' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%' /* Assure que les enfants occupent toute la hauteur */,
        }),
      ]),
      query(':enter', [style({ transform: 'translateX(100%)', opacity: 0 })]),
      group([
        query(':leave', [
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(-100%)', opacity: 0 })
          ),
        ]),
        query(':enter', [
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(0)', opacity: 1 })
          ),
        ]),
      ]),
    ]
  ),
  transition(
    'ContactPage => ProjectsPage, ProjectsPage => HistoryPage, HistoryPage => SkillsPage, SkillsPage => HomePage',
    [
      style({ position: 'relative', overflow: 'hidden' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%' /* Assure que les enfants occupent toute la hauteur */,
        }),
      ]),
      query(':enter', [style({ transform: 'translateX(-100%)', opacity: 0 })]),
      group([
        query(':leave', [
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(100%)', opacity: 0 })
          ),
        ]),
        query(':enter', [
          animate(
            '300ms ease-out',
            style({ transform: 'translateX(0)', opacity: 1 })
          ),
        ]),
      ]),
    ]
  ),
]);
