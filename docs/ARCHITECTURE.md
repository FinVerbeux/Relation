# Architecture de Relation

Relation reste volontairement une application statique afin de se déployer sans étape serveur sur Cloudflare Pages, tout en organisant le code autour de responsabilités explicites.

## Domaines fonctionnels

- **Modèle d'enquête** : nœuds, liens, statuts, types et règles de relations intelligentes.
- **Persistance** : stockage local multi-dossiers, index, versions et paramètres utilisateur.
- **Graphe et vues d’enquête** : rendu D3, layouts, sélection, liaison, timeline, vue tableau, audit qualité, filtres, clusters et exports visuels.
- **Interface** : topbar desktop, navigation mobile de consultation, inspecteur latéral/panneau mobile, modales, toast, bloc-notes et paramètres.
- **Actions applicatives** : registre centralisé des actions importantes, raccourcis et commandes UI.
- **Exports/imports** : format `.osintree.json`, CSV, PNG, PDF et client autonome.

## Principes de maintenance

1. Toute nouvelle action importante doit être ajoutée dans le registre `SHORTCUT_ACTIONS`.
2. Les raccourcis ne doivent jamais être codés en dur dans plusieurs endroits : l'UI lit le registre et les paramètres.
3. Les règles de liaison automatique doivent rester dans les fonctions dédiées `inferRelationLabel`, `edgeExists` et `createSmartEdge`.
4. Les données utilisateur restent locales au navigateur ; aucune fonctionnalité ne doit envoyer un dossier vers un service externe.
5. Les changements doivent préserver le modèle statique compatible Cloudflare Pages : `index.html`, `_headers` et documentation.

## Évolution recommandée

Si le projet grossit, la prochaine étape propre consiste à extraire le script embarqué en modules ES :

```text
src/
  app/            # boot, registre d'actions, orchestration
  graph/          # rendu D3, layouts, interactions
  investigations/ # modèle, nœuds, liens, inférence
  persistence/    # storage, migrations, versions, settings
  ui/             # composants DOM, modales, sidebar, topbar
  exports/        # JSON, PNG, PDF, client autonome
```

Cette cible garde le dépôt lisible tout en permettant de continuer à livrer une version statique simple.
