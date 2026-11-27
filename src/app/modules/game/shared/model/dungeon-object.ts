import * as THREE from "three";
import { SceneModel } from "./SceneModel";
import { SceneBuilding } from "./SceneBuilding";
import { CAMERA_LOOK } from "./Game";
import { facingSprite } from "./pixel-scale";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import {
  DbEnemy,
  MAP_WALK_DIRS,
  MapWalk,
} from "../../../database-editor/shared/database";

/**
 * The objects of the editor's Donjon tab (design/main-view.pen, Donjons · Éditeur): chests, traps, switches, locked
 * doors, stairs, room doors and save points. An object of the map whose model id is `dg:<kind>`, drawn from a
 * pixel-art picture (src/assets/dungeon/), upright and facing the camera like the characters, or lying on the ground
 * (traps, stairs). An invisible box gives it a body. What it does is played by the dungeon (dungeon.service.ts).
 */
export const DUNGEON_PREFIX = "dg:";

export type DungeonKind =
  | "chest"
  | "trap"
  | "switch"
  | "door"
  | "stairs"
  | "room-door"
  | "save"
  | "foe";

/**
 * How an enemy put by hand moves before it sees the team: standing still (it never runs after the team: a boss),
 * walking about around its place, or going back and forth on a line (east-west, north-south).
 */
export type FoeMove = "still" | "roam" | "patrol-x" | "patrol-z";
export const FOE_MOVES: { id: FoeMove; label: string }[] = [
  { id: "roam", label: "Ronde autour de sa place" },
  { id: "patrol-x", label: "Aller-retour gauche-droite" },
  { id: "patrol-z", label: "Aller-retour haut-bas" },
  { id: "still", label: "Immobile (ne poursuit pas)" },
];
/** How far an enemy goes from its place (cells), when its object doesn't say. */
export const FOE_DISTANCE = 3;

/** A trap: hurts the team (a part of their PV) or starts a fight. */
export type DungeonTrap =
  { kind: "hurt"; percent: number } | { kind: "fight"; group: string };

/** A dungeon object's settings (the selected object's sheet in the editor). */
export interface DungeonObject {
  /** Chest: what it holds (on a generated floor, drawn from the floor's loot when empty). */
  items?: { id: string; count: number }[];
  money?: number;
  /** Chest, locked door: the key item it needs (kept in the bag). */
  key?: string;
  /** Switch: the story flag it turns on and off. Locked door: open while this flag is true. */
  variable?: string;
  /** Trap: what it does; hidden until stepped on. */
  trap?: DungeonTrap;
  hidden?: boolean;
  /** Room door: where it leads in a dungeon made by hand (a map and one of its room doors). */
  to?: { map: string; door: string };
  /** Enemy: its group, how it moves before it sees the team, how far from its place (cells). */
  group?: string;
  move?: FoeMove;
  distance?: number;
}

export interface DungeonKindInfo {
  kind: DungeonKind;
  label: string;
  /** Pictures (the second one: opened chest, switch turned on). */
  picture: string;
  pictureOn?: string;
  /** Size of the picture in map units (one pixel each). */
  size: { x: number; y: number };
  /** Lying on the ground (walked on), else upright facing the camera. */
  flat: boolean;
  /** The body (blocks the way, the player acts in front of it); missing: nothing blocks. */
  body?: { x: number; y: number; z: number };
  /** Its picture in the palette. */
  thumb: string;
  /** Only on « Salle » maps (generated floors). */
  roomOnly?: boolean;
}

const PICTURES = "assets/dungeon/";

/**
 * The side a room door looks at, away from its wall (`rot`: 0 south, then a quarter turn each: west, north, east).
 */
export function doorFront(rot = 0): { x: number; z: number } {
  return [
    { x: 0, z: 1 },
    { x: -1, z: 0 },
    { x: 0, z: -1 },
    { x: 1, z: 0 },
  ][rot % 4];
}

/**
 * The leaning rock wall behind a room door: how far its foot is from the door, how far it leans back and how high
 * it rises (world units). The door is then an opening drawn on the slope itself.
 */
export interface DoorWall {
  foot: number;
  lean: number;
  rise: number;
}

/** A room door in a leaning wall: the dark mouth lying on the slope, and its shade on the ground in front. */
const WALL_DOOR_PICTURE = PICTURES + "room-door-cave.png";
const WALL_DOOR_SHADE = PICTURES + "room-door-shade.png";
const WALL_DOOR = { width: 32, shade: 12 };

/** A room door on a side wall (turned a quarter): the dark ground of its opening, one cell. */
const SIDE_DOOR_PICTURE = PICTURES + "room-door-side.png";
const SIDE_DOOR = { x: 16, y: 16 };

export const DUNGEON_KINDS: DungeonKindInfo[] = [
  {
    kind: "chest",
    label: "Coffre",
    picture: PICTURES + "chest.png",
    pictureOn: PICTURES + "chest-open.png",
    size: { x: 16, y: 16 },
    flat: false,
    body: { x: 14, y: 10, z: 10 },
    thumb: PICTURES + "chest.png",
  },
  {
    kind: "trap",
    label: "Piège",
    picture: PICTURES + "trap.png",
    size: { x: 16, y: 16 },
    flat: true,
    thumb: PICTURES + "trap.png",
  },
  {
    kind: "switch",
    label: "Interrupteur",
    picture: PICTURES + "switch.png",
    pictureOn: PICTURES + "switch-on.png",
    size: { x: 16, y: 16 },
    flat: false,
    body: { x: 10, y: 10, z: 8 },
    thumb: PICTURES + "switch.png",
  },
  {
    kind: "door",
    label: "Porte fermée",
    picture: PICTURES + "door.png",
    size: { x: 32, y: 32 },
    flat: false,
    body: { x: 32, y: 24, z: 8 },
    thumb: PICTURES + "door.png",
  },
  {
    kind: "stairs",
    label: "Escalier",
    picture: PICTURES + "stairs.png",
    size: { x: 32, y: 32 },
    flat: true,
    thumb: PICTURES + "stairs.png",
  },
  {
    kind: "room-door",
    label: "Porte de salle",
    picture: PICTURES + "room-door.png",
    size: { x: 32, y: 32 },
    flat: false,
    body: { x: 28, y: 24, z: 8 },
    thumb: PICTURES + "room-door.png",
  },
  {
    kind: "save",
    label: "Cristal de sauvegarde",
    picture: PICTURES + "save.png",
    size: { x: 16, y: 24 },
    flat: false,
    body: { x: 12, y: 16, z: 8 },
    thumb: PICTURES + "save.png",
  },
  {
    kind: "foe",
    label: "Ennemi",
    picture: PICTURES + "foe.png",
    size: { x: 16, y: 16 },
    flat: false,
    body: { x: 14, y: 14, z: 10 },
    thumb: PICTURES + "foe.png",
  },
];

export function dungeonModelId(kind: DungeonKind): string {
  return DUNGEON_PREFIX + kind;
}

/** Is it a dungeon object (an object, or a model)? */
export function isDungeonObject(
  item: Pick<SceneBuilding, "modelId"> | Pick<SceneModel, "id">
): boolean {
  return ("modelId" in item ? item.modelId : item.id).startsWith(
    DUNGEON_PREFIX
  );
}

export function dungeonKindOf(modelId: string): DungeonKindInfo | undefined {
  return modelId.startsWith(DUNGEON_PREFIX)
    ? DUNGEON_KINDS.find((k) => k.kind === modelId.slice(DUNGEON_PREFIX.length))
    : undefined;
}

const models = new Map<string, SceneModel>();

/** A model with no part: what a dungeon object points to (its mesh is made by makeDungeonMesh). */
export function dungeonModel(modelId: string): SceneModel | undefined {
  const info = dungeonKindOf(modelId);
  if (!info) {
    return undefined;
  }
  let model = models.get(modelId);
  if (!model) {
    const body = info.body ?? { x: info.size.x, y: 1, z: info.size.y };
    model = {
      id: modelId,
      tex: { link: info.picture, size: { x: info.size.x, y: info.size.y } },
      boxes: [],
      planes: [],
      hitBox: {
        min: { x: -body.x / 2, y: 0, z: -body.z / 2 },
        max: { x: body.x / 2, y: body.y, z: body.z / 2 },
      },
    };
    models.set(modelId, model);
  }
  return model;
}

const textures = new Map<string, THREE.Texture>();

function texture(link: string): THREE.Texture {
  let tex = textures.get(link);
  if (!tex) {
    tex = new THREE.TextureLoader().load(link);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    textures.set(link, tex);
  }
  return tex;
}

/**
 * A picture lying on the ground (a little above it: no flicker with the ground). Each mesh has its own material (the
 * fading of objects near the camera changes its opacity); the texture is shared.
 */
function flatPicture(link: string, size: { x: number; y: number }) {
  // (drawn with the ground, before the characters: they stand over it)
  const material = new THREE.MeshBasicMaterial({
    map: texture(link),
    alphaTest: 0.5,
  });
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(size.x, size.y).rotateX(-Math.PI / 2),
    material
  );
  plane.position.y = 0.3;
  return plane;
}

/**
 * A picture standing up and facing the camera from its feet, stretched like the player's (its own material).
 * @param map its own texture (a sheet showing one cell at a time), else the shared one of the link
 */
export function uprightPicture(
  link: string,
  size: { x: number; y: number },
  map: THREE.Texture = texture(link)
): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
  });
  facingSprite(material, size.y);
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(size.x, size.y),
    material
  );
  const stretch = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));
  plane.scale.y = stretch;
  plane.position.y = (size.y / 2) * stretch;
  return plane;
}

/** A picture on 4 points (bottom left, bottom right, top right, top left), blended over what is behind. */
function pictureOn(link: string, points: number[][]): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points.flat(), 3)
  );
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2)
  );
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  return new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      map: texture(link),
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })
  );
}

/**
 * A room door in a leaning wall, the wall to the north: the mouth on the slope (a little over it: no flicker with
 * the rock) and its shade on the ground.
 */
function wallOpening(wall: DoorWall): THREE.Group {
  const half = WALL_DOOR.width / 2;
  const length = Math.hypot(wall.lean, wall.rise);
  const up = (0.4 * wall.lean) / length;
  const out = (0.4 * wall.rise) / length;
  const group = new THREE.Group();
  group.add(
    pictureOn(WALL_DOOR_PICTURE, [
      [-half, up, out - wall.foot],
      [half, up, out - wall.foot],
      [half, wall.rise + up, out - wall.foot - wall.lean],
      [-half, wall.rise + up, out - wall.foot - wall.lean],
    ]),
    pictureOn(WALL_DOOR_SHADE, [
      [-half, 0.3, WALL_DOOR.shade - wall.foot],
      [half, 0.3, WALL_DOOR.shade - wall.foot],
      [half, 0.3, -wall.foot],
      [-half, 0.3, -wall.foot],
    ])
  );
  return group;
}

// (never drawn: the fading of objects near the camera sets mesh.visible, not the material's)
const bodyMaterial = new THREE.MeshBasicMaterial({ visible: false });

/**
 * A dungeon object's mesh: its picture (`on`: the chest opened, the switch turned on; `hidden`: a trap not found
 * yet, nothing drawn but its place) with its invisible body.
 * @param wall a room door: the leaning wall behind it, if any (the door is drawn on it)
 * @param settings the object's settings (an enemy: its group gives its picture)
 */
export function makeDungeonMesh(
  modelId: string,
  state: { on?: boolean; hidden?: boolean } = {},
  rot = 0,
  wall?: DoorWall,
  settings?: DungeonObject
): THREE.Group {
  const group = new THREE.Group();
  const info = dungeonKindOf(modelId);
  if (!info) {
    return group;
  }
  if (info.kind === "foe" && settings?.group) {
    // An enemy put by hand, in the editor: its group's first enemy, as the game will draw it
    const foe = foeModelId(settings.group);
    if (foeWalk(foe) || foePicture(foe)) {
      return makeFoeMesh(foePicture(foe), foeWalk(foe));
    }
  }
  if (info.kind === "room-door" && wall) {
    // A room door in a leaning wall: an opening in the rock, turned towards the room, with the same body
    const opening = wallOpening(wall);
    opening.rotation.y = (-rot * Math.PI) / 2;
    const body = info.body!;
    const side = rot % 2 === 1;
    group.add(
      opening,
      new THREE.Mesh(
        new THREE.BoxGeometry(
          side ? body.z : body.x,
          body.y,
          side ? body.x : body.z
        ).translate(0, body.y / 2, 0),
        bodyMaterial
      )
    );
    return group;
  }
  if (info.kind === "room-door" && rot % 2 === 1) {
    // A room door on a side wall: no arch seen from the front, but a dark opening on the ground of the cell cut
    // into the rock (the walls around it frame it), with its body filling the cell
    group.add(flatPicture(SIDE_DOOR_PICTURE, SIDE_DOOR));
    group.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(SIDE_DOOR.x, 16, SIDE_DOOR.y).translate(0, 8, 0),
        bodyMaterial
      )
    );
    return group;
  }
  const link = state.on && info.pictureOn ? info.pictureOn : info.picture;
  if (info.flat) {
    // (a hidden trap: nothing drawn, the fading of objects would show it again)
    if (!state.hidden) {
      group.add(flatPicture(link, info.size));
    }
    // (a flat object's box: its place on the ground, 1 unit high)
    const place = new THREE.Mesh(
      new THREE.BoxGeometry(info.size.x, 1, info.size.y).translate(0, 0.5, 0),
      bodyMaterial
    );
    group.add(place);
  } else {
    group.add(uprightPicture(link, info.size));
    const body = info.body!;
    group.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(body.x, body.y, body.z).translate(
          0,
          body.y / 2,
          0
        ),
        bodyMaterial
      )
    );
  }
  return group;
}

/**
 * A dungeon's enemy walking on the map (put by the game, never saved): model id `foe:<group id>`, drawn from the
 * picture of its group's first enemy (half size when it is big: the fights draw them larger), with a body.
 */
export const FOE_PREFIX = "foe:";

export function foeModelId(groupId: string): string {
  return FOE_PREFIX + groupId;
}

export function isFoe(item: Pick<SceneBuilding, "modelId">): boolean {
  return item.modelId.startsWith(FOE_PREFIX);
}

const FOE_BODY = { x: 14, y: 14, z: 10 };

/** The foes' picture sizes (read when the picture is loaded, see loadPictureSize). */
const pictureSizes = new Map<string, { x: number; y: number }>();

/** A picture's size, read once (the foes' mesh needs it before drawing). */
export function loadPictureSize(
  link: string
): Promise<{ x: number; y: number }> {
  const known = pictureSizes.get(link);
  if (known) {
    return Promise.resolve(known);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      const size = { x: img.naturalWidth, y: img.naturalHeight };
      pictureSizes.set(link, size);
      resolve(size);
    });
    img.addEventListener("error", () => resolve({ x: 16, y: 16 }));
    img.src = link;
  });
}

export function foeModel(modelId: string): SceneModel {
  let model = models.get(modelId);
  if (!model) {
    model = {
      id: modelId,
      tex: { link: "", size: { x: 1, y: 1 } },
      boxes: [],
      planes: [],
      hitBox: {
        min: { x: -FOE_BODY.x / 2, y: 0, z: -FOE_BODY.z / 2 },
        max: { x: FOE_BODY.x / 2, y: FOE_BODY.y, z: FOE_BODY.z / 2 },
      },
    };
    models.set(modelId, model);
  }
  return model;
}

/** The « ! » over an enemy that saw the team. */
let markTexture: THREE.Texture | undefined;

function spottedMark(): THREE.Mesh {
  if (!markTexture) {
    const canvas = document.createElement("canvas");
    canvas.width = 5;
    canvas.height = 9;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#1b1020";
    ctx.fillRect(0, 0, 5, 9);
    ctx.fillStyle = "#ffd650";
    ctx.fillRect(1, 1, 3, 4);
    ctx.fillRect(1, 6, 3, 2);
    markTexture = new THREE.CanvasTexture(canvas);
    markTexture.magFilter = THREE.NearestFilter;
    markTexture.minFilter = THREE.NearestFilter;
    markTexture.colorSpace = THREE.SRGBColorSpace;
  }
  const material = new THREE.MeshBasicMaterial({
    map: markTexture,
    transparent: true,
    depthTest: false,
  });
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(5, 9), material);
  mark.renderOrder = 10;
  mark.name = "spotted";
  mark.visible = false;
  return mark;
}

/**
 * A foe's mesh: its walking sprite (`walk`: one cell of the sheet shown, see setFoeFrame) or else its still picture
 * (`link`, a data URL of the database), its body, its hidden « ! ».
 */
export function makeFoeMesh(
  link: string | undefined,
  walk?: MapWalk
): THREE.Group {
  const group = new THREE.Group();
  let picture: THREE.Mesh | undefined;
  if (walk) {
    // (its own texture: each foe shows its own cell)
    const sheet = new THREE.TextureLoader().load(walk.image);
    sheet.magFilter = THREE.NearestFilter;
    sheet.minFilter = THREE.NearestFilter;
    sheet.colorSpace = THREE.SRGBColorSpace;
    sheet.repeat.set(1 / walk.frames, 1 / MAP_WALK_DIRS.length);
    picture = uprightPicture(walk.image, { x: walk.w, y: walk.h }, sheet);
    picture.userData["walk"] = walk;
    setFoeFrame(picture, 0, 0);
  } else if (link) {
    const size = pictureSizes.get(link) ?? { x: 24, y: 24 };
    const scale = size.y > 32 ? 2 : 1;
    picture = uprightPicture(link, {
      x: Math.round(size.x / scale),
      y: Math.round(size.y / scale),
    });
  }
  if (picture) {
    picture.name = "picture";
    group.add(picture);
    const mark = spottedMark();
    mark.position.y = picture.position.y * 2 + 8;
    group.add(mark);
  }
  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(FOE_BODY.x, FOE_BODY.y, FOE_BODY.z).translate(
        0,
        FOE_BODY.y / 2,
        0
      ),
      bodyMaterial
    )
  );
  return group;
}

/**
 * The cell a foe's walking sprite shows: its direction (a row of MAP_WALK_DIRS) and the step of its walk (0:
 * standing). Nothing for a foe drawn from a still picture.
 */
export function setFoeFrame(
  picture: THREE.Object3D,
  dir: number,
  frame: number
): void {
  const walk = picture.userData["walk"] as MapWalk | undefined;
  const map = ((picture as THREE.Mesh).material as THREE.MeshBasicMaterial)
    ?.map;
  if (walk && map) {
    const rows = MAP_WALK_DIRS.length;
    map.offset.set((frame % walk.frames) / walk.frames, 1 - (dir + 1) / rows);
  }
}

/** A foe's group's first enemy: the one seen on the map. */
function foeEnemy(modelId: string): DbEnemy | undefined {
  const db = cachedDatabase();
  const group = db.groups.find(
    (g) => g.id === modelId.slice(FOE_PREFIX.length)
  );
  return db.enemies.find((e) => e.id === group?.members[0]?.enemy);
}

/** The walking sprite of a foe's group (its first enemy's), if it has one. */
export function foeWalk(modelId: string): MapWalk | undefined {
  return foeEnemy(modelId)?.walk;
}

/** The picture of a foe's group (its first enemy's still picture). */
export function foePicture(modelId: string): string | undefined {
  const enemy = foeEnemy(modelId);
  return enemy?.sprite ?? enemy?.icon;
}
