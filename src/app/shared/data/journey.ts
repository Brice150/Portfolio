import { Certification, Milestone } from '../../core/interfaces/experience';

export const milestones: Milestone[] = [
  {
    id: 'open',
    kind: 'work',
    period: 'Mai 2026 — aujourd’hui',
    startYear: 2026,
    title: 'Développeur Full-Stack confirmé',
    organisation: 'Open',
    location: 'Rennes',
    logo: 'history/open.webp',
    current: true,
    summary:
      'Poursuite du travail engagé pour la DGAMPA, sur une autre application du parc : la refonte complète de l’outil de gestion des parcelles du cadastre aquacole, bâtie sur le Design Système de l’État.',
    achievements: [
      'Refonte d’une application de gestion des parcelles du cadastre aquacole, en Angular et Java.',
      'Mise en œuvre du DSFR, le Design Système de l’État, comme socle d’interface.',
      'Conformité RGAA visée sur l’ensemble du périmètre, hors partie cartographique.',
      'Reprise du domaine métier maritime déjà pratiqué sur la mission précédente, sans temps de latence.',
    ],
    stack: [
      'Angular',
      'TypeScript',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'DSFR',
      'RGAA',
    ],
  },
  {
    id: 'capgemini',
    kind: 'work',
    period: 'Nov. 2024 — Avr. 2026',
    startYear: 2024,
    title: 'Développeur Full-Stack confirmé',
    organisation: 'Capgemini',
    location: 'Rennes',
    logo: 'history/capgemini.webp',
    summary:
      'Un an et demi sur les applications de gestion des navires de plaisance de la DGAMPA. Un domaine réglementaire où chaque règle de gestion a une portée juridique, et où la donnée existante ne se réécrit pas.',
    achievements: [
      'Conception et évolution de plusieurs applications web de gestion des navires de plaisance.',
      'Développement complet de la taxation 2026 : traduction d’un nouveau barème réglementaire en règles de calcul, en modèle de données et en interfaces de saisie et de contrôle.',
      'Maintenance évolutive et corrective sur un parc applicatif en production, avec des utilisateurs métier au quotidien.',
      'Amélioration continue des performances : identification des requêtes coûteuses et révision des stratégies de chargement.',
      'Encadrement d’un alternant et accompagnement des développeurs juniors de l’équipe.',
    ],
    stack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Java',
      'Spring Boot',
      'Oracle',
      'PostgreSQL',
      'Talend',
    ],
  },
  {
    id: 'sopra',
    kind: 'work',
    period: 'Juil. 2021 — Oct. 2024',
    startYear: 2021,
    title: 'Développeur Full-Stack',
    organisation: 'Sopra Steria',
    location: 'Paris puis Rennes',
    logo: 'history/sopra.webp',
    summary:
      '3 ans et 4 mois au service du ministère des Armées, 6 mois à Paris puis le reste à Rennes, sur 2 missions successives : d’abord l’intégration de données, puis le développement Full-Stack, avec une prise de responsabilité progressive jusqu’au rôle de référent frontend.',
    missions: [
      {
        label: 'Première mission — Intégration de données',
        period: 'Juil. 2021 — Déc. 2022',
        summary:
          'Conception et exploitation de flux d’intégration Talend sur des données d’aéronefs militaires : reprises, transformations et contrôles de cohérence sur des volumes conséquents.',
        stack: ['Talend', 'Java', 'PostgreSQL'],
      },
      {
        label: 'Seconde mission — Développement Full-Stack',
        period: 'Janv. 2023 — Oct. 2024',
        summary:
          'Près de 2 ans sur une application web de gestion de la maintenance de véhicules militaires terrestres, de la conception au maintien en condition opérationnelle.',
        stack: [
          'Angular',
          'TypeScript',
          'Java',
          'Spring Boot',
          'Oracle',
        ],
      },
    ],
    achievements: [
      'Rôle de référent frontend au bout de 2 ans : choix d’architecture, conventions, revues systématiques des développements de l’équipe.',
      'Pilotage d’une équipe de 2 développeurs pour tenir les jalons et les délais annoncés au client.',
      'Accompagnement d’un stagiaire, avec transmission des bonnes pratiques pour soutenir sa montée en compétences.',
      'Montée en charge progressive sur le back Java/Spring, jusqu’à couvrir la chaîne complète.',
    ],
    stack: [],
  },
  {
    id: 'reconversion',
    kind: 'turning-point',
    period: 'Avr. — Juil. 2021',
    startYear: 2021,
    title: 'La bascule vers le développement',
    organisation: 'Reconversion professionnelle',
    location: 'À distance',
    summary:
      'Diplôme d’ingénieur aérospatial en poche, choix assumé de ne pas exercer dans l’aéronautique : le métier menait vers des calculs très théoriques, quand les réalisations concrètes se trouvaient du côté du logiciel.',
    achievements: [
      'Reconversion menée via une POEI Java, avec un CDI à la clé chez Sopra Steria.',
      'Certification Java validée chez M2i Formation en juillet 2021.',
      'Entrée en ESN comme développeur Full-Stack en CDI, sans passer par un stage de développement.',
    ],
    stack: ['Angular', 'Java'],
  },
  {
    id: 'ensma',
    kind: 'education',
    period: 'Sept. 2017 — Avr. 2021',
    startYear: 2017,
    title: 'Double diplôme d’ingénieur aérospatial',
    organisation: 'ISAE-ENSMA',
    location: 'Poitiers',
    summary:
      'Une école d’ingénieurs tournée vers la mécanique et l’énergétique : optimisation moteur, analyse thermique avancée, gestion de projet. La formation qui apprend à modéliser un système complexe avant de le construire, et 2 stages de calcul menés en laboratoire puis en industrie.',
    missions: [
      {
        label: 'Stage ingénieur aérothermique — Safran',
        period: 'Juil. — Déc. 2020',
        summary:
          'Modélisation CFD en 1D, 2D et 3D de cavités de turbines haute pression, avec pour objectif de limiter l’élévation de température des écoulements. 6 mois en Seine-et-Marne, sur un sujet directement industriel.',
        stack: ['CFD', 'Simulation numérique', 'Aérothermique'],
      },
      {
        label: 'Stage ingénieur aérothermique — KTH, Stockholm (Suède)',
        period: 'Juin — Sept. 2019',
        summary:
          'Création d’un modèle CFD pour l’étude du flux radial de purge dans les cavités de turbines haute pression, au Kungliga Tekniska högskolan de Stockholm, en Suède. 4 mois de travail et de vie entièrement en anglais.',
        stack: ['CFD', 'Simulation numérique', 'Aérothermique', 'Anglais professionnel'],
      },
    ],
    achievements: [
      'Diplôme d’ingénieur et Master en aérospatial, obtenus en 2021.',
      'Projets d’optimisation moteur et d’analyse thermique avancée.',
      'Gestion de projet en équipe, sur des sujets de conception mécanique.',
      'TOEIC 945/990 (niveau C1) et First Certificate de Cambridge.',
    ],
    stack: [],
  },
];

export const certifications: Certification[] = [
  {
    title: 'Certification Angular',
    issuer: 'Angular Training',
    year: '2024',
    icon: 'code',
  },
  {
    title: 'Certification Java',
    issuer: 'M2i Formation',
    year: '2021',
    icon: 'server',
  },
  {
    title: 'Double diplôme d’ingénieur aérospatial',
    issuer: 'ISAE-ENSMA',
    year: '2021',
    icon: 'graduation',
  },
  {
    title: 'TOEIC — 945/990 (C1)',
    issuer: 'ETS Global',
    year: '2017',
    icon: 'globe',
  },
];

/** Ce qui se passe en dehors de l'écran — et qui dit aussi quelque chose du profil. */
export const personalNotes: {
  icon: 'star' | 'shield' | 'gauge';
  title: string;
  text: string;
}[] = [
  {
    icon: 'shield',
    title: 'Ju-jitsu, ceinture verte',
    text: 'Une pratique qui apprend la régularité et le fait qu’on progresse par répétitions, pas par éclairs de génie.',
  },
  {
    icon: 'gauge',
    title: 'Fitness',
    text: 'La discipline de la charge progressive, transposable presque telle quelle à l’apprentissage technique.',
  },
  {
    icon: 'star',
    title: 'Ukulélé',
    text: 'Parce qu’il faut bien une activité où le débogage consiste simplement à rejouer le passage plus lentement.',
  },
];
