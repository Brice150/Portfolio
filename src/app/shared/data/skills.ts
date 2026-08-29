import { Practice, SkillGroup } from '../../core/interfaces/skill';

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'monitor',
    description:
      'Tout ce que l’utilisateur voit et manipule dans son navigateur. Angular depuis sa version 12, suivi à chaque montée de version majeure : standalone components, signals, control flow, zoneless.',
    skills: [
      {
        name: 'Angular',
        level: 95,
        note: 'Le socle de toutes les interfaces que je livre : application découpée en modules chargés à la demande, pages pré-générées pour un affichage immédiat, état géré finement. Lazy loading, standalone components, signals, formulaires typés, OnPush, SSR.',
      },
      {
        name: 'TypeScript',
        level: 92,
        note: 'JavaScript avec un filet de sécurité : les erreurs de données apparaissent pendant l’écriture du code plutôt qu’en production. Mode strict partout, génériques, types utilitaires.',
      },
      {
        name: 'RxJS',
        level: 85,
        note: 'La bibliothèque qui met de l’ordre dans tout ce qui arrive de façon décalée : réponse du serveur, saisie clavier, clic. Composition d’opérateurs, recherche temporisée, désabonnements maîtrisés.',
      },
      {
        name: 'HTML sémantique & CSS moderne',
        level: 90,
        note: 'La structure et l’habillage des pages, écrits à la main. Un balisage qui décrit d’abord le sens du contenu, l’effet visuel ensuite. Grid, flexbox, variables CSS, container queries, animations.',
      },
      {
        name: 'Angular Material & CDK',
        level: 88,
        note: 'La bibliothèque de composants d’interface de Google, adaptée à la charte de chaque projet plutôt qu’utilisée telle quelle. Theming Material 3, surcharges maîtrisées, CDK pour l’overlay et le drag and drop.',
      },
      {
        name: 'Accessibilité (RGAA / WCAG)',
        level: 78,
        note: 'Rendre l’application utilisable par tous, y compris au clavier seul ou au lecteur d’écran — une obligation légale sur les projets publics. Parcours clavier, rôles ARIA, contrastes vérifiés, préférences de mouvement respectées.',
      },
      {
        name: 'DSFR — Design Système de l’État',
        level: 75,
        note: 'Le système de design imposé aux sites de l’État : composants, typographies et couleurs officiels, à intégrer sans les réinventer. Il garantit la cohérence avec les autres services publics.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description:
      'La partie invisible, celle qui calcule, vérifie et enregistre. Java et Spring Boot au quotidien depuis 2021, sur des applications métier aux vraies contraintes de volume et de règles de gestion.',
    skills: [
      {
        name: 'Java',
        level: 88,
        note: 'Le langage du serveur, référence des grands systèmes d’entreprise pour sa fiabilité. Versions 8 à 21, streams, Optional, records. Certification obtenue en 2021, au démarrage de la reconversion.',
      },
      {
        name: 'Spring Boot',
        level: 87,
        note: 'Le cadre qui structure une application Java : sécurité, accès aux données, exposition des services. API REST, Spring Data JPA, Spring Security, validation, gestion centralisée des erreurs.',
      },
      {
        name: 'Conception d’API REST',
        level: 84,
        note: 'Le contrat par lequel l’interface et le serveur se parlent : quelles données, sous quelle forme, quelle réponse en cas d’erreur. Ressources cohérentes, pagination, codes de statut justes, contrats documentés.',
      },
      {
        name: 'Hibernate / JPA',
        level: 75,
        note: 'Le pont entre le code Java et la base de données, qui évite d’écrire du SQL à la main partout. Mapping relationnel, requêtes JPQL et natives, stratégies de chargement choisies explicitement.',
      },
      {
        name: 'Tests & qualité',
        level: 82,
        note: 'Des vérifications automatiques rejouées à chaque modification, qui signalent une régression avant les utilisateurs. JUnit, Mockito, tests d’intégration sur les couches de service.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Données',
    icon: 'database',
    description:
      'Là où vivent les données de l’application. Des bases en production, souvent héritées, qu’il faut comprendre avant de vouloir les corriger.',
    skills: [
      {
        name: 'PostgreSQL',
        level: 82,
        note: 'La base de données relationnelle libre la plus répandue. Modélisation, index, jointures complexes, et analyse des requêtes lentes pour retrouver de la vitesse.',
      },
      {
        name: 'Oracle',
        level: 72,
        note: 'La base historique des grands comptes, rencontrée sur mes missions du secteur public. PL/SQL et procédures stockées existantes, à faire évoluer sans casser l’historique.',
      },
      {
        name: 'Firebase',
        level: 85,
        note: 'L’ensemble Google qui fournit base de données, authentification et hébergement clés en main. Firestore, Authentication et Hosting : le bon choix pour livrer vite et seul.',
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
        note: 'L’outil qui conserve l’historique du code et permet à plusieurs développeurs d’avancer sans se gêner. Branches courtes, commits lisibles, rebase propre avant fusion, revues de code.',
      },
      {
        name: 'IntelliJ IDEA & VS Code',
        level: 88,
        note: 'Les deux environnements dans lesquels j’écris : IntelliJ pour le Java, VS Code pour le front. Renommages et réorganisations outillés plutôt que rechercher-remplacer.',
      },
      {
        name: 'CI/CD & déploiement',
        level: 65,
        note: 'L’automatisation qui teste et met en ligne l’application à chaque modification, sans manipulation manuelle. Pipelines GitLab CI, builds automatisés, déploiement continu sur Firebase Hosting.',
      },
      {
        name: 'IA générative',
        level: 82,
        note: 'Un outil de travail quotidien : explorer une piste, produire un premier squelette, relire une modification. Prompts ciblés et contexte minimal pour en maîtriser le coût, aucune ligne livrée sans relecture.',
      },
      {
        name: 'Agilité',
        level: 80,
        note: 'La méthode d’organisation de toutes mes missions : livrer par cycles courts plutôt qu’en une seule fois. Sprints, daily, refinement, démonstrations client, estimations tenues.',
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
