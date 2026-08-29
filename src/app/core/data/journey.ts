import { Certification, Milestone } from '../interface/experience';

export const milestones: Milestone[] = [
  {
    id: 'open',
    kind: 'work',
    period: '2026 — aujourd’hui',
    startYear: 2026,
    title: 'Développeur Full-Stack confirmé',
    organisation: 'Open',
    location: 'Rennes, France',
    logo: 'history/open.webp',
    current: true,
    summary:
      'Nouvelle étape en ESN, sur des applications métier Angular et Java. Je rejoins l’équipe avec le rôle attendu d’un profil confirmé : produire, arbitrer techniquement et faire monter les autres.',
    achievements: [
      'Prise en main rapide d’un contexte fonctionnel et d’une base de code existante.',
      'Développement full-stack sur la chaîne Angular / Spring Boot.',
      'Application des standards de qualité et de revue de code sur lesquels je m’appuie depuis cinq ans.',
    ],
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'SQL', 'Git'],
  },
  {
    id: 'capgemini',
    kind: 'work',
    period: '2024 — 2026',
    startYear: 2024,
    title: 'Développeur Full-Stack confirmé',
    organisation: 'Capgemini',
    location: 'Rennes, France',
    logo: 'history/capgemini.webp',
    summary:
      'Deux ans sur un ensemble d’applications web dédiées à la gestion des navires de plaisance, pour un client du secteur public. Un domaine réglementaire où chaque règle de gestion a une conséquence juridique, et où la donnée existante ne se réécrit pas.',
    achievements: [
      'Conception et évolution de plusieurs applications web de gestion des navires de plaisance.',
      'Développement complet de la taxation 2026 : traduction d’un nouveau barème réglementaire en règles de calcul, en modèle de données et en interfaces de saisie et de contrôle.',
      'Maintenance évolutive et corrective sur un parc applicatif en production, avec des utilisateurs métier au quotidien.',
      'Amélioration continue des performances : identification des requêtes coûteuses, révision des stratégies de chargement, allègement des écrans les plus sollicités.',
      'Encadrement d’un alternant sur toute sa période et accompagnement des développeurs juniors de l’équipe.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'Java', 'Spring Boot', 'Oracle', 'GitLab'],
  },
  {
    id: 'sopra',
    kind: 'work',
    period: '2021 — 2024',
    startYear: 2021,
    title: 'Développeur Full-Stack',
    organisation: 'Sopra Steria',
    location: 'Rennes, France',
    logo: 'history/sopra.webp',
    summary:
      'Ma première mission de développeur, et celle qui a tout ancré : une application web de gestion de la maintenance des véhicules militaires. Trois ans pour passer du statut de reconverti à celui de référent frontend de l’équipe.',
    achievements: [
      'Participation à la conception et au développement d’une application de gestion de la maintenance de véhicules militaires, en Angular et Java.',
      'Rôle de référent frontend : choix d’architecture, conventions, revues systématiques des développements de l’équipe.',
      'Pilotage d’une équipe de deux développeurs pour tenir les jalons et les délais annoncés au client.',
      'Accompagnement d’un stagiaire, avec transmission des bonnes pratiques pour soutenir sa montée en compétences.',
      'Montée en charge progressive sur le back Java/Spring, jusqu’à couvrir la chaîne complète.',
    ],
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Talend', 'Git'],
  },
  {
    id: 'reconversion',
    kind: 'turning-point',
    period: '2021',
    startYear: 2021,
    title: 'La bascule vers le développement',
    organisation: 'Reconversion professionnelle',
    summary:
      'Diplôme d’ingénieur aérospatial en poche, je fais le choix assumé de ne pas exercer dans l’aéronautique. Ce qui m’intéressait dans mes projets d’école, ce n’était pas la turbine : c’était le code qui la simulait. Je passe une certification Java, je construis mes premiers projets, et je rejoins une ESN comme développeur.',
    achievements: [
      'Certification Java validée chez M2i Formation en 2021.',
      'Premiers projets web personnels menés seul, du besoin jusqu’au déploiement.',
      'Entrée en ESN comme développeur full-stack, sans repasser par la case stage.',
    ],
    stack: ['Java', 'Angular', 'Autoformation'],
  },
  {
    id: 'ensma',
    kind: 'education',
    period: '2017 — 2021',
    startYear: 2017,
    title: 'Diplôme d’ingénieur et Master en aérospatial',
    organisation: 'ISAE-ENSMA',
    location: 'Poitiers, France',
    summary:
      'Une école d’ingénieurs généraliste tournée vers la mécanique et l’énergétique : optimisation moteur, analyse thermique avancée, gestion de projet, innovation drone. La formation qui m’a appris à modéliser un système complexe avant de le construire.',
    achievements: [
      'Diplôme d’ingénieur et Master en aérospatial, obtenus en 2021.',
      'Projets d’optimisation moteur et d’analyse thermique avancée.',
      'Gestion de projet en équipe et projet d’innovation autour des drones.',
      'TOEIC 945/990 (niveau C1) et First Certificate de Cambridge.',
    ],
    stack: ['Modélisation', 'Calcul scientifique', 'Gestion de projet'],
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
    title: 'Diplôme d’ingénieur & Master aérospatial',
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
export const personalNotes: { icon: 'globe' | 'star' | 'shield' | 'gauge'; title: string; text: string }[] = [
  {
    icon: 'globe',
    title: 'Quatre mois en Suède',
    text: 'Un long séjour qui a solidifié mon anglais au quotidien et mon goût pour les environnements de travail internationaux.',
  },
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
