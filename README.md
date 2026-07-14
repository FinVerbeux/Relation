# Relation

Relation est une application statique de cartographie d’investigation/OSINT, pensée pour Cloudflare Pages et utilisable directement dans un navigateur.

## Fonctionnalités clés

- Graphe interactif de personnes, pseudos, emails, IP, sources, fichiers et preuves.
- Création intelligente de liens : après l’ajout d’un élément, sélectionner un autre élément peut créer automatiquement une relation contextualisée.
- Raccourcis clavier pour les actions importantes, entièrement personnalisables depuis **Paramètres**.
- Paramètres accessibles depuis la topbar, à côté des outils OSINT.
- Multi-dossiers, historique de versions, import/export JSON, export PNG, rapport PDF et client autonome.
- Données conservées localement dans le navigateur.

## Tests locaux

```bash
npm test
npm run dev
```

Ouvrez ensuite <http://127.0.0.1:4173/index.html>. Pour tester avec l’environnement Cloudflare Pages local, utilisez :

```bash
npm run dev:pages
```

La procédure complète est documentée dans `docs/LOCAL_TESTING.md`.

## Déploiement Cloudflare Pages

Le projet ne nécessite pas de build : publiez la racine du dépôt.

- Framework preset : None / Static HTML
- Build command : vide
- Build output directory : `/` ou racine du dépôt
- Fichier d’entrée : `index.html`
- En-têtes de sécurité : `_headers`
- Documentation d’architecture : `docs/ARCHITECTURE.md`
- Tests locaux et Cloudflare Pages : `docs/LOCAL_TESTING.md`

## Architecture

La base actuelle reste volontairement statique, mais les responsabilités sont isolées dans des sections fonctionnelles : modèle, persistance, graphe, interface, actions/raccourcis, imports et exports. Consultez `docs/ARCHITECTURE.md` pour les conventions et la cible modulaire recommandée.
