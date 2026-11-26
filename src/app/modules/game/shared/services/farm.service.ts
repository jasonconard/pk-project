import { Service, inject, signal } from "@angular/core";
import * as THREE from "three";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import { DbCrop, FarmTool } from "../../../database-editor/shared/database";
import { currentParty, giveItem } from "../../../database-editor/shared/party";
import {
  advanceFarm,
  changePlots,
  currentFarm,
  daysLeft,
  inSeason,
  isRipe,
  isWatered,
  noteWeather,
  Plot,
  plotKey,
} from "../model/farm";
import { FarmView } from "../model/farm-view";
import { Game } from "../model/Game";
import { GameAction, gameAction } from "../model/GameAction";
import { MapHelper } from "../model/MapHelper";
import {
  InstructionType,
  SceneEventInstruction,
} from "../model/SceneEventInstruction";
import { PlayerDirection } from "../model/ScenePlayer";
import { TILE_SIZE } from "../model/Terrain";
import { playSound } from "./sfx";
import { SequenceService } from "./sequence.service";

/** How far in front of the player the cell acted on is. */
const REACH = 12;
/** The weather noted and the days counted: a few times a second is plenty. */
const UPDATE_EVERY = 15;
/** How long the harvest's message stays (ms). */
const TOAST_MS = 2200;

/** The farmland cell in front of the player, and its plot (none: not tilled). */
interface FrontCell {
  map: string;
  key: string;
  plot?: Plot;
  crop?: DbCrop;
}

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

function message(text: string): SceneEventInstruction {
  return { type: InstructionType.MESSAGE, message: { text } };
}

/**
 * The crops on the map being played (docs/editeur/17-cultures.md; design/main-view.pen, Cultures): in front of a
 * cell of « Terre cultivable », the action key tills it (with the hoe), plants a seed of the bag, waters (with the
 * watering can), harvests a ripe crop or pulls out a dead one. Notes the weather of the day, counts the days gone by
 * and draws the plots (FarmView).
 */
@Service()
export class FarmService {
  private readonly sequenceService = inject(SequenceService);
  private readonly view = new FarmView();
  private tick = 0;
  /** The day of the game being played (the last update). */
  private day = 0;

  /** The seeds window: the cell to plant (null: closed). */
  readonly plantAsk = signal<{ map: string; key: string } | null>(null);
  /** « +2 Lunelle » after a harvest. */
  readonly toast = signal<{ pic?: string; text: string } | null>(null);
  private toastTimer?: ReturnType<typeof setTimeout>;

  /** Each frame of the game being played. */
  update(game: Game, mapHelper: MapHelper): void {
    this.day = game.day;
    if (++this.tick % UPDATE_EVERY === 0) {
      noteWeather(game.day, game.weather.type);
      advanceFarm(game.day, cachedDatabase());
    }
    this.view.sync(mapHelper, currentFarm(), game.day, cachedDatabase());
  }

  private front(
    mapHelper: MapHelper,
    sprite: THREE.Object3D
  ): FrontCell | null {
    const dir = facing(mapHelper.scenePlayer.dir);
    const { x, z } = sprite.position;
    const own = mapHelper.cellAt(x, z);
    let cell = mapHelper.cellAt(x + dir.x * REACH, z + dir.z * REACH);
    // (the cell faced, never the one the player stands on)
    if (
      cell &&
      own &&
      cell.chunk === own.chunk &&
      cell.col === own.col &&
      cell.row === own.row
    ) {
      cell = mapHelper.cellAt(
        x + dir.x * (REACH + TILE_SIZE / 2),
        z + dir.z * (REACH + TILE_SIZE / 2)
      );
    }
    if (cell?.chunk.tiles?.[`${cell.col},${cell.row}`] !== "farmland") {
      return null;
    }
    const map = mapHelper.sceneMap.id;
    const key = plotKey(cell.chunk.id, cell.col, cell.row);
    const plot = currentFarm().plots[map]?.[key];
    const crop = plot?.crop
      ? cachedDatabase().crops.find((c) => c.id === plot.crop)
      : undefined;
    return { map, key, plot, crop };
  }

  /** The prompt of the action key in front of a farmland cell. */
  actionAt(mapHelper: MapHelper, sprite: THREE.Object3D): GameAction | null {
    const found = this.front(mapHelper, sprite);
    if (!found) {
      return null;
    }
    const { plot, crop } = found;
    if (!plot) {
      return gameAction("till", "Terre");
    }
    if (!plot.crop) {
      return gameAction("plant", "Terre labourée");
    }
    const name = crop?.name ?? "Culture";
    if (plot.dead || !crop) {
      return gameAction("clear", `${name} · morte`);
    }
    if (isRipe(plot, crop)) {
      return gameAction("harvest", `${name} · mûre`);
    }
    if (!isWatered(plot, this.day)) {
      return gameAction("water", `${name} · pas encore arrosée`);
    }
    return gameAction("look", name);
  }

  /** The action key pressed in front of a farmland cell (false: not one). */
  act(mapHelper: MapHelper, sprite: THREE.Object3D): boolean {
    const found = this.front(mapHelper, sprite);
    if (!found) {
      return false;
    }
    const { map, key, plot, crop } = found;
    if (!plot) {
      this.till(map, key);
    } else if (!plot.crop) {
      this.askSeed(map, key);
    } else if (plot.dead || !crop) {
      changePlots(map, (plots) => (plots[key] = { growth: 0 }));
      playSound("step");
    } else if (isRipe(plot, crop)) {
      this.harvest(map, key, crop);
    } else if (isWatered(plot, this.day)) {
      this.look(plot, crop);
    } else {
      this.water(map, key);
    }
    return true;
  }

  private hasTool(tool: FarmTool): boolean {
    const items = currentParty().items;
    return cachedDatabase().items.some(
      (i) => i.tool === tool && (items[i.id] ?? 0) > 0
    );
  }

  private say(...texts: string[]): void {
    this.sequenceService.launchSequence({
      conditions: {},
      instructions: texts.map((t) => message(t)),
    });
  }

  private till(map: string, key: string): void {
    if (!this.hasTool("hoe")) {
      playSound("error");
      this.say("Il faut une houe pour labourer la terre.");
      return;
    }
    playSound("step");
    changePlots(map, (plots) => (plots[key] = { growth: 0 }));
  }

  private askSeed(map: string, key: string): void {
    this.plantAsk.set({ map, key });
    // (the input waits while the window is open)
    this.sequenceService.launchSequence({
      conditions: {},
      instructions: [{ type: InstructionType.PLANT }],
    });
  }

  /** The seeds window closed: the seed chosen is planted (null: none). */
  plantDone(seed: string | null): void {
    const ask = this.plantAsk();
    this.plantAsk.set(null);
    this.sequenceService.nextSequence();
    const crop = cachedDatabase().crops.find((c) => c.seed === seed);
    if (!ask || !seed || !crop || (currentParty().items[seed] ?? 0) < 1) {
      return;
    }
    if (!inSeason(crop, this.day)) {
      playSound("error");
      this.say(`${crop.name} ne se plante pas en cette saison.`);
      return;
    }
    giveItem(seed, -1);
    playSound("item");
    changePlots(
      ask.map,
      (plots) => (plots[ask.key] = { crop: crop.id, growth: 0 })
    );
  }

  private water(map: string, key: string): void {
    if (!this.hasTool("can")) {
      playSound("error");
      this.say("Il faut un arrosoir pour arroser.");
      return;
    }
    playSound("bip");
    changePlots(map, (plots) => {
      if (plots[key]) {
        plots[key].watered = this.day;
      }
    });
  }

  private look(plot: Plot, crop: DbCrop): void {
    const left = daysLeft(plot, crop);
    this.say(
      plot.wilted
        ? `${crop.name} a souffert du gel. Encore un gel et elle meurt.`
        : `${crop.name} : mûre dans ${left} jour${left > 1 ? "s" : ""}. Elle est arrosée pour aujourd'hui.`
    );
  }

  private harvest(map: string, key: string, crop: DbCrop): void {
    const item = cachedDatabase().items.find((i) => i.id === crop.harvest);
    const count =
      crop.harvestMin +
      Math.floor(Math.random() * (crop.harvestMax - crop.harvestMin + 1));
    if (item) {
      giveItem(item.id, count);
    }
    playSound("item");
    changePlots(map, (plots) => {
      plots[key] =
        crop.regrow === undefined
          ? { growth: 0 }
          : {
              crop: crop.id,
              growth: Math.max(0, plots[key].growth - crop.regrow),
            };
    });
    clearTimeout(this.toastTimer);
    this.toast.set({
      pic: item?.icon,
      text: `+${count} ${item?.name ?? crop.name}`,
    });
    this.toastTimer = setTimeout(() => this.toast.set(null), TOAST_MS);
  }
}
