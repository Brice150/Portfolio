export type ProjectStatus = 'live' | 'archive' | 'wip';

export interface ProjectLink {
  live?: string;
  github?: string;
}

export interface ProjectShots {
  /** Capture pleine hauteur affichée dans le mockup desktop. */
  desktop: string;
  /** Capture pleine hauteur affichée dans le mockup mobile. */
  mobile: string;
}

export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** Résumé court affiché sur la carte. */
  summary: string;
  year: string;
  /** Année de début, utilisée pour classer les projets du plus récent au plus ancien. */
  startYear: number;
  status: ProjectStatus;
  featured: boolean;
  /** Image de couverture (carte + partage social). */
  cover: string;
  /** Absentes lorsque le projet n’a pas de démo publique à capturer. */
  shots?: ProjectShots;
  stack: string[];
  /** Chiffres ou faits marquants affichés en tête de fiche. */
  facts: { label: string; value: string }[];
  context: string;
  sections: ProjectSection[];
  features: string[];
  links: ProjectLink;
}
