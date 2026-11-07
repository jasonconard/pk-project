# 🍁 Bruine d'automne (`autumn-drizzle`)

> Catégorie **Nature** · disponible **de jour et de nuit** · 14 °C le jour, 9 °C la nuit

## Ce qu'on voit / entend

Une fin d'après-midi d'automne : lumière basse et dorée, façades qui rougeoient côté soleil, quelques rayons dans l'air, une fine bruine teintée d'or et des feuilles mortes qui tombent en même temps. Le sol se mouille doucement et des flaques finissent par se former. Le jour, on entend le souffle léger de la bruine et quelques oiseaux. La nuit, l'ambiance passe au brun-orangé avec des fenêtres allumées en orange chaud.

## Les paramètres

Preset `AUTUMN_DRIZZLE` dans `src/app/modules/game/shared/weather/Weather.ts` (valeurs qui diffèrent de `DAY_BASE` / `NIGHT_BASE`) :

| Paramètre | Jour | Nuit | Effet |
|---|---|---|---|
| `litLevel` / `shadowLevel` | 0.92 / 0.6 | 0.36 / 0.24 | Lumière un peu adoucie |
| `sunColor` | `0xffb468` | `0xd8b090` | Soleil orangé : la couleur « automne » vient surtout de là |
| `ambientColor` / `unlitTint` | beiges chauds | bruns | Ombres chaudes, sprites (et gouttes) teintés d'or |
| `specular` | 0.5 | 0.4 | Reflets sur les toits mouillés |
| `sunGlow` | 0.55 | — | Façades face au soleil réchauffées ([éclairage](../concepts/03-eclairage-et-shaders.md)) |
| `godRays` | 0.25 | — | Rayons dorés discrets ([post-effets](../concepts/06-post-effets.md)) |
| `cloudCover` / `cloudAmbient` | 0.35 / 0.06 | 0.3 / — | Quelques nuages qui passent |
| `drizzle` | 0.55 | 0.55 | Bruine fine ([particules](../concepts/08-particules.md)) |
| `autumnLeaves` | 0.6 | 0.5 | Feuilles mortes, quel que soit le mode « Feuilles » |
| `birds` | 0.35 | — | Quelques oiseaux ([audio](../concepts/10-audio.md)) |
| `fog` / `fogColor` | 0.2 / `0xe2c49a` | 0.22 / `0x3c3029` | Voile chaud ([brouillard](../concepts/05-brouillard-et-tenebres.md)) |
| `windowGlow` / `windowTint` | — | 0.7 / `0xffc080` | Fenêtres orangées |

## Comment c'est fait

Cette météo est presque entièrement une **composition** d'éléments existants. C'est un bon exemple de ce qu'on obtient sans écrire de nouveau rendu :

- la **bruine** : les gouttes de `DRIZZLE_STYLE` sont tintées par la lumière (`followLight`), donc la teinte `unlitTint` chaude les rend dorées ;
- les **flaques** se forment avec la bruine, à mi-vitesse (la bruine compte pour moitié dans `updatePuddles`, voir [surfaces météo](../concepts/04-surfaces-meteo.md)) ;
- l'**ambiance dorée** vient du soleil orangé, du `sunGlow` sur les façades et des rayons ;
- les **oiseaux** utilisent le niveau `birds` de [Pluie de printemps](spring-shower.md), sans le bruissement de la forêt.

### Le seul ajout : `autumnLeaves`
La météo [Feuilles](leaves.md) a un réglage utilisateur (automne ou cerisier). Si on réutilisait son `LeafHelper`, choisir « cerisier » transformerait cette météo en pétales roses. On crée donc une **deuxième instance** de `LeafHelper` dans `WeatherHelper` (`this.autumnLeaves`), dont on n'appelle jamais `setMode` : elle reste en mode `'autumn'` (valeur par défaut). Elle est pilotée par son propre paramètre `autumnLeaves`. `autumnLeaves` est aussi dans `SNAP_KEYS` : une fois la transition finie, sa densité est remise exactement à 0, pour que les feuilles disparaissent complètement (voir [architecture](../concepts/01-architecture.md)).

## Maths et code à retenir

- **Composer plutôt que coder** : un nouveau paramètre minimal (`autumnLeaves`) et des valeurs de preset bien choisies suffisent pour une nouvelle ambiance.
- **Une instance par usage** quand un helper a un état réglé par l'utilisateur : on évite que deux météos se gênent.
- **La couleur d'ambiance vient de la lumière**, pas des objets : la teinte du soleil multiplie la couleur des textures (modèle de Lambert, voir [éclairage](../concepts/03-eclairage-et-shaders.md)).

## Expériences à tenter

- `sunColor: new THREE.Color(0xff8040)` : un automne beaucoup plus rouge.
- `autumnLeaves: 1` et `drizzle: 0.2` : surtout des feuilles, presque sans pluie.
- `godRays: 0.7` : des rayons bien marqués à travers la bruine.
- Règle l'heure sur 17 h-18 h : la [lumière du crépuscule](../concepts/02-jour-nuit.md) renforce encore l'effet doré.

## Voir aussi

- [Feuilles](leaves.md) : les feuilles seules, avec le choix automne / cerisier.
- [Bruine](drizzle.md) : la même bruine sous un ciel gris.
- [Pluie de printemps](spring-shower.md) : autre pluie lumineuse, avec des oiseaux.
