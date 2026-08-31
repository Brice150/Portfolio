import { access, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const SITE_URL = 'https://portfolio-brice.web.app';

const distDir = join(process.cwd(), 'dist', 'portfolio');
const browserDir = join(distDir, 'browser');

await generate404();
await generateSitemap();

/**
 * Firebase Hosting sert automatiquement `404.html` avec un vrai statut HTTP 404
 * pour toute URL inconnue. On y recopie la page « introuvable » prérendue plutôt
 * que de mettre en place une réécriture, qui répondrait 200.
 */
async function generate404() {
  const source = join(browserDir, 'not-found', 'index.html');

  try {
    await access(source);
    await copyFile(source, join(browserDir, '404.html'));
    console.log('✔ 404.html généré depuis la page « introuvable » prérendue.');
  } catch {
    console.warn('✖ Page « introuvable » prérendue absente : 404.html non généré.');
    process.exitCode = 1;
  }
}

/**
 * Le sitemap est dérivé des routes réellement prérendues : impossible qu'il
 * dérive du site au fil des ajouts de pages ou de projets.
 *
 * Ni `lastmod` ni `changefreq` ni `priority` : les deux derniers sont ignorés
 * par les moteurs, et un `lastmod` mis à la date du build sur toutes les URL
 * est faux dès le deuxième déploiement, ce qui décrédibilise le fichier.
 */
async function generateSitemap() {
  const manifest = join(distDir, 'prerendered-routes.json');

  try {
    const { routes } = JSON.parse(await readFile(manifest, 'utf8'));

    const entries = Object.keys(routes)
      .filter((route) => route !== '/not-found')
      .sort()
      .map((route) => {
        const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;

        return ['  <url>', `    <loc>${loc}</loc>`, '  </url>'].join('\n');
      });

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      '</urlset>',
      '',
    ].join('\n');

    await writeFile(join(browserDir, 'sitemap.xml'), xml, 'utf8');
    console.log(`✔ sitemap.xml généré (${entries.length} URL).`);
  } catch (error) {
    console.warn(`✖ Sitemap non généré : ${error.message}`);
    process.exitCode = 1;
  }
}

