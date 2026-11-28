# Le sac

Le sac montre les objets que l'équipe porte. On l'ouvre en jeu avec **Menu → Sac**. Maquette : `design/main-view.pen` (Sac). Couleur du sac : bleu clair.

## La fenêtre

Une feuille en bas de l'écran sur téléphone, une fenêtre au centre sur ordinateur, comme la [boutique](16-boutiques.md).

- En haut : le nombre d'objets portés et l'argent.
- Quatre onglets, un par sorte d'objet : **Objets** (les consommables), **Équip.** (l'équipement), **Clés** (les objets clés) et **Cadeaux**.
- Chaque ligne montre l'image de l'objet, son nom, sa description et combien on en a.
- Toucher une ligne l'ouvre : les boutons **Utiliser** et **Jeter** apparaissent, selon l'objet.
- La fenêtre se ferme avec ✕, en touchant à côté, ou avec Échap.

## Utiliser un objet

Le bouton **Utiliser** est là pour un consommable réglé sur « Hors combat » ou « Les deux » dans sa fiche, qui vise l'équipe et qui soigne ou fait progresser.

- La fenêtre montre alors l'équipe. Chaque membre a ses barres de PV et de PM.
- La partie claire d'une barre et « 60 → 115 » montrent ce que l'objet rendrait à ce membre.
- Un membre qui n'en a pas besoin est grisé, avec la raison : « PV au maximum », « Rien à guérir »…
- On touche un membre, puis **Utiliser sur …**. Un objet réglé sur « Toute l'équipe » sert à tous ceux qui en ont besoin d'un coup.
- La flèche en haut à gauche ramène à la liste. Quand il n'en reste plus, la liste revient toute seule.

Ce que font les effets hors combat :

| Effet de la fiche | Dans le sac |
|---|---|
| Soin (PV ou PM) | Rend puissance ÷ 10 × la Magie du membre soigné, sans hasard |
| Guérir un état | Enlève cet état au membre |
| Stat pour toujours | Monte la stat du membre pour toute la partie (gardé dans la sauvegarde) |
| Expérience d'élément ou d'arme | Donne les points au membre, selon son affinité ; rien s'il ne progresse jamais dans cet élément |

Les autres effets (dégâts, donner un état, bonus de quelques tours) ne servent qu'en combat.

Un objet sans bouton Utiliser dit pourquoi : il ne s'utilise qu'en combat, il s'utilise sur la carte (les graines), il s'équipe depuis le [menu Équipe](24-menu-equipe.md), ou il s'offre à un habitant.

## Jeter un objet

**Jeter** ouvre un compteur (− et +) et le bouton rouge **Jeter N**. **Annuler** referme sans rien jeter. Un objet jeté est perdu. Les objets clés ne se jettent jamais.

## Dans le code

- `game/bag/` : la fenêtre.
- `game/shared/model/bag.ts` : les objets portés par sorte, ce qu'un objet ferait à un membre (`previewUse`), l'utiliser (`useItem`), jeter (`dropItem`).
- `game/shared/_item-sheet.scss` : l'apparence commune au sac et à la boutique (`--accent` donne la couleur).
- Les stats montées pour toujours sont dans `MemberProgress.statUps` (`party.ts`), ajoutées par `characterStats`.
