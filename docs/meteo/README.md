# Documentation du système météo

Cette documentation explique comment fonctionne la météo du jeu, pourquoi elle est construite ainsi, et comment lire le code : three.js, shaders GLSL, maths du rendu et de l'animation, synthèse sonore avec le Web Audio API. Elle est pensée pour apprendre seul, en lisant le code à côté.

Le code se trouve dans `src/app/modules/game/shared/weather/`. L'interface (barre d'outils, catalogue) est dans `src/app/modules/game/weather-panel/` et `src/app/modules/game/weather-catalog/`.

## Comment lire cette documentation

1. Commence par les **concepts 01 à 03** : ils posent les bases (architecture, jour/nuit, comment on modifie les shaders de three.js).
2. Choisis ensuite une météo qui t'intéresse et lis sa fiche. Elle explique ce qui lui est propre et renvoie vers les concepts pour le reste.
3. Chaque fiche se termine par **« Expériences à tenter »** : des constantes à modifier pour voir l'effet en direct. C'est la meilleure façon de comprendre.

## Concepts partagés

| Fiche | Sujet |
|---|---|
| [01 · Architecture](concepts/01-architecture.md) | Paramètres d'une météo, presets jour/nuit, transitions, du clic dans l'interface jusqu'au rendu, ajouter une météo |
| [02 · Jour et nuit](concepts/02-jour-nuit.md) | Heure, aube et crépuscule, course du soleil, temps qui passe |
| [03 · Éclairage et shaders](concepts/03-eclairage-et-shaders.md) | Injection de code dans les shaders three.js, lumière du soleil et ambiante, ombres de nuages, rayons, aurores, éclairs |
| [04 · Surfaces météo](concepts/04-surfaces-meteo.md) | Neige au sol, sable, sol mouillé et flaques, sang et poison, verglas, givre, ombres de feuillage, irisation |
| [05 · Brouillard et ténèbres](concepts/05-brouillard-et-tenebres.md) | Brouillard en nappes, espace linéaire, ténèbres autour du joueur |
| [06 · Post-effets](concepts/06-post-effets.md) | Rayons de soleil volumétriques, halo des fenêtres (bloom), ondulations de chaleur |
| [07 · Bruit procédural](concepts/07-bruit-procedural.md) | Value noise, fbm, textures tuilables, casser la répétition |
| [08 · Particules](concepts/08-particules.md) | Pluie, neige, braises, lucioles, feuilles, sable… avec des `InstancedMesh` |
| [09 · Effets spéciaux](concepts/09-effets-speciaux.md) | Arcs électriques, feux follets, tourbillons, tornade et envol, fantômes, inondation |
| [10 · Audio](concepts/10-audio.md) | Web Audio : bruits, filtres, enveloppes, synthèse de chaque son |
| [11 · Vent](concepts/11-vent.md) | Vent, rafales, végétation qui ondule |

## Fiches météo

### ☀️ Classiques
- [Neutre](meteos/neutral.md)
- [Ensoleillé](meteos/sunny.md)
- [Nuageux](meteos/cloudy.md)
- [Brouillard](meteos/fog.md)
- [Brouillard rôdeur](meteos/stalking-fog.md)
- [Brume matinale](meteos/morning-mist.md)
- [Brume marine](meteos/sea-mist.md)
- [Smog](meteos/smog.md)

### 🌧️ Pluie & tempêtes
- [Bruine](meteos/drizzle.md)
- [Pluvieux](meteos/rainy.md)
- [Pluie de printemps](meteos/spring-shower.md)
- [Orage](meteos/storm.md)
- [Pluie de tonnerre](meteos/thunder-rain.md)
- [Mousson](meteos/monsoon.md)
- [Grêle](meteos/hail.md)
- [Pluie verglaçante](meteos/freezing-rain.md)
- [Inondation](meteos/flood.md)
- [Tornade](meteos/tornado.md)
- [Séisme](meteos/earthquake.md)

### ❄️ Froid
- [Neige](meteos/snow.md)
- [Neige magique](meteos/magic-snow.md)
- [Brume de cristal](meteos/crystal-mist.md)
- [Blizzard](meteos/blizzard.md)
- [Gel](meteos/frost.md)
- [Aurore glacée](meteos/deep-freeze.md)

### 🔥 Chaleur & feu
- [Canicule](meteos/heatwave.md)
- [Mirage](meteos/mirage.md)
- [Tempête de sable](meteos/sandstorm.md)
- [Volcanique](meteos/volcanic.md)
- [Éruption imminente](meteos/eruption.md)
- [Neige de cendres](meteos/ash.md)

### 🌿 Nature
- [Forêt](meteos/forest.md)
- [Jungle](meteos/jungle.md)
- [Feuilles](meteos/leaves.md)
- [Bruine d'automne](meteos/autumn-drizzle.md)
- [Vent de pétales](meteos/petal-whirl.md)
- [Geysers](meteos/geysers.md)
- [Lucioles](meteos/fireflies.md)
- [Spores](meteos/spores.md)

### ✨ Magie & ciel
- [Aurore](meteos/aurora.md)
- [Nuit étoilée](meteos/starry-night.md)
- [Feu d'artifice](meteos/fireworks.md)
- [Marée de lumière](meteos/light-tide.md)
- [Distorsion temporelle](meteos/time-warp.md)
- [Monde inversé](meteos/inverted.md)
- [Gravité inversée](meteos/antigravity.md)
- [Vieux film](meteos/old-film.md)
- [Vent de Mars](meteos/mars.md)
- [Tempête solaire](meteos/solar-storm.md)
- [Poussière d'étoiles](meteos/stardust.md)
- [Brume féérique](meteos/fairy-mist.md)
- [Énergie montante](meteos/rising-energy.md)
- [Champ électrique](meteos/electric.md)

### 🌑 Sombre & surnaturel
- [Lune de sang](meteos/blood-moon.md)
- [Pluie de mort](meteos/blood-rain.md)
- [Climat empoisonné](meteos/poison.md)
- [Pluie acide](meteos/acid-rain.md)
- [Ténèbres](meteos/darkness.md)
- [Nuit sans lune](meteos/moonless.md)
- [Malédiction](meteos/curse.md)
- [Brume hantée](meteos/haunted.md)

## Les fichiers du code en un coup d'œil

| Fichier | Rôle |
|---|---|
| `Weather.ts` | Liste des météos, paramètres (`WeatherParams`), presets jour et nuit, températures, heure |
| `WeatherHelper.ts` | Le chef d'orchestre : chaque image, mélange les paramètres, règle les lumières et les uniforms, fait vivre les particules, les états accumulés (neige, flaques…) et le son |
| `weather-shader.ts` | Tout le GLSL injecté dans les matériaux de three.js, et les uniforms partagés |
| `cloud-texture.ts` | Texture de bruit fractal (nuages, flaques, feuillage) et sa lecture côté CPU |
| `WeatherAudio.ts` | Tous les sons (synthétisés ou échantillons) |
| `GodRaysPass.ts`, `BloomPass.ts`, `HeatHazePass.ts` | Post-effets plein écran |
| `RainHelper.ts`, `SnowHelper.ts`, `GlowParticles.ts`, `LeafHelper.ts`, `SandHelper.ts` | Systèmes de particules |
| `ElectricHelper.ts`, `WispHelper.ts`, `WhirlHelper.ts`, `TornadoHelper.ts`, `GhostHelper.ts`, `FloodHelper.ts` | Effets spéciaux |
| `SurfaceHeights.ts` | Hauteur du sol et des toits, où les particules s'arrêtent |
| `weather-catalog.ts` | Catégories, textes et captures du catalogue |
