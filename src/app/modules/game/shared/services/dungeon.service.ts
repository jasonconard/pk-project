import { inject, Service, signal } from "@angular/core";
import { Subject } from "rxjs";
import * as THREE from "three";
import { SequenceService, DUNGEON_TARGET } from "./sequence.service";
import { Game } from "../model/Game";
import { MapHelper } from "../model/MapHelper";
import { SceneMap, SceneChunk } from "../model/SceneMap";
import { SceneBuilding } from "../model/SceneBuilding";
import { SceneEvent } from "../model/SceneEvent";
import {
  InstructionType,
  SceneEventInstruction,
} from "../model/SceneEventInstruction";
import { PlayerDirection } from "../model/ScenePlayer";
import { Vec3 } from "../model/SceneUtils";
import { TILE_SIZE } from "../model/Terrain";
import { GameAction, gameAction } from "../model/GameAction";
import { findModel } from "../model/Zone";
import { loadMap } from "./map-storage";
import { playSound } from "./sfx";
import {
  doorFront,
  dungeonKindOf,
  dungeonModelId,
  DungeonObject,
  foeModelId,
  foePicture,
  isFoe,
  loadPictureSize,
} from "../model/dungeon-object";
import {
  currentDungeonState,
  currentRun,
  DungeonRun,
  forgetFoundTraps,
  isOpened,
  markOpened,
  markTrapFound,
  objectKey,
  RunRoom,
  writeDungeonState,
} from "../model/dungeon-state";
import {
  dateOf,
  gameCalendar,
  momentAt,
  momentHours,
  specialDaysOn,
} from "../model/game-calendar";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import {
  DayTime,
  DbDungeon,
  DbFloor,
  floorAt,
  floorCount,
} from "../../../database-editor/shared/database";
import {
  currentParty,
  giveItem,
  giveMoney,
  healTeam,
  hurtTeam,
} from "../../../database-editor/shared/party";
import {
  currentVariableValues,
  setVariableValue,
} from "../../../variables-editor/shared/variable-values";

/** What the floor chip shows (design/main-view.pen, Donjons · Jeu · Étage en exploration). */
export interface DungeonChip {
  name: string;
  floor: string;
  closes: string;
  foes: number;
  /** The dungeon's own song (its sheet), if any. */
  music?: string;
}

/** A dungeon's enemy walking on the map. */
interface Foe {
  building: SceneBuilding;
  mesh: THREE.Object3D;
  home: THREE.Vector3;
  target: THREE.Vector3 | null;
  /** Steps it waits before walking again. */
  wait: number;
  chasing: boolean;
  /** « ! » shown until this step. */
  markUntil: number;
  /** After the team fled: it can't start a fight before this step. */
  stunnedUntil: number;
  level: number;
}

/** In steps of the input loop (120 per second). */
const STEPS_PER_SECOND = 120;
/** Foes think every this many steps. */
const FOE_EVERY = 4;
/** Units per step. */
const FOE_WALK = 0.2;
const FOE_CHASE = 0.45;
/** It sees the team this close, forgets it this far. */
const FOE_SIGHT = 72;
const FOE_FORGET = 150;
const FOE_ROAM = 48;
/** The team and a foe touch (centres this close): the fight starts. */
const FOE_TOUCH = 14;
/** How far in front of the player its action reaches. */
const REACH = 22;
/** A room door's arrival point: this far in front of it. */
const DOOR_FRONT = 22;
/** Places kept free around the arrival and between the objects put on a floor. */
const SPAWN_CLEAR = 40;
const SPOT_CLEAR = 28;

function randInt(min: number, max: number): number {
  const low = Math.min(min, max);
  return low + Math.floor(Math.random() * (Math.abs(max - min) + 1));
}

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** The front of the player (its direction), as x / z. */
function facing(dir: PlayerDirection): { x: number; z: number } {
  switch (dir) {
    case PlayerDirection.UP:
      return { x: 0, z: -1 };
    case PlayerDirection.DOWN:
      return { x: 0, z: 1 };
    case PlayerDirection.LEFT:
      return { x: -1, z: 0 };
    case PlayerDirection.RIGHT:
      return { x: 1, z: 0 };
  }
}

/** The front of an object turned `rot` quarter turns (rot 0 faces +z). */
function message(text: string, name?: string): SceneEventInstruction {
  return {
    type: InstructionType.MESSAGE,
    message: { text, ...(name ? { name } : {}) },
  };
}

function dungeonStep(
  action: NonNullable<SceneEventInstruction["dungeon"]>["action"],
  id?: string
): SceneEventInstruction {
  return {
    type: InstructionType.DUNGEON,
    dungeon: { action, ...(id ? { id } : {}) },
  };
}

/** « Potion ×2 · 150 pièces » */
function contentLabel(items: { id: string; count: number }[], money = 0) {
  const db = cachedDatabase();
  return [
    ...items.map((i) => {
      const name = db.items.find((x) => x.id === i.id)?.name ?? "?";
      return i.count > 1 ? `${name} ×${i.count}` : name;
    }),
    ...(money > 0 ? [`${money} pièces`] : []),
  ].join(" · ");
}

/** Is the dungeon open at this hour of this day? */
export function dungeonOpen(
  dungeon: DbDungeon,
  hour: number,
  day: number
): boolean {
  const calendar = gameCalendar();
  if (dungeon.moments.length === 0) {
    return true;
  }
  if (dungeon.moments.includes(momentAt(hour, calendar))) {
    return true;
  }
  return specialDaysOn(dateOf(day, calendar), calendar).some((sd) =>
    dungeon.specials.includes(sd.id)
  );
}

/** The moments as said in a sentence. */
const MOMENT_WORDS: Record<DayTime, string> = {
  morning: "le matin",
  afternoon: "l'après-midi",
  evening: "le soir",
  night: "la nuit",
};

/** « la nuit (de 22 h à 6 h), et toute la journée les jours de Pleine lune » */
function openingText(dungeon: DbDungeon): string {
  const calendar = gameCalendar();
  const moments = dungeon.moments.map((m) => {
    const { from, to } = momentHours(m, calendar);
    return `${MOMENT_WORDS[m]} (de ${from} h à ${to} h)`;
  });
  const specials = calendar.special
    .filter((sd) => dungeon.specials.includes(sd.id))
    .map((sd) => sd.name);
  const text = moments.join(", ");
  return specials.length > 0
    ? `${text}, et toute la journée les jours de ${specials.join(", ")}`
    : text;
}

/** The hour it closes, open now (« Ferme à 6:00 »). */
function closingText(dungeon: DbDungeon, hour: number): string {
  const calendar = gameCalendar();
  if (dungeon.moments.length === 0) {
    return "Toujours ouvert";
  }
  let moment = momentAt(hour, calendar);
  if (!dungeon.moments.includes(moment)) {
    return "Ferme à minuit";
  }
  let to = momentHours(moment, calendar).to;
  for (let i = 0; i < 4; i++) {
    const next = momentAt(to, calendar);
    if (next === moment || !dungeon.moments.includes(next)) {
      break;
    }
    moment = next;
    to = momentHours(moment, calendar).to;
  }
  return `Ferme à ${to}:00`;
}

/** A spot of a map where something can be put: on the ground, at the arrival's level, away from the objects. */
function freeSpots(map: SceneMap, avoid: Vec3[]): Vec3[] {
  const spawn = map.spawn ?? { x: 0, y: 0, z: 0 };
  const levelAt = (x: number, z: number): number | null => {
    const chunk = map.chunks.find(
      (c) =>
        Math.abs(x - c.pos.x) < c.size.x / 2 &&
        Math.abs(z - c.pos.z) < c.size.y / 2
    );
    if (!chunk) {
      return null;
    }
    const col = Math.floor((x - (chunk.pos.x - chunk.size.x / 2)) / TILE_SIZE);
    const row = Math.floor((z - (chunk.pos.z - chunk.size.y / 2)) / TILE_SIZE);
    const key = `${col},${row}`;
    if (chunk.stairs?.[key] || (chunk.tiles?.[key] ?? "").includes("water")) {
      return null;
    }
    return chunk.heights?.[key] ?? 0;
  };
  const level = levelAt(spawn.x, spawn.z) ?? 0;
  const blocks = map.chunks.flatMap((c) =>
    c.buildings.map((b) => {
      const box = findModel(b.modelId)?.hitBox;
      const x = c.pos.x + b.pos.x;
      const z = c.pos.z + b.pos.z;
      return box
        ? {
            minX: x + Math.min(box.min.x, -box.max.z),
            maxX: x + Math.max(box.max.x, -box.min.z),
            minZ: z + Math.min(box.min.z, -box.max.x),
            maxZ: z + Math.max(box.max.z, -box.min.x),
          }
        : { minX: x - 12, maxX: x + 12, minZ: z - 12, maxZ: z + 12 };
    })
  );
  const spots: Vec3[] = [];
  for (const chunk of map.chunks) {
    const left = chunk.pos.x - chunk.size.x / 2;
    const top = chunk.pos.z - chunk.size.y / 2;
    for (let col = 0; col < chunk.size.x / TILE_SIZE; col++) {
      for (let row = 0; row < chunk.size.y / TILE_SIZE; row++) {
        const x = left + col * TILE_SIZE + TILE_SIZE / 2;
        const z = top + row * TILE_SIZE + TILE_SIZE / 2;
        // (the cell and its neighbours at the arrival's level: not against a wall)
        const around = [
          [0, 0],
          [TILE_SIZE, 0],
          [-TILE_SIZE, 0],
          [0, TILE_SIZE],
          [0, -TILE_SIZE],
        ].every(([dx, dz]) => levelAt(x + dx, z + dz) === level);
        if (
          !around ||
          Math.hypot(x - spawn.x, z - spawn.z) < SPAWN_CLEAR ||
          avoid.some((a) => Math.hypot(x - a.x, z - a.z) < SPOT_CLEAR) ||
          blocks.some(
            (b) =>
              x > b.minX - 12 &&
              x < b.maxX + 12 &&
              z > b.minZ - 12 &&
              z < b.maxZ + 12
          )
        ) {
          continue;
        }
        spots.push({ x, y: 0, z });
      }
    }
  }
  return shuffle(spots);
}

/** A spot near the arrival (the save point), else anywhere free. */
function spotNearArrival(map: SceneMap, avoid: Vec3[]): Vec3 | null {
  const spawn = map.spawn ?? { x: 0, y: 0, z: 0 };
  const spots = freeSpots(map, avoid).sort(
    (a, b) =>
      Math.hypot(a.x - spawn.x, a.z - spawn.z) -
      Math.hypot(b.x - spawn.x, b.z - spawn.z)
  );
  return spots[0] ?? null;
}

let placedCount = 0;

/** An object put by the game (its `pos` is in the world: the chunk is found when it is put on the map). */
function placed(
  modelId: string,
  pos: Vec3,
  passable: boolean,
  dungeon?: DungeonObject
): SceneBuilding {
  return {
    id: `gen-${Date.now().toString(36)}-${placedCount++}`,
    modelId,
    pos: { ...pos },
    passable,
    canHide: false,
    generated: true,
    ...(dungeon ? { dungeon } : {}),
    events: [],
  };
}

/** What a generated chest holds: each loot item by its chance (at least the likeliest one). */
function rollLoot(floor: DbFloor): { id: string; count: number }[] {
  const items = floor.loot
    .filter((l) => Math.random() * 100 < l.chance)
    .map((l) => ({ id: l.item, count: 1 }));
  if (items.length === 0 && floor.loot.length > 0) {
    const best = [...floor.loot].sort((a, b) => b.chance - a.chance)[0];
    items.push({ id: best.item, count: 1 });
  }
  return items;
}

/** The room doors of a « Salle » map: their id, world place and front. */
function roomDoors(map: SceneMap) {
  return map.chunks.flatMap((c) =>
    c.buildings
      .filter((b) => b.modelId === dungeonModelId("room-door"))
      .map((b) => ({
        id: b.id,
        pos: {
          x: c.pos.x + b.pos.x,
          y: c.pos.y + b.pos.y,
          z: c.pos.z + b.pos.z,
        },
        rot: b.rot ?? 0,
      }))
  );
}

/**
 * The dungeons being played (design/main-view.pen, Donjons): entering one (its opening hours), its floors (made by
 * hand, or generated from rooms linked at random by their doors), the enemies walking on them (the fight starts when
 * they touch the team: hit first, an ambush from behind), the chests, traps, switches, locked doors, stairs and save
 * points. Everything it plays goes through event sequences (messages, the fade of a teleport, the fights).
 */
@Service()
export class DungeonService {
  private readonly sequenceService = inject(SequenceService);

  private readonly chipState = signal<DungeonChip | null>(null);
  /** The floor chip (null: not in a dungeon). */
  readonly chip = this.chipState.asReadonly();
  /** A save point asks for the saved games window. */
  readonly saveAsked$ = new Subject<void>();

  private game?: Game;
  /** The map last seen built (another one: its dungeon objects are put on it). */
  private seenMap?: SceneMap;
  private foes: Foe[] = [];
  /** Flat objects the player stands on (a trap, stairs: they act when stepped on, once). */
  private stepped = new Set<SceneBuilding>();
  /** Boxes of what blocks the foes (taken when the map is built). */
  private blocks: THREE.Box3[] = [];
  private step = 0;
  private lastValues?: object;

  constructor() {
    this.sequenceService.dungeon$.subscribe((instruction) =>
      this.play(instruction)
    );
  }

  /** Each step of the input loop on the map (`playing`: no editor, no event, no fight: the foes move). */
  update(game: Game, sprite: THREE.Object3D, playing: boolean): void {
    this.game = game;
    const mapHelper = game.mapHelper;
    if (!mapHelper) {
      return;
    }
    if (mapHelper.sceneMap !== this.seenMap) {
      this.seenMap = mapHelper.sceneMap;
      void this.mapBuilt(mapHelper);
    }
    if (game.editMode) {
      return;
    }
    this.step++;
    // (a switch or an event changed a flag: the doors and switches drawn again)
    const values = currentVariableValues();
    if (values !== this.lastValues) {
      this.lastValues = values;
      this.redrawObjects(mapHelper);
    }
    if (!playing) {
      return;
    }
    this.moveFoes(mapHelper, sprite);
    this.touchFoes(mapHelper, sprite);
    this.stepOn(mapHelper, sprite);
    if (this.step % STEPS_PER_SECOND === 0) {
      this.checkClosing(game);
      this.refreshChip(game);
    }
  }

  // --- What the action key does ---

  /** What is in front of the player that the action key works (a dungeon object, an enemy), if anything. */
  private front(
    mapHelper: MapHelper,
    sprite: THREE.Object3D
  ): { chunk: SceneChunk; building: SceneBuilding } | null {
    const dir = facing(mapHelper.scenePlayer.dir);
    const point = new THREE.Vector3(
      sprite.position.x + dir.x * REACH,
      0,
      sprite.position.z + dir.z * REACH
    );
    let best: { chunk: SceneChunk; building: SceneBuilding } | null = null;
    let bestDist = Infinity;
    for (const chunk of mapHelper.sceneMap.chunks) {
      if (!chunk.visible) {
        continue;
      }
      for (const building of chunk.buildings) {
        const info = dungeonKindOf(building.modelId);
        if (!isFoe(building) && (!info || info.flat)) {
          continue;
        }
        const bounds = mapHelper.buildingBounds(chunk, building);
        if (!bounds) {
          continue;
        }
        bounds.expandByScalar(6);
        point.y = bounds.min.y + 1;
        if (!bounds.containsPoint(point)) {
          continue;
        }
        const center = bounds.getCenter(new THREE.Vector3());
        const dist = Math.hypot(
          center.x - sprite.position.x,
          center.z - sprite.position.z
        );
        if (dist < bestDist) {
          bestDist = dist;
          best = { chunk, building };
        }
      }
    }
    return best;
  }

  /** The prompt of the action key in front of a dungeon object or an enemy. */
  actionAt(mapHelper: MapHelper, sprite: THREE.Object3D): GameAction | null {
    const found = this.front(mapHelper, sprite);
    if (!found) {
      return null;
    }
    const { building } = found;
    if (isFoe(building)) {
      return gameAction("hit", this.foeName(building));
    }
    const info = dungeonKindOf(building.modelId)!;
    switch (info.kind) {
      case "chest":
        return isOpened(mapHelper.sceneMap.id, building)
          ? gameAction("look", info.label)
          : gameAction("open", info.label);
      case "switch":
      case "save":
        return gameAction("use", info.label);
      case "door":
        return gameAction("open", info.label);
      case "room-door":
        return gameAction("enter", info.label);
      default:
        return null;
    }
  }

  /** The action key pressed with nothing else to do: works the dungeon object or hits the enemy in front. */
  act(mapHelper: MapHelper, sprite: THREE.Object3D): boolean {
    const found = this.front(mapHelper, sprite);
    if (!found) {
      return false;
    }
    const { chunk, building } = found;
    const mapId = mapHelper.sceneMap.id;
    if (isFoe(building)) {
      this.fight(building, "advantage");
      return true;
    }
    const info = dungeonKindOf(building.modelId)!;
    const settings = building.dungeon ?? {};
    const db = cachedDatabase();
    switch (info.kind) {
      case "chest": {
        if (isOpened(mapId, building)) {
          this.launch([message("Le coffre est vide.")]);
          break;
        }
        if (settings.key && !currentParty().items[settings.key]) {
          const key = db.items.find((i) => i.id === settings.key)?.name;
          playSound("error");
          this.launch([message(`Fermé à clé. Il faut : ${key ?? "une clé"}.`)]);
          break;
        }
        let items = settings.items ?? [];
        const money = settings.money ?? 0;
        // (a chest left empty on a generated floor: the floor's loot)
        const floor = this.currentFloor();
        if (items.length === 0 && !money && floor && !floor.map) {
          items = rollLoot(floor);
        }
        markOpened(mapId, building);
        items.forEach((i) => giveItem(i.id, i.count));
        if (money) {
          giveMoney(money);
        }
        mapHelper.refreshBuilding(chunk, building);
        playSound("chest");
        const content = contentLabel(items, money);
        this.launch([
          message(
            content ? `Vous trouvez : ${content}.` : "Le coffre est vide."
          ),
        ]);
        break;
      }
      case "switch":
        if (settings.variable) {
          const on = !!currentVariableValues()[settings.variable];
          setVariableValue(settings.variable, !on);
          playSound("bell");
          this.redrawObjects(mapHelper);
        } else {
          this.launch([message("Il ne se passe rien.")]);
        }
        break;
      case "door":
        if (settings.key && currentParty().items[settings.key]) {
          markOpened(mapId, building);
          mapHelper.refreshBuilding(chunk, building);
          playSound("door");
          this.launch([message("La porte s'ouvre.")]);
        } else if (settings.key) {
          const key = db.items.find((i) => i.id === settings.key)?.name;
          playSound("error");
          this.launch([
            message(`Fermée à clé. Il faut : ${key ?? "une clé"}.`),
          ]);
        } else {
          this.launch([
            message("La porte est fermée. Un mécanisme doit l'ouvrir."),
          ]);
        }
        break;
      case "room-door":
        this.throughRoomDoor(building);
        break;
      case "save":
        this.launch([
          {
            type: InstructionType.MESSAGE,
            message: {
              name: info.label,
              text: currentRun()
                ? "Le cristal brille doucement. Que faire ?"
                : "Le cristal brille doucement.",
              choices: currentRun()
                ? [
                    { key: "save", text: "Sauver la partie" },
                    { key: "leave", text: "Sortir du donjon" },
                    { key: "stay", text: "Continuer" },
                  ]
                : [
                    { key: "save", text: "Sauver la partie" },
                    { key: "stay", text: "Continuer" },
                  ],
            },
            subInstructions: [
              { condition: "save", instructions: [dungeonStep("save")] },
              { condition: "leave", instructions: [dungeonStep("leave")] },
            ],
          },
        ]);
        break;
    }
    return true;
  }

  private launch(instructions: SceneEventInstruction[]): void {
    const event: SceneEvent = { conditions: {}, instructions };
    this.sequenceService.launchSequence(event);
  }

  // --- Enemies ---

  private foeName(building: SceneBuilding): string {
    const db = cachedDatabase();
    const group = db.groups.find((g) => `foe:${g.id}` === building.modelId);
    const enemy = db.enemies.find((e) => e.id === group?.members[0]?.enemy);
    return enemy?.name ?? group?.name ?? "Ennemi";
  }

  /** A fight against a foe of the map (the team hit first, was caught from behind, or face to face). */
  private fight(
    building: SceneBuilding,
    opening: "advantage" | "ambush" | "even"
  ): void {
    const foe = this.foes.find((f) => f.building === building);
    if (foe) {
      foe.mesh.visible = false;
    }
    playSound("hit");
    this.launch([
      {
        type: InstructionType.FIGHT,
        fight: { group: building.modelId.slice("foe:".length), opening },
        subInstructions: [
          {
            condition: "win",
            instructions: [dungeonStep("beaten", building.id)],
          },
          { condition: "lose", instructions: [dungeonStep("lost")] },
          {
            condition: "flee",
            instructions: [dungeonStep("fled", building.id)],
          },
        ],
      },
    ]);
  }

  /** The foes walk about, see the team and run after it. */
  private moveFoes(mapHelper: MapHelper, sprite: THREE.Object3D): void {
    if (this.step % FOE_EVERY !== 0) {
      return;
    }
    const player = sprite.position;
    for (const foe of this.foes) {
      const mesh = foe.mesh;
      const mark = mesh.getObjectByName("spotted");
      if (foe.stunnedUntil > this.step) {
        // (blinks while it can't fight)
        const picture = mesh.getObjectByName("picture");
        if (picture) {
          picture.visible = Math.floor(this.step / 12) % 2 === 0;
        }
        continue;
      }
      const picture = mesh.getObjectByName("picture");
      if (picture) {
        picture.visible = true;
      }
      const dist = Math.hypot(
        player.x - mesh.position.x,
        player.z - mesh.position.z
      );
      const sameLevel =
        mapHelper.levelAtWorld(player.x, player.z) === foe.level;
      if (!foe.chasing && dist < FOE_SIGHT && sameLevel) {
        foe.chasing = true;
        foe.markUntil = this.step + STEPS_PER_SECOND;
      } else if (foe.chasing && (dist > FOE_FORGET || !sameLevel)) {
        foe.chasing = false;
        foe.target = null;
      }
      if (mark) {
        mark.visible = this.step < foe.markUntil;
      }
      let speed = FOE_CHASE;
      if (foe.chasing) {
        foe.target = player.clone();
      } else {
        speed = FOE_WALK;
        if (foe.wait > 0) {
          foe.wait -= FOE_EVERY;
          continue;
        }
        if (
          !foe.target ||
          Math.hypot(
            foe.target.x - mesh.position.x,
            foe.target.z - mesh.position.z
          ) < 2
        ) {
          const angle = Math.random() * Math.PI * 2;
          const far = Math.random() * FOE_ROAM;
          foe.target = new THREE.Vector3(
            foe.home.x + Math.cos(angle) * far,
            0,
            foe.home.z + Math.sin(angle) * far
          );
          foe.wait = randInt(STEPS_PER_SECOND, STEPS_PER_SECOND * 3);
          continue;
        }
      }
      const dx = foe.target.x - mesh.position.x;
      const dz = foe.target.z - mesh.position.z;
      const len = Math.hypot(dx, dz);
      if (len < 0.5) {
        continue;
      }
      const move = Math.min(len, speed * FOE_EVERY);
      const nx = mesh.position.x + (dx / len) * move;
      const nz = mesh.position.z + (dz / len) * move;
      if (this.foeCanStand(mapHelper, foe, nx, nz)) {
        mesh.position.x = nx;
        mesh.position.z = nz;
      } else if (this.foeCanStand(mapHelper, foe, nx, mesh.position.z)) {
        mesh.position.x = nx;
      } else if (this.foeCanStand(mapHelper, foe, mesh.position.x, nz)) {
        mesh.position.z = nz;
      } else if (!foe.chasing) {
        foe.target = null;
      }
    }
  }

  private foeCanStand(
    mapHelper: MapHelper,
    foe: Foe,
    x: number,
    z: number
  ): boolean {
    if (
      !mapHelper.chunkAt(x, z) ||
      mapHelper.levelAtWorld(x, z) !== foe.level ||
      mapHelper.isStairsAt(x, z)
    ) {
      return false;
    }
    const half = 6;
    const box = new THREE.Box3(
      new THREE.Vector3(x - half, foe.mesh.position.y + 1, z - half),
      new THREE.Vector3(x + half, foe.mesh.position.y + 8, z + half)
    );
    return !this.blocks.some((b) => b.intersectsBox(box));
  }

  /** A foe touching the team starts the fight (from behind: an ambush). */
  private touchFoes(mapHelper: MapHelper, sprite: THREE.Object3D): void {
    const player = sprite.position;
    for (const foe of this.foes) {
      if (foe.stunnedUntil > this.step || !foe.mesh.visible) {
        continue;
      }
      const dx = foe.mesh.position.x - player.x;
      const dz = foe.mesh.position.z - player.z;
      const dist = Math.hypot(dx, dz);
      if (dist > FOE_TOUCH) {
        continue;
      }
      const dir = facing(mapHelper.scenePlayer.dir);
      const behind = (dir.x * dx + dir.z * dz) / Math.max(dist, 0.01) < -0.3;
      this.fight(foe.building, behind ? "ambush" : "even");
      return;
    }
  }

  // --- Traps and stairs ---

  private stepOn(mapHelper: MapHelper, sprite: THREE.Object3D): void {
    const p = sprite.position;
    const now = new Set<SceneBuilding>();
    const mapId = mapHelper.sceneMap.id;
    for (const chunk of mapHelper.sceneMap.chunks) {
      if (!chunk.visible) {
        continue;
      }
      for (const building of chunk.buildings) {
        const info = dungeonKindOf(building.modelId);
        if (!info?.flat) {
          continue;
        }
        const x = chunk.pos.x + building.pos.x;
        const z = chunk.pos.z + building.pos.z;
        if (
          Math.abs(p.x - x) > info.size.x / 2 - 3 ||
          Math.abs(p.z - z) > info.size.y / 2 - 3
        ) {
          continue;
        }
        now.add(building);
        if (this.stepped.has(building)) {
          continue;
        }
        if (info.kind === "stairs") {
          if (currentRun()) {
            this.launch([dungeonStep("next")]);
          }
        } else if (info.kind === "trap") {
          markTrapFound(objectKey(mapId, building));
          mapHelper.refreshBuilding(chunk, building);
          this.springTrap(building);
        }
      }
    }
    this.stepped = now;
  }

  private springTrap(building: SceneBuilding): void {
    const trap = building.dungeon?.trap ?? { kind: "hurt", percent: 10 };
    playSound("hit");
    if (trap.kind === "fight") {
      this.launch([
        message("Un piège ! Des ennemis surgissent."),
        {
          type: InstructionType.FIGHT,
          fight: { group: trap.group, opening: "even" },
          subInstructions: [
            { condition: "lose", instructions: [dungeonStep("lost")] },
          ],
        },
      ]);
    } else {
      hurtTeam(trap.percent);
      this.launch([
        message(`Un piège ! L'équipe perd ${trap.percent} % de ses PV.`),
      ]);
    }
  }

  // --- Entering, floors, rooms, leaving ---

  private dungeonOf(run: DungeonRun | undefined): DbDungeon | undefined {
    return run && cachedDatabase().dungeons.find((d) => d.id === run.dungeon);
  }

  private currentFloor(): DbFloor | undefined {
    const run = currentRun();
    const dungeon = this.dungeonOf(run);
    return dungeon && run ? floorAt(dungeon, run.floor)?.floor : undefined;
  }

  /** A dungeon action of an event (or a passage to `dungeon:<id>`): what follows is put after it. */
  private play(instruction: SceneEventInstruction): void {
    const target = instruction.teleport?.map;
    const request = target?.startsWith(DUNGEON_TARGET)
      ? { action: "enter" as const, id: target.slice(DUNGEON_TARGET.length) }
      : instruction.dungeon;
    const next = request ? this.answer(request) : [];
    instruction.subInstructions = [{ condition: "", instructions: next }];
    this.sequenceService.nextSequence();
  }

  private answer(
    request: NonNullable<SceneEventInstruction["dungeon"]>
  ): SceneEventInstruction[] {
    switch (request.action) {
      case "enter":
        return this.enter(request.id ?? "");
      case "next":
        return this.nextFloor();
      case "leave":
        return this.leave();
      case "save":
        this.saveAsked$.next();
        return [];
      case "beaten":
        this.foeBeaten(request.id ?? "");
        return [];
      case "fled": {
        const foe = this.foes.find((f) => f.building.id === request.id);
        if (foe) {
          foe.mesh.visible = true;
          foe.chasing = false;
          foe.target = null;
          foe.stunnedUntil = this.step + STEPS_PER_SECOND * 3;
        }
        return [];
      }
      case "lost":
        healTeam();
        return [
          message(
            "L'équipe est vaincue… Elle se réveille à l'entrée du donjon, soignée."
          ),
          ...this.leave(),
        ];
    }
  }

  private enter(id: string): SceneEventInstruction[] {
    const game = this.game;
    const dungeon = cachedDatabase().dungeons.find((d) => d.id === id);
    const sprite = game?.mapHelper?.scenePlayer.mesh;
    if (!game || !sprite || !dungeon || floorCount(dungeon) === 0) {
      return [message("Ce donjon n'a pas encore d'étage.")];
    }
    if (!dungeonOpen(dungeon, game.weather.hourOfDay, game.day)) {
      playSound("error");
      return [
        message(
          `L'entrée est scellée. Le donjon s'ouvre ${openingText(dungeon)}.`,
          dungeon.name
        ),
      ];
    }
    const run: DungeonRun = {
      dungeon: dungeon.id,
      floor: 0,
      entrance: {
        map: game.mapHelper!.sceneMap.id,
        pos: {
          x: sprite.position.x,
          y: sprite.position.y,
          z: sprite.position.z,
        },
      },
      ...(dungeon.weather ? { weatherBefore: game.weather.type } : {}),
      done: [],
    };
    const arrival = this.prepareFloor(run, dungeon);
    if (!arrival) {
      return [message("Ce donjon n'a pas encore d'étage.")];
    }
    this.saveRun(run);
    return [
      ...(dungeon.weather
        ? [
            {
              type: InstructionType.WEATHER,
              weather: { type: dungeon.weather },
            },
          ]
        : []),
      {
        type: InstructionType.TELEPORT,
        teleport: { ...arrival, rebuild: true },
      },
    ];
  }

  private nextFloor(): SceneEventInstruction[] {
    const run = currentRun();
    const dungeon = this.dungeonOf(run);
    if (!run || !dungeon) {
      return [];
    }
    if (run.floor + 1 >= floorCount(dungeon)) {
      return [
        message(`Vous avez atteint le fond de ${dungeon.name}.`),
        ...this.leave(),
      ];
    }
    const next: DungeonRun = { ...run, floor: run.floor + 1, done: [] };
    const arrival = this.prepareFloor(next, dungeon);
    if (!arrival) {
      return [message("L'étage suivant n'existe pas."), ...this.leave()];
    }
    this.saveRun(next);
    playSound("step");
    return [
      {
        type: InstructionType.TELEPORT,
        teleport: { ...arrival, rebuild: true },
      },
    ];
  }

  private leave(): SceneEventInstruction[] {
    const run = currentRun();
    if (!run) {
      return [];
    }
    this.saveRun(undefined);
    return [
      {
        type: InstructionType.TELEPORT,
        teleport: {
          map: run.entrance.map,
          pos: run.entrance.pos,
          rebuild: true,
        },
      },
      ...(run.weatherBefore
        ? [
            {
              type: InstructionType.WEATHER,
              weather: { type: run.weatherBefore },
            },
          ]
        : []),
    ];
  }

  private saveRun(run: DungeonRun | undefined): void {
    const state = structuredClone(currentDungeonState());
    if (run) {
      state.run = run;
    } else {
      delete state.run;
    }
    writeDungeonState(state);
  }

  /** A floor made ready: its enemies, chests, stairs and save point; a generated one's rooms. Returns the arrival. */
  private prepareFloor(
    run: DungeonRun,
    dungeon: DbDungeon
  ): { map: string; pos?: Vec3 } | null {
    const line = floorAt(dungeon, run.floor);
    if (!line) {
      return null;
    }
    const floor = line.floor;
    delete run.rooms;
    delete run.room;
    delete run.placed;
    if (floor.map) {
      const map = loadMap(floor.map);
      if (!map) {
        return null;
      }
      run.placed = this.populate(
        map,
        floor,
        randInt(floor.enemiesMin, floor.enemiesMax),
        0,
        false,
        floor.save
      );
      return { map: map.id };
    }
    const rooms = this.linkRooms(floor);
    if (rooms.length === 0) {
      return null;
    }
    // Enemies and chests shared out between the rooms (not in the first one when there are others)
    const enemies = randInt(floor.enemiesMin, floor.enemiesMax);
    const chests = randInt(floor.chestsMin, floor.chestsMax);
    const share = (count: number) => {
      const counts = rooms.map(() => 0);
      for (let i = 0; i < count; i++) {
        counts[rooms.length > 1 ? randInt(1, rooms.length - 1) : 0]++;
      }
      return counts;
    };
    const foesIn = share(enemies);
    const chestsIn = share(chests);
    rooms.forEach((room, i) => {
      const map = loadMap(room.map);
      if (map) {
        room.placed = this.populate(
          map,
          floor,
          foesIn[i],
          chestsIn[i],
          i === rooms.length - 1,
          floor.save && i === 0
        );
      }
    });
    run.rooms = rooms;
    run.room = 0;
    return { map: rooms[0].map };
  }

  /** What the game puts on a map: enemies, chests (with the floor's loot), the stairs down, the save point. */
  private populate(
    map: SceneMap,
    floor: DbFloor,
    foes: number,
    chests: number,
    stairs: boolean,
    save: boolean
  ): SceneBuilding[] {
    const result: SceneBuilding[] = [];
    const taken: Vec3[] = [];
    if (save) {
      const spot = spotNearArrival(map, taken);
      if (spot) {
        taken.push(spot);
        result.push(placed(dungeonModelId("save"), spot, false));
      }
    }
    const spots = freeSpots(map, taken);
    const next = (): Vec3 | null => {
      const spot = spots.find((s) =>
        taken.every((t) => Math.hypot(s.x - t.x, s.z - t.z) >= SPOT_CLEAR)
      );
      if (spot) {
        taken.push(spot);
      }
      return spot ?? null;
    };
    if (stairs) {
      const spot = next();
      if (spot) {
        result.push(placed(dungeonModelId("stairs"), spot, true));
      }
    }
    for (let i = 0; i < chests; i++) {
      const spot = next();
      if (spot) {
        result.push(
          placed(dungeonModelId("chest"), spot, false, {
            items: rollLoot(floor),
          })
        );
      }
    }
    if (floor.groups.length > 0) {
      for (let i = 0; i < foes; i++) {
        const spot = next();
        if (spot) {
          result.push(placed(foeModelId(pick(floor.groups)), spot, false));
        }
      }
    }
    return result;
  }

  /**
   * A generated floor's rooms: « Salle » maps picked at random, each new one linked by a free door to a free door of
   * a room already there (a tree: every room can be reached).
   */
  private linkRooms(floor: DbFloor): RunRoom[] {
    const pool = floor.rooms
      .map((id) => loadMap(id))
      .filter((m): m is SceneMap => !!m && roomDoors(m).length > 0);
    if (pool.length === 0) {
      // (rooms without doors: one room only)
      const lone = floor.rooms.map((id) => loadMap(id)).find((m) => !!m);
      return lone ? [{ map: lone.id, doors: {}, placed: [] }] : [];
    }
    const count = randInt(floor.roomsMin, floor.roomsMax);
    const rooms: (RunRoom & { free: string[] })[] = [];
    const first = pick(pool);
    rooms.push({
      map: first.id,
      doors: {},
      placed: [],
      free: roomDoors(first).map((d) => d.id),
    });
    for (let i = 1; i < count; i++) {
      const open = rooms
        .map((r, index) => ({ r, index }))
        .filter(({ r }) => r.free.length > 0);
      if (open.length === 0) {
        break;
      }
      const from = pick(open);
      const map = pick(pool);
      const doors = roomDoors(map).map((d) => d.id);
      const fromDoor = from.r.free.splice(
        Math.floor(Math.random() * from.r.free.length),
        1
      )[0];
      const toDoor = doors.splice(
        Math.floor(Math.random() * doors.length),
        1
      )[0];
      const index = rooms.length;
      from.r.doors[fromDoor] = { room: index, door: toDoor };
      rooms.push({
        map: map.id,
        doors: { [toDoor]: { room: from.index, door: fromDoor } },
        placed: [],
        free: doors,
      });
    }
    return rooms.map(({ map, doors, placed }) => ({ map, doors, placed }));
  }

  /** Through a room door: to the room it leads to, in front of its door. */
  private throughRoomDoor(building: SceneBuilding): void {
    const run = currentRun();
    const link =
      run?.rooms && run.room !== undefined
        ? run.rooms[run.room]?.doors[building.id]
        : undefined;
    const room = link && run?.rooms?.[link.room];
    const map = room && loadMap(room.map);
    const door = map && roomDoors(map).find((d) => d.id === link.door);
    if (!run || !link || !room || !door) {
      this.launch([message("Le passage est bouché.")]);
      return;
    }
    this.saveRun({ ...run, room: link.room });
    const front = doorFront(door.rot);
    playSound("door");
    this.launch([
      {
        type: InstructionType.TELEPORT,
        teleport: {
          map: room.map,
          pos: {
            x: door.pos.x + front.x * DOOR_FRONT,
            y: door.pos.y,
            z: door.pos.z + front.z * DOOR_FRONT,
          },
          rebuild: true,
        },
      },
    ]);
  }

  private foeBeaten(id: string): void {
    const run = currentRun();
    const mapHelper = this.game?.mapHelper;
    if (run) {
      this.saveRun({ ...run, done: [...run.done, `foe/${id}`] });
    }
    const foe = this.foes.find((f) => f.building.id === id);
    if (foe && mapHelper) {
      const chunk = mapHelper.sceneMap.chunks.find((c) =>
        c.buildings.includes(foe.building)
      );
      if (chunk) {
        mapHelper.removeBuilding(chunk, foe.building);
      }
      this.foes = this.foes.filter((f) => f !== foe);
    }
    if (this.game) {
      this.refreshChip(this.game);
    }
  }

  // --- The map being played ---

  /** The map the team should be on now (a hand-made floor's, the room's), if in a dungeon. */
  private runMap(run: DungeonRun, dungeon: DbDungeon): string | undefined {
    if (run.rooms && run.room !== undefined) {
      return run.rooms[run.room]?.map;
    }
    return floorAt(dungeon, run.floor)?.floor.map;
  }

  /** Another map was built: the dungeon's objects put on it (or the dungeon left, if the team is elsewhere). */
  private async mapBuilt(mapHelper: MapHelper): Promise<void> {
    const map = mapHelper.sceneMap;
    this.foes = [];
    this.stepped = new Set();
    forgetFoundTraps();
    const run = currentRun();
    const dungeon = this.dungeonOf(run);
    if (!run || !dungeon || this.runMap(run, dungeon) !== map.id) {
      if (run) {
        // (left some other way: a teleport of an event, the map manager)
        this.saveRun(undefined);
      }
      this.chipState.set(null);
      this.blocks = [];
      return;
    }
    const list =
      run.rooms && run.room !== undefined
        ? (run.rooms[run.room]?.placed ?? [])
        : (run.placed ?? []);
    // (the foes beaten this visit stay away; the chests opened are drawn open)
    const shown = list.filter((b) => !run.done.includes(`foe/${b.id}`));
    // (the foes' pictures' sizes first: their mesh needs them)
    await Promise.all(
      shown
        .filter((b) => isFoe(b))
        .map((b) => foePicture(b.modelId))
        .filter((link): link is string => !!link)
        .map((link) => loadPictureSize(link))
    );
    if (mapHelper.sceneMap !== map) {
      return;
    }
    for (const data of shown) {
      const chunk = mapHelper.chunkAt(data.pos.x, data.pos.z);
      if (!chunk) {
        continue;
      }
      const building: SceneBuilding = {
        ...structuredClone(data),
        pos: {
          x: data.pos.x - chunk.pos.x,
          y: data.pos.y - chunk.pos.y,
          z: data.pos.z - chunk.pos.z,
        },
      };
      mapHelper.addBuilding(chunk, building);
      if (isFoe(building)) {
        const mesh = mapHelper.meshes[chunk.id + "-" + building.id];
        if (mesh) {
          this.foes.push({
            building,
            mesh,
            home: mesh.position.clone(),
            target: null,
            wait: randInt(0, STEPS_PER_SECOND * 2),
            chasing: false,
            markUntil: 0,
            stunnedUntil: 0,
            level: mapHelper.levelAtWorld(data.pos.x, data.pos.z),
          });
        }
      }
    }
    this.takeBlocks(mapHelper);
    if (this.game) {
      this.refreshChip(this.game);
    }
  }

  /** What blocks the foes: the objects that block the way (not the foes, not the player). */
  private takeBlocks(mapHelper: MapHelper): void {
    this.blocks = mapHelper.sceneMap.chunks.flatMap((chunk) =>
      chunk.buildings
        .filter((b) => !b.passable && !isFoe(b))
        .map((b) => mapHelper.buildingBounds(chunk, b))
        .filter((b): b is THREE.Box3 => !!b)
    );
  }

  /** The doors and switches drawn again (a flag changed), and what blocks the foes taken again. */
  private redrawObjects(mapHelper: MapHelper): void {
    let changed = false;
    for (const chunk of mapHelper.sceneMap.chunks) {
      for (const building of chunk.buildings) {
        const kind = dungeonKindOf(building.modelId)?.kind;
        if (kind === "door" || kind === "switch") {
          mapHelper.refreshBuilding(chunk, building);
          changed = true;
        }
      }
    }
    if (changed) {
      this.takeBlocks(mapHelper);
    }
  }

  /** Closing time: the team is put out. */
  private checkClosing(game: Game): void {
    const run = currentRun();
    const dungeon = this.dungeonOf(run);
    if (
      !run ||
      !dungeon ||
      this.sequenceService.isRunning ||
      game.cutscene ||
      dungeonOpen(dungeon, game.weather.hourOfDay, game.day)
    ) {
      return;
    }
    this.launch([
      message(`${dungeon.name} se referme. L'équipe est ramenée dehors.`),
      dungeonStep("leave"),
    ]);
  }

  private refreshChip(game: Game): void {
    const run = currentRun();
    const dungeon = this.dungeonOf(run);
    if (!run || !dungeon || !this.seenMap) {
      this.chipState.set(null);
      return;
    }
    const chip: DungeonChip = {
      name: dungeon.name,
      floor: `Étage ${run.floor + 1}`,
      closes: closingText(dungeon, game.weather.hourOfDay),
      foes: this.foes.length,
      ...(dungeon.music ? { music: dungeon.music } : {}),
    };
    const before = this.chipState();
    if (JSON.stringify(before) !== JSON.stringify(chip)) {
      this.chipState.set(chip);
    }
  }
}
