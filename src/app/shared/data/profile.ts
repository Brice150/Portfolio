import { Highlight, NavItem, WorkPrinciple } from '../../core/interfaces/content';

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
  email: 'brice.lecomte0@gmail.com',
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
  'DSFR · RGAA · Performance',
];

export const navItems: NavItem[] = [
  { label: 'Accueil', path: '/', icon: 'home', hint: 'Le profil en une page', exact: true },
  { label: 'Compétences', path: '/competences', icon: 'code', hint: 'La stack, en détail' },
  { label: 'Parcours', path: '/parcours', icon: 'route', hint: 'De l’aérospatial au web' },
  { label: 'Projets', path: '/projets', icon: 'briefcase', hint: 'Applications livrées' },
  { label: 'Contact', path: '/contact', icon: 'mail', hint: 'Échanger sur un sujet' },
];

export const highlights: Highlight[] = [
  {
    icon: 'clock',
    value: `${yearsOfExperience()} ans`,
    label: 'd’expérience Full-Stack',
    detail:
      '4 missions en ESN sur des domaines réglementés — défense puis administration maritime. Toujours du Angular en front et du Java/Spring en back.',
  },
  {
    icon: 'users',
    value: '4',
    label: 'développeurs accompagnés',
    detail:
      'Référent frontend, pilotage d’une équipe de 2 développeurs, encadrement d’un stagiaire puis d’un alternant, revues de code au quotidien.',
  },
  {
    icon: 'rocket',
    value: '5',
    label: 'projets personnels aboutis',
    detail:
      'Menés de bout en bout : conception, développement, déploiement et maintenance. 4 sont en ligne, le 5e est démontré en vidéo.',
  },
  {
    icon: 'award',
    value: '2',
    label: 'certifications techniques',
    detail:
      'Certification Java (M2i, 2021) et certification Angular (Angular Training, 2024), en complément d’un double diplôme d’ingénieur aérospatial.',
  },
];

export const principles: WorkPrinciple[] = [
  {
    icon: 'shield',
    title: 'La lisibilité avant l’astuce',
    description:
      'Un code que l’équipe relit sans effort vaut mieux qu’une élégance que personne n’ose modifier. Nommer explicitement, découper petit, documenter ce qui n’est pas évident et laisser le reste parler de lui-même.',
  },
  {
    icon: 'gauge',
    title: 'La performance se mesure',
    description:
      'Lazy loading, prerendering, requêtes SQL tracées : le temps perdu se profile, il ne se devine pas. Sur mes missions, l’amélioration continue des performances fait partie du contrat.',
  },
  {
    icon: 'accessibility',
    title: 'L’accessibilité n’est pas une option',
    description:
      'Navigation clavier complète, contrastes vérifiés, structure sémantique, préférences de mouvement respectées. Sur les projets publics, le RGAA se traite dès le premier commit, pas en recette.',
  },
  {
    icon: 'sparkles',
    title: 'L’IA comme accélérateur, pas comme auteur',
    description:
      'Utilisée tous les jours pour explorer une piste, générer un squelette ou relire un diff, avec des prompts ciblés et un contexte minimal afin de maîtriser le coût en tokens. Le code livré reste relu, compris et assumé ligne à ligne.',
  },
  {
    icon: 'target',
    title: 'Le métier avant la technique',
    description:
      'Traduire un barème réglementaire ou un référentiel cadastral en modèle de données suppose d’avoir compris la règle. Le temps passé avec les utilisateurs métier évite des semaines de correctifs.',
  },
  {
    icon: 'branch',
    title: 'La transmission fait partie du travail',
    description:
      'Un stagiaire, un alternant et plusieurs développeurs juniors accompagnés. Expliquer un choix technique oblige à le clarifier : l’équipe y gagne, et celui qui explique aussi.',
  },
];

/** Ce que l'ingénierie aérospatiale a laissé derrière elle. */
export const transferableStrengths: WorkPrinciple[] = [
  {
    icon: 'target',
    title: 'La rigueur du calcul',
    description:
      '5 ans à dimensionner des systèmes où l’approximation coûte cher, et le réflexe durable de vérifier les hypothèses avant de construire dessus.',
  },
  {
    icon: 'layers',
    title: 'La pensée système',
    description:
      'Un moteur, comme une application, est un ensemble de sous-ensembles qui interagissent. Décomposer, isoler, tester chaque brique : le même métier avec d’autres outils.',
  },
  {
    icon: 'lightbulb',
    title: 'Le goût du problème neuf',
    description:
      'Se reconvertir suppose d’accepter de redevenir débutant. Cette capacité à absorber un domaine inconnu se remobilise à chaque nouvelle mission métier.',
  },
];
