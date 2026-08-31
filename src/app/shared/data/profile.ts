import { l } from '../../core/i18n/lang';
import { Highlight, NavItem, WorkPrinciple } from '../../core/interfaces/content';

export const SITE_URL = 'https://portfolio-brice.web.app';

export const CAREER_START = 2021;

export const yearsOfExperience = (): number => new Date().getFullYear() - CAREER_START;

export const profile = {
  firstName: 'Brice',
  lastName: 'Lecomte',
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  },
  role: l('Développeur Full-Stack Angular / Java', 'Full-Stack Angular / Java Developer'),
  email: 'brice.lecomte0@gmail.com',
  linkedin: 'https://www.linkedin.com/in/brice-lecomte/',
  github: 'https://github.com/Brice150',
  /** Le CV existe dans les deux langues : le lien suit celle affichée. */
  cv: l('./assets/files/CV Brice Lecomte.pdf', './assets/files/Brice Lecomte Resume.pdf'),
  cvFileName: l('CV Brice Lecomte.pdf', 'Brice Lecomte Resume.pdf'),
  languages: [
    { label: l('Français', 'French'), level: l('Langue maternelle', 'Native speaker') },
    { label: l('Anglais', 'English'), level: l('C1 (TOEIC 945/990)', 'C1 (TOEIC 945/990)') },
  ],
};

export const roleRotation: string[] = [
  'Angular · TypeScript · RxJS & Signals',
  'Java · Spring Boot · REST',
  'PostgreSQL · Oracle · SQL',
  'DSFR · RGAA · Performance',
];

export const navItems: NavItem[] = [
  {
    label: l('Accueil', 'Home'),
    path: '/',
    icon: 'home',
    hint: l('Le profil en une page', 'The profile on one page'),
    exact: true,
  },
  {
    label: l('Parcours', 'Career'),
    path: '/parcours',
    icon: 'route',
    hint: l('De l’aérospatial au web', 'From aerospace to the web'),
  },
  {
    label: l('Compétences', 'Skills'),
    path: '/competences',
    icon: 'code',
    hint: l('La stack, en détail', 'The stack, in detail'),
  },
  {
    label: l('Projets', 'Projects'),
    path: '/projets',
    icon: 'briefcase',
    hint: l('Applications livrées', 'Applications delivered'),
  },
  {
    label: l('Contact', 'Contact'),
    path: '/contact',
    icon: 'mail',
    hint: l('Échanger sur un sujet', 'Start a conversation'),
  },
];

export const highlights: Highlight[] = [
  {
    icon: 'clock',
    value: l(`${yearsOfExperience()} ans`, `${yearsOfExperience()} years`),
    label: l('d’expérience Full-Stack', 'of Full-Stack experience'),
    detail: l(
      '4 missions en ESN sur des domaines réglementés : défense puis administration maritime. Toujours du Angular en front et du Java/Spring en back.',
      '4 consultancy assignments in regulated domains: defence, then maritime administration. Always Angular on the front end and Java/Spring on the back.',
    ),
  },
  {
    icon: 'users',
    value: l('4', '4'),
    label: l('développeurs accompagnés', 'developers mentored'),
    detail: l(
      'Référent frontend, pilotage d’une équipe de 2 développeurs, encadrement d’un stagiaire puis d’un alternant, revues de code au quotidien.',
      'Frontend referent, leading a team of 2 developers, mentoring an intern and then an apprentice, code reviews every day.',
    ),
  },
  {
    icon: 'rocket',
    value: l('5', '5'),
    label: l('projets personnels aboutis', 'personal projects completed'),
    detail: l(
      'Menés de bout en bout : conception, développement, déploiement et maintenance. 4 sont en ligne aujourd’hui.',
      'Taken end to end: design, development, deployment and maintenance. 4 of them are online today.',
    ),
  },
  {
    icon: 'award',
    value: l('2', '2'),
    label: l('certifications techniques', 'technical certifications'),
    detail: l(
      'Certification Java (M2i, 2021) et certification Angular (Angular Training, 2024), en complément d’un double diplôme d’ingénieur aérospatial.',
      'Java certification (M2i, 2021) and Angular certification (Angular Training, 2024), on top of a dual aerospace engineering degree.',
    ),
  },
];

export const principles: WorkPrinciple[] = [
  {
    icon: 'shield',
    title: l('La lisibilité avant l’astuce', 'Readability over cleverness'),
    description: l(
      'Un code que l’équipe relit sans effort vaut mieux qu’une élégance que personne n’ose modifier. Nommer explicitement, découper petit, documenter ce qui n’est pas évident et laisser le reste parler de lui-même.',
      'Code the team can read without effort beats elegance nobody dares to touch. Name things explicitly, keep units small, document what is not obvious and let the rest speak for itself.',
    ),
  },
  {
    icon: 'gauge',
    title: l('La performance se mesure', 'Performance is measured'),
    description: l(
      'Lazy loading, prerendering, requêtes SQL tracées : le temps perdu se profile, il ne se devine pas. Sur mes missions, l’amélioration continue des performances fait partie du contrat.',
      'Lazy loading, prerendering, traced SQL queries: wasted time is profiled, not guessed at. On my assignments, continuous performance improvement is part of the deal.',
    ),
  },
  {
    icon: 'accessibility',
    title: l('L’accessibilité n’est pas une option', 'Accessibility is not optional'),
    description: l(
      'Navigation clavier complète, contrastes vérifiés, structure sémantique, préférences de mouvement respectées. Sur les projets publics, le RGAA se traite dès le premier commit, pas en recette.',
      'Full keyboard navigation, verified contrast, semantic structure, motion preferences honoured. On public-sector projects, accessibility standards are handled from the first commit, not during acceptance testing.',
    ),
  },
  {
    icon: 'sparkles',
    title: l('L’IA comme accélérateur, pas comme auteur', 'AI as an accelerator, not an author'),
    description: l(
      'Utilisée tous les jours pour explorer une piste, générer un squelette ou relire un diff, avec des prompts ciblés et un contexte minimal afin de maîtriser le coût en tokens. Le code livré reste relu, compris et assumé ligne à ligne.',
      'Used every day to explore an approach, generate a skeleton or review a diff, with targeted prompts and minimal context to keep the token cost under control. Shipped code is still reviewed, understood and owned line by line.',
    ),
  },
  {
    icon: 'target',
    title: l('Le métier avant la technique', 'The domain before the technology'),
    description: l(
      'Traduire un barème réglementaire ou un référentiel cadastral en modèle de données suppose d’avoir compris la règle. Le temps passé avec les utilisateurs métier évite des semaines de correctifs.',
      'Turning a regulatory scale or a land registry into a data model means understanding the rule first. Time spent with business users saves weeks of patches.',
    ),
  },
  {
    icon: 'branch',
    title: l('La transmission fait partie du travail', 'Passing it on is part of the job'),
    description: l(
      'Un stagiaire, un alternant et plusieurs développeurs juniors accompagnés. Expliquer un choix technique oblige à le clarifier : l’équipe y gagne, et celui qui explique aussi.',
      'An intern, an apprentice and several junior developers mentored. Explaining a technical choice forces you to clarify it: the team gains, and so does whoever explains.',
    ),
  },
];

export const transferableStrengths: WorkPrinciple[] = [
  {
    icon: 'target',
    title: l('La rigueur du calcul', 'The rigour of calculation'),
    description: l(
      '5 ans à dimensionner des systèmes où l’approximation coûte cher, et le réflexe durable de vérifier les hypothèses avant de construire dessus.',
      '5 years sizing systems where approximation is expensive, and a lasting habit of checking assumptions before building on them.',
    ),
  },
  {
    icon: 'layers',
    title: l('La pensée système', 'Systems thinking'),
    description: l(
      'Un moteur, comme une application, est un ensemble de sous-ensembles qui interagissent. Décomposer, isoler, tester chaque brique : le même métier avec d’autres outils.',
      'An engine, like an application, is a set of interacting sub-assemblies. Break down, isolate, test each part: the same craft with different tools.',
    ),
  },
  {
    icon: 'lightbulb',
    title: l('Le goût du problème neuf', 'A taste for unfamiliar problems'),
    description: l(
      'Se reconvertir suppose d’accepter de redevenir débutant. Cette capacité à absorber un domaine inconnu se remobilise à chaque nouvelle mission métier.',
      'Retraining means accepting being a beginner again. That ability to absorb an unfamiliar domain is called on with every new business assignment.',
    ),
  },
];

/** Seules les clés sont stockées ici ; les libellés vivent dans le dictionnaire. */
export const profileFacts = [
  { icon: 'graduation', label: 'education', value: 'educationValue' },
  { icon: 'award', label: 'certifications', value: 'certificationsValue' },
  { icon: 'monitor', label: 'front', value: 'frontValue' },
  { icon: 'server', label: 'back', value: 'backValue' },
  { icon: 'shield', label: 'domains', value: 'domainsValue' },
  { icon: 'globe', label: 'languages', value: 'languagesValue' },
] as const;
