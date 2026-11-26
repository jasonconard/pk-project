import { Cutscene, CutsceneUse } from "../shared/model/cutscene";
import { CutStart } from "../shared/model/cutscene-eval";

/** A character a track can be made for: the player or an NPC placed on the map. */
export interface CutsceneActor {
  /** PLAYER_ACTOR, or the NPC object's id on the map. */
  id: string;
  /** « Hugo (joueur) », « Bernard ». */
  label: string;
  /** The NPC of the database (its portrait / face), if any. */
  npc?: string;
}

/**
 * What the cutscene editor asks of the game (GameComponent gives it): the open map's cutscenes and actors, saving,
 * picking a point on the map, showing a moment of the cutscene on the map, playing it.
 */
export interface CutsceneHost {
  readonly mapId: string;
  readonly mapName: string;
  /** The map's cutscenes (a copy). */
  cutscenes(): Cutscene[];
  /** Saves the map's cutscenes (all of them). */
  save(cutscenes: Cutscene[]): void;
  /** The player first, then the NPCs placed on the map. */
  actors(): CutsceneActor[];
  /** Where everyone is before the cutscene (walks' durations from their length). */
  start(): CutStart;
  /** The map's objects whose model moves « Par un événement » (Animer l'objet). */
  objects(): { id: string; label: string }[];
  /** The songs of the music editor. */
  songs(): { id: string; name: string }[];
  /** The events of the map playing a cutscene (« Lancée par »). */
  uses(): CutsceneUse[];
  /** The next taps on the map give a point (snapped to the grid); null: the taps edit the map again. */
  pickGround(onPick: ((point: { x: number; z: number }) => void) | null): void;
  /** Shows the cutscene at a time on the map (the characters moved, the camera's frame); null: as it was. */
  preview(cut: Cutscene | null, t: number): void;
  /** Plays the cutscene in the game (from a time), then comes back to the editor. */
  play(cut: Cutscene, from: number): void;
  /** Tries the cutscene in a test (the settings chosen first, see TestModeService). */
  test?(cut: Cutscene): void;
}
