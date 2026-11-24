import { Localized, LocalizedList } from '../i18n/lang';
import { IconName } from './icon';

export interface AiAgent {
  id: string;
  icon: IconName;
  name: Localized;
  tagline: Localized;
  /** Les sources que l'agent lit avant d'agir. */
  inputs: LocalizedList;
  actions: LocalizedList;
  output: Localized;
}

export interface PipelineEnd {
  icon: IconName;
  label: Localized;
  detail: Localized;
}
