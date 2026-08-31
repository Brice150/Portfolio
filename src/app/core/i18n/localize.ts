import { Params, format } from './format';
import { LANGS, Lang, Localized } from './lang';
import { Dictionary, LOCALES } from './locales';

export const fromLocales = (build: (lang: Lang) => string): Localized =>
  Object.fromEntries(LANGS.map((lang) => [lang, build(lang)])) as Localized;

export const fromDictionary = (
  pick: (dictionary: Dictionary) => string,
  params?: Params,
): Localized =>
  fromLocales((lang) => {
    const template = pick(LOCALES[lang].dictionary);

    return params ? format(template, params) : template;
  });
