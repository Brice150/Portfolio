import { l, ll } from '../../core/i18n/lang';
import { Project } from '../../core/interfaces/project';

export const projects: Project[] = [
  {
    slug: 'life-rise',
    name: l('Life Rise', 'Life Rise'),
    tagline: l(
      'Toute la vie quotidienne réunie dans une seule application',
      'All of daily life brought together in a single application',
    ),
    summary: l(
      '19 espaces de gestion — repas, sport, finances, tâches, inventaire, voyages — reliés par un assistant conversationnel et partageables entre profils.',
      '19 management spaces — meals, fitness, finances, tasks, inventory, travel — tied together by a conversational assistant and shareable between profiles.',
    ),
    year: '2025 - 2026',
    startYear: 2025,
    status: 'live',
    shots: {
      desktop: 'projects/life-rise-desktop.webp',
      mobile: 'projects/life-rise-mobile.webp',
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
      { label: l('Durée (temps libre)', 'Duration (spare time)'), value: l('1 an', '1 year') },
      { label: l('Espaces', 'Spaces'), value: l('19', '19') },
      { label: l('Profils', 'Profiles'), value: l('6 par compte', '6 per account') },
      { label: l('Assistant', 'Assistant'), value: l('IA intégrée', 'Built-in AI') },
      { label: l('Hors ligne', 'Offline'), value: l('Cache IndexedDB', 'IndexedDB cache') },
    ],
    context: l(
      'Gérer son quotidien suppose aujourd’hui de jongler entre une dizaine d’applications qui ne communiquent jamais entre elles. Life Rise part de ce constat : un seul endroit pour suivre ce qui compte, avec une donnée unifiée, une expérience cohérente d’un espace à l’autre, et la possibilité de partager avec son conjoint, sa famille ou sa colocation.',
      'Managing daily life now means juggling a dozen applications that never talk to one another. Life Rise starts from that observation: one place to track what matters, with unified data, a consistent experience from one space to the next, and the option to share with a partner, a family or a flatshare.',
    ),
    sections: [
      {
        title: l('Une base commune, 19 espaces', 'One shared foundation, 19 spaces'),
        body: l(
          'Chaque domaine (nourriture, fitness, finance, organisation, inventaire, voyages, prévisions) est une feature Angular chargée en lazy loading, avec son propre modèle et ses propres services. Le noyau applicatif porte l’authentification, l’accès Firebase, le thème et les composants partagés. Ce découpage permet d’ajouter un espace sans toucher aux autres, et de garder un bundle initial léger malgré l’étendue fonctionnelle.',
          'Each domain (food, fitness, finance, organisation, inventory, travel, forecasts) is a lazy-loaded Angular feature with its own model and its own services. The application core carries authentication, Firebase access, theming and shared components. That split makes it possible to add a space without touching the others, and to keep the initial bundle light despite the functional breadth.',
        ),
      },
      {
        title: l(
          'Un assistant conversationnel qui agit vraiment',
          'A conversational assistant that actually acts',
        ),
        body: l(
          'Bob, l’assistant intégré, ne se contente pas de répondre : il crée, modifie ou supprime n’importe quel élément de l’application, après confirmation explicite de l’utilisateur. Il accepte la saisie vocale, et une fonction de complétion automatique remplit les champs vides d’un formulaire à partir du contexte. Le quota par profil est plafonné, ce qui impose de concevoir des appels précis plutôt que d’envoyer tout l’état de l’application à chaque requête, exactement la discipline que j’applique à mon usage professionnel de l’IA.',
          'Bob, the built-in assistant, does more than answer: it creates, edits or deletes any item in the application, after explicit confirmation from the user. It accepts voice input, and an auto-completion feature fills a form’s empty fields from context. The per-profile quota is capped, which forces precise calls rather than sending the whole application state with every request — exactly the discipline I apply to my professional use of AI.',
        ),
      },
      {
        title: l('Le collectif, pas seulement le solo', 'Built for groups, not just for one'),
        body: l(
          'Jusqu’à 6 profils par compte, avec partage de recettes, de séances de sport et d’éléments d’inventaire, gestion à plusieurs des tâches et des repas, et une messagerie temps réel avec réactions. Les finances, elles, restent strictement personnelles à chaque profil. C’est la partie qui a demandé le plus de soin sur le modèle de données : décider, domaine par domaine, ce qui se partage et ce qui ne se partage pas.',
          'Up to 6 profiles per account, with sharing of recipes, workouts and inventory items, collaborative management of tasks and meals, and real-time messaging with reactions. Finances, by contrast, stay strictly private to each profile. That is the part that demanded the most care in the data model: deciding, domain by domain, what is shared and what is not.',
        ),
      },
      {
        title: l('Utilisable même sans réseau', 'Usable even without a network'),
        body: l(
          'Les données déjà consultées sont conservées dans IndexedDB, côté navigateur. L’application s’ouvre donc sur du contenu immédiat plutôt que sur un écran de chargement, la navigation reste possible quand la connexion tombe, et les modifications faites hors ligne repartent vers Firestore dès son retour. Sur un modèle facturé à la lecture, c’est aussi une économie directe : les mêmes documents ne sont pas rechargés à chaque changement d’écran.',
          'Data already viewed is kept in IndexedDB, in the browser. The application therefore opens on real content rather than a loading screen, navigation still works when the connection drops, and changes made offline are pushed back to Firestore as soon as it returns. On a pricing model billed per read, that is also a direct saving: the same documents are not fetched again on every screen change.',
        ),
      },
      {
        title: l('Ce que le projet a apporté', 'What the project brought'),
        body: l(
          'Mener un produit seul de bout en bout, sans product owner pour arbitrer ni tech lead pour valider, oblige à décider vite et à assumer ses choix. C’est aussi le meilleur terrain pour éprouver les nouveautés d’Angular en conditions réelles avant de les proposer en mission, et pour traiter sérieusement des sujets qu’on n’aborde pas toujours en régie : conformité RGPD, hébergement européen des données et chiffrement.',
          'Running a product alone from end to end, with no product owner to arbitrate and no tech lead to sign off, forces you to decide quickly and own your choices. It is also the best ground for testing new Angular features in real conditions before proposing them on an assignment, and for seriously tackling subjects you do not always meet as a contractor: GDPR compliance, European data hosting and encryption.',
        ),
      },
    ],
    features: ll(
      [
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
      [
        '19 management spaces, from the dashboard to forecasts',
        'A conversational assistant able to create, edit and delete after confirmation',
        'Automatic form completion from context',
        'Up to 6 profiles per account, with item sharing between profiles',
        'Finances kept strictly private to each profile',
        'Real-time messaging with reactions',
        'Local IndexedDB cache: browsing and navigation possible offline',
        'Public pages prerendered at build time, for an instant first paint',
        'Data hosted in Europe and GDPR compliance',
      ],
    ),
    links: {
      live: 'https://life-rise.web.app/',
      sourceRestricted: l(
        'Life Rise est un produit payant, avec des comptes et des données d’utilisateurs réels. Ouvrir les sources reviendrait à offrir le moyen d’en faire tourner une copie gratuite en local, sans les limites de l’abonnement. Le code reste donc privé.',
        'Life Rise is a paid product, with real user accounts and data. Opening the source would hand out the means to run a free local copy, without the subscription limits. The code therefore stays private.',
      ),
    },
  },
  {
    slug: 'gametime',
    name: l('Game Time', 'Game Time'),
    tagline: l(
      'Six jeux de déduction, à plusieurs et en temps réel',
      'Six deduction games, played together in real time',
    ),
    summary: l(
      'Six jeux bâtis sur un moteur commun, joués dans un salon à code : chronomètre partagé, classement en direct et résultats arbitrés côté serveur.',
      'Six games built on one shared engine, played in a code-protected room: shared timer, live leaderboard and results arbitrated server-side.',
    ),
    year: '2023 - 2026',
    startYear: 2023,
    status: 'live',
    shots: {
      desktop: 'projects/gametime-desktop.webp',
      mobile: 'projects/gametime-mobile.webp',
    },
    stack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'Firebase',
      'IndexedDB',
    ],
    facts: [
      { label: l('Durée (temps libre)', 'Duration (spare time)'), value: l('1 an', '1 year') },
      { label: l('Jeux', 'Games'), value: l('6', '6') },
      { label: l('Détection', 'Detection'), value: l('Zoneless + OnPush', 'Zoneless + OnPush') },
      { label: l('Arbitrage', 'Arbitration'), value: l('Côté serveur', 'Server-side') },
      { label: l('Dictionnaire', 'Dictionary'), value: l('19 000 mots', '19,000 words') },
    ],
    context: l(
      'Game Time est né en 2023 comme un Motus en ligne à deux joueurs. La refonte de 2025-2026 en a fait autre chose : un catalogue de six jeux sur un moteur unique, une partie dont l’issue ne dépend plus de ce que le navigateur déclare, et une application installable qui se met à jour sans interrompre une manche.',
      'Game Time started in 2023 as an online word game for two players. The 2025-2026 rewrite turned it into something else: a catalogue of six games on a single engine, a session whose outcome no longer depends on the browser, and an installable application that updates without interrupting a round.',
    ),
    sections: [
      {
        title: l('Un catalogue, pas six jeux', 'A catalogue, not six games'),
        body: l(
          'Motus, Anagrammes, Drapeaux, Capitales, Marques et Éléments ne sont pas six écrans : ce sont six entrées d’un catalogue déclaratif. Un jeu s’y résume à un libellé, une catégorie, ses filtres et une fonction de tirage ; salon, manches, six essais, indices, chronomètre et classement sont communs. Ajouter un jeu tient en quelques dizaines de lignes, et le joueur n’apprend la règle qu’une fois.',
          'Word guessing, Anagrams, Flags, Capitals, Brands and Elements are not six screens: they are six entries in a declarative catalogue. A game boils down to a label, a category, its filters and a draw function; room, rounds, six attempts, hints, timer and leaderboard are shared. Adding a game takes a few dozen lines, and players learn the rule only once.',
        ),
      },
      {
        title: l('Ne plus croire le client sur parole', 'No longer trusting the client'),
        body: l(
          'Au départ, le navigateur annonçait lui-même s’il avait gagné : il suffisait d’appeler la fonction avec « gagné » pour remplir son compteur sans jouer. Il envoie désormais le mot saisi, pas un verdict. Une Cloud Function le compare à la réponse dans une transaction, vérifie que la manche soumise est bien la suivante, et écrit seule les médailles. Les règles Firestore ferment au joueur ses statistiques, ses amis et son rôle.',
          'At first the browser announced its own win: calling the function with “won” was enough to fill your counter without playing. It now sends the word typed, not a verdict. A Cloud Function compares it to the answer inside a transaction, checks that the submitted round really is the next one, and is alone in writing medals. Firestore rules close off a player’s own statistics, friends and role.',
        ),
      },
      {
        title: l('Le difficile, c’est le temps', 'The hard part is time'),
        body: l(
          'Tout le monde joue la même manche au même moment : chronomètre partagé, classement qui bouge à chaque lettre trouvée, enchaînement automatique des manches. Un retardataire entre en cours de partie ; s’il arrive une fois la partie finie, il est classé dernier et marqué spectateur plutôt que de rejouer seul. À la fin, un vote désigne le jeu suivant, avec un bulletin « peu importe » pour les indécis.',
          'Everyone plays the same round at the same moment: a shared timer, a leaderboard that moves with every letter found, rounds chaining automatically. A latecomer joins mid-game; arriving once it is over, they are ranked last and flagged as a spectator rather than replaying alone. At the end, a vote picks the next game, with a “no preference” ballot for the undecided.',
        ),
      },
      {
        title: l('Les détails qui font qu’on revient', 'The details that bring people back'),
        body: l(
          'Le code de salon fait quatre caractères, dont aucun ne prête à confusion à voix haute : ni O ni I, ni 0 ni 1. On rejoint par ce code, par un lien, par un QR code ou depuis sa liste d’amis. Une invitation déclenche un toast si l’onglet est ouvert, une notification système s’il est en arrière-plan, une push s’il est fermé. Un interrupteur de confidentialité masque ses parties sans rendre injoignable.',
          'The room code is four characters long, none of which can be confused when read aloud: no O, no I, no 0, no 1. You join with that code, a link, a QR code or from your friends list. An invitation triggers a toast if the tab is open, a system notification if it is in the background, a push if it is closed. A privacy switch hides your games without making you unreachable.',
        ),
      },
      {
        title: l('Zoneless, jusqu’au bout', 'Zoneless, all the way'),
        body: l(
          'L’application tourne sans Zone.js : aucune détection de changement implicite, des signaux pour l’état, OnPush sur tous les composants. Le reste suit : routes en chargement différé, préchargement conditionné à la qualité réseau mesurée, page d’accueil prérendue au build, cache Firestore persistant en IndexedDB. La mise à jour du service worker, elle, attend la navigation suivante : jamais en pleine manche.',
          'The application runs without Zone.js: no implicit change detection, signals for state, OnPush on every component. The rest follows: lazy-loaded routes, preloading conditional on measured network quality, a home page prerendered at build time, a persistent Firestore cache in IndexedDB. The service worker update waits for the next navigation: never mid-round.',
        ),
      },
    ],
    features: ll(
      [
        'Six jeux sur un moteur commun, répartis en trois univers',
        'Salon privé à code, rejoignable par lien ou QR code',
        'Chronomètre partagé et classement mis à jour en direct',
        'Manches arbitrées par une Cloud Function, pas par le navigateur',
        'Vote de fin de partie pour désigner le jeu suivant',
        'Médailles par jeu, succès et classement entre amis ou général',
        'Connexion Google, GitHub ou invité, liable ensuite sans perte',
        'Application installable et invitations poussées en temps réel',
      ],
      [
        'Six games on a shared engine, spread across three worlds',
        'Private room with a code, joinable by link or QR code',
        'Shared timer and a leaderboard updated live',
        'Rounds arbitrated by a Cloud Function, not by the browser',
        'End-of-game vote to pick the next game',
        'Medals per game, achievements and a friends or global leaderboard',
        'Google, GitHub or guest sign-in, linkable later without loss',
        'Installable application and invitations pushed in real time',
      ],
    ),
    links: {
      live: 'https://game-time-64133.web.app/',
      github: 'https://github.com/Brice150/GAMETIME',
    },
  },
  {
    slug: 'simulateur-renovation',
    name: l('Simulateur de rénovation', 'Renovation grant simulator'),
    tagline: l(
      'Le montant de ses aides à la rénovation, en quelques questions',
      'Your renovation grant amount, in a handful of questions',
    ),
    summary: l(
      'Un simulateur d’aides à la rénovation énergétique, écrit en 2 jours pour dépanner une connaissance en alternance marketing qui en avait besoin pour son projet.',
      'A simulator for energy renovation grants, written in 2 days to help out an acquaintance on a marketing apprenticeship who needed it for their project.',
    ),
    year: '2023',
    startYear: 2023,
    status: 'live',
    shots: {
      desktop: 'projects/simulator-desktop.webp',
      mobile: 'projects/simulator-mobile.webp',
    },
    stack: ['Angular', 'TypeScript'],
    facts: [
      { label: l('Durée (temps libre)', 'Duration (spare time)'), value: l('2 jours', '2 days') },
      { label: l('Nature', 'Nature'), value: l('Calculateur', 'Calculator') },
      { label: l('Contexte', 'Context'), value: l('Rendre service', 'Helping out') },
      { label: l('Détection', 'Detection'), value: l('Zoneless + OnPush', 'Zoneless + OnPush') },
    ],
    context: l(
      'Une connaissance en alternance marketing avait besoin d’un simulateur d’aides à la rénovation énergétique pour son projet, sans avoir les moyens de le faire développer. Le sujet était clair, le besoin réel et le délai court : deux jours pour livrer quelque chose d’utilisable plutôt qu’une maquette.',
      'An acquaintance on a marketing apprenticeship needed an energy renovation grant simulator for their project, without the budget to have one built. The subject was clear, the need real and the deadline short: two days to ship something usable rather than a mock-up.',
    ),
    sections: [
      {
        title: l('Traduire un barème en calcul', 'Turning a grant scale into a calculation'),
        body: l(
          'Les dispositifs d’aide à la rénovation énergétique sont nombreux, cumulables et conditionnés à des seuils. L’essentiel du travail a consisté à transcrire ces barèmes en calculs justes à partir des informations saisies. Le même exercice, à une tout autre échelle, m’attendait 3 ans plus tard avec la taxation 2026 en mission.',
          'Energy renovation grants are numerous, can be combined and are conditional on thresholds. Most of the work consisted in transcribing those scales into correct calculations from the information entered. The same exercise, on an entirely different scale, was waiting for me 3 years later with the 2026 taxation scheme on assignment.',
        ),
      },
      {
        title: l('Livrer vite, sans sur-concevoir', 'Ship fast, without over-engineering'),
        body: l(
          'Deux jours imposent des arbitrages : pas d’architecture élaborée, pas de fonctionnalité en trop, juste le chemin le plus court entre les questions posées et le montant affiché. C’est aussi un rappel utile qu’un outil simple qui rend service vaut mieux qu’un projet ambitieux jamais terminé.',
          'Two days force trade-offs: no elaborate architecture, no extra features, just the shortest path between the questions asked and the amount displayed. It is also a useful reminder that a simple tool that helps beats an ambitious project that never ships.',
        ),
      },
      {
        title: l('Remis à niveau, sans réécriture', 'Brought up to date, without a rewrite'),
        body: l(
          'Le simulateur a depuis suivi mes pratiques actuelles : détection de changement sans Zone.js, OnPush sur tous les composants, et pages prérendues au build servies en statique sur GitHub Pages, l’application prenant le relais côté navigateur. Ni les barèmes ni le parcours de questions n’ont bougé : le projet était resté assez simple pour absorber la mise à niveau.',
          'The simulator has since followed my current practices: change detection without Zone.js, OnPush on every component, and pages prerendered at build time then served statically on GitHub Pages, with the application taking over in the browser. Neither the grant scales nor the question flow moved: the project had stayed simple enough to absorb the upgrade.',
        ),
      },
    ],
    features: ll(
      [
        'Saisie des informations du foyer et du projet de rénovation',
        'Calcul des aides applicables à partir des barèmes en vigueur',
        'Résultat immédiat, sans compte ni installation',
        'Pages prérendues au build et servies en statique, sans serveur',
        'Développé en 2 jours pour répondre à un besoin concret',
      ],
      [
        'Entry of household and renovation project details',
        'Calculation of applicable grants from the scales in force',
        'Immediate result, with no account and no installation',
        'Pages prerendered at build time and served statically, with no server',
        'Built in 2 days to answer a concrete need',
      ],
    ),
    links: {
      live: 'https://brice150.github.io/Simulator/',
      github: 'https://github.com/Brice150/Simulator',
    },
  },
  {
    slug: 'pickme',
    name: l('Pick Me', 'Pick Me'),
    tagline: l(
      'Une application de rencontre construite de zéro, front et back',
      'A dating application built from scratch, front and back',
    ),
    summary: l(
      'Profils, préférences, système de correspondance réciproque et messagerie, sur une API Java/Spring Boot et une base relationnelle.',
      'Profiles, preferences, a mutual matching system and messaging, on a Java/Spring Boot API and a relational database.',
    ),
    year: '2023 - 2024',
    startYear: 2023,
    status: 'archive',
    shots: {
      desktop: 'projects/pickme-desktop.webp',
      mobile: 'projects/pickme-mobile.webp',
    },
    stack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'Java',
      'Spring Boot',
      'PostgreSQL',
    ],
    facts: [
      { label: l('Durée (temps libre)', 'Duration (spare time)'), value: l('1 an', '1 year') },
      { label: l('Nature', 'Nature'), value: l('Full-stack', 'Full-stack') },
      { label: l('Périmètre', 'Scope'), value: l('Front, Back et BDD', 'Front, back and database') },
      { label: l('Cœur du sujet', 'Core challenge'), value: l('Algorithme de sélection', 'Matching algorithm') },
    ],
    context: l(
      'Le projet qui tient le front et le back en même temps : un front Angular exigeant en interactions, et un back Java/Spring avec une vraie modélisation relationnelle. Une application de rencontre est un excellent prétexte : elle concentre authentification, upload, filtrage, appariement et temps réel.',
      'The project that holds front and back at once: an Angular front end heavy on interaction, and a Java/Spring back end with genuine relational modelling. A dating application is an excellent pretext: it concentrates authentication, uploads, filtering, matching and real time.',
    ),
    sections: [
      {
        title: l('Modéliser la correspondance', 'Modelling the match'),
        body: l(
          'Le cœur du domaine est une relation many-to-many asymétrique : un utilisateur exprime un intérêt, la correspondance n’existe que s’il est réciproque. Traduire cette règle en schéma relationnel propre, puis en API qui ne laisse fuir aucune information sur les intentions de l’autre, a été la partie la plus intéressante.',
          'The heart of the domain is an asymmetric many-to-many relationship: a user expresses interest, and the match only exists if it is mutual. Translating that rule into a clean relational schema, then into an API that leaks nothing about the other person’s intentions, was the most interesting part.',
        ),
      },
      {
        title: l('Pourquoi il n’est plus en ligne', 'Why it is no longer online'),
        body: l(
          'Il l’a été. Je l’ai retiré pour deux raisons : l’hébergement avait un coût que rien ne justifiait pour une application que je n’utilisais pas au quotidien, et les applications de rencontre actuelles vont plus loin : elles analysent les photos par intelligence artificielle pour établir un score d’attractivité, ce que mon algorithme ne fait pas. Le code reste ouvert en lecture sur GitHub.',
          'It was, for a while. I took it down for two reasons: hosting had a cost that nothing justified for an application I was not using day to day, and today’s dating applications go further — they analyse photos with AI to produce an attractiveness score, which my algorithm does not do. The code remains open to read on GitHub.',
        ),
      },
    ],
    features: ll(
      [
        'Inscription, authentification et gestion de profil',
        'Préférences de recherche et filtrage des profils',
        'Algorithme de sélection des profils selon la distance et les attributs',
        'Système de correspondance réciproque',
        'Messagerie entre profils correspondants',
        'API REST Java/Spring Boot sur base PostgreSQL',
      ],
      [
        'Sign-up, authentication and profile management',
        'Search preferences and profile filtering',
        'Profile selection algorithm based on distance and attributes',
        'Mutual matching system',
        'Messaging between matched profiles',
        'Java/Spring Boot REST API on a PostgreSQL database',
      ],
    ),
    links: {
      github: 'https://github.com/Brice150/PICKME',
    },
  },
  {
    slug: 'portfolio',
    name: l('Ce portfolio', 'This portfolio'),
    tagline: l(
      'Un site qui applique à lui-même ce qu’il met en avant',
      'A site that applies to itself what it advocates',
    ),
    summary: l(
      'Une vitrine technique autant qu’un CV : pages prérendues, détection de changement sans Zone.js et accessibilité traitée dès la conception.',
      'A technical showcase as much as a CV: prerendered pages, change detection without Zone.js and accessibility handled from the design stage.',
    ),
    year: '2026',
    startYear: 2026,
    status: 'live',
    shots: {
      desktop: 'projects/portfolio-desktop.webp',
      mobile: 'projects/portfolio-mobile.webp',
    },
    stack: ['Angular', 'TypeScript', 'Angular Material'],
    facts: [
      { label: l('Durée (temps libre)', 'Duration (spare time)'), value: l('2 semaines', '2 weeks') },
      { label: l('Thèmes', 'Themes'), value: l('8 variantes', '8 variants') },
      { label: l('Détection', 'Detection'), value: l('Zoneless + OnPush', 'Zoneless + OnPush') },
      { label: l('Référentiel', 'Standard'), value: l('RGAA', 'RGAA') },
    ],
    context: l(
      'Un portfolio de développeur est le seul projet dont le visiteur inspectera le code source, l’onglet réseau et parfois le score Lighthouse. Il devait donc démontrer, sur lui-même, les pratiques défendues en mission.',
      'A developer’s portfolio is the one project whose source, network tab and sometimes Lighthouse score the visitor will actually inspect. It therefore had to demonstrate, on itself, the practices defended on assignment.',
    ),
    sections: [
      {
        title: l('Zoneless et signals', 'Zoneless and signals'),
        body: l(
          'L’application tourne sans Zone.js : l’état est porté par des signals et tous les composants sont en stratégie OnPush. Le résultat est un bundle plus léger et une détection de changement prévisible. C’est le premier projet où je pousse ce parti pris jusqu’au bout, et je le reprends depuis sur mes développements personnels.',
          'The application runs without Zone.js: state is carried by signals and every component uses the OnPush strategy. The result is a lighter bundle and predictable change detection. This is the first project where I take that stance all the way, and I have used it since on my personal work.',
        ),
      },
      {
        title: l('Le contenu avant le JavaScript', 'Content before JavaScript'),
        body: l(
          'Chaque route, fiches projet comprises, est générée en HTML au moment du build. Firebase Hosting ne sert que des fichiers statiques, le contenu est visible immédiatement et indexable, puis l’application prend le relais côté navigateur.',
          'Every route, project case studies included, is generated as HTML at build time. Firebase Hosting serves nothing but static files, the content is visible immediately and indexable, and the application then takes over in the browser.',
        ),
      },
      {
        title: l('Accessibilité dès la conception', 'Accessibility from the design stage'),
        body: l(
          'Structure sémantique, lien d’évitement, navigation clavier complète, contrastes vérifiés, préférences de mouvement respectées, et un panneau de réglages qui laisse la main au visiteur sur le thème, la couleur d’accent et les animations. Les règles d’accessibilité des templates sont vérifiées par ESLint à chaque build.',
          'Semantic structure, a skip link, full keyboard navigation, verified contrast, motion preferences honoured, and a settings panel that hands the visitor control over theme, accent colour and animations. Template accessibility rules are checked by ESLint on every build.',
        ),
      },
    ],
    features: ll(
      [
        'Thème clair, sombre ou système, avec 4 couleurs d’accent',
        'Réglage des animations, mémorisé entre les visites',
        'Maquettes desktop et mobile réellement défilables',
        'Routes prérendues, dont les fiches projet générées à partir des données',
        'Aucune dépendance d’icônes ni de carrousel : tout est fait main',
      ],
      [
        'Light, dark or system theme, with 4 accent colours',
        'Animation setting, remembered between visits',
        'Desktop and mobile mock-ups that genuinely scroll',
        'Prerendered routes, including project pages generated from the data',
        'No icon or carousel dependency: everything is hand-made',
      ],
    ),
    links: {
      github: 'https://github.com/Brice150/Portfolio',
    },
  },
];

const lastYear = (project: Project): number => {
  const years = project.year.match(/\d{4}/g) ?? [];
  return Number(years.at(-1) ?? project.startYear);
};

export const projectsByDate = (): Project[] =>
  [...projects].sort((a, b) => lastYear(b) - lastYear(a) || b.startYear - a.startYear);

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
