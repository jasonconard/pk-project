# La carte (le plan du lieu)

Le menu Carte montre le plan du lieu où l'on se trouve, vu de haut. On l'ouvre en jeu avec **Menu → Carte**. Maquette : `design/main-view.pen` (Carte). Couleur de la carte : vert d'eau.

## Le plan

Le plan est dessiné tout seul à partir de la carte, à l'ouverture de la fenêtre. Il n'y a rien à dessiner à la main : une carte modifiée dans l'éditeur a tout de suite son plan à jour.

- **Le sol** tel qu'il est peint : herbe, chemins, eau, sol de grotte.
- **Les reliefs** : dehors, un dessus est plus clair ; dans une grotte, la roche levée autour du sol est plus sombre. Une falaise sombre marque le bord sud d'une hauteur.
- **Les objets**, montrés de face et posés à leur place : maisons, arbres, lampadaires, cristaux, entrée de grotte. Le plan ressemble à un vieux plan de ville.
- Ne sont **pas** dessinés : les ennemis, les PNJ, les zones et les lumières invisibles, et les objets posés par le jeu (coffres et ennemis d'un étage généré).

Toute la carte est dessinée, même les morceaux loin du joueur.

## Sur le plan

- **Le joueur** : un point orange qui bat.
- **Les passages** vers une autre carte : un numéro vert d'eau à leur place. Ils sont repris dans la liste sous le plan, avec le nom du lieu et sa sorte (Donjon, Intérieur, Ville…). Toucher un passage de la liste amène le plan dessus.

## Se déplacer dans le plan

- **Glisser** le plan pour le déplacer.
- **+** et **−** (ou la molette) pour zoomer. Les zooms sont des nombres entiers, pour garder les pixels nets ; le plus petit montre toute la carte.
- La **cible** revient sur le joueur.

## Le jeu attend

Tant que le menu du jeu ou une de ses fenêtres est ouvert (Sac, Équipe, Liens, Agenda, Carte, Sauver), le joueur, les ennemis, les événements et l'horloge attendent : aucun ennemi ne vient pendant qu'on lit le plan. Le décor reste animé (météo, objets qui bougent).

## Limites

- Les portes de salle d'un donjon ne sont pas des passages : elles ne sont pas numérotées. La mini-carte de donjon viendra plus tard.
- Un passage ne se touche pas pour voyager : le plan montre, il n'emmène pas.

## Dans le code

- `game/map-plan/` : la fenêtre (le plan dans un canevas, les repères par-dessus).
- `game/shared/model/map-plan.ts` : `drawMapPlan` dessine le plan d'une carte à partir de ses données seules (2 unités du monde par pixel) et liste ses passages.
- `Game.held` (`GameService.setHeld`) : le jeu attend sous le menu et ses fenêtres.
