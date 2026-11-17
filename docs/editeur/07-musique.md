# Éditeur de musique

Composer les musiques du jeu dans l'esprit de **Mario Paint** : on choisit un instrument (un « tampon »), on touche la grille pour poser une note, et le morceau tourne en boucle pendant qu'on compose. On l'ouvre avec **Musique** dans la barre de l'éditeur de carte ; l'adresse est `/#/musique`. Maquette : `design/music-editor.pen`.

## La grille

- **En largeur** : les temps, 16 par mesure (4 temps de 4 cases, une case sur deux de chaque groupe plus sombre pour lire le rythme). Un morceau fait de 1 à 8 mesures, choisies par les onglets **1 2 3 4…** (**+** en ajoute une).
- **En hauteur** : les notes de la **gamme** choisie seulement (deux octaves et la note de départ au-dessus) : impossible de jouer faux. La note de départ (la tonique) est en gras sur une ligne plus claire.
- **En dessous** : la batterie, **grosse caisse**, **caisse claire**, **charley**. Un nouveau morceau a déjà un rythme de base.
- Toucher une case avec un tampon pose la note (et la fait entendre) ; la toucher avec le même tampon l'enlève ; un autre tampon la remplace. La **gomme** enlève.
- **Notes tenues** : appuyer sur une case puis glisser le doigt vers la droite pose une note qui dure jusqu'où on lâche (une barre de sa couleur après le rond). Appuyer sur une note posée puis glisser l'allonge ou la raccourcit. Toucher sa barre agit sur toute la note (l'enlever, changer d'instrument, la gommer). Une note posée sur la barre d'une autre (même ligne) coupe la première ; une note tenue s'arrête avant la suivante. Au son, la mélodie, la basse et la nappe tiennent toute la longueur, la cloche et la corde résonnent plus longtemps.

## Les instruments

Chaque morceau a sa **barre de tampons** (jusqu'à 8 instruments). **Appui long** sur un tampon, ou **toucher le tampon déjà choisi**, ouvre la **bibliothèque** pour le changer ; **+ Ajouter** en ajoute un. Dans la bibliothèque, **▶** fait entendre l'instrument (un petit arpège de la gamme du morceau puis une note tenue). En changeant un tampon, **Changer aussi ses notes déjà posées** (coché par défaut) passe ses notes au nouvel instrument. **Retirer ce tampon** l'enlève de la barre (ses notes restent et jouent ; il revient tant qu'elles existent). Le **Mixage** ne montre que les instruments du morceau.

Tous les sons sont fabriqués en direct par le navigateur (aucun fichier son), décrits comme des fiches dans `instruments.ts` (couches d'oscillateurs, enveloppe ADSR, filtre, FM, vibrato retardé, souffle, numéro General MIDI pour un futur import / export MIDI). Dans l'esprit GBA :

| Famille | Instrument | Synthèse | Enveloppe (A / D / S / R) |
|---|---|---|---|
| Mélodie | Carré 50 % *(d'origine)* | carré, passe-bas 3,2 kHz | 5 ms / 240 ms / 0,55 / 120 ms |
| | Carré 25 %, 12,5 %, 75 % | carré à cycle variable (série de Fourier) | 5 ms / 80 ms / 0,6 / 80 ms |
| | Flûte douce | triangle + un peu d'harmonique 2, souffle filtré, vibrato retardé 0,2 s à 5 Hz | 90 ms / 100 ms / 0,7 / 150 ms |
| | Ocarina | sinus pur, vibrato retardé 0,25 s à 5,5 Hz | 40 ms / 100 ms / 0,8 / 120 ms |
| Harmonie | Cloche *(d'origine)* | FM 1:3,5 | 3 ms / 1,5 s / 0 / 0,9 s |
| | Corde *(d'origine)* | dents de scie, filtre qui se ferme | 2 ms / 540 ms / 0 / 300 ms |
| | Harpe | triangle, passe-bas 3 kHz | 2 ms / 450 ms / 0 / 100 ms |
| | Célesta | sinus + harmonique 2 faible, FM 1:1 légère | 2 ms / 600 ms / 0,1 / 200 ms |
| | Guitare nylon | dents de scie + triangle, passe-bas 2 kHz qui se ferme | 2 ms / 400 ms / 0,05 / 120 ms |
| Nappes | Nappe synthé *(d'origine)* | 2 dents de scie ±8 cents, passe-bas 1,4 kHz | 120 ms / 1,2 s / 0,8 / 1 s |
| | Cordes | 2 dents de scie ±7 cents, passe-bas 2,5 kHz | 320 ms / 300 ms / 0,8 / 400 ms |
| | Pad doux | 2 triangles, passe-bas 1,5 kHz | 500 ms / 300 ms / 0,9 / 600 ms |
| Basses | Basse *(d'origine)* | triangle + sinus une octave en dessous | 6 ms / 360 ms / 0,6 / 150 ms |
| | Basse onde | onde 32 échantillons, 4 bits (canal « wave » GBA) | 5 ms / 100 ms / 0,9 / 60 ms |
| | Basse pincée | triangle, passe-bas 800 Hz | 2 ms / 200 ms / 0,3 / 80 ms |
| Batterie | Grosse caisse | sinus 150 → 40 Hz en 0,1 s | ~150 ms |
| | Caisse claire | bruit LFSR 15 bits, passe-bande, petit ton | ~120 ms |
| | Charley | bruit LFSR 7 bits (métallique), passe-haut | ~40 ms |

Au plus 16 notes à la fois (la batterie à part) : au-delà, la plus ancienne s'éteint en douceur. Les valeurs sont des points de départ, à affiner à l'oreille.

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
| Espace | une réverbération légère, comme dans une pièce (20 % par défaut) |

Le mixage et le lo-fi s'écoutent sans fermer le volet (bouton lecture dans le volet). Bouger un curseur ne compte qu'une fois dans l'historique.
- **Annuler / refaire** (Ctrl+Z, Ctrl+Y) : 100 étapes.

Les morceaux sont enregistrés dans le navigateur (`localStorage`, clé `pk-songs`). En arrière-plan, la lecture s'arrête.

## Dans le jeu

Le volet **Jeu** choisit le morceau de chaque moment, sur la carte :

| Moment | Quand |
|---|---|
| Jour | le jour |
| Nuit | la nuit (sans morceau : celui du jour) |
| Pluie | les météos de la catégorie Pluie & tempêtes : bruine, averse, orage, mousson… (sans morceau : jour ou nuit) |
| Combat | pendant un combat (sans morceau : la musique en cours continue) |

Le changement de moment se fait en fondu (le morceau s'éteint, l'autre monte). La musique démarre au premier toucher ou à la première touche (le navigateur bloque le son avant), s'arrête en arrière-plan. Son volume : **Son → Musique** dans la barre du jeu (coupé avec les sons). Les donjons auront leur moment quand ils existeront.

**Les morceaux du navigateur jouent tout de suite dans le jeu, sur cet appareil.** Pour les mettre dans le jeu publié : **Exporter (music.ts)** télécharge tous les morceaux et les choix de moments, à mettre dans `src/assets/music/music.ts`. Le jeu part de ce fichier ; les morceaux du navigateur de même id le remplacent, et les choix du navigateur passent devant. Un navigateur sans morceaux part de ceux du fichier.

**Sur téléphone** : en portrait, une mesure à la fois, les tampons en bas sous le pouce ; en paysage, deux mesures, les tampons à gauche, la barre du haut glisse sur le côté ; sur grand écran, quatre mesures.

À venir : une musique par carte quand il y aura plusieurs cartes, le moment Donjon.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `music-editor/shared/instruments.ts` | Les fiches des instruments |
| `music-editor/shared/synth.ts` | Les briques : carrés à cycle variable, onde 4 bits GBA, bruit LFSR 7 / 15 bits, réverb |
| `music-editor/music-editor.component.*` | La page : grille, tampons, transport, volets Gamme et Morceau |
| `music-editor/shared/song.ts` | Le morceau : notes, batterie, gammes, instruments |
| `music-editor/shared/music-engine.ts` | Le son : une voix générique qui joue les fiches (16 notes à la fois au plus, la plus ancienne coupée en douceur), batterie en bruit LFSR, volume par piste, chaîne lo-fi (flottement → grain → chaleur → espace), souffle et vinyle, swing, séquenceur (notes planifiées un peu à l'avance) |
| `music-editor/shared/song-storage.ts` | Enregistrement dans le navigateur ; la musique du jeu (fichier + navigateur) |
| `game/shared/services/game-music.ts` | Le morceau du moment dans le jeu, fondus, déblocage du son |
| `src/assets/music/music.ts` (racine du dépôt) | Les morceaux du jeu publié (export de l'éditeur) |

(Chemins relatifs à `src/app/modules/`.)
