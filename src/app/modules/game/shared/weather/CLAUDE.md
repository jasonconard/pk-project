# Weather module

Big files: grep the symbol, then read only that range. Never read `day-presets.ts`, `night-presets.ts`,
`WeatherHelper.ts` or `WeatherAudio.ts` whole.

## How it fits together

- Data only, imported through `Weather.ts` (the entry: it re-exports everything below, plus `TEMPERATURES`,
  `getWeatherParams`, `isWeatherAvailable`, `WEATHER_CHOICES` (label + emoji shown in the picker; the emoji is content,
  not a UI icon), fireflies / leaves / wind options, `cloneWeatherParams`):
  - `weather-types.ts`: `WeatherType` enum → `WeatherParams` interface (every knob documented, 0 = off);
  - `day-presets.ts`: `DAY_BASE`, `preset(BASE, { overrides })`, `DAY_PRESETS`; `night-presets.ts`: `NIGHT_BASE`,
    `NIGHT_PRESETS` (a missing entry = not available at that time, see `isWeatherAvailable`);
  - `time-of-day.ts`: hours (`DAWN`, `DUSK`, `mistAt`, `daylightAt`, twilight tints, `formatHour`).
- `WeatherHelper.ts` = **the engine**, one instance owned by `Game` (`model/Game.ts`: `weather.update(dt)` each frame,
  `renderPostEffects()` for the passes). Setters called by `GameService` (`setWeather`, `setHour`, `setWind`,
  `setCloudDensity`…). Each frame `update()`:
  1. `targetParams()` blends day/night presets by daylight, adds twilight tints and morning mist;
     `blendParams()` eases `current` towards it (every number / `THREE.Color` key of `WeatherParams` is blended
     automatically: `NUMBER_KEYS` / `COLOR_KEYS` at the end of the file — a new param needs no blending code).
  2. sun/moon position (`sunWorldPos`), lights, fog, puddles, gusts, lightning, quake, flight…
  3. drives every effect helper with the matching `current` param, and pushes values into `WEATHER_UNIFORMS`.
  4. `this.audio.update(dt, levels)` (~line 782) feeds `WeatherAudio`.
- `weather-shader.ts`: `WEATHER_UNIFORMS` shared by every lit material (`applyWeatherShader` patches
  Lambert/Phong; `registerUnlitMaterial` for sprites), GLSL for beams, puddles, sway (`aSway`), darkness radius.
- Effect helpers, each a class created in the `WeatherHelper` constructor and updated with a level 0..1:
  - `GlowParticles.ts`: generic glowing particles; one `XXX_STYLE: GlowStyle` constant per look (embers, pollen,
    ash, spores, wisps…). Most new particle weathers = a new style + a new `GlowParticles` field in `WeatherHelper`.
  - `RainHelper.ts` (styles: rain, drizzle, blood, hail, acid, poison…), `SnowHelper`, `LeafHelper` (autumn /
    cherry), `SandHelper`, `StrikeHelper` (lightning strikes), `ElectricHelper`, `FireworksHelper`, `FloodHelper`,
    `GeyserHelper`, `GhostHelper`, `EyesHelper`, `TornadoHelper`, `WhirlHelper`, `WispHelper`.
  - `SurfaceHeights.ts`: cached raycast heights so rain / snow stop on roofs.
- Post passes (screen space): `BloomPass`, `GodRaysPass`, `HeatHazePass` (`PostEffects`).
- `WeatherAudio.ts`: Web Audio, all synthesized (rain / wind / sand from noise loops, ambiences per weather with their
  timers, footsteps per surface, zaps). Entry points: `update(dt, AmbienceLevels)`, `setVolume`, one-shot `playXxx`.
  `audio/`: `audio-kit.ts` (`AudioKit`: context, master, noise buffers, rain bus, panner / filter makers, made at
  start), `mix.ts` (every level, rate and interval: tune the mix there), the one-shot sounds as functions taking the
  kit: `animal-voices`, `eerie-voices`, `sound-effects`, `thunder`.
- `weather-catalog.ts`: catalog popup data (`WEATHER_CATEGORIES`, `WEATHER_INFO` texts per type, screenshots
  `src/assets/weather/<id>-<day|night>.webp` via `weatherScreenshot`). `WEATHER_INFO` is a full `Record`: a new
  `WeatherType` must get an entry or the build fails.
- `cloud-texture.ts` (cloud shadow noise), `silent-mode.ts` (iOS silent switch bypass).

## Adding a weather

Recipe in the root `CLAUDE.md`. Usual touch points: enum (`weather-types.ts`), presets (`day-presets.ts`,
`night-presets.ts`), temperature + choice (`Weather.ts`), a param if the effect is new (`WeatherParams` + `DAY_BASE` +
`NIGHT_BASE`), a style or helper, its wiring in
`WeatherHelper` (field, constructor, `update`, audio levels if it makes sound), `WEATHER_INFO` in `weather-catalog.ts`.
