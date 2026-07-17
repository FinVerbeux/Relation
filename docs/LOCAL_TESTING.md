# Tests locaux et Cloudflare Pages

Ce projet est une application statique : il peut être testé localement sans build et déployé tel quel sur Cloudflare Pages.

## Prérequis

- Node.js 20 ou plus pour lancer les checks locaux.
- Python 3 pour servir rapidement le dossier en local.
- Optionnel : Wrangler si vous voulez reproduire l’environnement Cloudflare Pages localement.

## Commandes rapides

```bash
npm test
npm run dev
```

Puis ouvrez <http://127.0.0.1:4173/index.html>.

## Tester comme sur Cloudflare Pages

```bash
npm run dev:pages
```

Cette commande utilise `wrangler pages dev .` via `npx`. Elle peut télécharger Wrangler au premier lancement si l’outil n’est pas déjà installé.

## Ce que vérifie `npm test`

Le script `tools/check.js` vérifie :

- la présence de `index.html` comme page statique complète ;
- la syntaxe JavaScript du script embarqué ;
- la présence du bouton **Paramètres** ;
- la présence du registre central des raccourcis ;
- la présence de la logique de liaison automatique intelligente ;
- la présence des vues Timeline, Tableau et Audit ;
- la présence des exports CSV ;
- la présence de la navigation mobile et de sa media query dédiée ;
- la présence des en-têtes de sécurité Cloudflare Pages dans `_headers`.

## Paramètres Cloudflare Pages recommandés

Dans Cloudflare Pages :

- **Framework preset** : None / Static HTML
- **Build command** : vide
- **Build output directory** : `/` ou racine du dépôt
- **Root directory** : racine du dépôt

Le fichier `_headers` est lu automatiquement par Cloudflare Pages lors du déploiement.
