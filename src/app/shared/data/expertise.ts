import { Localized, l, ll } from '../../core/i18n/lang';
import { ServiceOffer } from '../../core/interfaces/content';
import { IconName } from '../../core/interfaces/icon';

export const serviceOffers: ServiceOffer[] = [
  {
    id: 'produit',
    icon: 'rocket',
    title: l(
      'Construire une application métier de zéro',
      'Building a business application from scratch',
    ),
    pitch: l(
      'Un besoin fonctionnel clair, pas encore de socle technique. Poser l’architecture front et back, livrer vite les premiers écrans utilisables, puis étendre module par module.',
      'A clear functional need, no technical foundation yet. Lay down the front-end and back-end architecture, ship the first usable screens quickly, then extend module by module.',
    ),
    deliverables: ll(
      [
        'Architecture Angular par domaine, prête à accueillir plusieurs équipes',
        'API REST Java / Spring Boot et modèle de données relationnel',
        'Conventions de code, revues et pipeline de build dès le premier sprint',
        'Premiers écrans en production plutôt qu’une maquette parfaite',
      ],
      [
        'Domain-driven Angular architecture, ready for several teams',
        'Java / Spring Boot REST API and relational data model',
        'Coding conventions, reviews and a build pipeline from the first sprint',
        'First screens in production rather than a perfect mock-up',
      ],
    ),
  },
  {
    id: 'existant',
    icon: 'wrench',
    title: l(
      'Reprendre et faire évoluer un existant',
      'Taking over and evolving an existing system',
    ),
    pitch: l(
      'Le cœur de mes 5 dernières années. Reprendre une base de code écrite par d’autres, comprendre les règles métier avant de les toucher, et livrer des évolutions sans casser ce qui tourne.',
      'The heart of my last 5 years. Take over a codebase written by others, understand the business rules before touching them, and ship changes without breaking what already runs.',
    ),
    deliverables: ll(
      [
        'Prise en main du domaine fonctionnel avant toute refonte',
        'Évolutions et corrections sur applications en production',
        'Migrations de versions Angular et remises à niveau techniques',
        'Réduction progressive de la dette, sans arrêter la livraison',
      ],
      [
        'Learning the business domain before any rewrite',
        'Enhancements and fixes on applications already in production',
        'Angular version migrations and technical catch-up work',
        'Gradual debt reduction, without stopping delivery',
      ],
    ),
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: l(
      'Reprendre la main sur les performances',
      'Getting performance back under control',
    ),
    pitch: l(
      'Des écrans qui se figent et des temps de réponse qui s’allongent, les utilisateurs le remarquent bien avant les nouvelles fonctionnalités. Identifier où le temps se perd réellement, côté navigateur comme côté base de données.',
      'Screens that freeze and response times that stretch out get noticed by users long before new features do. Find where the time is actually lost, in the browser as well as in the database.',
    ),
    deliverables: ll(
      [
        'Audit de chargement : bundle, lazy loading, rendu initial',
        'Passage en OnPush et assainissement de la détection de changement',
        'Analyse des requêtes coûteuses côté base de données',
        'Mise en place de SSR ou de prerendering quand c’est pertinent',
      ],
      [
        'Loading audit: bundle, lazy loading, initial render',
        'Move to OnPush and clean-up of change detection',
        'Analysis of expensive queries on the database side',
        'Introducing SSR or prerendering where it makes sense',
      ],
    ),
  },
  {
    id: 'accessibilite',
    icon: 'accessibility',
    title: l(
      'Mettre une application publique en conformité',
      'Bringing a public application into compliance',
    ),
    pitch: l(
      'Le RGAA s’impose à un nombre croissant d’acteurs, et le DSFR avec lui sur les projets de l’État. Rendre les composants existants utilisables au clavier, lisibles par un lecteur d’écran et correctement contrastés.',
      'French accessibility regulation applies to a growing number of organisations, and the State Design System comes with it on government projects. Make existing components keyboard-operable, screen-reader friendly and properly contrasted.',
    ),
    deliverables: ll(
      [
        'Revue des parcours clavier et de l’ordre de tabulation',
        'Correction de la structure sémantique et des rôles ARIA',
        'Vérification des contrastes et des tailles de cible',
        'Intégration du Design Système de l’État sur les projets publics',
      ],
      [
        'Review of keyboard journeys and tab order',
        'Fixes to semantic structure and ARIA roles',
        'Verification of contrast ratios and target sizes',
        'Integration of the French State Design System on public projects',
      ],
    ),
  },
];

export interface CollaborationPoint {
  icon: IconName;
  title: Localized;
  text: Localized;
}

export const collaboration: { title: Localized; points: CollaborationPoint[] } =
  {
    title: l('Comment je travaille', 'How I work'),
    points: [
      {
        icon: 'users',
        title: l(
          'Intégré à l’équipe, pas en silo',
          'Part of the team, not in a silo',
        ),
        text: l(
          'Daily, refinement, revues de code croisées, démonstrations client : je prends ma part des rituels et je m’adapte aux outils en place plutôt que d’imposer les miens.',
          'Daily stand-ups, refinement, peer code reviews, client demos: I take my share of the rituals and adapt to the tools already in place rather than imposing my own.',
        ),
      },
      {
        icon: 'globe',
        title: l(
          'À l’aise en équipe répartie',
          'Comfortable in a distributed team',
        ),
        text: l(
          '5 ans d’ESN sur des projets distribués : écrit soigné, décisions tracées, disponibilité réelle sur les plages communes. Le distanciel demande plus de rigueur, pas moins.',
          '5 years of consultancy on distributed projects: careful writing, decisions on record, genuine availability during shared hours. Remote work demands more rigour, not less.',
        ),
      },
      {
        icon: 'clock',
        title: l('Des engagements tenables', 'Commitments that hold'),
        text: l(
          'Estimer honnêtement, y compris quand la réponse est « plus long que prévu ». Sur mes missions, tenir les jalons annoncés a toujours primé sur l’effet d’annonce.',
          'Estimating honestly, including when the answer is “longer than expected”. On my assignments, meeting the milestones announced has always mattered more than the announcement itself.',
        ),
      },
      {
        icon: 'book',
        title: l('Ce que je laisse derrière moi', 'What I leave behind'),
        text: l(
          'Une base de code qu’un autre développeur peut reprendre : conventions explicites, découpage lisible, décisions documentées. Quand je quitte une mission, l’équipe doit pouvoir continuer sans avoir à me rappeler.',
          'A codebase another developer can pick up: explicit conventions, readable structure, documented decisions. When I leave an assignment, the team should be able to carry on without having to call me back.',
        ),
      },
    ],
  };
