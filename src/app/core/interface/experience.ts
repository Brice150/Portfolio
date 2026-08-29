import { IconName } from './icon';

export type MilestoneKind = 'work' | 'education' | 'certification' | 'turning-point';

export interface Milestone {
  id: string;
  kind: MilestoneKind;
  /** Libellé affiché, ex. « 2024 – 2026 ». */
  period: string;
  /** Année de début, utilisée pour le tri et l'attribut datetime. */
  startYear: number;
  title: string;
  organisation: string;
  location?: string;
  logo?: string;
  summary: string;
  achievements: string[];
  stack: string[];
  current?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: IconName;
}
