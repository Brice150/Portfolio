import { IconName } from './icon';

export type MilestoneKind = 'work' | 'education' | 'certification' | 'turning-point';

/** Une mission au sein d'une même entreprise, avec sa propre stack. */
export interface Mission {
  label: string;
  period: string;
  summary: string;
  stack: string[];
}

export interface Milestone {
  id: string;
  kind: MilestoneKind;
  /** Libellé affiché, ex. « Juil. 2024 — Janv. 2026 ». */
  period: string;
  /** Année de début, utilisée pour le tri et l'attribut datetime. */
  startYear: number;
  title: string;
  organisation: string;
  location?: string;
  logo?: string;
  summary: string;
  achievements: string[];
  /** Stack globale, utilisée lorsque l'étape ne détaille pas ses missions. */
  stack: string[];
  /** Missions successives chez le même employeur, chacune avec sa stack. */
  missions?: Mission[];
  current?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: IconName;
}
