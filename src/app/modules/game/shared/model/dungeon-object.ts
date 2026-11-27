import * as THREE from "three";
import { SceneModel } from "./SceneModel";
import { SceneBuilding } from "./SceneBuilding";
import { CAMERA_LOOK } from "./Game";
import { facingSprite } from "./pixel-scale";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";

/**
 * The objects of the editor's Donjon tab (design/main-view.pen, Donjons · Éditeur): chests, traps, switches, locked
 * doors, stairs, room doors and save points. An object of the map whose model id is `dg:<kind>`, drawn from a
 * pixel-art picture (src/assets/dungeon/), upright and facing the camera like the characters, or lying on the ground
 * (traps, stairs). An invisible box gives it a body. What it does is played by the dungeon (dungeon.service.ts).
 */
export const DUNGEON_PREFIX = "dg:";

export type DungeonKind =
  "chest" | "trap" | "switch" | "door" | "stairs" | "room-door" | "save";

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
    roomOnly: true,
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

/** A picture standing up and facing the camera from its feet, stretched like the player's (its own material). */
export function uprightPicture(
  link: string,
  size: { x: number; y: number }
): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({
    map: texture(link),
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

// (never drawn: the fading of objects near the camera sets mesh.visible, not the material's)
const bodyMaterial = new THREE.MeshBasicMaterial({ visible: false });

/**
 * A dungeon object's mesh: its picture (`on`: the chest opened, the switch turned on; `hidden`: a trap not found
 * yet, nothing drawn but its place) with its invisible body.
 */
export function makeDungeonMesh(
  modelId: string,
  state: { on?: boolean; hidden?: boolean } = {},
  rot = 0
): THREE.Group {
  const group = new THREE.Group();
  const info = dungeonKindOf(modelId);
  if (!info) {
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

/** A foe's mesh: its picture (`link`, a data URL of the database), its body, its hidden « ! ». */
export function makeFoeMesh(link: string | undefined): THREE.Group {
  const group = new THREE.Group();
  if (link) {
    const size = pictureSizes.get(link) ?? { x: 24, y: 24 };
    const scale = size.y > 32 ? 2 : 1;
    const shown = {
      x: Math.round(size.x / scale),
      y: Math.round(size.y / scale),
    };
    const picture = uprightPicture(link, shown);
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

/** The picture of a foe's group (its first enemy's still picture). */
export function foePicture(modelId: string): string | undefined {
  const db = cachedDatabase();
  const group = db.groups.find(
    (g) => g.id === modelId.slice(FOE_PREFIX.length)
  );
  const enemy = db.enemies.find((e) => e.id === group?.members[0]?.enemy);
  return enemy?.sprite ?? enemy?.icon;
}
