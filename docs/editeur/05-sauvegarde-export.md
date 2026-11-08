# Sauvegarde et export

## Sauvegarde automatique

Chaque changement (et chaque annuler / refaire) est enregistré dans le navigateur, 400 ms plus tard pour regrouper une série (`map-storage.ts`, clé `pk-map-edits`). Au chargement, la carte enregistrée **remplace** celle du code avant sa construction (`loadMapEdits` dans `GameMapService.init`).

Pour chaque morceau de carte : ses objets (sans les données d'exécution comme le modèle résolu), ses tuiles, ses hauteurs, ses escaliers. Les tuiles de la première version sont converties au chargement (`LEGACY_TILE_IDS`).

## Exporter

**⬇ Exporter** télécharge `ck-pallet-town.ts`, à remplacer dans `src/assets/map/world/chunks/`. Il déclare les mêmes constantes (`PC_PALLET_TOWN`, `PC_PALLET_TOWN_N`…), donc `world.ts` ne change pas.

Le fichier est écrit par un petit générateur de code (`toSource`) :

- les petits objets plats (positions, tailles) sur une ligne, le reste indenté ;
- les énumérations écrites par leur nom (`PlayerDirection.DOWN`, `KeyCode.confirm`, `InstructionType.MESSAGE`) plutôt que leur nombre ;
- les grilles creuses en objets : `tiles: { '3,5': 'sand' }`, `heights: { '13,9': 1 }`, `stairs: { '16,15': 'n' }`.

Le fichier du code générait certains objets en boucle (`[...].map(...)`) : l'export les écrit un par un, il est donc plus long, mais équivalent.

**Vérification** : générer l'export avec Node depuis les données du dépôt (bundle esbuild), le placer dans un fichier temporaire, et le compiler avec `tsc`.

## Réinitialiser

**⟲ Réinitialiser** (deux clics : « Confirmer ? » pendant 3 secondes) oublie la copie du navigateur et recharge la carte du code. À faire après avoir exporté et commité, ou si la carte du code a été modifiée à la main (la copie du navigateur passerait par-dessus).
