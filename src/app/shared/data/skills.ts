import { Practice, SkillGroup } from '../../core/interfaces/skill';

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'monitor',
    description:
      'Mon terrain principal, suivi à chaque montée de version majeure d’Angular : standalone components, signals, zoneless.',
    skills: [
      {
        name: 'Angular',
        level: 95,
        note: 'Versions 12 à 21. Architecture par features, lazy loading, signals, formulaires réactifs typés, SSR et prerendering.',
      },
      {
        name: 'TypeScript',
        level: 92,
        note: 'Le typage qui attrape les erreurs avant la production. Mode strict partout, génériques, types utilitaires.',
      },
      {
        name: 'RxJS',
        level: 85,
        note: 'Pour tout ce qui arrive de façon asynchrone. Composition d’opérateurs, switchMap et debounce sur les recherches, désabonnements maîtrisés.',
      },
      {
        name: 'HTML sémantique & CSS moderne',
        level: 90,
        note: 'Écrits à la main, sans framework CSS. Grid et flexbox, variables CSS, media queries. Le balisage avant l’artifice.',
      },
      {
        name: 'Angular Material & CDK',
        level: 88,
        note: 'Adapté à la charte du projet, jamais pris tel quel. Personnalisation du thème et des composants : formulaires, dialogs, menus, tableaux.',
      },
      {
        name: 'Accessibilité (RGAA / WCAG)',
        level: 78,
        note: 'Obligatoire sur les projets publics. Parcours clavier complet, rôles ARIA là où le HTML ne suffit pas, contrastes vérifiés, prefers-reduced-motion respecté.',
      },
      {
        name: 'DSFR — Design Système de l’État',
        level: 75,
        note: 'Le design system imposé aux sites de l’État. Composants, typographies et contrastes conformes, intégrés sans réécrire l’existant.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description:
      'Java et Spring Boot au quotidien depuis 2021, sur des applications métier aux vraies contraintes de volume et de règles de gestion.',
    skills: [
      {
        name: 'Java',
        level: 88,
        note: 'Versions 8 à 21, streams, Optional, records. Certification obtenue en 2021, au démarrage de la reconversion.',
      },
      {
        name: 'Spring Boot',
        level: 87,
        note: 'Versions 2 à 4. Le cadre qui structure le back : API REST, Spring Data JPA, Spring Security, validation, gestion centralisée des erreurs.',
      },
      {
        name: 'Conception d’API REST',
        level: 84,
        note: 'Le contrat entre le front et le back. Ressources cohérentes, pagination, codes de statut justes, contrats documentés et stables.',
      },
      {
        name: 'Hibernate / JPA',
        level: 75,
        note: 'Le lien entre objets Java et tables SQL. Mapping relationnel, requêtes JPQL et natives, stratégies de chargement choisies plutôt que subies.',
      },
      {
        name: 'Tests & qualité',
        level: 82,
        note: 'JUnit, Mockito, tests d’intégration sur les couches de service. Le test qui documente le comportement prime sur la couverture de ligne.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Données',
    icon: 'database',
    description:
      'Des bases relationnelles en production, souvent héritées, qu’il faut comprendre avant de vouloir les corriger.',
    skills: [
      {
        name: 'PostgreSQL',
        level: 82,
        note: 'Modélisation, index, jointures complexes. Identification des requêtes coûteuses quand un écran ralentit.',
      },
      {
        name: 'Oracle',
        level: 72,
        note: 'Environnements grands comptes du secteur public. Requêtes et évolutions de schéma sur des bases déjà en production.',
      },
      {
        name: 'Firebase',
        level: 85,
        note: 'Firestore, Authentication et Hosting sur mes projets personnels. Le bon outil quand il faut livrer vite et seul.',
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
        note: 'Branches courtes, commits atomiques, rebase propre avant merge. Revues de code exigeantes et argumentées.',
      },
      {
        name: 'IntelliJ IDEA & VS Code',
        level: 88,
        note: 'IntelliJ pour le Java, VS Code pour le front. Refactorings outillés plutôt que rechercher-remplacer.',
      },
      {
        name: 'CI/CD & déploiement',
        level: 65,
        note: 'Pipelines GitLab CI, builds automatisés, déploiement continu sur Firebase Hosting.',
      },
      {
        name: 'IA générative',
        level: 82,
        note: 'Exploration, squelettes, relecture de diff. Prompts ciblés et contexte minimal pour maîtriser le coût en tokens, et rien n’est livré sans relecture.',
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
      'Routes en lazy loading, prerendering statique pour un premier rendu instantané, images en WebP.',
  },
  {
    icon: 'code',
    title: 'Détection de changement maîtrisée',
    description:
      'OnPush sur tous les composants, état porté par des signals, application zoneless. Mis en place sur ce site et repris sur les projets suivants.',
  },
  {
    icon: 'shield',
    title: 'Typage strict de bout en bout',
    description:
      'Interfaces partagées, formulaires réactifs typés, templates vérifiés strictement. Les erreurs se voient à la compilation, pas en production.',
  },
];
