# Cinématiques

Une cinématique est une petite scène jouée sur une carte : la caméra bouge, des personnages marchent et parlent, l'écran se couvre de bandes noires, la musique change. Elle appartient à sa carte et se lance par l'action **Jouer la cinématique** d'un événement. Maquette : `design/main-view.pen` (Cinématiques).

## Ouvrir l'éditeur

Dans l'éditeur de carte, **Éditeurs → Cinématiques**. La barre d'édition laisse la place à celle de la cinématique (contour violet) ; la carte reste visible, on peut toujours la déplacer et zoomer.

- **✕** ferme l'éditeur de cinématiques.
- **Le nom** de la cinématique ouvre la liste des cinématiques de la carte (voir plus bas).
- **Annuler** revient sur la dernière modification.
- **Voir** joue la cinématique dans le jeu, depuis la tête de lecture (ou depuis le début), puis revient à l'éditeur.

## La ligne de temps

En bas de l'écran (sur ordinateur et en paysage, la fiche du bloc est à droite).

- **Lecture** : revenir au début, lire / mettre en pause (sur la carte, les personnages bougent et le cadre de la caméra se déplace), le temps (« 4,2 s / 12,0 s »), le zoom de la ligne de temps, **+ Bloc**.
- **Les pistes** : Caméra, Écran, Texte, Son, Monde, puis une piste par personnage (**Ajouter un personnage** : le joueur ou un PNJ posé sur la carte ; toucher son nom puis **Retirer la piste** pour l'enlever).
- **Choisir un point** (Marcher, Aller à) : sur téléphone, les panneaux s'écartent ; toucher la carte (on peut toucher plusieurs fois), puis **Fini**.
- **Les blocs** : toucher un bloc le sélectionne ; le glisser change son début ; son bord droit change sa durée. Les blocs de pistes différentes peuvent se chevaucher (deux personnages qui marchent en même temps).
- **La tête de lecture** : toucher la règle ou une piste vide. La carte montre la scène à ce moment : les personnages à leur place, le **cadre bleu** de ce que la caméra voit, les chemins des marches en pointillés.
- **Sur ordinateur** : Espace lit / met en pause, Suppr efface le bloc, Ctrl+D le duplique, Ctrl+Z annule.

## Les blocs

| Groupe | Bloc | Réglages |
|---|---|---|
| Caméra | **Aller à** | Le point (toucher la carte), la durée |
| | **Suivre** | Le personnage suivi, la durée |
| | **Zoom** | Plus près ou plus loin, la durée |
| | **Secousse** | Légère, forte, très forte |
| | **Tourner autour** | L'angle (degrés) |
| Personnages | **Marcher** | Jusqu'à une case (toucher la carte), l'allure (marche, course, lent), où il regarde à la fin ; la durée vient de la longueur du chemin |
| | **Se tourner** | Une direction, ou vers un personnage |
| | **Apparaître / Disparaître** | Un personnage qui apparaît est caché au début |
| | **Bulle** | ! ? cœur, note, silence, colère, gêne, idée |
| Écran | **Fondu** | Noir ou blanc, vers la couleur ou en revenir |
| | **Bandes noires** | Le temps qu'elles restent |
| | **Titre** | Le texte en gros au milieu |
| Son et le reste | **Message** | Qui parle, son portrait, le texte. Le temps s'arrête tant que le joueur n'a pas fermé le message |
| | **Musique** | Un morceau de l'[éditeur de musique](07-musique.md) ou le silence, jusqu'à la fin de la cinématique |
| | **Son** | Un bruitage |
| | **Météo** | La nouvelle météo (elle reste après) |
| | **Heure** | Le moment de la journée (matin, après-midi, soir, nuit) |
| | **Animer l'objet** | Comme l'action d'événement : jouer, revenir, boucle, arrêter |

La caméra suit le joueur jusqu'à son premier bloc.

## Les cinématiques de la carte

Le nom de la cinématique ouvre la liste : **Nouvelle**, renommer, dupliquer, supprimer. Pour celle qui est ouverte :

- **Une seule fois** : jouée une seule fois dans une partie (gardé dans les sauvegardes de partie).
- **Le joueur peut la passer** : en maintenant le bouton **Passer** 2 secondes. Le bouton se remplit de gauche à droite ; lâché trop tôt, il se vide. Passée, la cinématique met chacun à sa place finale (la musique, la météo, l'heure et les objets aussi).
- **Accélérer** : le bouton ⏩ joue la cinématique trois fois plus vite.
- **À la fin** : chacun reste où il est, ou revient à sa place.
- **Lancée par** : les objets de la carte dont un événement a l'action **Jouer la cinématique**.

## Dans le jeu

L'action **Jouer la cinématique** d'un [événement](09-evenements.md) la joue, puis l'événement continue. Pendant ce temps, le joueur ne bouge pas, l'heure s'arrête et l'interface du jeu se cache. À la fin, la caméra revient doucement sur le joueur.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `game/shared/model/cutscene.ts` | Une cinématique : pistes, blocs, réglages (gardée dans sa carte, `SceneMap.cutscenes`) |
| `game/shared/model/cutscene-eval.ts` | La scène à un moment donné : personnages, caméra, écran |
| `game/shared/model/cutscene-seen.ts` | Les cinématiques « Une seule fois » déjà vues (`pk-cutscenes-seen`) |
| `game/shared/services/cutscene.service.ts` | Jouer une cinématique sur la carte, passer, accélérer ; l'aperçu de l'éditeur |
| `game/cutscene-overlay/` | Les bandes noires, le fondu, le titre, les bulles, les boutons Passer et ⏩ |
| `game/cutscene-editor/` | L'éditeur : ligne de temps, fiche d'un bloc, ajout, liste des cinématiques |
