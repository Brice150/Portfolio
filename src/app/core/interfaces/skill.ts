import { IconName } from './icon';

export interface Skill {
  name: string;
  /** Niveau de maîtrise sur 100, utilisé pour la jauge. */
  level: number;
  note: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  skills: Skill[];
}

export interface Practice {
  icon: IconName;
  title: string;
  description: string;
}
