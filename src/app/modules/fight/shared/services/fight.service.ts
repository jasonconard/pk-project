import { inject, Service } from '@angular/core';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../../../game/shared/model/Game";
import { FightHelper } from "../models/FightHelper";
import { GamePokemon } from "../../../game/shared/model/GamePokemon";
import { Fighters, gamePokemonToFighter } from "../models/Fighters";
import { FightSequenceService } from "./fight-sequence.service";
import * as THREE from 'three';
import { BF_PALLET_TOWN } from "../../../../../assets/map/fight/battlefield/bf-pallet-town";

@Service()
export class FightService {
  private readonly fightSequenceService = inject(FightSequenceService);


  init(game: Game) {
    if (game.fightHelper) {
      Object.values(game.fightHelper.meshes).forEach(mesh => mesh.visible = true);
    }
    const fightHelper = game.fightHelper ??= new FightHelper({
      originGame: game,
      battleField: BF_PALLET_TOWN,
    });

    const rect = game.canvas.getBoundingClientRect();

    game.camera = new THREE.PerspectiveCamera( 45, rect.width / rect.height, 1, TOO_FAR_LIMIT + SHADE_OFFSET );
    game.camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
    game.camera.lookAt( 0, 0, 0 );

    game.render();

    fightHelper.buildBattlefield();

    const pk1 = GamePokemon.getRandomGamePokemon('salam1');
    const pk2 = GamePokemon.getRandomGamePokemon('salam2');

    const fighters: Fighters = {
      currentFighter: { name: 'Jason', money: 0, stamina: 10, pokemons: [gamePokemonToFighter(pk1)] },
      ally: null,
      opponents: [{ name: 'Hugo', money: 500, stamina: 10, pokemons: [gamePokemonToFighter(pk2)] }],
      isDoubleFight: false
    }

    fightHelper.fighters = fighters;
    this.fightSequenceService.launchFight(fighters);
  }

  inputLoop(_game: Game) {
    // Fight inputs are handled by the fight UI menus.
  }

  clear(game: Game) {
    if (game.fightHelper) {
      Object.values(game.fightHelper.meshes).forEach(mesh => mesh.visible = false);
    }
  }
}
