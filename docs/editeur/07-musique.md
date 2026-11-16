# Éditeur de musique

Composer les musiques du jeu dans l'esprit de **Mario Paint** : on choisit un instrument (un « tampon »), on touche la grille pour poser une note, et le morceau tourne en boucle pendant qu'on compose. On l'ouvre avec **Musique** dans la barre de l'éditeur de carte ; l'adresse est `/#/musique`. Maquette : `design/music-editor.pen`.

## La grille

- **En largeur** : les temps, 16 par mesure (4 temps de 4 cases, une case sur deux de chaque groupe plus sombre pour lire le rythme). Un morceau fait de 1 à 8 mesures, choisies par les onglets **1 2 3 4…** (**+** en ajoute une).
- **En hauteur** : les notes de la **gamme** choisie seulement (deux octaves et la note de départ au-dessus) : impossible de jouer faux. La note de départ (la tonique) est en gras sur une ligne plus claire.
- **En dessous** : la batterie, **grosse caisse**, **caisse claire**, **charley**. Un nouveau morceau a déjà un rythme de base.
- Toucher une case avec un tampon pose la note (et la fait entendre) ; la toucher avec le même tampon l'enlève ; un autre tampon la remplace. La **gomme** enlève.

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
- **Morceau** : le nom, le nombre de mesures, **Mes morceaux** (en ouvrir un autre), **Nouveau**, **Supprimer** (deux touches).
- **Annuler / refaire** (Ctrl+Z, Ctrl+Y) : 100 étapes.

Les morceaux sont enregistrés dans le navigateur (`localStorage`, clé `pk-songs`). En arrière-plan, la lecture s'arrête.

**Sur téléphone** : en portrait, une mesure à la fois, les tampons en bas sous le pouce ; en paysage, deux mesures, les tampons à gauche, la barre du haut glisse sur le côté ; sur grand écran, quatre mesures.

À venir : le mixage (volume par instrument), le son lo-fi (filtre, souffle, vinyle, swing), puis la musique dans le jeu (une par carte, variantes jour / nuit / pluie / donjon / combat).

## Les fichiers

| Fichier | Rôle |
|---|---|
| `music-editor/music-editor.component.*` | La page : grille, tampons, transport, volets Gamme et Morceau |
| `music-editor/shared/song.ts` | Le morceau : notes, batterie, gammes, instruments |
| `music-editor/shared/music-engine.ts` | Le son : instruments synthétisés, séquenceur (notes planifiées un peu à l'avance) |
| `music-editor/shared/song-storage.ts` | Enregistrement dans le navigateur |

(Chemins relatifs à `src/app/modules/`.)
