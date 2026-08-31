import { Localized } from '../i18n/lang';
import { IconName } from './icon';

export interface Skill {
  name: Localized;
  level: number;
  note: Localized;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  icon: IconName;
  description: Localized;
  skills: Skill[];
}

export interface Practice {
  icon: IconName;
  title: Localized;
  description: Localized;
}
