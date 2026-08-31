import { Lang } from './lang';
import en from './locales/en.json';
import fr from './locales/fr.json';

export type Dictionary = typeof fr;

export interface LocaleDefinition {
  code: Lang;
  /** Autonyme : « Español » reste reconnaissable quelle que soit la langue affichée. */
  label: string;
  tag: string;
  dictionary: Dictionary;
}

/**
 * Ajouter une langue : `LANGS` dans `lang.ts`, un `locales/<code>.json`, une
 * entrée ici, un drapeau dans `flag.component.html`, puis `l()` et `ll()`.
 * Chaque étape omise casse la compilation.
 */
export const LOCALES: Record<Lang, LocaleDefinition> = {
  fr: { code: 'fr', label: 'Français', tag: 'fr-FR', dictionary: fr },
  en: { code: 'en', label: 'English', tag: 'en-GB', dictionary: en },
};

export const LOCALE_LIST: readonly LocaleDefinition[] = Object.values(LOCALES);
