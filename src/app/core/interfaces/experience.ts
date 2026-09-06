import { Localized, LocalizedList } from '../i18n/lang';
import { IconName } from './icon';

export type MilestoneKind =
  'work' | 'education' | 'certification' | 'turning-point';

export interface Mission {
  label: Localized;
  period: Localized;
  summary: Localized;
  stack: string[];
}

export interface Milestone {
  id: string;
  kind: MilestoneKind;
  period: Localized;
  startYear: number;
  title: Localized;
  organisation: Localized;
  location?: Localized;
  logo?: string;
  summary: Localized;
  achievements: LocalizedList;
  stack: string[];
  missions?: Mission[];
  current?: boolean;
}

export interface Certification {
  title: Localized;
  issuer: string;
  year: string;
  icon: IconName;
}
