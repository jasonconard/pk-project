import { ActionZone } from "./action-zone";
import { SceneBuilding } from "./SceneBuilding";
import { SceneEvent, VariableTest } from "./SceneEvent";
import {
  InstructionType,
  SceneEventInstruction,
} from "./SceneEventInstruction";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { isPassageEvent } from "./Passage";
import { Vec3 } from "./SceneUtils";
import { currentParty } from "../../../database-editor/shared/party";
import {
  DATABASE_KEY,
  loadDatabase,
} from "../../../database-editor/shared/database-storage";
import { cachedFromStorage } from "../../../../core/shared/local-store";

import { DayTime } from "../../../database-editor/shared/database";
import {
  dateOf,
  gameCalendar,
  momentAt,
  specialDayFits,
} from "./game-calendar";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import { linkState } from "../../../database-editor/shared/links";
/**
 * An event set on an object in the map editor's event window: what starts it (talking to the object, stepping on it,
 * or on its own), the conditions that must be true (story variables, hour, weather) and the actions played one after
 * the other. Stored as one of the object's events (a SceneEvent marked `edited`), so the game plays it like any
 * event. An object may have several: the game plays the first one whose trigger and conditions fit.
 */
export interface ObjectEvent {
  trigger: EventTrigger;
  /** The object turns towards the player first (talking to a character). */
  face?: boolean;
  conditions: EventConditions;
  actions: EventAction[];
  /** Its own action zone (else the object's; see action-zone.ts). Not for « auto ». */
  zone?: ActionZone;
}

/** 'action': the action key next to the object; 'enter': walking onto it (a zone); 'auto': when the conditions become true. */
export type EventTrigger = "action" | "enter" | "auto";

export interface EventConditions {
  variables: VariableTest[];
  hours?: { from: number; to: number };
  /** WeatherType ids. */
  weathers?: string[];
  /** The team carries at least `count` of these items (database ids). */
  items?: { id: string; count: number }[];
  /** The team has at least this money. */
  money?: number;
  /** These characters are in the team. */
  members?: string[];
  /** Days of the week (indexes in the calendar's week). */
  weekdays?: number[];
  /** Dates each year, from … to (included; from after to goes over the new year). */
  dates?: { from: CalendarDay; to: CalendarDay };
  /** Moments of the day. */
  moments?: DayTime[];
  /** One of these special days of the calendar (ids). */
  specials?: string[];
  /** Social links at a level or more (character or NPC id). */
  links?: { id: string; level: number }[];
}

/** A day of the year: month index and day (from 1). */
export interface CalendarDay {
  month: number;
  day: number;
}

export type EventAction =
  | {
      type: "message";
      name?: string;
      text: string;
      /** Portrait shown next to the text: a character's or an NPC's (see `portraitRef`), or an image path. */ pic?: string;
    }
  | { type: "choice"; options: ChoiceOption[] }
  | {
      type: "if";
      conditions: EventConditions;
      then: EventAction[];
      else: EventAction[];
    }
  | { type: "variable"; id: string; op: "set" | "add"; value: boolean | number }
  | { type: "teleport"; map: string; pos?: Vec3 }
  | { type: "weather"; weather: string }
  | { type: "sound"; sound: string }
  | { type: "wait"; seconds: number }
  | { type: "stop" }
  /** Items given (+) or taken (−) (database id). */
  | { type: "item"; item: string; amount: number }
  | { type: "money"; amount: number }
  | { type: "party"; character: string; join: boolean }
  /** The team healed: PV and PM full, states gone. */
  | { type: "heal" }
  /** The time passes (a fade to black): some hours, until a moment of the day, or the next morning. */
  | {
      type: "time";
      mode: "hours" | "until" | "nextDay";
      hours: number;
      moment: DayTime;
    }
  /** The time stops (until it goes on, or another map) or goes on again. */
  | { type: "timeFlow"; stop: boolean }
  /** An object's movements « Par un événement » (its model's parts): played, sent back, looped, stopped. */
  | {
      type: "animate";
      /** An object of the map (missing: this object). */
      object: string;
      mode: "play" | "back" | "loop" | "stop";
      wait: boolean;
    }
  /** A cutscene of the map is played (see cutscene.ts), then the event goes on. */
  | { type: "cutscene"; cutscene: string }
  /** Points to a social link (a team member or an NPC); the player sees it go up. */
  | { type: "link"; target: string; points: number }
  /** The player picks a gift in the bag for an NPC (its link goes up, more for a liked one; one a day). */
  | { type: "gift"; target: string }
  /** A shop of the database opens (buy, sell); the event goes on once it is closed. */
  | { type: "shop"; shop: string }
  /** The members behind the leader follow again or hide (story scenes). */
  | { type: "team"; follow: boolean }
  /** A light of the map (an object's; empty: this object) or the player's lantern, on or off. */
  | { type: "light"; target: string; on: boolean }
  /** A fight against a group of the database, then the branch of how it ended. */
  | {
      type: "fight";
      group: string;
      win: EventAction[];
      lose: EventAction[];
      flee: EventAction[];
    };

/** One answer of a choice, and what happens when the player picks it. */
export interface ChoiceOption {
  text: string;
  actions: EventAction[];
}

/**
 * A message's portrait taken from the database (drawn in a sheet): `character:<id>` (a team character) or
 * `npc:<id>` (an NPC); else an image path.
 */
export type PortraitOwner = "character" | "npc";

/** The first dialogues' pictures, now the portraits of the database's characters. */
const OLD_FACES: Record<string, string> = {
  "assets/img/faces/face-hugo.png": "character:ch-hugo",
  "assets/img/faces/face-jason.png": "character:ch-jason",
};

/** A message's portrait choosing a character's or an NPC's portrait. */
export function portraitOf(owner: PortraitOwner, id: string): string {
  return `${owner}:${id}`;
}

/** Whose portrait a message shows (`character:<id>`, `npc:<id>`; the first dialogues' pictures too), else undefined. */
export function portraitRef(pic: string | undefined): string | undefined {
  if (!pic) {
    return undefined;
  }
  return /^(character|npc):/.test(pic) ? pic : OLD_FACES[pic];
}

const portraitsByRef = cachedFromStorage([DATABASE_KEY], () => {
  const db = loadDatabase();
  const byRef = new Map<string, string | undefined>();
  for (const c of db.characters) {
    byRef.set(portraitOf("character", c.id), c.portrait);
  }
  for (const n of db.npcs) {
    byRef.set(portraitOf("npc", n.id), n.portrait);
  }
  return byRef;
});

/** The picture to show for a message's portrait (a character's or an NPC's read from the database, else the path). */
export function portraitSrc(pic: string | undefined): string | undefined {
  const ref = portraitRef(pic);
  if (!ref) {
    return pic;
  }
  return portraitsByRef().get(ref) ?? (ref === pic ? undefined : pic);
}

/** How deep choices and conditions may go in each other (a choice in a choice in a choice). */
export const MAX_BRANCH_DEPTH = 3;
export const MAX_CHOICE_OPTIONS = 4;

export type EventActionType = EventAction["type"];

/** The player stands up to this many units around the object (any side) to talk to it. */
const TALK_REACH = 20;
/** The object's box may start a little above the ground (models resting on 0.5): the player's feet still count. */
const STEP_TOLERANCE = 4;

/** Can the event window edit this event? Its own events, and the talks of the first version (only messages). */
export function isEditableEvent(event: SceneEvent): boolean {
  if (event.edited) {
    return true;
  }
  return (
    !isPassageEvent(event) &&
    event.instructions.length > 0 &&
    !event.conditions.trigger &&
    event.instructions.every(
      (i) =>
        i.type === InstructionType.MESSAGE &&
        !i.message?.choices?.length &&
        !i.subInstructions?.length
    )
  );
}

/** The object's events made in the editor, in order. */
export function objectEventsOf(building: SceneBuilding): ObjectEvent[] {
  return building.events.filter(isEditableEvent).map(toObjectEvent);
}

/** The object's events with the editor's ones replaced (the passage and the hand-written ones are kept, first). */
export function eventsWithObjectEvents(
  building: SceneBuilding,
  events: ObjectEvent[]
): SceneEvent[] {
  return [
    ...building.events.filter((event) => !isEditableEvent(event)),
    ...events.map(toSceneEvent),
  ];
}

export function newObjectEvent(): ObjectEvent {
  return {
    trigger: "action",
    conditions: { variables: [] },
    actions: [{ type: "message", text: "" }],
  };
}

export function toSceneEvent(event: ObjectEvent): SceneEvent {
  const checks = conditionsData(event.conditions);
  // Where the player must stand (or step), and the key waited for, by trigger
  const placements: Record<EventTrigger, SceneEvent["conditions"]> = {
    action: {
      pressedKeys: [KeyCode.confirm],
      bounds: {
        min: { x: TALK_REACH, y: STEP_TOLERANCE, z: TALK_REACH },
        max: { x: TALK_REACH, y: 0, z: TALK_REACH },
      },
    },
    enter: {
      trigger: "enter",
      bounds: {
        min: { x: 0, y: STEP_TOLERANCE, z: 0 },
        max: { x: 0, y: 0, z: 0 },
      },
    },
    auto: { trigger: "auto" },
  };
  const conditions: SceneEvent["conditions"] = {
    ...placements[event.trigger],
    ...checks,
    ...(event.zone && event.trigger !== "auto"
      ? { zone: structuredClone(event.zone) }
      : {}),
  };
  return {
    edited: true,
    ...(event.face && event.trigger === "action" ? { face: true } : {}),
    conditions,
    instructions: toInstructions(event.actions),
  };
}

/**
 * The actions as the game's instructions. A choice is shown with the message just before it (as in RPG Maker): that
 * message gets the answers, and each answer's actions are its sub-instructions; a choice with no message before it
 * gets an empty one.
 */
function toInstructions(actions: EventAction[]): SceneEventInstruction[] {
  const out: SceneEventInstruction[] = [];
  for (const action of actions) {
    switch (action.type) {
      case "choice": {
        const last = out.at(-1);
        let target =
          last?.type === InstructionType.MESSAGE &&
          last.message &&
          !last.message.choices
            ? last
            : undefined;
        if (!target) {
          target = { type: InstructionType.MESSAGE, message: { text: "" } };
          out.push(target);
        }
        target.message!.choices = action.options.map((option, k) => ({
          key: "c" + k,
          text: option.text,
        }));
        target.subInstructions = action.options.map((option, k) => ({
          condition: "c" + k,
          instructions: toInstructions(option.actions),
        }));

        break;
      }
      case "fight": {
        out.push({
          type: InstructionType.FIGHT,
          fight: { group: action.group },
          subInstructions: (["win", "lose", "flee"] as const).map((key) => ({
            condition: key,
            instructions: toInstructions(action[key]),
          })),
        });

        break;
      }
      case "if": {
        out.push({
          type: InstructionType.BRANCH,
          branch: conditionsData(action.conditions),
          subInstructions: [
            { condition: "then", instructions: toInstructions(action.then) },
            { condition: "else", instructions: toInstructions(action.else) },
          ],
        });

        break;
      }
      default: {
        out.push(toInstruction(action));
      }
    }
  }
  return out;
}

/** The conditions as stored (only what is set). */
function conditionsData(c: EventConditions) {
  return {
    ...(c.variables.length > 0
      ? { variables: c.variables.map((v) => ({ ...v })) }
      : {}),
    ...partyConditions(c),
  };
}

/** The hour, weather and team conditions, copied (only what is set): both ways, editor ↔ game. */
function partyConditions(c: Omit<EventConditions, "variables">) {
  return {
    ...(c.hours ? { hours: { ...c.hours } } : {}),
    ...(c.weathers?.length ? { weathers: [...c.weathers] } : {}),
    ...(c.items?.length ? { items: c.items.map((i) => ({ ...i })) } : {}),
    ...(c.money ? { money: c.money } : {}),
    ...(c.members?.length ? { members: [...c.members] } : {}),
    ...(c.weekdays?.length ? { weekdays: [...c.weekdays] } : {}),
    ...(c.dates ? { dates: structuredClone(c.dates) } : {}),
    ...(c.moments?.length ? { moments: [...c.moments] } : {}),
    ...(c.specials?.length ? { specials: [...c.specials] } : {}),
    ...(c.links?.length ? { links: c.links.map((l) => ({ ...l })) } : {}),
  };
}

function toInstruction(
  action: Exclude<EventAction, { type: "choice" | "if" | "fight" }>
): SceneEventInstruction {
  switch (action.type) {
    case "message":
      return {
        type: InstructionType.MESSAGE,
        message: {
          ...(action.name?.trim() ? { name: action.name.trim() } : {}),
          text: action.text,
          ...(action.pic ? { pic: action.pic } : {}),
        },
      };
    case "variable":
      return {
        type: InstructionType.VARIABLE,
        variable: { id: action.id, op: action.op, value: action.value },
      };
    case "teleport":
      return {
        type: InstructionType.TELEPORT,
        teleport: {
          map: action.map,
          ...(action.pos ? { pos: { ...action.pos } } : {}),
        },
      };
    case "weather":
      return {
        type: InstructionType.WEATHER,
        weather: { type: action.weather },
      };
    case "sound":
      return { type: InstructionType.SOUND, sound: { id: action.sound } };
    case "wait":
      return {
        type: InstructionType.WAIT,
        wait: { time: Math.round(action.seconds * 1000) },
      };
    case "stop":
      return { type: InstructionType.STOP };
    case "item":
      return {
        type: InstructionType.ITEM,
        item: { id: action.item, amount: action.amount },
      };
    case "money":
      return { type: InstructionType.MONEY, money: { amount: action.amount } };
    case "party":
      return {
        type: InstructionType.PARTY,
        party: { id: action.character, join: action.join },
      };
    case "heal":
      return { type: InstructionType.HEAL };
    case "time":
      return {
        type: InstructionType.TIME,
        time: {
          mode: action.mode,
          ...(action.mode === "hours" ? { hours: action.hours } : {}),
          ...(action.mode === "until" ? { moment: action.moment } : {}),
        },
      };
    case "team":
      return { type: InstructionType.TEAM, team: { follow: action.follow } };
    case "light":
      return {
        type: InstructionType.LIGHT,
        light: {
          ...(action.target ? { target: action.target } : {}),
          on: action.on,
        },
      };
    case "timeFlow":
      return {
        type: InstructionType.TIME_FLOW,
        timeFlow: { stop: action.stop },
      };
    case "animate":
      return {
        type: InstructionType.ANIMATE,
        animate: {
          ...(action.object ? { object: action.object } : {}),
          mode: action.mode,
          wait: action.wait,
        },
      };
    case "cutscene":
      return {
        type: InstructionType.CUTSCENE,
        cutscene: { id: action.cutscene },
      };
    case "link":
      return {
        type: InstructionType.LINK,
        link: { id: action.target, points: action.points },
      };
    case "gift":
      return { type: InstructionType.GIFT, gift: { npc: action.target } };
    case "shop":
      return { type: InstructionType.SHOP, shop: { id: action.shop } };
  }
}

function toObjectEvent(event: SceneEvent): ObjectEvent {
  const c = event.conditions;
  const trigger: EventTrigger = c.trigger ?? "action";
  return {
    trigger,
    ...(event.face ? { face: true } : {}),
    conditions: {
      variables: (c.variables ?? []).map((v) => ({ ...v })),
      ...partyConditions(c),
    },
    actions: toActions(event.instructions),
    ...(c.zone ? { zone: structuredClone(c.zone) } : {}),
  };
}

/** The game's instructions back as actions (a message with answers: the message, then the choice). */
function toActions(instructions: SceneEventInstruction[]): EventAction[] {
  return instructions.flatMap((instruction) => {
    const message = instruction.message;
    if (
      instruction.type === InstructionType.MESSAGE &&
      message?.choices?.length
    ) {
      const choice: EventAction = {
        type: "choice",
        options: message.choices.map((c) => ({
          text: c.text,
          actions: toActions(
            instruction.subInstructions?.find((sub) => sub.condition === c.key)
              ?.instructions ?? []
          ),
        })),
      };
      const said = message.text || message.name;
      return said
        ? [
            toAction({
              type: InstructionType.MESSAGE,
              message: { ...message, choices: undefined },
            })!,
            choice,
          ]
        : [choice];
    }
    if (instruction.type === InstructionType.BRANCH) {
      const sub = (key: string) =>
        toActions(
          instruction.subInstructions?.find((s) => s.condition === key)
            ?.instructions ?? []
        );
      const b = instruction.branch ?? {};
      return [
        {
          type: "if" as const,
          conditions: {
            variables: (b.variables ?? []).map((v) => ({ ...v })),
            ...partyConditions(b),
          },
          then: sub("then"),
          else: sub("else"),
        },
      ];
    }
    if (instruction.type === InstructionType.FIGHT) {
      const sub = (key: string) =>
        toActions(
          instruction.subInstructions?.find((s) => s.condition === key)
            ?.instructions ?? []
        );
      return [
        {
          type: "fight" as const,
          group: instruction.fight?.group ?? "",
          win: sub("win"),
          lose: sub("lose"),
          flee: sub("flee"),
        },
      ];
    }
    const action = toAction(instruction);
    return action ? [action] : [];
  });
}

function toAction(instruction: SceneEventInstruction): EventAction | null {
  switch (instruction.type) {
    case InstructionType.MESSAGE:
      return {
        type: "message",
        ...(instruction.message?.name
          ? { name: instruction.message.name }
          : {}),
        text: instruction.message?.text ?? "",
        ...(instruction.message?.pic ? { pic: instruction.message.pic } : {}),
      };
    case InstructionType.VARIABLE:
      return instruction.variable
        ? { type: "variable", ...instruction.variable }
        : null;
    case InstructionType.TELEPORT:
      return instruction.teleport?.map
        ? {
            type: "teleport",
            map: instruction.teleport.map,
            ...(instruction.teleport.pos
              ? { pos: { ...instruction.teleport.pos } }
              : {}),
          }
        : null;
    case InstructionType.WEATHER:
      return instruction.weather
        ? { type: "weather", weather: instruction.weather.type }
        : null;
    case InstructionType.SOUND:
      return instruction.sound
        ? { type: "sound", sound: instruction.sound.id }
        : null;
    case InstructionType.WAIT:
      return { type: "wait", seconds: (instruction.wait?.time ?? 0) / 1000 };
    case InstructionType.STOP:
      return { type: "stop" };
    case InstructionType.HEAL:
      return { type: "heal" };
    case InstructionType.TIME:
      return instruction.time
        ? {
            type: "time",
            mode: instruction.time.mode,
            hours: instruction.time.hours ?? 2,
            moment: instruction.time.moment ?? "evening",
          }
        : null;
    case InstructionType.TIME_FLOW:
      return { type: "timeFlow", stop: !!instruction.timeFlow?.stop };
    case InstructionType.LIGHT:
      return {
        type: "light",
        target: instruction.light?.target ?? "",
        on: instruction.light?.on !== false,
      };
    case InstructionType.TEAM:
      return { type: "team", follow: instruction.team?.follow !== false };
    case InstructionType.ANIMATE:
      return instruction.animate
        ? {
            type: "animate",
            object: instruction.animate.object ?? "",
            mode: instruction.animate.mode,
            wait: instruction.animate.wait,
          }
        : null;
    case InstructionType.CUTSCENE:
      return instruction.cutscene
        ? { type: "cutscene", cutscene: instruction.cutscene.id }
        : null;
    case InstructionType.LINK:
      return instruction.link
        ? {
            type: "link",
            target: instruction.link.id,
            points: instruction.link.points,
          }
        : null;
    case InstructionType.SHOP:
      return instruction.shop
        ? { type: "shop", shop: instruction.shop.id }
        : null;
    case InstructionType.GIFT:
      return instruction.gift
        ? { type: "gift", target: instruction.gift.npc }
        : null;
    case InstructionType.ITEM:
      return instruction.item
        ? {
            type: "item",
            item: instruction.item.id,
            amount: instruction.item.amount,
          }
        : null;
    case InstructionType.MONEY:
      return instruction.money
        ? { type: "money", amount: instruction.money.amount }
        : null;
    case InstructionType.PARTY:
      return instruction.party
        ? {
            type: "party",
            character: instruction.party.id,
            join: instruction.party.join,
          }
        : null;
    default:
      return null;
  }
}

/** Does the event's conditions fit now? */
export interface EventContext {
  hour: number;
  /** The game's date (a day number, see game-calendar.ts). */
  day: number;
  weather: string;
  values: Record<string, boolean | number>;
}

export function conditionsFit(
  conditions: Pick<
    SceneEvent["conditions"],
    | "variables"
    | "hours"
    | "weathers"
    | "items"
    | "money"
    | "members"
    | "weekdays"
    | "dates"
    | "moments"
    | "specials"
    | "links"
  >,
  ctx: EventContext
): boolean {
  if (!calendarFits(conditions, ctx)) {
    return false;
  }
  if (conditions.links?.length) {
    const db = cachedDatabase();
    if (conditions.links.some((l) => linkState(l.id, db).level < l.level)) {
      return false;
    }
  }
  const hours = conditions.hours;
  if (hours && hours.from !== hours.to) {
    const h = ctx.hour;
    const inside =
      hours.from < hours.to
        ? h >= hours.from && h < hours.to
        : h >= hours.from || h < hours.to;
    if (!inside) {
      return false;
    }
  }
  if (
    conditions.weathers?.length &&
    !conditions.weathers.includes(ctx.weather)
  ) {
    return false;
  }
  if (
    conditions.items?.length ||
    conditions.money ||
    conditions.members?.length
  ) {
    const party = currentParty();
    if (
      (conditions.items ?? []).some(
        (i) => (party.items[i.id] ?? 0) < i.count
      ) ||
      party.money < (conditions.money ?? 0) ||
      (conditions.members ?? []).some((m) => !party.team.includes(m))
    ) {
      return false;
    }
  }
  return (conditions.variables ?? []).every((test) => {
    const value = ctx.values[test.id];
    if (value === undefined) {
      return false; // (a variable deleted since: the event never plays)
    }
    switch (test.op) {
      case "is":
        return value === test.value;
      case "eq":
        return value === test.value;
      case "ne":
        return value !== test.value;
      case "gte":
        return typeof value === "number" && value >= Number(test.value);
      case "lte":
        return typeof value === "number" && value <= Number(test.value);
    }
  });
}

/** The day of the week, date, moment and special day conditions (the game's calendar). */
function calendarFits(
  conditions: Pick<
    EventConditions,
    "weekdays" | "dates" | "moments" | "specials"
  >,
  ctx: EventContext
): boolean {
  const { weekdays, dates, moments, specials } = conditions;
  if (!weekdays?.length && !dates && !moments?.length && !specials?.length) {
    return true;
  }
  const calendar = gameCalendar();
  const date = dateOf(ctx.day, calendar);
  const moment = momentAt(ctx.hour, calendar);
  if (weekdays?.length && !weekdays.includes(date.weekday)) {
    return false;
  }
  if (moments?.length && !moments.includes(moment)) {
    return false;
  }
  if (dates) {
    const at = (d: CalendarDay) => d.month * 1000 + d.day;
    const now = at(date);
    const from = at(dates.from);
    const to = at(dates.to);
    const inside =
      from <= to ? now >= from && now <= to : now >= from || now <= to;
    if (!inside) {
      return false;
    }
  }
  if (
    specials?.length &&
    !calendar.special.some(
      (sd) => specials.includes(sd.id) && specialDayFits(sd, date, moment)
    )
  ) {
    return false;
  }
  return true;
}
