import { Project } from '../interface/project';

export const projects: Project[] = [
  {
    slug: 'life-rise',
    name: 'Life Rise',
    tagline: 'Le quotidien, rassemblé dans une seule application',
    summary:
      'Une application de gestion du quotidien qui réunit cuisine, sport, finances personnelles et organisation dans une interface unique, pensée mobile d’abord.',
    year: '2025 — 2026',
    role: 'Conception, développement et déploiement — seul',
    status: 'live',
    featured: true,
    cover: 'projects/LIFE-RISE.webp',
    shots: {
      desktop: 'projects/shots/life-rise-desktop.webp',
      mobile: 'projects/shots/life-rise-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'Angular Material', 'Firebase', 'Firestore', 'SSR'],
    facts: [
      { label: 'Durée', value: '9 mois' },
      { label: 'Modules', value: '5 domaines' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Je gérais mon quotidien dans quatre applications différentes, une par domaine, sans qu’aucune ne communique avec les autres. Life Rise est né de cette frustration : un seul endroit pour suivre ce qui compte, avec une donnée unifiée et une expérience cohérente d’un module à l’autre.',
    sections: [
      {
        title: 'Le problème à résoudre',
        body: 'Les applications de suivi personnel sont soit trop spécialisées, soit trop génériques. Les premières obligent à jongler entre plusieurs outils, les secondes se réduisent à une liste de tâches déguisée. Je voulais une base commune — authentification, données, navigation, thème — sur laquelle chaque domaine viendrait se greffer comme un module autonome.',
      },
      {
        title: 'L’architecture',
        body: 'Chaque domaine est une feature Angular chargée en lazy loading, avec son propre modèle et ses propres services. Le noyau applicatif porte l’authentification, l’accès Firestore et les composants partagés. Ce découpage permet d’ajouter un module sans toucher aux autres, et de garder un bundle initial léger malgré l’étendue fonctionnelle.',
      },
      {
        title: 'Ce que le projet m’a appris',
        body: 'Mener un projet seul de bout en bout, sans product owner pour arbitrer ni tech lead pour valider, oblige à décider vite et à assumer ses choix. C’est aussi le meilleur terrain pour éprouver les nouveautés d’Angular en conditions réelles avant de les proposer en mission.',
      },
    ],
    features: [
      'Authentification et données personnelles isolées par utilisateur',
      'Module cuisine : recettes, ingrédients et planification des repas',
      'Module fitness : programmes, séances et suivi de progression',
      'Module finances : budget, dépenses récurrentes et vision mensuelle',
      'Module tâches et objectifs, avec suivi d’avancement',
      'Interface responsive pensée pour un usage mobile quotidien',
    ],
    links: {
      live: 'https://life-rise.web.app/',
    },
  },
  {
    slug: 'gametime',
    name: 'Game Time',
    tagline: 'Un quiz multijoueur en temps réel',
    summary:
      'Un quiz jouable à plusieurs sur la même partie, avec gestion des manches, décompte synchronisé et classement en direct.',
    year: '2024',
    role: 'Conception et développement — seul',
    status: 'live',
    featured: true,
    cover: 'projects/GAMETIME.webp',
    shots: {
      desktop: 'projects/shots/gametime-desktop.webp',
      mobile: 'projects/shots/gametime-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'CSS animations', 'GitHub Pages'],
    facts: [
      { label: 'Durée', value: '4 mois' },
      { label: 'Mode', value: 'Multijoueur' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Un projet volontairement orienté temps réel, pour sortir du CRUD et me confronter à la synchronisation d’états entre plusieurs joueurs : qui répond quand, que se passe-t-il si quelqu’un quitte la partie, comment garder tout le monde sur la même manche.',
    sections: [
      {
        title: 'Le défi technique',
        body: 'La difficulté d’un quiz multijoueur n’est pas le quiz : c’est le temps. Chaque client doit voir la même question au même moment, le décompte doit rester cohérent malgré les latences, et une déconnexion ne doit pas bloquer la partie pour les autres. J’ai construit la logique autour de flux RxJS, avec un état de partie unique dont chaque écran n’est qu’une projection.',
      },
      {
        title: 'L’expérience de jeu',
        body: 'Un jeu qui ne réagit pas instantanément n’est pas un jeu. J’ai soigné les transitions, les retours visuels sur les réponses et l’affichage du classement entre les manches, en gardant des animations CSS pures pour ne rien coûter au thread principal.',
      },
    ],
    features: [
      'Parties multijoueurs avec plusieurs participants simultanés',
      'Décompte synchronisé et enchaînement automatique des manches',
      'Classement mis à jour en direct entre chaque question',
      'Banque de questions par thématiques',
      'Interface animée et jouable au clavier comme au doigt',
    ],
    links: {
      live: 'https://brice150.github.io/GAMETIME/',
      github: 'https://github.com/Brice150/GAMETIME',
    },
  },
  {
    slug: 'simulateur-renovation',
    name: 'Simulateur de rénovation',
    tagline: 'Estimer ses aides sans y passer la journée',
    summary:
      'Un simulateur qui calcule les aides à la rénovation énergétique auxquelles un foyer peut prétendre, à partir de quelques informations simples.',
    year: '2023',
    role: 'Conception et développement — seul',
    status: 'live',
    featured: false,
    cover: 'projects/SIMULATOR.webp',
    shots: {
      desktop: 'projects/shots/simulator-desktop.webp',
      mobile: 'projects/shots/simulator-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'Formulaires réactifs', 'GitHub Pages'],
    facts: [
      { label: 'Durée', value: '2 mois' },
      { label: 'Nature', value: 'Calculateur' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Les dispositifs d’aide à la rénovation énergétique sont nombreux, cumulables et conditionnés à des seuils qui changent. L’information existe mais elle est éclatée sur plusieurs sites administratifs. Ce simulateur ramène tout ça à un parcours de quelques questions.',
    sections: [
      {
        title: 'Traduire une règle en code',
        body: 'Le cœur du projet est un moteur de règles : des barèmes, des plafonds, des conditions de cumul. J’ai isolé ces règles de l’interface pour qu’une évolution réglementaire se traduise par un changement de données, pas par une réécriture de composants. Le même réflexe m’a servi trois ans plus tard sur la taxation 2026 en mission.',
      },
      {
        title: 'Un parcours guidé',
        body: 'Un formulaire de trente champs fait fuir. J’ai découpé la saisie en étapes courtes, avec validation immédiate et récapitulatif avant résultat, en formulaires réactifs typés.',
      },
    ],
    features: [
      'Parcours de simulation en plusieurs étapes guidées',
      'Moteur de règles séparé de l’interface',
      'Validation en temps réel et messages d’erreur explicites',
      'Récapitulatif du calcul avant affichage du résultat',
    ],
    links: {
      live: 'https://brice150.github.io/Simulator/',
      github: 'https://github.com/Brice150/Simulator',
    },
  },
  {
    slug: 'pickme',
    name: 'PickMe',
    tagline: 'Une application de rencontre, de zéro',
    summary:
      'Une application de rencontre complète : profils, préférences, système de correspondance et messagerie, construite comme un exercice d’architecture full-stack.',
    year: '2024',
    role: 'Conception et développement — seul',
    status: 'archive',
    featured: false,
    cover: 'projects/PICKME.webp',
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    facts: [
      { label: 'Durée', value: '6 mois' },
      { label: 'Nature', value: 'Full-stack' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'Démo vidéo' },
    ],
    context:
      'Le projet où j’ai voulu tenir les deux bouts de la chaîne en même temps : un front Angular exigeant en interactions, et un back Java/Spring avec une vraie modélisation relationnelle. Une application de rencontre est un excellent prétexte — elle concentre authentification, upload, filtrage, appariement et temps réel.',
    sections: [
      {
        title: 'Modéliser la correspondance',
        body: 'Le cœur du domaine est une relation many-to-many asymétrique : un utilisateur exprime un intérêt, la correspondance n’existe que si l’intérêt est réciproque. Traduire cette règle en schéma relationnel propre, puis en API qui ne fuit pas d’information sur les intentions de l’autre, a été la partie la plus intéressante.',
      },
      {
        title: 'Pourquoi il n’est pas en ligne',
        body: 'Héberger une application de rencontre implique de traiter des données personnelles sensibles et des photos d’utilisateurs réels. Le projet reste donc démontré en vidéo et ouvert en lecture sur GitHub, ce qui est plus honnête que de laisser tourner un service que je ne modère pas.',
      },
    ],
    features: [
      'Inscription, authentification et gestion de profil',
      'Préférences de recherche et filtrage des profils',
      'Système de correspondance réciproque',
      'Messagerie entre profils correspondants',
      'API REST Java/Spring Boot sur base PostgreSQL',
    ],
    links: {
      github: 'https://github.com/Brice150/PICKME',
      video: 'PICKME.mp4',
    },
  },
  {
    slug: 'portfolio',
    name: 'Ce portfolio',
    tagline: 'Angular 21, zoneless, prerendu et accessible',
    summary:
      'Le site que vous consultez : une vitrine technique autant qu’un CV, construite avec les dernières briques d’Angular et conçue pour être irréprochable côté performance et accessibilité.',
    year: '2026',
    role: 'Conception, design et développement — seul',
    status: 'live',
    featured: true,
    cover: 'logo.webp',
    shots: {
      desktop: 'projects/shots/portfolio-desktop.webp',
      mobile: 'projects/shots/portfolio-mobile.webp',
    },
    stack: ['Angular 21', 'Signals', 'Zoneless', 'Angular Material 3', 'SSR / Prerender', 'Firebase Hosting'],
    facts: [
      { label: 'Rendu', value: 'Prérendu' },
      { label: 'Change detection', value: 'OnPush' },
      { label: 'Dépendances', value: 'Minimales' },
      { label: 'Référentiel', value: 'RGAA' },
    ],
    context:
      'Un portfolio de développeur est le seul projet dont le recruteur inspectera le code source, l’onglet réseau et parfois le score Lighthouse. Il devait donc démontrer, sur lui-même, les pratiques que je défends en mission.',
    sections: [
      {
        title: 'Zoneless et signals',
        body: 'L’application tourne sans Zone.js : l’état est porté par des signals, tous les composants sont en stratégie OnPush, et Angular ne recalcule que ce qui a réellement changé. Le résultat est un bundle plus léger et une détection de changement prévisible.',
      },
      {
        title: 'Prerendering statique',
        body: 'Chaque route, fiches projet comprises, est générée en HTML au moment du build. Firebase Hosting sert un fichier statique, le contenu est visible immédiatement et indexable, puis l’application s’hydrate avec rejeu des évènements pour ne perdre aucun clic.',
      },
      {
        title: 'Accessibilité dès la conception',
        body: 'Structure sémantique, lien d’évitement, navigation clavier complète, contrastes vérifiés, préférences de mouvement respectées, et un panneau de réglages qui laisse la main au visiteur sur le thème, la couleur d’accent et les animations.',
      },
    ],
    features: [
      'Thème clair / sombre / système avec quatre couleurs d’accent',
      'Réglage des animations, mémorisé entre les visites',
      'Mockups desktop et mobile réellement défilables',
      'Sept routes prérendues, dont les fiches projet générées à partir des données',
      'Aucune dépendance d’icônes ou de carrousel : tout est fait main',
    ],
    links: {
      github: 'https://github.com/Brice150/Portfolio',
    },
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = (): Project[] => projects.filter((project) => project.featured);
