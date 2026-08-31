import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_URL, profile } from '../../shared/data/profile';
import { Lang, Localized } from '../i18n/lang';
import { LOCALES } from '../i18n/locales';
import { LanguageService } from './language.service';

export interface PageSeo {
  title: Localized;
  description: Localized;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  schema?: (lang: Lang) => Record<string, unknown>;
}

const SCHEMA_ID = 'page-schema';

const ROBOTS_INDEXED = 'index, follow, max-image-preview:large';
const ROBOTS_EXCLUDED = 'noindex, follow';

/** En JPEG et non en WebP : LinkedIn ne décode pas ce format. */
const SHARE_IMAGE = 'og-banner.jpg';

/** `DOCUMENT` et non le `document` global : le JSON-LD doit sortir au prerendering. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly languageService = inject(LanguageService);

  private readonly config = signal<PageSeo | undefined>(undefined);

  constructor() {
    effect(() => {
      const config = this.config();
      const lang = this.languageService.lang();

      if (config) this.apply(config, lang);
    });
  }

  setPage(config: PageSeo): void {
    this.config.set(config);
    // Le prerendering sérialise dès que l'application est stable : pas d'attente.
    this.apply(config, this.languageService.lang());
  }

  private apply(config: PageSeo, lang: Lang): void {
    const url = `${SITE_URL}${config.path === '/' ? '/' : config.path}`;
    const image = `${SITE_URL}/assets/images/${config.image ?? SHARE_IMAGE}`;
    const locale = LOCALES[lang].tag;
    const title = config.title[lang];
    const description = config.description[lang];

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: config.noindex ? ROBOTS_EXCLUDED : ROBOTS_INDEXED,
    });

    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:locale', content: locale.replace('-', '_') });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setSchema(
      config.schema?.(lang) ?? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: title,
        description,
        url,
        inLanguage: locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
      },
    );
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setSchema(schema: Record<string, unknown>): void {
    const head = this.document.head;
    this.document.getElementById(SCHEMA_ID)?.remove();

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', SCHEMA_ID);
    script.textContent = JSON.stringify(schema);
    head.appendChild(script);
  }

  projectSchema(
    name: Localized,
    description: Localized,
    url: string,
  ): (lang: Lang) => Record<string, unknown> {
    return (lang) => ({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name: name[lang],
      description: description[lang],
      url,
      inLanguage: LOCALES[lang].tag,
      author: { '@type': 'Person', name: profile.fullName, url: SITE_URL },
    });
  }
}
