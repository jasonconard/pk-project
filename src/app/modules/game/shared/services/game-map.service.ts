import { inject, Service } from "@angular/core";
import { describeAction, sameAction } from "../model/GameAction";
import {
  CAMERA_FOV,
  CAMERA_LOOK,
  Game,
  SHADE_OFFSET,
  TOO_FAR_LIMIT,
} from "../model/Game";
import { fitPixelCamera } from "../model/pixel-scale";
import { SCENE_PLAYER } from "../../../../../assets/characters/player";
import { MapHelper } from "../model/MapHelper";
import { PlayerDirection, PlayerMoveStatus } from "../model/ScenePlayer";
import { SceneService } from "./scene.service";
import { Vec3 } from "../model/SceneUtils";
import { PlayerService } from "./player.service";
import { EventService, FoundEvent } from "./event.service";
import { EventContext } from "../model/ObjectEvent";
import { SceneEvent } from "../model/SceneEvent";
import { currentVariableValues } from "../../../variables-editor/shared/variable-values";
import { KeyService } from "../../../../core/shared/service/key.service";
import * as THREE from "three";
import { SequenceService } from "./sequence.service";
import { DEFAULT_MAP_ID } from "../../../../../assets/map/maps";
import { SceneChunk } from "../model/SceneMap";
import { MapEditorService } from "./map-editor.service";
import { currentMapId, loadMap, setCurrentMapId } from "./map-storage";
import { InstructionTeleport } from "../model/SceneEventInstruction";
import { isPassageEvent } from "../model/Passage";
import { DustPuff } from "../model/DustPuff";
import { DungeonService } from "./dungeon.service";
import { FarmService } from "./farm.service";
import { TeamFollowers } from "../model/team-followers";
import { LightsView } from "../model/lights-view";
import { currentParty } from "../../../database-editor/shared/party";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import { DbCharacter } from "../../../database-editor/shared/database";
import { KeyCode } from "../../../../core/shared/model/PressedKey";

/** Ledge hop length (s) and height (world units). */
const HOP_TIME = 0.42;
const HOP_HEIGHT = 7;
/** The ground height is found by a ray cast down from this high above the player (above any relief). */
const GROUND_RAY_UP = 80;
const RAY_NUDGE = 0.013;
/** Half width of the body: the hop carries the player on until it's off the ledge. */
const HOP_BODY = 7;
/** Buildings visibility updated every this many input steps (120 per second). */
const VISIBILITY_EVERY = 4;
/** The action in front of the player is looked for every this many input frames (120 Hz). */
const ACTION_EVERY = 4;
/** Frames between two looks at how the player is drawn (the team leader's walking sheet). */
const LOOK_EVERY = 60;
/** The player's places kept, one per step (see CameraFollow). */
const STEP_HISTORY = 16;

@Service()
export class GameMapService {
  private readonly keyService = inject(KeyService);
  private readonly sequenceService = inject(SequenceService);
  private readonly mapEditorService = inject(MapEditorService);
  private readonly dungeonService = inject(DungeonService);
  private readonly farmService = inject(FarmService);
  private readonly followers = new TeamFollowers();
  private readonly lights = new LightsView();

  private pixelSize = 8;
  /** Ledge hop: time since it started (s, -1 = none) and the height currently added to the sprite. */
  private hopTime = -1;
  private hopOffset = 0;
  private visibilityTick = 0;
  private actionTick = 0;
  /** Ledge hop: height dropped, camera offset, push forward still to apply (x, z). */
  private hopDrop = 0;
  private hopCameraOffset = 0;
  private hopLastTime = 0;
  private readonly hopNudge = new THREE.Vector2();
  private dust?: DustPuff;
  /** Ground level (and stairs) under the player at the previous step, to notice stepping off a ledge. */
  private lastLevel = 0;
  private lastOnStairs = false;
  private isMoving = 0;
  /** Arrived on a map: its passages wait until the player has left them (not sent straight back). */
  private passageGuard = false;
  /** The events starting on their own that could play at the last check (see EventService.armed). */
  private armedBefore = new Set<SceneEvent>();
  private moveRatio: Vec3 = { x: 0, y: 0, z: 0 };
  private moveSpeed: number = 0;
  private moveDir: PlayerDirection = PlayerDirection.DOWN;
  private moveStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;

  init(game: Game) {
    if (game.mapHelper) {
      Object.values(game.mapHelper.meshes).forEach(
        (mesh) => (mesh.visible = true)
      );
    } else {
      // (the map edited in the editor, saved in the browser, replaces the one of the code)
      const mapHelper = new MapHelper({
        originGame: game,
        sceneMap: loadMap(currentMapId()) ?? loadMap(DEFAULT_MAP_ID)!,
        scenePlayer: SCENE_PLAYER,
      });
      game.mapHelper = mapHelper;

      const rect = game.canvas.getBoundingClientRect();

      game.camera = new THREE.PerspectiveCamera(
        CAMERA_FOV,
        rect.width / rect.height,
        1,
        TOO_FAR_LIMIT + SHADE_OFFSET
      );
      game.camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
      game.camera.lookAt(0, 0, 0);

      game.render();

      mapHelper.buildChunks();
      mapHelper.buildPlayer();
      // (another map than the world: the player starts at its arrival point)
      const spawn =
        mapHelper.sceneMap.id === DEFAULT_MAP_ID
          ? undefined
          : mapHelper.sceneMap.spawn;
      if (spawn) {
        this.travel(game, { pos: spawn });
      }
    }
  }

  /**
   * Teleport, possibly to another map (built in place of the current one, at the point given, else at its arrival
   * point). An unknown map: the player stays where they are. `rebuild`: the map is built again even if it is the
   * current one (reset).
   */
  travel(game: Game, teleport: InstructionTeleport, rebuild = false) {
    const mapHelper = game.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    if (!mapHelper || !sprite) {
      return;
    }
    let pos: Vec3 | undefined = teleport.pos;
    let switched = false;
    this.passageGuard = true;
    if (teleport.map && (rebuild || teleport.map !== mapHelper.sceneMap.id)) {
      const map = loadMap(teleport.map);
      if (!map) {
        console.warn("Teleport: unknown map", teleport.map);
        return;
      }
      this.mapEditorService.leaveMap(game);
      mapHelper.setMap(map);
      setCurrentMapId(map.id);
      switched = true;
      pos ??= map.spawn ?? { x: 0, y: 0, z: 0 };
      this.hopTime = -1;
      this.hopOffset = 0;
      this.hopCameraOffset = 0;
    }
    if (pos) {
      const camera = game.camera;
      const dx = pos.x - sprite.position.x;
      const dz = pos.z - sprite.position.z;
      camera.position.x += dx;
      camera.position.z += dz;
      this.mapEditorService.followPlayer(dx, dz);
      sprite.position.x = pos.x;
      sprite.position.z = pos.z;
      mapHelper.updateCameraAim();
    }
    if (switched) {
      game.warmUp(); // (the chunks around the arrival, during the fade: no stutter on the first steps)
    }
    game.render();
  }

  /**
   * Ledge hop. The ground under the player drops at once (the cell is lower); the sprite and the camera are drawn
   * back up by the drop and come down progressively (falling faster and faster: t²), with an arch on top (sprite
   * only). Relative offsets, removed before being computed again. The player is also carried forward until the
   * whole body has left the ledge. Ends with a thud and a dust puff.
   */
  private updateHop(game: Game, sprite: THREE.Object3D) {
    const plane = sprite.children[0];
    if (!plane || this.hopTime < 0) {
      return;
    }
    plane.position.y -= this.hopOffset;
    game.camera.position.y -= this.hopCameraOffset;
    // Real time (the input loop doesn't always run at its 120 Hz)
    const now = performance.now();
    const dt = Math.min((now - this.hopLastTime) / 1000, 0.05);
    this.hopLastTime = now;
    const before = Math.min(this.hopTime / HOP_TIME, 1);
    this.hopTime += dt;
    const t = Math.min(this.hopTime / HOP_TIME, 1);
    // Carried forward (spread over the hop)
    const step = t - before;
    sprite.position.x += this.hopNudge.x * step;
    sprite.position.z += this.hopNudge.y * step;
    game.camera.position.x += this.hopNudge.x * step;
    game.camera.position.z += this.hopNudge.y * step;
    if (t >= 1) {
      this.hopTime = -1;
      this.hopOffset = 0;
      this.hopCameraOffset = 0;
      // Exactly on the step grid again (the nudge is spread over float steps)
      sprite.position.x = Math.round(sprite.position.x);
      sprite.position.z = Math.round(sprite.position.z);
      game.mapHelper?.updateCameraAim();
      game.weather.playLanding();
      this.dust ??= new DustPuff(game.scene);
      this.dust.spawn(sprite.position);
      return;
    }
    const fall = this.hopDrop * (1 - t * t);
    this.hopOffset = fall + HOP_HEIGHT * Math.sin(Math.PI * t);
    this.hopCameraOffset = fall;
    plane.position.y += this.hopOffset;
    game.camera.position.y += this.hopCameraOffset;
    game.mapHelper?.updateCameraAim();
  }

  /** The team walking behind the player (hidden by the setting, the map, an event, or while a fight hides the player). */
  private updateFollowers(
    game: Game,
    mapHelper: MapHelper,
    sprite: THREE.Object3D
  ): void {
    const party = currentParty();
    const db = cachedDatabase();
    const members = party.team
      .slice(1)
      .map((id) => db.characters.find((c) => c.id === id))
      .filter((c): c is DbCharacter => !!c);
    this.followers.update(
      game.scene,
      mapHelper.sceneMap,
      sprite,
      mapHelper.scenePlayer.dir,
      members,
      game.teamFollows &&
        mapHelper.sceneMap.followers !== false &&
        !party.teamHidden &&
        sprite.scale.x > 0.01,
      {
        frame: game.frame,
        framePerSecond: game.framePerSec,
        running: this.moveStatus === PlayerMoveStatus.RUNNING,
      }
    );
  }

  /** What the events' conditions read: the hour, the weather, the story variables. */
  private eventContext(game: Game): EventContext {
    return {
      hour: game.weather.hourOfDay,
      day: game.day,
      weather: game.weather.type,
      values: currentVariableValues(),
    };
  }

  /** Plays an object's event now, whatever its trigger and conditions (the mode test). False: no such object. */
  launchObjectEvent(
    game: Game,
    chunkId: string,
    buildingId: string,
    evt: SceneEvent
  ): boolean {
    const mapHelper = game.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    const chunk = mapHelper?.sceneMap.chunks.find((c) => c.id === chunkId);
    const building = chunk?.buildings.find((b) => b.id === buildingId);
    if (!mapHelper || !sprite || !chunk || !building) {
      return false;
    }
    this.launch(mapHelper, sprite, { evt, chunk, building });
    return true;
  }

  /** Plays an event (its object turns towards the player first if asked). */
  private launch(
    mapHelper: MapHelper,
    sprite: THREE.Object3D,
    found: FoundEvent
  ) {
    if (found.evt.face) {
      mapHelper.faceTowards(found.chunk, found.building, sprite.position);
    }
    this.sequenceService.launchSequence(
      found.evt,
      () => this.eventContext(mapHelper.originGame),
      {
        map: mapHelper.sceneMap.id,
        object: found.building.id,
        durationOf: (id) => mapHelper.motionDuration(id),
      }
    );
  }

  inputLoop(game: Game) {
    const mapHelper = game.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    if (!mapHelper || !sprite) {
      return;
    }
    // (where it is when this step starts: the frames show the player in between its steps, see CameraFollow)
    const history = game.steps.player;
    const kept = history.length >= STEP_HISTORY ? history.shift()! : null;
    history.push({
      time: game.steps.time - game.steps.length,
      pos: (kept?.pos ?? new THREE.Vector3()).copy(sprite.position),
    });
    if (game.paused || game.held) {
      return;
    }
    this.lights.update(mapHelper, sprite);
    // Map editor: the player is frozen, the camera moves instead
    if (game.editMode) {
      game.action = null;
      this.mapEditorService.update(game);
      return;
    }
    fitPixelCamera(game);
    // (an event or a cutscene is being played)
    const busy = this.sequenceService.isRunning || game.cutscene;
    // No moves during a sequence or a cutscene, or while a tornado carries the player away
    const moveDetails =
      busy || game.weather.playerFlying
        ? {
            move: { x: 0, y: 0, z: 0 },
            speed: 0,
            status: PlayerMoveStatus.STAYING,
          }
        : SceneService.getMove(mapHelper, this.keyService.holdedCodes);
    const move = moveDetails.move;

    const mouvStatus = moveDetails.status;

    if (this.isMoving) {
      mapHelper.scenePlayer.dir = this.moveDir;
    } else {
      this.moveRatio = move;
      this.moveSpeed = moveDetails.speed;
      this.moveDir = mapHelper.scenePlayer.dir;
      this.moveStatus = mouvStatus;
    }
    if (this.isMoving < this.pixelSize) {
      this.isMoving += this.moveSpeed;
    } else {
      this.isMoving = 0;
      this.moveSpeed = 0;
      this.moveDir = PlayerDirection.DOWN;
      this.moveRatio = { x: 0, y: 0, z: 0 };
      this.moveStatus = mouvStatus;
    }

    if (this.isMoving && this.isMoving === this.moveSpeed) {
      const ratio = this.pixelSize / this.moveSpeed;
      const collisions = {
        x: this.moveRatio.x * ratio,
        y: this.moveRatio.y * ratio,
        z: this.moveRatio.z * ratio,
      };
      SceneService.checkCollisions(mapHelper, sprite, collisions);
      SceneService.checkGroundCollisions(mapHelper, sprite, collisions);
      this.moveRatio = {
        x: collisions.x / ratio,
        y: collisions.y / ratio,
        z: collisions.z / ratio,
      };
    }

    const camera = game.camera;
    this.updateHop(game, sprite);
    this.dust?.update();
    mapHelper.updatePlayerShadow();

    camera.position.x += this.moveRatio.x;
    camera.position.z += this.moveRatio.z;
    mapHelper.updateCameraAim();
    sprite.position.x += this.moveRatio.x;
    sprite.position.z += this.moveRatio.z;

    // (from high above: the ground may have been raised under the player in the editor)
    // (slightly off the exact position: a ray going exactly through a vertex shared by the cells can miss them all)
    const spriteRayOrigin = new THREE.Vector3(
      sprite.position.x + RAY_NUDGE,
      sprite.position.y + GROUND_RAY_UP,
      sprite.position.z + RAY_NUDGE
    );
    game.raycaster.ray = new THREE.Ray(
      spriteRayOrigin,
      new THREE.Vector3(0, -1, 0)
    );
    let dist = -1;
    const rayGrounds = (chunk: SceneChunk) =>
      chunk.grounds.forEach((ground) => {
        if (!ground.passable || !ground.mesh) {
          return;
        }
        const rayCasting = game.raycaster.intersectObject(ground.mesh)[0];
        if (
          rayCasting &&
          rayCasting.distance &&
          (dist === -1 || rayCasting.distance < dist)
        ) {
          dist = rayCasting.distance;
        }
      });
    // The ground under the player is in the chunk under them (120 times per second: not every visible chunk);
    // the others only if it has none there
    const under = mapHelper.chunkAt(sprite.position.x, sprite.position.z);
    if (under?.visible) {
      rayGrounds(under);
    }
    if (dist === -1) {
      mapHelper.sceneMap.chunks.forEach(
        (chunk) => chunk.visible && chunk !== under && rayGrounds(chunk)
      );
    }

    if (dist > -1) {
      const previousY = sprite.position.y;
      sprite.position.y -= dist - GROUND_RAY_UP;
      camera.position.y -= dist - GROUND_RAY_UP;
      // Stepping off a ledge: a little hop, like in the Pokémon games, once the player really enters the lower cell
      // (not by stairs)
      const level = mapHelper.levelAtWorld(
        sprite.position.x,
        sprite.position.z
      );
      const stairs = mapHelper.isStairsAt(sprite.position.x, sprite.position.z);
      if (
        level < this.lastLevel &&
        !stairs &&
        !this.lastOnStairs &&
        this.hopTime < 0
      ) {
        this.hopTime = 0;
        this.hopLastTime = performance.now();
        this.hopDrop = previousY - sprite.position.y;
        // Drawn back up at once (no frame where it already stands down)
        this.hopOffset = this.hopDrop;
        this.hopCameraOffset = this.hopDrop;
        sprite.children[0].position.y += this.hopOffset;
        camera.position.y += this.hopCameraOffset;
        // Carried one more step forward if the back of the body is still over the ledge
        const dx = Math.sign(this.moveRatio.x);
        const dz = Math.sign(this.moveRatio.z);
        const back = mapHelper.levelAtWorld(
          sprite.position.x - dx * HOP_BODY,
          sprite.position.z - dz * HOP_BODY
        );
        this.hopNudge.set(
          back > level ? dx * this.pixelSize : 0,
          back > level ? dz * this.pixelSize : 0
        );
        game.weather.playLedgeHop();
      }
      this.lastLevel = level;
      this.lastOnStairs = stairs;
    } else {
      sprite.position.x -= this.moveRatio.x;
      sprite.position.z -= this.moveRatio.z;
      camera.position.x -= this.moveRatio.x;
      camera.position.z -= this.moveRatio.z;
    }

    // The team leader or its walking sheet may have changed (an event, the database editor): about once a second
    if (game.frame % LOOK_EVERY === 0) {
      mapHelper.refreshPlayerLook();
    }
    // (a cutscene draws the player itself)
    if (!game.cutscene) {
      PlayerService.updatePlayerSprite({
        mapHelper: mapHelper,
        player: mapHelper.scenePlayer,
        status: this.moveStatus,
        currentFrame: game.frame,
        framePerSecond: game.framePerSec,
      });
    }
    this.updateFollowers(game, mapHelper, sprite);

    // What the action key would do (the action button, the prompt), the events starting on their own: 30 times per
    // second is plenty
    if (++this.actionTick % ACTION_EVERY === 0) {
      const ctx = this.eventContext(game);
      const found =
        busy || game.weather.playerFlying
          ? null
          : EventService.actionAt(mapHelper, sprite, ctx);
      let action = found ? describeAction(found.evt, found.building) : null;
      if (!found && !busy && !game.weather.playerFlying) {
        action =
          this.dungeonService.actionAt(mapHelper, sprite) ??
          this.farmService.actionAt(mapHelper, sprite);
      }
      if (!sameAction(action, game.action)) {
        game.action = action;
      }
      if (!busy && !game.weather.playerFlying) {
        // An event that just became possible (stepped in, conditions now true) plays, one at a time; it plays again
        // only after having been impossible
        const armed = EventService.armed(mapHelper, sprite, ctx);
        const fresh = armed.find((f) => !this.armedBefore.has(f.evt));
        this.armedBefore = new Set(
          armed
            .filter((f) => this.armedBefore.has(f.evt) || f === fresh)
            .map((f) => f.evt)
        );
        if (fresh) {
          this.launch(mapHelper, sprite, fresh);
        }
      }
    }

    if (!busy) {
      const found = EventService.checkEvents(
        mapHelper,
        sprite,
        this.eventContext(game),
        this.keyService.pressedCodes,
        this.keyService.holdedCodes
      );
      const event = found?.evt;
      // Just arrived through a passage: the passages are ignored until the player has stepped out of them
      if (this.passageGuard && (!event || isPassageEvent(event))) {
        this.passageGuard = !!event;
      } else if (found) {
        this.launch(mapHelper, sprite, found);
      } else if (
        this.keyService.pressedCodes.includes(KeyCode.confirm) &&
        !game.weather.playerFlying && // (a dungeon object or an enemy in front: open, work, hit; else a farmland cell: till, plant, water, harvest)
        !this.dungeonService.act(mapHelper, sprite)
      ) {
        this.farmService.act(mapHelper, sprite);
      }
    }

    this.farmService.update(game, mapHelper);
    this.dungeonService.update(
      game,
      sprite,
      !busy && !game.weather.playerFlying
    );

    // Buildings fading / hiding: 30 times per second is plenty (every building's box is computed)
    if (++this.visibilityTick % VISIBILITY_EVERY === 0) {
      mapHelper.sceneMap.chunks.forEach((chunk) => {
        if (chunk.visible) {
          chunk.buildings.forEach((building) => {
            mapHelper.updateVisibleMesh(
              chunk.id + "-" + building.id,
              sprite.position,
              building.canHide
            );
          });
        }
      });
    }

    // if(this.keyService.holdedKeys.find(key => { return key.code === KeyCode.y; })) {
    //   camera.zoom = Math.min(2, camera.zoom + 0.01);
    // } else if(this.keyService.holdedKeys.find(key => { return key.code === KeyCode.x; })) {
    //   camera.zoom = Math.max(0.5, camera.zoom - 0.005);
    // } else {
    //   if(camera.zoom > 1) {
    //     camera.zoom = Math.max(1, camera.zoom - 0.01);
    //   } else if(camera.zoom < 1) {
    //     camera.zoom = Math.min(1, camera.zoom + 0.005);
    //   }
    // }
    // CoreService.me.setLogs(camera.zoom);
    // camera.updateProjectionMatrix();
  }
}
