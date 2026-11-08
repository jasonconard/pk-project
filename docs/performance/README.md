# Performances

Le jeu ramait sur mobile (RedMagic : 26 à 40 FPS, instable, surtout en marchant et sous certaines météos). Cette page retrace les mesures et les optimisations, dans l'ordre où elles ont été faites, avec ce qu'il faut en retenir.

**Résultat** (RedMagic, qualité Haute, météo Poison) : 60 FPS stables, pire image à 18–20 ms. Avant, on avait 26 à 40 FPS instables, 600 à 940 appels de dessin par image et des pires images à 25–42 ms.

## 1. Mesurer d'abord : la console de diagnostic

On n'optimise bien que ce qu'on a mesuré. Un clic sur la tuile °C / fps (en haut à gauche) ouvre un menu caché : **qualité graphique** et **console de diagnostic**. La console se met à jour chaque seconde, et ne mesure rien tant qu'elle est fermée.

| Ligne | Contenu |
|---|---|
| Images | FPS, temps moyen d'une image, **pire** image de la seconde (en rouge au-delà de 50 ms) : c'est elle qu'on ressent comme une saccade. |
| Calcul | Temps du processeur par seconde dans les **déplacements**, la **météo** et l'**envoi du rendu**. |
| Rendu | **Appels de dessin** et triangles par image (toutes les passes), résolution réelle de l'image. |
| Réglages | Ombres, part des particules, géométries et textures en mémoire graphique. |
| Répartition | Origine des appels de dessin de la passe principale : chaque modèle de la carte (avec son nombre de copies), le sol, le joueur, la météo. |

**Lecture** : si les **déplacements** ou la **météo** sont élevés, c'est le calcul du jeu qui coûte. Si l'**envoi du rendu** est élevé, c'est la carte graphique ou son pilote (trop d'appels de dessin, de pixels, d'ombres ou de transparences).

Code : `shared/model/Diagnostics.ts` (mesures), `shared/model/DrawCallBreakdown.ts` (répartition), `game.component.*` (affichage). Le moteur remet ses compteurs à zéro à chaque `render` ; la console les cumule donc à la main sur toutes les passes d'une image (`renderer.info.autoReset = false`).

## 2. La qualité graphique

`shared/model/Quality.ts`, appliquée par `Game.setQuality` / `Game.applyQuality`.

| Qualité | Résolution | Ombres | Particules | Halos (fenêtres, rayons du soleil) | Air qui ondule |
|---|---|---|---|---|---|
| Haute | jusqu'à ×2 | 4096 | 100 % | oui | oui |
| Moyenne | ×1,5 | 2048 | 60 % | oui | oui |
| Économie | ×0,75 | aucune | 35 % | non | seulement si la météo en dépend |

- **Résolution** : le rendu suivait la densité de l'écran (`devicePixelRatio`, environ 3 sur un téléphone récent), soit jusqu'à 9 fois plus de pixels qu'à ×1, inutile pour du pixel art. Elle est maintenant plafonnée. En dessous de ×1, l'image est agrandie en gardant des pixels nets (`image-rendering: pixelated`).
- **Particules** : un facteur commun (`RENDER_DETAIL.particles`) réduit la pluie, la neige, les feuilles, les braises et les fumées.
- **Passes plein écran** : chaque effet de post-traitement redessine toute l'image. En Économie, on garde seulement ceux dont une météo dépend (monde inversé, vieux film, mirage, lanterne de la nuit sans lune).
- **Processeur graphique** : le rendu demande le mode haute performance (`powerPreference: 'high-performance'`).
- **Mode Auto** (par défaut) : il part de Moyenne sur mobile et de Haute sur ordinateur. Toutes les secondes, il compare les FPS à deux seuils. Sous 45 FPS pendant 3 secondes, il descend d'un cran : résolution jusqu'à ×1, puis ombres plus petites, puis réglages Économie. Au-dessus de 58 FPS pendant 8 secondes, il remonte dans l'ordre inverse.

Activer ou couper les ombres recompile les matériaux une fois, ce qui peut provoquer un court à-coup.

## 3. Une vitesse indépendante des FPS

La boucle des déplacements tournait sur un minuteur prévu 120 fois par seconde, et chaque appel avançait le joueur d'un pas fixe. Sur un appareil lent, le minuteur est appelé moins souvent : le joueur ralentissait. On compte maintenant le temps réellement écoulé et on exécute autant de pas de 1/120 s que nécessaire, au plus 12 d'un coup (`GameService.init`). Le saut, la poussière et les animations utilisent aussi le temps réel.

## 4. Les appels de dessin (le vrai goulot)

Sur mobile, chaque appel de dessin coûte cher au pilote graphique. Il y en avait 600 sans ombres et 940 avec. La répartition de la console a montré qu'ils venaient presque tous des objets de la carte : 17 arbres faisaient à eux seuls 141 appels.

### 4.1 Les objets transparents seulement pendant leur fondu (452 → 240)

Les matériaux des objets de la carte étaient marqués **transparents** en permanence. Or three.js dessine un objet transparent visible des deux côtés en **deux passes** : faces arrière, puis faces avant. Tous les plans des arbres, fleurs et barrières coûtaient donc deux appels. Un objet n'est maintenant transparent que pendant son fondu, en une seule passe (`forceSinglePass`). Les pixels vides des textures restent découpés par le test de transparence (`alphaTest`), qui ne demande pas de transparence.

**Piège** : les objets opaques sont dessinés du plus proche au plus loin, les transparents du plus loin au plus proche. Certains morceaux ignorent la profondeur (le texte d'un panneau devant ses poteaux) et comptaient sur l'ordre des transparents. Ils restent donc dans la liste des transparents (`MapHelper.updateMeshOpacity`).

### 4.2 La fusion des morceaux d'un modèle (240 → 81)

Un modèle est fait de boîtes et de plans (environ 8 pour un arbre), et chacun était un objet, donc un appel. Ces morceaux partagent la même texture. On les fusionne en un seul objet par jeu de réglages identiques (`BasicMeshService.mergeParts`) :

1. chaque morceau est « cuit » dans l'espace du modèle, sa position et sa rotation appliquées à ses sommets (`geometry.applyMatrix4`) ;
2. les géométries sont réunies (`mergeGeometries`), avec l'attribut de balancement de la végétation ;
3. les morceaux sans test de profondeur ne sont pas fusionnés, pour la raison vue plus haut.

Un objet de la carte reste un seul objet : l'éditeur, les collisions et le fondu fonctionnent sans changement.

### 4.3 L'instanciation des objets répétés (81 → 50)

Toutes les copies d'un modèle dans un morceau de carte sont dessinées **en une fois** : un objet instancié (`InstancedMesh`) par morceau du modèle, avec la position de chaque copie (`shared/model/ModelInstances.ts`). Les 29 arbres coûtent 1 appel au lieu de 29.

- **Instanciés** : les objets qui ne s'estompent pas, n'ont pas d'événements et dont tous les morceaux testent la profondeur (arbres, barrières, rochers…).
- **Restent individuels** : les maisons et le labo (fondu propre à chacun), les panneaux à lire, les fleurs et les boîtes aux lettres.
- **Éditeur** : le rayon de la souris renvoie le numéro de la copie touchée (`instanceId`). Déplacer une copie revient à réécrire sa position. En supprimer une revient à mettre la dernière à sa place, pour ne pas laisser de trou. Changer l'option « transparent derrière » fait passer l'objet de copie à objet individuel, et inversement.
- **Collisions et cadre de sélection** : on utilise la boîte du modèle, déplacée à la position de la copie (`MapHelper.buildingBounds`).

**Piège** : le shader de la météo calculait la position des sommets dans le monde avec `modelMatrix` seule. Pour une copie, il faut aussi la matrice de la copie (`instanceMatrix`, sous `#ifdef USE_INSTANCING`). Sinon, tous les arbres se balançaient en même temps, et la neige au sol, les flaques et le brouillard étaient calculés au mauvais endroit. De même, les particules qui naissent près des plantes lisent la position de chaque copie (`plantPositions`).

### 4.4 Visibilité des bâtiments

Le fondu et le masquage des bâtiments étaient recalculés 120 fois par seconde, soit environ 7 600 calculs de boîte par seconde. 30 fois par seconde suffit (`VISIBILITY_EVERY`).

## 5. La pluie en marchant

Les gouttes et les flocons s'arrêtent sur le sol et les toits. La hauteur est trouvée par un rayon vers le bas, puis gardée en mémoire par case de 4 unités (`SurfaceHeights`). Cette mémoire était entièrement vidée dès qu'un objet changeait de visibilité, ce qui arrive sans cesse en marchant (les bâtiments près de la caméra sont masqués puis réaffichés). Toute la zone de pluie était alors recalculée, soit environ 13 000 rayons. La liste des surfaces ne suit plus que la visibilité des morceaux de carte : un bâtiment masqué près de la caméra est toujours là. En 8 secondes de marche, la mémoire est vidée une fois au lieu de quatre.

## Récapitulatif (ordinateur, Économie, sans ombres)

| Étape | Appels de dessin par image |
|---|---|
| Départ | 452 |
| Transparents seulement pendant le fondu | 240 |
| Fusion des morceaux | 81 |
| Instanciation | 50 |

En Haute (avec ombres) : environ 900 → 93.

## Sur téléphone

- **30 FPS quand on ne touche à rien** : c'est l'écran qui baisse sa fréquence de rafraîchissement, et le navigateur suit. Dans les paramètres d'affichage, choisis une fréquence fixe (120 ou 144 Hz) au lieu du mode automatique. Dans les options pour les développeurs, active « Forcer la fréquence d'actualisation maximale » si elle existe. Désactive l'économie de batterie.
- **Game Space (RedMagic)** : il ne reconnaît que les applications installées. Installe le jeu depuis Chrome (« Installer l'application »), puis ajoute-le dans Game Space. S'il n'y apparaît pas, ajoute Chrome lui-même.

## À retenir

- **Mesurer avant d'optimiser**, sur l'appareil visé : sur ordinateur, la carte graphique ne saturait pas et cachait le problème.
- **Sur mobile, les appels de dessin coûtent souvent plus que les pixels.** Regrouper (fusion, instanciation) est la première chose à faire.
- **Transparence** : un matériau transparent visible des deux côtés coûte deux passes. L'`alphaTest` suffit pour découper des pixels.
- **Un cache ne doit être vidé que lorsque ses données changent vraiment.**
- **Le temps de jeu se compte en temps réel**, pas en nombre d'appels d'une boucle.
