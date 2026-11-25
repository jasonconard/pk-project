import { VecBox3 } from "./SceneUtils";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { PlayerDirection } from "./ScenePlayer";
import { SceneEventInstruction } from "./SceneEventInstruction";
import * as THREE from "three";

import { DayTime } from "../../../database-editor/shared/database";
import { CalendarDay } from "./ObjectEvent";
export interface SceneEvent {
  conditions: SceneEventCondition;
  instructions: SceneEventInstruction[];
  /** Made in the map editor's event window (see ObjectEvent): edited there, the passage left apart. */
  edited?: boolean;
  /** The object turns towards the player when the event starts (a character). */
  face?: boolean;
}

export interface SceneEventCondition {
  direction?: PlayerDirection; // Only use up down left right =)
  bounds?: VecBox3;
  pressedKeys?: KeyCode[];
  /** The keys also count while held (not only when just pressed): walking into a door. */
  held?: boolean;
  /**
   * How the event starts when no key is waited for: 'enter' when the player steps into the bounds, 'auto' as soon as
   * the other conditions become true (anywhere on the map). Both play again only after having been false.
   */
  trigger?: "enter" | "auto";
  /** Story variables to check (all must be true). */
  variables?: VariableTest[];
  /** Game hours (from included, to excluded; from > to goes over midnight, e.g. 20 → 6). */
  hours?: { from: number; to: number };
  /** One of these weathers (WeatherType). */
  weathers?: string[];
  /** Items the team must carry (at least `count` of each; database ids). */
  items?: { id: string; count: number }[];
  /** Money the team must have, at least. */
  money?: number;
  /** Characters who must be in the team (database ids). */
  members?: string[];
  /** Days of the week (indexes in the calendar's week). */
  weekdays?: number[];
  /** Dates each year, from … to (included; from after to goes over the new year). */
  dates?: { from: CalendarDay; to: CalendarDay };
  /** Moments of the day. */
  moments?: DayTime[];
  /** One of these special days of the calendar (ids). */
  specials?: string[];
}

/** A flag is true / false ('is'); a counter compared with a number. */
export interface VariableTest {
  id: string;
  op: "is" | "eq" | "ne" | "gte" | "lte";
  value: boolean | number;
}

export interface SceneEventHelper {
  evt: SceneEvent;
  buildingMesh: THREE.Object3D;
}
