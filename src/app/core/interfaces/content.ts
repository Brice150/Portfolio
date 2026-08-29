import { IconName } from './icon';

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  /** Description courte affichée dans le menu mobile. */
  hint: string;
  exact?: boolean;
}

export interface Highlight {
  icon: IconName;
  value: string;
  label: string;
  detail: string;
}

export interface ServiceOffer {
  id: string;
  icon: IconName;
  title: string;
  pitch: string;
  deliverables: string[];
}

export interface WorkPrinciple {
  icon: IconName;
  title: string;
  description: string;
}
