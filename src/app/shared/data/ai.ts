import { l, ll } from '../../core/i18n/lang';
import { AiAgent, PipelineEnd } from '../../core/interfaces/agent';
import { WorkPrinciple } from '../../core/interfaces/content';

export const pipelineStart: PipelineEnd = {
  icon: 'book',
  label: l('Ticket Jira', 'Jira ticket'),
  detail: l(
    'Le point de départ : un besoin rédigé, avec ses critères d’acceptation.',
    'The starting point: a written need, with its acceptance criteria.',
  ),
};

export const pipelineEnd: PipelineEnd = {
  icon: 'users',
  label: l('Revue et validation humaines', 'Human review and approval'),
  detail: l(
    'Un développeur relit la merge request, tranche et fusionne. L’agent propose, l’humain décide.',
    'A developer reviews the merge request, decides and merges. The agent proposes, the human decides.',
  ),
};

export const agents: AiAgent[] = [
  {
    id: 'developpement',
    icon: 'code',
    name: l('Agent de développement', 'Development agent'),
    tagline: l(
      'Du ticket Jira à un développement full-stack complet.',
      'From a Jira ticket to a complete full-stack implementation.',
    ),
    inputs: ll(
      [
        'Ticket Jira',
        'Maquette',
        'Spécification Confluence',
        'Règles de nommage',
        'DSFR',
        'RGAA',
      ],
      [
        'Jira ticket',
        'Mock-up',
        'Confluence specification',
        'Naming rules',
        'DSFR',
        'RGAA',
      ],
    ),
    actions: ll(
      [
        'Lit le ticket et en extrait les règles de gestion et les critères d’acceptation.',
        'Confronte la maquette à la spécification Confluence pour lever les écarts avant d’écrire une ligne.',
        'Développe de bout en bout, du front Angular au back Java / Spring Boot.',
        'Applique les règles de nommage du projet, les composants du DSFR et les critères du RGAA.',
      ],
      [
        'Reads the ticket and extracts the business rules and acceptance criteria.',
        'Checks the mock-up against the Confluence specification to clear up gaps before writing a single line.',
        'Builds end to end, from the Angular front end to the Java / Spring Boot back end.',
        'Applies the project’s naming rules, DSFR components and RGAA criteria.',
      ],
    ),
    output: l(
      'Une branche avec un développement full-stack conforme à la spécification.',
      'A branch with a full-stack implementation that matches the specification.',
    ),
  },
  {
    id: 'relecture',
    icon: 'search',
    name: l('Agent de relecture', 'Review agent'),
    tagline: l(
      'Une relecture systématique, avant celle d’un humain.',
      'A systematic review, before a human’s.',
    ),
    inputs: ll(
      [
        'Code de la branche',
        'Ticket Jira',
        'Spécification Confluence',
        'Règles du projet',
      ],
      [
        'Branch code',
        'Jira ticket',
        'Confluence specification',
        'Project rules',
      ],
    ),
    actions: ll(
      [
        'Relit l’intégralité du code produit, front comme back.',
        'Relève les écarts avec le ticket, la spécification et les règles du projet.',
        'Détecte les vulnérabilités : données exposées, contrôles d’accès manquants, entrées non validées.',
        'Classe les points à corriger par gravité, avec l’emplacement exact dans le code.',
      ],
      [
        'Reviews all the code produced, front end and back end alike.',
        'Flags gaps against the ticket, the specification and the project rules.',
        'Detects vulnerabilities: exposed data, missing access controls, unvalidated input.',
        'Ranks the issues to fix by severity, with their exact location in the code.',
      ],
    ),
    output: l(
      'Un compte rendu des écarts, des vulnérabilités et des points à corriger.',
      'A report of the gaps, vulnerabilities and issues to fix.',
    ),
  },
  {
    id: 'merge-request',
    icon: 'branch',
    name: l('Agent de merge request', 'Merge request agent'),
    tagline: l(
      'Une merge request GitLab documentée, prête pour la revue.',
      'A documented GitLab merge request, ready for review.',
    ),
    inputs: ll(
      ['Commits de la branche', 'Ticket Jira', 'Compte rendu de relecture'],
      ['Branch commits', 'Jira ticket', 'Review report'],
    ),
    actions: ll(
      [
        'Crée la merge request dans GitLab.',
        'Renseigne les labels adaptés au ticket et au périmètre touché.',
        'Rédige la description : contexte, périmètre et lien vers le ticket.',
        'Explicite les choix techniques et fonctionnels retenus, pour que le relecteur n’ait pas à les deviner.',
      ],
      [
        'Creates the merge request in GitLab.',
        'Sets the labels that fit the ticket and the scope touched.',
        'Writes the description: context, scope and link to the ticket.',
        'Spells out the technical and functional choices made, so the reviewer does not have to guess them.',
      ],
    ),
    output: l(
      'Une merge request complète, compréhensible sans rouvrir le ticket.',
      'A complete merge request, understandable without reopening the ticket.',
    ),
  },
];

/** Les règles qui rendent ces agents fiables plutôt que spectaculaires. */
export const agentGuardrails: WorkPrinciple[] = [
  {
    icon: 'target',
    title: l('Un rôle par agent', 'One role per agent'),
    description: l(
      'Celui qui écrit ne se relit pas. Séparer développement, relecture et merge request évite qu’un agent valide son propre travail, comme dans une équipe.',
      'Whoever writes does not review their own work. Splitting development, review and merge request keeps an agent from approving its own output, just as in a team.',
    ),
  },
  {
    icon: 'layers',
    title: l('Un contexte choisi', 'Hand-picked context'),
    description: l(
      'Chaque agent ne reçoit que ses sources : le ticket, la maquette, la bonne page Confluence. Moins de bruit, moins d’approximations et un coût en tokens maîtrisé.',
      'Each agent only receives its own sources: the ticket, the mock-up, the right Confluence page. Less noise, fewer approximations and a controlled token cost.',
    ),
  },
  {
    icon: 'shield',
    title: l(
      'Les règles du projet comme contrat',
      'Project rules as a contract',
    ),
    description: l(
      'Nommage, DSFR, RGAA et spécification sont des entrées explicites des agents. La conformité est exigée au premier jet, puis vérifiée par la relecture.',
      'Naming, DSFR, RGAA and the specification are explicit inputs to the agents. Compliance is required from the first draft, then checked by the review.',
    ),
  },
  {
    icon: 'users',
    title: l('L’humain tranche', 'The human decides'),
    description: l(
      'Rien n’est fusionné sans relecture et validation par un développeur. Les agents accélèrent la livraison, ils ne retirent à personne la responsabilité du code.',
      'Nothing is merged without review and approval by a developer. Agents speed up delivery; they take responsibility for the code away from no one.',
    ),
  },
];

/** Ce que l'équipe y gagne concrètement. */
export const agentBenefits: WorkPrinciple[] = [
  {
    icon: 'clock',
    title: l('Le temps humain là où il compte', 'Human time where it matters'),
    description: l(
      'Les 2 jours gagnés chaque semaine ne servent pas à produire plus : ils se reportent sur les règles métier, les cas limites et la revue.',
      'The 2 days saved each week are not spent producing more: they go to business rules, edge cases and review.',
    ),
  },
  {
    icon: 'check',
    title: l('Une qualité homogène', 'Consistent quality'),
    description: l(
      'Chaque ticket passe par la même grille de relecture, quelle que soit la charge du sprint.',
      'Every ticket goes through the same review checklist, however busy the sprint.',
    ),
  },
  {
    icon: 'accessibility',
    title: l('Une conformité dès le départ', 'Compliance from the start'),
    description: l(
      'DSFR et RGAA sont appliqués à l’écriture du code, plutôt que corrigés en recette.',
      'DSFR and RGAA are applied as the code is written, rather than fixed during acceptance testing.',
    ),
  },
  {
    icon: 'book',
    title: l('Des merge requests lisibles', 'Readable merge requests'),
    description: l(
      'Description, labels et choix argumentés sont toujours renseignés : la revue va à l’essentiel.',
      'Description, labels and reasoned choices are always filled in: the review gets straight to the point.',
    ),
  },
];
