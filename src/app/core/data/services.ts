import { ServiceOffer } from '../interface/content';

export const serviceOffers: ServiceOffer[] = [
  {
    id: 'produit',
    icon: 'rocket',
    title: 'Construire une application métier de zéro',
    pitch:
      'Vous avez un besoin fonctionnel clair et pas encore de socle technique. Je pose l’architecture front et back, je livre les premiers écrans utilisables vite, puis j’étends module par module.',
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
      'C’est ce que j’ai fait pendant cinq ans. Reprendre une base de code écrite par d’autres, comprendre les règles métier avant de les toucher, et livrer des évolutions sans casser ce qui tourne.',
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
      'Une application qui rame fait fuir ses utilisateurs avant que la fonctionnalité ne compte. J’identifie où le temps se perd réellement, côté navigateur comme côté base de données.',
    deliverables: [
      'Audit de chargement : bundle, lazy loading, rendu initial',
      'Passage en OnPush et assainissement de la détection de changement',
      'Analyse des requêtes coûteuses et des N+1 côté back',
      'Mise en place de SSR ou de prerendering quand c’est pertinent',
    ],
  },
  {
    id: 'accessibilite',
    icon: 'accessibility',
    title: 'Mettre une application en conformité',
    pitch:
      'Le RGAA n’est plus optionnel pour un grand nombre d’acteurs. Je reprends les composants existants pour les rendre utilisables au clavier, lisibles par un lecteur d’écran et correctement contrastés.',
    deliverables: [
      'Revue des parcours clavier et de l’ordre de tabulation',
      'Correction de la structure sémantique et des rôles ARIA',
      'Vérification des contrastes et des tailles de cible',
      'Respect des préférences système, dont la réduction de mouvement',
    ],
  },
];

export const collaboration = {
  title: 'Comment je travaille',
  points: [
    {
      icon: 'globe' as const,
      title: 'Full remote, ancré à Rennes',
      text: 'Je cherche une mission parisienne en télétravail complet. Cinq ans d’ESN m’ont appris à travailler avec des équipes réparties : rituels tenus, écrit soigné, disponibilité réelle sur les plages communes.',
    },
    {
      icon: 'users' as const,
      title: 'Intégré à votre équipe',
      text: 'Je ne travaille pas en silo. Daily, refinement, revues de code croisées, démonstrations client : je prends ma part des rituels et je m’adapte à vos outils plutôt que d’imposer les miens.',
    },
    {
      icon: 'clock' as const,
      title: 'Des engagements tenables',
      text: 'J’estime honnêtement, y compris quand la réponse est « plus long que prévu ». Sur mes trois missions, tenir les jalons annoncés a toujours primé sur l’effet d’annonce.',
    },
    {
      icon: 'book' as const,
      title: 'Ce que je laisse derrière moi',
      text: 'Une base de code qu’un autre développeur peut reprendre : conventions explicites, découpage lisible, décisions documentées. Une mission réussie est une mission dont on peut partir.',
    },
  ],
};
