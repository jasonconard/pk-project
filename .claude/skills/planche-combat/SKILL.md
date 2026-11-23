---
name: planche-combat
description: Crée ou retouche la planche de combat (sprite sheet Grandia) d'un personnage ou d'un ennemi avec le MCP PixelLab, dans le style pixel art JRPG détaillé validé pour Hugo, puis l'assemble, la met dans la base du jeu et dans l'artifact « Planche du Gluant ». À utiliser dès que l'utilisateur demande un sprite de combat, une planche, une animation de personnage / monstre, ou de refaire / corriger une animation (attente, marche, attaque, incantation, coup reçu, mort…).
---

# Planches de combat avec PixelLab

Le format de la planche est dans `docs/editeur/11-planches.md` (lignes, ordre des animations, image du coup,
pieds) et `src/app/modules/database-editor/shared/sprite-sheet.ts`. Ce brief dit **comment la produire** sans
refaire les erreurs du premier essai (Hugo, novembre 2026 : 49 générations et 4 allers-retours avant validation).

## Style validé

- Pixel art JRPG détaillé « proche de Final Fantasy Resonance / Brave Exvius » : chibi de 2,5 têtes, ombrage riche,
  couleurs vives, contour sélectif.
- Création du personnage : `create_character(mode="v3", size=48, view="low top-down", detail="high detail",
  outline="selective outline")` (2 générations). Dans la description : apparence, arme et main qui la tient,
  bouclier / accessoire, puis « chibi JRPG battle sprite in the style of Final Fantasy Brave Exvius pixel art,
  2.5 heads tall, rich shading, vivid colors ».
- Ennemis et autres personnages : même réglage pour garder la cohérence. Pour un corps qui n'est pas humain, voir
  `search_help(tool="create_character")` (template quadrupède, ou image puis `mode="pro"`).
- **Monstres** (pas humanoïdes) : `create_character_pro_flash(template_id="custom", width=48, height=48)` avec
  `style_image` = la rotation sud de Hugo (`usage_description` : « copy only the pixel art style… not the
  character », `style_options.color_palette=false`), 6 générations. Animés en v3 comme Hugo. Leur cadre est 48 × 48
  ou plus grand (52, 56), **agrandi de façon égale autour du dessin** : position dans la case =
  `(8 - (w-48)/2, refy - (h-48)/2)`, sans alignement. `refy` : le bas du dessin au point des pieds (gluants 12) ;
  un volant flotte à ~12 px du sol (chauve-souris 4). Sa mort : garder une image couchée à la fin (`pick`) et la
  faire tomber au sol avec `dy` (ex. `[0,0,3,6,9,12,12,12]`).
- Ids PixelLab : gluant `64287e91-5bc0-4a60-9c02-5e56537e1e60`, gluant des neiges
  `710a8252-f52e-40f9-95b4-b3181df0871c`, chauve-souris `6149d5c0-64ee-41f6-a05e-32418f822320`.
- Hugo existe déjà dans PixelLab : `character_id = 03c414b4-e61c-4173-9d9f-6413df65b3bb` (réutilisable pour
  ajouter des animations).
- Jason (archer, arc dans la main gauche) : `character_id = 43eb8c0f-ecf2-4236-bacd-00e84e6c6d4b`. Pour un archer, une
  fin `end_frame_url` = la rotation garde l'arc dans la main (sans elle, le v3 lui fait lâcher ou perdre l'arc à la
  fin d'un tir) ; son attaque sud-est reprend des images de l'attaque forte (`pick`), le tir rapide du v3 étant trop mou.

## Portraits de dialogue

- **96 × 96** (`PICTURE_SIZES.portrait`), buste de face un peu de trois quarts, fond transparent.
- `create_image_pro(width=96, height=96)` (10 générations, 4 propositions) avec `style_image_url` = la rotation sud
  de Hugo (`style_copy` : outline, shading, + color_palette pour Hugo lui-même) ; pour Hugo, la même image en
  `reference_images` (« identity: hair, eyes, outfit colors »). Description : apparence, expression, tenue, puis
  « Detailed JRPG pixel art portrait in the style of Final Fantasy Brave Exvius, rich shading, vivid colors,
  selective dark outline, transparent background ».
- Les résultats ont souvent une **ligne grise** sous le buste (lignes 90-91) ou sur un bord : effacer les pixels gris
  clairs alignés avant de les mettre dans le jeu.
- Où les mettre : `portrait` de la fiche dans `src/assets/database/database.ts` (data URL) et
  `src/assets/img/faces/face-<nom>.png` (portraits des messages, liste `PORTRAITS` dans `ObjectEvent.ts`).

## Format de sortie

- **Cases de 64 × 64**, pieds `anchor {x: 32, y: 52}`, `mirror: true`, lignes sud-est puis nord-est. Le 64 laisse
  la place aux sauts et aux traces d'épée (en 48, l'épée était coupée).
- Les animations v3 sortent sur un cadre de 68 × 68 (le perso de 48 en (10, 10)) : recadrage `(2, 4, 66, 68)`.
  Avec une image de départ ou de fin à soi, le cadre change (48, 60, 72 de large) : caler par comparaison avec une
  image de référence (`align` dans le plan, voir plus bas).
- Hugo validé : attente 6 × 160 ms, marche 8 × 100, attaque 6 × 80 (coup 2), attaque forte **12** × 110
  (coup 7, plus lente que l'attaque), incantation 6 × 140, magie 6 × 100 (coup 4), coup reçu 4 × 90, mort 8 × 130.
  Une animation a le même nombre d'images dans les deux directions (répéter la dernière si besoin).

## Les règles qui évitent les erreurs

1. **Jamais le mode `template`** de `animate_character` pour un perso armé : il perd l'épée ou le bouclier.
   Toujours `mode="v3"`, une direction par appel, `keep_first_frame=false` (sauf pour une boucle avec image de départ).
2. **Une direction par appel, la vue écrite dans la consigne.** Pour le nord-est, commencer par « seen from
   behind, back to the viewer, body facing up-right the whole time: … », sinon le corps est mal tourné et
   l'action ne se fait pas.
3. **Dire le sens du geste** : « chops it straight DOWN from top to bottom… the blade ends low near the ground ».
   Sans ça, l'attaque de dos frappait de bas en haut.
4. **Coup reçu de dos** : la tête doit partir **vers le spectateur** (en arrière). Le v3 la jette en avant ;
   `mode="pixminimax"` avec `subject_description` a marché, mais il ajoute parfois du sang : passer
   `scripts/clean_frames.py` (efface le sang et les petites taches).
5. **Mort** : « falls … and lies flat … in a natural relaxed pose, body straight, arms resting at his sides,
   sword lying next to him, stays still ». Sans ces mots, le corps couché paraît désarticulé.
6. **Boucles (attente, marche, incantation)** :
   - marche : `end_frame_url` = la rotation de la direction (URL `rotations/<dir>.png` de `get_character`),
     8 images ; la dernière revient à la pose de départ, donc plus d'effet « il boite » ;
   - attente : `custom_start_frame_url` = `end_frame_url` = une bonne pose de garde (data URL du PNG 68 × 68),
     `keep_first_frame=true`, 6 images, garder les images 0 à 5 (la 6e ≈ la 0) ;
   - si les premières images servent à « entrer » dans la pose (bras qui se lève), ne garder que la pose tenue en
     aller-retour, ex. `pick: [2, 3, 4, 5, 4, 3]`.
7. **Attente** : demander les jambes et le bassin, pas seulement le haut du corps : « feet stay planted, knees bend
   a little more so the hips and whole body sink down 1 or 2 pixels, then rise back ». Garde : jambes écartées et
   fléchies, bouclier devant, bras de l'arme ouvert.
8. **Traces d'arme** : « a bright white crescent slash trail follows the blade » dans la consigne de l'attaque.
9. **Effets au sol** (cercle d'incantation…) : les dessiner nous-mêmes (`scripts/magic_circle.py`, option `circle`
   du plan), pas par l'IA : net et identique dans les deux directions.
10. **Ne pas « corriger » le dessin du perso sans demander** : sur Hugo, le nœud bleu derrière la nuque (vue de
    dos) fait partie du costume. Si quelque chose paraît bizarre, demander avant de l'effacer.
11. Ne pas mettre d'effet de sort dans la magie (le jeu le dessine) : PixelLab en ajoute parfois (cape bleue de
    Hugo en magie nord-est, encore à refaire).
12. Limite de **8 tâches** en même temps : lancer par paquets de 8, `wait_for_jobs(timeout_seconds=55)`.

## Étapes

1. Lire `docs/editeur/11-planches.md` et la fiche du perso dans `src/assets/database/database.ts`
   (grep l'id, ex. `ch-hugo` ; ne jamais lire le fichier entier).
2. Créer le perso (ou reprendre son `character_id`), regarder les rotations sud-est et nord-est agrandies
   (`magick … -filter point -resize 600%`) et les montrer à l'utilisateur avant d'animer.
3. Lancer les animations (règles ci-dessus), télécharger le ZIP :
   `curl -sf -o hugo.zip https://api.pixellab.ai/mcp/characters/<id>/download`
   (dossiers `Idle/animations/<nom>/<direction>/frame_NNN.png` ; deux animations de même nom prennent un suffixe
   `-<group>`).
4. Écrire le plan et assembler (tout dans le scratchpad) :
   ```json
   [
    ["idle",   [{"dir": ".../idle/south-east", "pick": [0,1,2,3,4,5], "align": ["ref-se.png", 0]}, {...}], 6],
    ["walk",   [{"dir": ".../walk/south-east", "align": ["ref-rot-se.png", 7]}, {...}], 8],
    ["attack", [".../attack/south-east", ".../attack/north-east"], 6],
    ["heavy",  [...], 12],
    ["cast",   [{"dir": "...", "circle": true, "pick": [2,3,4,5,4,3]}, {...}], 6],
    ["magic",  [...], 6], ["hurt", [...], 4], ["death", [...], 8]
   ]
   ```
   `python3 .claude/skills/planche-combat/scripts/build_sheet.py plan.json planche.png`
   (Pillow est installé pour l'utilisateur : lancer `python3` sans `-I`). Une référence d'alignement est une image
   64 × 64 où le perso est à sa place : une image v3 68 × 68 collée en (-2, -4), ou une rotation 48 × 48 en (8, 6).
5. Regarder la planche agrandie ×2 sur fond gris (`-background "#6b7b8c" -flatten`) et zoomer les lignes douteuses
   ×4 avant de la montrer.
6. Base du jeu : image fixe = première image de l'attente trimmée, puis
   `node .claude/skills/planche-combat/scripts/patch_db.mjs src/assets/database/database.ts ch-hugo planche.png still.png desc.json`.
   Rappeler à l'utilisateur qu'une base enregistrée dans son navigateur passe avant celle du jeu.
7. Artifact « Planche du Gluant » (https://claude.ai/artifact/4yVBC7iT7WcfKgaxLEWXtR) : le lire
   (`Artifact action=read`), remplacer `src` (et `desc`, `lead`) de l'entrée dans `const SHEETS = [...]`,
   republier sur la même URL. La page lit la taille des cases dans `desc.frame`.
8. Dire les générations dépensées (`get_balance`) et ce qui reste imparfait. Ne pas commiter sans demande ; la doc
   (`docs/editeur/11-planches.md`, `docs/editeur/images/planche-<nom>.png`) après validation.

## Animations d'effet des compétences

Format : `src/app/modules/database-editor/shared/skill-anim.ts` (ligne 1 l'effet, ligne 2 le projectile ; modes
sur la cible, projectile puis impact, sur la zone). On les fait avec `vfx_workbench` (gratuit) : `start --fps 12`,
`add_part` d'une pièce prête (`fire_blast`, `fire_bolt`, `ice_lance`, `ice_shatter` + `ice_spikes`, `bolt_strike`,
`heal_plus`, `cross_slash`, `blood_splat` recoloré + `smoke_puff`…) ou un `render` avec sa propre recette (la
Berceuse : notes dessinées en `pixels`), regarder chaque rendu, `render {"fit_canvas": true}` si c'est coupé, puis
`export --name`. Télécharger `<nom>.png` et `.json` (une grille + la durée des images) et assembler avec
`scripts/assemble_skill_anims.py` : renseigner pour chaque compétence l'impact, **son point au sol** (centre de
l'effet + 24 px pour un effet à hauteur de poitrine, le pied pour un éclair), le projectile et **sa tête** (l'origine
que donne l'export), le mode et l'image du coup ; il retire les images vides de la fin et sort `anims.json` à mettre
dans `"anim"` des compétences. Le cadre doit contenir le point au sol (le script ajoute ce qu'il faut en bas).
Un son au début de l'effet : `"sound"` (un son de `src/app/modules/game/shared/services/sfx.ts`, ex. `explosion`). Effets créés (« My effects » de PixelLab) : Boule de feu - vol (luciole : une boule ronde sans traînée, recette maison) / impact, Lance de glace - vol / impact, Orage, Soin,
Venin, Coup double, Berceuse.

**Animations des types d'armes** (`anim` d'un type d'arme, même format ; jouées par l'attaque et l'attaque forte, à part
de la planche) : l'Arc (`wp-bow`) a « Flèche - vol » (`throw` de l'image `arrow` sur place + `speed_lines` taille 0.35,
4 images en boucle, pointe en (39, 10)) et « Flèche - impact » (`hit_star` taille 0.5, point au sol (12, 36), coup 1).
Assembler avec `assemble_skill_anims.py` en mettant l'id du type d'arme dans `SPEC`, puis `"anim"` dans le type d'arme.
