import { Project } from '../../core/interfaces/project';

export const projects: Project[] = [
  {
    slug: 'life-rise',
    name: 'Life Rise',
    tagline: 'Toute la vie quotidienne réunie dans une seule application',
    summary:
      '19 espaces de gestion — repas, sport, finances, tâches, inventaire, voyages — reliés par un assistant conversationnel et partageables entre les profils d’un même foyer.',
    year: '2025 — 2026',
    status: 'live',
    featured: true,
    cover: 'projects/LIFE-RISE.webp',
    shots: {
      desktop: 'projects/shots/life-rise-desktop.webp',
      mobile: 'projects/shots/life-rise-mobile.webp',
    },
    stack: [
      'Angular',
      'TypeScript',
      'Angular Material',
      'Firebase',
      'Firestore',
      'IA générative',
      'SSR / Prerender',
      'Stripe',
    ],
    facts: [
      { label: 'Durée', value: '1 an (temps libre)' },
      { label: 'Espaces', value: '19' },
      { label: 'Profils', value: '6 par compte' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Gérer son quotidien suppose aujourd’hui de jongler entre une dizaine d’applications qui ne communiquent jamais entre elles. Life Rise part de ce constat : un seul endroit pour suivre ce qui compte, avec une donnée unifiée, une expérience cohérente d’un espace à l’autre, et la possibilité de partager avec son conjoint, sa famille ou sa colocation.',
    sections: [
      {
        title: 'Une base commune, 19 espaces',
        body: 'Chaque domaine — nourriture, fitness, finance, organisation, inventaire, voyages, prévisions — est une feature Angular chargée en lazy loading, avec son propre modèle et ses propres services. Le noyau applicatif porte l’authentification, l’accès Firestore, le thème et les composants partagés. Ce découpage permet d’ajouter un espace sans toucher aux autres, et de garder un bundle initial léger malgré l’étendue fonctionnelle.',
      },
      {
        title: 'Un assistant conversationnel qui agit vraiment',
        body: 'Bob, l’assistant intégré, ne se contente pas de répondre : il crée, modifie ou supprime n’importe quel élément de l’application, après confirmation explicite de l’utilisateur. Il accepte la saisie vocale, et une fonction de complétion automatique remplit les champs vides d’un formulaire à partir du contexte. Le quota par profil est plafonné, ce qui impose de concevoir des appels précis plutôt que d’envoyer tout l’état de l’application à chaque requête — exactement la discipline que j’applique à mon usage professionnel de l’IA.',
      },
      {
        title: 'Le collectif, pas seulement le solo',
        body: 'Jusqu’à six profils par compte, avec partage de recettes, de séances de sport et d’éléments d’inventaire, gestion à plusieurs des tâches, des repas et des finances communes, et une messagerie temps réel avec réactions. C’est la partie qui a demandé le plus de soin sur le modèle de données : décider ce qui reste strictement personnel et ce qui devient collectif.',
      },
      {
        title: 'Ce que le projet a apporté',
        body: 'Mener un produit seul de bout en bout, sans product owner pour arbitrer ni tech lead pour valider, oblige à décider vite et à assumer ses choix. C’est aussi le meilleur terrain pour éprouver les nouveautés d’Angular en conditions réelles avant de les proposer en mission, et pour traiter sérieusement des sujets qu’on n’aborde pas toujours en régie : conformité RGPD, hébergement européen des données et chiffrement.',
      },
    ],
    features: [
      '19 espaces de gestion, du tableau de bord aux prévisions',
      'Assistant conversationnel capable de créer, modifier et supprimer après confirmation',
      'Complétion automatique des formulaires à partir du contexte',
      'Jusqu’à six profils par compte, avec partage d’éléments entre profils',
      'Messagerie temps réel avec réactions',
      'Données hébergées en Europe et conformité RGPD',
    ],
    links: {
      live: 'https://life-rise.web.app/',
    },
  },
  {
    slug: 'gametime',
    name: 'Game Time',
    tagline: 'Des jeux de réflexion à plusieurs, en temps réel',
    summary:
      'Motus, drapeaux et marques : trois jeux jouables à plusieurs dans une même partie, avec salons, décompte synchronisé et classement en direct.',
    year: '2024',
    status: 'live',
    featured: true,
    cover: 'projects/GAMETIME.webp',
    shots: {
      desktop: 'projects/shots/gametime-desktop.webp',
      mobile: 'projects/shots/gametime-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'Angular Material', 'Firebase'],
    facts: [
      { label: 'Durée', value: '6 mois (temps libre)' },
      { label: 'Jeux', value: '3' },
      { label: 'Mode', value: 'Multijoueur' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Un projet volontairement orienté temps réel, pour sortir du CRUD et se confronter à la synchronisation d’états entre plusieurs joueurs : qui répond quand, que se passe-t-il si quelqu’un quitte la partie, comment garder tout le monde sur la même manche.',
    sections: [
      {
        title: 'Le défi technique',
        body: 'La difficulté d’un jeu multijoueur n’est pas le jeu : c’est le temps. Chaque client doit voir la même question au même moment, le décompte doit rester cohérent malgré les latences, et une déconnexion ne doit pas bloquer la partie pour les autres. La logique s’articule autour d’un état de partie unique stocké dans Firestore, dont chaque écran n’est qu’une projection.',
      },
      {
        title: 'Trois jeux, une seule mécanique',
        body: 'Motus, reconnaissance de drapeaux et identification de marques partagent le même moteur de partie : salon, manches, scores, classement. Seule la règle de validation d’une réponse change. Cette abstraction a permis d’ajouter le troisième jeu en une fraction du temps qu’avait demandé le premier.',
      },
      {
        title: 'L’expérience de jeu',
        body: 'Un jeu qui ne réagit pas instantanément n’est pas un jeu. Transitions, retours visuels sur les réponses et affichage du classement entre les manches sont traités en animations CSS pures, pour ne rien coûter au thread principal.',
      },
    ],
    features: [
      'Trois jeux : Motus, drapeaux et marques',
      'Salons multijoueurs avec plusieurs participants simultanés',
      'Décompte synchronisé et enchaînement automatique des manches',
      'Classement mis à jour en direct entre chaque question',
      'Statistiques et scores conservés par joueur',
    ],
    links: {
      live: 'https://brice150.github.io/GAMETIME/',
      github: 'https://github.com/Brice150/GAMETIME',
    },
  },
  {
    slug: 'simulateur-renovation',
    name: 'Simulateur de rénovation',
    tagline: 'Estimer ses aides à la rénovation sans y passer la journée',
    summary:
      'Un simulateur qui calcule les aides à la rénovation énergétique auxquelles un foyer peut prétendre, à partir de quelques informations simples.',
    year: '2023',
    status: 'live',
    featured: false,
    cover: 'projects/SIMULATOR.webp',
    shots: {
      desktop: 'projects/shots/simulator-desktop.webp',
      mobile: 'projects/shots/simulator-mobile.webp',
    },
    stack: ['Angular', 'TypeScript'],
    facts: [
      { label: 'Durée', value: '2 semaines (temps libre)' },
      { label: 'Nature', value: 'Calculateur' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'En ligne' },
    ],
    context:
      'Les dispositifs d’aide à la rénovation énergétique sont nombreux, cumulables et conditionnés à des seuils qui changent. L’information existe mais elle est éclatée sur plusieurs sites administratifs. Ce simulateur ramène l’ensemble à un parcours de quelques questions.',
    sections: [
      {
        title: 'Traduire une règle en code',
        body: 'Le cœur du projet est un moteur de règles : des barèmes, des plafonds, des conditions de cumul. Ces règles sont isolées de l’interface pour qu’une évolution réglementaire se traduise par un changement de données, pas par une réécriture de composants. Le même réflexe a servi trois ans plus tard sur la taxation 2026, en mission.',
      },
      {
        title: 'Un parcours guidé',
        body: 'Un formulaire de trente champs fait fuir. La saisie est découpée en étapes courtes, avec validation immédiate et récapitulatif avant résultat, en formulaires réactifs typés.',
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
    tagline: 'Une application de rencontre construite de zéro, front et back',
    summary:
      'Profils, préférences, système de correspondance réciproque et messagerie, sur une API Java/Spring Boot et une base relationnelle.',
    year: '2024',
    status: 'archive',
    featured: false,
    cover: 'projects/PICKME.webp',
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    facts: [
      { label: 'Durée', value: '6 mois (temps libre)' },
      { label: 'Nature', value: 'Full-stack' },
      { label: 'Équipe', value: 'Solo' },
      { label: 'Statut', value: 'Démo vidéo' },
    ],
    context:
      'Le projet qui tient les deux bouts de la chaîne en même temps : un front Angular exigeant en interactions, et un back Java/Spring avec une vraie modélisation relationnelle. Une application de rencontre est un excellent prétexte — elle concentre authentification, upload, filtrage, appariement et temps réel.',
    sections: [
      {
        title: 'Modéliser la correspondance',
        body: 'Le cœur du domaine est une relation many-to-many asymétrique : un utilisateur exprime un intérêt, la correspondance n’existe que s’il est réciproque. Traduire cette règle en schéma relationnel propre, puis en API qui ne laisse fuir aucune information sur les intentions de l’autre, a été la partie la plus intéressante.',
      },
      {
        title: 'Pourquoi il n’est pas en ligne',
        body: 'Héberger une application de rencontre implique de traiter des données personnelles sensibles et des photos d’utilisateurs réels. Le projet reste donc démontré en vidéo et ouvert en lecture sur GitHub, ce qui est plus honnête que de laisser tourner un service non modéré.',
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
    tagline: 'Un site qui applique à lui-même ce qu’il met en avant',
    summary:
      'Une vitrine technique autant qu’un CV : rendu prérendu, détection de changement sans Zone.js et accessibilité traitée dès la conception plutôt qu’en fin de projet.',
    year: '2026',
    status: 'live',
    featured: true,
    cover: 'logo.webp',
    shots: {
      desktop: 'projects/shots/portfolio-desktop.webp',
      mobile: 'projects/shots/portfolio-mobile.webp',
    },
    stack: [
      'Angular',
      'Typescript',
      'Angular Material',
      'SSR / Prerender',
      'Zoneless',
    ],
    facts: [
      { label: 'Rendu', value: 'Prérendu' },
      { label: 'Change detection', value: 'OnPush' },
      { label: 'Dépendances', value: 'Minimales' },
      { label: 'Référentiel', value: 'RGAA' },
    ],
    context:
      'Un portfolio de développeur est le seul projet dont le visiteur inspectera le code source, l’onglet réseau et parfois le score Lighthouse. Il devait donc démontrer, sur lui-même, les pratiques défendues en mission.',
    sections: [
      {
        title: 'Zoneless et signals',
        body: 'L’application tourne sans Zone.js : l’état est porté par des signals, tous les composants sont en stratégie OnPush, et Angular ne recalcule que ce qui a réellement changé. Le résultat est un bundle plus léger et une détection de changement prévisible.',
      },
      {
        title: 'Prerendering statique',
        body: 'Chaque route, fiches projet comprises, est générée en HTML au moment du build. Firebase Hosting ne sert que des fichiers statiques, le contenu est visible immédiatement et indexable, puis l’application s’hydrate avec rejeu des évènements pour ne perdre aucun clic.',
      },
      {
        title: 'Accessibilité dès la conception',
        body: 'Structure sémantique, lien d’évitement, navigation clavier complète, contrastes vérifiés, préférences de mouvement respectées, et un panneau de réglages qui laisse la main au visiteur sur le thème, la couleur d’accent et les animations. Les règles d’accessibilité des templates sont vérifiées par ESLint à chaque build.',
      },
    ],
    features: [
      'Thème clair, sombre ou système, avec quatre couleurs d’accent',
      'Réglage des animations, mémorisé entre les visites',
      'Maquettes desktop et mobile réellement défilables',
      'Routes prérendues, dont les fiches projet générées à partir des données',
      'Aucune dépendance d’icônes ni de carrousel : tout est fait main',
    ],
    links: {
      github: 'https://github.com/Brice150/Portfolio',
    },
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = (): Project[] =>
  projects.filter((project) => project.featured);
