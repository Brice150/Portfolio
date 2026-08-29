import { Practice, SkillGroup } from '../interface/skill';

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'monitor',
    description:
      'Mon terrain principal. Angular depuis la version 12, suivi de près à chaque montée de version majeure : standalone components, signals, control flow, zoneless.',
    skills: [
      {
        name: 'Angular',
        level: 95,
        note: 'Architecture par features, lazy loading, standalone components, signals, formulaires réactifs typés, stratégie OnPush systématique, SSR et prerendering.',
      },
      {
        name: 'TypeScript',
        level: 92,
        note: 'Mode strict activé partout, types utilitaires, génériques, discriminated unions. Je considère un `any` comme une dette à justifier.',
      },
      {
        name: 'RxJS',
        level: 85,
        note: 'Composition d’opérateurs, gestion des désabonnements, debounce et switchMap sur les recherches, interopérabilité avec les signals.',
      },
      {
        name: 'HTML sémantique & CSS moderne',
        level: 90,
        note: 'Grid et flexbox, custom properties, container queries, clamp fluide, animations CSS. Un balisage juste avant tout artifice.',
      },
      {
        name: 'Angular Material & CDK',
        level: 88,
        note: 'Theming Material 3, tokens système, surcharge maîtrisée des composants, CDK pour l’overlay, le focus trap et la virtualisation.',
      },
      {
        name: 'Accessibilité (RGAA / WCAG)',
        level: 78,
        note: 'Parcours clavier complet, rôles ARIA quand le HTML ne suffit pas, contrastes vérifiés, respect de prefers-reduced-motion.',
      },
      {
        name: 'DSFR — Design Système de l’État',
        level: 75,
        note: 'Intégration du référentiel imposé aux services publics : composants, typographie, contrastes et motifs d’interaction conformes, sans réinventer ce qui existe.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description:
      'Java et Spring Boot au quotidien depuis 2021, sur des applications métier avec de vraies contraintes de volumétrie et de règles de gestion.',
    skills: [
      {
        name: 'Java',
        level: 88,
        note: 'Java 8 à 21, streams, Optional, records. Certification Java obtenue en 2021 au démarrage de la reconversion.',
      },
      {
        name: 'Spring Boot',
        level: 87,
        note: 'API REST, injection de dépendances, Spring Data JPA, Spring Security, validation, gestion centralisée des erreurs.',
      },
      {
        name: 'Conception d’API REST',
        level: 84,
        note: 'Ressources cohérentes, pagination, codes de statut justes, contrats stables et documentés entre front et back.',
      },
      {
        name: 'Hibernate / JPA',
        level: 80,
        note: 'Mapping relationnel, requêtes JPQL et natives, chasse aux N+1, choix explicite des stratégies de chargement.',
      },
      {
        name: 'Tests & qualité',
        level: 76,
        note: 'JUnit, Mockito, tests d’intégration sur les couches de service. Le test qui documente le comportement vaut le test qui couvre la ligne.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Données',
    icon: 'database',
    description:
      'Des bases relationnelles de production, avec des schémas hérités qu’il faut comprendre avant de vouloir les corriger.',
    skills: [
      {
        name: 'PostgreSQL',
        level: 82,
        note: 'Modélisation, index, jointures complexes, analyse de plans d’exécution pour lever les points de contention.',
      },
      {
        name: 'Oracle',
        level: 78,
        note: 'Environnements grands comptes, PL/SQL, procédures stockées existantes à faire évoluer sans casser l’historique.',
      },
      {
        name: 'Firebase',
        level: 75,
        note: 'Firestore, Authentication et Hosting sur mes projets personnels : le bon outil quand il faut livrer vite et seul.',
      },
    ],
  },
  {
    id: 'outils',
    title: 'Outils & méthodes',
    icon: 'wrench',
    description:
      'Ce qui entoure le code et qui, en équipe, compte souvent autant que le code lui-même.',
    skills: [
      {
        name: 'Git (GitHub, GitLab)',
        level: 90,
        note: 'Branches courtes, commits atomiques et lisibles, rebase propre avant merge, revues de code exigeantes mais bienveillantes.',
      },
      {
        name: 'IntelliJ IDEA & VS Code',
        level: 88,
        note: 'IntelliJ pour le Java, VS Code pour le front. Refactorings outillés plutôt que rechercher-remplacer.',
      },
      {
        name: 'CI/CD & déploiement',
        level: 72,
        note: 'Pipelines GitLab CI, builds automatisés, déploiement continu sur Firebase Hosting pour mes projets.',
      },
      {
        name: 'IA générative',
        level: 82,
        note: 'Usage quotidien pour explorer une piste, produire un squelette ou relire un diff. Prompts ciblés et contexte minimal pour maîtriser le coût en tokens ; aucune ligne livrée sans relecture.',
      },
      {
        name: 'Agilité',
        level: 80,
        note: 'Sprints, daily, refinement, démonstrations client. Estimer honnêtement et tenir les jalons annoncés.',
      },
    ],
  },
];

export const practices: Practice[] = [
  {
    icon: 'branch',
    title: 'Architecture par domaine',
    description:
      'Un dossier par feature, un `core` pour les services transverses, un `shared` pour les briques réutilisables. Les dépendances vont dans un seul sens.',
  },
  {
    icon: 'gauge',
    title: 'Rendu et chargement',
    description:
      'Routes en lazy loading, prerendering statique pour un premier rendu instantané, hydratation avec rejeu des évènements, images en WebP.',
  },
  {
    icon: 'code',
    title: 'Détection de changement maîtrisée',
    description:
      'OnPush sur tous les composants, état porté par des signals, application zoneless. Angular ne recalcule que ce qui a réellement changé.',
  },
  {
    icon: 'shield',
    title: 'Typage strict de bout en bout',
    description:
      'Interfaces partagées, formulaires réactifs typés, templates vérifiés strictement. Les erreurs se voient à la compilation, pas en production.',
  },
];
