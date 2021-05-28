import { Injectable } from '@angular/core';
import { Game } from "../../../game/shared/model/Game";
import { FightHelper } from "../models/FightHelper";
import { GamePokemon } from "../../../game/shared/model/GamePokemon";

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor() {
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
        meshes: {}
      });
    }

    const pk1 = GamePokemon.getRandomGamePokemon('salam1');
    const pk2 = GamePokemon.getRandomGamePokemon('salam2');

    console.log(pk1);
    console.log(pk2);

    this.turn(pk1, pk2);
  }

  turn(pk1: GamePokemon, pk2: GamePokemon) {
    pk1.updateCurrentStats();
    pk2.updateCurrentStats();
    const order = [pk1, pk2].sort((p1, p2) => {
      return p1.currentStats.speed > p2.currentStats.speed ? 1 : 0;
    });

    this.attack(order[0], order[1]);
    if(order[1].currentHp > 0) {
      this.attack(order[1], order[0]);
      if(order[0].currentHp > 0) {
        this.turn(pk1, pk2);
      } else {
        console.log(order[0].surname + ' est KO');
        console.log('Fin du combat !');
      }
    } else {
      console.log(order[1].surname + ' est KO');
      console.log('Fin du combat !');
    }

  }

  attack(attacker: GamePokemon, defender: GamePokemon) {
    const skill = attacker.skills[0].base;
    const levelRatio = (((2 * attacker.level) / 5) + 2);
    const powerRatio = skill.power * attacker.currentStats.atk / defender.currentStats.def;
    const randomRatio = Math.floor(85 + Math.random()*16) / 100; // [0.85 => 1]
    const maxDamages = Math.floor(((levelRatio * powerRatio / 50) + 2) * randomRatio);
    const damages = Math.min(defender.currentHp, maxDamages);

    console.log(attacker.surname + ' lance ' + skill.name);
    defender.currentHp -= damages;
    console.log(defender.surname + ' perd ' + damages + ' PVs');
    console.log('PVs de ' + defender.surname + ' = ' + defender.currentHp + '/' + defender.currentStats.hp);
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
