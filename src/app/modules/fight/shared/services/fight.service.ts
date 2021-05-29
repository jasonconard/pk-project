import { Injectable } from '@angular/core';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../../../game/shared/model/Game";
import { FightHelper } from "../models/FightHelper";
import { GamePokemon } from "../../../game/shared/model/GamePokemon";
import { gamePokemonToFighter } from "../models/Fighters";
import { FightMenuService } from "./fight-menu.service";
import { FightSequenceService } from "./fight-sequence.service";
import * as THREE from 'three';
import { WORLD_MAP } from "../../../../../assets/map/world/world";
import { BF_PALLET_TOWN } from "../../../../../assets/map/fight/battlefield/bf-pallet-town";

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private fightMenuService: FightMenuService,
              private fightSequenceService: FightSequenceService) {
  }

  init(game: Game) {
    if(game.fightHelper) {
      Object.keys(game.fightHelper.meshes).forEach(key => {
        const mesh = game.fightHelper.meshes[key];
        mesh.visible = true;
      });
    } else {
      game.fightHelper = new FightHelper({
        originGame: game,
        meshes: {},
        battleField: BF_PALLET_TOWN,
      });
    }

    const rect = game.canvas.getBoundingClientRect();

    game.camera = new THREE.PerspectiveCamera( 45, rect.width / rect.height, 1, TOO_FAR_LIMIT + SHADE_OFFSET );
    game.camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
    game.camera.lookAt( 0, 0, 0 );

    game.render();

    game.light = new THREE.AmbientLight( 0x404040 ); // soft white light
    game.scene.add(game.light);

    game.fightHelper.buildBattlefield();

    const pk1 = GamePokemon.getRandomGamePokemon('salam1');
    const pk2 = GamePokemon.getRandomGamePokemon('salam2');

    game.fightHelper.fighters = {
      currentFighter: { name: 'Jason', money: 0, stamina: 10, pokemons: [gamePokemonToFighter(pk1)] },
      ally: null,
      opponents: [{ name: 'Hugo', money: 500, stamina: 10, pokemons: [gamePokemonToFighter(pk2)] }],
      isDoubleFight: false
    }

    this.fightSequenceService.launchFight(game, game.fightHelper.fighters);
  }

  inputLoop(game: Game) {
  }

  clear(game: Game) {
    if(game.fightHelper) {
      Object.keys(game.fightHelper.meshes).forEach(key => {
        const mesh = game.fightHelper.meshes[key];
        mesh.visible = false;
      });
    }
  }
}
