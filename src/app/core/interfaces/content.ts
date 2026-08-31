import { Localized, LocalizedList } from '../i18n/lang';
import { IconName } from './icon';

export interface NavItem {
  label: Localized;
  path: string;
  icon: IconName;
  hint: Localized;
  exact?: boolean;
}

export interface Highlight {
  icon: IconName;
  value: Localized;
  label: Localized;
  detail: Localized;
}

export interface ServiceOffer {
  id: string;
  icon: IconName;
  title: Localized;
  pitch: Localized;
  deliverables: LocalizedList;
}

export interface WorkPrinciple {
  icon: IconName;
  title: Localized;
  description: Localized;
}
