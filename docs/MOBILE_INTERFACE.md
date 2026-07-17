# Interface mobile

L'interface desktop reste l'interface principale. Sur téléphone, Relation active une interface de consultation dédiée via une media query CSS afin de ne pas modifier l'expérience bureau.

## Objectif

Le mode mobile privilégie la consultation :

- visualiser le graphe ;
- ouvrir la timeline ;
- ouvrir la vue tableau ;
- lancer l'audit qualité ;
- consulter le détail d'un élément ou d'un lien dans un panneau inférieur.

Les actions de modification avancées restent volontairement moins visibles sur téléphone pour garder une interface lisible.

## Navigation mobile

Une barre fixe en bas de l'écran donne accès à :

- **Graphe** : ferme les panneaux et recentre la vue ;
- **Temps** : ouvre la timeline ;
- **Table** : ouvre la vue tableau ;
- **Audit** : ouvre l'audit qualité ;
- **Détail** : ouvre ou replie l'inspecteur.

## Préservation du bureau

Les styles mobiles sont isolés dans `@media (max-width: 760px)`. L'interface desktop n'est donc pas réorganisée pour les grands écrans.
