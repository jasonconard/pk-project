import { Service, signal } from "@angular/core";
import * as THREE from "three";
import { CAMERA_LOOK, Game } from "../model/Game";
import { MapHelper } from "../model/MapHelper";
import {
  CutBlock,
  CutEmote,
  Cutscene,
  cutsceneLength,
  PLAYER_ACTOR,
} from "../model/cutscene";
import {
  ActorPose,
  actorsAt,
  cameraAt,
  CameraPose,
  characterTracks,
  CutStart,
  firedBetween,
  positionAt,
  screenAt,
  ScreenState,
} from "../model/cutscene-eval";
import { PlayerService } from "./player.service";
import { PlayerMoveStatus } from "../model/ScenePlayer";
import { isNpc, setNpcFrame } from "../model/npc-sprite";
import { WALK_STAND } from "../../../database-editor/shared/database";
import { playSound } from "./sfx";
import { animationKey, setAnimation } from "../model/model-animations";
import { DayTime } from "../../../database-editor/shared/database";
import { InstructionMessage } from "../model/SceneEventInstruction";

/** The ⏩ button's speed. */
export const FAST_SPEED = 3;
/** How long the camera takes to come back on the player after the cutscene (s). */
const RETURN_TIME = 0.6;
/** A walk's steps in the sheet's columns: left foot, standing, right foot, standing; steps per second. */
const WALK_STEPS = [0, WALK_STAND, 2, WALK_STAND];
const STEPS_PER_SECOND = { walk: 6, run: 9, slow: 4 };

/** What the overlay shows (see CutsceneOverlayComponent). */
export interface CutsceneView extends ScreenState {
  /** The emote bubbles, at their screen place (CSS pixels). */
  bubbles: { id: string; x: number; y: number; emote: CutEmote }[];
  skippable: boolean;
  fastForward: boolean;
  fast: boolean;
}

/** What a cutscene asks of the rest of the game (GameService gives it). */
export interface CutsceneHooks {
  /** A cutscene's song ("" silence; null: the moment's song again). */
  music(song: string | null): void;
  weather(type: string): void;
  /** The time jumps to a moment of the day. */
  moment(moment: DayTime): void;
  message(msg: InstructionMessage, done: () => void): void;
  /** Closes the cutscene's message without going on (skipping). */
  dismissMessage(): void;
}

/** A character moved by the cutscene: its mesh, where it was. */
interface Moved {
  mesh: THREE.Object3D;
  /** NPC: its model id (its walking sheet); the player: null. */
  modelId: string | null;
  position: THREE.Vector3;
  visible: boolean;
  /** The player's direction (put back with it). */
  dir: number;
  /** The world place the poses are measured from (the mesh is moved by the difference). */
  origin: THREE.Vector3;
}

interface Run {
  cut: Cutscene;
  mapId: string;
  length: number;
  t: number;
  start: CutStart;
  moved: Map<string, Moved>;
  /** A message is open: the time waits. */
  waiting: boolean;
  /** The blocks fired once already (messages, sounds…). */
  fired: Set<string>;
  fast: boolean;
  /** After the end: the camera coming back on the player (s spent), null while playing. */
  returning: number | null;
  /** The camera when it ended (to ease back from). */
  endCamera: CameraPose | null;
  done: () => void;
}

/**
 * Plays the cutscenes on the map (design/main-view.pen, Cinématiques · Jeu): every frame, the time goes on and the
 * scene at that time is applied (cutscene-eval.ts): the characters' meshes moved and drawn walking, the camera, the
 * screen (overlay), the messages, music, sounds, weather fired when their time comes. Skipping jumps to the end. The
 * editor also uses it to show a moment of a cutscene on the map (`preview`).
 */
@Service()
export class CutsceneService {
  private game: Game | null = null;
  private hooks: CutsceneHooks | null = null;
  private run: Run | null = null;

  private readonly viewState = signal<CutsceneView | null>(null);
  /** The cutscene being played (the overlay), null: none. */
  readonly view = this.viewState.asReadonly();

  attach(game: Game, hooks: CutsceneHooks): void {
    this.game = game;
    this.hooks = hooks;
  }

  get playing(): boolean {
    return this.run !== null;
  }

  /** Where everyone is now: the player and the NPCs placed on the map, the point the camera looks at. */
  startOf(mapHelper: MapHelper): CutStart {
    const actors: CutStart["actors"] = {};
    const sprite = mapHelper.scenePlayer.mesh;
    if (sprite) {
      actors[PLAYER_ACTOR] = {
        x: sprite.position.x,
        y: sprite.position.y,
        z: sprite.position.z,
        dir: mapHelper.scenePlayer.dir,
      };
    }
    for (const chunk of mapHelper.sceneMap.chunks) {
      for (const b of chunk.buildings) {
        if (isNpc(b)) {
          const world = mapHelper.buildingWorldPos(chunk, b);
          // (rot 0 down, 1 left, 2 up, 3 right → PlayerDirection)
          const dir = [2, 3, 0, 1][(b.rot ?? 0) % 4];
          actors[b.id] = { x: world.x, y: world.y, z: world.z, dir };
        }
      }
    }
    // (on the player, as in the game; the editor's camera is elsewhere)
    const target =
      sprite?.position.clone() ??
      this.game?.getCameraTarget() ??
      new THREE.Vector3();
    return {
      actors,
      camera: { x: target.x, y: target.y, z: target.z },
    };
  }

  /** Plays a cutscene of the map (from a time), then `done`. */
  play(cut: Cutscene, from: number, done: () => void): void {
    const game = this.game;
    const mapHelper = game?.mapHelper;
    if (!game || !mapHelper || this.run) {
      done();
      return;
    }
    game.cutscene = true;
    const start = this.startOf(mapHelper);
    const length = cutsceneLength(cut);
    this.run = {
      cut,
      mapId: mapHelper.sceneMap.id,
      length,
      t: Math.min(Math.max(0, from), length),
      start,
      moved: this.collect(mapHelper, cut),
      waiting: false,
      fired: new Set(),
      fast: false,
      returning: null,
      endCamera: null,
      done,
    };
    // (played from a time: what came before is not fired, but the song of that time already plays)
    if (from > 0) {
      const before = firedBetween(cut, -1, from).filter((b) => b.start < from);
      before.forEach((b) => this.run!.fired.add(b.id));
      // (the last one before that time)
      let music: CutBlock | undefined;
      for (const b of before) {
        if (b.kind === "music") {
          music = b;
        }
      }
      if (music) {
        this.hooks?.music(music.song ?? "");
      }
    }
    // (the blocks at the very start fire now)
    this.fire(this.run);
    this.apply(this.run);
  }

  /** The ⏩ button. */
  toggleFast(): void {
    const run = this.run;
    if (run?.cut.fastForward) {
      run.fast = !run.fast;
    }
  }

  /** « Passer » held: everyone at their final place, the last music, weather, time and movements applied. */
  skip(): void {
    const run = this.run;
    if (!run || run.returning !== null || !run.cut.skippable) {
      return;
    }
    if (run.waiting) {
      run.waiting = false;
      this.hooks?.dismissMessage();
    }
    const skipped = firedBetween(run.cut, -1, run.length).filter(
      (b) => !run.fired.has(b.id) && b.kind !== "sound" && b.kind !== "message"
    );
    for (const b of skipped) {
      this.fireBlock(run, b);
    }
    run.t = run.length;
    this.apply(run);
    this.end(run);
  }

  /** Every frame (s): the time goes on (unless a message is open), the scene at that time is applied. */
  update(dt: number): void {
    const run = this.run;
    const game = this.game;
    if (!run || !game) {
      return;
    }
    if (run.returning !== null) {
      this.updateReturn(run, dt);
      return;
    }
    if (!run.waiting) {
      run.t = Math.min(run.length, run.t + dt * (run.fast ? FAST_SPEED : 1));
      this.fire(run);
    }
    this.apply(run);
    if (!run.waiting && run.t >= run.length) {
      this.end(run);
    }
  }

  /** Stops at once (another map, the editor opened): everyone back, nothing more fired. */
  stop(): void {
    const run = this.run;
    if (!run) {
      return;
    }
    if (run.waiting) {
      this.hooks?.dismissMessage();
    }
    this.restore(run.moved);
    this.finish(run, false);
  }

  // --- Editor preview ---

  private previewed: {
    moved: Map<string, Moved>;
    frame: THREE.Group;
    start: CutStart;
  } | null = null;

  /**
   * The editor shows a cutscene at a time on the map: the characters at their places, the camera's frame drawn on
   * the ground, the walks' ways. null: everything back as it was.
   */
  preview(cut: Cutscene | null, t: number): void {
    const game = this.game;
    const mapHelper = game?.mapHelper;
    if (!cut || !game || !mapHelper) {
      this.endPreview();
      return;
    }
    if (!this.previewed) {
      const frame = new THREE.Group();
      frame.renderOrder = 10;
      game.scene.add(frame);
      this.previewed = {
        moved: this.collect(mapHelper, cut, true),
        frame,
        start: this.startOf(mapHelper),
      };
    }
    const p = this.previewed;
    // (a character track added since: collected now)
    for (const tr of characterTracks(cut)) {
      if (!p.moved.has(tr.actor!)) {
        const more = this.collect(mapHelper, { ...cut, tracks: [tr] }, true);
        more.forEach((m, id) => p.moved.set(id, m));
      }
    }
    const poses = actorsAt(cut, t, p.start);
    this.applyActors(p.moved, poses, t, true);
    this.drawFrame(game, cut, t, p.start, poses, p.frame);
  }

  endPreview(): void {
    const p = this.previewed;
    if (!p) {
      return;
    }
    this.previewed = null;
    this.restore(p.moved);
    p.frame.removeFromParent();
    p.frame.traverse((o) => {
      const line = o as THREE.Line;
      line.geometry?.dispose();
      (line.material as THREE.Material | undefined)?.dispose();
    });
  }

  // --- Playing ---

  /** The characters of the cutscene's tracks (and the player always): their meshes, where they are. */
  private collect(
    mapHelper: MapHelper,
    cut: Cutscene,
    onlyTracks = false
  ): Map<string, Moved> {
    const moved = new Map<string, Moved>();
    const wanted = new Set(characterTracks(cut).map((t) => t.actor!));
    if (!onlyTracks) {
      wanted.add(PLAYER_ACTOR);
    }
    const sprite = mapHelper.scenePlayer.mesh;
    if (sprite && wanted.has(PLAYER_ACTOR)) {
      moved.set(PLAYER_ACTOR, {
        mesh: sprite,
        modelId: null,
        position: sprite.position.clone(),
        visible: sprite.visible,
        dir: mapHelper.scenePlayer.dir,
        origin: sprite.position.clone(),
      });
    }
    for (const chunk of mapHelper.sceneMap.chunks) {
      for (const b of chunk.buildings) {
        const mesh = mapHelper.meshes[chunk.id + "-" + b.id];
        if (wanted.has(b.id) && mesh && isNpc(b)) {
          moved.set(b.id, {
            mesh,
            modelId: b.modelId,
            position: mesh.position.clone(),
            visible: mesh.visible,
            dir: 2,
            origin: mapHelper.buildingWorldPos(chunk, b),
          });
        }
      }
    }
    return moved;
  }

  /** The blocks whose time has come, not fired yet (a message stops there: the time waits for it). */
  private fire(run: Run): void {
    for (const b of firedBetween(run.cut, -1, run.t)) {
      if (run.fired.has(b.id)) {
        continue;
      }
      run.fired.add(b.id);
      this.fireBlock(run, b);
      if (run.waiting) {
        // (the time stops at the message)
        run.t = b.start;
        return;
      }
    }
  }

  private fireBlock(run: Run, b: CutBlock): void {
    const hooks = this.hooks;
    switch (b.kind) {
      case "message":
        if (hooks && (b.text ?? "").trim()) {
          run.waiting = true;
          hooks.message(
            {
              text: b.text ?? "",
              ...(b.name ? { name: b.name } : {}),
              ...(b.pic ? { pic: b.pic } : {}),
            },
            () => {
              if (this.run === run) {
                run.waiting = false;
                // (the blocks at the same time as the message come now)
                this.fire(run);
              }
            }
          );
        }
        break;
      case "music":
        hooks?.music(b.song ?? "");
        break;
      case "sound":
        if (b.sound) {
          playSound(b.sound);
        }
        break;
      case "weather":
        if (b.weather) {
          hooks?.weather(b.weather);
        }
        break;
      case "time":
        if (b.moment) {
          hooks?.moment(b.moment);
        }
        break;
      case "animate":
        if (b.object && b.mode) {
          const drive = (
            { play: "play", back: "rest", loop: "loop", stop: "hold" } as const
          )[b.mode];
          setAnimation(animationKey(run.mapId, b.object), drive);
        }
        break;
      default:
        break;
    }
  }

  /** The scene at the run's time: characters, camera, overlay. */
  private apply(run: Run): void {
    const game = this.game!;
    const poses = actorsAt(run.cut, run.t, run.start);
    this.applyActors(run.moved, poses, run.t, false);
    const camera = cameraAt(run.cut, run.t, run.start, poses);
    this.placeCamera(game, camera);
    run.endCamera = camera;
    this.showView(run, poses);
  }

  /** The characters' meshes moved and drawn (walking: their steps). */
  private applyActors(
    moved: Map<string, Moved>,
    poses: Record<string, ActorPose>,
    t: number,
    editor: boolean
  ): void {
    const game = this.game!;
    const mapHelper = game.mapHelper;
    for (const [id, m] of moved) {
      const pose = poses[id];
      if (!pose) {
        continue;
      }
      m.mesh.position.x = m.position.x + (pose.x - m.origin.x);
      m.mesh.position.z = m.position.z + (pose.z - m.origin.z);
      // (hidden ones stay seen in the editor, see through)
      m.mesh.visible = editor ? m.visible : pose.visible;
      const column = pose.pace
        ? WALK_STEPS[
            Math.floor(t * STEPS_PER_SECOND[pose.pace]) % WALK_STEPS.length
          ]
        : WALK_STAND;
      if (m.modelId) {
        setNpcFrame(m.mesh, m.modelId, pose.dir, column);
      } else if (mapHelper) {
        mapHelper.scenePlayer.dir = pose.dir;
        mapHelper.updatePlayerShadow();
        PlayerService.updatePlayerSprite({
          mapHelper,
          player: mapHelper.scenePlayer,
          status: moveStatus(pose.pace),
          currentFrame: Math.floor(t * 60),
          framePerSecond: 60,
        });
      }
    }
  }

  /** The camera looking at a point, at its distance, turned around it. */
  private placeCamera(game: Game, pose: CameraPose): void {
    const target = new THREE.Vector3(pose.x, pose.y, pose.z);
    game.cameraZoom = game.fittedZoom * pose.zoom;
    const offset = CAMERA_LOOK.clone()
      .multiplyScalar(game.cameraZoom)
      .applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        THREE.MathUtils.degToRad(-pose.angle)
      );
    game.camera.position.copy(target).add(offset);
    game.camera.lookAt(target);
    game.mapHelper?.updateVisibleChunks(
      target,
      Math.max(0, pose.zoom - 1) * 0.8
    );
  }

  private showView(run: Run, poses: Record<string, ActorPose>): void {
    const game = this.game!;
    const bubbles: CutsceneView["bubbles"] = [];
    for (const [id, pose] of Object.entries(poses)) {
      const m = run.moved.get(id);
      if (pose.emote && pose.visible && m) {
        const at = m.mesh.position.clone();
        // (above the head: a character is about 24 units high, stretched)
        at.y += 34;
        const screen = at.project(game.camera);
        const rect = game.canvas.getBoundingClientRect();
        bubbles.push({
          id,
          x: rect.left + ((screen.x + 1) / 2) * rect.width,
          y: rect.top + ((1 - screen.y) / 2) * rect.height,
          emote: pose.emote,
        });
      }
    }
    this.viewState.set({
      ...screenAt(run.cut, run.t),
      bubbles,
      skippable: run.cut.skippable,
      fastForward: run.cut.fastForward,
      fast: run.fast,
    });
  }

  /** The end: the characters stay or go back, the camera comes back on the player. */
  private end(run: Run): void {
    if (run.cut.atEnd === "back") {
      this.restore(run.moved);
    } else {
      // (the NPCs standing where they stopped; the player too)
      const poses = actorsAt(run.cut, run.length, run.start);
      this.applyActors(run.moved, { ...poses }, 0, false);
    }
    this.hooks?.music(null);
    run.returning = 0;
    this.updateReturn(run, 0);
  }

  private updateReturn(run: Run, dt: number): void {
    const game = this.game!;
    run.returning = (run.returning ?? 0) + dt;
    const sprite = game.mapHelper?.scenePlayer.mesh;
    const from = run.endCamera;
    const k = Math.min(1, run.returning / RETURN_TIME);
    if (sprite && from) {
      const e = k * k * (3 - 2 * k);
      this.placeCamera(game, {
        x: from.x + (sprite.position.x - from.x) * e,
        y: from.y + (sprite.position.y - from.y) * e,
        z: from.z + (sprite.position.z - from.z) * e,
        zoom: from.zoom + (1 - from.zoom) * e,
        angle: from.angle * (1 - e),
      });
    }
    const screen = this.viewState();
    if (screen) {
      this.viewState.set({
        ...screen,
        bars: screen.bars * (1 - k),
        titleOpacity: screen.titleOpacity * (1 - k),
        fade: screen.fade * (1 - k),
        bubbles: [],
        skippable: false,
        fastForward: false,
      });
    }
    if (k >= 1) {
      this.finish(run, true);
    }
  }

  private finish(run: Run, ended: boolean): void {
    const game = this.game;
    this.run = null;
    this.viewState.set(null);
    if (game) {
      game.cutscene = false;
      game.cameraZoom = game.fittedZoom;
      const sprite = game.mapHelper?.scenePlayer.mesh;
      if (sprite) {
        game.camera.position.copy(sprite.position).add(game.cameraOffset());
        game.mapHelper?.updateCameraAim();
      }
      // (the player's walk history: no smoothing from where it was before the cutscene)
      game.steps.player.length = 0;
    }
    if (!ended) {
      this.hooks?.music(null);
    }
    run.done();
  }

  /** The characters back where they were. */
  private restore(moved: Map<string, Moved>): void {
    for (const m of moved.values()) {
      m.mesh.position.copy(m.position);
      m.mesh.visible = m.visible;
    }
    const mapHelper = this.game?.mapHelper;
    const player = moved.get(PLAYER_ACTOR);
    if (mapHelper && player) {
      mapHelper.scenePlayer.dir = player.dir;
      mapHelper.updatePlayerShadow();
      PlayerService.updatePlayerSprite({
        mapHelper,
        player: mapHelper.scenePlayer,
        status: PlayerMoveStatus.STAYING,
        currentFrame: 0,
        framePerSecond: 0,
      });
    }
    // (the NPCs drawn as set: their standing picture, their turn)
    if (mapHelper && [...moved.values()].some((m) => m.modelId)) {
      mapHelper.refreshNpcs();
    }
  }

  /** The editor: the camera's frame on the ground at that time, and the walks' ways. */
  private drawFrame(
    game: Game,
    cut: Cutscene,
    t: number,
    start: CutStart,
    poses: Record<string, ActorPose>,
    group: THREE.Group
  ): void {
    group.children.forEach((c) => {
      (c as THREE.Line).geometry.dispose();
      ((c as THREE.Line).material as THREE.Material).dispose();
    });
    group.clear();
    const pose = cameraAt(cut, t, start, poses);
    const target = new THREE.Vector3(pose.x, pose.y, pose.z);
    // The game's camera at that time (its zoom, its turn), the ground it sees
    const camera = (game.camera as THREE.PerspectiveCamera).clone();
    const zoom = game.fittedZoom * pose.zoom;
    camera.position.copy(target).add(
      CAMERA_LOOK.clone()
        .multiplyScalar(zoom)
        .applyAxisAngle(
          new THREE.Vector3(0, 1, 0),
          THREE.MathUtils.degToRad(-pose.angle)
        )
    );
    camera.lookAt(target);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -target.y);
    const corners: THREE.Vector3[] = [];
    const ray = new THREE.Raycaster();
    for (const [x, y] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      ray.setFromCamera(new THREE.Vector2(x, y), camera);
      const hit = ray.ray.intersectPlane(ground, new THREE.Vector3());
      if (hit) {
        corners.push(hit.setY(target.y + 1));
      }
    }
    if (corners.length === 4) {
      group.add(line(corners, 0x5a_a8_ff, true));
    }
    // The walks' ways (dashed in the colour of their track)
    for (const tr of characterTracks(cut)) {
      const color = tr.actor === PLAYER_ACTOR ? 0xff_b0_4a : 0x7b_d8_8f;
      for (const b of tr.blocks) {
        if (b.kind !== "walk" || b.x === undefined || b.z === undefined) {
          continue;
        }
        const from = positionAt(
          {
            ...cut,
            tracks: [{ ...tr, blocks: tr.blocks.filter((x) => x !== b) }],
          },
          tr.actor!,
          b.start,
          start
        );
        group.add(
          line(
            [
              new THREE.Vector3(from.x, from.y + 1, from.z),
              new THREE.Vector3(b.x, from.y + 1, b.z),
            ],
            color,
            false
          )
        );
      }
    }
  }
}

/** A line over everything (never hidden by the map). */
function line(points: THREE.Vector3[], color: number, loop: boolean) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    depthTest: false,
    transparent: true,
  });
  const l = loop
    ? new THREE.LineLoop(geometry, material)
    : new THREE.Line(geometry, material);
  l.renderOrder = 10;
  return l;
}

/** How the player is drawn for a pace (null: standing). */
function moveStatus(pace: ActorPose["pace"]): PlayerMoveStatus {
  if (!pace) {
    return PlayerMoveStatus.STAYING;
  }
  return pace === "run" ? PlayerMoveStatus.RUNNING : PlayerMoveStatus.WALKING;
}
