import { Localized, LocalizedList } from '../i18n/lang';

export type ProjectStatus = 'live' | 'archive' | 'wip';

export interface ProjectLink {
  live?: string;
  github?: string;
  sourceRestricted?: Localized;
}

export interface ProjectShots {
  desktop: string;
  mobile: string;
}

export interface ProjectSection {
  title: Localized;
  body: Localized;
}

export interface ProjectFact {
  label: Localized;
  value: Localized;
}

export interface Project {
  slug: string;
  name: Localized;
  tagline: Localized;
  summary: Localized;
  year: string;
  startYear: number;
  status: ProjectStatus;
  shots: ProjectShots;
  stack: string[];
  facts: ProjectFact[];
  context: Localized;
  sections: ProjectSection[];
  features: LocalizedList;
  links: ProjectLink;
}
