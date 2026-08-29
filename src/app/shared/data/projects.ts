import { Project } from '../../core/interfaces/project';

export const projects: Project[] = [
  {
    slug: 'life-rise',
    name: 'Life Rise',
    tagline: 'Toute la vie quotidienne réunie dans une seule application',
    summary:
      '19 espaces de gestion (repas, sport, finances, tâches, inventaire, voyages) reliés par un assistant conversationnel et partageables entre les profils d’un même foyer.',
    year: '2025 - 2026',
    startYear: 2025,
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
      'RxJS',
      'Angular Material',
      'Firebase',
      'Firestore',
      'IndexedDB',
      'IA générative',
      'Stripe',
    ],
    facts: [
      { label: 'Durée (temps libre)', value: '1 an' },
      { label: 'Espaces', value: '19' },
      { label: 'Profils', value: '6 par compte' },
      { label: 'Assistant', value: 'IA intégrée' },
      { label: 'Hors ligne', value: 'Cache IndexedDB' },
    ],
    context:
      'Gérer son quotidien suppose aujourd’hui de jongler entre une dizaine d’applications qui ne communiquent jamais entre elles. Life Rise part de ce constat : un seul endroit pour suivre ce qui compte, avec une donnée unifiée, une expérience cohérente d’un espace à l’autre, et la possibilité de partager avec son conjoint, sa famille ou sa colocation.',
    sections: [
      {
        title: 'Une base commune, 19 espaces',
        body: 'Chaque domaine (nourriture, fitness, finance, organisation, inventaire, voyages, prévisions) est une feature Angular chargée en lazy loading, avec son propre modèle et ses propres services. Le noyau applicatif porte l’authentification, l’accès Firebase, le thème et les composants partagés. Ce découpage permet d’ajouter un espace sans toucher aux autres, et de garder un bundle initial léger malgré l’étendue fonctionnelle.',
      },
      {
        title: 'Un assistant conversationnel qui agit vraiment',
        body: 'Bob, l’assistant intégré, ne se contente pas de répondre : il crée, modifie ou supprime n’importe quel élément de l’application, après confirmation explicite de l’utilisateur. Il accepte la saisie vocale, et une fonction de complétion automatique remplit les champs vides d’un formulaire à partir du contexte. Le quota par profil est plafonné, ce qui impose de concevoir des appels précis plutôt que d’envoyer tout l’état de l’application à chaque requête, exactement la discipline que j’applique à mon usage professionnel de l’IA.',
      },
      {
        title: 'Le collectif, pas seulement le solo',
        body: 'Jusqu’à 6 profils par compte, avec partage de recettes, de séances de sport et d’éléments d’inventaire, gestion à plusieurs des tâches et des repas, et une messagerie temps réel avec réactions. Les finances, elles, restent strictement personnelles à chaque profil. C’est la partie qui a demandé le plus de soin sur le modèle de données : décider, domaine par domaine, ce qui se partage et ce qui ne se partage pas.',
      },
      {
        title: 'Utilisable même sans réseau',
        body: 'Les données déjà consultées sont conservées dans IndexedDB, côté navigateur. L’application s’ouvre donc sur du contenu immédiat plutôt que sur un écran de chargement, la navigation reste possible quand la connexion tombe, et les modifications faites hors ligne repartent vers Firestore dès son retour. Sur un modèle facturé à la lecture, c’est aussi une économie directe : les mêmes documents ne sont pas rechargés à chaque changement d’écran.',
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
      'Jusqu’à 6 profils par compte, avec partage d’éléments entre profils',
      'Finances strictement personnelles à chaque profil',
      'Messagerie temps réel avec réactions',
      'Cache local IndexedDB : consultation et navigation possibles hors ligne',
      'Pages publiques prérendues au build, pour un premier affichage immédiat',
      'Données hébergées en Europe et conformité RGPD',
    ],
    links: {
      live: 'https://life-rise.web.app/',
      sourceRestricted:
        'Life Rise est un produit payant, avec des comptes et des données d’utilisateurs réels. Ouvrir les sources reviendrait à offrir le moyen d’en faire tourner une copie gratuite en local, sans les limites de l’abonnement. Le code reste donc privé.',
    },
  },
  {
    slug: 'gametime',
    name: 'Game Time',
    tagline: 'Des jeux de réflexion à plusieurs, en temps réel',
    summary:
      'Motus, drapeaux et marques : 3 jeux jouables à plusieurs dans une même partie, avec salons, décompte synchronisé et classement en direct.',
    year: '2024',
    startYear: 2024,
    status: 'live',
    featured: true,
    cover: 'projects/GAMETIME.webp',
    shots: {
      desktop: 'projects/shots/gametime-desktop.webp',
      mobile: 'projects/shots/gametime-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Firebase'],
    facts: [
      { label: 'Durée (temps libre)', value: '6 mois' },
      { label: 'Jeux', value: '3' },
      { label: 'Mode', value: 'Multijoueur' },
      { label: 'Dictionnaire', value: '40 000 mots' },
    ],
    context:
      'Un projet volontairement orienté temps réel, pour sortir du CRUD et se confronter à la synchronisation d’états entre plusieurs joueurs : qui répond quand, que se passe-t-il si quelqu’un quitte la partie, comment garder tout le monde sur la même manche.',
    sections: [
      {
        title: 'Le défi technique',
        body: 'La difficulté d’un jeu multijoueur n’est pas le jeu : c’est le temps. Chaque client doit voir la même question au même moment, le décompte doit rester cohérent malgré les latences, et une déconnexion ne doit pas bloquer la partie pour les autres. La logique s’articule autour d’un état de partie unique stocké dans Firestore, dont chaque écran n’est qu’une projection.',
      },
      {
        title: '3 jeux, une seule mécanique',
        body: 'Motus, reconnaissance de drapeaux et identification de marques partagent le même moteur de partie : salon, manches, scores, classement. Seule la règle de validation d’une réponse change. Cette abstraction a permis d’ajouter le troisième jeu en une fraction du temps qu’avait demandé le premier.',
      },
      {
        title: 'Alimenter les jeux en contenu',
        body: 'Motus s’appuie sur un dictionnaire de près de 40 000 mots français, filtré par longueur et nettoyé des formes inutilisables avant d’être embarqué. Le jeu des drapeaux, lui, consomme une API publique qui fournit pays, drapeaux et métadonnées : pas de banque d’images à maintenir, mais une dépendance externe à gérer, avec les erreurs et les temps de réponse que cela implique.',
      },
    ],
    features: [
      '3 jeux : Motus, drapeaux et marques',
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
      'Un simulateur d’aides à la rénovation énergétique, écrit en 2 jours pour dépanner une connaissance en alternance marketing qui en avait besoin pour son projet.',
    year: '2023',
    startYear: 2023,
    status: 'live',
    featured: false,
    cover: 'projects/SIMULATOR.webp',
    shots: {
      desktop: 'projects/shots/simulator-desktop.webp',
      mobile: 'projects/shots/simulator-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'RxJS'],
    facts: [
      { label: 'Durée (temps libre)', value: '2 jours' },
      { label: 'Nature', value: 'Calculateur' },
      { label: 'Contexte', value: 'Rendre service' },
      { label: 'Réalisation', value: 'En un weekend' },
    ],
    context:
      'Une connaissance en alternance marketing avait besoin d’un simulateur d’aides à la rénovation énergétique pour son projet, sans avoir les moyens de le faire développer. Le sujet était clair, le besoin réel et le délai court : deux jours pour livrer quelque chose d’utilisable plutôt qu’une maquette.',
    sections: [
      {
        title: 'Traduire un barème en calcul',
        body: 'Les dispositifs d’aide à la rénovation énergétique sont nombreux, cumulables et conditionnés à des seuils. L’essentiel du travail a consisté à transcrire ces barèmes en calculs justes à partir des informations saisies. Le même exercice, à une tout autre échelle, m’attendait 3 ans plus tard avec la taxation 2026 en mission.',
      },
      {
        title: 'Livrer vite, sans sur-concevoir',
        body: 'Deux jours imposent des arbitrages : pas d’architecture élaborée, pas de fonctionnalité en trop, juste le chemin le plus court entre les questions posées et le montant affiché. C’est aussi un rappel utile qu’un outil simple qui rend service vaut mieux qu’un projet ambitieux jamais terminé.',
      },
    ],
    features: [
      'Saisie des informations du foyer et du projet de rénovation',
      'Calcul des aides applicables à partir des barèmes en vigueur',
      'Résultat immédiat, sans compte ni installation',
      'Développé en 2 jours pour répondre à un besoin concret',
    ],
    links: {
      live: 'https://brice150.github.io/Simulator/',
      github: 'https://github.com/Brice150/Simulator',
    },
  },
  {
    slug: 'pickme',
    name: 'Pick Me',
    tagline: 'Une application de rencontre construite de zéro, front et back',
    summary:
      'Profils, préférences, système de correspondance réciproque et messagerie, sur une API Java/Spring Boot et une base relationnelle.',
    year: '2023 - 2024',
    startYear: 2023,
    status: 'archive',
    featured: false,
    cover: 'projects/PICKME.webp',
    shots: {
      desktop: 'projects/shots/pickme-desktop.webp',
      mobile: 'projects/shots/pickme-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'Java', 'Spring Boot', 'PostgreSQL'],
    facts: [
      { label: 'Durée (temps libre)', value: '1 an' },
      { label: 'Nature', value: 'Full-stack' },
      { label: 'Périmètre', value: 'Front, Back et BDD' },
      { label: 'Cœur du sujet', value: 'Algorithme de sélection' },
    ],
    context:
      'Le projet qui tient le front et le back en même temps : un front Angular exigeant en interactions, et un back Java/Spring avec une vraie modélisation relationnelle. Une application de rencontre est un excellent prétexte : elle concentre authentification, upload, filtrage, appariement et temps réel.',
    sections: [
      {
        title: 'Modéliser la correspondance',
        body: 'Le cœur du domaine est une relation many-to-many asymétrique : un utilisateur exprime un intérêt, la correspondance n’existe que s’il est réciproque. Traduire cette règle en schéma relationnel propre, puis en API qui ne laisse fuir aucune information sur les intentions de l’autre, a été la partie la plus intéressante.',
      },
      {
        title: 'Pourquoi il n’est plus en ligne',
        body: 'Il l’a été. Je l’ai retiré pour deux raisons : l’hébergement avait un coût que rien ne justifiait pour une application que je n’utilisais pas au quotidien, et les applications de rencontre actuelles vont plus loin : elles analysent les photos par intelligence artificielle pour établir un score d’attractivité, ce que mon algorithme ne fait pas. Le code reste ouvert en lecture sur GitHub.',
      },
    ],
    features: [
      'Inscription, authentification et gestion de profil',
      'Préférences de recherche et filtrage des profils',
      'Algorithme de sélection des profils selon la distance et les attributs',
      'Système de correspondance réciproque',
      'Messagerie entre profils correspondants',
      'API REST Java/Spring Boot sur base PostgreSQL',
    ],
    links: {
      github: 'https://github.com/Brice150/PICKME',
    },
  },
  {
    slug: 'portfolio',
    name: 'Ce portfolio',
    tagline: 'Un site qui applique à lui-même ce qu’il met en avant',
    summary:
      'Une vitrine technique autant qu’un CV : des pages prérendues, une détection de changement sans Zone.js et une accessibilité traitée dès la conception plutôt qu’en fin de projet.',
    year: '2026',
    startYear: 2026,
    status: 'live',
    featured: true,
    cover: 'logo.webp',
    shots: {
      desktop: 'projects/shots/portfolio-desktop.webp',
      mobile: 'projects/shots/portfolio-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
    facts: [
      { label: 'Durée (temps libre)', value: '2 semaines' },
      { label: 'Rendu', value: 'Prérendu' },
      { label: 'Détection', value: 'OnPush' },
      { label: 'Référentiel', value: 'RGAA' },
    ],
    context:
      'Un portfolio de développeur est le seul projet dont le visiteur inspectera le code source, l’onglet réseau et parfois le score Lighthouse. Il devait donc démontrer, sur lui-même, les pratiques défendues en mission.',
    sections: [
      {
        title: 'Zoneless et signals',
        body: 'L’application tourne sans Zone.js : l’état est porté par des signals et tous les composants sont en stratégie OnPush. Le résultat est un bundle plus léger et une détection de changement prévisible. C’est le premier projet où je pousse ce parti pris jusqu’au bout, et je le reprends depuis sur mes développements personnels.',
      },
      {
        title: 'Le contenu avant le JavaScript',
        body: 'Chaque route, fiches projet comprises, est générée en HTML au moment du build. Firebase Hosting ne sert que des fichiers statiques, le contenu est visible immédiatement et indexable, puis l’application prend le relais côté navigateur.',
      },
      {
        title: 'Accessibilité dès la conception',
        body: 'Structure sémantique, lien d’évitement, navigation clavier complète, contrastes vérifiés, préférences de mouvement respectées, et un panneau de réglages qui laisse la main au visiteur sur le thème, la couleur d’accent et les animations. Les règles d’accessibilité des templates sont vérifiées par ESLint à chaque build.',
      },
    ],
    features: [
      'Thème clair, sombre ou système, avec 4 couleurs d’accent',
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

/** Dernière année mentionnée dans le libellé de période. */
const lastYear = (project: Project): number => {
  const years = project.year.match(/\d{4}/g) ?? [];
  return Number(years.at(-1) ?? project.startYear);
};

/** Projets classés du plus récent au plus ancien. */
export const projectsByDate = (): Project[] =>
  [...projects].sort(
    (a, b) => lastYear(b) - lastYear(a) || b.startYear - a.startYear,
  );

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = (): Project[] =>
  projects.filter((project) => project.featured);
