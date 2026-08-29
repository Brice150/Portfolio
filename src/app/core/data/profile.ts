import { Highlight, NavItem, WorkPrinciple } from '../interface/content';

export const SITE_URL = 'https://portfolio-brice.web.app';

/** Première année d'expérience professionnelle en développement. */
export const CAREER_START = 2021;

export const yearsOfExperience = (): number => new Date().getFullYear() - CAREER_START;

export const profile = {
  firstName: 'Brice',
  lastName: 'Lecomte',
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  },
  role: 'Développeur Full-Stack Angular / Java',
  seniority: 'Confirmé',
  baseLocation: 'Rennes, France',
  target: 'Paris — full remote',
  availability: 'Ouvert aux opportunités',
  email: 'brice.lecomte0@gmail.com',
  phone: '+33 6 30 84 63 97',
  phoneHref: '+33630846397',
  linkedin: 'https://www.linkedin.com/in/brice-lecomte/',
  github: 'https://github.com/Brice150',
  cv: './assets/files/Brice Lecomte.pdf',
  languages: [
    { label: 'Français', level: 'Langue maternelle' },
    { label: 'Anglais', level: 'C1 — TOEIC 945/990' },
  ],
} as const;

/** Accroches qui tournent sous le nom dans le hero. */
export const roleRotation: string[] = [
  'Angular · TypeScript · RxJS & Signals',
  'Java · Spring Boot · REST',
  'PostgreSQL · Oracle · SQL',
  'Accessibilité · Performance · SSR',
];

export const navItems: NavItem[] = [
  { label: 'Accueil', path: '/', icon: 'home', hint: 'Le profil en une page', exact: true },
  { label: 'À propos', path: '/a-propos', icon: 'user', hint: 'De l’aérospatial au web' },
  { label: 'Compétences', path: '/competences', icon: 'code', hint: 'La stack, en détail' },
  { label: 'Parcours', path: '/parcours', icon: 'route', hint: 'Cinq ans, trois missions' },
  { label: 'Projets', path: '/projets', icon: 'briefcase', hint: 'Ce que je construis' },
  { label: 'Prestations', path: '/prestations', icon: 'target', hint: 'Comment je peux aider' },
  { label: 'Contact', path: '/contact', icon: 'mail', hint: 'Parlons de votre projet' },
];

export const highlights: Highlight[] = [
  {
    icon: 'clock',
    value: `${yearsOfExperience()} ans`,
    label: 'd’expérience Full-Stack',
    detail:
      'Trois ESN, trois domaines métier exigeants : défense, maritime, secteur public. Toujours sur du Angular en front et du Java/Spring en back.',
  },
  {
    icon: 'users',
    value: '4',
    label: 'développeurs accompagnés',
    detail:
      'Référent frontend, pilotage d’une équipe de deux développeurs, encadrement d’un stagiaire puis d’un alternant, revues de code au quotidien.',
  },
  {
    icon: 'rocket',
    value: '5',
    label: 'applications publiées',
    detail:
      'Des projets personnels menés de bout en bout : conception, développement, déploiement et maintenance, sans filet et sans équipe.',
  },
  {
    icon: 'award',
    value: '2',
    label: 'certifications techniques',
    detail:
      'Certification Java (M2i, 2021) et certification Angular (Angular Training, 2024), en complément d’un diplôme d’ingénieur ISAE-ENSMA.',
  },
];

export const principles: WorkPrinciple[] = [
  {
    icon: 'shield',
    title: 'La lisibilité avant l’astuce',
    description:
      'Un code que l’équipe relit sans effort vaut mieux qu’une élégance que personne n’ose modifier. Je nomme explicitement, je découpe petit, je documente ce qui n’est pas évident et je laisse le reste parler de lui-même.',
  },
  {
    icon: 'gauge',
    title: 'La performance se mesure',
    description:
      'Lazy loading, OnPush, prerendering, requêtes SQL tracées : je ne devine pas où le temps se perd, je le profile. Sur mes missions, l’amélioration continue des performances a toujours fait partie du contrat.',
  },
  {
    icon: 'accessibility',
    title: 'L’accessibilité n’est pas une option',
    description:
      'Navigation clavier complète, contrastes vérifiés, structure sémantique, préférences de mouvement respectées. Le RGAA n’est pas une contrainte de fin de projet mais une manière de coder dès le premier commit.',
  },
  {
    icon: 'branch',
    title: 'La transmission fait partie du travail',
    description:
      'J’ai encadré un stagiaire, un alternant et accompagné des développeurs juniors. Expliquer un choix technique oblige à le clarifier : l’équipe y gagne, et moi aussi.',
  },
];

/** Ce que j'ai gardé de l'ingénierie aérospatiale. */
export const transferableStrengths: WorkPrinciple[] = [
  {
    icon: 'target',
    title: 'La rigueur du calcul',
    description:
      'Cinq ans à dimensionner des systèmes où l’approximation coûte cher. J’ai gardé le réflexe de vérifier les hypothèses avant de construire dessus.',
  },
  {
    icon: 'layers',
    title: 'La pensée système',
    description:
      'Un moteur, comme une application, est un ensemble de sous-ensembles qui interagissent. Décomposer, isoler, tester chaque brique : c’est le même métier avec d’autres outils.',
  },
  {
    icon: 'lightbulb',
    title: 'Le goût du problème neuf',
    description:
      'Se reconvertir, c’est accepter de redevenir débutant. Cette capacité à absorber un domaine inconnu, je la remobilise à chaque nouvelle mission métier.',
  },
];
