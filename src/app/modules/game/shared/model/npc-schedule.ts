import {
  DAY_TIMES,
  DbNpc,
  NpcSchedule,
} from "../../../database-editor/shared/database";
import { listMaps, loadMap } from "../services/map-storage";
import {
  dateOf,
  gameCalendar,
  momentAt,
  specialDayFits,
} from "./game-calendar";
import { NPC_PREFIX } from "./npc-sprite";

/**
 * Where an NPC is (its schedule, see NpcSchedule): a place is the NPC put on a map, « <map id>/<object id> ». An NPC
 * without a schedule is at all its places.
 */
export function placeKey(mapId: string, objectId: string): string {
  return `${mapId}/${objectId}`;
}

/** The place an NPC is at on that day and hour (null: absent), undefined: it has no schedule (everywhere). */
export function npcPlaceAt(
  npc: Pick<DbNpc, "schedule">,
  day: number,
  hour: number
): string | null | undefined {
  const schedule = npc.schedule;
  if (!schedule) {
    return undefined;
  }
  const calendar = gameCalendar();
  const date = dateOf(day, calendar);
  const moment = momentAt(hour, calendar);
  const exception = schedule.exceptions.find((e) => {
    const special = calendar.special.find((sd) => sd.id === e.special);
    return (
      !!special &&
      specialDayFits(special, date) &&
      (e.times.length === 0 || e.times.includes(moment))
    );
  });
  if (exception) {
    return exception.place;
  }
  const column = DAY_TIMES.findIndex((t) => t.id === moment);
  return schedule.week[date.weekday]?.[column] ?? null;
}

/** An empty schedule: absent everywhere (the week of the calendar). */
export function newSchedule(firstPlace: string | null): NpcSchedule {
  const days = gameCalendar().week.length;
  return {
    week: Array.from({ length: days }, () => DAY_TIMES.map(() => firstPlace)),
    exceptions: [],
  };
}

export interface NpcPlace {
  key: string;
  /** « Boulangerie · derrière le comptoir » */
  label: string;
}

/** Every place an NPC is put on the maps (the editor's schedule). */
export function npcPlaces(npcId: string): NpcPlace[] {
  const modelId = NPC_PREFIX + npcId;
  const places: NpcPlace[] = [];
  for (const summary of listMaps()) {
    const map = loadMap(summary.id);
    let n = 0;
    for (const chunk of map?.chunks ?? []) {
      for (const building of chunk.buildings) {
        if (building.modelId === modelId) {
          n++;
          places.push({
            key: placeKey(summary.id, building.id),
            label: `${summary.name} · ${building.label?.trim() || `place ${n}`}`,
          });
        }
      }
    }
  }
  return places;
}
