import { Localized, l, ll } from '../../core/i18n/lang';
import { Certification, Milestone } from '../../core/interfaces/experience';
import { IconName } from '../../core/interfaces/icon';

export const milestones: Milestone[] = [
  {
    id: 'open',
    kind: 'work',
    period: l('Mai 2026 - aujourd’hui', 'May 2026 - present'),
    startYear: 2026,
    title: l('Développeur Full-Stack Confirmé', 'Senior Full-Stack Developer'),
    organisation: l('Open', 'Open'),
    location: l('Rennes', 'Rennes, France'),
    logo: 'history/open.webp',
    current: true,
    summary: l(
      'Poursuite du travail engagé pour la DGAMPA, sur une autre application du parc : la refonte complète de l’outil de gestion des parcelles du cadastre aquacole, bâtie sur le Design Système de l’État.',
      'Continuing the work started for the DGAMPA, on another application in the portfolio: the complete rebuild of the aquaculture land registry management tool, built on the French State Design System.',
    ),
    achievements: ll(
      [
        'Refonte d’une application de gestion des parcelles du cadastre aquacole, en Angular et Java.',
        'Mise en œuvre du DSFR, le Design Système de l’État, comme socle d’interface.',
        'Conformité RGAA visée sur l’ensemble du périmètre, hors partie cartographique.',
        'Reprise du domaine métier maritime déjà pratiqué sur la mission précédente, sans temps de latence.',
      ],
      [
        'Rebuild of an aquaculture land registry management application, in Angular and Java.',
        'Adoption of the DSFR, the French State Design System, as the interface foundation.',
        'RGAA accessibility compliance targeted across the whole scope, apart from the mapping section.',
        'Picked the maritime business domain back up from the previous assignment, with no ramp-up time.',
      ],
    ),
    stack: ['Angular', 'TypeScript', 'RxJS', 'DSFR', 'RGAA', 'Java', 'Spring Boot', 'PostgreSQL'],
  },
  {
    id: 'capgemini',
    kind: 'work',
    period: l('Nov. 2024 - Avr. 2026', 'Nov. 2024 - Apr. 2026'),
    startYear: 2024,
    title: l('Développeur Full-Stack Confirmé', 'Senior Full-Stack Developer'),
    organisation: l('Capgemini', 'Capgemini'),
    location: l('Rennes', 'Rennes, France'),
    logo: 'history/capgemini.webp',
    summary: l(
      'Un an et demi sur les applications de gestion des navires de plaisance de la DGAMPA. Un domaine réglementaire où chaque règle de gestion a une portée juridique.',
      'A year and a half on the DGAMPA’s pleasure-craft management applications. A regulated domain where every business rule carries legal weight.',
    ),
    achievements: ll(
      [
        'Conception et évolution de plusieurs applications web de gestion des navires de plaisance.',
        'Développement complet de la taxation 2026 : traduction d’un nouveau barème réglementaire en règles de calcul, en modèle de données et en interfaces de saisie et de contrôle.',
        'Maintenance évolutive et corrective sur un parc applicatif en production, avec des utilisateurs métier au quotidien.',
        'Amélioration continue des performances : identification des requêtes coûteuses et révision des stratégies de chargement.',
        'Encadrement d’un alternant et accompagnement des développeurs juniors de l’équipe.',
      ],
      [
        'Design and evolution of several pleasure-craft management web applications.',
        'Full development of the 2026 taxation scheme: translating a new regulatory scale into calculation rules, a data model, and data-entry and control interfaces.',
        'Corrective and evolutive maintenance on a portfolio of applications in production, with business users every day.',
        'Continuous performance improvement: identifying expensive queries and revising fetching strategies.',
        'Mentoring an apprentice and supporting the team’s junior developers.',
      ],
    ),
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
    period: l('Juil. 2021 - Oct. 2024', 'Jul. 2021 - Oct. 2024'),
    startYear: 2021,
    title: l('Développeur Full-Stack', 'Full-Stack Developer'),
    organisation: l('Sopra Steria', 'Sopra Steria'),
    location: l('Paris puis Rennes', 'Paris, then Rennes'),
    logo: 'history/sopra.webp',
    summary: l(
      '3 ans et 4 mois pour le ministère des Armées, 6 mois à Paris puis le reste à Rennes. Deux missions successives : l’intégration de données d’abord, le développement Full-Stack ensuite, avec une prise de responsabilité progressive jusqu’au rôle de référent frontend.',
      '3 years and 4 months for the French Ministry of the Armed Forces, 6 months in Paris then the rest in Rennes. Two successive assignments: data integration first, Full-Stack development next, with responsibility growing steadily up to the frontend referent role.',
    ),
    missions: [
      {
        label: l('Première mission : intégration de données', 'First assignment: data integration'),
        period: l('Juil. 2021 - Déc. 2022', 'Jul. 2021 - Dec. 2022'),
        summary: l(
          'Conception et exploitation de flux d’intégration Talend sur des données d’aéronefs militaires : reprises, transformations et contrôles de cohérence sur des volumes conséquents.',
          'Design and operation of Talend integration flows on military aircraft data: migrations, transformations and consistency checks on substantial volumes.',
        ),
        stack: ['Java', 'PostgreSQL', 'Talend'],
      },
      {
        label: l(
          'Seconde mission : développement Full-Stack',
          'Second assignment: Full-Stack development',
        ),
        period: l('Janv. 2023 - Oct. 2024', 'Jan. 2023 - Oct. 2024'),
        summary: l(
          'Près de 2 ans sur une application web de gestion de la maintenance de véhicules militaires terrestres, de la conception au maintien en condition opérationnelle.',
          'Nearly 2 years on a web application for managing the maintenance of military ground vehicles, from design through to operational upkeep.',
        ),
        stack: ['Angular', 'TypeScript', 'RxJS', 'Java', 'Spring Boot', 'Oracle'],
      },
    ],
    achievements: ll(
      [
        'Rôle de référent frontend : choix d’architecture, conventions, revues systématiques des développements de l’équipe.',
        'Pilotage d’une équipe de 2 développeurs pour tenir les jalons et les délais annoncés au client.',
        'Accompagnement d’un stagiaire, avec transmission des bonnes pratiques pour soutenir sa montée en compétences.',
        'Montée en charge progressive sur le back Java/Spring, jusqu’à couvrir la chaîne complète.',
      ],
      [
        'Frontend referent role: architecture decisions, conventions, systematic review of the team’s work.',
        'Leading a team of 2 developers to meet the milestones and deadlines committed to the client.',
        'Mentoring an intern, passing on best practices to support their progress.',
        'Gradual ramp-up on the Java/Spring back end, until covering the full chain.',
      ],
    ),
    stack: [],
  },
  {
    id: 'reconversion',
    kind: 'turning-point',
    period: l('Avr. - Juil. 2021', 'Apr. - Jul. 2021'),
    startYear: 2021,
    title: l('La bascule vers le développement', 'The switch to software development'),
    organisation: l('Reconversion professionnelle', 'Career change'),
    location: l('À distance', 'Remote'),
    summary: l(
      'Diplôme d’ingénieur aérospatial en poche, choix assumé de ne pas exercer dans l’aéronautique : le métier menait vers des calculs très théoriques, quand les réalisations concrètes se trouvaient du côté du logiciel.',
      'Aerospace engineering degree in hand, a deliberate choice not to work in aeronautics: the job led towards highly theoretical calculations, while tangible work was to be found on the software side.',
    ),
    achievements: ll(
      [
        'Reconversion menée via une POEI Java, avec un CDI à la clé chez Sopra Steria.',
        'Certification Java validée chez M2i Formation en juillet 2021.',
        'Entrée en ESN comme développeur Full-Stack en CDI, sans passer par un stage de développement.',
      ],
      [
        'Career change through a Java conversion programme, leading to a permanent contract at Sopra Steria.',
        'Java certification passed at M2i Formation in July 2021.',
        'Joined a consultancy as a permanent Full-Stack developer, without going through a development internship.',
      ],
    ),
    stack: ['Angular', 'Java'],
  },
  {
    id: 'ensma',
    kind: 'education',
    period: l('Sept. 2017 - Fév. 2021', 'Sep. 2017 - Feb. 2021'),
    startYear: 2017,
    title: l('Double diplôme d’ingénieur aérospatial', 'Dual aerospace engineering degree'),
    organisation: l('ISAE-ENSMA', 'ISAE-ENSMA'),
    location: l('Poitiers', 'Poitiers, France'),
    summary: l(
      'Une école d’ingénieurs tournée vers la mécanique et l’énergétique : optimisation moteur, analyse thermique avancée, gestion de projet. La formation qui apprend à modéliser un système complexe avant de le construire, et 2 stages de calcul menés en laboratoire puis en industrie.',
      'An engineering school focused on mechanics and energy: engine optimisation, advanced thermal analysis, project management. The training that teaches you to model a complex system before building it, plus 2 simulation internships, first in a laboratory then in industry.',
    ),
    missions: [
      {
        label: l('Stage ingénieur aérothermique, Safran', 'Aerothermal engineering internship, Safran'),
        period: l('Juil. - Déc. 2020', 'Jul. - Dec. 2020'),
        summary: l(
          'Modélisation CFD en 1D, 2D et 3D de cavités de turbines haute pression, avec pour objectif de limiter l’élévation de température des écoulements. 6 mois en Seine-et-Marne, sur un sujet directement industriel.',
          '1D, 2D and 3D CFD modelling of high-pressure turbine cavities, aimed at limiting the temperature rise of the flows. 6 months near Paris, on a directly industrial subject.',
        ),
        stack: ['CFD', 'Simulation numérique', 'Aérothermique'],
      },
      {
        label: l(
          'Stage ingénieur aérothermique, KTH, Stockholm (Suède)',
          'Aerothermal engineering internship, KTH, Stockholm (Sweden)',
        ),
        period: l('Juin - Sept. 2019', 'Jun. - Sep. 2019'),
        summary: l(
          'Création d’un modèle CFD pour l’étude du flux radial de purge dans les cavités de turbines haute pression, au Kungliga Tekniska högskolan de Stockholm, en Suède. 4 mois de travail et de vie entièrement en anglais.',
          'Building a CFD model to study radial purge flow in high-pressure turbine cavities, at the Kungliga Tekniska högskolan in Stockholm, Sweden. 4 months of work and daily life entirely in English.',
        ),
        stack: ['CFD', 'Simulation numérique', 'Aérothermique', 'Anglais professionnel'],
      },
    ],
    achievements: ll(
      [
        'Diplôme d’ingénieur et Master en aérospatial, obtenus en 2021.',
        'Projets d’optimisation moteur et d’analyse thermique avancée.',
        'Gestion de projet en équipe, sur des sujets de conception mécanique.',
        'TOEIC 945/990 (niveau C1) et First Certificate de Cambridge.',
      ],
      [
        'Engineering degree and Master’s in aerospace, both obtained in 2021.',
        'Projects in engine optimisation and advanced thermal analysis.',
        'Team project management, on mechanical design subjects.',
        'TOEIC 945/990 (level C1) and Cambridge First Certificate.',
      ],
    ),
    stack: [],
  },
];

export const certifications: Certification[] = [
  {
    title: l('Certification Angular', 'Angular certification'),
    issuer: 'Angular Training',
    year: '2024',
    icon: 'code',
  },
  {
    title: l('Certification Java', 'Java certification'),
    issuer: 'M2i Formation',
    year: '2021',
    icon: 'server',
  },
  {
    title: l('Double diplôme d’ingénieur aérospatial', 'Dual aerospace engineering degree'),
    issuer: 'ISAE-ENSMA',
    year: '2021',
    icon: 'graduation',
  },
  {
    title: l('TOEIC : 945/990 (C1)', 'TOEIC: 945/990 (C1)'),
    issuer: 'ETS Global',
    year: '2017',
    icon: 'globe',
  },
];

export interface PersonalNote {
  icon: IconName;
  title: Localized;
  text: Localized;
}

export const personalNotes: PersonalNote[] = [
  {
    icon: 'shield',
    title: l('Ju-jitsu, ceinture verte', 'Ju-jitsu, green belt'),
    text: l(
      'Une pratique qui apprend la régularité et le fait qu’on progresse par répétitions, pas par éclairs de génie.',
      'A practice that teaches consistency, and that progress comes from repetition rather than flashes of genius.',
    ),
  },
  {
    icon: 'gauge',
    title: l('Fitness', 'Fitness'),
    text: l(
      'La discipline de la charge progressive, transposable presque telle quelle à l’apprentissage technique.',
      'The discipline of progressive overload, which transfers almost unchanged to learning technical skills.',
    ),
  },
  {
    icon: 'star',
    title: l('Ukulélé', 'Ukulele'),
    text: l(
      'Parce qu’il faut bien une activité où le débogage consiste simplement à rejouer le passage plus lentement.',
      'Because you need one activity where debugging just means playing the passage again, more slowly.',
    ),
  },
];
