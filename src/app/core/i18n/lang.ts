export const LANGS = ['fr', 'en'] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'fr';

export type Localized = Record<Lang, string>;

export type LocalizedList = Record<Lang, string[]>;

export const l = (fr: string, en: string): Localized => ({ fr, en });

export const ll = (fr: string[], en: string[]): LocalizedList => ({ fr, en });

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);
