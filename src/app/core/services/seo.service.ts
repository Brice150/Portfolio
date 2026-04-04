import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  schemaId = 'dynamic-schema';
  meta = inject(Meta);
  title = inject(Title);

  setPage(config: { title: string; description: string; url: string }): void {
    this.title.setTitle(config.title);

    this.meta.updateTag({
      name: 'description',
      content: config.description,
    });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({ property: 'og:url', content: config.url });

    this.meta.updateTag({ property: 'twitter:title', content: config.title });
    this.meta.updateTag({
      property: 'twitter:description',
      content: config.description,
    });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${config.url}#page`,
      name: config.title,
      url: config.url,
      isPartOf: {
        '@id': 'https://portfolio-brice.web.app/#website',
      },
      about: {
        '@id': 'https://portfolio-brice.web.app/#person',
      },
    };

    this.injectSchema(schema);
  }

  injectSchema(schema: any): void {
    const existing = document.getElementById(this.schemaId);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.schemaId;
    script.text = JSON.stringify(schema);

    document.head.appendChild(script);
  }
}
