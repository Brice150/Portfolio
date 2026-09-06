import { l } from '../../core/i18n/lang';
import { Practice, SkillGroup } from '../../core/interfaces/skill';

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: l('Frontend', 'Frontend'),
    icon: 'monitor',
    description: l(
      'Mon terrain principal, suivi à chaque montée de version majeure d’Angular : standalone components, signals, zoneless.',
      'My main ground, followed through every major Angular release: standalone components, signals, zoneless.',
    ),
    skills: [
      {
        name: l('Angular', 'Angular'),
        level: 95,
        note: l(
          'Versions 12 à 21. Architecture par features, lazy loading, signals, formulaires réactifs typés, SSR et prerendering.',
          'Versions 12 to 21. Feature-based architecture, lazy loading, signals, typed reactive forms, SSR and prerendering.',
        ),
      },
      {
        name: l('TypeScript', 'TypeScript'),
        level: 92,
        note: l(
          'Le typage qui attrape les erreurs avant la production. Mode strict partout, génériques, types utilitaires.',
          'The typing that catches errors before production. Strict mode everywhere, generics, utility types.',
        ),
      },
      {
        name: l('RxJS', 'RxJS'),
        level: 85,
        note: l(
          'Pour tout ce qui arrive de façon asynchrone. Composition d’opérateurs, switchMap et debounce sur les recherches, désabonnements maîtrisés.',
          'For everything that arrives asynchronously. Operator composition, switchMap and debounce on searches, unsubscriptions under control.',
        ),
      },
      {
        name: l('HTML sémantique & CSS moderne', 'Semantic HTML & modern CSS'),
        level: 90,
        note: l(
          'Écrits à la main, sans framework CSS. Grid et flexbox, variables CSS, media queries. Le balisage avant l’artifice.',
          'Written by hand, without a CSS framework. Grid and flexbox, CSS variables, media queries. Markup before trickery.',
        ),
      },
      {
        name: l('Angular Material & CDK', 'Angular Material & CDK'),
        level: 88,
        note: l(
          'Adapté à la charte du projet, jamais pris tel quel. Personnalisation du thème et des composants : formulaires, dialogs, menus, tableaux.',
          'Adapted to the project’s design guidelines, never taken as is. Theme and component customisation: forms, dialogs, menus, tables.',
        ),
      },
      {
        name: l('Accessibilité (RGAA / WCAG)', 'Accessibility (RGAA / WCAG)'),
        level: 78,
        note: l(
          'Obligatoire sur les projets publics. Parcours clavier complet, rôles ARIA là où le HTML ne suffit pas, contrastes vérifiés, prefers-reduced-motion respecté.',
          'Mandatory on public-sector projects. Full keyboard journeys, ARIA roles where HTML is not enough, verified contrast, prefers-reduced-motion honoured.',
        ),
      },
      {
        name: l('Tests front (Vitest, Playwright)', 'Front-end testing'),
        level: 84,
        note: l(
          'Vitest pour les composants, les services et les guards, Playwright pour les parcours complets. Un seuil de couverture par projet, vérifié par la CI à chaque push.',
          'Vitest for components, services and guards, Playwright for full journeys. One coverage threshold per project, checked by CI on every push.',
        ),
      },
      {
        name: l(
          'DSFR (Design Système de l’État)',
          'DSFR (French State Design System)',
        ),
        level: 75,
        note: l(
          'Le design system imposé aux sites de l’État. Composants, typographies et contrastes conformes, intégrés sans réécrire l’existant.',
          'The design system mandated for French government sites. Compliant components, typography and contrast, integrated without rewriting what exists.',
        ),
      },
    ],
  },
  {
    id: 'backend',
    title: l('Backend', 'Backend'),
    icon: 'server',
    description: l(
      'Java et Spring Boot au quotidien depuis 2021, sur des applications métier aux vraies contraintes de volume et de règles de gestion.',
      'Java and Spring Boot every day since 2021, on business applications with real constraints on volume and business rules.',
    ),
    skills: [
      {
        name: l('Java', 'Java'),
        level: 88,
        note: l(
          'Versions 8 à 21, streams, Optional, records. Certification obtenue en 2021, au démarrage de la reconversion.',
          'Versions 8 to 21, streams, Optional, records. Certified in 2021, at the start of the career switch.',
        ),
      },
      {
        name: l('Spring Boot', 'Spring Boot'),
        level: 87,
        note: l(
          'Versions 2 à 4. Le cadre qui structure le back : API REST, Spring Data JPA, Spring Security, validation, gestion centralisée des erreurs.',
          'Versions 2 to 4. The framework that structures the back end: REST APIs, Spring Data JPA, Spring Security, validation, centralised error handling.',
        ),
      },
      {
        name: l('Conception d’API REST', 'REST API design'),
        level: 84,
        note: l(
          'Le contrat entre le front et le back. Ressources cohérentes, pagination, codes de statut justes, contrats documentés et stables.',
          'The contract between front and back. Consistent resources, pagination, accurate status codes, documented and stable contracts.',
        ),
      },
      {
        name: l('Hibernate / JPA', 'Hibernate / JPA'),
        level: 75,
        note: l(
          'Le lien entre objets Java et tables SQL. Mapping relationnel, requêtes JPQL et natives, stratégies de chargement choisies plutôt que subies.',
          'The link between Java objects and SQL tables. Relational mapping, JPQL and native queries, fetching strategies chosen rather than endured.',
        ),
      },
      {
        name: l('Tests & qualité', 'Testing & quality'),
        level: 82,
        note: l(
          'JUnit, Mockito, tests d’intégration sur les couches de service. Le test qui documente le comportement prime sur la couverture de ligne.',
          'JUnit, Mockito, integration tests on the service layers. A test that documents behaviour beats line coverage.',
        ),
      },
    ],
  },
  {
    id: 'data',
    title: l('Données', 'Data'),
    icon: 'database',
    description: l(
      'Des bases relationnelles en production, souvent héritées, qu’il faut comprendre avant de vouloir les corriger.',
      'Relational databases in production, often inherited, that have to be understood before anyone tries to fix them.',
    ),
    skills: [
      {
        name: l('PostgreSQL', 'PostgreSQL'),
        level: 82,
        note: l(
          'Modélisation, index, jointures complexes. Identification des requêtes coûteuses quand un écran ralentit.',
          'Modelling, indexes, complex joins. Spotting expensive queries when a screen slows down.',
        ),
      },
      {
        name: l('Oracle', 'Oracle'),
        level: 72,
        note: l(
          'Environnements grands comptes du secteur public. Requêtes et évolutions de schéma sur des bases déjà en production.',
          'Large public-sector environments. Queries and schema changes on databases already in production.',
        ),
      },
      {
        name: l('Firebase', 'Firebase'),
        level: 85,
        note: l(
          'Firestore, Authentication et Hosting sur mes projets personnels. Le bon outil quand il faut livrer vite et seul.',
          'Firestore, Authentication and Hosting on my personal projects. The right tool when you have to ship fast and alone.',
        ),
      },
    ],
  },
  {
    id: 'outils',
    title: l('Outils & méthodes', 'Tools & methods'),
    icon: 'wrench',
    description: l(
      'Ce qui entoure le code et qui, en équipe, compte souvent autant que le code lui-même.',
      'What surrounds the code and, in a team, often counts as much as the code itself.',
    ),
    skills: [
      {
        name: l('Git (GitHub, GitLab)', 'Git (GitHub, GitLab)'),
        level: 90,
        note: l(
          'Branches courtes, commits atomiques, rebase propre avant merge. Revues de code exigeantes et argumentées.',
          'Short branches, atomic commits, a clean rebase before merging. Demanding, well-argued code reviews.',
        ),
      },
      {
        name: l('IntelliJ IDEA & VS Code', 'IntelliJ IDEA & VS Code'),
        level: 88,
        note: l(
          'IntelliJ pour le Java, VS Code pour le front. Refactorings outillés plutôt que rechercher-remplacer.',
          'IntelliJ for Java, VS Code for the front end. Tool-driven refactoring rather than find-and-replace.',
        ),
      },
      {
        name: l('CI/CD & déploiement', 'CI/CD & deployment'),
        level: 65,
        note: l(
          'Pipelines GitLab CI, builds automatisés, déploiement continu sur Firebase Hosting.',
          'GitLab CI pipelines, automated builds, continuous deployment to Firebase Hosting.',
        ),
      },
      {
        name: l('IA générative', 'Generative AI'),
        level: 82,
        note: l(
          'Exploration, squelettes, relecture de diff. Prompts ciblés et contexte minimal pour maîtriser le coût en tokens, et rien n’est livré sans relecture.',
          'Exploration, skeletons, diff review. Targeted prompts and minimal context to keep the token cost under control, and nothing ships without review.',
        ),
      },
      {
        name: l('Agilité', 'Agile practices'),
        level: 80,
        note: l(
          'Sprints, daily, refinement, démonstrations client. Estimer honnêtement et tenir les jalons annoncés.',
          'Sprints, stand-ups, refinement, client demos. Estimating honestly and meeting the milestones announced.',
        ),
      },
    ],
  },
];

export const practices: Practice[] = [
  {
    icon: 'branch',
    title: l('Architecture par domaine', 'Domain-driven architecture'),
    description: l(
      'Un dossier par feature, un `core` pour les services transverses, un `shared` pour les briques réutilisables. Les dépendances vont dans un seul sens.',
      'One folder per feature, a `core` for cross-cutting services, a `shared` for reusable building blocks. Dependencies flow in one direction only.',
    ),
  },
  {
    icon: 'gauge',
    title: l('Rendu et chargement', 'Rendering and loading'),
    description: l(
      'Routes en lazy loading, prerendering statique pour un premier rendu instantané, images en WebP.',
      'Lazy-loaded routes, static prerendering for an instant first paint, WebP images.',
    ),
  },
  {
    icon: 'code',
    title: l(
      'Détection de changement maîtrisée',
      'Change detection under control',
    ),
    description: l(
      'OnPush sur tous les composants, état porté par des signals, application zoneless. Mis en place sur ce site, et prévu pour les prochains projets.',
      'OnPush on every component, state carried by signals, a zoneless application. Applied on this site, and planned for the next projects.',
    ),
  },
  {
    icon: 'shield',
    title: l('Typage strict de bout en bout', 'Strict typing end to end'),
    description: l(
      'Interfaces partagées, formulaires réactifs typés, templates vérifiés strictement. Les erreurs se voient à la compilation, pas en production.',
      'Shared interfaces, typed reactive forms, strictly checked templates. Errors show up at compile time, not in production.',
    ),
  },
];
