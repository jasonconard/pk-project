import {
  LucideBlend,
  LucideCloudSun,
  LucideCog,
  LucideEarth,
  LucideEye,
  LucideEyeOff,
  LucideFootprints,
  LucideHourglass,
  LucideIcon,
  LucideLocateFixed,
  LucideMessageCircle,
  LucideMessageSquareText,
  LucideMonitor,
  LucideMove,
  LucideMusic,
  LucideRectangleHorizontal,
  LucideRotate3d,
  LucideRotateCcw,
  LucideSquare,
  LucideType,
  LucideUserRound,
  LucideVibrate,
  LucideVideo,
  LucideVolume2,
  LucideZoomIn,
} from "@lucide/angular";
import {
  CUT_DIRS,
  CUT_EMOTES,
  CutBlock,
  CutKind,
  cutKind,
  CutTrack,
  CutTrackKind,
  PLAYER_ACTOR,
} from "../shared/model/cutscene";
import { SOUND_CHOICES } from "../shared/services/sfx";
import { WEATHER_CHOICES } from "../shared/weather/Weather";
import { DAY_TIMES } from "../../database-editor/shared/database";

/** The blocks' icons (CUT_KINDS gives Lucide names). */
const ICONS: Record<string, LucideIcon> = {
  move: LucideMove,
  "locate-fixed": LucideLocateFixed,
  "zoom-in": LucideZoomIn,
  vibrate: LucideVibrate,
  "rotate-3d": LucideRotate3d,
  footprints: LucideFootprints,
  "rotate-ccw": LucideRotateCcw,
  eye: LucideEye,
  "eye-off": LucideEyeOff,
  "message-circle": LucideMessageCircle,
  blend: LucideBlend,
  "rectangle-horizontal": LucideRectangleHorizontal,
  type: LucideType,
  "message-square-text": LucideMessageSquareText,
  music: LucideMusic,
  "volume-2": LucideVolume2,
  "cloud-sun": LucideCloudSun,
  hourglass: LucideHourglass,
  cog: LucideCog,
};

export function kindIcon(kind: CutKind): LucideIcon {
  return ICONS[cutKind(kind).icon] ?? LucideSquare;
}

export const TRACK_ICONS: Record<CutTrackKind, LucideIcon> = {
  camera: LucideVideo,
  screen: LucideMonitor,
  text: LucideMessageSquareText,
  sound: LucideMusic,
  world: LucideEarth,
  actor: LucideUserRound,
};

const TRACK_COLORS: Record<CutTrackKind, string> = {
  camera: "#5AA8FF",
  screen: "#AAB0C4",
  text: "#F0C75E",
  sound: "#C58AF0",
  world: "#6FD3C7",
  actor: "#7BD88F",
};

export const PLAYER_COLOR = "#FFB04A";

export function trackColor(kind: CutTrackKind, actor?: string): string {
  return kind === "actor" && actor === PLAYER_ACTOR
    ? PLAYER_COLOR
    : TRACK_COLORS[kind];
}

/** The groups of the « Ajouter » sheet, their colour. */
export const GROUP_COLORS: Record<string, string> = {
  Caméra: TRACK_COLORS.camera,
  Personnages: TRACK_COLORS.actor,
  Écran: TRACK_COLORS.screen,
  "Son et le reste": TRACK_COLORS.sound,
};

/** « 4,2 » (French decimal comma, one decimal). */
export function decimal(value: number, digits = 1): string {
  return value.toFixed(digits).replace(".", ",");
}

/** « 4,2 s ». */
export function seconds(value: number): string {
  return `${decimal(value)} s`;
}

/** A cutscene's length: « 12 s », « 12,5 s ». */
export function shortSeconds(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded} s` : seconds(rounded);
}

/** « Case 9, 14 » (the map's cells are 16 units). */
export function cellLabel(x: number, z: number): string {
  return `Case ${Math.round(x / 16)}, ${Math.round(z / 16)}`;
}

/** An actor's short name: « Hugo (joueur) » → « Hugo ». */
export function shortName(label: string): string {
  return label.replace(/\s*\(.*\)$/, "");
}

/** What the block summaries need from the editor. */
export interface LabelContext {
  actorName(id: string | undefined): string;
  songName(id: string): string;
  objectName(id: string): string;
  /** The actor standing near a point (« Vers Bernard »), if any. */
  near(x: number, z: number): string | null;
}

function dirLabel(dir: number | undefined): string {
  return CUT_DIRS.find((d) => d.id === dir)?.label ?? "";
}

function pointLabel(block: CutBlock, context: LabelContext): string | null {
  if (block.x === undefined || block.z === undefined) {
    return null;
  }
  const near = context.near(block.x, block.z);
  return near ? `vers ${near}` : cellLabel(block.x, block.z).toLowerCase();
}

/** A block's short text on the timeline. */
export function blockSummary(block: CutBlock, context: LabelContext): string {
  const label = cutKind(block.kind).label;
  switch (block.kind) {
    case "walk": {
      const point = pointLabel(block, context);
      return point ? `${label} → ${point}` : label;
    }
    case "cam-goto": {
      const point = pointLabel(block, context);
      return point ? point.charAt(0).toUpperCase() + point.slice(1) : label;
    }
    case "cam-follow":
      return `Suivre ${context.actorName(block.target)}`;
    case "cam-zoom": {
      const zoom = block.zoom ?? 1;
      return zoom < 1 ? `×${decimal(1 / zoom)}` : `Recul ×${decimal(zoom)}`;
    }
    case "cam-orbit":
      return `Tourner ${block.degrees ?? 0}°`;
    case "turn":
      return block.target
        ? `Vers ${context.actorName(block.target)}`
        : dirLabel(block.dir);
    case "bubble":
      return CUT_EMOTES.find((e) => e.id === block.emote)?.label ?? label;
    case "fade": {
      const color = block.color === "white" ? "blanc" : "noir";
      return block.in ? `Retour du ${color}` : `Fondu au ${color}`;
    }
    case "title":
      return `« ${block.text ?? ""} »`;
    case "message": {
      const text = `« ${block.text || "…"} »`;
      return block.name ? `${block.name} : ${text}` : text;
    }
    case "music":
      return block.song
        ? `Musique · ${context.songName(block.song)}`
        : "Silence";
    case "sound":
      return `Son · ${SOUND_CHOICES.find((s) => s.id === block.sound)?.label ?? ""}`;
    case "weather":
      return (
        WEATHER_CHOICES.find((w) => w.type === block.weather)?.label ?? label
      );
    case "time":
      return DAY_TIMES.find((d) => d.id === block.moment)?.label ?? label;
    case "animate":
      return block.object
        ? `${label} · ${context.objectName(block.object)}`
        : label;
    default:
      return label;
  }
}

/** The fixed track a block sort goes on, or "actor". */
export function trackKindOf(kind: CutKind): CutTrackKind {
  return cutKind(kind).track;
}

export function hasBlocks(track: CutTrack | undefined): boolean {
  return (track?.blocks.length ?? 0) > 0;
}
