# 10 · Audio

Tous les sons météo sont **synthétisés** avec le Web Audio API, dans `WeatherAudio.ts` : pas de fichier sonore, sauf les pas (échantillons CC0 dans `src/assets/sounds`). Le principe : du bruit + des filtres + des enveloppes de volume + quelques oscillateurs. Cette fiche donne d'abord les outils, puis un son par section.

Retour : [README](../README.md). Voir aussi [11 · Vent](11-vent.md), [09 · Effets spéciaux](09-effets-speciaux.md), [01 · Architecture](01-architecture.md).

## Contexte audio et geste utilisateur

Les navigateurs interdisent de jouer du son avant une interaction (anti-publicité automatique). Le constructeur attend donc le premier appui :

```ts
window.addEventListener('keydown', start);
window.addEventListener('pointerdown', start);   // start() les retire ensuite
```

`start()` crée l'`AudioContext` (ou le reprend avec `resume()`), puis construit tout le graphe. `update(dt, levels)` ne fait rien tant que `ctx.state !== 'running'`. Les `levels` (`AmbienceLevels`) sont des niveaux 0..1 calculés par `WeatherHelper` à partir de la météo en cours.

## Le graphe audio

Web Audio = des **nœuds** reliés par `connect` : source → filtres → gain → destination. Ici :

```
sources (bruit en boucle, oscillateurs)
  → filtres → GainNode du son
  → (rainBus pour la pluie) → master (GainNode) → limiteur (DynamicsCompressor) → destination
```

Le helper `loop(buffer, filters, output)` construit une chaîne « bruit bouclé → filtres → gain (muet au départ) » et renvoie le `GainNode` : c'est ce gain qu'`update` règle chaque frame. Tous les sons continus (pluie, vent, mer…) tournent **en permanence** à gain 0 : on ne les démarre/arrête jamais, on monte/baisse leur volume. Les sons ponctuels (tonnerre, oiseau) créent leurs nœuds à la volée, ils sont ramassés quand la source s'arrête.

`src.start(0, Math.random() * buffer.duration)` : départ à un **point aléatoire** du buffer, pour que deux boucles du même buffer ne soient pas en phase (sinon elles s'additionneraient en un son plus fort et plus « creux »).

## Bruit blanc et bruit brun

`makeNoise(brown)` remplit 4 s de samples :

- **Blanc** : `Math.random() * 2 − 1`, chaque échantillon indépendant → toutes les fréquences à égale puissance : un « shhh » brillant. Base de la pluie, du sable, des crépitements.
- **Brun** (ou rouge) : marche aléatoire *amortie* :

```ts
last = (last + 0.02 * white) / 1.02;
data[i] = last * 3.5;
```

C'est un **intégrateur à fuite** : chaque échantillon = le précédent (presque) + un petit pas aléatoire. Intégrer du bruit blanc donne un spectre qui décroît de 6 dB par octave (graves dominants) : un grondement. Le `/ 1.02` empêche la dérive infinie ; `× 3.5` rattrape le niveau perdu.

### Correction de dérive en boucle

La marche aléatoire finit rarement là où elle a commencé : le dernier échantillon diffère du premier. En bouclant le buffer, ce saut donne un **clic toutes les 4 s**. La correction du code :

```ts
const drift = data[data.length - 1] - data[0];
for (...) data[i] -= drift * i / (data.length - 1);
```

On soustrait une **rampe linéaire** qui annule l'écart : maintenant `data[fin] = data[0]`, la boucle se raccorde.

## Filtres : `BiquadFilterNode`

- `lowpass(f)` : laisse passer sous `f`, coupe au-dessus. `highpass(f)` : l'inverse.
- `bandpass(f, q)` : ne laisse passer qu'une **bande** autour de `f`. Le facteur **Q** règle l'étroitesse : `Q = f / largeur de bande`. Q = 0,7 : large, « souffle » ; Q = 20 : étroit, presque une note qui **siffle**.

Un bruit blanc passé dans un bandpass à Q élevé produit un son de vent qui siffle (voir Blizzard). Déplacer la fréquence du filtre dans le temps fait glisser la hauteur : c'est le principe de la plupart des sons du vent ici.

## Automations de gain et de fréquence

Un `AudioParam` (gain, fréquence) se programme dans le temps :

- `setValueAtTime(v, t)` : saute à `v` à l'instant `t`.
- `linearRampToValueAtTime(v, t)` : rampe linéaire jusqu'à `t`.
- `exponentialRampToValueAtTime(v, t)` : `v(t') = v0 · (v1/v0)^((t'−t0)/(t1−t0))`. **Ne peut pas viser 0** (log) : d'où les `0.001` partout. C'est la bonne courbe pour le volume (l'oreille perçoit en log) et pour la **hauteur** (une octave = ×2, quelle que soit la note).
- `setTargetAtTime(cible, t, τ)` : rapproche exponentiellement : `v(t') = cible + (v0 − cible)·e^(−(t'−t)/τ)`. `τ` = constante de temps (63 % du chemin).

Pour les sons continus, `update()` n'écrit jamais `gain.value = x` (saut audible : « zipper noise ») mais :

```ts
const set = (node, value) => node?.gain.setTargetAtTime(value, now, AMBIENCE_SMOOTHING);  // τ = 0,4 s
```

Un volume qui bouge à chaque frame de façon indépendante du framerate, sans clic.

Enveloppe typique d'un son court : attaque rapide (rampe linéaire ~5 ms), puis décroissance exponentielle : un « ADSR » simplifié. Une attaque à 0 instantanée donnerait un clic.

## StereoPanner

`ctx.createStereoPanner()` avec `pan` de −1 (gauche) à 1 (droite). `panned(side)` en crée un branché au master. Les sons ponctuels sont placés aléatoirement (`rand(-0.9, 0.9)`) pour donner un espace ; le tonnerre utilise le `pan` de l'éclair.

## Limiteur et master

```ts
limiter = createDynamicsCompressor();  // threshold −6 dB, knee 6, ratio 12, attack 3 ms, release 0,25 s
master.connect(limiter).connect(ctx.destination);
```

Un compresseur à ratio 12:1 se comporte comme un **limiteur** : au-delà de −6 dB, 12 dB d'entrée n'en font qu'1 en sortie. Le tonnerre proche par-dessus la pluie additionne beaucoup de signal ; sans limiteur, le total dépasserait ±1 (**écrêtage**, saturation dure). Le `master` règle le volume utilisateur avec `setTargetAtTime(..., 0.05)` (pas de clic au changement).

## Ducking : la pluie s'efface sous le tonnerre

Pluie et bruine passent par un bus `rainBus`. Pendant un coup de tonnerre, on baisse **ce bus** (voir Tonnerre). C'est le *ducking* : un son important fait reculer les autres, comme la compression sidechain en musique. Un seul bus à baisser (plutôt que chaque gain de pluie) : les gains de pluie sont déjà réécrits à chaque frame par `update`, et le bus offre un paramètre dédié au ducking, qui ne se mélange pas avec eux.

## Pluie

Trois couches en `loop` sur du bruit blanc :
- sifflement : `highpass(400)` + lowpass dont la coupure vaut `2500 + 3500·(1 − rain)` : plus la pluie est forte, plus le son est **sombre et plein** (plus de gouttes superposées = moins d'aigus individuels) ;
- gouttes : bandpass 4500 Hz (Q 0,9), dont le gain est retiré au hasard à chaque frame (`rain·(0.6 + 0.4·random)`, τ = 0,02 s rapide) : un scintillement qui évoque des gouttes distinctes ;
- bruine : `highpass(2500)` + `lowpass(9000)`, aérienne.

Volume : `RAIN_GAIN · rain^0.8`. L'exposant < 1 relève les faibles niveaux : une pluie légère s'entend déjà.

## Vent

Bruit **brun** dans un bandpass (400 Hz, Q 0,9).

```
respiration = 0.8 + 0.2·sin(0.7t)·sin(0.23t)
gain        = 0.22 · vent^1.6 · respiration
fréquence   = 250 + 650·vent·respiration
```

Le produit de deux sinus lents donne un cycle irrégulier ; `vent^1.6` rend le vent faible discret et le fort bien présent ; plus le vent monte, plus la bande monte (sifflement plus aigu). Le **sable** est un hiss à 6000 Hz sur le même vent (`sand·min(wind, 1)`). La source de `levels.wind` est décrite dans [11 · Vent](11-vent.md).

## Tonnerre

`thunder(bolts)` reçoit des éclairs `{ at, distance (0 proche..1 loin), pan }`. Délai :

```ts
const delay = bolt.at + 0.05 + bolt.distance * 5 + Math.random() * 0.6;
```

La lumière arrive tout de suite, le son plus tard (~340 m/s) : plus l'éclair est loin, plus l'écart est grand (jusqu'à ~5 s ici).

- **Craquement** (`thunderCrack`, seulement si `distance < 0.35`) : bruit blanc passé dans highpass 120 / lowpass 2200 à 3500 Hz, enveloppe attaque 6 ms puis deux décroissances exponentielles, plus 0 à 2 échos plus faibles (`level·rand(0.3,0.6)`). Commentaire du code : *smooth envelopes (no buzzing)*.
- **Grondement** (`thunderRumble`) : bruit brun, durée `2.5 + distance·4 + random·2.5`, lowpass qui **se ferme** : de `550 + 1800·near²` vers ~160–240 Hz (le son s'assombrit pendant qu'il roule ; `near = 1 − distance`). Le volume est une suite de rampes linéaires de pics décroissants (`level *= rand(0.85, 1)`), aléatoires : les « roulements ». Plus c'est loin, plus les creux sont longs.
- **Ducking** : `low = 1 − (1 − 0.45)·(0.5 + 0.5·near)` ; baisse du `rainBus` en `setTargetAtTime(low, start, 0.08)`, retour à 1 après 60 % de la durée (τ = `duration·0.25`). Un éclair proche creuse plus.
- `playbackRate` aléatoire (0,7 à 1) : change la vitesse/hauteur du bruit, donc chaque tonnerre est unique.

## Pas

`footstep(surface, splash, running)` joue un des 6 échantillons (`ground-1..6`, `snow-1..6`, `.m4a`) tirés au hasard, chargés en `fetch` + `decodeAudioData`. `playbackRate = (running ? 1.08 : 1)·(0.92 + random·0.16)` : variation de hauteur ±8 % ; gain aussi aléatoire (×0,8 à ×1,2). Sans variation, on entend le « mitraillage » du même son répété.

Sur l'eau (`surface === 'water'`) : échantillon « ground » filtré `lowpass(2200)` (étouffé) + `wetLayer`. `wetLayer(amount)` :
- éclaboussure : bruit, highpass 1800 / lowpass 7500, attaque 12 ms ;
- 3 à 5 **gouttes** (`plink`) dans une flaque, 0 à 2 sur sol mouillé (`amount = 0,35`).
La détection de flaque côté CPU : `puddleAt` (voir [07](07-bruit-procedural.md)).

`plink` : une sinusoïde de 700–1600 Hz qui **monte** de ×1,8 à ×3 en 40–90 ms : le son d'une petite bulle d'air dans l'eau (voir « Bugs »).

## Volcanique

- Grondement : bruit brun, `lowpass(100)` + `lowpass(160)` (deux filtres en série : pente plus raide), volume `0.5·lava·swell` avec `swell = 0.6 + 0.25·sin(0.31t) + 0.15·sin(0.83t + 1.7)` : plusieurs vagues lentes jamais synchrones.
- Crépitements (`crackle`) : probabilité par frame `CRACKLE_RATE·lava·dt` (processus de Poisson : indépendant du framerate). 1 à 5 clics de bruit filtré 2–6 kHz (20 % de « pops » plus graves, 600–1200 Hz et plus longs). `1 + floor(rand·rand·5)` favorise les petits nombres (le produit de deux aléatoires se concentre près de 0).

## Bulles

Poison. Un lit grave (bruit brun, bandpass 300 Hz à Q 3 dont la fréquence ondule `220 + 160·ooze`), plus des bulles (`bubbles`, `blop`) : sinus de 110–200 Hz (grosses) ou 220–520 Hz qui glisse vers le haut de ×2 à ×3,2 pendant 0,05–0,2 s, lowpass 1200, enveloppe en `0.25·length` d'attaque. 35 % du temps, une rafale « gargouillement » de 3 à 7 petites bulles. Même glissement montant que la goutte : c'est la signature d'une bulle qui remonte et éclate.

## Blizzard

Trois « voix » de bruit blanc dans des bandpass très étroits (`HOWL_VOICES` : 520, 780, 340 Hz ; Q 18, 22, 12). Pour chaque voix :

```
moan  = 0.6·sin(t) + 0.4·sin(2.7t + 1.3)         t = temps·vitesse + déphasage
freq  = base·(1 + glide·moan + 0.4·rafale)
gain  = 0.8·howl·max(0, 0.55 + 0.45·sin(1.6t + 0.7))·(1 + rafale)
```

La fréquence se balade autour de la base (le vent qui s'engouffre), chaque voix à sa vitesse (0,17 à 0,31) : aucune ne se synchronise. `rafale = max(wind − 0.9, 0)` ajoute volume et hauteur dans les bourrasques. Le facteur Q élevé donne ce sifflement tonal.

## Ténèbres

Ambiance oppressante :
- **Drone** : 4 triangles graves `[55, 55.6, 41.2, 77.8]` Hz dans un `lowpass(400)`. 55 et 55,6 Hz **battent** à `0,6 Hz` (|f1 − f2|) : une pulsation lente et inquiétante. 77,8/55 ≈ 1,414 ≈ √2 : un **triton**, l'intervalle « diabolique ».
- **Respiration** : bruit brun, `breath = max(0, sin(2πt/7 + sin(0.3t)))` (le `sin` interne irrégularise le rythme), filtre qui s'ouvre avec.
- **Événements** tirés toutes les 6 à 16 s : 30 % coups sourds (`knocks`, sinus 70–95 → 45 Hz), 25 % grincement (`creak`, dent de scie dont la hauteur vacille dans un bandpass Q 6), 25 % chuchotement (`whisper`), 20 % battement de coeur.
- `whisper` : du bruit dans **deux bandpass** (formants, ~600–1100 Hz et ~1600–2800 Hz) dont un glisse : une « voyelle » qui bouge, sans mot. 3 à 7 syllabes de 0,12 à 0,3 s.
- `heartbeat` : deux coups (`lub-dub`, retard 0,18 s, force 1 puis 0,7), sinus qui chute de 60 à 38 Hz en 0,12 s, volume en `sin(π(i+0,5)/beats)` : le coeur s'accélère à l'oreille puis s'éteint.

## Forêt

- Feuillage : bruit blanc `highpass(1500)` + bandpass dont la fréquence suit `flutter = 0.55 + 0.25·sin(1.3t) + 0.2·sin(2.9t + 1.1)`, volume lié au vent.
- Jour (`levels.daylight`) : `bird` choisit au hasard : trille (35 %, 6 à 15 notes de 40 ms), sifflement (30 %), pépiements montants (23 %), coucou lointain (7 %, deux notes 680 puis 545 Hz), pivert (5 %, rafale de coups de bruit qui ralentit). Chaque note = oscillateur + glissement exponentiel + enveloppe. `far = rand(0.4, 1)` : distance fictive.
- Nuit : 3 grillons indépendants (période, hauteur 4200–5200 Hz) : 3 impulsions de 22 ms espacées de 35 ms ; une chouette (`owl`) : voix à 3 harmoniques `[1, 0.32, 0.1]` plus du souffle, et un trémolo rapide pour le « rrr » (voir Bugs).
- Les timers diminuent de `dt·jour` (ou `nuit`) : plus il fait jour, plus les oiseaux chantent souvent.

## Grêle

`updateHail` : `HAIL_TICKS·hail·dt` impacts par frame, partie entière + probabilité de la fraction (`Math.random() > ticks`) : un tirage de Poisson simple. Chaque impact (`hailTick`) = un clic de bruit de 5 ms + un « toc » de deux partiels triangle de rapport **2,37** (inharmonique : un objet dur et petit, pas une note). Au sol : aigu (1700–3300 Hz), très court ; sur les toits (30 %) : plus grave, plus long. Souvent 1 ou 2 rebonds (60 %), chacun plus faible (`× 0,3 à 0,5`) et plus rapproché.

## Mer

Cycle de 8 s (`WAVE_PERIOD`) : `phase = (t/8) % 1`.

```
swell = sin²(π·phase)                      // houle : monte et redescend
wash  = max(0, sin(π·((phase + 0.75) % 1)))³  // écume : un peu après la vague
```

Houle : bruit brun, lowpass `250 + 450·swell`. Écume : bruit blanc `highpass(1200)` / `lowpass(6000)`. Mouettes (`gull`) : 2 à 4 cris en dent de scie, hauteur ×1,1 → ×1,25 → ×0,7 (« kiaa »), vibrato 8 à 12 Hz (un oscillateur qui module `osc.frequency` via un gain de profondeur : `vibrato.connect(depth).connect(osc.frequency)`). Pour les inondations, `lapping` joue la houle sans mouettes.

## Clochettes

Neige magique et poussière d'étoiles. `chime` : une note de `CHIME_NOTES` (1047 à 3136 Hz) avec deux partiels **inharmoniques** (×2,76 et ×5,4), comme une cloche réelle (un instrument à cordes aurait ×2, ×3). Chaque partiel s'éteint en `length / mult` : les aigus meurent plus vite. Probabilité `CHIME_RATE·chimes·dt` par frame.

## Parasites

Orage solaire. Bruit blanc dans un bandpass (Q 1,5) dont la fréquence saute (`rand(1200, 3500)`, τ = 20 ms) ; le gain suit `staticBurst` (rafales de 0,6 à 1 qui décroissent à 2/s) et un facteur `crackle` aléatoire (1 ou 0,4) : on entend une vieille radio mal réglée.

## Glace

Gel : craquements (`levels.crackle`) : 1 à ~4 petits bruits de bandpass étroit (Q 3 à 8, 2500–7000 Hz) de 10 à 40 ms, groupés en séries courtes. Les cendres utilisent `crackle` (lointain feu) à niveau réduit.

## Fantômes

`ghostMoan` : un triangle de 230–320 Hz dont la hauteur monte (×1,1 → ×1,2) puis **glisse vers le bas** (×0,7), vibrato lent 4–6 Hz, lowpass 900, enveloppe lente (35 % d'attaque), répété 0,35 s plus tard, plus faible et pan inversé : un écho. 1,6 à 3 s.

## Tornade

Rugissement : bruit brun, `lowpass(150 + 600·r)`, volume `0,7·r²·(0.85 + 0.15·sin(1.7t))` où `r = levels.roar`, la **proximité** (0 loin, 1 sur place). Le carré rend l'approche progressive : le son enfle vite seulement quand on est proche. Plus proche = plus brillant. À la fin de l'envol : `thud()` : sinus 110 → 40 Hz en 0,18 s (la grosse caisse de la chute) + poussière de bruit lowpass 900.

## Tourbillons

Pétales : bruit blanc dans un bandpass (Q 1,4) :

```
swirl = 0.6·sin(4.2t) + 0.4·sin(6.9t + 1)
gain  = 0.35·w²·(0.75 + 0.25·swirl)
freq  = 500 + 500·w + 350·swirl
```

`w` est la proximité (`WhirlHelper.closeness`). Deux sinus rapides font tourner la hauteur du souffle : l'air qui tourne.

## Lune de sang

- Drone : 3 dents de scie `[41.2, 43.65, 61.7]` Hz. 41,2 (Mi1) et 43,65 (Fa1) sont à **un demi-ton** (rapport 2^(1/12) ≈ 1,0595) : très dissonant, grinçant. 61,7 Hz = Si1 (quinte au-dessus du Mi, un peu d'assise). Le tout dans un `lowpass` dont la coupure suit la pulsation `0.7·sin(0.8t) + 0.3·sin(2.3t)`, au rythme de la lumière rouge.
- Battements de coeur (9 à 18 s, `heartbeat`, voir Ténèbres).
- Loups (14 à 28 s) : triangle qui monte de ×0,7 à ×1,25 puis redescend ×0,8, vibrato qui s'installe (`depth` de 0 à `2 %`), lowpass 1400 (lointain) et **écho** (`createDelay` 0,35 s + gain 0,3). 40 % du temps, un second loup répond, 8 à 20 % plus aigu.

## Électricité

Deux composantes :
- **Zap** (`zap(closeness, side, life)`, appelé par `ElectricHelper.onArc`) : un claquement (bruit, highpass 2500, 30 ms), un crépitement (bruit haché en étincelles irrégulières : `rand(0.01, 0.03)` entre chaque, bandpass 3–6 kHz) et un bourdonnement (dent de scie 110–180 Hz dans un bandpass 900–1600 Hz).
- **Ronflement** (`hum`) : oscillateur 100 Hz en dent de scie, lowpass 700, comme le ronflement d'un transformateur (100 Hz = deux fois les 50 Hz du secteur européen). Son gain suit `electricNear` (activité récente, qui décroît de 2,5/s).
- Limite de débit : `zapBudget` (14 zaps/s) : un « seau à jetons » qui se remplit au rythme de `MAX_ZAPS_PER_SECOND`. Sans lui, 40 arcs d'un coup créeraient des centaines de nœuds.

## Bugs instructifs

Ces pièges sont ceux dont le code garde la trace dans ses commentaires, ou qu'il évite par construction (les points 5 et 6 sont des règles générales respectées partout).

1. **Le son « électrique » = une modulation d'amplitude vers 30 Hz.** Quand le volume d'un son est multiplié par un signal régulier de 20 à 40 Hz, l'oreille n'entend plus un volume qui bouge, mais une *rugosité* : un bourdonnement. C'est exactement l'effet *voulu* du « rrr » de la chouette (`lfo.frequency = rand(24, 32)` dans `hoot`). Mais sur un craquement de tonnerre, il est malvenu ; le code le prévient par des enveloppes lisses (*smooth envelopes (no buzzing)*) et, pour les étincelles, par des intervalles **aléatoires** (`rand(0.01, 0.03)`) plutôt que réguliers. (L'historique exact du correctif n'est pas dans le code ; la leçon, elle, y est.)
2. **Le clic de boucle.** Un buffer brun bouclé repartait d'une valeur différente de celle d'où il était parti : clic toutes les 4 s. Correction : soustraire une rampe linéaire dans `makeNoise`.
3. **Tonnerre coupé net.** La source du grondement dure `duration` (jusqu'à ~9 s) mais le buffer fait 4 s : sans boucle, il s'arrête d'un coup (clic). Correction : `src.loop = true; src.start(start, offset, duration + 0.1)` (le troisième paramètre borne la durée).
4. **La goutte n'est pas un tonc fixe.** Un `plink` d'eau est une sinusoïde qui **glisse vers le haut** (bulle d'air). Un grêlon, lui, est un objet dur : deux partiels inharmoniques à hauteur fixe (`hailTick`). Mélanger les deux idées donne des gouttes qui sonnent comme de la grêle, et inversement.
5. **Clic au démarrage d'une note.** Un gain qui part à 1 sans rampe produit un clic : d'où `setValueAtTime(0)` puis `linearRamp` sur quelques millisecondes.
6. **`exponentialRamp` vers 0 est interdit** : on vise `0.001`.

## Expériences à tenter

1. `makeNoise` : retire la correction de dérive (le `if (brown) { ... }`) et écoute le vent : un clic toutes les 4 s.
2. Dans `thunderRumble`, retire `src.loop = true` et déclenche un éclair lointain : le grondement s'arrête d'un coup.
3. `AMBIENCE_SMOOTHING = 0.02` : les changements de météo deviennent brusques (« zipper »).
4. Dans `hoot`, passe `lfo.frequency` de `rand(24, 32)` à `4` puis `200` : trémolo lent, puis bourdonnement métallique.
5. Remplace `exponentialRampToValueAtTime(f0 * ..., ...)` par `linearRamp...` dans `plink` : la goutte change de timbre.
6. Dans le drone des Ténèbres, change `55.6` en `55` (plus de battement), puis `58`.
7. `limiter.ratio.value = 1` : plus de limitation ; pluie + tonnerre proche saturent.
8. `HOWL_VOICES` : mets `q: 2` au lieu de 18 : le blizzard devient un souffle large, sans sifflement.
