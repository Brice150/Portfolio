import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { format } from '../i18n/format';
import { DEFAULT_LANG, LANGS, Lang, isLang } from '../i18n/lang';
import { Dictionary, LOCALES, LOCALE_LIST } from '../i18n/locales';

const STORAGE_KEY = 'portfolio-lang';

const matchLang = (tag: string | undefined | null): Lang => {
  const prefix = tag?.toLowerCase().split('-')[0];

  return LANGS.find((lang) => lang === prefix) ?? DEFAULT_LANG;
};

/** Le prerendering reste en français ; le navigateur bascule à l'hydratation. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly lang = signal<Lang>(DEFAULT_LANG);
  readonly locales = LOCALE_LIST;
  readonly format = format;

  readonly t = computed<Dictionary>(() => LOCALES[this.lang()].dictionary);
  readonly locale = computed(() => LOCALES[this.lang()]);

  constructor() {
    this.restore();

    effect(() => {
      const lang = this.lang();

      if (!this.isBrowser) return;

      this.document.documentElement.setAttribute('lang', lang);
      this.persist(lang);
    });
  }

  /** Fléchée : appelée depuis un template, la lecture du signal y est tracée. */
  readonly tr = <T extends string | string[]>(value: Record<Lang, T>): T =>
    value[this.lang()];

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  private restore(): void {
    if (!this.isBrowser) return;

    const view = this.document.defaultView;

    try {
      const stored = view?.localStorage.getItem(STORAGE_KEY);

      if (isLang(stored)) {
        this.lang.set(stored);
        return;
      }
    } catch {
      // Stockage indisponible : la langue du navigateur fait alors foi.
    }

    this.lang.set(matchLang(view?.navigator.language));
  }

  private persist(lang: Lang): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Navigation privée ou stockage bloqué : sans conséquence sur l'affichage.
    }
  }
}
