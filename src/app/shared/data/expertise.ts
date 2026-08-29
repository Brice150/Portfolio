import { ServiceOffer } from '../../core/interfaces/content';

export const serviceOffers: ServiceOffer[] = [
  {
    id: 'produit',
    icon: 'rocket',
    title: 'Construire une application métier de zéro',
    pitch:
      'Un besoin fonctionnel clair, pas encore de socle technique. Poser l’architecture front et back, livrer vite les premiers écrans utilisables, puis étendre module par module.',
    deliverables: [
      'Architecture Angular par domaine, prête à accueillir plusieurs équipes',
      'API REST Java / Spring Boot et modèle de données relationnel',
      'Conventions de code, revues et pipeline de build dès le premier sprint',
      'Premiers écrans en production plutôt qu’une maquette parfaite',
    ],
  },
  {
    id: 'existant',
    icon: 'wrench',
    title: 'Reprendre et faire évoluer un existant',
    pitch:
      'Le cœur de mes 5 dernières années. Reprendre une base de code écrite par d’autres, comprendre les règles métier avant de les toucher, et livrer des évolutions sans casser ce qui tourne.',
    deliverables: [
      'Prise en main du domaine fonctionnel avant toute refonte',
      'Évolutions et corrections sur applications en production',
      'Migrations de versions Angular et remises à niveau techniques',
      'Réduction progressive de la dette, sans arrêter la livraison',
    ],
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: 'Reprendre la main sur les performances',
    pitch:
      'Des écrans qui se figent et des temps de réponse qui s’allongent, les utilisateurs le remarquent bien avant les nouvelles fonctionnalités. Identifier où le temps se perd réellement, côté navigateur comme côté base de données.',
    deliverables: [
      'Audit de chargement : bundle, lazy loading, rendu initial',
      'Passage en OnPush et assainissement de la détection de changement',
      'Analyse des requêtes coûteuses côté base de données',
      'Mise en place de SSR ou de prerendering quand c’est pertinent',
    ],
  },
  {
    id: 'accessibilite',
    icon: 'accessibility',
    title: 'Mettre une application publique en conformité',
    pitch:
      'Le RGAA s’impose à un nombre croissant d’acteurs, et le DSFR avec lui sur les projets de l’État. Rendre les composants existants utilisables au clavier, lisibles par un lecteur d’écran et correctement contrastés.',
    deliverables: [
      'Revue des parcours clavier et de l’ordre de tabulation',
      'Correction de la structure sémantique et des rôles ARIA',
      'Vérification des contrastes et des tailles de cible',
      'Intégration du Design Système de l’État sur les projets publics',
    ],
  },
];

export const collaboration = {
  title: 'Comment je travaille',
  points: [
    {
      icon: 'users' as const,
      title: 'Intégré à l’équipe, pas en silo',
      text: 'Daily, refinement, revues de code croisées, démonstrations client : je prends ma part des rituels et je m’adapte aux outils en place plutôt que d’imposer les miens.',
    },
    {
      icon: 'globe' as const,
      title: 'À l’aise en équipe répartie',
      text: '5 ans d’ESN sur des projets distribués : écrit soigné, décisions tracées, disponibilité réelle sur les plages communes. Le distanciel demande plus de rigueur, pas moins.',
    },
    {
      icon: 'clock' as const,
      title: 'Des engagements tenables',
      text: 'Estimer honnêtement, y compris quand la réponse est « plus long que prévu ». Sur mes missions, tenir les jalons annoncés a toujours primé sur l’effet d’annonce.',
    },
    {
      icon: 'book' as const,
      title: 'Ce que je laisse derrière moi',
      text: 'Une base de code qu’un autre développeur peut reprendre : conventions explicites, découpage lisible, décisions documentées. Quand je quitte une mission, l’équipe doit pouvoir continuer sans avoir à me rappeler.',
    },
  ],
};
