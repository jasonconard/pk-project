import { newId } from "../../../database-editor/shared/database";
import { DayTime } from "../../../database-editor/shared/database";

/**
 * A cutscene (design/main-view.pen, Cinématiques): a timeline over a map, one track per actor (the camera, the
 * screen, the text, the sound, the world, the player and the NPCs placed on the map), with blocks placed in time that
 * may overlap from one track to another. Kept with its map (`SceneMap.cutscenes`), played by the event action « Jouer
 * la cinématique » (see CutsceneService).
 */
export interface Cutscene {
  id: string;
  name: string;
  tracks: CutTrack[];
  /** Played once in a game (kept in the saved games, see cutscene-seen.ts). */
  once: boolean;
  /** The player can skip it (holding « Passer » 2 s): everyone goes to their final place. */
  skippable: boolean;
  /** The ⏩ button plays it faster (×3). */
  fastForward: boolean;
  /** At the end, everyone stays where the cutscene left them, or goes back to their place. */
  atEnd: "stay" | "back";
}

/**
 * What a track holds: the camera, the screen (fades, black bars, titles), the text (messages), the sound (music,
 * sounds), the world (weather, time, objects' movements), or a character (`actor`: the player or an NPC object).
 */
export type CutTrackKind =
  "camera" | "screen" | "text" | "sound" | "world" | "actor";

/** The player's actor id (an NPC's is the id of its object on the map). */
export const PLAYER_ACTOR = "player";

export interface CutTrack {
  id: string;
  kind: CutTrackKind;
  /** A character track: PLAYER_ACTOR or the NPC object's id. */
  actor?: string;
  blocks: CutBlock[];
}

export type CutKind =
  | "cam-goto"
  | "cam-follow"
  | "cam-zoom"
  | "cam-shake"
  | "cam-orbit"
  | "walk"
  | "turn"
  | "show"
  | "hide"
  | "bubble"
  | "fade"
  | "bars"
  | "title"
  | "message"
  | "music"
  | "sound"
  | "weather"
  | "time"
  | "animate";

/** A character's emote bubble. */
export type CutEmote =
  | "exclaim"
  | "question"
  | "heart"
  | "music"
  | "dots"
  | "anger"
  | "sweat"
  | "idea";

export const CUT_EMOTES: { id: CutEmote; label: string }[] = [
  { id: "exclaim", label: "Surprise (!)" },
  { id: "question", label: "Question (?)" },
  { id: "heart", label: "Cœur" },
  { id: "music", label: "Note" },
  { id: "dots", label: "Silence (…)" },
  { id: "anger", label: "Colère" },
  { id: "sweat", label: "Gêne" },
  { id: "idea", label: "Idée" },
];

/** A walk's pace: map units per second. */
export type CutPace = "walk" | "run" | "slow";
export const PACE_SPEED: Record<CutPace, number> = {
  walk: 100,
  run: 200,
  slow: 50,
};
export const CUT_PACES: { id: CutPace; label: string }[] = [
  { id: "walk", label: "Marche" },
  { id: "run", label: "Course" },
  { id: "slow", label: "Lent" },
];

/** Directions (PlayerDirection: up, right, down, left). */
export const CUT_DIRS: { id: number; label: string }[] = [
  { id: 2, label: "Bas" },
  { id: 3, label: "Gauche" },
  { id: 1, label: "Droite" },
  { id: 0, label: "Haut" },
];

export interface CutBlock {
  id: string;
  kind: CutKind;
  /** Seconds from the start of the cutscene. */
  start: number;
  /** Seconds (an instant block — sound, message, turn… — keeps a short duration to be seen and grabbed). */
  duration: number;
  /** walk, cam-goto: the point (world units, on the grid). */
  x?: number;
  z?: number;
  /** cam-follow: the actor followed; walk, turn: the actor looked at in the end (instead of `dir`). */
  target?: string;
  /** turn, walk (in the end): the direction (PlayerDirection), when no `target`. */
  dir?: number;
  pace?: CutPace;
  /** cam-zoom: the camera's distance (1 the usual one, 0.5 twice closer, 2 twice farther). */
  zoom?: number;
  /** cam-shake: 1 light, 2 strong, 3 very strong. */
  strength?: number;
  /** cam-orbit: degrees turned around the point looked at (positive: clockwise seen from above). */
  degrees?: number;
  emote?: CutEmote;
  /** fade: the colour, and towards it (`in` false: the screen goes dark) or back from it (`in` true). */
  color?: "black" | "white";
  in?: boolean;
  /** title: the text; message: the text, who speaks, the portrait (as the Message action). */
  text?: string;
  name?: string;
  pic?: string;
  /** music: a song of the music editor ("" : silence). */
  song?: string;
  /** sound: a sound effect (SOUND_CHOICES). */
  sound?: string;
  /** weather: a WeatherType. */
  weather?: string;
  /** time: the moment of the day it jumps to. */
  moment?: DayTime;
  /** animate: an object of the map and what it does (as the Animer l'objet action). */
  object?: string;
  mode?: "play" | "back" | "loop" | "stop";
}

/** The blocks' sorts: their track, label, icon (Lucide name), default duration (s). */
export const CUT_KINDS: {
  kind: CutKind;
  track: CutTrackKind;
  group: "Caméra" | "Personnages" | "Écran" | "Son et le reste";
  label: string;
  icon: string;
  duration: number;
}[] = [
  {
    kind: "cam-goto",
    track: "camera",
    group: "Caméra",
    label: "Aller à",
    icon: "move",
    duration: 2,
  },
  {
    kind: "cam-follow",
    track: "camera",
    group: "Caméra",
    label: "Suivre",
    icon: "locate-fixed",
    duration: 3,
  },
  {
    kind: "cam-zoom",
    track: "camera",
    group: "Caméra",
    label: "Zoom",
    icon: "zoom-in",
    duration: 1.5,
  },
  {
    kind: "cam-shake",
    track: "camera",
    group: "Caméra",
    label: "Secousse",
    icon: "vibrate",
    duration: 0.8,
  },
  {
    kind: "cam-orbit",
    track: "camera",
    group: "Caméra",
    label: "Tourner autour",
    icon: "rotate-3d",
    duration: 3,
  },
  {
    kind: "walk",
    track: "actor",
    group: "Personnages",
    label: "Marcher",
    icon: "footprints",
    duration: 2,
  },
  {
    kind: "turn",
    track: "actor",
    group: "Personnages",
    label: "Se tourner",
    icon: "rotate-ccw",
    duration: 0.5,
  },
  {
    kind: "show",
    track: "actor",
    group: "Personnages",
    label: "Apparaître",
    icon: "eye",
    duration: 0.5,
  },
  {
    kind: "hide",
    track: "actor",
    group: "Personnages",
    label: "Disparaître",
    icon: "eye-off",
    duration: 0.5,
  },
  {
    kind: "bubble",
    track: "actor",
    group: "Personnages",
    label: "Bulle",
    icon: "message-circle",
    duration: 1.2,
  },
  {
    kind: "fade",
    track: "screen",
    group: "Écran",
    label: "Fondu",
    icon: "blend",
    duration: 1,
  },
  {
    kind: "bars",
    track: "screen",
    group: "Écran",
    label: "Bandes noires",
    icon: "rectangle-horizontal",
    duration: 6,
  },
  {
    kind: "title",
    track: "screen",
    group: "Écran",
    label: "Titre",
    icon: "type",
    duration: 2.5,
  },
  {
    kind: "message",
    track: "text",
    group: "Son et le reste",
    label: "Message",
    icon: "message-square-text",
    duration: 2,
  },
  {
    kind: "music",
    track: "sound",
    group: "Son et le reste",
    label: "Musique",
    icon: "music",
    duration: 1,
  },
  {
    kind: "sound",
    track: "sound",
    group: "Son et le reste",
    label: "Son",
    icon: "volume-2",
    duration: 0.5,
  },
  {
    kind: "weather",
    track: "world",
    group: "Son et le reste",
    label: "Météo",
    icon: "cloud-sun",
    duration: 0.5,
  },
  {
    kind: "time",
    track: "world",
    group: "Son et le reste",
    label: "Heure",
    icon: "hourglass",
    duration: 0.5,
  },
  {
    kind: "animate",
    track: "world",
    group: "Son et le reste",
    label: "Animer l'objet",
    icon: "cog",
    duration: 1,
  },
];

export function cutKind(kind: CutKind) {
  return CUT_KINDS.find((k) => k.kind === kind)!;
}

/** The fixed tracks, in this order, before the characters' ones. */
export const FIXED_TRACKS: { kind: CutTrackKind; label: string }[] = [
  { kind: "camera", label: "Caméra" },
  { kind: "screen", label: "Écran" },
  { kind: "text", label: "Texte" },
  { kind: "sound", label: "Son" },
  { kind: "world", label: "Monde" },
];

/** Blocks shorter than this, after which nothing moves on (sound, message, turn…): fired when the time reaches them. */
export const INSTANT_KINDS: CutKind[] = [
  "turn",
  "show",
  "hide",
  "message",
  "music",
  "sound",
  "weather",
  "time",
  "animate",
];

export function newCutscene(name: string): Cutscene {
  return {
    id: newId("cut"),
    name,
    tracks: FIXED_TRACKS.map((t) => ({
      id: newId("trk"),
      kind: t.kind,
      blocks: [],
    })),
    once: true,
    skippable: true,
    fastForward: true,
    atEnd: "stay",
  };
}

export function newCharacterTrack(actor: string): CutTrack {
  return { id: newId("trk"), kind: "actor", actor, blocks: [] };
}

/** A new block of a sort at a time, with its default settings. */
export function newBlock(kind: CutKind, start: number): CutBlock {
  const meta = cutKind(kind);
  const block: CutBlock = {
    id: newId("blk"),
    kind,
    start: Math.max(0, Math.round(start * 10) / 10),
    duration: meta.duration,
  };
  switch (kind) {
    case "walk":
      return { ...block, pace: "walk" };
    case "turn":
      return { ...block, dir: 2 };
    case "bubble":
      return { ...block, emote: "exclaim" };
    case "cam-zoom":
      return { ...block, zoom: 0.6 };
    case "cam-shake":
      return { ...block, strength: 2 };
    case "cam-orbit":
      return { ...block, degrees: 90 };
    case "cam-follow":
      return { ...block, target: PLAYER_ACTOR };
    case "fade":
      return { ...block, color: "black", in: false };
    case "title":
      return { ...block, text: "Chapitre 1" };
    case "message":
      return { ...block, text: "", name: "" };
    case "music":
      return { ...block, song: "" };
    case "sound":
      return { ...block, sound: "bip" };
    case "weather":
      return { ...block, weather: "rainy" };
    case "time":
      return { ...block, moment: "evening" };
    case "animate":
      return { ...block, object: "", mode: "play" };
    default:
      return block;
  }
}

/** The cutscene's length: the end of its last block (at least 1 s). */
export function cutsceneLength(cut: Cutscene): number {
  let end = 1;
  for (const track of cut.tracks) {
    for (const b of track.blocks) {
      end = Math.max(end, b.start + b.duration);
    }
  }
  return end;
}

/** The events that play cutscenes: the ids found in a map's objects' instructions (see InstructionType.CUTSCENE). */
export interface CutsceneUse {
  cutscene: string;
  /** « Bernard · Parler »: the object and the event's trigger. */
  label: string;
}
