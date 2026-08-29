import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_URL, profile } from '../../shared/data/profile';

export interface PageSeo {
  title: string;
  description: string;
  /** Chemin de la route, ex. `/projets`. */
  path: string;
  /** Chemin relatif dans les assets, ex. `projects/LIFE-RISE.webp`. */
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** Données structurées additionnelles injectées avec la page. */
  schema?: Record<string, unknown>;
}

const SCHEMA_ID = 'page-schema';

/**
 * Métadonnées de page. Le service manipule `DOCUMENT` plutôt que le `document`
 * global afin que le canonical et le JSON-LD soient présents dans le HTML
 * généré au prerendering, et pas seulement côté navigateur.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  setPage(config: PageSeo): void {
    const url = `${SITE_URL}${config.path === '/' ? '/' : config.path}`;
    const image = `${SITE_URL}/assets/images/${config.image ?? 'logo.webp'}`;

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
    this.setSchema(
      config.schema ?? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: config.title,
        description: config.description,
        url,
        inLanguage: 'fr-FR',
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

  /** Fiche projet : données structurées dédiées. */
  projectSchema(name: string, description: string, url: string): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name,
      description,
      url,
      inLanguage: 'fr-FR',
      author: { '@type': 'Person', name: profile.fullName, url: SITE_URL },
    };
  }
}
