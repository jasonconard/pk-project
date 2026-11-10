---
name: release
description: Publie une nouvelle version du jeu pk-project — rédige les notes de version en phrases simples (src/assets/release-notes.ts, affichées dans le jeu en cliquant sur le numéro de version), monte la version, fait le commit « Release vX.Y.Z » et prépare le tag. À utiliser dès que l'utilisateur demande une release, une nouvelle version, un commit de release, un tag de version, ou de mettre à jour les notes de version / nouveautés.
---

# Release de pk-project

Une release = un commit « Release vX.Y.Z » sur `main` (version dans `package.json`, `package-lock.json` et une
entrée dans `src/assets/release-notes.ts`), puis le tag `vX.Y.Z` poussé : c'est le tag qui déclenche la publication
(PWA sur gh-pages, APK Android, voir `.github/workflows/main.yml`, qui vérifie que le tag = la version de
`package.json`).

## Étapes

1. **Vérifier l'état** : `git status -sb` — sur `main`, arbre propre, pas en retard sur `origin/main`
   (`git fetch` d'abord). Sinon, le dire et s'arrêter (proposer de commiter / tirer avant).
2. **Trouver ce qui a changé** : dernier tag de version `git tag --sort=-v:refname | head -1`, puis
   `git log <tag>..HEAD --format='%h %s'`. Si besoin du détail d'un commit, `git show --stat <hash>`.
   S'il n'y a aucun commit `[Feature]`, `[Fix]` ou `[Perf]`, le dire et demander si on publie quand même.
3. **Numéro** : version de `package.json` + 1 sur le dernier chiffre (0.0.13 → 0.0.14), sauf si l'utilisateur en
   donne une. Vérifier que le tag n'existe pas déjà (`git tag -l vX.Y.Z`).
4. **Rédiger les notes** (voir les règles ci-dessous), puis **les montrer à l'utilisateur** et attendre son accord
   ou ses corrections avant d'écrire quoi que ce soit.
5. **Écrire** :
   - ajouter l'entrée **en tête** de `RELEASE_NOTES` dans `src/assets/release-notes.ts`
     (`{ version: 'X.Y.Z', date: 'AAAA-MM-JJ' (aujourd'hui), notes: [...] }`), même format que les autres ;
   - `npm version X.Y.Z --no-git-tag-version` ;
   - `npx ng build` doit passer.
6. **Commit et push** : `git add package.json package-lock.json src/assets/release-notes.ts`,
   `git commit -m "Release vX.Y.Z"`, `git push`.
7. **Tag** : il publie le jeu pour tout le monde, donc le proposer sans le lancer d'office :
   `git tag vX.Y.Z && git push origin vX.Y.Z`. Si l'utilisateur dit de le faire et que la commande est refusée par
   les permissions, lui donner la commande à lancer avec `!`.

## Règles d'écriture des notes

Les notes sont lues dans le jeu par des joueurs, pas par des développeurs.

- En **français**, des **phrases simples et courtes**, au présent, terminées par un point. Une idée par phrase.
- Du **point de vue du joueur** : ce qu'il voit ou peut faire de nouveau. « Nouvelle météo : la jungle. »,
  « Sur iPhone, le son marche même en mode silencieux. »
- **Pas de jargon** : ni nom de fichier, de fonction, de composant, ni « PWA », « shader », « draw calls »,
  « Capacitor », « service worker ». Dire « le jeu installé sur l'écran d'accueil », « l'application Android ».
- Préciser l'endroit quand c'est utile : « Éditeur : … », « Sur mobile : … », « Sur iPhone : … ».
- Un correctif dit ce qui marche maintenant, pas le bug : « Le pied de la boîte aux lettres s'affiche
  correctement. » plutôt que « Correction du bug d'affichage… ».
- Les optimisations : une phrase globale (« Le jeu est plus fluide sur mobile. »), pas le détail.
- **Ignorer** les commits `[Docs]`, `[CI]`, `[Refacto]`, `[Assets]` seuls, `chore`, `Release` : ils ne changent
  rien pour le joueur.
- 1 à 5 phrases par version ; regrouper les petits changements d'un même sujet.
- Apostrophes échappées dans le TS (`'l\'éditeur'`), comme dans les entrées existantes.
