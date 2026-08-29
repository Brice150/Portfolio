<div align="center">
  <img height="130" width="130" src="./src/assets/images/logo.webp" alt="Brice Lecomte">

  <h1>Portfolio de Brice Lecomte</h1>
  <p>Développeur Full-Stack Angular / Java · Angular 21 · zoneless · prérendu</p>
</div>

---

## Le projet

Portfolio personnel entièrement statique, prérendu au build et hébergé sur Firebase
Hosting. Il sert autant de CV que de démonstration technique : les pratiques qu'il met
en avant sont celles qu'il applique à lui-même.

**En ligne :** [portfolio-brice.web.app](https://portfolio-brice.web.app/)

## Choix techniques

| Sujet | Choix | Pourquoi |
| --- | --- | --- |
| Framework | Angular 21, composants standalone | Architecture par feature, aucun NgModule |
| Détection de changement | **Zoneless** + `OnPush` partout | Pas de Zone.js dans le bundle, recalculs prévisibles |
| État | Signals (`signal`, `computed`, `input`) | Réactivité fine, interopérabilité RxJS via `toSignal` |
| Rendu | `outputMode: static`, prerendering intégral | Chaque route livrée en HTML, y compris les fiches projet |
| UI | Angular Material 3 + CDK | Theming par tokens système, accent dynamique |
| Styles | CSS natif, `light-dark()`, container queries | Un seul jeu de tokens pour les deux thèmes |
| Icônes | SVG inline maison | Zéro requête réseau, zéro police d'icônes |
| Formulaire | Reactive Forms typés + Formspree | Pas de backend à maintenir |

Aucune dépendance de carrousel, de notifications ou d'icônes : tout est fait main.

## Accessibilité

Le site vise le RGAA sans en faire une case à cocher en fin de projet :

- lien d'évitement, structure sémantique et points de repère ARIA,
- navigation clavier complète, y compris les onglets projets (flèches, `Home`, `End`)
  et les maquettes d'appareils, qui se défilent au clavier,
- `aria-current`, `aria-expanded`, `aria-pressed` et piège à focus sur le menu mobile,
- respect de `prefers-reduced-motion`, doublé d'un réglage explicite pour le visiteur,
- contrastes vérifiés dans les deux thèmes, cibles tactiles d'au moins 44 px.

## Préférences visiteur

Un panneau de réglages, mémorisé dans le stockage local et appliqué avant le premier
rendu pour éviter tout clignotement :

- thème clair / sombre / système,
- 4 couleurs d'accent (azur, violet, émeraude, ambre),
- animations activées ou réduites.

## Structure

```
src/app/
├── core/
│   ├── interfaces/   # contrats de données partagés
│   └── services/     # SEO, préférences d’affichage
├── shared/
│   ├── components/   # entête, pied de page, réglages, icône, timeline,
│   │                 # maquettes d’appareils, entêtes de page et de section
│   ├── data/         # profil, compétences, parcours, projets, expertise, icônes
│   └── directives/   # révélation au défilement, copie presse-papier
├── home/             # hero, chiffres clés, bandeau tech, profil, projets phares
├── skills/  journey/  expertise/  contact/  not-found/
└── projects/         # liste, carte projet, fiche détaillée
```

Une route égale un dossier à la racine de `app/`, chargé en lazy loading.
Les sous-composants vivent directement dans le dossier de leur feature.

## Installation

```bash
npm install
npm start
```

## Build et déploiement

```bash
npm run build     # build + prerendering + 404.html + sitemap.xml
npm run deploy    # build puis firebase deploy --only hosting
```

Le `postbuild` dérive `sitemap.xml` des routes réellement prérendues et recopie la page
« introuvable » en `404.html`, que Firebase sert avec un vrai statut HTTP 404.

## Captures des maquettes

Les visuels affichés dans les maquettes desktop et mobile de la page Projets sont
générés depuis les sites réels, en pilotant Chrome via le protocole DevTools :

```bash
node tools/capture-shots.mjs
```

Sans argument, l'outil recapture tous les projets. On peut aussi cibler un slug
(`node tools/capture-shots.mjs life-rise`). La capture du portfolio lui-même suppose
que `npm start` tourne.

## Qualité

```bash
npm run lint
```

ESLint impose notamment `OnPush` sur tous les composants, l'absence de `any` et les
règles d'accessibilité des templates Angular.
