# Éditeur de musique

Composer les musiques du jeu dans l'esprit de **Mario Paint** : on choisit un instrument (un « tampon »), on touche la grille pour poser une note, et le morceau tourne en boucle pendant qu'on compose. On l'ouvre avec **Musique** dans la barre de l'éditeur de carte ; l'adresse est `/#/musique`. Maquette : `design/music-editor.pen`.

## La grille

- **En largeur** : les temps, 16 par mesure (4 temps de 4 cases, une case sur deux de chaque groupe plus sombre pour lire le rythme). Un morceau fait de 1 à 8 mesures, choisies par les onglets **1 2 3 4…** (**+** en ajoute une).
- **En hauteur** : les notes de la **gamme** choisie seulement (deux octaves et la note de départ au-dessus) : impossible de jouer faux. La note de départ (la tonique) est en gras sur une ligne plus claire.
- **En dessous** : la batterie, **grosse caisse**, **caisse claire**, **charley**. Un nouveau morceau a déjà un rythme de base.
- Toucher une case avec un tampon pose la note (et la fait entendre) ; la toucher avec le même tampon l'enlève ; un autre tampon la remplace. La **gomme** enlève.
- **Notes tenues** : appuyer sur une case puis glisser le doigt vers la droite pose une note qui dure jusqu'où on lâche (une barre de sa couleur après le rond). Appuyer sur une note posée puis glisser l'allonge ou la raccourcit. Toucher sa barre agit sur toute la note (l'enlever, changer d'instrument, la gommer). Une note posée sur la barre d'une autre (même ligne) coupe la première ; une note tenue s'arrête avant la suivante. Au son, la mélodie, la basse et la nappe tiennent toute la longueur, la cloche et la corde résonnent plus longtemps.

## Les instruments

Tous sont fabriqués en direct par le navigateur (aucun fichier son) :

| Tampon | Son |
|---|---|
| Mélodie (rouge) | onde carrée, façon Game Boy |
| Cloche (jaune) | deux sinusoïdes qui se modulent (son métallique qui s'adoucit) |
| Corde (vert) | dents de scie avec un filtre qui se ferme (corde pincée) |
| Basse (bleu) | triangle et une sinusoïde une octave en dessous |
| Nappe (violet) | deux dents de scie légèrement désaccordées, filtre doux, attaque lente |

## Jouer, la gamme, le morceau

- **Lecture** (ou Espace) : le morceau tourne en boucle à partir de la mesure affichée ; la colonne jouée s'allume, la vue suit d'une mesure à l'autre. Les changements s'entendent tout de suite.
- **Tempo** : 50 à 180 temps par minute (− / + par 2, ou taper la valeur).
- **Gamme** : la note de départ (12 notes) et la couleur (Majeur, Mineur, Penta. majeure / mineure, Dorien, Blues), avec **Écouter la gamme**. Les notes gardent leur ligne quand on change de gamme.
- **Morceau** : le nom, le nombre de mesures, des **rythmes de batterie** tout faits (Simple, Lo-fi, Calme, Combat, Danse, Aucun : remplacent la batterie de toutes les mesures), les outils de **mesure** (choisir une mesure, **Copier**, **Coller** sur une autre, **Vider**), **Mes morceaux** (en ouvrir un autre), **Nouveau**, **Supprimer** (deux touches).
- **Mixage** : le volume de chaque instrument et de la batterie (0 à 150 %).
- **Lo-fi** : des réglages tout faits (Propre, Lo-fi doux, Cassette, Vieux vinyle, Console 8 bits) et six curseurs :

| Réglage | Effet |
|---|---|
| Chaleur | un filtre qui étouffe les aigus (vieille radio) |
| Grain | moins de niveaux de volume (vieil échantillonneur, son 8 bits) |
| Flottement | la hauteur ondule légèrement (cassette usée) |
| Souffle | un léger bruit de fond |
| Vinyle | des craquements de disque |
| Swing | une double croche sur deux arrive un peu en retard (rythme nonchalant) |

Le mixage et le lo-fi s'écoutent sans fermer le volet (bouton lecture dans le volet). Bouger un curseur ne compte qu'une fois dans l'historique.
- **Annuler / refaire** (Ctrl+Z, Ctrl+Y) : 100 étapes.

Les morceaux sont enregistrés dans le navigateur (`localStorage`, clé `pk-songs`). En arrière-plan, la lecture s'arrête.

**Sur téléphone** : en portrait, une mesure à la fois, les tampons en bas sous le pouce ; en paysage, deux mesures, les tampons à gauche, la barre du haut glisse sur le côté ; sur grand écran, quatre mesures.

À venir : la musique dans le jeu (une par carte, variantes jour / nuit / pluie / donjon / combat, fondus) et l'export en fichier.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `music-editor/music-editor.component.*` | La page : grille, tampons, transport, volets Gamme et Morceau |
| `music-editor/shared/song.ts` | Le morceau : notes, batterie, gammes, instruments |
| `music-editor/shared/music-engine.ts` | Le son : instruments synthétisés, volume par piste, chaîne lo-fi (flottement → grain → chaleur), souffle et vinyle, swing, séquenceur (notes planifiées un peu à l'avance) |
| `music-editor/shared/song-storage.ts` | Enregistrement dans le navigateur |

(Chemins relatifs à `src/app/modules/`.)
